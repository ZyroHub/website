import { WorkerId } from '@zyrohub/toolkit';

import { BaseWorker } from './Base.js';

import { BcryptGeneratorWorker } from './BcryptGenerator.js';
import { BcryptCheckerWorker } from './BcryptChecker.js';

import { HashGeneratorWorker } from './HashGenerator.js';

import { ImageConverterWorker } from './ImageConverter.js';
import { ImagePixelateWorker } from './ImagePixelate.js';

export const workers: Record<WorkerId, typeof BaseWorker> = {
	bcrypt_generator: BcryptGeneratorWorker,
	bcrypt_checker: BcryptCheckerWorker,
	hash_generator: HashGeneratorWorker,
	image_converter: ImageConverterWorker,
	image_pixelate: ImagePixelateWorker
};
