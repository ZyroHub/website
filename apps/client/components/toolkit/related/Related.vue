<script lang="ts" setup>
import type { ITool } from '~/shared/types';

const { t } = useI18n();
const route = useRoute();

const tools = useTools();

const toolId = computed(() => route.params.tool_id as string);
const tool = computed(() => tools.get(toolId.value));

const relatedTools = computed(() => {
	if (!tool.value) return [];

	const relatedTools = tool.value.related?.map(id => tools.get(id)).filter(Boolean) || [];
	const remainingToolsCount = Math.max(6 - (relatedTools?.length || 0), 0);

	const relatedToolsByTags = tools.tools
		.sort((a, b) => {
			const aTagsCount = a.tags.filter(tag => tool.value?.tags?.includes(tag)).length;
			const bTagsCount = b.tags.filter(tag => tool.value?.tags?.includes(tag)).length;

			return bTagsCount - aTagsCount;
		})
		.filter(t => t.id !== tool.value?.id && !relatedTools.includes(t))
		.slice(0, remainingToolsCount);

	return [...relatedTools, ...relatedToolsByTags].filter(Boolean) as ITool[];
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/toolkit/related/related.scss';
</style>

<template>
	<div>
		<div v-if="tool" class="toolkit-related">
			<p class="flex items-center gap-2">
				<Icon name="solar:box-bold" /> {{ t('components.toolkit.related.title') }}
			</p>

			<Transition name="transition_fade_200" mode="out-in">
				<div :key="toolId" class="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
					<ToolkitRelatedCard v-for="relatedTool in relatedTools" :key="relatedTool.id" :tool="relatedTool" />
				</div>
			</Transition>
		</div>
	</div>
</template>
