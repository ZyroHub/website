<script lang="ts" setup>
import type { DiscordEmbed } from '~/shared/discord';

const props = defineProps<{
	number: number;
}>();

const embedModel = defineModel<DiscordEmbed>('embed');

const emit = defineEmits<{
	delete: [];
}>();

const embedColor = computed({
	get: () => embedModel.value?.color,
	set: (value: string) => {
		if (embedModel.value) embedModel.value.color = value;
	}
});

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

const handleDelete = () => {
	emit('delete');
};
</script>

<template>
	<DiscordEditorCollapsable
		:title="`Embed (${props.number.toString().padStart(2, '0')})`"
		class="bg-neutral-400 dark:bg-neutral-900 b-l-solid"
		:style="{ borderColor: embedModel?.color?.toString() }">
		<template #actions>
			<Icon
				name="mdi:delete"
				size="20"
				class="text-neutral-800 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 cursor-pointer duration-200"
				@click.stop="handleDelete" />
		</template>

		<template #default>
			<InputsText v-model="embedTitle" label="Title" />
			<InputsText v-model="embedURL" label="Title Url" />

			<InputsTextArea v-model="embedDescription" label="Description" :rows="3" />

			<color-picker
				v-model="embedColor"
				v-slot="{ color, show }"
				@close="console.log('ColorPicker is closed')"
				withHexInput>
				<div @click="show" class="flex items-center gap-1 w-full">
					<div class="flex justify-center items-center w-8">
						<Icon name="jam:eyedropper-f" size="20" />
					</div>

					<div class="flex-grow text-center rounded-md" :style="{ backgroundColor: color.value }">
						{{ color }}
					</div>
				</div>
			</color-picker>

			<DiscordEditorAuthor :author="embedModel?.author" />

			<DiscordEditorFooter :footer="embedModel?.footer" />
		</template>
	</DiscordEditorCollapsable>
</template>
