<script lang="ts" setup>
const viewport = useViewport();
</script>

<template>
	<NavbarMobile v-if="viewport.isLessOrEquals('md')" />
	<NavbarDesktop v-else />
</template>
