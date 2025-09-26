<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';

const props = defineProps<{
	actual: number;
	max: number;
}>();
</script>

<template>
	<p :class="twMerge('max-w-max text-sm', props.actual > props.max && 'text-red-600 dark:text-red-500')">{{ props.actual }}/{{ props.max }}</p>
</template>
