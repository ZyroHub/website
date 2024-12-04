<script lang="ts" setup>
const { t } = useI18n();

useHead({
	htmlAttrs: { lang: 'en' },
	titleTemplate: page_title => {
		return page_title ? `${t(page_title)} | ZyroHub` : 'ZyroHub';
	},
	link: [
		{ rel: 'icon', type: 'image/png', href: '/favicons/favicon-96x96.png', sizes: '96x96' },
		{ rel: 'icon', type: 'image/svg+xml', href: '/favicons/favicon.svg' },
		{ rel: 'shortcut icon', href: '/favicons/favicon.ico' },
		{ rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
		{ rel: 'manifest', href: '/favicons/site.webmanifest' }
	],
	meta: [
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ name: 'theme-color', content: '#ffb29a' },
		{ name: 'apple-mobile-web-app-title', content: 'ZyroHub' },
		{ property: 'og:type', content: 'website' }
	]
});
</script>

<style lang="scss">
@use '~/assets/scss/global.scss';
</style>

<template>
	<div class="app-main">
		<NuxtLoadingIndicator color="#ffb29a" />

		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
