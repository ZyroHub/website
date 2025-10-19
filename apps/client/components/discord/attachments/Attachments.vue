<script lang="ts" setup>
import type { DiscordAttachment } from '~/shared/discord/discord';

const props = defineProps<{
	attachments: DiscordAttachment[];
}>();

const imageAttachments = computed(() =>
	props.attachments.filter(attachment => attachment.type === 'image' && !attachment.placements?.length)
);
const otherAttachments = computed(() => props.attachments.filter(attachment => attachment.type === 'other'));
</script>

<template>
	<div>
		<div v-if="otherAttachments.length" class="flex flex-col gap-1">
			<DiscordAttachmentsOther
				v-for="attachment in otherAttachments"
				:key="attachment.id"
				:attachment="attachment" />
		</div>

		<div v-if="imageAttachments.length" class="flex flex-wrap gap-2 mt-2">
			<img
				v-for="attachment in imageAttachments"
				:key="attachment.id"
				:src="attachment.preview_url"
				alt="Attachment Preview"
				class="max-w-max max-h-64 object-contain rounded-md border border-neutral-400" />
		</div>
	</div>
</template>
