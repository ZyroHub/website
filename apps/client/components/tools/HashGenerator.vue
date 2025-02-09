<script lang="ts" setup>
import type { WorkerArgs } from '@zyrohub/toolkit';
import { z } from 'zod';

const { t } = useI18n();

const task = useTask({ worker_id: 'hash_generator' });

const outputContent = computed(() => task.task.value?.data?.hash);

const form = useForm(
	{
		text: '',
		algorithm: 'md5' as WorkerArgs<'hash_generator'>['algorithm']
	},
	z.object({
		text: z.string().min(1).max(2048)
	})
);

const algorithmOptions = [
	{ label: 'MD4', value: 'md4' },
	{ label: 'MD5', value: 'md5' },

	{ label: 'SHA-1', value: 'sha1' },
	{ label: 'SHA-224', value: 'sha224' },
	{ label: 'SHA-256', value: 'sha256' },
	{ label: 'SHA-384', value: 'sha384' },
	{ label: 'SHA-512', value: 'sha512' },

	{ label: 'SHA-512/224', value: 'sha512-224' },
	{ label: 'SHA-512/256', value: 'sha512-256' },

	{ label: 'SHA3-224', value: 'sha3-224' },
	{ label: 'SHA3-256', value: 'sha3-256' },
	{ label: 'SHA3-384', value: 'sha3-384' },
	{ label: 'SHA3-512', value: 'sha3-512' }
];

const isSubmittable = computed(() => form.isValid.value && task.isSubmittable.value);

const handleExecute = async () => {
	await task.start({
		text: form.values.value.text,
		algorithm: form.values.value.algorithm
	});
};
</script>

<template>
	<div class="flex flex-col gap-4">
		<InputsProvider :form="form">
			<div class="flex flex-col gap-4">
				<InputsText
					name="text"
					:label="t('components.tools.hash_generator.text.label')"
					:placeholder="t('components.tools.hash_generator.text.placeholder')" />

				<div class="flex items-end gap-4">
					<InputsSelect
						name="algorithm"
						:label="t('components.tools.hash_generator.algorithm')"
						class="max-w-32"
						:options="algorithmOptions" />

					<Button @click="handleExecute" theme="primary" :disabled="!isSubmittable">
						{{ t('components.tools.hash_generator.generate') }}
					</Button>
				</div>
			</div>
		</InputsProvider>

		<ToolkitToolProgress :task="task.task.value" />

		<InputsText
			v-model="outputContent"
			:label="t('components.tools.hash_generator.output.label')"
			:placeholder="t('components.tools.hash_generator.output.placeholder')"
			readonly
			showCopy />
	</div>
</template>
