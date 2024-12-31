export class ServerError {
	public success = false;

	constructor(
		public status: number,
		public code: string = 'unknown',
		public data: any = {}
	) {}

	public toJSON() {
		return {
			success: this.success,
			code: this.code,
			data: this.data
		};
	}
}
