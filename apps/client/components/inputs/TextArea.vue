<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';

const props = defineProps<{
	label?: string;
	name?: string;
	placeholder?: string;
	rows?: number;
	class?: string;
	showCopy?: boolean;
	readonly?: boolean;
}>();

const { t } = useI18n();

const model = defineModel<string>();
const formInput = useFormInput<string>(props.name, model);

const copyState = ref<boolean>(false);
const copyText = computed(() =>
	copyState.value ? t('components.inputs.text_area.copy.success') : t('components.inputs.text_area.copy.default')
);

const handleCopy = () => {
	if (!formInput.inputRef.value) return;

	navigator.clipboard.writeText(formInput.inputRef.value);
	copyState.value = true;

	setTimeout(() => {
		copyState.value = false;
	}, 1000);
};
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/inputs/text-area.scss';
</style>

<template>
	<div>
		<InputsBase :label="props.label">
			<template #content>
				<textarea
					v-model="formInput.inputRef.value"
					:placeholder="props.placeholder"
					:rows="props.rows"
					:readonly="props.readonly"
					:class="twMerge('input-textarea-input', props.class)"></textarea>

				<Transition name="transition_fade_200" mode="out-in">
					<Button
						@click="handleCopy"
						v-if="props.showCopy && formInput.inputRef.value"
						theme="primary"
						:class="['input-textarea-copy', { 'input-textarea-copy-copied': copyState }]">
						{{ copyText }}
					</Button>
				</Transition>
			</template>
		</InputsBase>
	</div>
</template>
