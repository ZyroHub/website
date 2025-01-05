import type { WorkerArgs, WorkerId } from '@zyrohub/toolkit';
import type { Task } from '~/shared/types';

export interface UseTaskOptions<T> {
	worker_id: T;
}

export const useTask = <T extends WorkerId>(options: UseTaskOptions<T>) => {
	const { $socket } = useNuxtApp();

	const tasksStore = useTasksStore();
	const tasksStoreRefs = storeToRefs(tasksStore);

	const listener = useListener();

	const task = computed(
		() => tasksStoreRefs.tasks.value.find(task => task.worker_id === options.worker_id) as Task<T> | undefined
	);

	const start = (data: WorkerArgs<T>) => {
		const requestId = Date.now().toString();

		if (task.value) {
			if (['pending', 'queued', 'running'].includes(task.value.status)) return;
			tasksStoreRefs.tasks.value.splice(
				tasksStoreRefs.tasks.value.findIndex(task => task.worker_id === options.worker_id),
				1
			);
		}

		tasksStoreRefs.tasks.value.push({
			request_id: requestId,
			worker_id: options.worker_id,
			status: 'pending',
			progress: 0
		});
		$socket.emit('task:start', { request_id: requestId, worker_id: options.worker_id, worker_data: data });
	};

	const cancel = () => {
		if (!task.value) return;
		if (['pending', 'queued', 'running'].includes(task.value.status)) return;

		const requestId = Date.now().toString();

		if (task.value.status !== 'pending')
			$socket.emit('task:cancel', { request_id: requestId, task_id: task.value.id });

		tasksStoreRefs.tasks.value.splice(
			tasksStoreRefs.tasks.value.findIndex(task => task.worker_id === options.worker_id),
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

	listener.listen('task:finished', listener_data => {
		if (listener_data.task.worker_id !== options.worker_id) return;

		tasksStoreRefs.tasks.value.splice(
			tasksStoreRefs.tasks.value.findIndex(task => task.worker_id === options.worker_id),
			1
		);
	});

	listener.listen('task:error', listener_data => {
		if (listener_data.task.worker_id !== options.worker_id) return;

		tasksStoreRefs.tasks.value.splice(
			tasksStoreRefs.tasks.value.findIndex(task => task.worker_id === options.worker_id),
			1
		);
	});

	return {
		task,
		worker_id: options.worker_id,

		start,
		cancel,

		onTaskQueued,
		onTaskFinished,
		onTaskError
	};
};
