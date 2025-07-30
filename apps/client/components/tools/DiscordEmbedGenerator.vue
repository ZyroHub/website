<script lang="ts" setup></script>

<template>
	<div class="flex gap-4">
		<div class="flex-grow"></div>

		<div class="w-[40rem] px-4 py-4 bg-[#1a1a1e] rounded-lg">
			<DiscordMessage
				:message="{
					embeds: [{}]
				}" />
		</div>
	</div>
</template>
