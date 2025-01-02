import { BaseWorker } from './Base';
import { BcryptGeneratorWorker } from './BcryptGenerator';

export const workers: Record<string, typeof BaseWorker> = {
	bcrypt_generator: BcryptGeneratorWorker
};
