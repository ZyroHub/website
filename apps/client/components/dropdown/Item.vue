<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

const emit = defineEmits<{
	click: [event: MouseEvent];
}>();

const props = withDefaults(
	defineProps<{
		class?: HTMLAttributes['class'];
		active?: boolean;
		autoClose?: boolean;
	}>(),
	{
		autoClose: true
	}
);

const dropdown = useInjectedDropdown();

const handleClick = (event: MouseEvent) => {
	emit('click', event);

	if (props.autoClose) dropdown?.close();
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
