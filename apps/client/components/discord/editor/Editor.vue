<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';
import type { DiscordMessage } from '~/shared/discord';

const props = defineProps<{
	number: number;
}>();

const emit = defineEmits<{
	delete: [];
}>();

const messageModel = defineModel<DiscordMessage>('message');

const collapsed = ref<boolean>(false);

const messageContent = ref<string>(messageModel.value?.content || '');

const toggleCollapse = () => {
	collapsed.value = !collapsed.value;
};

const handleDelete = () => {
	emit('delete');
};

watch(messageContent, newValue => {
	if (messageModel.value) {
		messageModel.value.content = newValue;
	}
});
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
			<div v-if="!collapsed" class="mt-2">
				<InputsTextArea v-model="messageContent" :rows="3" />
			</div>
		</Transition>
	</div>
</template>
