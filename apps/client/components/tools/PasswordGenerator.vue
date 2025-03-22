<script lang="ts" setup>
import { z } from 'zod';

const { t } = useI18n();

const form = useForm(
	{
		size: 16,
		ignore: '',

		uppers: true,
		lowers: true,

		numbers: true,
		symbols: false,

		output: ''
	},
	z.object({
		size: z.number().min(1).max(64)
	})
);

const handleGeneratePassword = () => {
	let generatedPassword = '';

	const charactersData = {
		uppers: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		lowers: 'abcdefghijklmnopqrstuvwxyz',

		numbers: '0123456789',
		symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
	};

	let characters = '';

	if (form.values.value.uppers) characters += charactersData.uppers;
	if (form.values.value.lowers) characters += charactersData.lowers;

	if (form.values.value.numbers) characters += charactersData.numbers;
	if (form.values.value.symbols) characters += charactersData.symbols;

	characters = characters
		.split('')
		.filter(char => !form.values.value.ignore.includes(char))
		.join('');

	if (!characters) {
		form.values.value.output = '';
		return;
	}

	for (let i = 0; i < form.values.value.size; i++) {
		generatedPassword += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	form.values.value.output = generatedPassword;
};

watchEffect(() => {
	handleGeneratePassword();
});

onMounted(() => {
	handleGeneratePassword();
});
</script>

<template>
	<div>
		<InputsProvider :form="form">
			<div class="flex gap-4">
				<InputsSlider
					:label="t('components.tools.password_generator.settings.size')"
					name="size"
					class="w-full max-w-76"
					:min="1"
					:max="64" />

				<InputsText
					:label="t('components.tools.password_generator.settings.ignore')"
					name="ignore"
					class="max-w-48" />
			</div>

			<div class="flex flex-col gap-3 mt-4">
				<div class="flex gap-4">
					<InputsCheckbox :label="t('components.tools.password_generator.settings.uppers')" name="uppers" />
					<InputsCheckbox :label="t('components.tools.password_generator.settings.lowers')" name="lowers" />
				</div>

				<div class="flex gap-4">
					<InputsCheckbox :label="t('components.tools.password_generator.settings.numbers')" name="numbers" />
					<InputsCheckbox :label="t('components.tools.password_generator.settings.symbols')" name="symbols" />
				</div>
			</div>

			<InputsText
				:label="t('components.tools.password_generator.output')"
				name="output"
				class="mt-6 max-w-128"
				readonly
				show-copy />
		</InputsProvider>
	</div>
</template>
