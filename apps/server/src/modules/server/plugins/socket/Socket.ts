import { Terminal } from '@zyrohub/toolkit';
import { FastifyInstance } from 'fastify';
import { Server as SocketIO } from 'socket.io';

import * as config from '@/config';

export class ServerModuleSocketPlugin {
	public instance?: SocketIO;

	async initHandlers() {
		Terminal.success('SOCKET', 'Successfully initialized!');
	}

	init(app: FastifyInstance) {
		this.instance = new SocketIO(app.server, {
			cors: config.server.cors as any
		});

		app.decorate('io', this.instance);

		app.ready(() => {
			this.initHandlers();
		});
	}
}
