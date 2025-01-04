export const useAppStore = defineStore('app', () => {
	const connectionStatus = ref('disconnected');

	return {
		connectionStatus
	};
});
