<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';
import z from 'zod';
import type { DiscordAttachmentReference } from '~/shared/discord';

const props = defineProps<{
	class?: string;
}>();

const imageModel = defineModel<DiscordAttachmentReference>('image');

const hasImage = computed(() => !!imageModel.value);

const imageURL = ref('');

const isValidImageURL = computed(() => z.string().url().safeParse(imageURL.value).success);

const addStep = ref<'home' | 'url' | 'upload'>('home');

const handleSelectMethod = (method: 'url' | 'upload') => {
	addStep.value = method;
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
	imageModel.value = undefined;

	close();
};
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
	<Dropdown placement="bottom-start" @close="handleCloseDropdown">
		<template #trigger="{ toggleIsOpen }">
			<div :class="twMerge('w-full h-full', props.class)" @click="toggleIsOpen">
				<img v-if="imageModel" class="w-full h-full rounded-lg" :src="imageModel.url" />
				<div v-else class="no-image">
					<Icon name="mdi:image-add" size="36" class="text-neutral-800 dark:text-neutral-400" />
				</div>
			</div>
		</template>

		<template #default="{ close }">
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
				<InputsText v-model="imageURL" label="Image URL" prepend-icon="mdi:link" prepend-icon-class="text-lg" />

				<div class="flex justify-end mt-2 gap-2">
					<Button @click="addStep = 'home'" theme="gray">Cancel</Button>
					<Button @click="handleAddUrl(close)" theme="primary" :disabled="!isValidImageURL">Add</Button>
				</div>
			</div>
		</template>
	</Dropdown>
</template>
