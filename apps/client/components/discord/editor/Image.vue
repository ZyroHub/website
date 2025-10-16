<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';

const props = defineProps<{
	class?: string;
}>();

const imageModel = defineModel<string>('image');
</script>

<style lang="scss" scoped>
.no-image {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	border-style: dashed;
	border-radius: 0.75rem;
	cursor: pointer;
	transition: background-color 0.2s;
}

.light-mode {
	.no-image {
		border-color: var(--black_500);

		&:hover {
			background-color: var(--neutral_200);
		}
	}
}

.dark-mode {
	.no-image {
		border-color: var(--black_500);

		&:hover {
			background-color: var(--black_900);
		}
	}
}
</style>

<template>
	<Dropdown placement="bottom-start">
		<template #trigger="{ toggleIsOpen }">
			<div :class="twMerge('w-full h-full', props.class)" @click="toggleIsOpen">
				<img v-if="imageModel" class="w-full h-full" :src="imageModel" />
				<div v-else class="no-image">
					<Icon name="mdi:image-add" size="36" class="text-neutral-800 dark:text-neutral-400" />
				</div>
			</div>
		</template>

		<template #default>
			<DropdownItem>
				<Icon name="mdi:link-variant" size="20" />
				Add Image From URL
			</DropdownItem>
			<DropdownItem>
				<Icon name="mdi:file-upload" size="20" />
				Attach Image File
			</DropdownItem>
		</template>
	</Dropdown>
</template>
