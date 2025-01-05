<script lang="ts" setup>
import type { MaskInputOptions } from 'maska';
import type { HtmlHTMLAttributes, InputTypeHTMLAttribute } from 'vue';

const props = defineProps<{
	label?: string;
	placeholder?: string;
	readonly?: boolean;
	type?: InputTypeHTMLAttribute;
	mask?: MaskInputOptions;
	class?: HtmlHTMLAttributes['class'];
	showCopy?: boolean;
}>();

const { t } = useI18n();

const model = defineModel<string>();

const copyState = ref<boolean>(false);

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
@use '~/assets/scss/components/inputs/text.scss';
</style>

<template>
	<div :class="props.class">
		<InputsBase :label="props.label">
			<template #content>
				<input
					v-model="model"
					:placeholder="props.placeholder"
					:type="props.type"
					class="input-text-input"
					:readonly="props.readonly"
					v-maska="props.mask" />

				<Transition name="transition_fade_200" mode="out-in">
					<div v-if="props.showCopy && model" @click="handleCopy" class="input-text-copy">
						<Icon v-if="copyState" class="input-text-copy-copied" name="mdi:check-bold" />
						<Icon v-else name="mdi:content-copy" />
					</div>
				</Transition>
			</template>
		</InputsBase>
	</div>
</template>
