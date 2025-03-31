<script lang="ts" setup>
import { z } from 'zod';

const { t } = useI18n();

const conditions = [
	{
		id: 'length',
		check: (value: string) => value.length >= 8
	},
	{
		id: 'uppercase',
		check: (value: string) => /[A-Z]/.test(value)
	},
	{
		id: 'lowercase',
		check: (value: string) => /[a-z]/.test(value)
	},
	{
		id: 'number',
		check: (value: string) => /[0-9]/.test(value)
	},
	{
		id: 'special',
		check: (value: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
	}
];

const passedConditions = ref([] as string[]);

const form = useForm(
	{
		input: ''
	},
	z.object({
		input: z.string()
	})
);

const handleCheckPassword = () => {
	passedConditions.value = conditions
		.filter(condition => condition.check(form.values.value.input))
		.map(condition => condition.id);
};

watch(() => form.values.value.input, handleCheckPassword);

onMounted(() => {
	handleCheckPassword();
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/tools/password-strength-tester.scss';
</style>

<template>
	<div>
		<InputsProvider :form="form">
			<InputsText :label="t('components.tools.password_strength_tester.input')" name="input" class="max-w-128" />
		</InputsProvider>

		<div class="flex justify-between w-128 mt-1 px-1">
			<div
				v-for="i in conditions.length"
				:style="{
					width: `${(512 / conditions.length) * 0.95}px`
				}"
				:class="[
					'tools-password-strength-tester-condition-bar',
					{
						passed: i <= passedConditions.length
					}
				]" />
		</div>

		<div class="mt-6">
			<p v-for="condition in conditions">
				<Icon
					name="mdi:check"
					v-if="passedConditions.includes(condition.id)"
					class="tools-password-strength-tester-condition-icon-passed" />
				<Icon name="mdi:close" v-else class="tools-password-strength-tester-condition-icon-failed" />

				{{ t(`components.tools.password_strength_tester.conditions.${condition.id}`) }}
			</p>
		</div>
	</div>
</template>
