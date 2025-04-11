<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, defineProps, type HtmlHTMLAttributes } from 'vue';

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

const updateSlider = (event: MouseEvent) => {
	if (!isDragging.value || !slider.value) return;

	event.preventDefault();

	const rect = slider.value.getBoundingClientRect();
	const offsetX = event.clientX - rect.left;
	const percentage = Math.max(0, Math.min(1, offsetX / rect.width));

	formInput.inputRef.value = Math.round(percentage * (props.max - props.min) + props.min);
};

const handleStartDrag = (event: MouseEvent) => {
	isDragging.value = true;

	updateSlider(event);
};

const handleStopDrag = () => {
	isDragging.value = false;
};

onMounted(() => {
	document.addEventListener('mousemove', updateSlider);
	document.addEventListener('mouseup', handleStopDrag);
});

onBeforeUnmount(() => {
	document.removeEventListener('mousemove', updateSlider);
	document.removeEventListener('mouseup', handleStopDrag);
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

					<div ref="slider" class="input-slider-track" @mousedown="handleStartDrag">
						<div
							class="input-slider-fill"
							:style="{
								width:
									(((formInput.inputRef.value || 1) - props.min) / (props.max - props.min)) * 100 +
									'%'
							}" />
						<div
							class="input-slider-thumb"
							:style="{
								left: `${(((formInput.inputRef.value || 1) - props.min) / (props.max - props.min)) * 100}%`
							}" />
					</div>
				</div>
			</template>
		</InputsBase>
	</div>
</template>
