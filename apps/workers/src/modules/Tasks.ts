import amqp from 'amqplib';
import { Terminal } from '@zyrohub/toolkit';

import { BaseModule } from './Base';
import { RedisModule } from './Redis';
import { MessengerModule } from './Messenger';

import { workers } from '@/workers/workers';

export class TasksModuleBase extends BaseModule {
	dependencies = [RedisModule, MessengerModule];

	queueName = process.env.REDIS_TASKS_QUEUE || 'tasks-queue';

	channel?: amqp.Channel;
	channelQueueName = process.env.RABBIT_MQ_TASKS_QUEUE || 'tasks';

	async onQueueMessage(message: amqp.ConsumeMessage | null) {
		try {
			const content = JSON.parse(message?.content.toString() || '{}');
			if (!content.id) throw new Error('invalid-task-data');

			const queuePosition = await RedisModule.instance?.lpos(this.queueName, content.id);
			if (!queuePosition && queuePosition !== 0) throw new Error('task-not-in-queue');

			RedisModule.instance?.lrem(this.queueName, 0, content.id);

			const worker = workers[content.worker_id];
			if (!worker) throw new Error('invalid-worker');

			const workerResponse = (await worker.execute(content.worker_data)) || null;

			if (message?.properties.replyTo) {
				this.channel?.sendToQueue(
					message.properties.replyTo,
					Buffer.from(
						JSON.stringify({
							task_id: content.id,
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
