<script lang="ts" setup>
import MarkdownIt from 'markdown-it';
import { twMerge } from 'tailwind-merge';
import twemoji from 'twemoji';

const props = defineProps<{
	content: string;
	innerClass?: string;
}>();

const contentMdIt = new MarkdownIt({
	html: false,
	linkify: true,
	breaks: false,
	typographer: false
});

const parseContent = (content: string) => {
	let parsedContent = contentMdIt.render(content);

	parsedContent = twemoji.parse(parsedContent, {
		folder: 'svg',
		className: 'discord-twemoji',
		ext: '.svg'
	});

	return parsedContent;
};

const parsedMessage = computed(() => parseContent(props.content));
</script>

<style lang="scss">
.discord-twemoji {
	height: 1.2em;
	width: 1.2em;
}
</style>

<template>
	<div>
		<div v-html="parsedMessage" :class="twMerge('break-words', props.innerClass)" />
	</div>
</template>
