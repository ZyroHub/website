<script lang="ts" setup>
const { t } = useI18n();
</script>

<template>
	<div class="w-full h-full flex items-center flex-col gap-8 justify-center">
		<ToolkitToolLoading />

		<p class="text-center">{{ t('components.toolkit.tool.connection.loading.description') }}</p>
	</div>
</template>
