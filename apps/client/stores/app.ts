export const useAppStore = defineStore('app', () => {
	const connectionStatus = ref<'connected' | 'connecting' | 'disconnected' | 'error'>('connecting');

	return {
		connectionStatus
	};
});
