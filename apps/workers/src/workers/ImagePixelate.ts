import { WorkerArgs, WorkerResponse } from '@zyrohub/toolkit';
import sharp from 'sharp';
import { filetypemime } from 'magic-bytes.js';
import quantize, { type RgbPixel } from 'quantize';

import { BaseWorker, BaseWorkerProgress } from './Base.js';

const findClosestColor = (color: number[], palette: number[][]) => {
	let minDistance = Infinity;
	let closest = palette[0];

	for (const candidate of palette) {
		const distance = Math.sqrt(
			Math.pow(color[0] - candidate[0], 2) +
				Math.pow(color[1] - candidate[1], 2) +
				Math.pow(color[2] - candidate[2], 2)
		);
		if (distance < minDistance) {
			minDistance = distance;
			closest = candidate;
		}
	}

	return closest;
};

export class ImagePixelateWorker extends BaseWorker {
	static async execute<T extends 'image_pixelate'>(
		data: WorkerArgs<T>,
		update_progress: BaseWorkerProgress
	): Promise<WorkerResponse<T>> {
		const fileBuffer = Buffer.from(data.image.split(',')[1], 'base64');
		const mimeType = filetypemime(fileBuffer)?.[0];
		if (!mimeType?.startsWith('image/')) throw new Error('invalid-file-type');

		const imageSharp = sharp(fileBuffer);

		const inputMetadata = await imageSharp.metadata();

		const smallWidth = Math.floor((inputMetadata.width || 1) / data.size);
		const smallHeight = Math.floor((inputMetadata.height || 1) / data.size);

		const raw = await imageSharp
			.resize({
				width: smallWidth,
				height: smallHeight,
				kernel: 'nearest'
			})
			.raw()
			.toBuffer({ resolveWithObject: true });

		const { data: raw_data, info } = raw;
		const channels = info.channels;

		const newBuffer = Buffer.from(raw_data);

		if (data.quantization) {
			const palettePixels: number[][] = [];
			for (let i = 0; i < raw_data.length; i += channels) {
				palettePixels.push([raw_data[i], raw_data[i + 1], raw_data[i + 2]]);
			}

			const quantized = quantize(palettePixels as RgbPixel[], data.quantization_count);
			if (!quantized) throw new Error('quantization');

			const palette = quantized.palette();

			for (let y = 0; y < smallHeight; y++) {
				for (let x = 0; x < smallWidth; x++) {
					const idx = (y * smallWidth + x) * channels;
					const oldPixel = [newBuffer[idx], newBuffer[idx + 1], newBuffer[idx + 2]];
					const newPixel = findClosestColor(oldPixel, palette);
					const error = [oldPixel[0] - newPixel[0], oldPixel[1] - newPixel[1], oldPixel[2] - newPixel[2]];

					newBuffer[idx] = newPixel[0];
					newBuffer[idx + 1] = newPixel[1];
					newBuffer[idx + 2] = newPixel[2];

					if (data.dithering) {
						const distributeError = (dx: number, dy: number, factor: number) => {
							const nx = x + dx;
							const ny = y + dy;
							if (nx >= 0 && nx < smallWidth && ny >= 0 && ny < smallHeight) {
								const ni = (ny * smallWidth + nx) * channels;
								newBuffer[ni] = Math.max(
									0,
									Math.min(255, Math.round(newBuffer[ni] + error[0] * factor))
								);
								newBuffer[ni + 1] = Math.max(
									0,
									Math.min(255, Math.round(newBuffer[ni + 1] + error[1] * factor))
								);
								newBuffer[ni + 2] = Math.max(
									0,
									Math.min(255, Math.round(newBuffer[ni + 2] + error[2] * factor))
								);
							}
						};

						distributeError(1, 0, 7 / 16);
						distributeError(-1, 1, 3 / 16);
						distributeError(0, 1, 5 / 16);
						distributeError(1, 1, 1 / 16);
					}
				}
			}
		}

		const outputFileBuffer = await sharp(newBuffer, {
			raw: {
				width: smallWidth,
				height: smallHeight,
				channels: channels
			}
		})
			.resize({
				width: inputMetadata.width,
				height: inputMetadata.height,
				kernel: 'nearest'
			})
			.png()
			.toBuffer();

		return { pixelated_image: outputFileBuffer };
	}
}
