<script lang="ts" setup>
const { t } = useI18n();

const form = useForm({
	content: ''
});

const words = computed(() => {
	return form.values.value.content
		.trim()
		.split(/\s+/)
		.filter(word => word.length > 0).length;
});

const characters = computed(() => form.values.value.content.length);

const lines = computed(
	() =>
		form.values.value.content
			.trim()
			.split('\n')
			.filter(line => line.length > 0).length
);

const paragraphs = computed(() => {
	return form.values.value.content
		.trim()
		.split('\n\n')
		.filter(paragraph => paragraph.length > 0).length;
});
</script>

<template>
	<div class="flex gap-4 flex-col md:flex-row">
		<div class="w-full">
			<InputsProvider :form="form">
				<InputsTextArea
					:label="t('components.tools.text_counter.content.label')"
					:placeholder="t('components.tools.text_counter.content.placeholder')"
					name="content"
					class="whitespace-nowrap"
					:rows="11" />
			</InputsProvider>
		</div>

		<div
			class="flex w-full md:w-64 md:py-6 md:px-4 flex-row gap-4 md:flex-col flex-wrap items-center justify-between md:justify-start md:items-start">
			<div>
				<p class="font-semibold">{{ t('components.tools.text_counter.output.words') }}</p>
				<p class="text-3xl">{{ words }}</p>
			</div>

			<div>
				<p class="font-semibold">{{ t('components.tools.text_counter.output.characters') }}</p>
				<p class="text-3xl">{{ characters }}</p>
			</div>

			<div>
				<p class="font-semibold">{{ t('components.tools.text_counter.output.lines') }}</p>
				<p class="text-3xl">{{ lines }}</p>
			</div>

			<div>
				<p class="font-semibold">{{ t('components.tools.text_counter.output.paragraphs') }}</p>
				<p class="text-3xl">{{ paragraphs }}</p>
			</div>
		</div>
	</div>
</template>
