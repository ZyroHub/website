<script lang="ts" setup>
const { t } = useI18n();

useSeoMeta({
	title: t('pages.developers.meta.title'),
	description: t('pages.developers.meta.description')
});
</script>

<template>
	<div class="container">
		<ToolkitLayout>
			<template #title
				><Icon size="22" name="ant-design:code-filled" /> {{ t('pages.developers.title') }}</template
			>
		</ToolkitLayout>
	</div>
</template>
