export const firstUpperCase = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const idToPascalCase = (id: string) => {
	return id
		.split('_')
		.map(word => firstUpperCase(word))
		.join('');
};

export const toSlug = (str: string) => {
	return str
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/ /g, '-')
		.replace(/--+/g, '-')
		.replace(/[^\w-]+/g, '');
};
