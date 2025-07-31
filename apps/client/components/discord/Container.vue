<script lang="ts" setup>
const props = defineProps<{
	color?: string;
}>();
</script>

<template>
	<div
		class="w-[520px] rounded-[4px] pt-[10px] pr-4 pb-4 pl-3 bg-[#242429] border-solid border-px border-[#323237] b-l-4"
		:style="{ borderLeftColor: props.color || '' }">
		<slot />
	</div>
</template>
