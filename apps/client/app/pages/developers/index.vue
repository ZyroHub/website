<script lang="ts" setup>
const { t } = useI18n();

useSeoMeta({
	title: t('pages.developers.meta.title'),
	description: t('pages.developers.meta.description')
});
</script>

<template>
	<ToolkitToolUnselected />
</template>
