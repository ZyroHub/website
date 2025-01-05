import { z } from 'zod';

export const useForm = <T>(initialValues: T, validateSchema?: z.Schema) => {
	const values = ref<T>(initialValues);
	const errors = ref<Record<keyof T, string>>({} as Record<keyof T, string>);

	const isValid = computed(() => Object.keys(errors.value).length === 0);

	const setValue = (key: keyof T, value: T[keyof T]) => {
		values.value[key] = value;
	};

	const setValues = (newValues: Partial<T>) => {
		values.value = {
			...values.value,
			...newValues
		};
	};

	const validate = () => {
		if (!validateSchema) return true;

		const result = validateSchema.safeParse(values.value);

		if (result.success) {
			errors.value = {};
		} else {
			errors.value = result.error.errors.reduce((acc, error) => {
				acc[error.path[0] as keyof T] = error.message;
				return acc;
			}, {} as Record<keyof T, string>);
		}

		return result.success;
	};

	watch(
		values,
		() => {
			validate();
		},
		{ deep: true }
	);

	validate();

	return {
		values,
		errors,

		setValue,
		setValues,

		validate,
		isValid
	};
};
