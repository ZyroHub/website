import io from 'socket.io-client';

import { useAppStore } from '~/stores/app';

export default defineNuxtPlugin(nuxtApp => {
	const runtimeConfig = nuxtApp.$config;

	const appStore = useAppStore();
	const appStoreRefs = storeToRefs(appStore);

	const socket = io(runtimeConfig.public.server_url);

	socket.on('connect', () => {
		appStoreRefs.connectionStatus.value = 'connected';
	});

	socket.on('connect_error', () => {
		if (socket.active) {
			appStoreRefs.connectionStatus.value = 'disconnected';
		} else {
			appStoreRefs.connectionStatus.value = 'error';
		}
	});

	socket.on('disconnect', () => {
		appStoreRefs.connectionStatus.value = 'disconnected';
	});

	return {
		provide: {
			socket: socket
		}
	};
});
