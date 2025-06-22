<script lang="ts" setup>
import type { ITool } from '~/shared/types';

const props = defineProps<{
	tools?: ITool[];
	path?: string;
}>();

const { t } = useI18n();
const tools = useTools();

const searchContent = ref('');

const filteredTools = computed(() => {
	if (!props.tools) return [];

	if (tools.isOnlyFavorites.value) return props.tools.filter(tool => tools.isFavorite(tool.id));
	if (!searchContent.value) return props.tools;

	return props.tools.filter(tool => {
		const translatedName = t(`tools.${tool.id}.name`);

		return translatedName.toLowerCase().includes(searchContent.value.toLowerCase());
	});
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/toolkit/navigation/desktop/desktop.scss';
</style>

<template>
	<div class="toolkit-navigation">
		<p class="toolkit-navigation-title"><slot name="title" /></p>

		<div class="toolkit-navigation-search-area">
			<div class="toolkit-navigation-search">
				<Icon name="material-symbols:search" class="toolkit-navigation-search-icon" />

				<input v-model="searchContent" :placeholder="t('components.toolkit.navigation.search')" />
			</div>

			<div
				@click="tools.toggleOnlyFavorites"
				:class="['toolkit-navigation-search-star', { active: tools.isOnlyFavorites.value }]">
				<Icon :name="'mdi:heart'" />
			</div>
		</div>

		<Transition name="transition_navigation_items" mode="out-in">
			<div :key="tools.isOnlyFavorites.value.toString()" class="toolkit-navigation-items">
				<ToolkitNavigationDesktopItem
					v-for="tool in filteredTools"
					:id="tool.id"
					:path="`${props.path}/${tool.id}`" />
			</div>
		</Transition>
	</div>
</template>
