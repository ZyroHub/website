import { Utilities, WorkerArgs, WorkerResponse } from '@zyrohub/toolkit';
import { prisma } from '@zyrohub/database';

import { BaseWorker, BaseWorkerProgress } from './Base.js';

export class UrlShortenerWorker extends BaseWorker {
	static async execute<T extends 'url_shortener'>(
		data: WorkerArgs<T>,
		update_progress: BaseWorkerProgress
	): Promise<WorkerResponse<T>> {
		const url = data.url;

		const code = Utilities.encodeSqids([Date.now()]);

		const link = await prisma.link.create({
			data: {
				code: code,
				target: url
			}
		});

		return { id: link.id, code: code };
	}
}
