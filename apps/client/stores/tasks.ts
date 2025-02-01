import type { Task } from '~/shared/types';

export const useTasksStore = defineStore('tasks', () => {
	const tasks = ref<Task<any>[]>([]);

	return { tasks };
});
