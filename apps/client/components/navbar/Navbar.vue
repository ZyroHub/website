<style lang="scss" scoped>
@use '~/assets/scss/components/navbar/navbar.scss';
</style>

<template>
	<nav>
		<div class="navbar-container">
			<div class="navbar-container-start"></div>
			<div class="navbar-container-center">
				<NuxtLink to="/">
					<NuxtImg src="images/zyro-color-wide.webp" class="navbar-logo" />
				</NuxtLink>
			</div>
			<div class="navbar-container-end"></div>
		</div>
	</nav>
</template>
