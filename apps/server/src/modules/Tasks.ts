import { BaseModule, Module } from '@zyrohub/core';
import { config, TaskData, WorkerArgs, WorkerId } from '@zyrohub/shared';
import { Terminal } from '@zyrohub/utilities';
import amqp from 'amqplib';
import ansicolor from 'ansicolor';
import { randomUUID } from 'crypto';

import { MessengerModule } from './Messenger.js';
import { RedisModule } from './Redis.js';
import { ServerModule } from './server/Server.js';

@Module()
export class TasksModule extends BaseModule {
	channel?: amqp.Channel;
	channelQueueName = process.env.RABBIT_MQ_TASKS_QUEUE || 'tasks';

	async addToQueue<TWorkerId extends WorkerId>(data: {
		worker_id: TWorkerId;
		worker_data: WorkerArgs<TWorkerId>;
		reply_to?: string;
		correlation_id?: string;
	}) {
		const redisModule = this.core?.getModule(RedisModule);
		if (!redisModule?.instance) return { success: false, error: 'redis-not-initialized' };

		if (!this.channel) return { success: false, error: 'channel-not-initialized' };

		const taskId = randomUUID();

		const taskData: TaskData<TWorkerId> = {
			id: taskId,
			worker_id: data.worker_id,
			worker_data: data.worker_data
		};

		await redisModule.instance?.rpush(config.tasks.redisQueueName, taskId);
		this.channel.sendToQueue(this.channelQueueName, Buffer.from(JSON.stringify(taskData)), {
			persistent: false,
			replyTo: data.reply_to,
			correlationId: data.correlation_id
		});

		const taskPositionData = await this.getQueuePosition(taskId);
		if (!taskPositionData.success) {
			this.cancelTask(taskId);
			return { success: false, error: 'task-position-failed' };
		}

		if (config.tasks.activeLogs)
			Terminal.info(
				'TASKS',
				`Task ${ansicolor.cyan(taskId)} added to queue at position ${ansicolor.cyan(taskPositionData.position)}`
			);

		return { success: true, task_id: taskId, position: taskPositionData.position };
	}

	async getQueuePosition(taskId: string) {
		const redisModule = this.core?.getModule(RedisModule);
		if (!redisModule?.instance) return { success: false, error: 'redis-not-initialized' };

		const taskPosition = await redisModule.instance?.lpos(config.tasks.redisQueueName, taskId);
		if (!taskPosition && taskPosition !== 0) return { success: false, error: 'task-not-found' };

		const taskQueuePosition = taskPosition + 1;

		return { success: true, position: taskQueuePosition };
	}

	async getQueueSize() {
		const redisModule = this.core?.getModule(RedisModule);
		if (!redisModule?.instance) return { success: false, error: 'redis-not-initialized' };

		const queueSize = await redisModule.instance?.llen(config.tasks.redisQueueName);
		if (!queueSize && queueSize !== 0) return { success: false, error: 'queue-not-found' };

		return { success: true, size: queueSize };
	}

	async cancelTask(taskId: string) {
		const redisModule = this.core?.getModule(RedisModule);
		const serverModule = this.core?.getModule(ServerModule);

		const taskPositionData = await this.getQueuePosition(taskId);

		await redisModule?.instance?.lrem(config.tasks.redisQueueName, 0, taskId);
		await redisModule?.instance?.lrem(config.tasks.redisRunningQueueName, 0, taskId);

		if (taskPositionData.success) {
			serverModule?.server?.server?.publish('tasks', {
				name: 'queue:updated',
				content: { removed_position: taskPositionData.position }
			} as any);
		}

		if (config.tasks.activeLogs) Terminal.info('TASKS', `Task ${ansicolor.cyan(taskId)} canceled!`);

		return { success: true };
	}

	async initHandlers() {
		const messengerModule = this.core?.getModule(MessengerModule);

		if (!messengerModule?.instance) {
			Terminal.error('TASKS', `Failed to initialize handlers! MessengerModule is not initialized!`);
			return;
		}

		this.channel = await messengerModule.instance.createChannel();
		if (!this.channel) {
			Terminal.error('TASKS', `Failed to initialize handlers! Failed to create channel!`);
			return;
		}

		this.channel.assertQueue(this.channelQueueName, { durable: true });
	}

	async init() {
		await this.initHandlers();

		Terminal.info('TASKS', `Successfully initialized!`);
	}
}
