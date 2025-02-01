import amqp from 'amqplib';
import { Terminal } from '@zyrohub/toolkit';

import { BaseModule } from './Base.js';

export class MessengerModuleBase extends BaseModule {
	instance?: amqp.Connection;
	dependencies = [];

	async init() {
		this.instance = await amqp.connect(process.env.RABBIT_MQ || 'amqp://localhost');

		this.instance.on('error', err => {
			Terminal.error('MESSENGER', ['An error occurred:', err]);
		});

		Terminal.info('MESSENGER', 'Successfully connected to the server!');
	}
}

export const MessengerModule = new MessengerModuleBase();
