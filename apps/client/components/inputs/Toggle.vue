<script lang="ts" setup>
import type { HtmlHTMLAttributes } from 'vue';

const props = defineProps<{
	label?: string;
	name?: string;
	class?: HtmlHTMLAttributes['class'];
	options: { label: string; value: string }[];
}>();

const model = defineModel<string>();
const formInput = useFormInput<string>(props.name, model);

const selectedOption = computed(() => props.options.find(option => option.value === formInput.inputRef.value));

const handleSelect = (value: string) => {
	formInput.inputRef.value = value;
};
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/inputs/toggle.scss';
</style>

<template>
	<div :class="props.class">
		<InputsBase :label="props.label" :name="props.name">
			<template #content>
				<div class="flex">
					<button
						v-for="option in props.options"
						:key="option.value"
						@click="handleSelect(option.value)"
						:class="['toggle-button', { active: selectedOption && selectedOption.value === option.value }]">
						<span>{{ option.label }}</span>
					</button>
				</div>
			</template>
		</InputsBase>
	</div>
</template>
