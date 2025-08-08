<script lang="ts" setup>
import type { DiscordWebhook } from '~/shared/discord';

const props = defineProps<{
	webhook: DiscordWebhook;
}>();

const webhookAvatar = computed(() => props.webhook.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png');
</script>

<template>
	<div class="flex items-center gap-4 rounded-md bg-neutral-400 dark:bg-neutral-900 px-4 py-2 w-full max-w-full">
		<img :src="webhookAvatar" alt="Webhook Avatar" class="w-10 h-10 rounded-full" />

		<div class="flex flex-col max-w-full overflow-hidden">
			<p class="font-semibold truncate max-w-full">{{ props.webhook.name }}</p>
			<p class="text-sm dark:text-gray-400 truncate max-w-full">{{ props.webhook.id }}</p>
		</div>
	</div>
</template>
