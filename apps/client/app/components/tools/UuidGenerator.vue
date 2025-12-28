<script lang="ts" setup>
import { v1, v3, v4, v5, v6, v7 } from 'uuid';

const { t } = useI18n();

const form = useForm({
	version: '4',
	name: '',

	output: ''
});

const uuidOptions = [
	{ label: 'UUID v1', value: '1' },
	{ label: 'UUID v3', value: '3' },
	{ label: 'UUID v4', value: '4' },
	{ label: 'UUID v5', value: '5' },
	{ label: 'UUID v6', value: '6' },
	{ label: 'UUID v7', value: '7' }
];

const handleGenerate = async () => {
	switch (form.values.value.version) {
		case '1':
			form.values.value.output = v1();
			break;
		case '3':
			form.values.value.output = v3(form.values.value.name || '', v3.DNS);
			break;
		case '4':
			form.values.value.output = v4();
			break;
		case '5':
			form.values.value.output = v5(form.values.value.name || '', v5.DNS);
			break;
		case '6':
			form.values.value.output = v6();
			break;
		case '7':
			form.values.value.output = v7();
			break;
	}
};
</script>

<template>
	<div class="flex flex-col gap-4">
		<InputsProvider :form="form">
			<div class="flex gap-4 items-end">
				<InputsSelect
					name="version"
					:label="t('components.tools.uuid_generator.version')"
					class="max-w-32"
					:options="uuidOptions" />

				<InputsText
					v-if="['3', '5'].includes(form.values.value.version)"
					name="name"
					:label="t('components.tools.uuid_generator.namespace')"
					class="max-w-44" />

				<Button @click="handleGenerate" theme="primary">
					{{ t('components.tools.uuid_generator.generate') }}
				</Button>
			</div>

			<InputsText name="output" :label="t('components.tools.uuid_generator.output')" readonly show-copy />
		</InputsProvider>
	</div>
</template>
