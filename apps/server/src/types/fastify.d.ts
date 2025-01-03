import 'fastify';
import { Member, Workspace } from '.';
import { Server as SocketIO } from 'socket.io';

declare module 'fastify' {
	interface FastifyInstance {
		io?: SocketIO;
	}
}
