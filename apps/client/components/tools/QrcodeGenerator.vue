<script lang="ts" setup>
import QRCodeStyling, { type DotType, type ErrorCorrectionLevel, type FileExtension } from 'qr-code-styling';
import { z } from 'zod';

const qrCodeElement = useTemplateRef<HTMLDivElement>('qrcode');
const qrCode = ref<QRCodeStyling>();

const form = useForm(
	{
		type: 'text',

		content: '',

		email: '',
		email_subject: '',
		email_body: '',

		sms_phone: '',

		phone: '',

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

const typeOptions = [
	{ label: 'Texto', value: 'text' },
	{ label: 'Email', value: 'email' },
	{ label: 'SMS', value: 'sms' },
	{ label: 'Telefone', value: 'phone' },
	{ label: 'Contato (VCard)', value: 'vcard' },
	{ label: 'Link', value: 'url' },
	{ label: 'Wifi', value: 'wifi' }
];

const dotStyleOptions = [
	{ label: 'Arredondado', value: 'rounded' },
	{ label: 'Extra Arredondado', value: 'extra-rounded' },
	{ label: 'Quadrado', value: 'square' },
	{ label: 'Ponto', value: 'dots' },
	{ label: 'Classy', value: 'classy' },
	{ label: 'Classy Arredondado', value: 'classy-rounded' }
];

const correctionLevelOptions = [
	{ label: 'Baixo (7%)', value: 'L' },
	{ label: 'Médio (15%)', value: 'M' },
	{ label: 'Alto (25%)', value: 'Q' },
	{ label: 'Máximo (30%)', value: 'H' }
];

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
		const normalizedPhone = form.values.value.sms_phone.replace(/\D/g, '');
		if (normalizedPhone) {
			content = `sms:${form.values.value.sms_phone}`;
		}
	}

	if (form.values.value.type === 'phone') {
		const normalizedPhone = form.values.value.phone.replace(/\D/g, '');
		if (normalizedPhone) {
			content = `tel:${normalizedPhone}`;
		}
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
					<InputsSelect name="type" label="Tipo de Código" :options="typeOptions" />

					<div class="flex flex-col gap-4">
						<template v-if="['url', 'text'].includes(form.values.value.type)">
							<InputsTextArea
								name="content"
								label="Conteúdo"
								placeholder="https://zyrohub.app"
								:rows="4" />
						</template>

						<template v-if="form.values.value.type === 'email'">
							<InputsText name="email" label="E-mail" placeholder="contact@zyrohub.app" />

							<InputsText name="email_subject" label="Assunto" placeholder="Olá, ZyroHub!" />

							<InputsTextArea
								name="email_body"
								label="Corpo do E-mail"
								placeholder="Olá, ZyroHub!"
								:rows="4" />
						</template>

						<template v-if="form.values.value.type === 'sms'">
							<InputsText name="sms_phone" label="Número do Telefone" placeholder="Número de Telefone" />
						</template>

						<template v-if="form.values.value.type === 'phone'">
							<InputsText name="phone" label="Número do Telefone" placeholder="Número de Telefone" />
						</template>
					</div>

					<div>
						<p class="text-xl font-semibold">Personalização do Código</p>

						<div class="mt-4 flex flex-col gap-4">
							<div class="flex gap-2">
								<InputsSelect
									name="dot_style"
									label="Estilo das Formas"
									class="w-full"
									:options="dotStyleOptions" />

								<InputsSelect
									name="correction_level"
									label="Nível de Correção de Erros"
									class="w-full"
									:options="correctionLevelOptions" />
							</div>

							<InputsSlider label="Margem do Código" name="margin" class="w-full" :min="0" :max="30" />
						</div>
					</div>

					<div>
						<p class="text-xl font-semibold">Opções de Imagem</p>

						<div class="mt-4 flex flex-col gap-4">
							<InputsImageBox name="image" :downloadable="false" />

							<div class="flex gap-2">
								<InputsSlider
									label="Tamanho da Imagem"
									name="image_size"
									class="w-full"
									:min="1"
									:max="10" />

								<InputsSlider
									label="Margem da Imagem"
									name="image_margin"
									class="w-full"
									:min="0"
									:max="16" />
							</div>

							<InputsCheckbox
								name="image_hide_background"
								label="Esconder fundo da imagem"
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
							Baixar
						</Button>

						<Button theme="gray" :disabled="!qrCode?._options.data">
							<Icon name="mdi:content-copy" />
							Copiar Imagem
						</Button>
					</div>

					<InputsTextArea
						name="output_content"
						label="Conteúdo do Código"
						placeholder="https://zyrohub.app"
						:rows="4"
						readonly />
				</div>
			</div>
		</InputsProvider>
	</div>
</template>
