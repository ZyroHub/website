<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, defineProps, type HtmlHTMLAttributes, computed } from 'vue';

const props = withDefaults(
	defineProps<{
		label?: string;
		name?: string;
		min?: number;
		max?: number;
		class?: HtmlHTMLAttributes['class'];
	}>(),
	{
		min: 0,
		max: 100
	}
);

const model = defineModel<number>();
const formInput = useFormInput<number>(props.name, model);

const textContent = computed({
	get: () => String(formInput.inputRef.value),
	set: (value: string) => {
		const numberValue = Number(value);
		if (isNaN(numberValue)) return;

		formInput.inputRef.value = Math.max(props.min, Math.min(props.max, numberValue));
	}
});

const isDragging = ref(false);
const slider = ref<HTMLElement>();

const updateSlider = (event: MouseEvent | TouchEvent) => {
	if (!isDragging.value || !slider.value) return;
	event.preventDefault();

	const rect = slider.value.getBoundingClientRect();
	const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
	const offsetX = clientX - rect.left;
	const percentage = Math.max(0, Math.min(1, offsetX / rect.width));

	formInput.inputRef.value = Math.round(percentage * (props.max - props.min) + props.min);
};

const handleDragStart = (event: MouseEvent | TouchEvent) => {
	isDragging.value = true;
	updateSlider(event);
};

const handleStopDrag = () => {
	isDragging.value = false;
};

onMounted(() => {
	document.addEventListener('mousemove', updateSlider);
	document.addEventListener('mouseup', handleStopDrag);

	document.addEventListener('touchmove', updateSlider, { passive: false });
	document.addEventListener('touchend', handleStopDrag);
	document.addEventListener('touchcancel', handleStopDrag);
});

onBeforeUnmount(() => {
	document.removeEventListener('mousemove', updateSlider);
	document.removeEventListener('mouseup', handleStopDrag);

	document.removeEventListener('touchmove', updateSlider);
	document.removeEventListener('touchend', handleStopDrag);
	document.removeEventListener('touchcancel', handleStopDrag);
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/inputs/slider.scss';
</style>

<template>
	<div :class="props.class">
		<InputsBase :label="props.label" :name="props.name">
			<template #content>
				<div class="input-slider-box">
					<InputsText
						v-model="textContent"
						class="max-w-16"
						innerClass="text-center"
						:mask="{ mask: '###' }" />

					<div
						ref="slider"
						class="input-slider-track"
						@mousedown="handleDragStart"
						@touchstart.prevent="handleDragStart">
						<div
							class="input-slider-fill"
							:style="{
								width:
									(((formInput.inputRef.value ?? props.min) - props.min) / (props.max - props.min)) *
										100 +
									'%'
							}" />
						<div
							class="input-slider-thumb"
							:style="{
								left: `${(((formInput.inputRef.value ?? props.min) - props.min) / (props.max - props.min)) * 100}%`
							}" />
					</div>
				</div>
			</template>
		</InputsBase>
	</div>
</template>
