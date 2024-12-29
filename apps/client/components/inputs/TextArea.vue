<script lang="ts" setup>
const props = defineProps<{
	label?: string;
	placeholder?: string;
	rows?: number;
	showCopy?: boolean;
}>();

const { t } = useI18n();

const model = defineModel<string>();

const copyState = ref<boolean>(false);
const copyText = computed(() =>
	copyState.value ? t('components.inputs.text_area.copy.success') : t('components.inputs.text_area.copy.default')
);

const handleCopy = () => {
	if (!model.value) return;

	navigator.clipboard.writeText(model.value);
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
					v-model="model"
					:placeholder="props.placeholder"
					:rows="props.rows"
					class="input-textarea-input"></textarea>

				<Transition name="transition_fade_200" mode="out-in">
					<Button
						@click="handleCopy"
						v-if="props.showCopy && model"
						theme="primary"
						:class="['input-textarea-copy', { 'input-textarea-copy-copied': copyState }]">
						{{ copyText }}
					</Button>
				</Transition>
			</template>
		</InputsBase>
	</div>
</template>
