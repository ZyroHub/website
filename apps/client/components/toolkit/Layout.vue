<style lang="scss" scoped>
@use '~/assets/scss/components/toolkit/layout.scss';
</style>

<template>
	<div class="toolkit-container">
		<div class="toolkit-container-start">
			<ToolkitNavigation>
				<template #title>
					<slot name="title"></slot>
				</template>
			</ToolkitNavigation>
		</div>

		<div class="toolkit-container-end">
			<div class="toolkit-content"></div>
		</div>
	</div>
</template>
