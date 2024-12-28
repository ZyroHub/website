<script lang="ts" setup>
const props = defineProps<{
	label?: string;
}>();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/inputs/base.scss';
</style>

<template>
	<div>
		<p v-if="props.label">{{ props.label }}</p>

		<slot name="content"></slot>
	</div>
</template>
