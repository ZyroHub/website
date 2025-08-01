<script lang="ts" setup>
import type { DiscordRow } from '~/shared/discord';

const props = defineProps<{
	row: DiscordRow;
}>();
</script>

<template>
	<div class="flex flex-wrap gap-x-2 gap-y-1">
		<DiscordComponent
			v-for="dc_component in props.row.components"
			:key="dc_component.id"
			:dc_component="dc_component" />
	</div>
</template>
