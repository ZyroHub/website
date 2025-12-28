<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();

const { t } = useI18n();
const colorMode = useColorMode();

useSeoMeta({
	title: t('pages.about.meta.title')
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/pages/about.scss';
</style>

<template>
	<div class="about-container container">
		<div>
			<div class="about-container-start">
				<div class="dark:bg-neutral-800 bg-neutral-50 px-6 py-6 rounded-xl">
					<h1 class="about-title">{{ t('pages.about.title') }}</h1>

					<p class="about-description">{{ t('pages.about.description') }}</p>

					<div class="mt-10 flex items-center gap-4 justify-center md:justify-start flex-col sm:flex-row">
						<ButtonBuyMeACoffee />

						<a
							v-if="runtimeConfig.public.github_repo"
							:href="`https://github.com/${runtimeConfig.public.github_repo}`"
							target="_blank"
							:draggable="false">
							<Button class="!h-12" theme="gray">
								<Icon name="mdi:github" :size="24" /> {{ t('pages.about.contribute') }}
							</Button>
						</a>
					</div>
				</div>
			</div>
			<div class="about-container-end">
				<div class="w-full bg-neutral-50 dark:bg-neutral-800 h-max py-6 rounded-xl">
					<div class="w-full flex flex-wrap justify-center items-center flex-col md:flex-row">
						<NuxtImg
							class="about-logo"
							src="images/zyro-color-wide.webp"
							width="240px"
							height="128px"
							sizes="240px" />

						<div class="mt-12">
							<Contributors />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
