export const useInjectedDropdown = () => {
	return inject<{
		close: () => void;
		open: () => void;
	} | null>('dropdown', null);
};
