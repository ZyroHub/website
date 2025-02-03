<script lang="ts" setup>
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
					<Icon size="32" name="lucide:home" />
				</NavbarTab>
				<NavbarTab to="/developers">{{ t('components.navbar.tabs.developers') }}</NavbarTab>
				<NavbarTab to="/creators">{{ t('components.navbar.tabs.creators') }}</NavbarTab>
				<NavbarTab to="/misc">{{ t('components.navbar.tabs.misc') }}</NavbarTab>
				<NavbarTab to="/about">{{ t('components.navbar.tabs.about') }}</NavbarTab>
			</div>

			<div class="navbar-container-center">
				<NuxtLinkLocale to="/">
					<NuxtImg src="images/zyro-color-wide.webp" class="navbar-logo" />
				</NuxtLinkLocale>
			</div>

			<div class="navbar-container-end">
				<NavbarLanguageSelector />

				<a class="display-inherit" href="https://github.com/DMVMarcio/zyrohub" target="_blank">
					<Icon name="mdi:github" size="30" class="navbar-icon" />
				</a>

				<NavbarThemeSwitcher />
			</div>
		</div>
	</nav>
</template>
