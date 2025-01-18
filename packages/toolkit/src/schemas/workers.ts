import { z } from 'zod';

export const workersSchemas = {
	bcrypt_generator: {
		args: z.object({
			password: z.string().min(1).max(100),
			rounds: z.number().min(1).max(15)
		}),
		response: z.object({
			hash: z.string()
		}),
		errors: [] as string[]
	},
	bcrypt_checker: {
		args: z.object({
			password: z.string().min(1).max(100),
			hash: z.string().min(1).max(100)
		}),
		response: z.object({
			is_valid: z.boolean()
		}),
		errors: [] as string[]
	}
};

export type WorkerId = keyof typeof workersSchemas;
export const workersIds = Object.keys(workersSchemas) as WorkerId[];

export type WorkerArgs<T extends WorkerId> = z.infer<(typeof workersSchemas)[T]['args']>;
export type WorkerResponse<T extends WorkerId> = z.infer<(typeof workersSchemas)[T]['response']>;
