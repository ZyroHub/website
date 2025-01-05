import type { WorkerId } from '@zyrohub/toolkit';
import type { Task } from '~/shared/types';

export interface Listeners<T extends WorkerId = any> {
	'task:queued': { task: Task<T> };
	'task:finished': { task: Task<T> };
	'task:error': { task: Task<T> };
}
