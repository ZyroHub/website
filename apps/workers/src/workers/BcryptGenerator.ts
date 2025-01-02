import bcrypt from 'bcrypt';

import { BaseWorker } from './Base';

export class BcryptGeneratorWorker extends BaseWorker {
	static async execute(data?: { password?: string; rounds?: number }) {
		if (!data?.password) {
			throw new Error('password-required');
		}

		const rounds = data.rounds || 10;

		const salt = await bcrypt.genSalt(rounds);
		const hash = await bcrypt.hash(data.password, salt);

		return { hash };
	}
}
