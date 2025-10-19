<script lang="ts" setup>
import type { DiscordAttachment } from '~/shared/discord/discord';

const props = defineProps<{
	attachment: DiscordAttachment;
}>();

const fileSize = computed(() => {
	if (!props.attachment.file) return 'N/A';
	return formatFileSize(props.attachment.file.size);
});
</script>

<template>
	<div class="flex items-center w-80 gap-1 px-2 py-2 rounded-lg bg-[#242429] border border-solid border-[#3E3E44FF]">
		<div class="flex items-center min-w-12">
			<Icon name="mdi:file-outline" size="48" class="text-neutral-400" />
		</div>

		<div class="flex flex-col flex-grow min-w-0">
			<p class="truncate text-sm text-blue-300">
				{{ props.attachment.name }} awdwadawd wadawdwadw awdwadwa awdwadaw
			</p>
			<p class="text-xs text-neutral-400">{{ fileSize }}</p>
		</div>
	</div>
</template>
