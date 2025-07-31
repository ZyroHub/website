export type DiscordContainerColor = string | number;

export interface DiscordEmbedAuthor {
	name: string;
	url?: string;
	icon_url?: string;
}

export interface DiscordEmbedField {
	name: string;
	value: string;
	inline?: boolean;
}

export interface DiscordEmbedFooter {
	text: string;
	icon_url?: string;
}

export interface DiscordEmbed {
	title?: string;
	description?: string;
	url?: string;
	timestamp?: string;
	color?: DiscordContainerColor;
	footer?: DiscordEmbedFooter;
	image?: string;
	thumbnail?: string;
	author?: DiscordEmbedAuthor;
	fields?: DiscordEmbedField[];
}

export interface DiscordComponent {}

export interface DiscordAuthor {
	name: string;
	avatar?: string;
}

export interface DiscordMessage {
	author?: DiscordAuthor;
	content?: string;
	embeds?: DiscordEmbed[];
	components?: DiscordComponent[];
}
