<script lang="ts" setup>
const emit = defineEmits(['click']);

const dropdown = inject<{
	close: () => void;
	open: () => void;
} | null>('dropdown', null);

const handleClick = () => {
	emit('click');

	dropdown?.close();
};
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/dropdown/item.scss';
</style>

<template>
	<button @click="handleClick" class="dropdown-item">
		<slot />
	</button>
</template>
