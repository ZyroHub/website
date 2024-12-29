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

		<div class="inputs-base-content">
			<slot name="content"></slot>
		</div>
	</div>
</template>
