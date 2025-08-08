<script lang="ts" setup>
import { type DiscordWebhook, type DiscordMessage } from '~/shared/discord';
import { hexColorToDecimal } from '~/shared/colors';

const discordWebhook = ref<DiscordWebhook>();
const discordWebhookURLInput = ref<string>('');

const isDiscordWebhookLoading = ref<boolean>(false);
const discordWebhookTimer = ref<any | null>(null);
const discordWebhookError = ref<boolean>(false);
const discordSentKey = ref<number>(0);

const isSenddingMessages = ref<boolean>(false);
const isSendWithSuccess = ref<boolean>(false);
const isSendWithError = ref<boolean>(false);

const discordMessages = ref<DiscordMessage[]>([]);

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

const handleSendMessages = async () => {
	if (!discordWebhook.value) return;
	if (isSenddingMessages.value || isSendWithSuccess.value || isSendWithError.value) return;
	isSenddingMessages.value = true;

	discordSentKey.value = Date.now();

	const sentStartTime = new Date().getTime();

	let hasError = false;

	for (const message of discordMessages.value) {
		try {
			const formattedMessage = {
				content: message.content || undefined,
				embeds: message.embeds?.map(embed => ({
					title: embed.title || undefined,
					description: embed.description || undefined,
					url: embed.url || undefined,
					color: embed.color ? hexColorToDecimal(embed.color) : undefined,
					footer: embed.footer?.text
						? {
								text: embed.footer?.text,
								icon_url: embed.footer?.icon_url || undefined
							}
						: undefined,
					author: embed.author?.name
						? {
								name: embed.author?.name,
								url: embed.author?.url || undefined,
								icon_url: embed.author?.icon_url || undefined
							}
						: undefined,
					fields: embed.fields?.map(field => ({
						name: field.name || undefined,
						value: field.value || undefined,
						inline: field.inline || false
					}))
				}))
			};

			const parsedUrl = new URL(discordWebhook.value.url);

			const sentRes = await fetch(parsedUrl.toString(), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formattedMessage)
			});

			if (sentRes && sentRes.status !== 204) {
				hasError = true;
			}
		} catch (error) {
			hasError = true;
		}
	}

	const sentEndTime = new Date().getTime();
	const elapsedTime = sentEndTime - sentStartTime;

	if (elapsedTime < 2_000) {
		await new Promise(resolve => setTimeout(resolve, 2_000 - elapsedTime));
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
	}, 2_400);
};

const isValidDiscordWebhookURL = (url: string): boolean => {
	try {
		const parsedUrl = new URL(url);

		return (
			parsedUrl.protocol === 'https:' &&
			parsedUrl.hostname === 'discord.com' &&
			parsedUrl.pathname.startsWith('/api/webhooks/')
		);
	} catch {
		return false;
	}
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
		<div class="flex-grow flex flex-col gap-4">
			<div class="flex flex-col gap-2 bg-neutral-400 dark:bg-neutral-800 rounded-lg p-2">
				<InputsText
					label="Webhook URL"
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
								@click="handleSendMessages">
								<Transition name="transition_fade_200" mode="out-in">
									<span v-if="isSenddingMessages" class="flex items-center text-2xl">
										<Icon :key="discordSentKey.toString" name="line-md:uploading-loop" />
									</span>
									<span v-else-if="isSendWithSuccess" class="flex items-center text-2xl">
										<Icon :key="discordSentKey.toString" name="line-md:emoji-grin-filled" />
									</span>
									<span v-else-if="isSendWithError" class="flex items-center text-2xl">
										<Icon :key="discordSentKey.toString" name="line-md:emoji-cry-filled" />
									</span>
									<span v-else class="flex items-center gap-2">
										<Icon name="jam:paper-plane-f" /> Send
									</span>
								</Transition>
							</Button>
						</div>
					</div>
					<div
						v-else-if="isDiscordWebhookLoading || discordWebhookTimer"
						class="flex items-center px-2 gap-2">
						<Icon name="svg-spinners:3-dots-bounce" />
						<p>Loading webhook data...</p>
					</div>
					<div v-else-if="discordWebhookError" class="flex items-center px-2 gap-2 text-red-500">
						<Icon name="mdi:alert-circle" />
						<p>Invalid or no webhook data found.</p>
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
						<Icon name="mdi:plus" /> Add New Message
					</Button>
				</div>
			</div>
		</div>

		<div class="min-w-[40rem] min-h-32 px-4 py-4 bg-[#1a1a1e] rounded-lg">
			<div class="flex flex-col gap-1">
				<DiscordMessage
					v-for="(discordMessage, discordMessageI) in discordMessages"
					:key="discordMessage.id"
					:message="discordMessage"
					:hideUser="discordMessageI > 0" />
			</div>

			<div
				v-if="discordMessages.length === 0"
				class="flex flex-col justify-center items-center w-full h-full px-4 py-4">
				<Icon name="mdi:discord" size="48" class="text-neutral-50 mb-2" />

				<p class="text-center text-neutral-50 text-sm max-w-80">
					No messages to display. Use the form to generate a new Discord message.
				</p>
			</div>
		</div>
	</div>
</template>
