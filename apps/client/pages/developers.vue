<script lang="ts" setup>
const { t } = useI18n();

useSeoMeta({
	title: t('pages.developers.meta.title')
});
</script>

<template>
	<div class="container">
		<ToolkitLayout></ToolkitLayout>
	</div>
</template>
