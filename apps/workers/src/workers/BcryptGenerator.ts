import bcrypt from 'bcrypt';
import { WorkerArgs, WorkerResponse } from '@zyrohub/toolkit';

import { BaseWorker, BaseWorkerProgress } from './Base';

export class BcryptGeneratorWorker extends BaseWorker {
	static async execute<T extends 'bcrypt_generator'>(
		data: WorkerArgs<T>,
		update_progress?: BaseWorkerProgress
	): Promise<WorkerResponse<T>> {
		const rounds = data.rounds || 10;

		const salt = await bcrypt.genSalt(rounds);
		await new Promise(resolve => setTimeout(resolve, Math.random() * 5000));
		const hash = await bcrypt.hash(data.password, salt);

		return { hash };
	}
}
