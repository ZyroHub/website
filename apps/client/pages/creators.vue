<script lang="ts" setup>
const { t } = useI18n();

const tools = useTools();

const creatorsTools = computed(() =>
	tools.tools.filter(
		tool =>
			tool.tags.includes(ToolTagEnum.CREATORS) && (tools.isOnlyFavorites.value ? tools.isFavorite(tool.id) : true)
	)
);
</script>

<template>
	<div class="container">
		<ToolkitLayout :tools="creatorsTools" path="creators">
			<template #title>
				<Icon size="22" name="ant-design:code-filled" /> {{ t('pages.creators.title') }}
			</template>
		</ToolkitLayout>
	</div>
</template>
