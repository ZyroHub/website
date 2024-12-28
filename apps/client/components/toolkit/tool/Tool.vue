<script lang="ts" setup>
import ToolkitToolError from '~/components/toolkit/tool/Error.vue';
import ToolkitToolLoading from '~/components/toolkit/tool/Loading.vue';
import { idToPascalCase } from '~/shared/utilities';

const { t } = useI18n();
const route = useRoute();

const toolId = computed(() => route.params.tool_id as string);

const component = shallowRef(ToolkitToolLoading);

const loadToolComponent = async () => {
	try {
		const { default: toolComponent } = await import(`~/components/tools/${idToPascalCase(toolId.value)}.vue`);

		component.value = toolComponent;
	} catch (error) {
		component.value = ToolkitToolError;
	}
};

onMounted(() => {
	loadToolComponent();
});

useSeoMeta({
	title: t(`tools.${toolId.value}.name`),
	description: t(`tools.${toolId.value}.description`)
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/toolkit/tool/tool.scss';
</style>

<template>
	<div class="toolkit-tool-container">
		<Transition name="transition_tool_state_change" mode="out-in">
			<component :is="component" />
		</Transition>
	</div>
</template>
