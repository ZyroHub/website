import { prisma } from '@zyrohub/database';
import { config } from '@zyrohub/toolkit';
import { Elysia } from 'elysia';

export const ShortenerController = new Elysia({
	prefix: '/s'
}).get('/:code?', async ({ params, redirect }) => {
	if (!params.code) return redirect(config.client.fullUrl);

	const link = await prisma.link.findUnique({
		where: { code: params.code }
	});

	if (!link) return redirect(config.client.fullUrl);

	prisma.link.update({
		where: { code: params.code },
		data: { lastUsedAt: new Date() }
	});

	return redirect(link.target, 301);
});
