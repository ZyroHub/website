<script lang="ts" setup>
const { t } = useI18n();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/navbar/mobile/top.scss';
</style>

<template>
	<div class="navbar">
		<div class="navbar-container">
			<div class="navbar-container-start">
				<NuxtLinkLocale to="/">
					<NuxtImg
						src="images/zyro-color-wide.webp"
						class="navbar-logo"
						:alt="t('components.navbar.logo.alt')"
						width="82px"
						height="44px"
						sizes="82px" />
				</NuxtLinkLocale>
			</div>

			<div class="navbar-container-end">
				<NavbarLanguageSelector />

				<NavbarThemeSwitcher />
			</div>
		</div>
	</div>
</template>
