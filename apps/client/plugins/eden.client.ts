import { treaty } from '@elysiajs/eden';
import { type app } from '@zyrohub/server';

export default defineNuxtPlugin(nuxtApp => {
	const runtimeConfig = nuxtApp.$config;

	const eden = treaty<app>(runtimeConfig.public.server_url);

	return {
		provide: {
			eden: eden
		}
	};
});
