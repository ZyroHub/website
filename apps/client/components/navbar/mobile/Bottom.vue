<script lang="ts" setup>
const { t } = useI18n();
</script>

<template>
	<nav class="w-full fixed bottom-0 z-100 bg-black-900 dark:bg-black-950 left-0">
		<div class="flex w-full justify-around items-center h-16">
			<NavbarMobileTab to="/" :title="t('components.navbar.tabs.home')">
				<Icon :size="30" name="ant-design:home-filled" />
			</NavbarMobileTab>
			<NavbarMobileTab to="/developers" :title="t('components.navbar.tabs.developers')">
				<Icon :size="30" name="ant-design:code-filled" />
			</NavbarMobileTab>
			<NavbarMobileTab to="/creators" :title="t('components.navbar.tabs.creators')">
				<Icon :size="30" name="ant-design:camera-filled" />
			</NavbarMobileTab>
			<NavbarMobileTab to="/misc" :title="t('components.navbar.tabs.misc')">
				<Icon :size="30" name="jam:tools-f" />
			</NavbarMobileTab>
			<NavbarMobileTab to="/about"><Icon :size="30" name="material-symbols:info-rounded" /></NavbarMobileTab>
		</div>
	</nav>
</template>
