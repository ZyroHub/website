<script lang="ts" setup>
import type { ITool } from '~/shared/types';

const kitPath = inject<string>('kit_path');
const kitTools = inject<ITool[]>('kit_tools');
</script>

<template>
	<div class="bg-neutral-200 dark:bg-black-950 p-4 rounded-lg">
		<ToolkitNavigationMobile :tools="kitTools" :path="kitPath">
			<template #title>
				<slot name="title"></slot>
			</template>
		</ToolkitNavigationMobile>
	</div>
</template>
