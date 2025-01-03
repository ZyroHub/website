import bcrypt from 'bcrypt';
import { WorkerArgs } from '@zyrohub/toolkit';

import { BaseWorker } from './Base';

export class BcryptGeneratorWorker extends BaseWorker {
	static async execute(data?: WorkerArgs<'bcrypt_generator'>) {
		if (!data?.password) {
			throw new Error('password-required');
		}

		const rounds = data.rounds || 10;

		const salt = await bcrypt.genSalt(rounds);
		const hash = await bcrypt.hash(data.password, salt);

		return { hash };
	}
}
