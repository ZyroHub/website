<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';
import ToolkitToolError from '~/components/toolkit/tool/Error.vue';
import ToolkitToolLoading from '~/components/toolkit/tool/Loading.vue';
import { idToPascalCase } from '~/shared/utilities';

const { t } = useI18n();
const route = useRoute();
const device = useDevice();

const appStore = useAppStore();

const tools = useTools();

const toolId = computed(() => route.params.tool_id as string);
const tool = computed(() => tools.get(toolId.value));

const isFavorite = computed(() => tools.isFavorite(toolId.value));

const handleToggleFavorite = () => {
	tools.toggleFavorite(toolId.value);
};

const handleLoader = async () => {
	try {
		const toolComponent = await import(`~/components/tools/${idToPascalCase(toolId.value)}.vue`);

		return toolComponent;
	} catch (e) {
		return ToolkitToolError;
	}
};

const component = defineAsyncComponent({
	loader: async () => {
		const toolComponent = await handleLoader();

		return toolComponent;
	},
	loadingComponent: ToolkitToolLoading,
	errorComponent: ToolkitToolError
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
			<div v-if="!tool?.needs_connection || appStore.connectionStatus === 'connected'" :key="component">
				<Suspense>
					<div>
						<p v-if="tool" class="toolkit-tool-title">
							<Icon :name="tool?.icon" />
							<span class="truncate max-w-[75%]">
								{{ t(`tools.${toolId}.name`) }}
							</span>

							<span
								v-if="device.isMobileOrTablet"
								@click.prevent="handleToggleFavorite"
								:class="
									twMerge(
										'relative duration-200 ml-auto min-w-10 min-h-10 rounded-full dark:text-black-500 dark:bg-black-900',
										isFavorite && 'dark:text-neutral-100 dark:bg-primary-500'
									)
								">
								<Icon
									name="mdi:heart"
									class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-2xl cursor-pointer" />
							</span>
						</p>

						<p v-if="tool?.providers?.length" class="toolkit-tool-providers">
							{{ t('components.toolkit.tool.provided') }}:
							<span v-for="(provider, index) in tool?.providers" :key="index">
								<a
									v-if="provider.url"
									:href="provider.url"
									target="_blank"
									class="text-blue-500 hover:underline">
									{{ provider.name }}
								</a>
								<span v-else>{{ provider.name }}</span>

								<span v-if="index < tool?.providers.length - 1">, </span>
							</span>
						</p>

						<component :is="component" />
					</div>

					<template #fallback>
						<ToolkitToolLoading />
					</template>
				</Suspense>
			</div>
			<div v-else-if="appStore.connectionStatus === 'connecting'" key="connecting">
				<ToolkitToolConnectionLoading />
			</div>
			<div v-else key="error">
				<ToolkitToolConnectionError />
			</div>
		</Transition>
	</div>
</template>
