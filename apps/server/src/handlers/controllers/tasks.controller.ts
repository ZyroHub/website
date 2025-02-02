import { config, Terminal, WorkerArgs, WorkerId, workersSchemas } from '@zyrohub/toolkit';
import { Channel } from 'amqplib';
import { Elysia, t } from 'elysia';

import { MessengerModule, TasksModule } from '@/modules/modules.js';
import { z } from 'zod';

export const TasksController = new Elysia({
	prefix: '/tasks',
	websocket: {
		maxPayloadLength: config.server.socketPayloadLimit
	}
})
	.state({
		tasks: [] as string[],
		receiversChannel: null as Map<string, Channel> | null,
		tasksCorrelation: null as Map<string, string> | null
	})
	.ws('/', {
		body: t.Object({
			name: t.UnionEnum(['task:start', 'task:cancel']),
			content: t.Any()
		}),
		response: t.Object({
			name: t.UnionEnum([
				'task:queued',
				'task:started',
				'task:progress',
				'task:finished',
				'task:canceled',
				'task:error',
				'task:start:error',

				'queue:updated'
			]),
			content: t.Any()
		}),
		open(ws) {
			Terminal.info('SOCKET', `New connection: ${ws.id}`);

			ws.subscribe('tasks');

			ws.data.store.receiversChannel = new Map<string, Channel>();
			ws.data.store.tasksCorrelation = new Map<string, string>();
		},
		async close(ws) {
			Terminal.info('SOCKET', `Disconnected: ${ws.id}`);

			ws.unsubscribe('tasks');

			const tasks = ws.data.store.tasks;
			ws.data.store.tasks = [];

			ws.data.store.tasksCorrelation?.clear();

			for (const task of tasks) {
				await TasksModule.cancelTask(task);
			}

			if (ws.data.store.receiversChannel) {
				for (const [correlationId, receiverChannel] of ws.data.store.receiversChannel) {
					await receiverChannel.close();
					ws.data.store.receiversChannel.delete(correlationId);
				}
			}
		},
		async message(ws, body) {
			switch (body.name) {
				case 'task:start':
					{
						const dataParse = z.object({
							request_id: z.string().min(1).max(36),
							worker_id: z.string().min(1).max(36),
							worker_data: z.any()
						});

						const dataParseResponse = await dataParse.safeParseAsync(body.content);
						if (!dataParseResponse.success) return;

						if (ws.data.store.tasks.length >= config.tasks.concurrencyPerUser) {
							ws.send({
								name: 'task:start:error',
								content: {
									request_id: dataParseResponse.data.request_id,
									code: 'max-user-concurrency'
								}
							});
							return;
						}

						const workerId = dataParseResponse.data.worker_id as WorkerId;
						let workerData = dataParseResponse.data.worker_data as WorkerArgs<WorkerId>;

						const workerSchema = workersSchemas[workerId];
						if (!workerSchema) {
							ws.send({
								name: 'task:start:error',
								content: {
									request_id: dataParseResponse.data.request_id,
									code: 'invalid-worker'
								}
							});
							return;
						}

						const workerParseResponse = await workerSchema.args.safeParseAsync(workerData);
						if (!workerParseResponse.success) {
							ws.send({
								name: 'task:start:error',
								content: {
									request_id: dataParseResponse.data.request_id,
									code: 'invalid-worker-data',
									errors: workerParseResponse.error.errors
								}
							});

							return;
						}
						workerData = workerParseResponse.data;

						const tasksQueueSize = await TasksModule.getQueueSize();
						if (!tasksQueueSize.success) {
							ws.send({
								name: 'task:start:error',
								content: {
									request_id: dataParseResponse.data.request_id,
									code: 'failed-to-get-queue-size'
								}
							});

							return;
						}

						if (tasksQueueSize.size! >= config.tasks.maxQueueSize) {
							ws.send({
								name: 'task:start:error',
								content: {
									request_id: dataParseResponse.data.request_id,
									code: 'queue-is-full',
									queue_size: tasksQueueSize.size,
									max_queue_size: config.tasks.maxQueueSize
								}
							});

							return;
						}

						const correlationId = Bun.randomUUIDv7();

						const receiverChannel = await MessengerModule.instance?.createChannel();
						if (!receiverChannel) {
							ws.send({
								name: 'task:start:error',
								content: {
									request_id: dataParseResponse.data.request_id,
									code: 'failed-to-create-channel'
								}
							});

							return;
						}

						ws.data.store.receiversChannel?.set(correlationId, receiverChannel);

						const receiverChannelQueue = await receiverChannel.assertQueue('', {
							exclusive: true,
							autoDelete: true
						});

						receiverChannel.consume(receiverChannelQueue.queue, async message => {
							let taskID = '';

							try {
								const content = JSON.parse(message?.content.toString() || '{}');
								if (!content.task_id) throw new Error('invalid-task-data');
								taskID = content.task_id;

								if (message?.properties.correlationId !== correlationId)
									throw new Error('invalid-correlation-id');

								const contentAction = content.action as string;

								switch (contentAction) {
									case 'start':
										ws.send({
											name: 'task:started',
											content: {
												request_id: dataParseResponse.data.request_id,
												task_id: taskID
											}
										});
										ws.publish('tasks', { name: 'queue:updated', content: {} });

										break;
									case 'progress':
										ws.send({
											name: 'task:progress',
											content: {
												request_id: dataParseResponse.data.request_id,
												task_id: taskID,
												progress: content.progress
											}
										});

										break;
									case 'finished':
										ws.send({
											name: 'task:finished',
											content: {
												request_id: dataParseResponse.data.request_id,
												task_id: taskID,
												data: content.data
											}
										});

										if (message) receiverChannel.ack(message);
										await receiverChannel.close();

										ws.data.store.receiversChannel?.delete(correlationId);

										ws.data.store.tasks.splice(ws.data.store.tasks.indexOf(taskID), 1);

										break;
									case 'error':
										throw new Error(content.error || 'unknown-error');

										break;
								}
							} catch (e: any) {
								ws.send({
									name: 'task:start:error',
									content: {
										request_id: dataParseResponse.data.request_id,
										code: 'task-error',
										error: e.message
									}
								});

								if (message) receiverChannel.ack(message);
								await receiverChannel.close();

								ws.data.store.receiversChannel?.delete(correlationId);

								ws.data.store.tasks.splice(ws.data.store.tasks.indexOf(taskID), 1);
							}
						});

						const taskData = await TasksModule.addToQueue({
							worker_id: workerId,
							worker_data: workerData,
							correlation_id: correlationId,
							reply_to: receiverChannelQueue.queue
						});

						if (taskData.success && taskData.task_id) {
							ws.data.store.tasksCorrelation?.set(taskData.task_id, correlationId);
							ws.data.store.tasks.push(taskData.task_id);

							ws.send({
								name: 'task:queued',
								content: {
									request_id: dataParseResponse.data.request_id,
									task_id: taskData.task_id,
									worker_id: workerId,
									position: taskData.position
								}
							});
						} else {
							ws.send({
								name: 'task:start:error',
								content: {
									request_id: dataParseResponse.data.request_id,
									code: 'failed-to-add-task-to-queue'
								}
							});
						}
					}
					break;

				case 'task:cancel':
					{
						const dataParse = z.object({
							request_id: z.string().min(1).max(36),
							task_id: z.string().min(1).max(36)
						});

						const dataParseResponse = await dataParse.safeParseAsync(body.content);
						if (!dataParseResponse.success) return;

						const taskData = await TasksModule.cancelTask(dataParseResponse.data.task_id);
						if (taskData.success) {
							ws.data.store.tasks.splice(ws.data.store.tasks.indexOf(dataParseResponse.data.task_id), 1);

							const correlationId = ws.data.store.tasksCorrelation?.get(dataParseResponse.data.task_id);
							if (correlationId) {
								const receiverChannel = ws.data.store.receiversChannel?.get(correlationId);
								if (receiverChannel) {
									await receiverChannel.close();
									ws.data.store.receiversChannel?.delete(correlationId);
								}

								ws.data.store.tasksCorrelation?.delete(dataParseResponse.data.task_id);
							}

							ws.send({
								name: 'task:canceled',
								content: {
									request_id: dataParseResponse.data.request_id,
									task_id: dataParseResponse.data.task_id
								}
							});

							ws.data.store.tasks.splice(ws.data.store.tasks.indexOf(dataParseResponse.data.task_id), 1);
						}
					}
					break;
			}
		}
	});
