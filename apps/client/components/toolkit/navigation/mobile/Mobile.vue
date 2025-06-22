<script lang="ts" setup>
import type { ITool } from '~/shared/types';
import { twMerge } from 'tailwind-merge';

const props = defineProps<{
	tools?: ITool[];
	path?: string;
}>();

const { t } = useI18n();
const tools = useTools();

const searchContent = ref('');

const filteredTools = computed(() => {
	if (!props.tools) return [];

	if (tools.isOnlyFavorites.value) return props.tools.filter(tool => tools.isFavorite(tool.id));
	if (!searchContent.value) return props.tools;

	return props.tools.filter(tool => {
		const translatedName = t(`tools.${tool.id}.name`);

		return translatedName.toLowerCase().includes(searchContent.value.toLowerCase());
	});
});
</script>

<template>
	<div>
		<div class="sticky flex items-center gap-2 top-0 z-100 py-2 bg-neutral-300 dark:bg-black-950">
			<InputsText
				v-model="searchContent"
				:placeholder="t('components.toolkit.navigation.search')"
				append-icon="material-symbols:search"
				append-icon-class="text-xl" />

			<div
				@click="tools.toggleOnlyFavorites"
				:class="
					twMerge(
						'relative min-w-10 min-h-10 rounded-full dark:text-black-500 dark:bg-black-900',
						tools.isOnlyFavorites.value && 'dark:text-neutral-100 dark:bg-primary-500'
					)
				">
				<Icon
					name="mdi:heart"
					class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-2xl cursor-pointer" />
			</div>
		</div>

		<div class="mt-4">
			<Transition name="transition_navigation_items" mode="out-in">
				<div :key="tools.isOnlyFavorites.value.toString()" class="grid grid-cols-2 gap-4">
					<ToolkitNavigationMobileItem
						v-for="tool in filteredTools"
						:id="tool.id"
						:path="`${props.path}/${tool.id}`" />
				</div>
			</Transition>
		</div>
	</div>
</template>
