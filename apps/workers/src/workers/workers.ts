import { WorkerId } from '@zyrohub/toolkit';

import { BaseWorker } from './Base';

import { BcryptGeneratorWorker } from './BcryptGenerator';
import { BcryptCheckerWorker } from './BcryptChecker';
import { ImageConverterWorker } from './ImageConverter';

export const workers: Record<WorkerId, typeof BaseWorker> = {
	bcrypt_generator: BcryptGeneratorWorker,
	bcrypt_checker: BcryptCheckerWorker,
	image_converter: ImageConverterWorker
};
