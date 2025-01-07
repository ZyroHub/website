export const useInjectedForm = () => {
	return inject<{ form?: ReturnType<typeof useForm<any>> }>('form', {});
};
