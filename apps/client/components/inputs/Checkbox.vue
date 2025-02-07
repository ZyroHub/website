<script lang="ts" setup>
import type { HtmlHTMLAttributes } from 'vue';

const props = withDefaults(
	defineProps<{
		label?: string;
		labelPlacement?: 'top' | 'right';
		name?: string;
		class?: HtmlHTMLAttributes['class'];
	}>(),
	{
		labelPlacement: 'right'
	}
);

const model = defineModel();
const formInput = useFormInput(props.name, model);

const handleClick = () => {
	formInput.inputRef.value = !formInput.inputRef.value;
};
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/inputs/checkbox.scss';
</style>

<template>
	<div :class="props.class">
		<InputsBase :label="props.labelPlacement === 'top' ? props.label : ''" :name="props.name">
			<template #content>
				<div class="flex items-center gap-1">
					<div @click="handleClick" :class="['input-checkbox-box', { checked: formInput.inputRef.value }]">
						<Icon v-if="formInput.inputRef.value" name="mdi:check-bold" />
					</div>

					<p v-if="props.labelPlacement === 'right'" @click="handleClick" class="cursor-pointer select-none">
						{{ props.label }}
					</p>
				</div>
			</template>
		</InputsBase>
	</div>
</template>
