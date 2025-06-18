<script lang="ts" setup>
const device = useDevice();
</script>

<template>
	<NavbarMobile v-if="device.isMobileOrTablet" />
	<NavbarDesktop v-else />
</template>
