import type { WorkerArgs, WorkerId } from '@zyrohub/toolkit';
import type { Task } from '~/shared/types';

export interface UseMultiTaskOptions<T> {
	worker_id: T;
}

export const useMultiTask = <T extends WorkerId>(options: UseTaskOptions<T>) => {
	const { $socket } = useNuxtApp();

	const tasksStore = useTasksStore();
	const tasksStoreRefs = storeToRefs(tasksStore);

	const listener = useListener();

	const tasks = computed<Task<T>[]>(() =>
		tasksStoreRefs.tasks.value.filter(task => task.worker_id === options.worker_id)
	);

	const start = (data: WorkerArgs<T>) => {
		const requestId = Date.now().toString();

		tasksStoreRefs.tasks.value.push({
			request_id: requestId,
			worker_id: options.worker_id,
			status: 'pending',
			progress: { percentage: 0 }
		});

		$socket.emit('task:start', { request_id: requestId, worker_id: options.worker_id, worker_data: data });
	};

	const cancel = (task_id: string) => {
		const task = tasks.value.find(task => task.id === task_id);
		if (!task) return;

		const requestId = Date.now().toString();

		if (task.status !== 'pending') $socket.emit('task:cancel', { request_id: requestId, task_id: task.id });

		tasksStoreRefs.tasks.value.splice(
			tasksStoreRefs.tasks.value.findIndex(task => task.id === task_id),
			1
		);
	};

	const onTaskQueued = (callback: (data: Listeners<T>['task:queued']) => void) => {
		listener.listen('task:queued', listener_data => {
			if (listener_data.task.worker_id !== options.worker_id) return;

			callback(listener_data);
		});
	};

	const onTaskFinished = (callback: (data: Listeners<T>['task:finished']) => void) => {
		listener.listen('task:finished', listener_data => {
			if (listener_data.task.worker_id !== options.worker_id) return;

			callback(listener_data);
		});
	};

	const onTaskError = (callback: (data: Listeners<T>['task:error']) => void) => {
		listener.listen('task:error', listener_data => {
			if (listener_data.task.worker_id !== options.worker_id) return;

			callback(listener_data);
		});
	};

	return {
		tasks,
		worker_id: options.worker_id,

		start,
		cancel,

		onTaskQueued,
		onTaskFinished,
		onTaskError
	};
};
