<script lang="ts" setup>
const props = defineProps<{
	progress: number;
	error?: boolean;
}>();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/progress.scss';
</style>

<template>
	<div class="progress-bar">
		<div
			class="progress-bar-progress-container"
			:style="{ maxWidth: `${props.error ? 100 : props.progress}%` }">
			<div :class="['progress-bar-progress', { 'progress-bar-progress-error': props.error }]" />
		</div>
	</div>
</template>
