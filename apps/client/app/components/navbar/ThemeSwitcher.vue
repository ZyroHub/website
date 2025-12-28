<script lang="ts" setup>
const { t } = useI18n();

const colorMode = useColorMode();

const handleThemeChange = () => {
	colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/navbar/theme-switcher.scss';
</style>

<template>
	<ClientOnly>
		<Transition name="transition_navbar_theme_switcher" mode="out-in">
			<Icon
				:key="colorMode.value"
				@click="handleThemeChange"
				:name="
					colorMode.value === 'dark'
						? 'material-symbols-light:dark-mode'
						: 'material-symbols-light:light-mode'
				"
				size="30"
				:aria-label="t('components.navbar.theme_switcher.button.label')"
				class="navbar-theme-switcher" />
		</Transition>
	</ClientOnly>
</template>
