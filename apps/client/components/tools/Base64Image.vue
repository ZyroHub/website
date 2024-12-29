<script lang="ts" setup>
const { t } = useI18n();

const inputContent = ref('');

const isDragOver = ref(false);

const filePicker = useFilePicker({
	accept: 'image/*',
	onFilesAdd: async files => {
		const file = files[0];

		if (file) {
			const dataURL = await getFileBase64(file);

			if (dataURL) inputContent.value = dataURL;
		}
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

	const dataURL = await getFileBase64(file);

	if (dataURL) inputContent.value = dataURL;
};

const handleDownload = () => {
	downloadFile('base64-image.png', inputContent.value);
};

const handleClear = () => {
	inputContent.value = '';
};
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/tools/base64-image.scss';
</style>

<template>
	<div class="tools-base64-image-container">
		<div>
			<InputsTextArea
				v-model="inputContent"
				:label="t('components.tools.base64_image.input.label')"
				:placeholder="t('components.tools.base64_image.input.placeholder')"
				:rows="10" />
		</div>

		<div>
			<Transition name="transition_tools_base64_image_switch" mode="out-in">
				<div v-if="inputContent" class="tools-base64-image-preview-content">
					<div class="tools-base64-image-preview">
						<img :src="inputContent" alt="Base64 Image" />
					</div>

					<div class="tools-base64-image-preview-buttons">
						<Button @click="handleDownload" theme="primary">
							<Icon name="material-symbols:download-rounded" />
							{{ t('components.tools.base64_image.preview.buttons.download') }}
						</Button>
						<Button @click="handleClear" theme="gray">
							{{ t('components.tools.base64_image.preview.buttons.clear') }}
						</Button>
					</div>
				</div>
				<div
					v-else
					@drop="handleDrop"
					@dragover="handleDragOver"
					@dragleave="handleDragLeave"
					:class="['tools-base64-no-image-content', { 'tools-base64-no-image-content-drag': isDragOver }]">
					<Icon name="material-symbols:hide-image-rounded" class="tools-base64-no-image-icon" />

					<div class="tools-base64-no-image-content-actions">
						<p>{{ t('components.tools.base64_image.no_image.description') }}</p>
						<p>{{ t('components.tools.base64_image.no_image.or') }}</p>
						<Button @click="filePicker.open()" theme="primary">
							<Icon name="majesticons:file" /> {{ t('components.tools.base64_image.no_image.upload') }}
						</Button>
					</div>
				</div>
			</Transition>
		</div>
	</div>
</template>
