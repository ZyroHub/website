<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';
import { groupFields, type DiscordEmbed } from '~/shared/discord';

const props = defineProps<{
	embed: DiscordEmbed;
}>();

const groupedFields = computed(() => groupFields(props.embed.fields || []));
</script>

<template>
	<div>
		<DiscordContainer :color="props.embed.color?.toString()">
			<div class="flex justify-between gap-4">
				<div :class="twMerge('max-w-[480px]', props.embed.thumbnail && 'max-w-[380px]')">
					<DiscordAuthor v-if="props.embed.author" :author="props.embed.author" class="mb-2" />

					<DiscordContent
						v-if="props.embed.title && !props.embed.url"
						:content="props.embed.title"
						class="font-bold text-neutral-50 mb-2" />
					<a
						v-else-if="props.embed.title && props.embed.url"
						:href="props.embed.url"
						target="_blank"
						rel="noopener noreferrer">
						<DiscordContent
							:content="props.embed.title"
							class="font-bold text-[#95b8f3] hover:underline mb-2" />
					</a>

					<DiscordContent
						v-if="props.embed.description"
						:content="props.embed.description"
						class="text-[12px] text-neutral-200" />

					<div v-if="props.embed.fields?.length" class="mt-2 flex flex-col gap-2">
						<div
							v-for="(fieldGroup, fieldGroupI) in groupedFields"
							:key="fieldGroupI"
							class="grid grid-cols-6 gap-2">
							<DiscordField
								v-for="(field, fieldI) in fieldGroup.fields"
								:key="fieldI"
								:field="field"
								:columnSpan="fieldGroup.widths[fieldI]" />
						</div>
					</div>
				</div>

				<div v-if="props.embed.thumbnail">
					<DiscordThumbnail :src="props.embed.thumbnail" />
				</div>
			</div>

			<DiscordImage v-if="props.embed.image" :src="props.embed.image" class="mt-2" />

			<DiscordFooter
				v-if="props.embed.footer || props.embed.timestamp"
				:footer="props.embed.footer"
				:timestamp="props.embed.timestamp"
				class="mt-2" />
		</DiscordContainer>
	</div>
</template>
