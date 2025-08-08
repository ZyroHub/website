<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';
import twemoji from 'twemoji';
import type { DiscordComponentButton } from '~/shared/discord';

const props = defineProps<{
	button: DiscordComponentButton;
}>();
</script>

<template>
	<div>
		<component
			:is="props.button.style === 'link' ? 'a' : 'div'"
			:href="props.button.style === 'link' ? props.button.url : undefined"
			target="_blank"
			rel="noopener noreferrer">
			<button
				:class="
					twMerge(
						'text-neutral-50 font-medium flex gap-2 items-center text-[13px] border-solid border-px rounded-lg px-2 py-1 duration-200',
						props.button.style === 'link' &&
							'bg-[#242429] border-[#26262E] hover:bg-[#333338] hover:border-[#333338]',
						props.button.style === 'primary' &&
							'bg-[#5865f2] border-[#5865f2] hover:bg-[#4654c0] hover:border-[#4654c0]',
						props.button.style === 'secondary' &&
							'bg-[#242429] border-[#26262E] hover:bg-[#333338] hover:border-[#333338]',
						props.button.style === 'success' &&
							'bg-[#00863a] border-[#00863a] hover:bg-[#057834] hover:border-[#057834]',
						props.button.style === 'danger' &&
							'bg-[#d22d39] border-[#d22d39] hover:bg-[#b42831] hover:border-[#b42831]',
						props.button.disabled && 'opacity-50 cursor-not-allowed'
					)
				">
				<img
					v-if="props.button.emoji"
					:src="`https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.0.3/assets/svg/${twemoji.convert.toCodePoint(props.button.emoji).split('-')[0]}.svg`"
					class="w-4 h-4"
					alt="Emoji" />
				{{ props.button.label }}

				<Icon v-if="props.button.style === 'link'" name="quill:link-out" size="18" />
			</button>
		</component>
	</div>
</template>
