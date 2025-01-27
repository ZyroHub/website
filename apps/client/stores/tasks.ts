import type { Task, TaskProgress } from '~/shared/types';

export const useTasksStore = defineStore('tasks', () => {
	const { $socket } = useNuxtApp();

	const listener = useListener();

	const tasks = ref<Task<any>[]>([]);

	$socket.on('task:start:error', (data: { request_id: string; code: string }) => {
		console.log('task-error', data);
		const task = tasks.value.find(task => task.request_id === data.request_id);

		if (task) {
			task.status = 'error';

			listener.emit('task:error', { task });
		}
	});

	$socket.on('task:queued', (data: { request_id: string; task_id: string; worker_id: string; position: number }) => {
		const task = tasks.value.find(task => task.request_id === data.request_id);

		if (task) {
			task.id = data.task_id;
			task.status = 'queued';
			task.position = data.position;
			task.initial_position = data.position;

			listener.emit('task:queued', { task });
		}
	});

	$socket.on('queue:updated', (data: { removed_position?: number }) => {
		for (const task of tasks.value) {
			if (task.status === 'queued' && task.position) {
				if (data.removed_position) {
					if (task.position > data.removed_position) task.position--;
				} else task.position--;
			}
		}
	});

	$socket.on('task:started', (data: { request_id: string; task_id: string }) => {
		const task = tasks.value.find(task => task.id === data.task_id);

		if (task) {
			task.status = 'running';
		}
	});

	$socket.on('task:progress', (data: { request_id: string; task_id: string; progress: TaskProgress }) => {
		const task = tasks.value.find(task => task.id === data.task_id);

		if (task) {
			task.progress = data.progress;
		}
	});

	$socket.on('task:finished', (data: { request_id: string; task_id: string; data: any }) => {
		const task = tasks.value.find(task => task.id === data.task_id);

		if (task) {
			task.status = 'finished';

			if (task.options?.save_data !== false) task.data = data.data;

			listener.emit('task:finished', { task, data: data.data });
		}
	});

	$socket.on('task:error', (data: { request_id: string; task_id: string; error?: string }) => {
		const task = tasks.value.find(task => task.id === data.task_id);

		if (task) {
			task.status = 'error';
			task.error = data.error || 'unknown-error';

			listener.emit('task:error', { task });
		}
	});

	return { tasks };
});
