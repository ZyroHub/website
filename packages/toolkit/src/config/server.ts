import * as client from './client.js';

export const port = Number(process.env.SERVER_PORT || 3e3);
export const socketPayloadLimit = Number(process.env.SERVER_SOCKET_PAYLOAD_LIMIT || 1) * 1024 * 1024;

export type CorsConfig = Parameters<typeof import('@elysiajs/cors').cors>[0];

export const cors: CorsConfig = {
	origin: [client.fullUrl]
};
