<script lang="ts" setup>
import type { NuxtError } from '#app';

const { t } = useI18n();

const props = defineProps({
	error: Object as () => NuxtError
});

const handleClear = () => clearError({ redirect: '/' });

useSeoMeta({
	title: t('pages.error.meta.title'),
	description: t('pages.error.meta.description', { code: props.error?.statusCode })
});
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
				<h2>{{ t('pages.error.errors.not_found.title') }}</h2>

				<p>{{ t('pages.error.errors.not_found.description') }}</p>
			</template>
			<template v-else>
				<h2>{{ t('pages.error.errors.default.title') }}</h2>

				<p>{{ t('pages.error.errors.default.description') }}</p>
			</template>

			<Button @click="handleClear" theme="primary" class="mt-8">
				<Icon name="material-symbols:arrow-back-rounded" /> {{ t('pages.error.back') }}
			</Button>
		</div>

		<NuxtImg src="images/zyro-color.webp" class="error-main-image" :draggable="false" />
	</div>
</template>
