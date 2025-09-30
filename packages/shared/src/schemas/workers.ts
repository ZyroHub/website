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
	hash_generator: {
		args: z.object({
			text: z.string().min(1).max(2048),
			algorithm: z.enum([
				'md4',
				'md5',

				'sha1',
				'sha224',
				'sha256',
				'sha384',
				'sha512',
				'sha512-224',
				'sha512-256',
				'sha3-224',
				'sha3-256',
				'sha3-384',
				'sha3-512'
			])
		}),
		response: z.object({
			hash: z.string()
		}),
		storage: z.object({}),
		errors: [] as string[]
	},
	image_converter: {
		args: z.object({
			image: z.string(),
			animated: z.boolean().optional(),
			format: z.enum(['webp', 'png', 'jpeg', 'jpg'])
		}),
		response: z.object({
			converted_image: z.any()
		}),
		storage: z.object({
			name: z.string(),
			image_url: z.string(),
			converted_image_format: z.enum(['webp', 'png', 'jpeg', 'jpg']),
			converted_image_url: z.string().optional()
		}),
		errors: ['invalid-file-type'] as string[]
	},
	image_pixelate: {
		args: z.object({
			image: z.string(),
			size: z.number().min(1).max(64),
			quantization: z.boolean().optional(),
			quantization_count: z.number().min(2).max(128),
			dithering: z.boolean().optional()
		}),
		response: z.object({
			pixelated_image: z.any()
		}),
		storage: z.object({
			name: z.string(),
			pixelated_image_url: z.string().optional()
		}),
		errors: ['invalid-file-type', 'quantization'] as string[]
	},
	url_shortener: {
		args: z.object({
			url: z.string().url().min(1).max(2048)
		}),
		response: z.object({
			code: z.string()
		}),
		storage: z.object({}),
		errors: [] as string[]
	}
};

export type WorkerId = keyof typeof workersSchemas;
export const workersIds = Object.keys(workersSchemas) as WorkerId[];

export type WorkerArgs<T extends WorkerId> = z.infer<(typeof workersSchemas)[T]['args']>;
export type WorkerResponse<T extends WorkerId> = z.infer<(typeof workersSchemas)[T]['response']>;
export type WorkerStorage<T extends WorkerId> = z.infer<(typeof workersSchemas)[T]['storage']>;
