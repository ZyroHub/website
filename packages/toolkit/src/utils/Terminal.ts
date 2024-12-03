import ansicolor, { type AnsicolorMethods } from 'ansicolor';

export class Terminal {
	static log(flag: string, flag_color: AnsicolorMethods, content: any[] | any) {
		content = ([] as string[]).concat(content);

		const formattedDate = new Date()
			.toLocaleString('pt-BR', {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				month: '2-digit',
				day: '2-digit',
				timeZone: process.env.TIMEZONE || 'America/Sao_Paulo'
			})
			.replace(',', '');

		console.log(ansicolor.darkGray(`${formattedDate} |`), flag_color(`[${flag.toUpperCase()}]`), ...content);
	}

	static success(flag: string, content: any[] | any) {
		this.log(flag, ansicolor.lightGreen, content);
	}

	static error(flag: string, content: any[] | any) {
		this.log(flag, ansicolor.lightRed, content);
	}

	static info(flag: string, content: any[] | any) {
		this.log(flag, ansicolor.lightCyan, content);
	}

	static warn(flag: string, content: any[] | any) {
		this.log(flag, ansicolor.lightYellow, content);
	}
}
