import amqp from 'amqplib';
import ansicolor from 'ansicolor';
import { randomUUID } from 'crypto';
import { TaskData, Terminal, WorkerArgs, WorkerId } from '@zyrohub/toolkit';

import { BaseModule } from './Base';
import { RedisModule } from './Redis';
import { MessengerModule } from './Messenger';
import { ServerModule } from './modules';

export class TasksModuleBase extends BaseModule {
	dependencies = [RedisModule, MessengerModule];

	queueName = process.env.REDIS_TASKS_QUEUE || 'tasks-queue';

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

		await RedisModule.instance?.rpush(this.queueName, taskId);
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

		Terminal.info(
			'TASKS',
			`Task ${ansicolor.cyan(taskId)} added to queue at position ${ansicolor.cyan(taskPositionData.position)}`
		);

		return { success: true, task_id: taskId, position: taskPositionData.position };
	}

	async getQueuePosition(taskId: string) {
		const taskPosition = await RedisModule.instance?.lpos(this.queueName, taskId);
		if (!taskPosition && taskPosition !== 0) return { success: false, error: 'task-not-found' };

		const taskQueuePosition = taskPosition + 1;

		return { success: true, position: taskQueuePosition };
	}

	async cancelTask(taskId: string) {
		await RedisModule.instance?.lrem(this.queueName, 0, taskId);

		ServerModule.server?.io?.emit('queue:updated', {});

		Terminal.info('TASKS', `Task ${ansicolor.cyan(taskId)} canceled!`);

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
