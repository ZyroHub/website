<script lang="ts" setup>
import { z } from 'zod';

const form = useForm(
	{
		length: 16
	},
	z.object({
		length: z.number().min(1).max(64)
	})
);
</script>

<template>
	<div>
		<InputsProvider :form="form">
			<div>
				<InputsSlider label="Tamanho da Senha" name="length" class="w-full max-w-76" :min="1" :max="64" />
			</div>
		</InputsProvider>
	</div>
</template>
