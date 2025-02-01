import { WorkerId } from '@zyrohub/toolkit';

import { BaseWorker } from './Base.js';

import { BcryptGeneratorWorker } from './BcryptGenerator.js';
import { BcryptCheckerWorker } from './BcryptChecker.js';
import { ImageConverterWorker } from './ImageConverter.js';

export const workers: Record<WorkerId, typeof BaseWorker> = {
	bcrypt_generator: BcryptGeneratorWorker,
	bcrypt_checker: BcryptCheckerWorker,
	image_converter: ImageConverterWorker
};
