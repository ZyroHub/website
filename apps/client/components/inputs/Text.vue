<script lang="ts" setup>
import type { MaskInputOptions } from 'maska';
import type { HtmlHTMLAttributes, InputTypeHTMLAttribute } from 'vue';

const emit = defineEmits<{
	focus: [event: FocusEvent];
	blur: [event: FocusEvent];
	enter: [event: KeyboardEvent];
	'arrow-up': [event: KeyboardEvent];
	'arrow-down': [event: KeyboardEvent];

	'prepend-icon:click': [event: MouseEvent];
	'append-icon:click': [event: MouseEvent];
}>();

const props = defineProps<{
	label?: string;
	name?: string;
	placeholder?: string;
	readonly?: boolean;
	type?: InputTypeHTMLAttribute;
	mask?: MaskInputOptions;
	class?: HtmlHTMLAttributes['class'];
	innerClass?: HtmlHTMLAttributes['class'];
	showCopy?: boolean;
	prependIcon?: string;
	prependIconClass?: HtmlHTMLAttributes['class'];
	appendIcon?: string;
	appendIconClass?: HtmlHTMLAttributes['class'];
}>();

const model = defineModel();
const formInput = useFormInput(props.name, model);

const inputRef = useTemplateRef('text-input');

const copyState = ref<boolean>(false);

const handleCopy = () => {
	if (!formInput.inputRef.value) return;

	navigator.clipboard.writeText(formInput.inputRef.value);
	copyState.value = true;

	setTimeout(() => {
		copyState.value = false;
	}, 1000);
};

defineExpose({
	formInput,
	inputRef
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/inputs/text.scss';
</style>

<template>
	<div :class="props.class">
		<InputsBase :label="props.label" :name="props.name">
			<template #content>
				<input
					v-model="formInput.inputRef.value"
					:placeholder="props.placeholder"
					:type="props.type"
					:class="[
						'input-text-input',
						{ prepended: !!props.prependIcon, appended: !!props.appendIcon },
						props.innerClass
					]"
					:readonly="props.readonly"
					@focus="emit('focus', $event)"
					@blur="emit('blur', $event)"
					@keydown.enter.prevent="emit('enter', $event)"
					@keydown.arrow-up.prevent="emit('arrow-up', $event)"
					@keydown.arrow-down.prevent="emit('arrow-down', $event)"
					v-maska="props.mask"
					ref="text-input" />

				<Icon
					v-if="props.prependIcon"
					:name="props.prependIcon"
					:class="['input-text-prepend-icon', props.prependIconClass]"
					@click="emit('prepend-icon:click', $event)" />
				<Icon
					v-if="props.appendIcon"
					:name="props.appendIcon"
					:class="['input-text-append-icon', props.appendIconClass]"
					@click="emit('append-icon:click', $event)" />

				<Transition name="transition_fade_200" mode="out-in">
					<div
						v-if="props.showCopy && formInput.inputRef.value"
						@click="handleCopy"
						:class="['input-text-copy', { appended: !!props.appendIcon }]">
						<Icon v-if="copyState" class="input-text-copy-copied" name="mdi:check-bold" />
						<Icon v-else name="mdi:content-copy" />
					</div>
				</Transition>
			</template>
		</InputsBase>
	</div>
</template>
