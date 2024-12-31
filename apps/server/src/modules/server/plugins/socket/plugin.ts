import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { ServerModuleSocketPlugin } from './Socket';

export const fastifySocket = fastifyPlugin((app: FastifyInstance, _opts: FastifyPluginOptions, done: any) => {
	const socketPlugin = new ServerModuleSocketPlugin();
	socketPlugin.init(app);

	done();
});
