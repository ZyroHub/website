<script lang="ts" setup>
import { autoUpdate, flip, offset, useFloating } from '@floating-ui/vue';
import { onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{
	placement?: Placement;
	offset?: number;
	contentClass?: string;
}>();

const reference = ref<HTMLElement | null>(null);
const floating = ref<HTMLElement | null>(null);

const isOpen = ref(false);

const { floatingStyles } = useFloating(reference, floating, {
	open: isOpen,
	placement: props.placement,
	whileElementsMounted: autoUpdate,
	middleware: [offset(props.offset || 8), flip()]
});

const toggleIsOpen = () => {
	isOpen.value = !isOpen.value;
};

const handleClose = () => {
	isOpen.value = false;
};

const handleOpen = () => {
	isOpen.value = true;
};

const handleClickOutside = (event: MouseEvent) => {
	if (
		reference.value &&
		!reference.value.contains(event.target as Node) &&
		floating.value &&
		!floating.value.contains(event.target as Node)
	)
		handleClose();
};

onMounted(() => {
	document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
	document.removeEventListener('click', handleClickOutside);
});

provide('dropdown', {
	close: handleClose,
	open: handleOpen
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/dropdown/dropdown.scss';
</style>

<template>
	<div>
		<div ref="reference">
			<slot name="trigger" :toggleIsOpen="toggleIsOpen" :open="handleOpen" :close="handleClose">
				<button @click="toggleIsOpen">Open dropdown</button>
			</slot>
		</div>

		<div ref="floating" :style="floatingStyles" class="z-100">
			<Transition name="transition_dropdown_visibility">
				<div v-if="isOpen" :class="['dropdown-content', props.contentClass]">
					<slot />
				</div>
			</Transition>
		</div>
	</div>
</template>
