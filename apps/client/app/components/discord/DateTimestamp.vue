<script lang="ts" setup>
const props = defineProps<{
	date?: Date;
	fullDate?: boolean;
}>();

const dateFormatted = computed(() => {
	const date = props.date || new Date();
	return `${date.toLocaleString('en-US', props.fullDate ? { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' } : { timeStyle: 'short' }).replace(',', '')}`;
});
</script>

<template>
	<p class="text-[#7f8189] font-normal text-xs">{{ dateFormatted }}</p>
</template>
