<script lang="ts" setup>
import QRCodeStyling, { type DotType, type ErrorCorrectionLevel, type FileExtension } from 'qr-code-styling';
import { z } from 'zod';

const { t } = useI18n();

const qrCodeElement = useTemplateRef<HTMLDivElement>('qrcode');
const qrCode = ref<QRCodeStyling>();

const copyState = ref<boolean>(false);

const form = useForm(
	{
		type: 'text',

		content: '',

		email: '',
		email_subject: '',
		email_body: '',

		sms_phone: '',
		sms_body: '',

		phone: '',

		wifi_ssid: '',
		wifi_password: '',
		wifi_encryption: 'WPA' as 'WPA' | 'WEP' | 'nopass',
		wifi_hidden: false,

		dot_style: 'rounded' as DotType,
		correction_level: 'H' as ErrorCorrectionLevel,
		margin: 0,

		image: null as File | null,
		image_base64: null as string | null,
		image_size: 4,
		image_margin: 4,
		image_hide_background: true,

		output_type: 'png' as FileExtension,
		output_content: ''
	},
	z.object({})
);

const typeOptions = computed(() => [
	{ label: t('components.tools.qrcode_generator.options.type.options.text'), value: 'text' },
	{ label: t('components.tools.qrcode_generator.options.type.options.email'), value: 'email' },
	{ label: t('components.tools.qrcode_generator.options.type.options.sms'), value: 'sms' },
	{ label: t('components.tools.qrcode_generator.options.type.options.phone'), value: 'phone' },
	{ label: t('components.tools.qrcode_generator.options.type.options.vcard'), value: 'vcard' },
	{ label: t('components.tools.qrcode_generator.options.type.options.url'), value: 'url' },
	{ label: t('components.tools.qrcode_generator.options.type.options.wifi'), value: 'wifi' }
]);

const wifiEncryptionOptions = computed(() => [
	{ label: t('components.tools.qrcode_generator.options.wifi_encryption.options.wpa'), value: 'WPA' },
	{ label: t('components.tools.qrcode_generator.options.wifi_encryption.options.wep'), value: 'WEP' },
	{ label: t('components.tools.qrcode_generator.options.wifi_encryption.options.none'), value: 'nopass' }
]);

const dotStyleOptions = computed(() => [
	{ label: t('components.tools.qrcode_generator.options.dot_style.options.rounded'), value: 'rounded' },
	{ label: t('components.tools.qrcode_generator.options.dot_style.options.extra_rounded'), value: 'extra-rounded' },
	{ label: t('components.tools.qrcode_generator.options.dot_style.options.square'), value: 'square' },
	{ label: t('components.tools.qrcode_generator.options.dot_style.options.dots'), value: 'dots' },
	{ label: t('components.tools.qrcode_generator.options.dot_style.options.classy'), value: 'classy' },
	{ label: t('components.tools.qrcode_generator.options.dot_style.options.classy_rounded'), value: 'classy-rounded' }
]);

const correctionLevelOptions = computed(() => [
	{ label: t('components.tools.qrcode_generator.options.correction_level.options.l'), value: 'L' },
	{ label: t('components.tools.qrcode_generator.options.correction_level.options.m'), value: 'M' },
	{ label: t('components.tools.qrcode_generator.options.correction_level.options.q'), value: 'Q' },
	{ label: t('components.tools.qrcode_generator.options.correction_level.options.h'), value: 'H' }
]);

const updateQRCode = async () => {
	if (!qrCodeElement.value || !qrCode.value) return;

	let content = '';

	if (form.values.value.type === 'text' || form.values.value.type === 'url') {
		if (form.values.value.content) {
			content = form.values.value.content;
		}
	}

	if (form.values.value.type === 'email') {
		if (form.values.value.email) {
			const searchParams = new URLSearchParams();

			if (form.values.value.email_subject) searchParams.append('subject', form.values.value.email_subject);
			if (form.values.value.email_body) searchParams.append('body', form.values.value.email_body);

			content = `mailto:${form.values.value.email}${searchParams.size ? '?' : ''}${searchParams.toString()}`;
		}
	}

	if (form.values.value.type === 'sms') {
		const normalizedPhone = form.values.value.sms_phone.replace(/[^\d+]/g, '');
		if (normalizedPhone) {
			const normalizedBody = encodeURIComponent(form.values.value.sms_body || '');

			content = `smsto:${normalizedPhone}${normalizedBody ? `:${normalizedBody}` : ''}`;
		}
	}

	if (form.values.value.type === 'phone') {
		const normalizedPhone = form.values.value.phone.replace(/\D/g, '');
		if (normalizedPhone) {
			content = `tel:${normalizedPhone}`;
		}
	}

	if (form.values.value.type === 'wifi') {
		content = `WIFI:S:${form.values.value.wifi_ssid};T:${form.values.value.wifi_encryption};P:${
			form.values.value.wifi_password
		};H:${form.values.value.wifi_hidden};`;
	}

	form.values.value.output_content = content || '';

	if (!content) return qrCode.value.update({ data: '' });

	qrCode.value.update({
		data: content || '',
		type: 'canvas',
		width: 300,
		height: 300,
		image: form.values.value.image_base64 || undefined,
		margin: form.values.value.margin,
		dotsOptions: {
			type: form.values.value.dot_style
		},
		imageOptions: {
			margin: form.values.value.image_margin,
			imageSize: form.values.value.image_size / 10,
			hideBackgroundDots: form.values.value.image_hide_background
		},
		qrOptions: {
			errorCorrectionLevel: form.values.value.correction_level
		}
	});
};

const handleDownload = () => {
	if (!qrCode.value) return;

	qrCode.value.download({
		name: 'qrcode',
		extension: form.values.value.output_type
	});
};

const handleCopyImage = async () => {
	if (!qrCode.value) return;

	const rawData = await qrCode.value.getRawData(form.values.value.output_type);

	if (rawData) {
		const blob = new Blob([rawData], { type: `image/${form.values.value.output_type}` });
		const item = new ClipboardItem({ [`image/${form.values.value.output_type}`]: blob });

		navigator.clipboard.write([item]);

		if (!copyState.value) {
			copyState.value = true;

			setTimeout(() => {
				copyState.value = false;
			}, 1000);
		}
	}
};

const handleUpdateType = () => {
	form.values.value.content = '';

	form.values.value.email = '';
	form.values.value.email_subject = '';
	form.values.value.email_body = '';

	form.values.value.sms_phone = '';

	form.values.value.phone = '';
};

watch(form.values.value, () => {
	if (import.meta.client) {
		updateQRCode();
	}
});

watch(() => form.values.value.type, handleUpdateType);

watchEffect(async () => {
	if (form.values.value.image) {
		const file = await getFileBase64(form.values.value.image);
		form.values.value.image_base64 = file;
	} else {
		form.values.value.image_base64 = null;
	}
});

onMounted(() => {
	if (import.meta.client) {
		qrCode.value = new QRCodeStyling();

		if (qrCodeElement.value) {
			qrCode.value.append(qrCodeElement.value);
			updateQRCode();
		}
	}
});
</script>

<template>
	<div>
		<InputsProvider :form="form">
			<div class="flex gap-2 gap-y-4 flex-wrap md:flex-nowrap">
				<div class="w-full flex flex-col gap-6 md:w-1/2">
					<InputsSelect
						name="type"
						:label="t('components.tools.qrcode_generator.options.type.label')"
						:options="typeOptions" />

					<div>
						<Transition name="transition_fade_200" mode="out-in">
							<div v-if="['url', 'text'].includes(form.values.value.type)">
								<InputsTextArea
									name="content"
									:label="t('components.tools.qrcode_generator.options.content.label')"
									:placeholder="t('components.tools.qrcode_generator.options.content.placeholder')"
									:rows="4" />
							</div>

							<div v-else-if="form.values.value.type === 'email'" class="flex flex-col gap-4">
								<InputsText
									name="email"
									:label="t('components.tools.qrcode_generator.options.email.label')"
									:placeholder="t('components.tools.qrcode_generator.options.email.placeholder')" />

								<InputsText
									name="email_subject"
									:label="t('components.tools.qrcode_generator.options.email_subject.label')"
									:placeholder="
										t('components.tools.qrcode_generator.options.email_subject.placeholder')
									" />

								<InputsTextArea
									name="email_body"
									:label="t('components.tools.qrcode_generator.options.email_body.label')"
									:placeholder="t('components.tools.qrcode_generator.options.email_body.placeholder')"
									:rows="4" />
							</div>

							<div v-else-if="form.values.value.type === 'sms'" class="flex flex-col gap-4">
								<InputsText
									name="sms_phone"
									:label="t('components.tools.qrcode_generator.options.sms_phone.label')"
									:placeholder="
										t('components.tools.qrcode_generator.options.sms_phone.placeholder')
									" />

								<InputsTextArea
									name="sms_body"
									:label="t('components.tools.qrcode_generator.options.sms_body.label')"
									:placeholder="t('components.tools.qrcode_generator.options.sms_body.placeholder')"
									:rows="4" />
							</div>

							<div v-else-if="form.values.value.type === 'phone'">
								<InputsText
									name="phone"
									:label="t('components.tools.qrcode_generator.options.phone.label')"
									:placeholder="t('components.tools.qrcode_generator.options.phone.placeholder')" />
							</div>

							<div v-else-if="form.values.value.type === 'wifi'" class="flex flex-col gap-4">
								<InputsText
									name="wifi_ssid"
									:label="t('components.tools.qrcode_generator.options.wifi_ssid.label')"
									:placeholder="
										t('components.tools.qrcode_generator.options.wifi_ssid.placeholder')
									" />

								<div class="flex gap-2">
									<InputsText
										name="wifi_password"
										:label="t('components.tools.qrcode_generator.options.wifi_password.label')"
										:placeholder="
											t('components.tools.qrcode_generator.options.wifi_password.placeholder')
										"
										class="w-full" />

									<InputsSelect
										name="wifi_encryption"
										:label="t('components.tools.qrcode_generator.options.wifi_encryption.label')"
										class="w-full"
										:options="wifiEncryptionOptions" />
								</div>

								<InputsCheckbox
									name="wifi_hidden"
									:label="t('components.tools.qrcode_generator.options.wifi_hidden.label')"
									class="w-full" />
							</div>
						</Transition>
					</div>

					<div>
						<p class="text-xl font-semibold">
							{{ t('components.tools.qrcode_generator.personalization') }}
						</p>

						<div class="mt-4 flex flex-col gap-4">
							<div class="flex gap-2">
								<InputsSelect
									name="dot_style"
									:label="t('components.tools.qrcode_generator.options.dot_style.label')"
									class="w-full"
									:options="dotStyleOptions" />

								<InputsSelect
									name="correction_level"
									:label="t('components.tools.qrcode_generator.options.correction_level.label')"
									class="w-full"
									:options="correctionLevelOptions" />
							</div>

							<InputsSlider
								name="margin"
								:label="t('components.tools.qrcode_generator.options.margin.label')"
								class="w-full"
								:min="0"
								:max="30" />
						</div>
					</div>

					<div>
						<p class="text-xl font-semibold">
							{{ t('components.tools.qrcode_generator.image_options') }}
						</p>

						<div class="mt-4 flex flex-col gap-4">
							<InputsImageBox name="image" :downloadable="false" />

							<div class="flex gap-2">
								<InputsSlider
									name="image_size"
									:label="t('components.tools.qrcode_generator.options.image_size.label')"
									class="w-full"
									:min="1"
									:max="10" />

								<InputsSlider
									name="image_margin"
									:label="t('components.tools.qrcode_generator.options.image_margin.label')"
									class="w-full"
									:min="0"
									:max="16" />
							</div>

							<InputsCheckbox
								name="image_hide_background"
								:label="t('components.tools.qrcode_generator.options.image_hide_background.label')"
								class="w-full" />
						</div>
					</div>
				</div>

				<div class="w-full md:w-1/2 flex flex-col gap-4 items-center">
					<div class="bg-white p-2 rounded-xl">
						<div ref="qrcode" class="w-75 h-75" />
					</div>

					<div class="flex gap-2">
						<Button @click="handleDownload" theme="primary" :disabled="!qrCode?._options.data">
							<Icon name="material-symbols:download-rounded" />
							{{ t('components.tools.qrcode_generator.output.download') }}
						</Button>

						<Button @click="handleCopyImage" theme="gray" :disabled="!qrCode?._options.data">
							<template v-if="!copyState">
								<Icon name="mdi:content-copy" />
								{{ t('components.tools.qrcode_generator.output.copy_image') }}
							</template>
							<template v-else>
								{{ t('components.tools.qrcode_generator.output.copied_image') }}
							</template>
						</Button>
					</div>

					<InputsTextArea
						name="output_content"
						:label="t('components.tools.qrcode_generator.output.content')"
						:rows="4"
						show-copy
						readonly />
				</div>
			</div>
		</InputsProvider>
	</div>
</template>
