<script lang="ts" setup>
const props = defineProps<{
	form: ReturnType<typeof useForm>;
}>();

provide('form', { form: props.form });
</script>

<template>
	<slot />
</template>
