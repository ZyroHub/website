<script lang="ts" setup>
const props = defineProps<{
	label?: string;
	placeholder?: string;
}>();

const model = defineModel<string>();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/inputs/text-area.scss';
</style>

<template>
	<div>
		<InputsBase :label="props.label">
			<template #content>
				<textarea v-model="model" :placeholder="props.placeholder" class="input-textarea-input"></textarea>
			</template>
		</InputsBase>
	</div>
</template>
