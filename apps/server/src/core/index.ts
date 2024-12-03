import cluster from 'cluster';
import os from 'os';
import process from 'process';

import { Core } from './Core';

if (cluster.isPrimary) {
	// console.log(`[CLUSTER] Primary ${process.pid} is running!`);

	const cpuCount = os.availableParallelism();

	for (let i = 0; i < cpuCount; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`[CLUSTER] Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
	});
} else {
	console.log(`[CLUSTER] Worker ${process.pid} started!`);

	const core = new Core();

	core.init();
}
