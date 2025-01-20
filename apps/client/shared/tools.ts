import { ToolTagEnum, type ITool } from './types';

export const getToolList = (): ITool[] => {
	return [
		{
			id: 'base64_text',
			icon: 'lucide:scan-text',
			related: ['base64_image'],
			tags: [ToolTagEnum.DEV, ToolTagEnum.CONVERTER, ToolTagEnum.TEXT]
		},
		{
			id: 'base64_image',
			icon: 'material-symbols:image',
			related: ['base64_text'],
			tags: [ToolTagEnum.DEV, ToolTagEnum.CONVERTER, ToolTagEnum.IMAGE]
		},
		{
			id: 'bcrypt_generator',
			icon: 'mdi:password',
			related: ['bcrypt_checker'],
			tags: [ToolTagEnum.DEV, ToolTagEnum.CRYPTO, ToolTagEnum.GENERATOR, ToolTagEnum.PASSWORD, ToolTagEnum.HASH],
			needs_connection: true
		},
		{
			id: 'bcrypt_checker',
			icon: 'mdi:password',
			related: ['bcrypt_generator'],
			tags: [ToolTagEnum.DEV, ToolTagEnum.CRYPTO, ToolTagEnum.VALIDATOR, ToolTagEnum.PASSWORD, ToolTagEnum.HASH],
			needs_connection: true
		},
		{
			id: 'image_converter',
			icon: 'mdi:image',
			related: [],
			tags: [ToolTagEnum.CREATORS, ToolTagEnum.CONVERTER, ToolTagEnum.IMAGE],
			needs_connection: true
		}
	];
};
