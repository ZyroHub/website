<script lang="ts" setup>
import type { DiscordMessage } from '~/shared/discord';

const props = defineProps<{
	message: DiscordMessage;
}>();

const actualDateFormat = computed(() => {
	const date = new Date();
	return `${date.toLocaleTimeString('en-US', { timeStyle: 'short' })}`;
});

const userName = computed(() => props.message.author?.name || 'ZyroHub');
const userAvatar = computed(() => props.message.author?.avatar || '/images/zyro-photo.png');
</script>

<template>
	<div class="flex gap-3">
		<div>
			<img :src="userAvatar" class="w-10 h-10 rounded-full" />
		</div>

		<div class="max-w-[calc(100%-62px)]">
			<div class="text-white flex items-end font-open text-base">
				<p class="leading-18px font-medium">{{ userName }}</p>
				<p class="px-[0.30rem] font-semibold ml-1 text-[14px] leading-[18px] rounded-[4px] bg-[#5865f2]">APP</p>
				<p class="text-[#7f8189] font-normal ml-2 text-xs">{{ actualDateFormat }}</p>
			</div>

			<div class="mt-1">
				<DiscordContent v-if="props.message.content" :content="props.message.content" />

				<DiscordEmbed v-for="(embed, embedI) in props.message.embeds" :key="embedI" :embed="embed" />
			</div>
		</div>
	</div>
</template>
