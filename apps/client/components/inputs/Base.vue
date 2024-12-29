<script lang="ts" setup>
const props = defineProps<{
	label?: string;
}>();
</script>

<template>
	<div>
		<p v-if="props.label">{{ props.label }}</p>

		<div class="relative mt-1">
			<slot name="content"></slot>
		</div>
	</div>
</template>
