<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();

const { t } = useI18n();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/navbar/navbar.scss';
</style>

<template>
	<nav>
		<div class="navbar-container">
			<div class="navbar-container-start">
				<NavbarTab to="/">
					<Icon :size="30" name="lucide:home" />
				</NavbarTab>
				<NavbarTab to="/developers" :title="t('components.navbar.tabs.developers')">
					<Icon :size="30" name="ant-design:code-filled" />
				</NavbarTab>
				<NavbarTab to="/creators" :title="t('components.navbar.tabs.creators')">
					<Icon :size="30" name="ant-design:camera-filled" />
				</NavbarTab>
				<NavbarTab to="/misc" :title="t('components.navbar.tabs.misc')">
					<Icon :size="30" name="jam:tools-f" />
				</NavbarTab>
				<NavbarTab to="/about">{{ t('components.navbar.tabs.about') }}</NavbarTab>
			</div>

			<div class="navbar-container-center">
				<NuxtLinkLocale to="/">
					<NuxtImg
						src="images/zyro-color-wide.webp"
						class="navbar-logo"
						:alt="t('components.navbar.logo.alt')" />
				</NuxtLinkLocale>
			</div>

			<div class="navbar-container-end">
				<NavbarLanguageSelector />

				<a
					v-if="runtimeConfig.public.github_repo"
					class="display-inherit"
					:href="`https://github.com/${runtimeConfig.public.github_repo}`"
					target="_blank"
					aria-label="GitHub">
					<Icon name="mdi:github" size="30" class="navbar-icon" />
				</a>

				<NavbarThemeSwitcher />
			</div>
		</div>
	</nav>
</template>
