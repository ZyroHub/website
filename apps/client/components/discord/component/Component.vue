<script lang="ts" setup>
import type { DiscordComponent } from '~/shared/discord';

const props = defineProps<{
	dc_component: DiscordComponent;
}>();
</script>

<template>
	<div>
		<DiscordComponentButton v-if="props.dc_component.type === 'button'" :button="props.dc_component" />
	</div>
</template>
