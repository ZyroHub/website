export class Utilities {
	static chars = {
		upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		lower: 'abcdefghijklmnopqrstuvwxyz',
		number: '0123456789',
		special: '!@#$%^&*()_+[]{}|;:,.<>?'
	};

	static get allChars() {
		return `${this.chars.upper}${this.chars.lower}${this.chars.number}${this.chars.special}`;
	}

	static get alphanumericChars() {
		return `${this.chars.upper}${this.chars.lower}${this.chars.number}`;
	}

	static async generateRandomString(options: {
		length?: number;
		chars?: string;
		include?: string;
		exclude?: string;
	}) {
		const charList = `${options.chars || this.allChars}${options.include}`.replace(
			new RegExp(`[${options.exclude}]`, 'g'),
			''
		);
		const length = options.length || 16;

		let randomString = '';
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * charList.length);
			randomString += charList[randomIndex];
		}

		return randomString;
	}
}
