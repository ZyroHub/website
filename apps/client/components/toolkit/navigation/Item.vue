<script lang="ts" setup>
const props = defineProps<{
	path?: string;
	title?: string;
	icon?: string;
	active?: boolean;
	starred?: boolean;
}>();

const isHoveringUnfavorite = ref(false);

const favoriteIcon = computed(() => {
	if (isHoveringUnfavorite.value) return 'ri:heart-line';
	return props.starred ? 'ri:heart-fill' : 'ri:heart-add-fill';
});

const handleFavoriteButtonHover = () => {
	if (!props.starred) return (isHoveringUnfavorite.value = false);
	isHoveringUnfavorite.value = true;
};

const handleFavoriteButtonLeave = () => {
	isHoveringUnfavorite.value = false;
};

const handleFavorite = () => {};
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/toolkit/navigation/item.scss';
</style>

<template>
	<NuxtLinkLocale :to="`/${props.path}`" :class="['toolkit-navigation-item', { active: props.active }]">
		<Icon v-if="props.icon" :name="props.icon" size="20" />
		{{ props.title }}

		<Icon
			@click.prevent.stop="handleFavorite"
			@mouseover="handleFavoriteButtonHover"
			@mouseleave="handleFavoriteButtonLeave"
			:class="['toolkit-navigation-item-star', { active: props.starred }]"
			:name="favoriteIcon"
			size="20" />

		<Icon class="toolkit-navigation-item-arrow" name="mingcute:right-fill" size="24" />
	</NuxtLinkLocale>
</template>
