import { ToolTagEnum, type ITool } from './types';

export const getToolList = (): ITool[] => {
	return [{ id: 'base64', icon: 'lucide:scan-text', tags: [ToolTagEnum.DEV] }];
};
