<script lang="ts" setup>
import type { DiscordEmbed } from '~/shared/discord';

const props = defineProps<{
	embed: DiscordEmbed;
}>();
</script>

<template>
	<div>
		<DiscordContainer>
			<DiscordContent
				v-if="props.embed.title"
				:content="props.embed.title"
				class="font-semibold"
				disableMarkdown />
		</DiscordContainer>
	</div>
</template>
