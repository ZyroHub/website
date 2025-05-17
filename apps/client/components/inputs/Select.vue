<script lang="ts" setup>
import type { HtmlHTMLAttributes } from 'vue';

const props = defineProps<{
	label?: string;
	name?: string;
	placeholder?: string;
	readonly?: boolean;
	class?: HtmlHTMLAttributes['class'];
	options: { label: string; value: string }[];
}>();

const model = defineModel<string>();
const formInput = useFormInput<string>(props.name, model);

const textInputRef = useTemplateRef('text-input');
const textInputContent = ref('');

const searchContent = ref('');

const filteredOptions = computed(() =>
	props.options.filter(option => {
		return option.label.toLowerCase().includes(searchContent.value.toLowerCase());
	})
);

const isFocused = ref(false);

const selectPosition = ref(0);

const selectedOption = computed(() => props.options.find(option => option.value === formInput.inputRef.value));

const handleSelect = (item_position?: number) => {
	item_position = item_position || selectPosition.value;

	const newSelectedOption = filteredOptions.value[item_position];
	if (newSelectedOption) {
		textInputContent.value = newSelectedOption.label;
		formInput.inputRef.value = newSelectedOption.value;
	}

	isFocused.value = false;
	textInputRef.value?.inputRef?.blur();
};

const handleFocus = (open: () => void) => {
	isFocused.value = true;

	searchContent.value = '';
	selectPosition.value = 0;

	textInputRef.value?.inputRef?.select();

	open();
};

const handleBlur = () => {
	if (selectedOption.value) {
		textInputContent.value = selectedOption.value.label;
	} else {
		textInputContent.value = '';
		formInput.inputRef.value = '';
		searchContent.value = '';
	}
};

const handleEnter = (close: () => void) => {
	if (!isFocused.value) return;

	handleSelect();
	close();
};

const handleArrowUp = () => {
	if (selectPosition.value === 0) return;

	selectPosition.value -= 1;
};

const handleArrowDown = () => {
	if (selectPosition.value === filteredOptions.value.length - 1) return;

	selectPosition.value += 1;
};

watch(textInputContent, () => {
	searchContent.value = textInputContent.value;
});

watch(searchContent, () => {
	selectPosition.value = 0;
});

onMounted(() => {
	if (!formInput.inputRef.value) {
		formInput.inputRef.value = props.options[0].value;
		textInputContent.value = props.options[0].label;
	} else {
		textInputContent.value = selectedOption.value?.label || '';
	}
});
</script>

<template>
	<div :class="props.class">
		<Dropdown placement="bottom-start" :offset="4" content-class="h-full max-h-42 !w-full overflow-y-auto">
			<template #trigger="{ open, close }">
				<InputsBase :label="props.label" :name="props.name">
					<template #content>
						<InputsText
							:placeholder="props.placeholder"
							v-model="textInputContent"
							inner-class="cursor-pointer"
							@focus="handleFocus(open)"
							@blur="handleBlur"
							@enter="handleEnter(close)"
							@arrow-up="handleArrowUp"
							@arrow-down="handleArrowDown"
							append-icon="mdi:keyboard-arrow-down"
							append-icon-class="text-xl cursor-pointer"
							@append-icon:click="handleFocus(open)"
							ref="text-input" />
					</template>
				</InputsBase>
			</template>

			<template #default>
				<div class="flex flex-col gap-y-1">
					<DropdownItem
						v-for="(option, index) in filteredOptions"
						:key="option.value"
						@click="handleSelect(index)"
						:active="index === selectPosition">
						{{ option.label }}
					</DropdownItem>
				</div>
			</template>
		</Dropdown>
	</div>
</template>
