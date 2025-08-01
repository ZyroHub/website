<script lang="ts" setup>
import type { DiscordEmbedFooter } from '~/shared/discord';

const props = defineProps<{
	footer?: DiscordEmbedFooter;
	timestamp?: string;
}>();
</script>

<template>
	<div>
		<div class="flex items-center">
			<template v-if="props.footer">
				<img v-if="props.footer.icon_url" :src="props.footer.icon_url" class="w-5 h-5 rounded-full" />

				<p class="text-xs text-neutral-300 font-medium ml-2">{{ props.footer.text }}</p>
			</template>

			<div v-if="props.timestamp" class="flex items-center ml-1 gap-1">
				<p v-if="props.footer" class="text-xs text-neutral-300 font-medium">•</p>
				<DiscordDateTimestamp
					:date="new Date(props.timestamp)"
					class="text-xs text-neutral-300 font-medium"
					fullDate />
			</div>
		</div>
	</div>
</template>
