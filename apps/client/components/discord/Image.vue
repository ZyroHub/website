<script lang="ts" setup>
const props = defineProps<{
	src?: string;
}>();
</script>

<template>
	<img :src="props.src" class="w-full max-w-[400px] rounded-md" alt="Large Image" loading="lazy" />
</template>
