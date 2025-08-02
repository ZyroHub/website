<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';
import type { DiscordEmbed } from '~/shared/discord';

const props = defineProps<{
	number: number;
}>();

const emit = defineEmits<{
	delete: [];
}>();

const embedModel = defineModel<DiscordEmbed>('embed');

const collapsed = ref<boolean>(false);

const embedTitle = computed({
	get: () => embedModel.value?.title || '',
	set: (value: string) => {
		if (embedModel.value) embedModel.value.title = value;
	}
});

const embedURL = computed({
	get: () => embedModel.value?.url || '',
	set: (value: string) => {
		if (embedModel.value) embedModel.value.url = value;
	}
});

const embedDescription = computed({
	get: () => embedModel.value?.description || '',
	set: (value: string) => {
		if (embedModel.value) embedModel.value.description = value;
	}
});

const toggleCollapse = () => {
	collapsed.value = !collapsed.value;
};

const handleDelete = () => {
	emit('delete');
};
</script>

<template>
	<div
		class="bg-neutral-400 dark:bg-neutral-900 rounded-lg px-2 py-2 b-l-solid"
		:style="{ borderColor: embedModel?.color?.toString() }">
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
				Embed ({{ props.number.toString().padStart(2, '0') }})
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
				<InputsText v-model="embedTitle" label="Title" />
				<InputsText v-model="embedURL" label="Title Url" />

				<InputsTextArea v-model="embedDescription" label="Description" :rows="3" />
			</div>
		</Transition>
	</div>
</template>
