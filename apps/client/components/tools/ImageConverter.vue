<script lang="ts" setup>
import type { WorkerStorage } from '@zyrohub/toolkit';
import { z } from 'zod';

const { t } = useI18n();

const multiTask = useMultiTask({ worker_id: 'image_converter', task_save_data: false });

const orderedTasks = computed(() =>
	multiTask.tasks.value.sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
);

const form = useForm(
	{
		format: 'webp' as WorkerStorage<'image_converter'>['converted_image_format']
	},
	z.object({
		format: z.string()
	})
);

const isDragOver = ref(false);

const filePicker = useFilePicker({
	accept: 'image/*',
	multiple: true,
	maxCount: 10,
	onFilesAdd: async files => {
		for (const file of files) {
			const fileBuffer = await getFileBuffer(file);

			await multiTask.start(
				{
					image: fileBuffer,
					format: form.values.value.format
				},
				{
					name: file.name.replace(/\..+$/, ''),
					image_url: URL.createObjectURL(file),
					converted_image_format: form.values.value.format
				}
			);
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

	const files = event.dataTransfer?.files;
	if (!files) return;

	const filesArray = Array.from(files)?.slice(0, 10);
	for (const file of filesArray) {
		if (!file.type.startsWith('image/')) continue;

		const fileBuffer = await getFileBuffer(file);
		await multiTask.start(
			{
				image: fileBuffer,
				format: form.values.value.format
			},
			{
				name: file.name.replace(/\..+$/, ''),
				image_url: URL.createObjectURL(file),
				converted_image_format: form.values.value.format
			}
		);
	}
};

const handleDownloadTaskFile = async (task_id: string) => {
	const task = multiTask.get(task_id);
	if (!task?.storage?.converted_image_url) return;

	downloadFile(`${task.storage.name}.${task.storage.converted_image_format}`, task.storage.converted_image_url);
};

const handleCancelTask = (task_id: string) => {
	const task = multiTask.get(task_id);

	if (task) {
		if (task.storage?.image_url) URL.revokeObjectURL(task.storage?.image_url);
		if (task.storage?.converted_image_url) URL.revokeObjectURL(task.storage?.converted_image_url);
	}

	multiTask.cancel(task_id);
};

multiTask.onTaskFinished(async data => {
	const task = multiTask.get(data.task.id);
	if (!task) return;

	const convertedFile = getFileFromSocketData(data.data?.converted_image);
	if (!convertedFile) return;

	const fileBlob = new Blob([convertedFile], { type: 'image/' + task.storage?.converted_image_format });
	const fileUrl = URL.createObjectURL(fileBlob);

	if (task.storage!.image_url) {
		URL.revokeObjectURL(task.storage!.image_url);
		task.storage!.image_url = '';
	}

	task.storage!.converted_image_url = fileUrl;
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/tools/image-converter.scss';
</style>

<template>
	<div class="flex w-full flex-col md:flex-row">
		<InputsProvider :form="form">
			<div
				@drop="handleDrop"
				@dragover="handleDragOver"
				@dragleave="handleDragLeave"
				:class="[
					'h-76 max-h-76 border-3 flex w-full flex-col items-center justify-center border-dashed border-transparent duration-200 md:w-1/2',
					{ 'tools-image-converter-content-drag': isDragOver }
				]">
				<Icon name="material-symbols:hide-image-rounded" class="tools-image-converter-image-icon" />

				<div class="flex items-end gap-4">
					<InputsSelect
						name="format"
						label="Format"
						class="max-w-24"
						:options="[
							{ label: 'webp', value: 'webp' },
							{ label: 'png', value: 'png' },
							{ label: 'jpg', value: 'jpg' },
							{ label: 'jpeg', value: 'jpeg' }
						]" />

					<Button @click="filePicker.open()" theme="primary">
						<Icon name="majesticons:file" /> {{ t('components.tools.image_converter.upload') }}
					</Button>
				</div>
			</div>
		</InputsProvider>

		<div class="h-76 max-h-76 flex w-full flex-col gap-4 overflow-y-auto px-4 md:w-1/2">
			<div v-for="task in orderedTasks" :key="task.id || task.request_id" class="w-full">
				<div class="grid w-full grid-cols-8 gap-2">
					<div class="col-span-2">
						<img
							:src="task.storage?.converted_image_url || task.storage?.image_url"
							class="aspect-square w-full rounded-lg object-cover" />
					</div>
					<div class="col-span-6">
						<div class="flex w-full items-center gap-2">
							<p class="max-w-1/2 truncate">
								{{ task.storage?.name }}
							</p>

							<Icon name="mdi:keyboard-arrow-right" />

							<span>{{ task.storage?.converted_image_format }}</span>
						</div>

						<ToolkitToolProgress :task="task" text-class="!text-start" />

						<div class="mt-2 flex gap-1">
							<Button
								v-if="task.storage?.converted_image_url"
								@click="handleDownloadTaskFile(task.id!)"
								theme="primary">
								<Icon name="material-symbols:download-rounded" />
							</Button>
							<Button @click="handleCancelTask(task.id || task.request_id)" theme="gray">
								<Icon name="mdi:close" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
