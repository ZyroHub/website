<script lang="ts" setup>
import type { DiscordAttachment, DiscordEmbed, DiscordMessage } from '~/shared/discord';

const props = defineProps<{
	number: number;
}>();

const emit = defineEmits<{
	delete: [];
}>();

const messageModel = defineModel<DiscordMessage>('message');

const hasErrors = computed(() => {
	return !!messageModel.value?.errors && messageModel.value.errors.length > 0;
});

const messageContent = computed({
	get: () => messageModel.value?.content || '',
	set: (value: string) => {
		if (messageModel.value) messageModel.value.content = value;
	}
});

const messageAttachments = computed({
	get: () => messageModel.value?.attachments || [],
	set: (value: DiscordAttachment[]) => {
		if (messageModel.value) messageModel.value.attachments = value;
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
		author: {
			name: ''
		},
		url: '',
		footer: {
			text: ''
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

const handleMoveUpEmbed = (embed_id: string) => {
	if (!messageModel.value || !messageModel.value.embeds) return;

	const index = messageModel.value.embeds.findIndex(embed => embed.id === embed_id);
	if (index > 0) {
		const temp = messageModel.value.embeds[index - 1];
		messageModel.value.embeds[index - 1] = messageModel.value.embeds[index];
		messageModel.value.embeds[index] = temp;
	}
};

const handleMoveDownEmbed = (embed_id: string) => {
	if (!messageModel.value || !messageModel.value.embeds) return;

	const index = messageModel.value.embeds.findIndex(embed => embed.id === embed_id);
	if (index !== -1 && index < messageModel.value.embeds.length - 1) {
		const temp = messageModel.value.embeds[index + 1];
		messageModel.value.embeds[index + 1] = messageModel.value.embeds[index];
		messageModel.value.embeds[index] = temp;
	}
};
</script>

<template>
	<DiscordEditorCollapsable :title="`Message (${props.number.toString().padStart(2, '0')})`" :hasWarns="hasErrors">
		<template #actions>
			<Icon
				name="mdi:delete"
				size="20"
				class="hover:text-red-600 dark:hover:text-red-400 cursor-pointer duration-200"
				@click.stop="handleDelete" />
		</template>

		<template #default>
			<div v-if="hasErrors">
				<DiscordEditorError
					v-for="(error, errorI) in messageModel?.errors || []"
					:key="errorI"
					:error="error" />
			</div>

			<InputsTextArea v-model="messageContent" :rows="3" :counterMax="2000" showCounter />

			<DiscordEditorAttachments v-model:attachments="messageAttachments" />

			<div v-if="messageModel?.embeds?.length" class="flex flex-col gap-2">
				<DiscordEditorEmbed
					v-for="(embed, embedI) in messageModel?.embeds || []"
					:key="embed.id"
					v-model:embed="messageModel.embeds[embedI]"
					:number="embedI + 1"
					:total="messageModel.embeds.length"
					@delete="() => handleDeleteEmbed(embed.id)"
					@moveUp="() => handleMoveUpEmbed(embed.id)"
					@moveDown="() => handleMoveDownEmbed(embed.id)" />
			</div>

			<div>
				<Button @click="handleAddNewEmbed" theme="primary"> <Icon name="mdi:plus" /> Add New Embed</Button>
			</div>
		</template>
	</DiscordEditorCollapsable>
</template>
