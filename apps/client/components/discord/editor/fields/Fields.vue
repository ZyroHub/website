<script lang="ts" setup>
import type { DiscordEmbedField } from '~/shared/discord/discord';

const { t } = useI18n();

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

const handleMoveUpField = (field_id: string) => {
	if (!fieldsModel.value) return;

	const index = fieldsModel.value.findIndex(field => field.id === field_id);
	if (index > 0) {
		const temp = fieldsModel.value[index - 1];
		fieldsModel.value[index - 1] = fieldsModel.value[index];
		fieldsModel.value[index] = temp;
	}
};

const handleMoveDownField = (field_id: string) => {
	if (!fieldsModel.value) return;

	const index = fieldsModel.value.findIndex(field => field.id === field_id);
	if (index !== -1 && index < fieldsModel.value.length - 1) {
		const temp = fieldsModel.value[index + 1];
		fieldsModel.value[index + 1] = fieldsModel.value[index];
		fieldsModel.value[index] = temp;
	}
};
</script>

<template>
	<DiscordEditorCollapsable
		:title="`${t('components.discord.editor.fields.title')} (${fieldsModel?.length.toString().padStart(2, '0')}/${maxFields.toString().padStart(2, '0')})`"
		collapsed>
		<template #default>
			<div v-if="fieldsModel?.length" class="flex flex-col gap-2">
				<DiscordEditorFieldsField
					v-for="(field, fieldI) in fieldsModel || []"
					:key="field.id"
					v-model:field="fieldsModel[fieldI]"
					:number="fieldI + 1"
					:total="fieldsModel.length"
					@delete="() => handleDeleteField(field.id)"
					@moveUp="() => handleMoveUpField(field.id)"
					@moveDown="() => handleMoveDownField(field.id)" />
			</div>

			<div>
				<Button @click="handleAddNewField" theme="primary" :disabled="(fieldsModel?.length || 0) >= maxFields">
					<Icon name="mdi:plus" /> {{ t('components.discord.editor.fields.add') }}
				</Button>
			</div>
		</template>
	</DiscordEditorCollapsable>
</template>
