<script lang="ts" setup>
const { t } = useI18n();

const inputContent = ref('');
const outputContent = ref('');

watch(inputContent, newValue => {
	outputContent.value = btoa(newValue);
});

watch(outputContent, newValue => {
	try {
		inputContent.value = atob(newValue);
	} catch {
		return;
	}
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/tools/base64-text.scss';
</style>

<template>
	<div class="tools-base64-text-container">
		<div>
			<InputsTextArea
				v-model="inputContent"
				:label="t('components.tools.base64_text.input.label')"
				:placeholder="t('components.tools.base64_text.input.placeholder')"
				:rows="8" />
		</div>

		<div>
			<InputsTextArea
				v-model="outputContent"
				:label="t('components.tools.base64_text.output.label')"
				:placeholder="t('components.tools.base64_text.output.placeholder')"
				:rows="8" />
		</div>
	</div>
</template>
