<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';
import type { DiscordEmbed, DiscordMessage } from '~/shared/discord';

const props = defineProps<{
	number: number;
}>();

const emit = defineEmits<{
	delete: [];
}>();

const messageModel = defineModel<DiscordMessage>('message');

const collapsed = ref<boolean>(false);

const messageContent = computed({
	get: () => messageModel.value?.content || '',
	set: (value: string) => {
		if (messageModel.value) messageModel.value.content = value;
	}
});

const toggleCollapse = () => {
	collapsed.value = !collapsed.value;
};

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
	<div class="bg-neutral-400 dark:bg-neutral-800 rounded-lg px-2 py-2">
		<div @click="toggleCollapse" class="flex items-center cursor-pointer">
			<Icon
				name="mdi:chevron-down"
				size="20"
				:class="
					twMerge(
						'text-neutral-900 dark:text-neutral-100 duration-200',
						collapsed ? '-rotate-90' : 'rotate-0'
					)
				" />

			<p class="text-neutral-900 dark:text-neutral-100 text-lg font-semibold">
				Message ({{ props.number.toString().padStart(2, '0') }})
			</p>

			<div class="flex-grow flex justify-end items-center">
				<Icon
					name="mdi:delete"
					size="20"
					class="text-neutral-800 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 cursor-pointer duration-200"
					@click.stop="handleDelete" />
			</div>
		</div>

		<Transition name="transition_fade_200" mode="out-in">
			<div v-if="!collapsed" class="mt-2 flex flex-col gap-2">
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
					<Button @click="handleAddNewEmbed" theme="primary"> <Icon name="mdi:plus" /> Add New Embed </Button>
				</div>
			</div>
		</Transition>
	</div>
</template>
