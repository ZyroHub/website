import cluster from 'cluster';
import os from 'os';
import process from 'process';

import { Core } from './Core';
import { Terminal } from '@zyrohub/toolkit';
import ansicolor from 'ansicolor';

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
