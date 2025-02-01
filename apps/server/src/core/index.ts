import cluster from 'node:cluster';
import os from 'node:os';
import process from 'node:process';
import ansicolor from 'ansicolor';

import { Terminal } from '@zyrohub/toolkit';

import { ServerModule } from '@/modules/modules.js';
import { Core } from './Core.js';

if (cluster.isPrimary) {
	Terminal.success('CLUSTER', `Primary ${ansicolor.cyan(process.pid)} is running!`);

	const cpuCount = os.availableParallelism();

	for (let i = 0; i < cpuCount; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		Terminal.error(
			'CLUSTER',
			`Worker ${ansicolor.cyan(worker.process.pid)} died with code: ${ansicolor.yellow(
				code
			)}, and signal: ${ansicolor.red(signal)}`
		);
	});
} else {
	Terminal.success('CLUSTER', `Worker ${ansicolor.cyan(process.pid)} started!`);

	const core = new Core();

	core.init();
}

export type App = (typeof ServerModule)['server'];
