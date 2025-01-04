import io, { Manager } from 'socket.io-client';

import { useAppStore } from '~/stores/app';

export default defineNuxtPlugin(nuxtApp => {
	const runtimeConfig = nuxtApp.$config;

	const appStore = useAppStore();
	const appStoreRefs = storeToRefs(appStore);

	const manager = new Manager(runtimeConfig.public.server_url, {
		reconnection: true,
		reconnectionAttempts: 10
	});

	const socket = manager.socket('/');

	appStoreRefs.connectionStatus.value = 'connecting';

	socket.on('connect', () => {
		appStoreRefs.connectionStatus.value = 'connected';
	});

	socket.on('connect_error', () => {
		if (socket.active) {
			appStoreRefs.connectionStatus.value = 'connecting';
		} else {
			appStoreRefs.connectionStatus.value = 'error';
		}
	});

	socket.on('disconnect', () => {
		if (socket.active) {
			appStoreRefs.connectionStatus.value = 'connecting';
		} else {
			appStoreRefs.connectionStatus.value = 'disconnected';
		}
	});

	socket.io.on('reconnect_failed', () => {
		appStoreRefs.connectionStatus.value = 'error';
	});

	return {
		provide: {
			socket: socket
		}
	};
});
