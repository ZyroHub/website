<script lang="ts" setup>
const { t } = useI18n();

useSeoMeta({
	title: t('pages.misc.meta.title'),
	description: t('pages.misc.meta.description')
});
</script>

<template>
	<ToolkitToolUnselected />
</template>
