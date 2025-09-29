import { ClusteredCore } from '@zyrohub/core';

import { MessengerModule, RedisModule, ServerModule, TasksModule } from './modules/index.js';

const core = new ClusteredCore({
	core: {
		modules: [RedisModule, MessengerModule, TasksModule, ServerModule]
	}
});

core.init();

export const coreInstance = core;
export type App = ServerModule['server'];
