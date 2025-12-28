<script lang="ts" setup>
const props = defineProps<{
	to?: string;
	title?: string;
}>();
</script>

<template>
	<NuxtLinkLocale
		:to="props.to"
		:aria-label="props.title"
		is="div"
		class="text-neutral-700 w-full flex justify-center rounded-t-xl duration-200 [&.active]:text-neutral-50 [&.active]:bg-primary-400 h-full items-center dark:text-neutral-200 decoration-none"
		active-class="active">
		<slot />
	</NuxtLinkLocale>
</template>
