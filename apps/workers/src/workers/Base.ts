export type BaseWorkerProgress = (percentage: number, message?: string) => Promise<void>;

export class BaseWorker {
	static async execute(data: any, update_progress: BaseWorkerProgress): Promise<any | void> {}
}
