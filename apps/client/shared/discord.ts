export type DiscordContainerColor = string;

export interface DiscordAttachmentReference {
	id: string;
	type: 'url' | 'attachment';
	url?: string;
}

export interface DiscordAttachment {
	id: string;
	placements?: DiscordAttachmentPlacement[];
	name?: string;
	file?: File;
	type: 'image' | 'other';
	preview_url?: string;
}

export interface DiscordEmbedAuthor {
	name: string;
	url?: string;
	icon?: DiscordAttachmentReference;
}

export interface DiscordEmbedField {
	id: string;
	name: string;
	value: string;
	inline?: boolean;
}

export interface DiscordEmbedGroupedField {
	fields: DiscordEmbedField[];
	widths: number[];
}

export interface DiscordEmbedFooter {
	text: string;
	icon?: DiscordAttachmentReference;
}

export interface DiscordEmbed {
	id: string;
	title?: string;
	description?: string;
	url?: string;
	timestamp?: string;
	color?: DiscordContainerColor;
	footer?: DiscordEmbedFooter;
	image?: DiscordAttachmentReference;
	thumbnail?: DiscordAttachmentReference;
	author?: DiscordEmbedAuthor;
	fields?: DiscordEmbedField[];
	errors?: DiscordError[];
}

export interface DiscordComponentBase {
	id?: string;
}

export type DiscordComponentButton = {
	type: 'button';
	style: 'primary' | 'secondary' | 'success' | 'danger' | 'link';
	label?: string;
	emoji?: string;
	custom_id?: string;
	url?: string;
	disabled?: boolean;
} & DiscordComponentBase;

export type DiscordComponent = DiscordComponentButton;

export interface DiscordRow {
	id?: string;
	components: DiscordComponent[];
}

export interface DiscordAuthor {
	name: string;
	avatar?: string;
}

export interface DiscordError {
	message?: string;
	code?: number;
}

export type DiscordAttachmentPlacement = `embeds.${number}.${'image' | 'thumbnail' | 'author' | 'footer'}`;

export interface DiscordMessage {
	id: string;
	author?: DiscordAuthor;
	content?: string;
	attachments?: DiscordAttachment[];
	embeds?: DiscordEmbed[];
	components?: DiscordRow[];
	errors?: DiscordError[];
}

export interface DiscordWebhook {
	id?: string;
	url: string;
	name?: string;
	avatar?: string;
	token?: string;
}

export const getAttachmentFileName = (attachment: DiscordAttachment) => {
	return attachment.name || (attachment.file ? attachment.file.name : 'unknown') || 'unknown';
};

export const getAttachmentReferenceUrl = (message: DiscordMessage, attachment?: DiscordAttachmentReference) => {
	if (!attachment) return undefined;

	if (attachment.type === 'url' && attachment.url) {
		return attachment.url;
	} else if (attachment.type === 'attachment') {
		const foundAttachment = message.attachments?.find(att => att.id === attachment.id);

		return foundAttachment ? `attachment://${getAttachmentFileName(foundAttachment)}` : undefined;
	}

	return undefined;
};

export const groupFields = (fields: DiscordEmbedField[]): DiscordEmbedGroupedField[] => {
	const groupedFields: DiscordEmbedGroupedField[] = [];
	let currentInlineGroup: DiscordEmbedField[] = [];

	for (const field of fields) {
		if (!field.inline) {
			if (currentInlineGroup.length) {
				groupedFields.push({
					fields: currentInlineGroup,
					widths: getWidthsForFieldGroup(currentInlineGroup.length)
				});
				currentInlineGroup = [];
			}
			groupedFields.push({
				fields: [field],
				widths: [6]
			});
		} else {
			currentInlineGroup.push(field);
			if (currentInlineGroup.length === 3) {
				groupedFields.push({
					fields: currentInlineGroup,
					widths: getWidthsForFieldGroup(3)
				});
				currentInlineGroup = [];
			}
		}
	}

	if (currentInlineGroup.length) {
		groupedFields.push({
			fields: currentInlineGroup,
			widths: getWidthsForFieldGroup(currentInlineGroup.length)
		});
	}

	return groupedFields;
};

export const getWidthsForFieldGroup = (count: number): number[] => {
	switch (count) {
		case 1:
			return [6];
		case 2:
			return [3, 3];
		case 3:
			return [2, 2, 2];
		default:
			return Array(count).fill(6);
	}
};
