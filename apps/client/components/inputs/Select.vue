<script lang="ts" setup>
import type { HtmlHTMLAttributes } from 'vue';

const props = defineProps<{
	label?: string;
	name?: string;
	placeholder?: string;
	readonly?: boolean;
	class?: HtmlHTMLAttributes['class'];
    
}>();

const model = defineModel();

const formInput = useFormInput(props.name, model);
</script>

<template>
	<div :class="props.class">
		<InputsBase :label="props.label" :name="props.name">
			<template #content>
                
            </template>
		</InputsBase>
	</div>
</template>
