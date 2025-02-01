import { treaty } from '@elysiajs/eden';
import type { App } from '@zyrohub/server';

export default defineNuxtPlugin(nuxtApp => {
	const runtimeConfig = nuxtApp.$config;

	const eden = treaty<App>(runtimeConfig.public.server_url);

	return {
		provide: {
			eden: eden
		}
	};
});
