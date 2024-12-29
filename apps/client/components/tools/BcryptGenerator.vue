<script lang="ts" setup>
const { t } = useI18n();

const inputContent = ref('');
const rounds = ref('10');

const outputContent = ref('');

const handleGenerate = async () => {};
</script>

<template>
	<div class="flex flex-col gap-4">
		<div class="flex flex-col gap-4">
			<InputsText
				v-model="inputContent"
				:label="t('components.tools.bcrypt_generator.input.label')"
				:placeholder="t('components.tools.bcrypt_generator.input.placeholder')" />

			<div class="flex gap-4 items-end">
				<InputsText v-model="rounds" label="Rounds" :mask="{ mask: '##' }" class="max-w-16" />

				<Button @click="handleGenerate" theme="primary">{{
					t('components.tools.bcrypt_generator.generate')
				}}</Button>
			</div>
		</div>

		<InputsText
			v-model="outputContent"
			:label="t('components.tools.bcrypt_generator.output.label')"
			:placeholder="t('components.tools.bcrypt_generator.output.placeholder')"
			readonly />
	</div>
</template>
