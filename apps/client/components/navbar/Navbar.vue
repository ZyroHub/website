<style lang="scss" scoped>
@use '~/assets/scss/components/navbar/navbar.scss';
</style>

<template>
	<nav>
		<div class="navbar-container">
			<div class="navbar-container-start"></div>

			<div class="navbar-container-center">
				<NuxtLinkLocale to="/">
					<NuxtImg src="images/zyro-color-wide.webp" class="navbar-logo" />
				</NuxtLinkLocale>
			</div>

			<div class="navbar-container-end">
				<NavbarLanguageSelector />

				<NavbarThemeSwitcher />
			</div>
		</div>
	</nav>
</template>
