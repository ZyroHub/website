import { WorkerId } from '@zyrohub/shared';

import { BaseWorker } from './Base.js';
import { BcryptCheckerWorker } from './BcryptChecker.js';
import { BcryptGeneratorWorker } from './BcryptGenerator.js';
import { HashGeneratorWorker } from './HashGenerator.js';
import { ImageConverterWorker } from './ImageConverter.js';
import { ImagePixelateWorker } from './ImagePixelate.js';
import { UrlShortenerWorker } from './UrlShortener.js';

export const workers: Record<WorkerId, typeof BaseWorker> = {
	bcrypt_generator: BcryptGeneratorWorker,
	bcrypt_checker: BcryptCheckerWorker,
	hash_generator: HashGeneratorWorker,
	image_converter: ImageConverterWorker,
	image_pixelate: ImagePixelateWorker,
	url_shortener: UrlShortenerWorker
};
