import type { ModelRef } from 'vue';

export const useFormInput = <T = any>(name?: string, model?: ModelRef<T | null | undefined>) => {
	const injectedForm = useInjectedForm();

	const localRef = ref<T | null | undefined>(model?.value || null);

	const inputRef = computed<T | null | undefined>({
		get: () => (name ? injectedForm?.form?.values?.value?.[name] : localRef.value),
		set: value => {
			if (name && injectedForm?.form?.values?.value) injectedForm.form.values.value[name] = value;
			else localRef.value = value;
		}
	});

	const errorRef = computed({
		get: () => (name ? injectedForm?.form?.errors?.value?.[name] : undefined),
		set: value => {
			if (name && injectedForm?.form?.errors?.value) injectedForm.form.errors.value[name] = value;
		}
	});

	if (model) {
		watch(inputRef, (newValue, oldValue) => {
			if (newValue !== oldValue) model.value = newValue;
		});

		watch(model, (newValue, oldValue) => {
			if (newValue !== oldValue) inputRef.value = newValue;
		});
	}

	return { inputRef, error: errorRef };
};
