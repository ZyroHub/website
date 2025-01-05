<script lang="ts" setup>
import Progress from '~/components/Progress.vue';
import type { WorkerId } from '@zyrohub/toolkit';

const props = defineProps<{
	worker_id: WorkerId;
}>();

const { t } = useI18n();

const task = useTask({ worker_id: props.worker_id });

const finished = ref(false);

const progress = computed(() => {
	if (finished.value) return { percentage: 100 };
	if (!task.task.value) return { percentage: 0 };
	if (task.task.value.status === 'queued' && task.task.value.position && task.task.value.initial_position)
		return { percentage: 100 - task.task.value.position / (task.task.value.initial_position / 100) };
	if (task.task.value.status === 'running') return task.task.value.progress;

	return { percentage: 0 };
});

task.onTaskFinished(() => {
	finished.value = true;
	console.log('finished');
});

watch(task.task, (newValue, oldValue) => {
	if (newValue && !oldValue) finished.value = false;
	console.log(newValue && !oldValue);
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
						{{ t(`workers.${props.worker_id}.progress.${progress.message}`) }}
					</template>
					<template v-else>
						{{ t('components.toolkit.tool.progress.running') }}
					</template>
				</template>
				<template v-else>{{ t('components.toolkit.tool.progress.pending') }}</template>
			</template>
			<template v-else-if="finished">{{ t('components.toolkit.tool.progress.finished') }}</template>
			<template v-else>{{ t('components.toolkit.tool.progress.none') }}</template>
		</p>

		<div class="mt-2">
			<Progress :progress="progress.percentage" />
		</div>
	</div>
</template>
