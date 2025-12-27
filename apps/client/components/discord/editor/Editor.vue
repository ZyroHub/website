<script lang="ts" setup>
import type {
	DiscordAttachment,
	DiscordAttachmentPlacement,
	DiscordEmbed,
	DiscordMessage
} from '~/shared/discord/discord';

const props = defineProps<{
	number: number;
}>();

const emit = defineEmits<{
	delete: [];
}>();

const { t } = useI18n();

const messageModel = defineModel<DiscordMessage>('message');

const hasErrors = computed(() => {
	return !!messageModel.value?.errors && messageModel.value.errors.length > 0;
});

const messageContent = computed({
	get: () => messageModel.value?.content || '',
	set: (value: string) => {
		if (messageModel.value) messageModel.value.content = value;
	}
});

const messageAttachments = computed({
	get: () => messageModel.value?.attachments || [],
	set: (value: DiscordAttachment[]) => {
		if (messageModel.value) messageModel.value.attachments = value;
	}
});

const handleDelete = () => {
	emit('delete');
};

const handleAddNewEmbed = () => {
	if (!messageModel.value) return;

	const newEmbed: DiscordEmbed = {
		id: crypto.randomUUID(),
		title: '',
		description: '',
		color: '#ffb29a',
		author: {
			name: ''
		},
		url: '',
		footer: {
			text: ''
		},
		fields: []
	};

	if (!messageModel.value.embeds) {
		messageModel.value.embeds = [];
	}

	messageModel.value.embeds.push(newEmbed);
};

const handleDeleteEmbed = (embed_id: string) => {
	if (!messageModel.value || !messageModel.value.embeds) return;

	const index = messageModel.value.embeds.findIndex(embed => embed.id === embed_id);
	if (index !== -1) {
		messageModel.value.embeds.splice(index, 1);
	}
};

const handleMoveUpEmbed = (embed_id: string) => {
	if (!messageModel.value || !messageModel.value.embeds) return;

	const index = messageModel.value.embeds.findIndex(embed => embed.id === embed_id);
	if (index > 0) {
		const temp = messageModel.value.embeds[index - 1];
		messageModel.value.embeds[index - 1] = messageModel.value.embeds[index];
		messageModel.value.embeds[index] = temp;
	}
};

const handleMoveDownEmbed = (embed_id: string) => {
	if (!messageModel.value || !messageModel.value.embeds) return;

	const index = messageModel.value.embeds.findIndex(embed => embed.id === embed_id);
	if (index !== -1 && index < messageModel.value.embeds.length - 1) {
		const temp = messageModel.value.embeds[index + 1];
		messageModel.value.embeds[index + 1] = messageModel.value.embeds[index];
		messageModel.value.embeds[index] = temp;
	}
};

const handleAddAttachment = (attachment: DiscordAttachment) => {
	if (!messageModel.value) return;

	if (!messageModel.value.attachments) {
		messageModel.value.attachments = [];
	}

	messageModel.value.attachments.push(attachment);
};

const handleAddAttachmentPlacement = (attachment_id: string, placement: DiscordAttachmentPlacement) => {
	if (!messageModel.value || !messageModel.value.attachments) return;

	const attachmentData = messageModel.value.attachments.find(att => att.id === attachment_id);

	if (attachmentData) {
		if (!attachmentData.placements) {
			attachmentData.placements = [];
		}

		if (!attachmentData.placements.includes(placement)) {
			attachmentData.placements.push(placement);
		}
	}
};

const handleRemoveAttachment = (attachment_id: string, placement?: DiscordAttachmentPlacement) => {
	if (!messageModel.value || !messageModel.value.attachments) return;

	const attachmentData = messageModel.value.attachments.find(att => att.id === attachment_id);

	const newPlacementsList = attachmentData?.placements || [];
	if (placement) {
		if (newPlacementsList) {
			const placementIndex = newPlacementsList.indexOf(placement);

			if (placementIndex !== -1) {
				newPlacementsList.splice(placementIndex, 1);
			}
		}
	}

	if (attachmentData && (!placement || (placement && newPlacementsList.length === 0))) {
		if (attachmentData?.preview_url) {
			URL.revokeObjectURL(attachmentData.preview_url);
		}

		if (attachmentData.placements) {
			for (const attachmentPlacement of attachmentData.placements) {
				const placementMatch = attachmentPlacement.match(
					/^(?<prefix>embeds)\.(?<index>\d+)\.(?<type>image|thumbnail|author|footer)$/
				);

				if (placementMatch && messageModel.value.embeds) {
					const { index, type } = placementMatch.groups!;
					const embedIndex = parseInt(index, 10);

					if (embedIndex >= 0 && embedIndex < messageModel.value.embeds.length) {
						if (type === 'image') {
							messageModel.value.embeds[embedIndex].image = undefined;
						} else if (type === 'thumbnail') {
							messageModel.value.embeds[embedIndex].thumbnail = undefined;
						} else if (type === 'author') {
							if (messageModel.value.embeds[embedIndex].author) {
								messageModel.value.embeds[embedIndex].author.icon = undefined;
							}
						} else if (type === 'footer') {
							if (messageModel.value.embeds[embedIndex].footer) {
								messageModel.value.embeds[embedIndex].footer.icon = undefined;
							}
						}
					}
				}
			}
		}
	}

	if (!placement || !newPlacementsList.length) {
		const attachmentIndex = messageModel.value.attachments.findIndex(attachment => attachment.id === attachment_id);

		if (attachmentIndex !== -1) {
			messageModel.value.attachments.splice(attachmentIndex, 1);
		}
	}
};
</script>

<template>
	<DiscordEditorCollapsable
		:title="`${t('components.discord.editor.title')} (${props.number.toString().padStart(2, '0')})`"
		:hasWarns="hasErrors">
		<template #actions>
			<Icon
				name="mdi:delete"
				size="20"
				class="hover:text-red-600 dark:hover:text-red-400 cursor-pointer duration-200"
				@click.stop="handleDelete" />
		</template>

		<template #default>
			<div v-if="hasErrors">
				<DiscordEditorError
					v-for="(error, errorI) in messageModel?.errors || []"
					:key="errorI"
					:error="error" />
			</div>

			<InputsTextArea v-model="messageContent" :rows="3" :counterMax="2000" showCounter />

			<DiscordEditorAttachments
				v-model:attachments="messageAttachments"
				@addAttachment="handleAddAttachment"
				@removeAttachment="handleRemoveAttachment" />

			<div v-if="messageModel?.embeds?.length" class="flex flex-col gap-2">
				<DiscordEditorEmbed
					v-for="(embed, embedI) in messageModel?.embeds || []"
					:key="embed.id"
					v-model:embed="messageModel.embeds[embedI]"
					:number="embedI + 1"
					:total="messageModel.embeds.length"
					:attachments="messageModel.attachments || []"
					@delete="() => handleDeleteEmbed(embed.id)"
					@moveUp="() => handleMoveUpEmbed(embed.id)"
					@moveDown="() => handleMoveDownEmbed(embed.id)"
					@addAttachment="handleAddAttachment"
					@addAttachmentPlacement="handleAddAttachmentPlacement"
					@removeAttachment="handleRemoveAttachment" />
			</div>

			<div>
				<Button @click="handleAddNewEmbed" theme="primary">
					<Icon name="mdi:plus" /> {{ t('components.discord.editor.add_embed') }}
				</Button>
			</div>
		</template>
	</DiscordEditorCollapsable>
</template>
