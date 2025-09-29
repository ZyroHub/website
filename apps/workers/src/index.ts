import { ClusteredCore } from '@zyrohub/core';

import { MessengerModule, RedisModule, TasksModule } from './modules/index.js';

const core = new ClusteredCore({
	core: {
		modules: [RedisModule, MessengerModule, TasksModule]
	}
});

core.init();
