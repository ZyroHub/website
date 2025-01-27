<script lang="ts" setup>
import Progress from '~/components/Progress.vue';
import type { Task } from '~/shared/types';

const props = defineProps<{
	task?: Task<any>;
	textClass?: string;
}>();

const { t } = useI18n();

const finished = computed(() => props.task?.status === 'finished');
const error = computed(() => (props.task?.status === 'error' ? props.task.error : null));

const progress = computed(() => {
	if (finished.value) return { percentage: 100 };
	if (!props.task) return { percentage: 0 };
	if (props.task.status === 'queued' && props.task.position && props.task.initial_position)
		return { percentage: 100 - props.task.position / (props.task.initial_position / 100) };
	if (props.task.status === 'running') return props.task.progress;

	return { percentage: 0 };
});
</script>

<template>
	<div>
		<p :class="['text-center', props.textClass]">
			<template v-if="task && ['pending', 'queued', 'running'].includes(task.status)">
				<template v-if="task.status === 'queued'">
					{{
						t('components.toolkit.tool.progress.queued', {
							position: task.position
						})
					}}
				</template>
				<template v-else-if="task.status === 'running'">
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
