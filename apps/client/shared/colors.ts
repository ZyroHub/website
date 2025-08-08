export const hexColorToDecimal = (hex: string) => {
	return parseInt(hex.replace('#', ''), 16);
};
