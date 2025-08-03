<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';

const props = defineProps<{
	title?: string;
	class?: string;
	collapsed?: boolean;
	headerClass?: string;
}>();

const collapsed = ref<boolean>(props.collapsed ?? false);

const toggleCollapse = () => {
	collapsed.value = !collapsed.value;
};
</script>

<template>
	<div :class="twMerge('bg-neutral-400 dark:bg-neutral-800 rounded-lg px-2 py-2', props.class)">
		<div
			@click="toggleCollapse"
			:class="
				twMerge('flex items-center cursor-pointer text-neutral-900 dark:text-neutral-100', props.headerClass)
			">
			<Icon
				name="mdi:chevron-down"
				size="20"
				:class="twMerge('duration-200', collapsed ? '-rotate-90' : 'rotate-0')" />

			<p v-if="props.title" class="text-lg font-semibold">
				{{ props.title }}
			</p>

			<div class="flex-grow flex justify-end items-center">
				<slot name="actions" />
			</div>
		</div>

		<Transition name="transition_fade_200" mode="out-in">
			<div v-if="!collapsed" class="mt-2 flex flex-col gap-2">
				<slot />
			</div>
		</Transition>
	</div>
</template>
