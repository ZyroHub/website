export const downloadFile = async (file_name: string, file_url: string) => {
	const fileRes = await fetch(file_url);
	const fileBlob = await fileRes.blob();

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
