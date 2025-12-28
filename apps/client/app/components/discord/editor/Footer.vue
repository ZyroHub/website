<script lang="ts" setup>
import type {
	DiscordAttachment,
	DiscordAttachmentPlacement,
	DiscordAttachmentReference,
	DiscordEmbedFooter
} from '~~/shared/discord/discord';

const props = defineProps<{
	embedId: string;
	attachments: DiscordAttachment[];
}>();

const emit = defineEmits<{
	addAttachment: [attachment: DiscordAttachment];
	addAttachmentPlacement: [attachment_id: string, placement: DiscordAttachmentPlacement];
	removeAttachment: [id: string, placement?: DiscordAttachmentPlacement];
}>();

const { t } = useI18n();

const footerModel = defineModel<DiscordEmbedFooter>('footer');

const footerText = computed({
	get: () => footerModel.value?.text || '',
	set: (value: string) => {
		if (footerModel.value) footerModel.value.text = value;
	}
});

const footerIcon = computed({
	get: () => footerModel.value?.icon,
	set: (value: DiscordAttachmentReference) => {
		if (footerModel.value) footerModel.value.icon = value;
	}
});
</script>

<template>
	<DiscordEditorCollapsable :title="t('components.discord.editor.footer.title')" collapsed>
		<template #default>
			<div class="flex gap-4 w-full">
				<DiscordEditorImage
					class="w-20 h-20"
					v-model:image="footerIcon"
					:placement="`embeds.${props.embedId}.footer`"
					:attachments="props.attachments"
					@addAttachment="attachment => emit('addAttachment', attachment)"
					@addAttachmentPlacement="
						(attachment_id, placement) => emit('addAttachmentPlacement', attachment_id, placement)
					"
					@removeAttachment="(id, placement) => emit('removeAttachment', id, placement)" />

				<InputsText
					v-model="footerText"
					:label="t('components.discord.editor.footer.form.text')"
					class="flex-grow"
					:counterMax="2048"
					showCounter />
			</div>
		</template>
	</DiscordEditorCollapsable>
</template>
