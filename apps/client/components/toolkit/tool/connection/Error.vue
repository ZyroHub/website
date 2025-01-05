<script lang="ts" setup>
const { $socket } = useNuxtApp();

const { t } = useI18n();

const appStore = useAppStore();
const appStoreRefs = storeToRefs(appStore);

const router = useRouter();

const kitPath = inject<string>('kit_path');

const handleTryAgain = () => {
	$socket.connect();
	appStoreRefs.connectionStatus.value = 'connecting';
};

const handleCancel = () => {
	if (kitPath) router.push(`/${kitPath}`);
};
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/toolkit/tool/connection/error.scss';
</style>

<template>
	<div class="toolkit-tool-connection-error-container">
		<Icon name="typcn:warning" class="toolkit-tool-connection-error-icon" />

		<p class="toolkit-tool-connection-error-title">{{ t('components.toolkit.tool.connection.error.title') }}</p>
		<p class="toolkit-tool-connection-error-description">
			{{ t('components.toolkit.tool.connection.error.description') }}
		</p>

		<div class="flex gap-4 mt-6">
			<Button @click="handleTryAgain" theme="primary">
				{{ t('components.toolkit.tool.connection.error.buttons.try_again') }}
			</Button>

			<Button @click="handleCancel" theme="gray">{{
				t('components.toolkit.tool.connection.error.buttons.cancel')
			}}</Button>
		</div>
	</div>
</template>
