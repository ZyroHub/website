<script lang="ts" setup>
import {
	type DiscordWebhook,
	type DiscordMessage,
	getAttachmentFileName,
	isValidDiscordWebhookURL
} from '~/shared/discord/discord';
import { mountDiscordAPICode } from '~/shared/discord/generator';

const { t } = useI18n();

const discordWebhook = ref<DiscordWebhook>();
const discordWebhookURLInput = ref<string>('');

const selectedTab = ref<string>('preview');

const tabOptions = computed(() => [
	{ label: t('components.tools.discord_embed_generator.tab.preview'), value: 'preview', icon: 'mdi:eye' },
	{ label: t('components.tools.discord_embed_generator.tab.code'), value: 'code', icon: 'mdi:code-tags' }
]);

const isDiscordWebhookLoading = ref<boolean>(false);
const discordWebhookTimer = ref<any | null>(null);
const discordWebhookError = ref<boolean>(false);
const discordSentKey = ref<number>(0);

const isSenddingMessages = ref<boolean>(false);
const isSendWithSuccess = ref<boolean>(false);
const isSendWithError = ref<boolean>(false);

const discordMessages = ref<DiscordMessage[]>([]);

const isSubmitable = computed(() => {
	return (
		!!discordWebhook.value &&
		discordMessages.value.length > 0 &&
		!isSenddingMessages.value &&
		!isSendWithSuccess.value &&
		!isSendWithError.value
	);
});

const handleAddNewMessage = () => {
	discordMessages.value.push({
		id: crypto.randomUUID(),
		content: '',
		embeds: [],
		author: {
			name: '',
			avatar: ''
		},
		components: []
	});
};

const handleDeleteMessage = (discord_id: string) => {
	const index = discordMessages.value.findIndex(message => message.id === discord_id);
	if (index !== -1) {
		discordMessages.value.splice(index, 1);
	}
};

const handleClearErrors = () => {
	for (const message of discordMessages.value) {
		message.errors = [];

		if (message.embeds) {
			for (const embed of message.embeds) {
				embed.errors = [];
			}
		}
	}
};

const handleSendMessages = async () => {
	if (!isSubmitable.value) return;
	isSenddingMessages.value = true;

	discordSentKey.value = Date.now();

	const sentStartTime = new Date().getTime();

	handleClearErrors();

	let hasError = false;

	for (const message of discordMessages.value) {
		try {
			const formData = new FormData();

			for (const attachment of message.attachments || []) {
				if (attachment.file) formData.append('file', attachment.file, getAttachmentFileName(attachment));
			}

			const formattedMessage = mountDiscordAPICode(message);

			formData.append('payload_json', JSON.stringify(formattedMessage));

			const parsedUrl = new URL(discordWebhook.value!.url);

			parsedUrl.searchParams.append('wait', 'true');

			const sentRes = await fetch(parsedUrl.toString(), {
				method: 'POST',
				body: formData
			});

			const sentData = await sentRes.json()?.catch(() => null);

			if (sentRes && sentRes.status !== 200) {
				hasError = true;

				const discordMessage = discordMessages.value.find(m => m.id === message.id);

				if (sentData) {
					if (sentData.message && sentData.code) {
						discordMessage!.errors = [
							{
								message: sentData.message,
								code: sentData.code
							}
						];
					}

					if (sentData.embeds) {
						for (const embedIndex of sentData.embeds) {
							if (discordMessage?.embeds?.[embedIndex].errors) {
								discordMessage.embeds[embedIndex].errors = [{}];
							}
						}
					}
				}
			}
		} catch (error) {
			hasError = true;
		}
	}

	const sentEndTime = new Date().getTime();
	const elapsedTime = sentEndTime - sentStartTime;

	if (elapsedTime < 1_000) {
		await new Promise(resolve => setTimeout(resolve, 1_000 - elapsedTime));
	}

	discordSentKey.value = Date.now();

	isSenddingMessages.value = false;

	if (hasError) {
		isSendWithError.value = true;
	} else {
		isSendWithSuccess.value = true;
	}

	setTimeout(() => {
		if (hasError) {
			isSendWithError.value = false;
		} else {
			isSendWithSuccess.value = false;
		}
	}, 1_000);
};

const loadWebhookData = async (webhook_url: string) => {
	if (!isValidDiscordWebhookURL(webhook_url)) {
		discordWebhook.value = undefined;
		discordWebhookError.value = true;

		return;
	}

	try {
		isDiscordWebhookLoading.value = true;
		discordWebhookError.value = false;

		const response = await fetch(webhook_url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json());

		if (response && response.id) {
			discordWebhook.value = response as DiscordWebhook;
		} else {
			discordWebhook.value = undefined;
			discordWebhookError.value = true;
		}
	} catch (error) {
		discordWebhook.value = undefined;
		discordWebhookError.value = true;
	} finally {
		isDiscordWebhookLoading.value = false;
	}
};

watch(discordWebhookURLInput, (new_value, old_value) => {
	if (new_value !== old_value) {
		if (discordWebhookTimer.value) {
			clearTimeout(discordWebhookTimer.value);
			discordWebhookTimer.value = null;
		}

		discordWebhookError.value = false;

		if (new_value.trim() === '') {
			discordWebhook.value = undefined;

			return;
		}

		discordWebhookTimer.value = setTimeout(() => {
			loadWebhookData(new_value);

			discordWebhookTimer.value = null;
		}, 500);
	}
});
</script>

<template>
	<div class="flex gap-4">
		<div class="absolute max-w-0 max-h-0 opacity-0 overflow-hidden">
			<Icon name="line-md:uploading-loop" />
			<Icon name="line-md:emoji-grin-filled" />
			<Icon name="line-md:emoji-cry-filled" />
		</div>

		<div class="flex-grow flex flex-col gap-4">
			<div class="flex flex-col gap-2 bg-neutral-400 dark:bg-neutral-800 rounded-lg p-2">
				<InputsText
					:label="t('components.tools.discord_embed_generator.webhook.label')"
					placeholder="https://discord.com/api/webhooks/..."
					v-model="discordWebhookURLInput"
					:disabled="isDiscordWebhookLoading" />

				<Transition name="transition_fade_200" mode="out-in">
					<div v-if="discordWebhook && !isDiscordWebhookLoading && !discordWebhookTimer">
						<div class="flex justify-between items-center">
							<div class="w-64 max-w-64">
								<DiscordWebhook :webhook="discordWebhook" />
							</div>

							<Button
								:theme="isSendWithSuccess ? 'green' : isSendWithError ? 'red' : 'primary'"
								@click="handleSendMessages"
								:disabled="!isSubmitable"
								class="!h-10">
								<Transition name="transition_fade_200" mode="out-in">
									<span v-if="isSenddingMessages" class="flex items-center text-2xl">
										<Icon :key="discordSentKey.toString()" name="line-md:uploading-loop" />
									</span>
									<span v-else-if="isSendWithSuccess" class="flex items-center text-2xl">
										<Icon :key="discordSentKey.toString()" name="line-md:emoji-grin-filled" />
									</span>
									<span v-else-if="isSendWithError" class="flex items-center text-2xl">
										<Icon :key="discordSentKey.toString()" name="line-md:emoji-cry-filled" />
									</span>
									<span v-else class="flex items-center gap-2">
										<Icon name="jam:paper-plane-f" />
										{{ t('components.tools.discord_embed_generator.send') }}
									</span>
								</Transition>
							</Button>
						</div>
					</div>
					<div
						v-else-if="isDiscordWebhookLoading || discordWebhookTimer"
						class="flex items-center px-2 gap-2">
						<Icon name="svg-spinners:3-dots-bounce" />
						<p>{{ t('components.tools.discord_embed_generator.webhook.loading') }}</p>
					</div>
					<div v-else-if="discordWebhookError" class="flex items-center px-2 gap-2 text-red-500">
						<Icon name="mdi:alert-circle" />
						<p>{{ t('components.tools.discord_embed_generator.webhook.invalid') }}</p>
					</div>
				</Transition>
			</div>

			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-2 max-w-full">
					<div v-for="(discordMessage, discordMessageI) in discordMessages" :key="discordMessage.id">
						<DiscordEditor
							v-model:message="discordMessages[discordMessageI]"
							:number="discordMessageI + 1"
							@delete="() => handleDeleteMessage(discordMessage.id)" />
					</div>
				</div>

				<div>
					<Button @click="handleAddNewMessage" theme="primary">
						<Icon name="mdi:plus" />
						{{ t('components.tools.discord_embed_generator.messages.add') }}
					</Button>
				</div>
			</div>
		</div>

		<div class="w-[40rem] min-h-32 px-4 py-4 bg-[#1a1a1e] rounded-lg">
			<div class="flex justify-between">
				<div>
					<InputsToggle v-model="selectedTab" :options="tabOptions" />
				</div>

				<div></div>
			</div>

			<div>
				<Transition name="transition_fade_200" mode="out-in">
					<div v-if="selectedTab === 'preview'" class="mt-6">
						<div class="flex flex-col gap-1">
							<DiscordMessage
								v-for="(discordMessage, discordMessageI) in discordMessages"
								:key="discordMessage.id"
								:message="discordMessage"
								:hideUser="discordMessageI > 0"
								:user="
									discordWebhook?.id
										? {
												id: discordWebhook.id,
												name: discordWebhook.name,
												avatar: discordWebhook.avatar
											}
										: undefined
								" />
						</div>

						<div
							v-if="discordMessages.length === 0"
							class="flex flex-col justify-center items-center w-full h-full px-4 py-4">
							<Icon name="mdi:discord" size="48" class="text-neutral-50 mb-2" />

							<p class="text-center text-neutral-50 text-sm max-w-80">
								{{ t('components.tools.discord_embed_generator.no_message') }}
							</p>
						</div>
					</div>
					<div v-else-if="selectedTab === 'code'" class="mt-4">
						<DiscordCode :messages="discordMessages" />
					</div>
				</Transition>
			</div>
		</div>
	</div>
</template>
