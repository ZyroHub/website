<script lang="ts" setup>
import { z } from 'zod';

const { t } = useI18n();

const task = useTask({ worker_id: 'image_pixelate' });

const form = useForm(
	{
		image: null as File | null,
		size: 10,

		quantization: false,
		quantization_count: 16,

		dithering: false
	},
	z.object({
		image: z.instanceof(File)
	})
);

const isSubmittable = computed(() => form.isValid.value && task.isSubmittable.value);

const handleExecute = async () => {
	if (!isSubmittable.value) return;

	if (task.task.value?.storage?.pixelated_image_url) {
		URL.revokeObjectURL(task.task.value.storage.pixelated_image_url);
		task.task.value!.storage!.pixelated_image_url = undefined;
	}

	const fileBase64 = await getFileBase64(form.values.value.image!);

	await task.start(
		{
			image: fileBase64,
			size: form.values.value.size,

			quantization: form.values.value.quantization,
			quantization_count: form.values.value.quantization_count,

			dithering: form.values.value.dithering
		},
		{
			name: form.values.value.image!.name.replace(/\..+$/, '')
		}
	);
};

const handleDownload = () => {
	if (!task.task.value?.storage?.pixelated_image_url) return;

	downloadFile(`pixelated-${task.task.value.storage.name}.png`, task.task.value.storage.pixelated_image_url);
};

const handleClear = () => {
	if (task.task.value?.storage?.pixelated_image_url) {
		URL.revokeObjectURL(task.task.value.storage.pixelated_image_url);
		task.task.value!.storage!.pixelated_image_url = undefined;
	}
};

task.onTaskFinished(data => {
	const convertedFile = getFileFromSocketData(data.data?.pixelated_image) as ArrayBuffer;
	if (!convertedFile) return;

	const fileBlob = new Blob([convertedFile], { type: 'image/png' });
	const fileUrl = URL.createObjectURL(fileBlob);

	task.task.value!.storage!.pixelated_image_url = fileUrl;
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/tools/image-pixelate.scss';
</style>

<template>
	<div>
		<InputsProvider :form="form">
			<div class="flex gap-2 flex-wrap md:flex-nowrap">
				<div class="w-full md:w-1/2">
					<InputsImageBox name="image" />

					<div class="flex flex-col w-full mt-6 gap-4">
						<InputsSlider
							:label="t('components.tools.image_pixelate.pixel_size')"
							name="size"
							:min="1"
							:max="64" />

						<div class="flex flex-col gap-4">
							<div class="flex gap-4">
								<InputsCheckbox
									:label="t('components.tools.image_pixelate.quantization')"
									name="quantization" />

								<Transition name="transition_fade_200" mode="out-in">
									<InputsCheckbox
										v-if="form.values.value.quantization"
										:label="t('components.tools.image_pixelate.dithering')"
										name="dithering" />
								</Transition>
							</div>

							<Transition name="transition_fade_200" mode="out-in">
								<div v-if="form.values.value.quantization">
									<InputsSlider
										:label="t('components.tools.image_pixelate.quantization_count')"
										name="quantization_count"
										:min="2"
										:max="128" />
								</div>
							</Transition>
						</div>
					</div>

					<Button @click="handleExecute" :disabled="!isSubmittable" theme="primary" class="mt-6">
						<Icon name="pixel:grid-solid" /> {{ t('components.tools.image_pixelate.pixelate') }}
					</Button>
				</div>

				<div class="flex flex-col gap-4 w-full md:w-1/2">
					<div class="max-w-full flex justify-center items-center h-60">
						<img
							v-if="task.task.value?.storage?.pixelated_image_url"
							:src="task.task.value?.storage?.pixelated_image_url"
							:alt="t('components.tools.image_pixelate.output.alt')"
							class="max-w-full max-h-60 rounded-lg" />
						<Icon v-else name="pixel:grid" class="text-32" />
					</div>

					<div class="flex justify-center gap-2">
						<Button
							@click="handleDownload"
							theme="primary"
							:disabled="!task.task.value?.storage?.pixelated_image_url">
							<Icon name="material-symbols:download-rounded" />
							{{ t('components.tools.image_pixelate.output.download') }}
						</Button>
						<Button
							@click="handleClear"
							theme="gray"
							:disabled="!task.task.value?.storage?.pixelated_image_url">
							{{ t('components.tools.image_pixelate.output.clear') }}</Button
						>
					</div>

					<ToolkitToolProgress :task="task.task.value" />
				</div>
			</div>
		</InputsProvider>
	</div>
</template>
