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
		storage: z.object({}),
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
		storage: z.object({}),
		errors: [] as string[]
	},
	image_converter: {
		args: z.object({
			image: z.instanceof(Buffer),
			format: z.enum(['webp', 'png', 'jpeg', 'jpg'])
		}),
		response: z.object({
			converted_image: z.instanceof(Buffer)
		}),
		storage: z.object({
			name: z.string(),
			image_url: z.string(),
			converted_image_format: z.enum(['webp', 'png', 'jpeg', 'jpg']),
			converted_image_url: z.string().optional()
		}),
		errors: ['invalid-file-type'] as string[]
	}
};

export type WorkerId = keyof typeof workersSchemas;
export const workersIds = Object.keys(workersSchemas) as WorkerId[];

export type WorkerArgs<T extends WorkerId> = z.infer<(typeof workersSchemas)[T]['args']>;
export type WorkerResponse<T extends WorkerId> = z.infer<(typeof workersSchemas)[T]['response']>;
export type WorkerStorage<T extends WorkerId> = z.infer<(typeof workersSchemas)[T]['storage']>;
