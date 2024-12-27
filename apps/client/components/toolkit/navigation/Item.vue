<script lang="ts" setup>
const props = defineProps<{
	id: string;
	path?: string;
	active?: boolean;
}>();

const { t } = useI18n();

const tools = useTools();
const tool = computed(() => tools.get(props.id));

const isHoveringUnfavorite = ref(false);

const favoriteIcon = computed(() => {
	if (isHoveringUnfavorite.value) return 'ri:heart-line';
	return tools.isFavorite(props.id) ? 'ri:heart-fill' : 'ri:heart-add-fill';
});

const handleFavoriteButtonHover = () => {
	if (!tools.isFavorite(props.id)) return (isHoveringUnfavorite.value = false);
	isHoveringUnfavorite.value = true;
};

const handleFavoriteButtonLeave = () => {
	isHoveringUnfavorite.value = false;
};

const handleToggleFavorite = () => {
	tools.toggleFavorite(props.id);

	isHoveringUnfavorite.value = tools.isFavorite(props.id);
};
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/toolkit/navigation/item.scss';
</style>

<template>
	<NuxtLinkLocale :to="`/${props.path}`" :class="['toolkit-navigation-item']" active-class="active">
		<Icon v-if="tool?.icon" :name="tool?.icon" size="20" />
		{{ t(`tools.${tool?.id || ''}.name`) }}

		<Icon
			@click.prevent.stop="handleToggleFavorite"
			@mouseover="handleFavoriteButtonHover"
			@mouseleave="handleFavoriteButtonLeave"
			:class="['toolkit-navigation-item-star', { active: tools.isFavorite(props.id) }]"
			:key="favoriteIcon"
			:name="favoriteIcon"
			size="20" />

		<Icon class="toolkit-navigation-item-arrow" name="mingcute:right-fill" size="24" />
	</NuxtLinkLocale>
</template>
