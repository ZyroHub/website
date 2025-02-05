<script lang="ts" setup>
import { autoUpdate, flip, offset, useFloating, type Placement } from '@floating-ui/vue';

const props = defineProps<{
	placement?: Placement;
	offset?: number;
}>();

const reference = ref<HTMLElement | null>(null);
const floating = ref<HTMLElement | null>(null);

const isOpen = ref(false);

const { floatingStyles } = useFloating(reference, floating, {
	open: isOpen,
	placement: props.placement || 'top',
	whileElementsMounted: autoUpdate,
	middleware: [offset(props.offset || 8), flip()]
});

const handleClose = () => {
	isOpen.value = false;
};

const handleOpen = () => {
	isOpen.value = true;
};
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/tooltip.scss';
</style>

<template>
	<div>
		<div ref="reference" @mouseenter="handleOpen" @mouseleave="handleClose">
			<slot name="trigger"></slot>
		</div>

		<div ref="floating" :style="floatingStyles" class="z-100">
			<Transition name="transition_tooltip_visibility">
				<div v-if="isOpen" class="tooltip-content">
					<p><slot /></p>
				</div>
			</Transition>
		</div>
	</div>
</template>
