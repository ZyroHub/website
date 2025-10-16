<script lang="ts" setup>
import type { DiscordEmbedFooter } from '~/shared/discord';

const footerModel = defineModel<DiscordEmbedFooter>('footer');

const footerText = computed({
	get: () => footerModel.value?.text || '',
	set: (value: string) => {
		if (footerModel.value) footerModel.value.text = value;
	}
});
</script>

<template>
	<DiscordEditorCollapsable title="Footer" collapsed>
		<template #default>
			<div class="flex gap-4 w-full">
				<DiscordEditorImage class="w-20 h-20" />

				<InputsText v-model="footerText" label="Text" class="flex-grow" :counterMax="2048" showCounter />
			</div>
		</template>
	</DiscordEditorCollapsable>
</template>
