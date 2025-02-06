<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();

const { data: contributorsData } = await useFetch('/api/contributors', {});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/button/buy-me-a-coffee.scss';
</style>

<template>
	<div>
		<a
			v-if="runtimeConfig.public.buy_me_a_coffee_slug"
			:href="`https://www.buymeacoffee.com/${runtimeConfig.public.buy_me_a_coffee_slug}`"
			target="_blank">
			<button class="button-bmac">
				<span><NuxtImg src="images/bmc-logo.webp" /> Buy me a coffee</span>

				<div>
					<Icon name="ri:heart-fill" :size="16" />
					<p>{{ contributorsData.buy_me_a_coffee_supporters.total || 0 }}</p>
				</div>
			</button>
		</a>
	</div>
</template>
