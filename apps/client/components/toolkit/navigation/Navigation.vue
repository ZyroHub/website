<script lang="ts" setup>
const props = defineProps<{
	tools?: ITool[];
	path?: string;
}>();

const { t } = useI18n();
const tools = useTools();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/toolkit/navigation/navigation.scss';
</style>

<template>
	<div class="toolkit-navigation">
		<p class="toolkit-navigation-title"><slot name="title" /></p>

		<div class="toolkit-navigation-search-area">
			<div class="toolkit-navigation-search">
				<Icon name="material-symbols:search" class="toolkit-navigation-search-icon" />

				<input :placeholder="t('components.toolkit.navigation.search')" />
			</div>

			<div
				@click="tools.toggleOnlyFavorites"
				:class="['toolkit-navigation-search-star', { active: tools.isOnlyFavorites.value }]">
				<Icon :name="'mdi:heart'" />
			</div>
		</div>

		<Transition name="transition_navigation_items" mode="out-in">
			<div :key="tools.isOnlyFavorites.value.toString()" class="toolkit-navigation-items">
				<ToolkitNavigationItem v-for="tool in props.tools" :id="tool.id" :path="`${props.path}/${tool.id}`" />
			</div>
		</Transition>
	</div>
</template>
