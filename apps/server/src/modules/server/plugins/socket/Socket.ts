import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { FastifyInstance } from 'fastify';
import { Server as SocketIO, Socket } from 'socket.io';
import { createAdapter } from '@socket.io/redis-streams-adapter';
import { config, Terminal, WorkerArgs, WorkerId, workersSchemas } from '@zyrohub/toolkit';
import { Channel } from 'amqplib';

import { RedisModule } from '@/modules/Redis';
import { TasksModule } from '@/modules/Tasks';
import { MessengerModule } from '@/modules/Messenger';

export class ServerModuleSocketPlugin {
	public instance?: SocketIO;

	async onConnection(socket: Socket) {
		Terminal.info('SOCKET', `New connection: ${socket.id}`);

		const receiversChannel = new Map<string, Channel>();
		const tasksCorrelation = new Map<string, string>();

		if (!socket.recovered) {
			socket.data.tasks = [];
		}

		socket.on('task:start', async (data: any) => {
			if (socket.data.tasks.length >= config.tasks.concurrencyPerUser) return;

			const dataParse = z.object({
				request_id: z.string().min(1).max(36),
				worker_id: z.string().min(1).max(36),
				worker_data: z.any()
			});

			const dataParseResponse = await dataParse.safeParseAsync(data);
			if (!dataParseResponse.success) return;

			const workerId = data.worker_id as WorkerId;
			const workerData = data.worker_data as WorkerArgs<WorkerId>;

			const workerSchema = workersSchemas[workerId];
			if (!workerSchema) {
				socket.emit('task:start:error', {
					request_id: data.request_id,
					code: 'invalid-worker'
				});
				return;
			}

			const workerParseResponse = await workerSchema.args.safeParseAsync(workerData);
			if (!workerParseResponse.success) {
				socket.emit('task:start:error', {
					request_id: data.request_id,
					code: 'invalid-worker-data',
					errors: workerParseResponse.error.errors
				});
				return;
			}

			const tasksQueueSize = await TasksModule.getQueueSize();
			if (!tasksQueueSize.success) {
				socket.emit('task:start:error', {
					request_id: data.request_id,
					code: 'failed-to-get-queue-size'
				});

				return;
			}

			if (tasksQueueSize.size! >= config.tasks.maxQueueSize) {
				socket.emit('task:start:error', {
					request_id: data.request_id,
					code: 'queue-is-full',
					queue_size: tasksQueueSize.size,
					max_queue_size: config.tasks.maxQueueSize
				});

				return;
			}

			const correlationId = randomUUID();

			const receiverChannel = await MessengerModule.instance?.createChannel();
			if (!receiverChannel) {
				socket.emit('task:start:error', {
					request_id: data.request_id,
					code: 'failed-to-create-channel'
				});
				return;
			}

			receiversChannel.set(correlationId, receiverChannel);

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

					if (message?.properties.correlationId !== correlationId) throw new Error('invalid-correlation-id');

					const contentAction = content.action as string;

					switch (contentAction) {
						case 'start':
							socket.emit('task:started', {
								request_id: data.request_id,
								task_id: taskID
							});
							this.instance?.emit('queue:updated', {});

							break;
						case 'progress':
							socket.emit('task:progress', {
								request_id: data.request_id,
								task_id: taskID,
								progress: content.progress
							});

							break;
						case 'finished':
							socket.emit('task:finished', {
								request_id: data.request_id,
								task_id: taskID,
								data: content.data
							});

							if (message) receiverChannel.ack(message);
							await receiverChannel.close();

							receiversChannel.delete(correlationId);

							socket.data.tasks.splice(socket.data.tasks.indexOf(taskID), 1);

							break;
						case 'error':
							throw new Error(content.error || 'unknown-error');

							break;
					}
				} catch (e: any) {
					socket.emit('task:error', {
						request_id: data.request_id,
						task_id: taskID,
						error: e.message
					});

					if (message) receiverChannel.ack(message);
					await receiverChannel.close();

					receiversChannel.delete(correlationId);

					socket.data.tasks.splice(socket.data.tasks.indexOf(taskID), 1);
				}
			});

			const taskData = await TasksModule.addToQueue({
				worker_id: workerId,
				worker_data: workerData,
				correlation_id: correlationId,
				reply_to: receiverChannelQueue.queue
			});

			if (taskData.success && taskData.task_id) {
				tasksCorrelation.set(taskData.task_id, correlationId);
				socket.data.tasks.push(taskData.task_id);

				socket.emit('task:queued', {
					request_id: data.request_id,
					task_id: taskData.task_id,
					worker_id: workerId,
					position: taskData.position
				});
			}
		});

		socket.on('task:cancel', async (data: any) => {
			const dataParse = z.object({
				request_id: z.string().min(1).max(36),
				task_id: z.string().min(1).max(36)
			});

			const dataParseResponse = await dataParse.safeParseAsync(data);
			if (!dataParseResponse.success) return;

			const taskData = await TasksModule.cancelTask(data.task_id);
			if (taskData.success) {
				socket.data.tasks.splice(socket.data.tasks.indexOf(data.task_id), 1);

				const correlationId = tasksCorrelation.get(data.task_id);
				if (correlationId) {
					const receiverChannel = receiversChannel.get(correlationId);
					if (receiverChannel) {
						await receiverChannel.close();
						receiversChannel.delete(correlationId);
					}

					tasksCorrelation.delete(data.task_id);
				}

				socket.emit('task:canceled', {
					request_id: data.request_id,
					task_id: data.task_id
				});

				socket.data.tasks.splice(socket.data.tasks.indexOf(data.task_id), 1);
			}
		});

		socket.on('disconnecting', async () => {
			const tasks = socket.data.tasks;
			socket.data.tasks = [];

			tasksCorrelation.clear();

			for (const task of tasks) {
				await TasksModule.cancelTask(task);
			}

			for (const [correlationId, receiverChannel] of receiversChannel) {
				await receiverChannel.close();
				receiversChannel.delete(correlationId);
			}
		});

		socket.on('disconnect', (a, b) => {
			Terminal.info('SOCKET', `Disconnected: ${socket.id}`);
		});
	}

	async initHandlers() {
		if (!this.instance) return;

		this.instance.on('connection', async socket => {
			await this.onConnection(socket);
		});

		Terminal.info('SOCKET', 'Successfully initialized handlers!');
	}

	init(app: FastifyInstance) {
		this.instance = new SocketIO(app.server, {
			adapter: createAdapter(RedisModule.instance),
			cors: config.server.cors as any
		});

		app.decorate('io', this.instance);

		app.ready(() => {
			this.initHandlers();
		});
	}
}
