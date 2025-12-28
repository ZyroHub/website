export const useInjectedDropdown = () => {
	return inject<{
		close: () => void;
		open: () => void;
		isOpen: Ref<boolean>;
	} | null>('dropdown', null);
};
