<script lang="ts" setup></script>

<style lang="scss" scoped>
@use '~/assets/scss/components/tools/base64.scss';
</style>

<template>
	<div class="tools-base64-container">
		<div>
			<InputsTextArea label="Input" placeholder="Plain Text" :rows="8" />
		</div>

		<div>
			<InputsTextArea label="Input" placeholder="Base64 Encoded" :rows="8" />
		</div>
	</div>
</template>
