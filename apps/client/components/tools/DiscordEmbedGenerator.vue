<script lang="ts" setup></script>

<template>
	<div class="flex gap-4">
		<div class="flex-grow"></div>

		<div class="w-[40rem] px-4 py-4 bg-[#1a1a1e] rounded-lg">
			<DiscordMessage
				:message="{
					content: 'Bom dia, ZyroHub! 🌞',
					embeds: [
						{
							title: 'Olá, nova estrelinha! <:pink_Kirby_On_A_Star:1343776736130633748><:pink_Kirby_On_A_Star:1343776736130633748>',
							description:
								'Nossa metrópole é **GIGANTE** e cheia de lugares **incríveis para explorar**. Cada lugar tem uma __vibe__ diferente, então ache o seu preferido e mergulhe de cabeça!',
							thumbnail:
								'https://i.imgur.com/wDmTUmI.gif'
						},
						{
							title: 'Olá, nova estrelinha! <:pink_Kirby_On_A_Star:1343776736130633748><:pink_Kirby_On_A_Star:1343776736130633748>',
							description:
								'Nossa metrópole é **GIGANTE** e cheia de lugares **incríveis para explorar**. Cada lugar tem uma __vibe__ diferente, então ache o seu preferido e mergulhe de cabeça!'
						}
					]
				}" />
		</div>
	</div>
</template>
