<script lang="ts" setup>
import { z } from 'zod';

const { t } = useI18n();

const task = useTask({ worker_id: 'bcrypt_generator' });

const form = useForm(
	{
		input: '',
		rounds: '10'
	},
	z.object({
		input: z.string().min(1).max(100),
		rounds: z.number({ coerce: true }).min(1).max(15)
	})
);

const isSubmittable = computed(() => form.isValid.value && !task?.task?.value);

const outputContent = ref('');

const handleGenerate = async () => {
	task.start({
		password: form.values.value.input,
		rounds: Number(form.values.value.rounds)
	});
};

task.onTaskFinished(data => {
	outputContent.value = data.task.data?.hash || '';
});
</script>

<template>
	<div class="flex flex-col gap-4">
		<div class="flex flex-col gap-4">
			<InputsText
				v-model="form.values.value.input"
				:label="t('components.tools.bcrypt_generator.input.label')"
				:placeholder="t('components.tools.bcrypt_generator.input.placeholder')" />

			<div class="flex gap-4 items-end">
				<InputsText v-model="form.values.value.rounds" label="Rounds" :mask="{ mask: '##' }" class="max-w-16" />

				<Button @click="handleGenerate" theme="primary" :disabled="!isSubmittable">
					{{ t('components.tools.bcrypt_generator.generate') }}
				</Button>
			</div>
		</div>

		<ToolkitToolProgress :worker_id="task.worker_id" />

		<InputsText
			v-model="outputContent"
			:label="t('components.tools.bcrypt_generator.output.label')"
			:placeholder="t('components.tools.bcrypt_generator.output.placeholder')"
			readonly
			showCopy />
	</div>
</template>
