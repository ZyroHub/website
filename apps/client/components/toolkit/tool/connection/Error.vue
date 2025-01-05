<script lang="ts" setup>
const { $socket } = useNuxtApp();

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

		<p class="toolkit-tool-connection-error-title">Falha na Conexão</p>
		<p class="toolkit-tool-connection-error-description">Não foi possível estabelecer conexão com o servidor.</p>

		<div class="flex gap-4 mt-6">
			<Button @click="handleTryAgain" theme="primary">Tentar Novamente</Button>

			<Button @click="handleCancel" theme="gray">Cancelar</Button>
		</div>
	</div>
</template>
