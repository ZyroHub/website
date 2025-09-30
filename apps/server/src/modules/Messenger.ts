import { BaseModule } from '@zyrohub/core';
import { Terminal } from '@zyrohub/utilities';
import amqp from 'amqplib';

export class MessengerModule extends BaseModule {
	instance?: amqp.ChannelModel;

	async init() {
		this.instance = await amqp.connect(process.env.RABBIT_MQ || 'amqp://localhost');

		this.instance.on('error', err => {
			Terminal.error('MESSENGER', ['An error occurred:', err]);
		});

		Terminal.info('MESSENGER', 'Successfully connected to the server!');
	}
}
