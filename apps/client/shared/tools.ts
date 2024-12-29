import { ToolTagEnum, type ITool } from './types';

export const getToolList = (): ITool[] => {
	return [
		{ id: 'base64_text', icon: 'lucide:scan-text', tags: [ToolTagEnum.DEV] },
		{ id: 'base64_image', icon: 'material-symbols:image', tags: [ToolTagEnum.DEV] },
		{ id: 'bcrypt_generator', icon: 'mdi:password', tags: [ToolTagEnum.DEV] }
	];
};
