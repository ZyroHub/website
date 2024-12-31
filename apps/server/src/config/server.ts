import { FastifyCorsOptions } from '@fastify/cors';

import * as client from './client';

export const port = Number(process.env.SERVER_PORT || 3e3);

export const cors: FastifyCorsOptions = {
	origin: [client.fullUrl]
};
