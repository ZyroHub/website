<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';
import type { DiscordMessage } from '~/shared/discord';

const props = defineProps<{
	number: number;
}>();

const messageModel = defineModel<DiscordMessage>('message');

const collapsed = ref<boolean>(false);

const messageContent = ref<string>(messageModel.value?.content || '');

const toggleCollapse = () => {
	collapsed.value = !collapsed.value;
};

watch(messageContent, newValue => {
	if (messageModel.value) {
		messageModel.value.content = newValue;
	}
});
</script>

<template>
	<div class="dark:bg-neutral-800 rounded-lg px-2 py-2">
		<div @click="toggleCollapse" class="flex items-center cursor-pointer">
			<Icon
				name="mdi:chevron-down"
				size="20"
				:class="twMerge('text-neutral-400 duration-200', collapsed ? '-rotate-90' : 'rotate-0')" />

			<p class="text-lg font-semibold">Message ({{ props.number.toString().padStart(2, '0') }})</p>
		</div>

		<Transition name="transition_fade_200" mode="out-in">
			<div v-if="!collapsed" class="mt-2">
				<InputsTextArea v-model="messageContent" />
			</div>
		</Transition>
	</div>
</template>
