<script lang="ts" setup>
import type { DiscordAttachment } from '~/shared/discord';

const props = defineProps<{
	attachments: DiscordAttachment[];
}>();

const imageAttachments = computed(() => props.attachments.filter(attachment => attachment.type === 'image'));
const otherAttachments = computed(() => props.attachments.filter(attachment => attachment.type === 'other'));
</script>

<template>
	<div>
		<div class="flex flex-col gap-1">
			<DiscordAttachmentsOther
				v-for="attachment in otherAttachments"
				:key="attachment.id"
				:attachment="attachment" />
		</div>

		<div></div>
	</div>
</template>
