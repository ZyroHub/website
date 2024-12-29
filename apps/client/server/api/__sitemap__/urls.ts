import { defineSitemapEventHandler } from '#imports';

import type { SitemapUrlInput } from '#sitemap/types';
import { getToolList } from '~/shared/tools';
import { ToolTagEnum } from '~/shared/types';

export default defineSitemapEventHandler(() => {
	const urls: SitemapUrlInput[] = [];
	const tools = getToolList();

	urls.push(
		...tools
			.filter(tool => tool.tags.includes(ToolTagEnum.DEV))
			.map(tool => ({
				loc: `/developers/${tool.id}`,
				_i18nTransform: true
			}))
	);
	urls.push(
		...tools
			.filter(tool => tool.tags.includes(ToolTagEnum.CREATORS))
			.map(tool => ({
				loc: `/creators/${tool.id}`,
				_i18nTransform: true
			}))
	);
	urls.push(
		...tools
			.filter(tool => tool.tags.includes(ToolTagEnum.MISC))
			.map(tool => ({
				loc: `/misc/${tool.id}`,
				_i18nTransform: true
			}))
	);

	return urls;
});
