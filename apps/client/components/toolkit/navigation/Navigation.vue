<script lang="ts" setup>
const { t } = useI18n();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/toolkit/navigation/navigation.scss';
</style>

<template>
	<div class="toolkit-navigation">
		<div class="toolkit-navigation-search-area">
			<div class="toolkit-navigation-search">
				<Icon name="material-symbols:search" class="toolkit-navigation-search-icon" />

				<input :placeholder="t('components.toolkit.navigation.search')" />
			</div>
		</div>

		<div class="toolkit-navigation-items">
			<!-- <ToolkitNavigationItem id="test" title="Teste" icon="bxs:file" />
			<ToolkitNavigationItem id="test" title="Teste" icon="bxs:file" />
			<ToolkitNavigationItem id="test" title="Teste" icon="bxs:file" />
			<ToolkitNavigationItem id="test" title="Teste" icon="bxs:file" />
			<ToolkitNavigationItem id="test" title="Teste" icon="bxs:file" />
			<ToolkitNavigationItem id="test" title="Teste" icon="bxs:file" /> -->
		</div>
	</div>
</template>
