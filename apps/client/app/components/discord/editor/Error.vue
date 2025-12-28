<script lang="ts" setup>
import type { DiscordError } from '~~/shared/discord/discord';

const props = defineProps<{
	error: DiscordError;
}>();

const { t } = useI18n();
</script>

<template>
	<div class="flex items-center gap-2 bg-red-100 dark:bg-red-500 text-red-800 dark:text-red-100 rounded-md p-2">
		<Icon name="mdi:alert-circle" size="24" />
		<div>
			<p class="text-sm">
				{{ props.error.message || t('components.discord.editor.error.unknown') }}
			</p>
			<p v-if="props.error.code" class="font-semibold text-xs">{{ props.error.code }}</p>
		</div>
	</div>
</template>
