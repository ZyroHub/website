<script lang="ts" setup>
const { t } = useI18n();

useSeoMeta({
	description: t('pages.home.meta.description')
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/pages/index.scss';
</style>

<template>
	<div class="home-container container">
		<NuxtImg class="home-logo" src="images/zyro-color-wide.webp" />

		<p class="home-title">{{ t('pages.home.title') }} <span>ZyroHub</span></p>

		<p class="home-description">{{ t('pages.home.description') }}</p>

		<div class="home-toolkits">
			<NuxtLinkLocale to="/developers">
				<Icon size="20" name="fluent-mdl2:media-add" /> Media Toolkit
			</NuxtLinkLocale>
			<NuxtLinkLocale to="/media"> <Icon size="22" name="ant-design:code-filled" /> Dev Toolkit </NuxtLinkLocale>
		</div>

		<NuxtLinkLocale to="/about" class="home-about">
			{{ t('pages.home.about') }}
		</NuxtLinkLocale>
	</div>
</template>
