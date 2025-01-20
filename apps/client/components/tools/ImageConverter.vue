<script lang="ts" setup>
import { z } from 'zod';

const multiTask = useMultiTask({ worker_id: 'image_converter' });

const form = useForm({}, z.object({}));

const filePicker = useFilePicker({
	accept: 'image/*',
	onFilesAdd: async files => {
		for (const file of files) {
			const fileBuffer = await getFileBuffer(file);

			multiTask.start({ name: file.name, image: fileBuffer, format: 'webp' });
		}
	}
});
</script>

<template>
	<div class="flex">
		<InputsProvider :form="form">
			<div>
				<InputsSelect name="test" />
			</div>
		</InputsProvider>
	</div>
</template>
