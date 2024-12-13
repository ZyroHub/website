<script lang="ts" setup>
const { t } = useI18n();

const isFavoriteEnabled = ref(false);

const handleFavoriteFilterSwitch = () => {
	isFavoriteEnabled.value = !isFavoriteEnabled.value;
};
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
				@click="handleFavoriteFilterSwitch"
				:class="['toolkit-navigation-search-star', { active: isFavoriteEnabled }]">
				<Icon :name="'mdi:heart'" />
			</div>
		</div>

		<div class="toolkit-navigation-items">
			<ToolkitNavigationItem id="test" title="Teste" icon="bxs:file" active starred />
			<ToolkitNavigationItem id="test" title="Teste" icon="bxs:file" starred />
			<ToolkitNavigationItem id="test" title="Teste" icon="bxs:file" />
			<ToolkitNavigationItem id="test" title="Teste" icon="bxs:file" />
			<ToolkitNavigationItem id="test" title="Teste" icon="bxs:file" />
			<ToolkitNavigationItem id="test" title="Teste" icon="bxs:file" />
		</div>
	</div>
</template>
