import Sqids from 'sqids';

import * as config from '../config/index.js';

export class Utilities {
	static sqids = new Sqids({
		alphabet: config.misc.sqidsAlphabet
	});

	static encodeSqids(numbers: number[]) {
		return this.sqids.encode(numbers);
	}

	static decodeSqids(identifier: string) {
		return this.sqids.decode(identifier);
	}
}
