export interface DiscordEmbedAuthor {
	name: string;
	url?: string;
	icon_url?: string;
}

export interface DiscordEmbedImage {
	url: string;
}

export interface DiscordEmbedThumbnail {
	url: string;
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
	color?: number;
	footer?: DiscordEmbedFooter;
	image?: DiscordEmbedImage;
	thumbnail?: DiscordEmbedThumbnail;
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
