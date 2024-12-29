<script lang="ts" setup>
import { ToolTagEnum } from '~/shared/types';

const { t } = useI18n();

const tools = useTools();

const miscTools = computed(() => tools.tools.filter(tool => tool.tags.includes(ToolTagEnum.MISC)));
</script>

<template>
	<div class="container">
		<ToolkitLayout :tools="miscTools" path="misc">
			<template #title> <Icon size="22" name="jam:tools-f" /> {{ t('pages.misc.title') }} </template>
		</ToolkitLayout>
	</div>
</template>
