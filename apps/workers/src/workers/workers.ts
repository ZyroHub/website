import { WorkerId } from '@zyrohub/toolkit';

import { BaseWorker } from './Base';

import { BcryptGeneratorWorker } from './BcryptGenerator';

export const workers: Record<WorkerId, typeof BaseWorker> = {
	bcrypt_generator: BcryptGeneratorWorker
};
