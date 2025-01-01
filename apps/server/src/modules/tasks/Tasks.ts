import { Terminal } from '@zyrohub/toolkit';

import { BaseModule } from '../Base';
import { RedisModule } from '../Redis';

export class TasksModuleBase extends BaseModule {
	dependencies = [RedisModule];

	async init() {
		Terminal.success('TASKS', `Successfully initialized!`);
	}
}

export const TasksModule = new TasksModuleBase();
