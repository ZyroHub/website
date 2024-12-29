<script lang="ts" setup>
import { ToolTagEnum } from '~/shared/types';

const { t } = useI18n();

const tools = useTools();

const creatorsTools = computed(() => tools.tools.filter(tool => tool.tags.includes(ToolTagEnum.CREATORS)));
</script>

<template>
	<div class="container">
		<ToolkitLayout :tools="creatorsTools" path="creators">
			<template #title>
				<Icon size="22" name="ant-design:camera-filled" /> {{ t('pages.creators.title') }}
			</template>
		</ToolkitLayout>
	</div>
</template>
