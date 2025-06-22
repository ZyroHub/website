<script lang="ts" setup>
import type { ITool } from '~/shared/types';

const device = useDevice();

const props = defineProps<{
	tools?: ITool[];
	path?: string;
}>();

provide('kit_path', props.path);
provide('kit_tools', props.tools);
</script>

<template>
	<ToolkitLayoutMobile v-if="device.isMobileOrTablet" />
	<ToolkitLayoutDesktop v-else :tools="props.tools" :path="props.path" />
</template>
