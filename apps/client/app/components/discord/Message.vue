<script lang="ts" setup>
import type { DiscordMessage } from '~~/shared/discord/discord';

const props = defineProps<{
	message: DiscordMessage;
	hideUser?: boolean;
	user?: {
		id?: string;
		name?: string;
		avatar?: string;
	};
}>();

const userName = computed(() => props.user?.name || 'ZyroHub');
const userAvatar = computed(() =>
	props.user?.avatar
		? `https://cdn.discordapp.com/avatars/${props.user.id}/${props.user.avatar}.webp?size=64`
		: '/images/zyro-photo.png'
);
</script>

<template>
	<div class="flex gap-3">
		<div>
			<img v-if="!props.hideUser" :src="userAvatar" class="w-10 h-10 rounded-full" />
			<div v-else class="w-10" />
		</div>

		<div class="max-w-[calc(100%-62px)]">
			<div v-if="!props.hideUser" class="text-white flex items-end font-open text-base mb-1">
				<p class="leading-18px font-medium">{{ userName }}</p>
				<p class="px-[0.30rem] font-semibold ml-1 text-[14px] leading-[18px] rounded-[4px] bg-[#5865f2]">APP</p>
				<DiscordDateTimestamp class="ml-2" />
			</div>

			<div>
				<DiscordContent
					v-if="props.message.content"
					:content="props.message.content"
					class="-mt-1 max-w-[500px] text-neutral-200" />

				<div v-if="props.message.attachments?.length" class="mt-1 mb-1">
					<DiscordAttachments
						v-if="props.message.attachments"
						:attachments="props.message.attachments || []" />
				</div>

				<div class="flex flex-col gap-1">
					<DiscordEmbed v-for="(embed, embedI) in props.message.embeds" :key="embedI" :embed="embed" />
				</div>

				<div v-if="props.message.components?.length" class="flex flex-col gap-1 mt-1">
					<DiscordComponentRow v-for="row in props.message.components" :key="row.id" :row="row" />
				</div>
			</div>
		</div>
	</div>
</template>
