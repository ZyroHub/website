<script lang="ts" setup>
import { z } from 'zod';

const { t } = useI18n();

const runtimeConfig = useRuntimeConfig();

const task = useTask({ worker_id: 'url_shortener' });

const outputContent = computed(() =>
	task.task.value?.data?.code ? `${runtimeConfig.public.server_short_url}/${task.task.value?.data?.code}` : ''
);

const form = useForm(
	{
		url: ''
	},
	z.object({
		url: z.string().url().min(1).max(2048)
	})
);

const isSubmittable = computed(() => form.isValid.value && task.isSubmittable.value);

const handleExecute = async () => {
	await task.start({
		url: form.values.value.url
	});
};
</script>

<template>
	<div class="flex flex-col gap-4">
		<InputsProvider :form="form">
			<div class="flex flex-col gap-4">
				<InputsText
					name="url"
					:label="t('components.tools.url_shortener.url.label')"
					:placeholder="t('components.tools.url_shortener.url.placeholder')" />

				<div>
					<Button @click="handleExecute" theme="primary" :disabled="!isSubmittable">
						{{ t('components.tools.url_shortener.generate') }}
					</Button>
				</div>
			</div>
		</InputsProvider>

		<ToolkitToolProgress :task="task.task.value" />

		<InputsText
			v-model="outputContent"
			:label="t('components.tools.url_shortener.output.label')"
			:placeholder="t('components.tools.url_shortener.output.placeholder')"
			readonly
			showCopy />
	</div>
</template>
