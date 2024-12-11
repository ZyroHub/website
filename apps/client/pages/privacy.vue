<script lang="ts" setup>
import MDCRenderer from '@nuxtjs/mdc/runtime/components/MDCRenderer.vue';
import type { MDCParserResult } from '@nuxtjs/mdc';

const { t } = useI18n();

// const md = ref(t('pages.privacy.content'));
const md = computed(() => t('pages.privacy.content'));

const ast = ref<MDCParserResult | null>(null);
const parse = useMarkdownParser();

onBeforeMount(async () => {
	ast.value = await parse(md.value);
});

watch(md, async value => {
	ast.value = await parse(value);
});

useSeoMeta({
	title: t('pages.privacy.meta.title'),
	description: t('pages.privacy.meta.description'),
	ogImage: '/images/zyro-color.webp'
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/pages/privacy.scss';
</style>

<template>
	<div class="container">
		<div class="markdown-area">
			<Suspense>
				<MDCRenderer v-if="ast?.body" :body="ast.body" :data="ast.data" />
			</Suspense>

			<p class="privacy-date">{{ t('pages.privacy.date') }}</p>
		</div>
	</div>
</template>
