import amqp from 'amqplib';
import { randomUUID } from 'crypto';
import { Terminal } from '@zyrohub/toolkit';

import { BaseModule } from './Base';
import { RedisModule } from './Redis';
import { MessengerModule } from './Messenger';

export class TasksModuleBase extends BaseModule {
	dependencies = [RedisModule, MessengerModule];

	queueName = process.env.REDIS_TASKS_QUEUE || 'tasks-queue';

	channel?: amqp.Channel;
	channelQueueName = process.env.RABBIT_MQ_TASKS_QUEUE || 'tasks';

	async addToQueue(data: { worker_id?: string; worker_data?: any; reply_to?: string; correlation_id?: string }) {
		if (!this.channel) return { success: false, error: 'channel-not-initialized' };

		const taskId = randomUUID();

		const taskData = {
			id: taskId,
			worker_id: data.worker_id,
			worker_data: data.worker_data
		};

		await RedisModule.instance?.rpush(this.queueName, taskId);
		this.channel.sendToQueue(this.channelQueueName, Buffer.from(JSON.stringify(taskData)), {
			persistent: false,
			replyTo: data.reply_to,
			correlationId: data.correlation_id
		});
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
	}

	async init() {
		await this.initHandlers();

		Terminal.info('TASKS', `Successfully initialized!`);
	}
}

export const TasksModule = new TasksModuleBase();
