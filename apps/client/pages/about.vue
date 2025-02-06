<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();

const { t } = useI18n();
const colorMode = useColorMode();

const reverseTheme = computed(() => (colorMode.value === 'dark' ? 'light' : 'dark'));

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

			<div class="mt-10 flex items-center gap-4">
				<ButtonBuyMeACoffee />

				<a
					v-if="runtimeConfig.public.github_repo"
					:href="`https://github.com/${runtimeConfig.public.github_repo}`"
					target="_blank">
					<Button class="!h-12" theme="gray">
						<Icon name="mdi:github" :size="24" /> {{ t('pages.about.contribute') }}
					</Button>
				</a>
			</div>
		</div>
		<div class="about-container-end">
			<div class="w-full flex flex-wrap justify-center">
				<NuxtImg class="about-logo" src="images/zyro-color-wide.webp" />

				<div class="mt-12">
					<Contributors />
				</div>
			</div>
		</div>
	</div>
</template>
