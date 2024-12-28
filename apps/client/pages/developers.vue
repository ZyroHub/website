<script lang="ts" setup>
const { t } = useI18n();

const tools = useTools();

const devTools = computed(() =>
	tools.tools.filter(
		tool => tool.tags.includes(ToolTagEnum.DEV) && (tools.isOnlyFavorites.value ? tools.isFavorite(tool.id) : true)
	)
);
</script>

<template>
	<div class="container">
		<ToolkitLayout :tools="devTools" path="developers">
			<template #title>
				<Icon size="22" name="ant-design:code-filled" /> {{ t('pages.developers.title') }}
			</template>
		</ToolkitLayout>
	</div>
</template>
