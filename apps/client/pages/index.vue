<script lang="ts" setup>
const { t } = useI18n();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/pages/index.scss';
</style>

<template>
	<div class="home-container container">
		<NuxtImg height="136px" class="home-logo" src="images/zyro-color-wide.webp" />

		<p class="home-title">{{ t('pages.home.title') }} <span>ZyroHub</span></p>

		<p class="home-description">{{ t('pages.home.description') }}</p>

		<div class="home-toolkits">
			<NuxtLinkLocale to="/creators">
				<Icon size="20" name="ant-design:camera-filled" />{{
					t('pages.home.toolkits.creators')
				}}</NuxtLinkLocale
			>
			<NuxtLinkLocale to="/developers">
				<Icon size="22" name="ant-design:code-filled" /> {{ t('pages.home.toolkits.dev') }}
			</NuxtLinkLocale>
			<NuxtLinkLocale to="/misc">
				<Icon size="22" name="jam:tools-f" /> {{ t('pages.home.toolkits.misc') }}
			</NuxtLinkLocale>
		</div>

		<NuxtLinkLocale to="/about" class="home-about">
			{{ t('pages.home.about') }}
		</NuxtLinkLocale>
	</div>
</template>
