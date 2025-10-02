<script lang="ts" setup>
import type { DiscordError } from '~/shared/discord';

const props = defineProps<{
	error: DiscordError;
}>();
</script>

<template>
	<div class="flex items-center gap-2 bg-red-100 dark:bg-red-500 text-red-800 dark:text-red-100 rounded-md p-2">
		<Icon name="mdi:alert-circle" size="24" />
		<div>
			<p class="text-sm">
				{{ props.error.message || 'An unknown error occurred.' }}
			</p>
			<p v-if="props.error.code" class="font-semibold text-xs">{{ props.error.code }}</p>
		</div>
	</div>
</template>
