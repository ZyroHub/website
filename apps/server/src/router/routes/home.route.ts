import { GET, RequestHandler } from 'fastify-decorators';

@GET({
	url: '/'
})
export default class extends RequestHandler {
	async handle() {
		return { success: true };
	}
}
