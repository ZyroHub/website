export const downloadFile = async (file_name: string, file: string | Blob) => {
	const fileRes = typeof file === 'string' ? await fetch(file) : null;
	const fileBlob = typeof file === 'string' ? await fileRes?.blob() : file;
	if (!fileBlob) return false;

	const objectURL = window.URL.createObjectURL(fileBlob);

	const aElement = document.createElement('a');
	aElement.href = objectURL;
	aElement.download = file_name;

	document.body.appendChild(aElement);
	aElement.click();

	window.URL.revokeObjectURL(objectURL);
	document.body.removeChild(aElement);

	return true;
};

export const getFileBase64 = async (file: File) => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => {
			resolve(reader.result as string);
		};

		reader.onerror = reject;

		reader.readAsDataURL(file);
	});
};

export const getFileArrayBuffer = async (file: File) => {
	return new Promise<ArrayBuffer>((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => {
			resolve(reader.result as ArrayBuffer);
		};

		reader.onerror = reject;

		reader.readAsArrayBuffer(file);
	});
};

export const getFileFromSocketData = (socket_data: { type: string; data: number[] }) => {
	if (socket_data.type !== 'Buffer') throw new Error('invalid-socket-data-type');

	return new Uint8Array(socket_data.data).buffer;
};

export const formatFileSize = (size: number) => {
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
	if (size === 0) return '0 B';

	const i = Math.floor(Math.log(size) / Math.log(1024));
	if (i === 0) return `${size} ${sizes[i] || ''}`;

	return `${(size / Math.pow(1024, i)).toFixed(2)} ${sizes[i] || ''}`;
};
