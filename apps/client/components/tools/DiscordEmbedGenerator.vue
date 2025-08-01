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
							author: {
								name: 'EletroCity',
								icon_url: 'https://i.imgur.com/wDmTUmI.gif',
								url: 'https://google.com/'
							},
							title: 'Olá, anova estrelinha! <:pink_Kirby_On_A_Star:1343776736130633748><:pink_Kirby_On_A_Star:1343776736130633748>',
							url: 'https://google.com/',
							description:
								'Nossa metrópole é **GIGANTE** e cheia de lugares **incríveis para explorar**. Cada lugar tem uma __vibe__ diferente, então ache o seu preferido e mergulhe de cabeça!',
							thumbnail: 'https://i.imgur.com/wDmTUmI.gif',
							footer: {
								text: 'EletroCity',
								icon_url: 'https://i.imgur.com/wDmTUmI.gif'
							},
							fields: [
								{
									name: '1° Evite Poluição Sonora:',
									value: 'Evite gritar, usar soundboards de forma abusiva, tocar músicas altas no microfone (ear-rape) ou qualquer outra forma de poluição sonora que possa perturbar os outros membros no canal de voz.',
									inline: true
								},
								{
									name: '2° Respeite o Ambiente:',
									value: 'Qualquer conteúdo de natureza pornográfica, excessivamente violento (gore) ou sexualmente explícito é estritamente proibido em todos os canais do servidor.',
									inline: true
								}
							],
							timestamp: new Date().toString()
						},
						{
							title: '<a:Hatsune_Miku_Excited:1343738628198764696> Como faço para adicionar no salve!',
							description: `**1° - Vá na aba do seu perfil (canto inferior direito) e toque em \'Editar Perfil\';**

**2° - Role para baixo e encontre a opção \'Tag do Servidor\';**

**3° - Adicione a opção \'EletroCity\' e salve! ✨**`,
							image: 'https://cdn.discordapp.com/attachments/1398376205773836288/1400875083907465316/400x400.png?ex=688e3a17&is=688ce897&hm=614af463f74e4f536b241888fd549cf4ac8b6d2d2e8a292f6a79b9bef55be647&',
							timestamp: new Date().toString()
						}
					]
				}" />
		</div>
	</div>
</template>
