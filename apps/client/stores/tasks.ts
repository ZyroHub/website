import type { Task } from '~/shared/types';

export const useTasksStore = defineStore('tasks', () => {
	const { $socket } = useNuxtApp();

	const listener = useListener();

	const tasks = ref<Task<any>[]>([]);

	$socket.on('task:start:error', (data: { request_id: string; code: string }) => {
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
		}
	});

	$socket.on('queue:updated', (data: {}) => {
		for (const task of tasks.value) {
			if (task.status === 'queued') {
				if (task.position) task.position--;
			}
		}
	});

	$socket.on('task:started', (data: { request_id: string; task_id: string }) => {
		const task = tasks.value.find(task => task.id === data.task_id);

		if (task) {
			task.status = 'running';
		}
	});

	$socket.on('task:progress', (data: { request_id: string; task_id: string; progress: number }) => {
		const task = tasks.value.find(task => task.id === data.task_id);

		if (task) {
			task.progress = data.progress;
		}
	});

	$socket.on('task:finished', (data: { request_id: string; task_id: string; data: any }) => {
		const task = tasks.value.find(task => task.id === data.task_id);

		if (task) {
			task.status = 'finished';
			task.data = data.data;

			listener.emit('task:finished', { task });
		}
	});

	$socket.on('task:error', (data: { request_id: string; task_id: string }) => {
		const task = tasks.value.find(task => task.id === data.task_id);

		if (task) {
			task.status = 'error';

			listener.emit('task:error', { task });
		}
	});

	return { tasks };
});
