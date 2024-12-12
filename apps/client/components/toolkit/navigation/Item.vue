<script lang="ts" setup>
const props = defineProps<{
	path?: string;
	title?: string;
	icon?: string;
	active?: boolean;
}>();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/toolkit/navigation/item.scss';
</style>

<template>
	<NuxtLinkLocale :to="`/${props.path}`" :class="['toolkit-navigation-item', { active: props.active }]">
		<Icon v-if="props.icon" :name="props.icon" size="20" />
		{{ props.title }}
		<Icon class="toolkit-navigation-item-arrow" name="mingcute:right-fill" size="24" />
	</NuxtLinkLocale>
</template>
