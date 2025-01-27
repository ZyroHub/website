<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

const emit = defineEmits<{
	click: [event: MouseEvent];
}>();

const props = defineProps<{
	class?: HTMLAttributes['class'];
	active?: boolean;
}>();

const dropdown = inject<{
	close: () => void;
	open: () => void;
} | null>('dropdown', null);

const handleClick = (event: MouseEvent) => {
	emit('click', event);

	dropdown?.close();
};
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/dropdown/item.scss';
</style>

<template>
	<div @click="handleClick($event)" :class="['dropdown-item', { active: props.active }, props.class]">
		<slot />
	</div>
</template>
