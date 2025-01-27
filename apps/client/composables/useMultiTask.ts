import type { WorkerArgs, WorkerId, WorkerStorage } from '@zyrohub/toolkit';
import type { Task } from '~/shared/types';

export interface UseMultiTaskOptions<T> {
	worker_id: T;
	task_save_data?: boolean;
}

export const useMultiTask = <T extends WorkerId>(options: UseMultiTaskOptions<T>) => {
	const { $socket } = useNuxtApp();

	const tasksStore = useTasksStore();
	const tasksStoreRefs = storeToRefs(tasksStore);

	const listener = useListener();

	const tasks = computed<Task<T>[]>(() =>
		tasksStoreRefs.tasks.value.filter(task => task.worker_id === options.worker_id)
	);

	const get = (task_id?: string) => tasks.value.find(task => task.id === task_id || task.request_id === task_id);

	const start = async (data: WorkerArgs<T>, storage?: WorkerStorage<T>) => {
		const requestId = `${Date.now().toString()}-${Math.random().toString().slice(2)}`;

		tasksStoreRefs.tasks.value.push({
			request_id: requestId,
			worker_id: options.worker_id,
			status: 'pending',
			progress: { percentage: 0 },
			storage: storage,
			options: {
				save_data: options.task_save_data !== false
			},
			created_at: new Date()
		});

		$socket.emit('task:start', {
			request_id: requestId,
			worker_id: options.worker_id,
			worker_data: data
		});
	};

	const cancel = (task_id: string) => {
		const task = tasks.value.find(task => task.id === task_id || task.request_id === task_id);
		if (!task) return;

		if (!['pending', 'finished', 'error'].includes(task.status)) {
			const requestId = Date.now().toString();

			$socket.emit('task:cancel', { request_id: requestId, task_id: task.id });
		}

		tasksStoreRefs.tasks.value.splice(
			tasksStoreRefs.tasks.value.findIndex(task => task.id === task_id || task.request_id === task_id),
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

		get,

		start,
		cancel,

		onTaskQueued,
		onTaskFinished,
		onTaskError
	};
};
