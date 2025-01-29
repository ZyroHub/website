import * as client from './client';

export const port = Number(process.env.SERVER_PORT || 3e3);

export type CorsConfig = Parameters<typeof import('@elysiajs/cors').cors>[0];

export const cors: CorsConfig = {
	origin: [client.fullUrl]
};
