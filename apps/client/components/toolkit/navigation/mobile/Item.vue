<script lang="ts" setup>
const props = defineProps<{
	id: string;
	path?: string;
	active?: boolean;
}>();

const { t } = useI18n();

const tools = useTools();
const tool = computed(() => tools.get(props.id));
</script>

<template>
	<NuxtLinkLocale
		:to="`/${props.path}`"
		class="flex flex-col items-center gap-2 px-4 py-3 rounded-lg text-neutral-700 bg-neutral-100 dark:text-neutral-100 dark:bg-black-800"
		active-class="active"
		:draggable="false">
		<Icon v-if="tool?.icon" :name="tool?.icon" size="94" />

		<p class="text-sm text-center font-medium flex-grow flex items-center">
			{{ t(`tools.${tool?.id || ''}.name`) }}
		</p>
	</NuxtLinkLocale>
</template>
