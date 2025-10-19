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
						footer: embed.footer?.text
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
		2
	);
};

export const generateDiscordJavascriptCode = (messages: DiscordMessage[]) => {
	return '';
};

export const generateDiscordJDACode = (messages: DiscordMessage[]) => {
	return '';
};

export const generateDiscordPythonCode = (messages: DiscordMessage[]) => {
	return '';
};

export const generateDiscordCode = (messages: DiscordMessage[], language: string) => {
	switch (language) {
		case 'json':
			return generateDiscordJSONCode(messages);
		case 'discord.js':
			return generateDiscordJavascriptCode(messages);
		case 'jda':
			return generateDiscordJDACode(messages);
		case 'python':
			return generateDiscordPythonCode(messages);
		default:
			return '';
	}
};
