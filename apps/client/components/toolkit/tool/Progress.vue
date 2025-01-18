<script lang="ts" setup>
import Progress from '~/components/Progress.vue';

const props = defineProps<{
	task: ReturnType<typeof useTask<any>>;
}>();

const { t } = useI18n();

const finished = computed(() => props.task.task.value?.status === 'finished');
const error = computed(() => (props.task.task.value?.status === 'error' ? props.task.task.value.error : null));

const progress = computed(() => {
	if (finished.value) return { percentage: 100 };
	if (!props.task.task.value) return { percentage: 0 };
	if (
		props.task.task.value.status === 'queued' &&
		props.task.task.value.position &&
		props.task.task.value.initial_position
	)
		return { percentage: 100 - props.task.task.value.position / (props.task.task.value.initial_position / 100) };
	if (props.task.task.value.status === 'running') return props.task.task.value.progress;

	return { percentage: 0 };
});
</script>

<template>
	<div>
		<p class="text-center">
			<template v-if="task.task.value && ['pending', 'queued', 'running'].includes(task.task.value.status)">
				<template v-if="task.task.value.status === 'queued'">
					{{
						t('components.toolkit.tool.progress.queued', {
							position: task.task.value.position
						})
					}}
				</template>
				<template v-else-if="task.task.value.status === 'running'">
					<template v-if="progress.message">
						{{ t(`workers.${props.task?.worker_id}.progress.${progress.message}`) }}
					</template>
					<template v-else>
						{{ t('components.toolkit.tool.progress.running') }}
					</template>
				</template>
				<template v-else>{{ t('components.toolkit.tool.progress.pending') }}</template>
			</template>
			<template v-else-if="finished">{{ t('components.toolkit.tool.progress.finished') }}</template>
			<template v-else-if="error">
				<template v-if="error === 'unknown-error'">{{ t('components.toolkit.tool.progress.error') }}</template>
				<template v-else>{{ t(`workers.${props.task?.worker_id}.errors.${error}`) }}</template>
			</template>
			<template v-else>{{ t('components.toolkit.tool.progress.none') }}</template>
		</p>

		<div class="mt-2">
			<Progress :progress="progress.percentage" :error="!!error" />
		</div>
	</div>
</template>
