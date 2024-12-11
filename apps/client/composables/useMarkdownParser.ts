import { createMarkdownParser } from '@nuxtjs/mdc/runtime';

export default function useMarkdownParser() {
	let parser: Awaited<ReturnType<typeof createMarkdownParser>>;

	const parse = async (markdown: string) => {
		if (!parser) {
			parser = await createMarkdownParser({});
		}

		return parser(markdown);
	};

	return parse;
}
