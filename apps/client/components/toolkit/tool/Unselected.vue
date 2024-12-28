<script lang="ts" setup>
const { t } = useI18n();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/toolkit/tool/unselected.scss';
</style>

<template>
	<div class="toolkit-tool-unselected-container">
		<p>{{ t('components.toolkit.tool.unselected.description') }}</p>
	</div>
</template>
