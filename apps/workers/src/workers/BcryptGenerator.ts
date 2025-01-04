import bcrypt from 'bcrypt';
import { WorkerArgs } from '@zyrohub/toolkit';

import { BaseWorker, BaseWorkerProgress } from './Base';

export class BcryptGeneratorWorker extends BaseWorker {
	static async execute(data: WorkerArgs<'bcrypt_generator'>, update_progress?: BaseWorkerProgress): Promise<any> {
		const rounds = data.rounds || 10;

		const salt = await bcrypt.genSalt(rounds);
		const hash = await bcrypt.hash(data.password, salt);

		return { hash };
	}
}
