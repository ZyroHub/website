<script lang="ts" setup>
import type {
	DiscordAttachment,
	DiscordAttachmentPlacement,
	DiscordAttachmentReference,
	DiscordEmbed,
	DiscordEmbedAuthor,
	DiscordEmbedFooter
} from '~/shared/discord';

const props = defineProps<{
	number: number;
	total: number;
	attachments: DiscordAttachment[];
}>();

const emit = defineEmits<{
	delete: [];
	moveUp: [];
	moveDown: [];
	addAttachment: [attachment: DiscordAttachment];
	addAttachmentPlacement: [attachment_id: string, placement: DiscordAttachmentPlacement];
	removeAttachment: [id: string, placement?: DiscordAttachmentPlacement];
}>();

const embedModel = defineModel<DiscordEmbed>('embed');

const hasErrors = computed(() => {
	return !!embedModel.value?.errors && embedModel.value.errors.length > 0;
});

const canMoveUp = computed(() => {
	return props.number > 1;
});

const canMoveDown = computed(() => {
	return props.number < props.total;
});

const embedColor = computed({
	get: () => embedModel.value?.color,
	set: (value: string) => {
		if (embedModel.value) embedModel.value.color = value;
	}
});

const embedTitle = computed({
	get: () => embedModel.value?.title || '',
	set: (value: string) => {
		if (embedModel.value) embedModel.value.title = value;
	}
});

const embedURL = computed({
	get: () => embedModel.value?.url || '',
	set: (value: string) => {
		if (embedModel.value) embedModel.value.url = value;
	}
});

const embedThumbnail = computed({
	get: () => embedModel.value?.thumbnail,
	set: (value: DiscordAttachmentReference) => {
		if (embedModel.value) embedModel.value.thumbnail = value;
	}
});

const embedImage = computed({
	get: () => embedModel.value?.image,
	set: (value: DiscordAttachmentReference) => {
		if (embedModel.value) embedModel.value.image = value;
	}
});

const embedDescription = computed({
	get: () => embedModel.value?.description || '',
	set: (value: string) => {
		if (embedModel.value) embedModel.value.description = value;
	}
});

const embedAuthor = computed({
	get: () => embedModel.value?.author || { name: '', url: '' },
	set: (value: DiscordEmbedAuthor) => {
		if (embedModel.value) embedModel.value.author = value;
	}
});

const embedFields = computed({
	get: () => embedModel.value?.fields || [],
	set: (value: DiscordEmbed['fields']) => {
		if (embedModel.value) embedModel.value.fields = value;
	}
});

const embedFooter = computed({
	get: () => embedModel.value?.footer || { text: '' },
	set: (value: DiscordEmbedFooter) => {
		if (embedModel.value) embedModel.value.footer = value;
	}
});

const handleDelete = () => {
	emit('delete');
};
</script>

<template>
	<DiscordEditorCollapsable
		:title="`Embed (${props.number.toString().padStart(2, '0')})${embedTitle ? ` ~ ${embedTitle}` : ''}`"
		class="bg-neutral-300 dark:bg-neutral-900 b-l-solid"
		:style="{ borderColor: embedModel?.color?.toString() }"
		:hasWarns="hasErrors"
		:canMoveUp="canMoveUp"
		:canMoveDown="canMoveDown"
		@moveUp="emit('moveUp')"
		@moveDown="emit('moveDown')">
		<template #actions>
			<Icon
				name="mdi:delete"
				size="20"
				class="hover:text-red-600 dark:hover:text-red-400 cursor-pointer duration-200"
				@click.stop="handleDelete" />
		</template>

		<template #default>
			<div v-if="hasErrors">
				<DiscordEditorError
					v-for="(error, errorI) in embedModel?.errors || []"
					:key="errorI.toString()"
					:error="error" />
			</div>

			<div class="flex gap-4 items-end">
				<div class="flex flex-grow flex-col gap-2">
					<InputsText v-model="embedTitle" label="Title" :counterMax="256" showCounter />
					<InputsText v-model="embedURL" label="Title Url" />
				</div>

				<DiscordEditorImage
					class="w-32 h-32"
					selectedClass="w-max min-w-4"
					v-model:image="embedThumbnail"
					:attachments="props.attachments"
					:placement="`embeds.${props.number - 1}.thumbnail`"
					@addAttachment="attachment => emit('addAttachment', attachment)"
					@addAttachmentPlacement="
						(attachment_id, placement) => emit('addAttachmentPlacement', attachment_id, placement)
					"
					@removeAttachment="(id, placement) => emit('removeAttachment', id, placement)" />
			</div>

			<InputsTextArea v-model="embedDescription" label="Description" :rows="3" :counterMax="4096" showCounter />

			<color-picker v-model="embedColor" v-slot="{ color, show }" withHexInput>
				<div @click="show" class="flex items-center gap-1 w-full">
					<div class="flex justify-center items-center w-8">
						<Icon name="jam:eyedropper-f" size="20" />
					</div>

					<div class="flex-grow text-center rounded-md" :style="{ backgroundColor: color.value }">
						{{ color }}
					</div>
				</div>
			</color-picker>

			<DiscordEditorImage
				class="w-full h-32"
				selectedClass="w-max h-64"
				v-model:image="embedImage"
				:attachments="props.attachments"
				:placement="`embeds.${props.number - 1}.image`"
				@addAttachment="attachment => emit('addAttachment', attachment)"
				@addAttachmentPlacement="
					(attachment_id, placement) => emit('addAttachmentPlacement', attachment_id, placement)
				"
				@removeAttachment="(id, placement) => emit('removeAttachment', id, placement)" />

			<DiscordEditorAuthor
				v-model:author="embedAuthor"
				:embedNumber="props.number"
				:attachments="props.attachments"
				@addAttachment="attachment => emit('addAttachment', attachment)"
				@addAttachmentPlacement="
					(attachment_id, placement) => emit('addAttachmentPlacement', attachment_id, placement)
				"
				@removeAttachment="(id, placement) => emit('removeAttachment', id, placement)" />

			<DiscordEditorFields v-model:fields="embedFields" />

			<DiscordEditorFooter v-model:footer="embedFooter" />
		</template>
	</DiscordEditorCollapsable>
</template>
