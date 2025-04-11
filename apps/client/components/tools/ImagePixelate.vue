<script lang="ts" setup>
const form = useForm({
	size: 10,

	quantization: false,
	quantizationSize: 16,

	dithering: false
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/tools/image-pixelate.scss';
</style>

<template>
	<div>
		<InputsProvider :form="form">
			<div class="flex gap-2">
				<div class="w-1/2">
					<InputsImageBox />

					<div class="flex flex-col w-full mt-6 gap-4">
						<InputsSlider label="Tamanho do Pixel" name="size" :min="1" :max="64" />

						<div class="flex flex-col gap-4">
							<div class="flex gap-4">
								<InputsCheckbox label="Quantização" name="quantization" />

								<Transition name="transition_fade_200" mode="out-in">
									<InputsCheckbox
										v-if="form.values.value.quantization"
										label="Dithering"
										name="dithering" />
								</Transition>
							</div>

							<Transition name="transition_fade_200" mode="out-in">
								<div v-if="form.values.value.quantization">
									<InputsSlider
										label="Quantidade de Cores"
										name="quantizationSize"
										:min="1"
										:max="128" />
								</div>
							</Transition>
						</div>
					</div>

					<Button theme="primary" class="mt-6"><Icon name="pixel:grid-solid" /> Pixelizar Imagem</Button>
				</div>

				<div class="w-1/2"></div>
			</div>
		</InputsProvider>
	</div>
</template>
