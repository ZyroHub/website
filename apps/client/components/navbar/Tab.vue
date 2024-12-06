<script lang="ts" setup>
const props = defineProps<{
	to?: string;
}>();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/navbar/tab.scss';
</style>

<template>
	<NuxtLinkLocale :to="props.to" is="div" class="navbar-tab" active-class="active">
		<slot />
	</NuxtLinkLocale>
</template>
