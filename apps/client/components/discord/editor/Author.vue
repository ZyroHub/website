<script lang="ts" setup>
import type { DiscordEmbedAuthor } from '~/shared/discord';

const authorModel = defineModel<DiscordEmbedAuthor>('author');

const authorName = computed({
	get: () => authorModel.value?.name || '',
	set: (value: string) => {
		if (authorModel.value) authorModel.value.name = value;
	}
});

const authorURL = computed({
	get: () => authorModel.value?.url || '',
	set: (value: string) => {
		if (authorModel.value) authorModel.value.url = value;
	}
});

const authorIconURL = computed({
	get: () => authorModel.value?.icon_url || '',
	set: (value: string) => {
		if (authorModel.value) authorModel.value.icon_url = value;
	}
});
</script>

<template>
	<DiscordEditorCollapsable title="Author" collapsed>
		<template #default>
			<InputsText v-model="authorName" label="Name" />

			<InputsText v-model="authorURL" label="URL" />

			<InputsText v-model="authorIconURL" label="Icon URL" />
		</template>
	</DiscordEditorCollapsable>
</template>
