import { Terminal } from '@zyrohub/toolkit';
import { FastifyInstance } from 'fastify';
import { Server as SocketIO } from 'socket.io';
import { createAdapter } from '@socket.io/redis-streams-adapter';

import * as config from '@/config';
import { RedisModule } from '@/modules/Redis';

export class ServerModuleSocketPlugin {
	public instance?: SocketIO;

	async initHandlers() {
		if (!this.instance) return;

		this.instance.on('connection', socket => {});

		Terminal.success('SOCKET', 'Successfully initialized handlers!');
	}

	init(app: FastifyInstance) {
		this.instance = new SocketIO(app.server, {
			adapter: createAdapter(RedisModule.instance ),
			cors: config.server.cors as any
		});

		app.decorate('io', this.instance);

		app.ready(() => {
			this.initHandlers();
		});
	}
}
