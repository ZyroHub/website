<script lang="ts" setup>
import type { DiscordMessage } from '~/shared/discord';

const discordMessages = ref<DiscordMessage[]>([]);

const handleAddNewMessage = () => {
	discordMessages.value.push({
		id: crypto.randomUUID(),
		content: '',
		embeds: [],
		author: {
			name: '',
			avatar: ''
		},
		components: []
	});
};

const handleDeleteMessage = (discord_id: string) => {
	const index = discordMessages.value.findIndex(message => message.id === discord_id);
	if (index !== -1) {
		discordMessages.value.splice(index, 1);
	}
};
</script>

<template>
	<div class="flex gap-4">
		<div class="flex-grow flex flex-col gap-4">
			<div class="flex flex-col gap-2 max-w-full">
				<div v-for="(discordMessage, discordMessageI) in discordMessages" :key="discordMessage.id">
					<DiscordEditor
						v-model:message="discordMessages[discordMessageI]"
						:number="discordMessageI + 1"
						@delete="() => handleDeleteMessage(discordMessage.id)" />
				</div>
			</div>

			<div>
				<Button @click="handleAddNewMessage" theme="primary"><Icon name="mdi:plus" /> Add New Message</Button>
			</div>
		</div>

		<div class="min-w-[40rem] min-h-32 px-4 py-4 bg-[#1a1a1e] rounded-lg">
			<div class="flex flex-col gap-1">
				<DiscordMessage
					v-for="(discordMessage, discordMessageI) in discordMessages"
					:key="discordMessage.id"
					:message="discordMessage"
					:hideUser="discordMessageI > 0" />
			</div>

			<div
				v-if="discordMessages.length === 0"
				class="flex flex-col justify-center items-center w-full h-full px-4 py-4">
				<Icon name="mdi:discord" size="48" class="text-neutral-50 mb-2" />

				<p class="text-center text-neutral-50 text-sm max-w-80">
					No messages to display. Use the form to generate a new Discord message.
				</p>
			</div>
		</div>
	</div>
</template>
