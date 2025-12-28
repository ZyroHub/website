import type { WorkerId, WorkerResponse } from '@zyrohub/shared';
import type { Task } from '~~/shared/types';

export interface Listeners<T extends WorkerId = any> {
	'task:queued': { task: Task<T> };
	'task:finished': { task: Task<T>; data: WorkerResponse<T> };
	'task:error': { task: Task<T> };
}

export type PlacementSide = 'top' | 'right' | 'bottom' | 'left';
export type PlacementAlignment = 'start' | 'end';

export type Placement = PlacementSide | `${PlacementSide}-${PlacementAlignment}`;
