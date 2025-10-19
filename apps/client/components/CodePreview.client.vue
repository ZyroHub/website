<script lang="ts" setup>
// 1. Importe watch e nextTick
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-tomorrow.css';
import { computed, onMounted, watch, nextTick } from 'vue';

const props = defineProps<{
	code: string;
	language: string;
}>();

const languageClass = computed(() => `language-${props.language}`);

onMounted(() => {
	Prism.highlightAll();
});

watch(
	() => [props.code, props.language],
	async () => {
		await nextTick();
		Prism.highlightAll();
	}
);
</script>

<template>
	<pre :class="[languageClass, '!my-0']"><code class="code-block">{{ props.code }}</code></pre>
</template>
