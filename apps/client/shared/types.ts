import type { WorkerId, WorkerResponse, WorkerStorage } from '@zyrohub/toolkit';

export enum ToolTagEnum {
	DEV,
	CREATORS,
	MISC,

	TEXT,
	IMAGE,
	VIDEO,
	AUDIO,

	CRYPTO,

	EDITOR,
	ENCODER,
	DECODER,
	CONVERTER,
	VALIDATOR,
	GENERATOR,

	COMPRESSION,
	DECOMPRESSION,

	COLOR,
	DATE,

	PASSWORD,
	HASH
}

export type ToolTagType = keyof typeof ToolTagEnum;
export const ToolTagsId = Object.keys(ToolTagEnum) as ToolTagType[];

export interface ITool {
	id: string;
	icon: string;
	related?: string[];
	tags: ToolTagEnum[];
	needs_connection?: boolean;
}

export type TaskStatus = 'pending' | 'queued' | 'running' | 'finished' | 'error';

export interface TaskProgress {
	percentage: number;
	message?: string;
}

export interface TaskOptions {
	save_data?: boolean;
}

export interface Task<T extends WorkerId> {
	id?: string;
	request_id: string;
	worker_id: T;
	status: TaskStatus;
	error?: string;
	progress: TaskProgress;
	position?: number;
	initial_position?: number;
	data?: WorkerResponse<T>;
	storage?: WorkerStorage<T>;
	options?: TaskOptions;
	created_at: Date;
}
