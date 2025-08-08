<script lang="ts" setup>
import type { DiscordEmbedAuthor } from '~/shared/discord';

const props = defineProps<{
	author: DiscordEmbedAuthor;
}>();
</script>

<template>
	<div>
		<div class="flex items-center">
			<img v-if="props.author.icon_url" :src="props.author.icon_url" class="w-6 h-6 rounded-full" />

			<p v-if="props.author.name && !props.author.url" class="text-[14px] text-neutral-50 font-semibold ml-2">
				{{ props.author.name }}
			</p>
			<a
				v-else-if="props.author.name && props.author.url"
				:href="props.author.url"
				target="_blank"
				rel="noopener noreferrer">
				<p class="text-[14px] text-neutral-50 font-semibold ml-2 hover:underline">
					{{ props.author.name }}
				</p>
			</a>
		</div>
	</div>
</template>
