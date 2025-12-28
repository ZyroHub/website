<script lang="ts" setup>
const { t } = useI18n();

useSeoMeta({
	title: t('pages.creators.meta.title'),
	description: t('pages.creators.meta.description')
});
</script>

<template>
	<ToolkitToolUnselected />
</template>
