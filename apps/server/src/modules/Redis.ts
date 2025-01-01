import { Terminal } from '@zyrohub/toolkit';

import { BaseModule } from './Base';
import Redis from 'ioredis';

export class RedisModuleBase extends BaseModule {
	instance?: Redis;
	dependencies = [];

	async init() {
		this.instance = new Redis({
			db: Number(process.env.REDIS_DB),
			host: process.env.REDIS_HOST,
			port: Number(process.env.REDIS_PORT),
			username: process.env.REDIS_USERNAME,
			password: process.env.REDIS_PASSWORD,
			lazyConnect: true
		});

		this.instance.on('connect', () => {
			Terminal.success('REDIS', 'Successfully connected to Redis');
		});

		this.instance.on('error', err => {
			Terminal.error('REDIS', ['Error on connect', err]);
		});

		this.instance.connect();
	}
}

export const RedisModule = new RedisModuleBase();
