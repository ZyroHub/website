<script lang="ts" setup>
import { z } from 'zod';

const { t } = useI18n();

const task = useTask({ worker_id: 'bcrypt_checker' });

const isValid = computed(() => task.task.value?.data?.is_valid);

const form = useForm(
	{
		password: '',
		hash: ''
	},
	z.object({
		password: z.string().min(1).max(100),
		hash: z.string().min(1).max(100)
	})
);

const isSubmittable = computed(() => form.isValid.value && task.isSubmittable.value);

const handleExecute = async () => {
	task.start({
		password: form.values.value.password,
		hash: form.values.value.hash
	});
};
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/tools/bcrypt-checker.scss';
</style>

<template>
	<div class="flex flex-col gap-4">
		<InputsProvider :form="form">
			<div class="flex flex-col gap-4">
				<InputsText
					name="password"
					:label="t('components.tools.bcrypt_checker.password.label')"
					:placeholder="t('components.tools.bcrypt_checker.password.placeholder')" />

				<InputsText
					name="hash"
					:label="t('components.tools.bcrypt_checker.hash.label')"
					:placeholder="t('components.tools.bcrypt_checker.hash.placeholder')" />

				<div class="flex items-center gap-4">
					<Button @click="handleExecute" theme="primary" :disabled="!isSubmittable">
						{{ t('components.tools.bcrypt_checker.validate') }}
					</Button>

					<p class="tools-bcrypt-checker-result">
						{{ t('components.tools.bcrypt_checker.result.text') }}
						<span v-if="!task.task.value || ['pending', 'queued'].includes(task.task.value.status)">
							{{ t('components.tools.bcrypt_checker.result.awaiting') }}
						</span>
						<span v-else-if="task.task.value?.status === 'running'">
							{{ t('components.tools.bcrypt_checker.result.running') }}
						</span>
						<span class="error" v-else-if="task.task.value?.status === 'error'">
							{{ t('components.tools.bcrypt_checker.result.error') }}
						</span>
						<template v-if="task.task.value?.status === 'finished'">
							<span class="valid" v-if="isValid">
								{{ t('components.tools.bcrypt_checker.result.valid') }}
							</span>
							<span class="invalid" v-else>
								{{ t('components.tools.bcrypt_checker.result.invalid') }}
							</span>
						</template>
					</p>
				</div>
			</div>
		</InputsProvider>

		<ToolkitToolProgress :task="task" />
	</div>
</template>
