export const useAppStore = defineStore('app', () => {
	const connectionStatus = ref<'connected' | 'connecting' | 'disconnected' | 'error'>('disconnected');

	return {
		connectionStatus
	};
});
