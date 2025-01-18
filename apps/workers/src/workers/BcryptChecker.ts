import bcrypt from 'bcrypt';
import { WorkerArgs, WorkerResponse } from '@zyrohub/toolkit';

import { BaseWorker, BaseWorkerProgress } from './Base';

export class BcryptCheckerWorker extends BaseWorker {
	static async execute<T extends 'bcrypt_checker'>(
		data: WorkerArgs<T>,
		update_progress: BaseWorkerProgress
	): Promise<WorkerResponse<T>> {
		const password = data.password;
		const hash = data.hash;

		const isValid = await bcrypt.compare(password, hash);

		return { is_valid: isValid };
	}
}
