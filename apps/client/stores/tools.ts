export const useToolsStore = defineStore('tools', () => {
	const favorites = ref<string[]>(
		import.meta.client ? JSON.parse(localStorage.getItem(FavoriteStorageName) || '[]') : []
	);
	const onlyFavorites = ref(false);

	return {
		favorites,
		onlyFavorites
	};
});
