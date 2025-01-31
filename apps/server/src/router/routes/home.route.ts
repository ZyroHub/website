import { Controller, Get } from 'elysia-decorators';

@Controller('/')
export default class {
	@Get()
	async handle() {
		return { success: true };
	}
}
