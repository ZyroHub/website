<script lang="ts" setup>
const props = defineProps<{
	src?: string;
}>();
</script>

<template>
	<img :src="props.src" class="max-w-[400px] max-h-[300px] rounded-md" alt="Large Image" loading="lazy" />
</template>
