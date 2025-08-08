<script lang="ts" setup>
import type { DiscordEmbedField } from '~/shared/discord';

const fieldsModel = defineModel<DiscordEmbedField[]>('fields');

const maxFields = ref(25);

const handleAddNewField = () => {
	const newField: DiscordEmbedField = {
		id: crypto.randomUUID(),
		name: '',
		value: '',
		inline: false
	};

	fieldsModel.value?.push(newField);
};

const handleDeleteField = (field_id: string) => {
	const index = fieldsModel.value?.findIndex(field => field.id === field_id);

	if (index !== undefined && index !== -1) {
		fieldsModel.value?.splice(index, 1);
	}
};
</script>

<template>
	<DiscordEditorCollapsable
		:title="`Fields (${fieldsModel?.length.toString().padStart(2, '0')}/${maxFields.toString().padStart(2, '0')})`"
		collapsed>
		<template #default>
			<div v-if="fieldsModel?.length" class="flex flex-col gap-2">
				<DiscordEditorFieldsField
					v-for="(field, fieldI) in fieldsModel || []"
					:key="field.id"
					v-model:field="fieldsModel[fieldI]"
					:number="fieldI + 1"
					@delete="() => handleDeleteField(field.id)" />
			</div>

			<div>
				<Button @click="handleAddNewField" theme="primary" :disabled="(fieldsModel?.length || 0) >= maxFields">
					<Icon name="mdi:plus" /> Add New Field
				</Button>
			</div>
		</template>
	</DiscordEditorCollapsable>
</template>
