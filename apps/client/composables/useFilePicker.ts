export interface UseFilePickerOptions {
	accept?: string;
	multiple?: boolean;
	accumulative?: boolean;
	onFilesAdd?: (files: File[]) => void;
}

export const useFilePicker = (options?: UseFilePickerOptions) => {
	const files = ref<File[]>([]);

	const inputRef = ref<HTMLInputElement | null>(null);

	const pick = () => {
		if (inputRef.value) inputRef.value.click();
	};

	const handleInputChange = () => {
		if (!inputRef.value) return;

		const newFiles = Array.from(inputRef.value.files || []).map(file => {
			const newFile = file as File;

			return newFile;
		});

		if (!options?.accumulative) files.value = newFiles;
		else files.value.push(...newFiles);

		inputRef.value.value = '';

		options?.onFilesAdd?.(newFiles);
	};

	onMounted(() => {
		if (!inputRef.value) {
			const inputElement = document.createElement('input');

			inputElement.type = 'file';
			inputElement.className = 'hidden';

			inputElement.multiple = options?.multiple || false;
			inputElement.accept = options?.accept || '';

			inputElement.addEventListener('change', handleInputChange);

			document.body.appendChild(inputElement);
			inputRef.value = inputElement;
		}
	});

	onBeforeUnmount(() => {
		if (inputRef.value) {
			inputRef.value.remove();
			inputRef.value = null;
		}
	});

	return { open: pick, files };
};
