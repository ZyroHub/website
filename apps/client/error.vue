<script lang="ts" setup>
import type { NuxtError } from '#app';

const props = defineProps({
	error: Object as () => NuxtError
});

const handleClear = () => clearError({ redirect: '/' });
</script>

<style lang="scss">
@use '~/assets/scss/global.scss';
</style>

<style lang="scss" scoped>
@use '~/assets/scss/error.scss';
</style>

<template>
	<div class="error-main" role="main">
		<div class="error-main-content">
			<h1>{{ props.error?.statusCode }}</h1>

			<template v-if="props.error?.statusCode === 404">
				<h2>Page not found</h2>

				<p>Sorry, the page you are looking for does not exist or has been moved.</p>
			</template>
			<template v-else>
				<h2>Oops! An error occurred.</h2>

				<p>Sorry, an error has occurred on the server.</p>
			</template>

			<Button @click="handleClear" theme="primary" class="mt-8">
				<Icon name="material-symbols:arrow-back-rounded" /> Go back
			</Button>
		</div>

		<NuxtImg src="images/zyro-color.webp" class="error-main-image" :draggable="false" />
	</div>
</template>
