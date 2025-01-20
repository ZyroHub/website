import { Utilities, WorkerArgs, WorkerResponse } from '@zyrohub/toolkit';

import { BaseWorker, BaseWorkerProgress } from './Base';
import sharp from 'sharp';
import { filetypemime } from 'magic-bytes.js';

export class ImageConverterWorker extends BaseWorker {
	static async execute<T extends 'image_converter'>(
		data: WorkerArgs<T>,
		update_progress: BaseWorkerProgress
	): Promise<WorkerResponse<T>> {
		const fileBuffer = Utilities.getFileFromSocketData(data.image);

		const mimeType = filetypemime(fileBuffer)?.[0];
		console.log(mimeType);
		if (!mimeType?.startsWith('image/')) throw new Error('invalid-file-type');

		const imageSharp = sharp(fileBuffer);

		const imageBuffer = await imageSharp.toFormat(data.format).toBuffer();

		return { converted_image: imageBuffer };
	}
}
