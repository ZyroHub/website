import amqp from 'amqplib';
import ansicolor from 'ansicolor';
import { randomUUID } from 'crypto';
import { config, TaskData, Terminal, WorkerArgs, WorkerId } from '@zyrohub/toolkit';

import { BaseModule } from './Base.js';
import { RedisModule } from './Redis.js';
import { MessengerModule } from './Messenger.js';

export class TasksModuleBase extends BaseModule {
	dependencies = [RedisModule, MessengerModule];

	channel?: amqp.Channel;
	channelQueueName = process.env.RABBIT_MQ_TASKS_QUEUE || 'tasks';

	async addToQueue<TWorkerId extends WorkerId>(data: {
		worker_id: TWorkerId;
		worker_data: WorkerArgs<TWorkerId>;
		reply_to?: string;
		correlation_id?: string;
	}) {
		if (!this.channel) return { success: false, error: 'channel-not-initialized' };

		const taskId = randomUUID();

		const taskData: TaskData<TWorkerId> = {
			id: taskId,
			worker_id: data.worker_id,
			worker_data: data.worker_data
		};

		await RedisModule.instance?.rpush(config.tasks.redisQueueName, taskId);
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
		const taskPosition = await RedisModule.instance?.lpos(config.tasks.redisQueueName, taskId);
		if (!taskPosition && taskPosition !== 0) return { success: false, error: 'task-not-found' };

		const taskQueuePosition = taskPosition + 1;

		return { success: true, position: taskQueuePosition };
	}

	async getQueueSize() {
		const queueSize = await RedisModule.instance?.llen(config.tasks.redisQueueName);
		if (!queueSize && queueSize !== 0) return { success: false, error: 'queue-not-found' };

		return { success: true, size: queueSize };
	}

	async cancelTask(taskId: string) {
		const taskPositionData = await this.getQueuePosition(taskId);

		await RedisModule.instance?.lrem(config.tasks.redisQueueName, 0, taskId);
		await RedisModule.instance?.lrem(config.tasks.redisRunningQueueName, 0, taskId);

		if (taskPositionData.success) {
			// ServerModule.server?.io?.emit('queue:updated', {
			// 	removed_position: taskPositionData.position
			// });
		}

		if (config.tasks.activeLogs) Terminal.info('TASKS', `Task ${ansicolor.cyan(taskId)} canceled!`);

		return { success: true };
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
	}

	async init() {
		await this.initHandlers();

		Terminal.info('TASKS', `Successfully initialized!`);
	}
}

export const TasksModule = new TasksModuleBase();
