import { Terminal } from '@zyrohub/toolkit';

import * as modules from '@/modules/modules';
import type { BaseModule } from '@/modules/Base';

export class Core {
	private async initModules() {
		const sortedModules = (Object.values(modules) as BaseModule[]).sort((a, b) => {
			if (a.dependencies?.includes(b)) return 1;
			if (b.dependencies?.includes(a)) return -1;

			return 0;
		});

		for (const module of sortedModules) {
			await module.init?.(this);
		}
	}

	async init() {
		await this.initModules();

		Terminal.success('CORE', 'Successfully initialized!');
	}
}
