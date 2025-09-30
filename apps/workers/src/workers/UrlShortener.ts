import { prisma } from '@zyrohub/database';
import { Utilities, WorkerArgs, WorkerResponse } from '@zyrohub/shared';

import { BaseWorker, BaseWorkerProgress } from './Base.js';

export class UrlShortenerWorker extends BaseWorker {
	static async execute<T extends 'url_shortener'>(
		data: WorkerArgs<T>,
		update_progress: BaseWorkerProgress
	): Promise<WorkerResponse<T>> {
		const url = data.url;

		const code = Utilities.encodeSqids([Date.now()]);

		await prisma.link.create({
			data: {
				code: code,
				target: url
			}
		});

		return { code: code };
	}
}
