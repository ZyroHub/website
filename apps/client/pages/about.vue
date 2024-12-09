<script lang="ts" setup>
const { t } = useI18n();

useSeoMeta({
	title: t('pages.about.meta.title')
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/pages/about.scss';
</style>

<template>
	<div class="about-container container">
		<div class="about-container-start">
			<h1 class="about-title">{{ t('pages.about.title') }}</h1>

			<p class="about-description">{{ t('pages.about.description') }}</p>
		</div>
		<div class="about-container-end">
			<div>
				<NuxtImg class="about-logo" src="images/zyro-color-wide.webp" />
			</div>
		</div>
	</div>
</template>
