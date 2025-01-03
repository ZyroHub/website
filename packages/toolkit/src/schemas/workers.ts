import { z } from 'zod';

export const workersSchemas = {
	bcrypt_generator: {
		args: z.object({
			password: z.string().min(1).max(100),
			rounds: z.number().min(1).max(15)
		})
	}
};

export type WorkerId = keyof typeof workersSchemas;
export const workersIds = Object.keys(workersSchemas) as WorkerId[];

export type WorkerArgs<T extends WorkerId> = z.infer<(typeof workersSchemas)[T]['args']>;
