export type BaseWorkerProgress = (progress: number) => void;

export class BaseWorker {
	static async execute(data?: any, update_progress?: BaseWorkerProgress): Promise<any | void> {}
}
