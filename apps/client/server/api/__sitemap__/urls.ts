import { defineSitemapEventHandler } from '#imports';

import type { SitemapUrlInput } from '#sitemap/types';
import { getToolList } from '~/shared/tools';

export default defineSitemapEventHandler(() => {
	const urls: SitemapUrlInput[] = [];
	const tools = getToolList();

	urls.push(
		...tools
			.filter(tool => tool.tags.includes(0))
			.map(tool => ({
				loc: `/developers/${tool.id}`,
				_i18nTransform: true
			}))
	);
	urls.push(
		...tools
			.filter(tool => tool.tags.includes(1))
			.map(tool => ({
				loc: `/creators/${tool.id}`,
				_i18nTransform: true
			}))
	);

	return urls;
});
