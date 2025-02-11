import { Elysia } from 'elysia';

export const HomeController = new Elysia({
	prefix: '/'
}).get('/', () => {
	return { sucess: true };
});
