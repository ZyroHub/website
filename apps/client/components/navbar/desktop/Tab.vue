<script lang="ts" setup>
const props = defineProps<{
	to?: string;
	title?: string;
	hideTitle?: boolean;
}>();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/navbar/desktop/tab.scss';
</style>

<template>
	<Tooltip placement="bottom">
		<template #trigger>
			<NuxtLinkLocale :to="props.to" :aria-label="props.title" is="div" class="navbar-tab" active-class="active">
				<div>
					<slot />
				</div>
			</NuxtLinkLocale>
		</template>

		<template v-if="props.title && !props.hideTitle" #default>
			{{ props.title }}
		</template>
	</Tooltip>
</template>
