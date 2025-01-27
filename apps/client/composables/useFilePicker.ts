export interface UseFilePickerOptions {
	accept?: string;
	multiple?: boolean;
	maxCount?: number;
	maxFileSize?: number;
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

		let newFiles = Array.from(inputRef.value.files || []).map(file => {
			const newFile = file as File;

			return newFile;
		});

		if (!options?.accumulative) files.value = newFiles;
		else files.value.push(...newFiles);

		if (options?.maxCount && files.value.length > options.maxCount) {
			files.value = files.value.slice(0, options.maxCount);
		}

		if (options?.maxFileSize) {
			files.value = files.value.filter(file => file.size <= (options.maxFileSize || 0));
		}

		inputRef.value.value = '';

		newFiles = newFiles.filter(file => files.value.includes(file));

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
