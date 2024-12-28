<script lang="ts" setup>
const props = defineProps<{
	tools?: ITool[];
	path?: string;
}>();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/toolkit/layout.scss';
</style>

<template>
	<div class="toolkit-container">
		<div class="toolkit-container-start">
			<ToolkitNavigation :tools="props.tools" :path="props.path">
				<template #title>
					<slot name="title"></slot>
				</template>
			</ToolkitNavigation>
		</div>

		<div class="toolkit-container-end">
			<div class="toolkit-content">
				<NuxtPage :transition="{ name: 'transition_tool_switch' }" />
			</div>
		</div>
	</div>
</template>
