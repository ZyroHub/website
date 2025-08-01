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

export interface DiscordEmbedGroupedField {
	fields: DiscordEmbedField[];
	widths: number[];
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
