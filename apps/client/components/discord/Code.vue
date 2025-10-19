<script lang="ts" setup>
import type { DiscordMessage } from '~/shared/discord/discord';
import { discordGeneratorLanguages, generateDiscordCode } from '~/shared/discord/generator';

const props = defineProps<{
	messages: DiscordMessage[];
}>();

const selectedLanguage = ref('json');

const languageOptions = computed(() =>
	discordGeneratorLanguages.map(lang => ({
		label: lang.name,
		value: lang.language
	}))
);

const generatedCode = computed(() => generateDiscordCode(props.messages, selectedLanguage.value));
</script>

<template>
	<div>
		<div class="flex gap-2 items-center">
			<InputsSelect :options="languageOptions" v-model="selectedLanguage" class="max-w-36" />

			<ButtonCopy :content="generatedCode" />
		</div>

		<div class="rounded-lg overflow-hidden mt-2">
			<CodePreview language="javascript" :code="generatedCode" />
		</div>
	</div>
</template>
