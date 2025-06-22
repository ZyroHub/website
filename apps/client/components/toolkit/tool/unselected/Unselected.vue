<script lang="ts" setup>
const device = useDevice();
</script>

<template>
	<ToolkitToolUnselectedMobile v-if="device.isMobileOrTablet" />
	<ToolkitToolUnselectedDesktop v-else />
</template>
