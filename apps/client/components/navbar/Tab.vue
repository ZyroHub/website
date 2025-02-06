<script lang="ts" setup>
const props = defineProps<{
	to?: string;
	title?: string;
}>();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/navbar/tab.scss';
</style>

<template>
	<Tooltip placement="bottom">
		<template #trigger>
			<NuxtLinkLocale :to="props.to" is="div" class="navbar-tab" active-class="active">
				<slot />
			</NuxtLinkLocale>
		</template>

		<template v-if="props.title" #default>
			{{ props.title }}
		</template>
	</Tooltip>
</template>
