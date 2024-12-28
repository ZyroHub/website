export const firstUpperCase = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const idToPascalCase = (id: string) => {
	return id
		.split('_')
		.map(word => firstUpperCase(word))
		.join('');
};
