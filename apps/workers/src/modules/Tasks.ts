import amqp from 'amqplib';
import { config, Terminal, WorkerId, workersSchemas } from '@zyrohub/toolkit';

import { BaseModule } from './Base';
import { RedisModule } from './Redis';
import { MessengerModule } from './Messenger';

import { workers } from '@/workers/workers';
import ansicolor from 'ansicolor';
import { BaseWorkerProgress } from '@/workers/Base';

export class TasksModuleBase extends BaseModule {
	dependencies = [RedisModule, MessengerModule];

	channel?: amqp.Channel;
	channelQueueName = process.env.RABBIT_MQ_TASKS_QUEUE || 'tasks';

	async updateTaskProgress(data: {
		task_id: string;
		correlation_id: string;
		reply_to: string;
		progress: { percentage: number; message?: string };
	}) {
		this.channel?.sendToQueue(
			data.reply_to,
			Buffer.from(
				JSON.stringify({
					action: 'progress',
					task_id: data.task_id,
					progress: data.progress
				})
			),
			{
				correlationId: data.correlation_id
			}
		);
	}

	async onQueueMessage(message: amqp.ConsumeMessage | null) {
		let taskId = '';
		let workerId: WorkerId | undefined;

		try {
			const content = JSON.parse(message?.content.toString() || '{}');
			if (!content.id) throw new Error('invalid-task-data');
			taskId = content.id;

			const queuePosition = await RedisModule.instance?.lpos(config.tasks.redisQueueName, content.id);
			if (!queuePosition && queuePosition !== 0) throw new Error('task-not-in-queue');

			RedisModule.instance?.lrem(config.tasks.redisQueueName, 0, taskId);
			RedisModule.instance?.rpush(config.tasks.redisRunningQueueName, taskId);

			workerId = content.worker_id as WorkerId;
			const workerData = workers[workerId];
			if (!workerData) throw new Error('invalid-worker');

			if (message?.properties.replyTo) {
				this.channel?.sendToQueue(
					message.properties.replyTo,
					Buffer.from(
						JSON.stringify({
							action: 'start',
							task_id: taskId
						})
					),
					{
						correlationId: message.properties.correlationId
					}
				);
			}

			if (config.tasks.activeLogs) Terminal.info('TASKS', `Processing task ${ansicolor.cyan(taskId)}...`);

			const updateProgress: BaseWorkerProgress = async (progress_percentage, progress_message) => {
				const existingTask = await RedisModule.instance?.lpos(config.tasks.redisRunningQueueName, taskId);

				if (!existingTask && existingTask !== 0) {
					if (config.tasks.activeLogs)
						Terminal.warn('TASKS', `Task ${ansicolor.cyan(taskId)} is not running anymore!`);
					throw new Error('task-not-running');
				}

				if (message?.properties.replyTo) {
					this.updateTaskProgress({
						task_id: taskId,
						correlation_id: message?.properties.correlationId,
						reply_to: message?.properties.replyTo,
						progress: { percentage: progress_percentage, message: progress_message }
					});
				}
			};

			const workerResponse = (await workerData.execute(content.worker_data, updateProgress)) || null;

			RedisModule.instance?.lrem(config.tasks.redisRunningQueueName, 0, taskId);

			if (config.tasks.activeLogs) Terminal.info('TASKS', `Task ${ansicolor.cyan(taskId)} processed!`);

			if (message?.properties.replyTo) {
				this.channel?.sendToQueue(
					message.properties.replyTo,
					Buffer.from(
						JSON.stringify({
							action: 'finished',
							task_id: taskId,
							data: workerResponse
						})
					),
					{
						correlationId: message.properties.correlationId
					}
				);
			}

			this.channel?.ack(message as amqp.Message);
		} catch (e: any) {
			this.channel?.nack(message as amqp.Message, false, false);

			if (message?.properties.replyTo && taskId) {
				this.channel?.sendToQueue(
					message.properties.replyTo,
					Buffer.from(
						JSON.stringify({
							action: 'error',
							task_id: taskId,
							...(workerId && workersSchemas[workerId]?.errors.includes(e.message)
								? { error: e.message }
								: {})
						})
					),
					{
						correlationId: message.properties.correlationId
					}
				);
			}
		}
	}

	async initHandlers() {
		if (!MessengerModule.instance) {
			Terminal.error('TASKS', `Failed to initialize handlers! MessengerModule is not initialized!`);
			return;
		}

		this.channel = await MessengerModule.instance.createChannel();
		if (!this.channel) {
			Terminal.error('TASKS', `Failed to initialize handlers! Failed to create channel!`);
			return;
		}

		this.channel.assertQueue(this.channelQueueName, { durable: true });
		if (process.env.RABBIT_MQ_PREFETCH) this.channel.prefetch(Number(process.env.RABBIT_MQ_PREFETCH));

		await this.channel.consume(this.channelQueueName, this.onQueueMessage.bind(this));
	}

	async init() {
		await this.initHandlers();

		Terminal.info('TASKS', `Successfully initialized!`);
	}
}

export const TasksModule = new TasksModuleBase();
