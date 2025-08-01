<script lang="ts" setup>
const props = defineProps<{
	src?: string;
}>();
</script>

<template>
	<img :src="props.src" class="w-20 h-20 rounded-md" alt="Thumbnail" loading="lazy" />
</template>
