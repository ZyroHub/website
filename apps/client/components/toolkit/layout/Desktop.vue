<script lang="ts" setup>
import type { ITool } from '~/shared/types';

const props = defineProps<{
	tools?: ITool[];
	path?: string;
}>();

const tools = useTools();

onMounted(() => {
	if (!tools.selectedToolId.value) {
		tools.maximizeNavigation();
	} else {
		tools.minimizeNavigation();
	}
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/toolkit/layout/desktop.scss';
</style>

<template>
	<div class="toolkit-container">
		<div :class="['toolkit-container-start', { minimized: tools.isMinimizedNavigation.value }]">
			<ToolkitNavigationDesktop :tools="props.tools" :path="props.path">
				<template #title>
					<slot name="title"></slot>
				</template>
			</ToolkitNavigationDesktop>
		</div>

		<div class="toolkit-container-end">
			<div class="toolkit-content">
				<NuxtPage :transition="{ name: 'transition_tool_switch' }" />
			</div>

			<ToolkitRelated />
		</div>
	</div>
</template>
