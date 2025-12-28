<script lang="ts" setup>
const { t } = useI18n();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/toolkit/tool/error.scss';
</style>

<template>
	<div class="toolkit-tool-error-container">
		<Icon name="typcn:warning" class="toolkit-tool-error-icon" />

		<p class="toolkit-tool-error-title">{{ t('components.toolkit.tool.error.title') }}</p>
		<p class="toolkit-tool-error-description">
			{{ t('components.toolkit.tool.error.description') }}
		</p>
	</div>
</template>
