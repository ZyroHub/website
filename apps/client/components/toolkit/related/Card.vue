<script lang="ts" setup>
import { ToolTagEnum, type ITool } from '~/shared/types';

const props = defineProps<{
	tool: ITool;
}>();

const { t } = useI18n();

const toLocale = computed(() => {
	if (!props.tool) return '/';

	if (props.tool.tags.includes(ToolTagEnum.DEV)) return `/developers/${props.tool.id}`;
	if (props.tool.tags.includes(ToolTagEnum.CREATORS)) return `/creators/${props.tool.id}`;
	if (props.tool.tags.includes(ToolTagEnum.MISC)) return `/misc/${props.tool.id}`;

	return '/';
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/toolkit/related/card.scss';
</style>

<template>
	<NuxtLinkLocale :to="toLocale" class="toolkit-related-card" :draggable="false">
		<Icon :name="props.tool.icon" class="toolkit-related-card-icon" />

		<p class="toolkit-related-card-name">{{ t(`tools.${props.tool.id}.name`) }}</p>
	</NuxtLinkLocale>
</template>
