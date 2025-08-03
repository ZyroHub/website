<script lang="ts" setup>
import type { DiscordEmbed, DiscordMessage } from '~/shared/discord';

const props = defineProps<{
	number: number;
}>();

const emit = defineEmits<{
	delete: [];
}>();

const messageModel = defineModel<DiscordMessage>('message');

const messageContent = computed({
	get: () => messageModel.value?.content || '',
	set: (value: string) => {
		if (messageModel.value) messageModel.value.content = value;
	}
});

const handleDelete = () => {
	emit('delete');
};

const handleAddNewEmbed = () => {
	if (!messageModel.value) return;

	const newEmbed: DiscordEmbed = {
		id: crypto.randomUUID(),
		title: '',
		description: '',
		color: '#ffb29a',
		image: '',
		thumbnail: '',
		author: {
			name: '',
			icon_url: ''
		},
		url: '',
		footer: {
			text: '',
			icon_url: ''
		},
		fields: []
	};

	if (!messageModel.value.embeds) {
		messageModel.value.embeds = [];
	}

	messageModel.value.embeds.push(newEmbed);
};

const handleDeleteEmbed = (embed_id: string) => {
	if (!messageModel.value || !messageModel.value.embeds) return;

	const index = messageModel.value.embeds.findIndex(embed => embed.id === embed_id);
	if (index !== -1) {
		messageModel.value.embeds.splice(index, 1);
	}
};
</script>

<template>
	<DiscordEditorCollapsable :title="`Message (${props.number.toString().padStart(2, '0')})`">
		<template #actions>
			<Icon
				name="mdi:delete"
				size="20"
				class="text-neutral-800 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 cursor-pointer duration-200"
				@click.stop="handleDelete" />
		</template>

		<template #default>
			<InputsTextArea v-model="messageContent" :rows="3" />

			<div v-if="messageModel?.embeds?.length" class="flex flex-col gap-2">
				<DiscordEditorEmbed
					v-for="(embed, embedI) in messageModel?.embeds || []"
					:key="embed.id"
					v-model:embed="messageModel.embeds[embedI]"
					:number="embedI + 1"
					@delete="() => handleDeleteEmbed(embed.id)" />
			</div>

			<div>
				<Button @click="handleAddNewEmbed" theme="primary"> <Icon name="mdi:plus" /> Add New Embed</Button>
			</div>
		</template>
	</DiscordEditorCollapsable>
</template>
