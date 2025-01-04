<script setup lang="ts">
import { useAppStore } from '~/stores/app';

const appStore = useAppStore();
</script>

<template>
	<div class="fixed r-12 b-20">
		<Transition name="transition_fade_200" mode="out-in">
			<Icon v-if="appStore.connectionStatus === 'connecting'" name="svg-spinners:blocks-shuffle-3" size="42" />
		</Transition>
	</div>
</template>
