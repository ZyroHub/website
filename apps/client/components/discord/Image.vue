<script lang="ts" setup>
import type { DiscordAttachmentReference } from '~/shared/discord';

const props = defineProps<{
	attachment?: DiscordAttachmentReference;
}>();
</script>

<template>
	<img :src="props.attachment?.url" class="max-w-[400px] max-h-[300px] rounded-md" alt="Large Image" loading="lazy" />
</template>
