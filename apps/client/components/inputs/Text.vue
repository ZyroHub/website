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
}>();

const model = defineModel<string>();
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
			</template>
		</InputsBase>
	</div>
</template>
