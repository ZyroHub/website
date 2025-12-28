<script lang="ts" setup>
import type { HtmlHTMLAttributes } from 'vue';

const { t } = useI18n();

const props = defineProps<{
	name?: string;
	class?: HtmlHTMLAttributes['class'];
	downloadable?: boolean;
}>();

const model = defineModel<File>();
const formInput = useFormInput<File>(props.name, model);

const fileDataUrl = ref<string>();

const isDragOver = ref(false);

const filePicker = useFilePicker({
	accept: 'image/*',
	onFilesAdd: async files => {
		const file = files[0];

		if (file) formInput.inputRef.value = file;
	}
});

const handleDragOver = (event: DragEvent) => {
	event.preventDefault();
	isDragOver.value = true;
};

const handleDragLeave = () => {
	isDragOver.value = false;
};

const handleDrop = async (event: DragEvent) => {
	event.preventDefault();
	isDragOver.value = false;

	const file = event.dataTransfer?.files[0];

	if (!file) return;
	if (!file.type.startsWith('image/')) return;

	formInput.inputRef.value = file;
};

const handleDownload = async () => {
	if (!formInput.inputRef.value || !fileDataUrl.value) return;

	downloadFile(formInput.inputRef.value.name, fileDataUrl.value);
};

const handleClear = () => {
	formInput.inputRef.value = null;
};

watch(
	formInput.inputRef,
	async () => {
		if (formInput.inputRef.value) {
			const file = await getFileBase64(formInput.inputRef.value);
			fileDataUrl.value = file;
		} else {
			fileDataUrl.value = undefined;
		}
	},
	{ immediate: true }
);

defineExpose({
	formInput
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/inputs/image-box.scss';
</style>

<template>
	<div :class="['h-75 max-h-75', props.class]">
		<Transition name="transition_fade_200" mode="out-in">
			<div v-if="formInput.inputRef.value" class="flex flex-col justify-center items-center gap-4 w-full h-full">
				<div class="max-w-full h-60 flex justify-center items-center">
					<img :src="fileDataUrl" alt="Input Image" class="max-w-full max-h-60 rounded-lg" />
				</div>

				<div class="flex gap-2">
					<Button v-if="props.downloadable !== false" @click="handleDownload" theme="primary">
						<Icon name="material-symbols:download-rounded" />
						{{ t('components.inputs.image_box.preview.buttons.download') }}
					</Button>
					<Button @click="handleClear" theme="gray">
						{{ t('components.inputs.image_box.preview.buttons.clear') }}
					</Button>
				</div>
			</div>
			<div
				v-else
				@drop="handleDrop"
				@dragover="handleDragOver"
				@dragleave="handleDragLeave"
				:class="['input-image-box-no-image-content', { 'input-image-box-no-image-content-drag': isDragOver }]">
				<Icon name="material-symbols:hide-image-rounded" class="input-image-box-no-image-icon" />

				<div class="flex flex-col items-center mt-2">
					<p>{{ t('components.inputs.image_box.no_image.description') }}</p>
					<p>{{ t('components.inputs.image_box.no_image.or') }}</p>
					<Button @click="filePicker.open()" theme="primary" class="mt-2">
						<Icon name="majesticons:file" /> {{ t('components.inputs.image_box.no_image.upload') }}
					</Button>
				</div>
			</div>
		</Transition>
	</div>
</template>
