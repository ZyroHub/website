import ansicolor from 'ansicolor';
import { config, Terminal } from '@zyrohub/toolkit';

import { BaseModule } from '../Base';

import { RedisModule } from '../Redis';
import { TasksModule } from '../Tasks';

import Elysia from 'elysia';
import cors from '@elysiajs/cors';
import { helmet } from 'elysia-helmet';
import { decorators } from 'elysia-decorators';

import HomeRoute from '@/router/routes/home.route';

export class ServerModuleBase extends BaseModule {
	dependencies = [RedisModule, TasksModule];

	server = new Elysia({})
		.use(
			decorators({
				controllers: [HomeRoute]
			})
		)
		.use(cors(config.server.cors))
		.use(helmet());

	initHandlers() {
		if (!this.server) return;

		this.server.onError(({ code, error }) => {
			if (code === 'NOT_FOUND')
				return {
					success: false,
					code: 'NOT_FOUND',
					data: {}
				};

			if (code === 'VALIDATION')
				return {
					success: false,
					code: 'VALIDATION_ERROR',
					data: { message: error.validator.Errors(error.value).First().message }
				};
		});
	}

	async init() {
		this.initHandlers();

		this.server.listen({
			...(process.env.MODE === 'development' && { host: '0.0.0.0' }),
			port: config.server.port
		});

		Terminal.info('SERVER', `Successfully initialized on port: ${ansicolor.cyan(config.server.port)}`);
	}
}

export const ServerModule = new ServerModuleBase();
