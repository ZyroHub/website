<script lang="ts" setup>
const { t } = useI18n();

const props = defineProps<{
	content?: string;
}>();

const copyState = ref<boolean>(false);
const copyText = computed(() =>
	copyState.value ? t('components.button.copy.success') : t('components.button.copy.default')
);

const handleCopy = () => {
	if (!props.content) return;

	navigator.clipboard.writeText(props.content);
	copyState.value = true;

	setTimeout(() => {
		copyState.value = false;
	}, 1000);
};
</script>

<template>
	<Button theme="primary" @click="handleCopy"><Icon name="mdi:content-copy" /> {{ copyText }}</Button>
</template>
