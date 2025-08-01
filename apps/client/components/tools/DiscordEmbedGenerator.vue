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
							thumbnail: 'https://i.imgur.com/wDmTUmI.gif',
							footer: {
								text: 'EletroCity',
								icon_url: 'https://i.imgur.com/wDmTUmI.gif'
							},
							timestamp: new Date().toString()
						},
						{
							title: 'Olá, nova estrelinha! <:pink_Kirby_On_A_Star:1343776736130633748><:pink_Kirby_On_A_Star:1343776736130633748>',
							image: 'https://i.imgur.com/tmd9uxF.png',
							timestamp: new Date().toString()
						}
					]
				}" />
		</div>
	</div>
</template>
