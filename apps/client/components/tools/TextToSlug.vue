<script lang="ts" setup>
const { t } = useI18n();

const form = useForm({
	input: ''
});

const output = computed(() => {
	return form.values.value.input
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
});
</script>

<template>
	<div class="flex flex-col gap-4">
		<InputsProvider :form="form">
			<InputsText
				:label="t('components.tools.text_to_slug.input.label')"
				:placeholder="t('components.tools.text_to_slug.input.placeholder')"
				name="input" />

			<InputsText
				v-model="output"
				:label="t('components.tools.text_to_slug.output.label')"
				:placeholder="t('components.tools.text_to_slug.output.placeholder')"
				readonly
				show-copy />
		</InputsProvider>
	</div>
</template>
