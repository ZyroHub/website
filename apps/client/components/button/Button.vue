<script lang="ts" setup>
const props = defineProps<{
	theme?: 'primary' | 'gray';
	disabled?: boolean;
}>();

const emit = defineEmits(['click']);
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/button/button.scss';
</style>

<template>
	<button
		@click="e => emit('click', e)"
		:class="['button', props.theme && `button-${props.theme}`]"
		:disabled="props.disabled">
		<slot />
	</button>
</template>
