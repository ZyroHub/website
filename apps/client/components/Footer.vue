<script lang="ts" setup>
const { t } = useI18n();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/footer.scss';
</style>

<template>
	<footer>
		<div class="footer-start">
			<p>{{ t('components.footer.copy') }}</p>
		</div>

		<div class="footer-end">
			<p>
				<NuxtLinkLocale to="/privacy">{{ t('components.footer.privacy') }}</NuxtLinkLocale>
			</p>
		</div>
	</footer>
</template>
