<script lang="ts" setup>
import type { DiscordAttachmentReference } from '~/shared/discord/discord';

const props = defineProps<{
	attachment?: DiscordAttachmentReference;
}>();
</script>

<template>
	<img :src="props.attachment?.url" class="w-20 h-20 rounded-md" alt="Thumbnail" loading="lazy" />
</template>
