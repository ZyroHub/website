<script lang="ts" setup>
import type {
	DiscordAttachment,
	DiscordAttachmentPlacement,
	DiscordAttachmentReference,
	DiscordEmbedAuthor
} from '~/shared/discord';

const props = defineProps<{
	embedNumber: number;
	attachments: DiscordAttachment[];
}>();

const emit = defineEmits<{
	addAttachment: [attachment: DiscordAttachment];
	addAttachmentPlacement: [attachment_id: string, placement: DiscordAttachmentPlacement];
	removeAttachment: [id: string, placement?: DiscordAttachmentPlacement];
}>();

const authorModel = defineModel<DiscordEmbedAuthor>('author');

const authorName = computed({
	get: () => authorModel.value?.name || '',
	set: (value: string) => {
		if (authorModel.value) authorModel.value.name = value;
	}
});

const authorURL = computed({
	get: () => authorModel.value?.url || '',
	set: (value: string) => {
		if (authorModel.value) authorModel.value.url = value;
	}
});

const authorIcon = computed({
	get: () => authorModel.value?.icon,
	set: (value: DiscordAttachmentReference) => {
		if (authorModel.value) authorModel.value.icon = value;
	}
});
</script>

<template>
	<DiscordEditorCollapsable title="Author" collapsed>
		<template #default>
			<div class="flex gap-4 w-full">
				<DiscordEditorImage
					class="w-20 h-20"
					v-model:image="authorIcon"
					:placement="`embeds.${props.embedNumber - 1}.author`"
					:attachments="props.attachments"
					@addAttachment="attachment => emit('addAttachment', attachment)"
					@addAttachmentPlacement="
						(attachment_id, placement) => emit('addAttachmentPlacement', attachment_id, placement)
					"
					@removeAttachment="(id, placement) => emit('removeAttachment', id, placement)" />

				<InputsText v-model="authorName" label="Name" class="flex-grow" :counterMax="2048" showCounter />
			</div>

			<InputsText v-model="authorURL" label="URL" />
		</template>
	</DiscordEditorCollapsable>
</template>
