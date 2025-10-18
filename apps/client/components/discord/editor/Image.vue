<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';
import z from 'zod';
import type { DiscordAttachment, DiscordAttachmentPlacement, DiscordAttachmentReference } from '~/shared/discord';

const props = defineProps<{
	class?: string;
	placement?: DiscordAttachmentPlacement;
	selectedClass?: string;
}>();

const emit = defineEmits<{
	addAttachment: [attachment: DiscordAttachment];
	removeAttachment: [id: string];
}>();

const imageModel = defineModel<DiscordAttachmentReference>('image');

const hasImage = computed(() => !!imageModel.value);

const imageFilePicker = useFilePicker({
	accept: 'image/*',
	onFilesAdd: async files => {
		const file = files[0];

		if (file) {
			const attachmentId = crypto.randomUUID();

			const fileUrl = URL.createObjectURL(file);

			emit('addAttachment', {
				id: attachmentId,
				name: file.name,
				placement: props.placement,
				file,
				type: 'image',
				preview_url: fileUrl
			});

			imageModel.value = {
				id: attachmentId,
				type: 'attachment',
				url: fileUrl
			};
		}
	}
});

const imageURL = ref('');

const isValidImageURL = computed(() => z.string().url().safeParse(imageURL.value).success);

const addStep = ref<'home' | 'url' | 'upload'>('home');

const handleSelectMethod = async (method: 'url' | 'upload') => {
	addStep.value = method;

	if (method === 'upload') {
		await nextTick();
		imageFilePicker.open();
	}
};

const handleCloseDropdown = () => {
	addStep.value = 'home';
	imageURL.value = '';
};

const handleAddUrl = (close: () => void) => {
	if (!isValidImageURL.value) return;

	imageModel.value = {
		id: crypto.randomUUID(),
		type: 'url',
		url: imageURL.value
	};

	close();
};

const handleRemoveImage = (close: () => void) => {
	if (imageModel.value?.type === 'attachment') {
		emit('removeAttachment', imageModel.value.id);

		if (imageModel.value.url) {
			URL.revokeObjectURL(imageModel.value.url);
		}
	}

	imageModel.value = undefined;

	close();
};

onBeforeUnmount(() => {
	if (imageModel.value?.type === 'attachment' && imageModel.value.url) {
		URL.revokeObjectURL(imageModel.value.url);
	}
});
</script>

<style lang="scss" scoped>
.no-image {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	border-style: dashed;
	border-radius: 0.75rem;
	cursor: pointer;
	transition: background-color 0.2s;
}

.light-mode {
	.no-image {
		border-color: var(--black_500);

		&:hover {
			background-color: var(--neutral_200);
		}
	}
}

.dark-mode {
	.no-image {
		border-color: var(--black_500);

		&:hover {
			background-color: var(--black_900);
		}
	}
}
</style>

<template>
	<Dropdown placement="bottom-start" @close="handleCloseDropdown" reference-class="flex justify-center">
		<template #trigger="{ toggleIsOpen }">
			<div :class="twMerge('w-full h-full', props.class, hasImage && props.selectedClass)" @click="toggleIsOpen">
				<img v-if="imageModel" class="w-full h-full rounded-lg" :src="imageModel.url" />
				<div v-else class="no-image">
					<Icon name="mdi:image-add" size="36" class="text-neutral-800 dark:text-neutral-400" />
				</div>
			</div>
		</template>

		<template #default="{ close }">
			<Transition name="transition_fade_200" mode="out-in">
				<div v-if="addStep === 'home'">
					<div v-if="!hasImage" class="flex flex-col gap-1">
						<DropdownItem @click="handleSelectMethod('url')" :auto-close="false">
							<Icon name="mdi:link-variant" size="20" />
							Add Image From URL
						</DropdownItem>
						<DropdownItem @click="handleSelectMethod('upload')" :auto-close="false">
							<Icon name="mdi:file-upload" size="20" />
							Attach Image File
						</DropdownItem>
					</div>
					<div v-else>
						<DropdownItem @click="handleRemoveImage(close)">
							<Icon name="mdi:delete" size="20" />
							Remove Image
						</DropdownItem>
					</div>
				</div>
				<div v-else-if="addStep === 'url'">
					<InputsText
						v-model="imageURL"
						label="Image URL"
						prepend-icon="mdi:link"
						prepend-icon-class="text-lg" />

					<div class="flex justify-end mt-2 gap-2">
						<Button @click="addStep = 'home'" theme="gray">Cancel</Button>
						<Button @click="handleAddUrl(close)" theme="primary" :disabled="!isValidImageURL">Add</Button>
					</div>
				</div>
				<div
					v-else-if="addStep === 'upload'"
					class="flex flex-col items-center gap-1 px-2 py-2 text-neutral-50">
					<Icon name="mdi:file-upload" size="48" />
					<p class="text-sm">Awaiting file selection...</p>
				</div>
			</Transition>
		</template>
	</Dropdown>
</template>
