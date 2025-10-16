<script lang="ts" setup>
import type { DiscordAttachment } from '~/shared/discord';

const { t } = useI18n();

const attachmentsModel = defineModel<DiscordAttachment[]>('attachments');

const maxAttachments = ref(10);
</script>

<template>
	<DiscordEditorCollapsable
		:title="`Files (${attachmentsModel?.length.toString().padStart(2, '0')}/${maxAttachments.toString().padStart(2, '0')})`"
		class="bg-neutral-300 dark:bg-neutral-900"
		collapsed>
		<div v-if="!attachmentsModel?.length" class="flex items-center justify-center gap-2 p-4 text-neutral-200">
			<Icon name="mdi:file-outline" size="32" />

			<p class="text-base">{{ t('components.discord.editor.attachments.no_attachments') }}</p>
		</div>
	</DiscordEditorCollapsable>
</template>
