import { WorkerArgs, WorkerId } from './workers';

export type TaskData<TWorkerId extends WorkerId> = {
	id: string;
	worker_id: TWorkerId;
	worker_data: WorkerArgs<TWorkerId>;
};
