export class Utilities {
	static getFileFromSocketData(socket_data: { type: string; data: number[] }): Buffer {
		if (socket_data.type !== 'Buffer') throw new Error('invalid-socket-data-type');

		return Buffer.from(socket_data.data);
	}
}
