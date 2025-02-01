import type { Core } from '@/core/Core.js';

export class BaseModule {
	dependencies: BaseModule[] = [];
	private static instances = new Map<string, BaseModule>();

	constructor(options: { dependencies?: BaseModule[] } = {}) {
		this.dependencies = options.dependencies || [];
	}

	async init(core: Core): Promise<any | void> {}
}
