<script lang="ts" setup>
import type { DiscordMessage } from '~~/shared/discord/discord';
import { discordGeneratorLanguages, generateDiscordCode } from '~~/shared/discord/generator';

const props = defineProps<{
	messages: DiscordMessage[];
}>();

const selectedCode = ref('json');

const languageOptions = computed(() =>
	discordGeneratorLanguages.map(lang => ({
		label: lang.name,
		value: lang.id
	}))
);

const discordGeneratorLanguage = computed(() => {
	return discordGeneratorLanguages.find(lang => lang.id === selectedCode.value);
});

const generatedCode = computed(() => generateDiscordCode(props.messages, selectedCode.value));
</script>

<template>
	<div>
		<div class="flex gap-2 items-center">
			<InputsSelect :options="languageOptions" v-model="selectedCode" class="max-w-60" />

			<ButtonCopy :content="generatedCode" />
		</div>

		<div class="rounded-lg overflow-hidden mt-2">
			<CodePreview :language="discordGeneratorLanguage?.language || 'javascript'" :code="generatedCode" />
		</div>
	</div>
</template>
