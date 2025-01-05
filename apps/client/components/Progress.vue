<script lang="ts" setup>
const props = defineProps<{
	progress: number;
}>();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/progress.scss';
</style>

<template>
	<div class="progress-bar">
		<div class="progress-bar-progress-container" :style="{ maxWidth: `${progress}%` }">
			<div class="progress-bar-progress" />
		</div>
	</div>
</template>
