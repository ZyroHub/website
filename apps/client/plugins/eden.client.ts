import { treaty } from '@elysiajs/eden';
import type { App } from '@zyrohub/server';
import type { TaskProgress } from '~/shared/types';

export default defineNuxtPlugin(nuxtApp => {
	const runtimeConfig = nuxtApp.$config;

	const appStore = useAppStore();
	const appStoreRefs = storeToRefs(appStore);

	const tasksStore = useTasksStore();
	const tasksStoreRefs = storeToRefs(tasksStore);

	const listener = useListener();

	const eden = treaty<App>(runtimeConfig.public.server_url);

	let edenTasks = ref<ReturnType<typeof eden.tasks.index.subscribe>>();
	let edenTasksInterval = ref<ReturnType<typeof setInterval> | null>(null);

	let edenTasksRetries = 0;

	const handleOpen = (event: Event) => {
		edenTasksRetries = 0;
		appStoreRefs.connectionStatus.value = 'connected';

		edenTasks.value?.send({
			name: 'ping',
			content: {}
		});
	};

	const handleClose = (event: Event) => {
		console.log('close', event, edenTasksRetries);

		if (edenTasksRetries < 3) {
			edenTasksRetries++;

			setTimeout(() => {
				edenTasksConnect(true);
			}, 1_000);
		} else {
			appStoreRefs.connectionStatus.value = 'disconnected';
		}
	};

	appStoreRefs.connectionStatus.value = 'connecting';

	const edenTasksConnect = async (auto: boolean = false) => {
		appStoreRefs.connectionStatus.value = 'connecting';

		if (edenTasks.value) {
			edenTasks.value.off('open', handleOpen);
			edenTasks.value.off('close', handleClose);

			if (edenTasksInterval.value) {
				clearInterval(edenTasksInterval.value);
				edenTasksInterval.value = null;
			}

			edenTasks.value.close();
		}

		edenTasks.value = eden.tasks.index.subscribe();

		if (!auto) edenTasksRetries = 0;

		edenTasks.value.on('open', handleOpen);
		edenTasks.value.on('close', handleClose);

		edenTasksInterval.value = setInterval(() => {
			edenTasks.value?.send({
				name: 'ping',
				content: {}
			});
		}, 30_000);

		edenTasks.value.subscribe(event => {
			switch (event.data.name) {
				case 'task:start:error':
					const taskStartErrorData = event.data.content as { request_id: string; code: string };
					console.log('task-error', taskStartErrorData);
					const taskStartErrorTask = tasksStoreRefs.tasks.value.find(
						task => task.request_id === taskStartErrorData.request_id
					);

					if (taskStartErrorTask) {
						taskStartErrorTask.status = 'error';
						listener.emit('task:error', { task: taskStartErrorTask });
					}
					break;

				case 'task:queued':
					const taskQueuedData = event.data.content as {
						request_id: string;
						task_id: string;
						worker_id: string;
						position: number;
					};
					const taskQueuedTask = tasksStoreRefs.tasks.value.find(
						task => task.request_id === taskQueuedData.request_id
					);

					if (taskQueuedTask) {
						taskQueuedTask.id = taskQueuedData.task_id;
						taskQueuedTask.status = 'queued';
						taskQueuedTask.position = taskQueuedData.position;
						taskQueuedTask.initial_position = taskQueuedData.position;
						listener.emit('task:queued', { task: taskQueuedTask });
					}
					break;

				case 'queue:updated':
					const queueUpdatedData = event.data.content as { removed_position?: number };
					for (const task of tasksStoreRefs.tasks.value) {
						if (task.status === 'queued' && task.position) {
							if (queueUpdatedData.removed_position) {
								if (task.position > queueUpdatedData.removed_position) task.position--;
							} else task.position--;
						}
					}
					break;

				case 'task:started':
					const taskStartedData = event.data.content as { request_id: string; task_id: string };
					const taskStartedTask = tasksStoreRefs.tasks.value.find(
						task => task.id === taskStartedData.task_id
					);

					if (taskStartedTask) {
						taskStartedTask.status = 'running';
					}
					break;

				case 'task:progress':
					const taskProgressData = event.data.content as {
						request_id: string;
						task_id: string;
						progress: TaskProgress;
					};
					const taskProgressTask = tasksStoreRefs.tasks.value.find(
						task => task.id === taskProgressData.task_id
					);

					if (taskProgressTask) {
						taskProgressTask.progress = taskProgressData.progress;
					}
					break;

				case 'task:finished':
					const taskFinishedData = event.data.content as {
						request_id: string;
						task_id: string;
						data: any;
					};
					const taskFinishedTask = tasksStoreRefs.tasks.value.find(
						task => task.id === taskFinishedData.task_id
					);

					if (taskFinishedTask) {
						taskFinishedTask.status = 'finished';

						if (taskFinishedTask.options?.save_data !== false)
							taskFinishedTask.data = taskFinishedData.data;

						listener.emit('task:finished', { task: taskFinishedTask, data: taskFinishedData.data });
					}
					break;

				case 'task:error':
					const taskErrorData = event.data.content as {
						request_id: string;
						task_id: string;
						error?: string;
					};
					const taskErrorTask = tasksStoreRefs.tasks.value.find(task => task.id === taskErrorData.task_id);

					if (taskErrorTask) {
						taskErrorTask.status = 'error';
						taskErrorTask.error = taskErrorData.error || 'unknown-error';
						listener.emit('task:error', { task: taskErrorTask });
					}
					break;
			}
		});
	};

	nuxtApp.hook('app:mounted', () => {
		edenTasksConnect();
	});

	return {
		provide: {
			eden: eden,
			edenTasks: edenTasks,
			edenTasksConnect: edenTasksConnect
		}
	};
});
