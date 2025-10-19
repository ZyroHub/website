export const hexColorToDecimal = (hex: string) => {
	return parseInt(hex.replace('#', ''), 16);
};

export const hexToRGB = (hex: string): { r: number; g: number; b: number } | null => {
	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, (m, r, g, b) => {
		return r + r + g + g + b + b;
	});

	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			}
		: null;
};

export const getContrastingColor = (hexColor?: string, darkColor?: string, lightColor?: string) => {
	const rgbColor = hexToRGB(hexColor || '#000000') || { r: 0, g: 0, b: 0 };
	const brightness = (rgbColor.r * 299 + rgbColor.g * 587 + rgbColor.b * 114) / 1000;

	return brightness > 128 ? darkColor || '#000000' : lightColor || '#FFFFFF';
};
