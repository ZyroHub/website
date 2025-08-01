<script lang="ts" setup>
import MarkdownIt from 'markdown-it';
import { twMerge } from 'tailwind-merge';
import twemoji from 'twemoji';
import DOMPurify from 'isomorphic-dompurify';

const props = defineProps<{
	content: string;
	disableMarkdown?: boolean;
	innerClass?: string;
}>();

const contentMdIt = new MarkdownIt({
	html: true,
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

const parseDiscordMarkdown = (text: string) => {
	return text
		.replace(/__(.*?)__/g, '<u class="underline">$1</u>') // Underline
		.replace(/~~(.*?)~~/g, '<s class="line-through">$1</s>') // Strikethrough
		.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>') // Bold
		.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>'); // Italic
};

const parseDiscordMentions = (text: string) => {
	return text
		.replace(/&lt;@!?(\d+)&gt;/g, '<span class="discord-mention">@user</span>')
		.replace(/&lt;#(\d+)&gt;/g, '<span class="discord-mention">#channel</span>')
		.replace(/&lt;@&amp;(\d+)&gt;/g, '<span class="discord-mention">@role</span>')
		.replace(/@everyone/g, '<span class="discord-mention">@everyone</span>')
		.replace(/@here/g, '<span class="discord-mention">@here</span>');
};

const escapeHtml = (html: string) => {
	return html
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
};

const parseContent = (content: string) => {
	let parsedContent = content;

	parsedContent = escapeHtml(parsedContent);

	if (!props.disableMarkdown) {
		parsedContent = parseDiscordMarkdown(parsedContent);
		parsedContent = parseDiscordMentions(parsedContent);

		// \n
		parsedContent = parsedContent.replace(/\n/g, '<br>');

		parsedContent = contentMdIt.render(parsedContent);

		parsedContent = parsedContent.replace(
			/<a href="(.*?)"(.*?)>(.*?)<\/a>/g,
			'<a href="$1" target="_blank" rel="noopener noreferrer"$2>$3</a>'
		);
	}

	parsedContent = twemoji.parse(parsedContent, {
		folder: 'svg',
		className: 'discord-emoji',
		ext: '.svg'
	});

	parsedContent = parseDiscordEmojis(parsedContent);

	parsedContent = DOMPurify.sanitize(parsedContent, {
		ALLOWED_TAGS: ['p', 'a', 'br', 'strong', 'em', 'u', 's', 'br', 'span', 'img'],
		ALLOWED_ATTR: ['src', 'alt', 'href', 'class', 'target']
	});

	return parsedContent;
};

const parsedMessage = computed(() => parseContent(props.content));
</script>

<template>
	<div>
		<div v-html="parsedMessage" :class="twMerge('break-words', props.innerClass)" />
	</div>
</template>
