import { WorkerArgs, WorkerResponse } from '@zyrohub/toolkit';

import { BaseWorker, BaseWorkerProgress } from './Base.js';

export class HashGeneratorWorker extends BaseWorker {
	static async execute<T extends 'hash_generator'>(
		data: WorkerArgs<T>,
		update_progress: BaseWorkerProgress
	): Promise<WorkerResponse<T>> {
		const text = data.text;
		const algorithm = data.algorithm;

		if (
			[
				'md4',
				'md5',
				'sha1',
				'sha224',
				'sha256',
				'sha384',
				'sha512',
				'sha512-224',
				'sha512-256',
				'sha3-224',
				'sha3-256',
				'sha3-384',
				'sha3-512'
			].includes(algorithm)
		) {
			const hasher = new Bun.CryptoHasher(algorithm);
			hasher.update(text);

			const hash = hasher.digest('hex');
			return { hash };
		}

		return { hash: '' };
	}
}
