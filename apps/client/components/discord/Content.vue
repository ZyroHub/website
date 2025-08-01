<script lang="ts" setup>
import MarkdownIt from 'markdown-it';
import { twMerge } from 'tailwind-merge';
import twemoji from 'twemoji';

const props = defineProps<{
	content: string;
	disableMarkdown?: boolean;
	innerClass?: string;
}>();

const contentMdIt = new MarkdownIt({
	html: false,
	linkify: true,
	breaks: true,
	typographer: false
});

const parseDiscordEmojis = (html: string) => {
	return html.replace(
		/&lt;(a?):([a-zA-Z0-9_]+):(\d+)&gt;|<(a?):([a-zA-Z0-9_]+):(\d+)>/g,
		(match, animated1, name1, id1, animated2, name2, id2) => {
			const animated = animated1 || animated2;
			const name = name1 || name2;
			const id = id1 || id2;
			const ext = animated === 'a' ? 'gif' : 'webp';
			const src = `https://cdn.discordapp.com/emojis/${id}.${ext}`;
			const alt = `:${name}:`;

			return `<img src="${src}" alt="${alt}" class="emoji discord-custom-emoji" loading="lazy" />`;
		}
	);
};

const parseContent = (content: string) => {
	let parsedContent = content;

	if (!props.disableMarkdown) {
		parsedContent = contentMdIt.render(parsedContent);
	}

	parsedContent = twemoji.parse(parsedContent, {
		folder: 'svg',
		className: 'discord-emoji',
		ext: '.svg'
	});

	parsedContent = parseDiscordEmojis(parsedContent);

	return parsedContent;
};

const parsedMessage = computed(() => parseContent(props.content));
</script>

<style lang="scss">
.discord-emoji {
	height: 1em;
	width: 1em;
}

.discord-custom-emoji {
	height: 0.9em;
	width: 0.9em;
}
</style>

<template>
	<div>
		<div v-html="parsedMessage" :class="twMerge('break-words', props.innerClass)" />
	</div>
</template>
