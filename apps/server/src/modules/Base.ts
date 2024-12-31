import type { Core } from '@/core/Core';

export class BaseModule {
	dependencies: BaseModule[] = [];
	private static instances = new Map<string, BaseModule>();

	constructor(options: { dependencies?: BaseModule[] } = {}) {
		this.dependencies = options.dependencies || [];
	}

	async init(core: Core): Promise<any | void> {}
}
