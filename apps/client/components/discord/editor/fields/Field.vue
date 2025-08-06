<script lang="ts" setup>
import type { DiscordEmbedField } from '~/shared/discord';

const props = defineProps<{
	number: number;
}>();

const fieldModel = defineModel<DiscordEmbedField>('field');

const emit = defineEmits<{
	delete: [];
}>();

const fieldName = computed({
	get: () => fieldModel.value?.name || '',
	set: (value: string) => {
		if (fieldModel.value) fieldModel.value.name = value;
	}
});

const fieldInline = computed({
	get: () => fieldModel.value?.inline || false,
	set: (value: boolean) => {
		if (fieldModel.value) fieldModel.value.inline = value;
	}
});

const fieldValue = computed({
	get: () => fieldModel.value?.value || '',
	set: (value: string) => {
		if (fieldModel.value) fieldModel.value.value = value;
	}
});

const handleDelete = () => {
	emit('delete');
};
</script>

<template>
	<DiscordEditorCollapsable
		:title="`Field (${props.number.toString().padStart(2, '0')})`"
		class="bg-neutral-400 dark:bg-neutral-900">
		<template #actions>
			<Icon
				name="mdi:delete"
				size="20"
				class="hover:text-red-600 dark:hover:text-red-400 cursor-pointer duration-200"
				@click.stop="handleDelete" />
		</template>

		<template #default>
			<div class="flex items-end justify-between">
				<InputsText v-model="fieldName" label="Name" class="w-full" />

				<div class="px-4">
					<InputsCheckbox v-model="fieldInline" label="Inline" />
				</div>
			</div>

			<InputsTextArea v-model="fieldValue" label="Value" />
		</template>
	</DiscordEditorCollapsable>
</template>
