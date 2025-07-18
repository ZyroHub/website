import { getToolList } from '~/shared/tools';

import { useToolsStore } from '~/stores/tools';

export const useTools = () => {
	const toolsStore = useToolsStore();
	const toolsStoreRef = storeToRefs(toolsStore);

	const toolList = getToolList();

	const isOnlyFavorites = computed(() => toolsStoreRef.onlyFavorites.value);
	const isMinimizedNavigation = computed(() => toolsStoreRef.minimizedNavigation.value);

	const get = (id: string) => {
		return toolList.find(tool => tool.id === id);
	};

	const toggleOnlyFavorites = () => {
		toolsStoreRef.onlyFavorites.value = !toolsStoreRef.onlyFavorites.value;
	};

	const toggleFavorite = (id: string) => {
		if (toolsStoreRef.favorites.value.includes(id))
			toolsStoreRef.favorites.value.splice(toolsStoreRef.favorites.value.indexOf(id), 1);
		else toolsStoreRef.favorites.value.push(id);
	};

	const isFavorite = (id: string) => {
		return toolsStoreRef.favorites.value.includes(id);
	};

	const toggleMinimizedNavigation = () => {
		toolsStoreRef.minimizedNavigation.value = !toolsStoreRef.minimizedNavigation.value;
	};

	return {
		tools: toolList,
		get,

		toggleOnlyFavorites,
		toggleFavorite,
		isFavorite,
		isOnlyFavorites,

		isMinimizedNavigation,
		toggleMinimizedNavigation
	};
};
