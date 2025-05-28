import { prisma } from '@zyrohub/database';
import { config } from '@zyrohub/toolkit';
import { Elysia } from 'elysia';

export const ShortenerController = new Elysia({
	prefix: '/s'
}).get('/:code', async ({ params, redirect }) => {
	const link = await prisma.link.findUnique({
		where: { code: params.code }
	});

	if (!link) return redirect(config.client.fullUrl);

	return redirect(link.target, 301);
});
