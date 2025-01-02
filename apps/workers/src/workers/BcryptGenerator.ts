import { BaseWorker } from './Base';

export class BcryptGeneratorWorker extends BaseWorker {
	static async execute(data?: any) {
		console.log('BcryptWorker executed');
	}
}
