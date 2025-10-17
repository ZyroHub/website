<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();
</script>

<template>
	<div class="fixed bottom-16 right-4">
		<a
			v-if="runtimeConfig.public.buy_me_a_coffee_slug"
			:href="`https://www.buymeacoffee.com/${runtimeConfig.public.buy_me_a_coffee_slug}`"
			target="_blank"
			:draggable="false"
			class="button-bmac-link">
			<Button class="bg-primary-300 hover:bg-primary-400">
				Support us on <NuxtImg src="images/bmc-logo.webp" class="w-4 ml-2" />
			</Button>
		</a>
	</div>
</template>
