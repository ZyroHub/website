import { hexColorToDecimal } from '../colors';
import { getAttachmentReferenceUrl, type DiscordMessage } from './discord';

export const discordGeneratorLanguages = [
	{ id: 'json', name: 'JSON', language: 'json' },
	{ id: 'discord.js', name: 'Discord.js', language: 'javascript' },
	{ id: 'jda', name: 'JDA', language: 'java' },
	{ id: 'python', name: 'Discord.py', language: 'python' }
];

export const mountDiscordAPICode = (message: DiscordMessage) => {
	return {
		content: message.content || undefined,
		embeds:
			message.embeds && message.embeds.length > 0
				? message.embeds?.map(embed => ({
						title: embed.title || undefined,
						description: embed.description || undefined,
						url: embed.url || undefined,
						color: embed.color ? hexColorToDecimal(embed.color) : undefined,
						image: embed.image ? { url: getAttachmentReferenceUrl(message, embed.image) } : undefined,
						thumbnail: embed.thumbnail
							? { url: getAttachmentReferenceUrl(message, embed.thumbnail) }
							: undefined,
						footer:
							embed.footer?.text || embed.footer?.icon
								? {
										text: embed.footer?.text,
										icon_url: getAttachmentReferenceUrl(message, embed.footer.icon)
									}
								: undefined,
						author: embed.author?.name
							? {
									name: embed.author?.name,
									url: embed.author?.url || undefined,
									icon_url: getAttachmentReferenceUrl(message, embed.author?.icon)
								}
							: undefined,
						fields:
							embed.fields && embed.fields.length > 0
								? embed.fields?.map(field => ({
										name: field.name || undefined,
										value: field.value || undefined,
										inline: field.inline || undefined
									}))
								: undefined
					}))
				: undefined
	};
};

export const generateDiscordJSONCode = (messages: DiscordMessage[]) => {
	return JSON.stringify(
		messages.map(message => mountDiscordAPICode(message)),
		null,
		4
	);
};

export const generateDiscordJSCode = (messages: DiscordMessage[]) => {
	if (messages.length === 0) return '// ------';

	const mountedMessages: string[] = [];

	let messageNum = 0;
	let embedNum = 0;

	for (const message of messages) {
		let actualMessageNum = ++messageNum;

		const mountedEmbeds: { id: number; chain: string }[] = [];

		for (const embed of message.embeds || []) {
			let actualEmbedNum = ++embedNum;

			let embedChain = `const embed${actualEmbedNum} = new EmbedBuilder()`;

			if (embed.title) embedChain += `\n\t.setTitle(${JSON.stringify(embed.title)})`;
			if (embed.url) embedChain += `\n\t.setURL(${JSON.stringify(embed.url)})`;
			if (embed.description) embedChain += `\n\t.setDescription(${JSON.stringify(embed.description)})`;

			if (embed.image)
				embedChain += `\n\t.setImage(${JSON.stringify(getAttachmentReferenceUrl(message, embed.image))})`;
			if (embed.thumbnail)
				embedChain += `\n\t.setThumbnail(${JSON.stringify(getAttachmentReferenceUrl(message, embed.thumbnail))})`;

			if (embed.author?.name || embed.author?.icon || embed.author?.url) {
				let authorChain = `\n\t.setAuthor({`;
				const authorProperties: string[] = [];

				if (embed.author?.name) authorProperties.push(`\n\t\tname: ${JSON.stringify(embed.author.name)}`);
				if (embed.author?.icon)
					authorProperties.push(
						`\n\t\ticonURL: ${JSON.stringify(getAttachmentReferenceUrl(message, embed.author.icon))}`
					);
				if (embed.author?.url) authorProperties.push(`\n\t\turl: ${JSON.stringify(embed.author.url)}`);

				authorChain += `${authorProperties.join(', ')}`;
				authorChain += `\n\t})`;

				embedChain += authorChain;
			}

			if (embed.fields && embed.fields.length > 0) {
				let fieldsChain = `\n\t.addFields(\n`;
				const fieldChains: string[] = [];

				for (const field of embed.fields) {
					let fieldChain = `\t\t{\n`;
					const fieldProperties: string[] = [];

					if (field.name) fieldProperties.push(`\t\t\tname: ${JSON.stringify(field.name)}`);
					if (field.value) fieldProperties.push(`\t\t\tvalue: ${JSON.stringify(field.value)}`);
					if (field.inline) fieldProperties.push(`\t\t\tinline: ${field.inline}`);

					fieldChain += fieldProperties.join(',\n') + `\n\t\t}`;
					fieldChains.push(fieldChain);
				}

				fieldsChain += `${fieldChains.join(',\n')}\n\t)`;
				embedChain += fieldsChain;
			}

			if (embed.footer?.text || embed.footer?.icon) {
				let footerChain = `\n\t.setFooter({`;
				const footerProperties: string[] = [];

				if (embed.footer?.text) footerProperties.push(`\n\t\ttext: ${JSON.stringify(embed.footer.text)}`);
				if (embed.footer?.icon)
					footerProperties.push(
						`\n\t\ticonURL: ${JSON.stringify(getAttachmentReferenceUrl(message, embed.footer.icon))}`
					);

				footerChain += `${footerProperties.join(', ')}`;
				footerChain += `\n\t})`;

				embedChain += footerChain;
			}

			if (embed.color) embedChain += `\n\t.setColor(${JSON.stringify(hexColorToDecimal(embed.color))})`;

			embedChain += ';';

			mountedEmbeds.push({ id: actualEmbedNum, chain: embedChain });
		}

		let messageChain = ``;

		messageChain += `// Message ${actualMessageNum}\n`;
		messageChain += mountedEmbeds.map(embed => embed.chain).join('\n\n') + (mountedEmbeds.length > 0 ? '\n\n' : '');

		messageChain += `channel.send({\n`;

		const propertiesChain: string[] = [];

		if (message.content) propertiesChain.push(`\tcontent: ${JSON.stringify(message.content)}`);
		if (mountedEmbeds.length > 0)
			propertiesChain.push(`\tembeds: [${mountedEmbeds.map(embed => `embed${embed.id}`).join(', ')}]`);

		messageChain += propertiesChain.join(',\n') + '\n';

		messageChain += `});`;

		mountedMessages.push(messageChain);
	}

	return mountedMessages.join('\n\n');
};

export const generateDiscordJDACode = (messages: DiscordMessage[]) => {
	if (messages.length === 0) return '// ------';

	return '';
};

export const generateDiscordPythonCode = (messages: DiscordMessage[]) => {
	if (messages.length === 0) return '# ------';

	return '';
};

export const generateDiscordCode = (messages: DiscordMessage[], language: string) => {
	switch (language) {
		case 'json':
			return generateDiscordJSONCode(messages);
		case 'discord.js':
			return generateDiscordJSCode(messages);
		case 'jda':
			return generateDiscordJDACode(messages);
		case 'python':
			return generateDiscordPythonCode(messages);
		default:
			return '';
	}
};
