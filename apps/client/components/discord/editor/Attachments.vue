<script lang="ts" setup>
import type { DiscordAttachment, DiscordAttachmentPlacement } from '~/shared/discord/discord';

const emit = defineEmits<{
	addAttachment: [attachment: DiscordAttachment, placement?: DiscordAttachmentPlacement];
	removeAttachment: [id: string];
}>();

const { t } = useI18n();

const filePicker = useFilePicker({
	multiple: true,
	onFilesAdd: async files => {
		for (const file of files) {
			const attachmentId = `${Date.now()}_${Math.floor(Math.random() * 100)}`;

			const isImage = file.type.startsWith('image/');
			const previewUrl = isImage ? URL.createObjectURL(file) : undefined;

			emit('addAttachment', {
				id: attachmentId,
				name: toSlugFileName(file.name),
				file,
				type: isImage ? 'image' : 'other',
				preview_url: previewUrl
			});
		}
	}
});

const attachmentsModel = defineModel<DiscordAttachment[]>('attachments');

const maxAttachments = ref(10);
</script>

<template>
	<DiscordEditorCollapsable
		:title="`Files (${attachmentsModel?.length.toString().padStart(2, '0')}/${maxAttachments.toString().padStart(2, '0')})`"
		class="bg-neutral-300 dark:bg-neutral-900"
		collapsed>
		<div v-if="attachmentsModel?.length" class="flex flex-col gap-1">
			<div v-for="attachment in attachmentsModel" :key="attachment.id" class="flex items-center w-full gap-2">
				<div class="flex justify-center min-w-20">
					<div v-if="attachment.type === 'image'">
						<img
							:src="attachment.preview_url"
							alt="Attachment Preview"
							class="max-w-20 max-h-20 object-contain rounded-md border border-neutral-400" />
					</div>
					<div
						v-else
						class="flex justify-center items-center w-20 h-20 bg-neutral-200 dark:bg-neutral-800 rounded-md border border-neutral-400">
						<Icon name="mdi:file-outline" size="48" />
					</div>
				</div>

				<div class="flex flex-col flex-grow">
					<div class="flex w-full">
						<p class="text-base flex-grow flex truncate w-0">
							{{ attachment.name }}
						</p>
					</div>

					<div class="flex gap-2 mt-1">
						<Button theme="gray" @click="emit('removeAttachment', attachment.id)">
							<Icon name="mdi:delete" /> {{ t('components.discord.editor.attachments.remove') }}
						</Button>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="flex items-center justify-center gap-2 p-4 text-neutral-800 dark:text-neutral-200">
			<Icon name="mdi:file-outline" size="32" />

			<p class="text-base">{{ t('components.discord.editor.attachments.no_attachments') }}</p>
		</div>

		<div class="flex justify-center mt-1">
			<Button @click="filePicker.open" theme="primary">
				<Icon name="mdi:plus" /> {{ t('components.discord.editor.attachments.upload') }}
			</Button>
		</div>
	</DiscordEditorCollapsable>
</template>
