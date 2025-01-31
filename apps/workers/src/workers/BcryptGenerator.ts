import { WorkerArgs, WorkerResponse } from '@zyrohub/toolkit';

import { BaseWorker, BaseWorkerProgress } from './Base';

export class BcryptGeneratorWorker extends BaseWorker {
	static async execute<T extends 'bcrypt_generator'>(
		data: WorkerArgs<T>,
		update_progress: BaseWorkerProgress
	): Promise<WorkerResponse<T>> {
		const rounds = data.rounds || 10;

		const hash = await Bun.password.hash(data.password, { algorithm: 'bcrypt', cost: rounds });

		return { hash };
	}
}
