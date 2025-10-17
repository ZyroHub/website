<script lang="ts" setup>
import { autoUpdate, flip, offset, useFloating } from '@floating-ui/vue';
import { onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{
	placement?: Placement;
	offset?: number;
	contentClass?: string;
}>();

const emit = defineEmits<{
	open: [];
	close: [];
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
	const path = event.composedPath ? event.composedPath() : (event as any).path || [];

	const clickedInsideReference =
		reference.value && (path.includes(reference.value) || reference.value.contains(event.target as Node));

	const clickedInsideFloating =
		floating.value && (path.includes(floating.value) || floating.value.contains(event.target as Node));

	if (!clickedInsideReference && !clickedInsideFloating) {
		handleClose();
	}
};

watch(isOpen, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		if (newValue) {
			emit('open');
		} else {
			emit('close');
		}
	}
});

onMounted(() => {
	document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
	document.removeEventListener('click', handleClickOutside);
});

provide('dropdown', {
	close: handleClose,
	open: handleOpen,
	isOpen: isOpen
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
					<slot :open="handleOpen" :close="handleClose" />
				</div>
			</Transition>
		</div>
	</div>
</template>
