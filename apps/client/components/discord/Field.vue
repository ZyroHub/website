<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';
import type { DiscordEmbedField } from '~/shared/discord';

const props = defineProps<{
	field: DiscordEmbedField;
	columnSpan?: number;
}>();
</script>

<template>
	<div
		:class="twMerge('flex flex-col gap-1')"
		:style="{ gridColumn: props.columnSpan ? `span ${props.columnSpan} / span ${props.columnSpan}` : 'auto' }">
		<DiscordContent
			v-if="props.field.name"
			:content="props.field.name"
			class="text-[12px] font-bold text-neutral-50" />

		<DiscordContent v-if="props.field.value" :content="props.field.value" class="text-[12px] text-neutral-200" />
	</div>
</template>
