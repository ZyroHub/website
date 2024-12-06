<script lang="ts" setup>
import { autoUpdate, flip, offset, useFloating, type Placement } from '@floating-ui/vue';

const props = defineProps<{
	placement?: Placement;
	offset?: number;
}>();

const reference = ref(null);
const floating = ref(null);

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
			<slot name="trigger" :toggleIsOpen="toggleIsOpen">
				<button @click="toggleIsOpen">Open dropdown</button>
			</slot>
		</div>

		<div ref="floating" :style="floatingStyles">
			<Transition name="dropdown_visibility">
				<div v-if="isOpen" class="dropdown-content">
					<slot />
				</div>
			</Transition>
		</div>
	</div>
</template>
