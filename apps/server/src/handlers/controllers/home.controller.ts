import { Elysia } from 'elysia';

export const HomeController = new Elysia().get('/', () => {
	return { success: true };
});
