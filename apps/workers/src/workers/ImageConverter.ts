import { WorkerArgs, WorkerResponse } from '@zyrohub/toolkit';
import sharp from 'sharp';
import { filetypemime } from 'magic-bytes.js';

import { BaseWorker, BaseWorkerProgress } from './Base.js';

export class ImageConverterWorker extends BaseWorker {
	static async execute<T extends 'image_converter'>(
		data: WorkerArgs<T>,
		update_progress: BaseWorkerProgress
	): Promise<WorkerResponse<T>> {
		const fileBuffer = Buffer.from(data.image.split(',')[1], 'base64');
		const mimeType = filetypemime(fileBuffer)?.[0];
		if (!mimeType?.startsWith('image/')) throw new Error('invalid-file-type');

		update_progress(25, 'converting_image');

		let imageSharp = sharp(fileBuffer, { animated: !!data.animated });

		imageSharp = imageSharp.toFormat(data.format);
		if (!['png', 'webp'].includes(data.format)) imageSharp = imageSharp.flatten({ background: '#ffffff' });

		const imageBuffer = await imageSharp.toBuffer();

		return { converted_image: imageBuffer };
	}
}
