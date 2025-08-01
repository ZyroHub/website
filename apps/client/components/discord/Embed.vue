<script lang="ts" setup>
import { DiscordThumbnail } from '#components';
import type { DiscordEmbed } from '~/shared/discord';

const props = defineProps<{
	embed: DiscordEmbed;
}>();
</script>

<template>
	<div>
		<DiscordContainer>
			<div class="flex justify-between gap-4">
				<div>3
					<DiscordContent
						v-if="props.embed.title"
						:content="props.embed.title"
						class="font-semibold text-neutral-50"
						disableMarkdown />

					<DiscordContent
						v-if="props.embed.description"
						:content="props.embed.description"
						class="text-[14px] mt-2 text-neutral-200" />
				</div>

				<div v-if="props.embed.thumbnail">
					<DiscordThumbnail :src="props.embed.thumbnail" />
				</div>
			</div>
		</DiscordContainer>
	</div>
</template>
