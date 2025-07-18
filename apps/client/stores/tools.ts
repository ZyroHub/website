export const useToolsStore = defineStore('tools', () => {
	const favoritesCookie = useCookie(FavoriteStorageName, {
		decode: value => {
			try {
				const parsed = JSON.parse(value);

				if (!Array.isArray(parsed)) return [];
				return parsed;
			} catch (e) {
				return [];
			}
		},
		encode: value => {
			if (!Array.isArray(value)) return JSON.stringify([]);
			return JSON.stringify(value || []);
		},
		default: () => []
	});

	const favorites = computed({
		get: () => favoritesCookie.value,
		set: value => {
			favoritesCookie.value = value;
			refreshCookie(FavoriteStorageName);
		}
	});

	const onlyFavorites = ref(false);

	const minimizedNavigation = ref(false);

	return {
		favorites,
		onlyFavorites,
		minimizedNavigation
	};
});
