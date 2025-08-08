<script lang="ts" setup>
import type { HtmlHTMLAttributes } from 'vue';

const props = defineProps<{
	theme?: 'primary' | 'gray' | 'green' | 'red';
	disabled?: boolean;
	class?: HtmlHTMLAttributes['class'];
	ariaLabel?: string;
}>();

const emit = defineEmits(['click']);
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/button/button.scss';
</style>

<template>
	<button
		@click="e => emit('click', e)"
		:class="['button', props.theme && `button-${props.theme}`, props.class]"
		:disabled="props.disabled"
		:aria-label="props.ariaLabel">
		<slot />
	</button>
</template>
