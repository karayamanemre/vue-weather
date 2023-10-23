<template>
	<div class="flex flex-col flex-1">
		<div class="flex flex-col items-center py-12">
			<AnimatedPlaceholder class="max-w-[300px] w-full mb-4" />
			<AnimatedPlaceholder class="max-w-[300px] w-full mb-4" />
			<AnimatedPlaceholder class="max-w-[300px] w-full mb-4 h-[100px]" />
			<AnimatedPlaceholder class="max-w-[30px] w-full" />
		</div>

		<hr class="w-full border border-white border-opacity-10" />

		<div class="flex items-center w-full max-w-screen-md py-12">
			<AnimatedPlaceholder class="max-w-[300px] w-full mb-4" />
		</div>

		<hr class="w-full border border-white border-opacity-10" />

		<!-- 3 days forecast -->
		<div class="flex items-center w-full max-w-screen-md py-12">
			<AnimatedPlaceholder class="max-w-[300px] w-full mb-4" />
		</div>

		<hr class="w-full border border-white border-opacity-10" />

		<!-- air quality -->
		<div class="flex items-center w-full max-w-screen-md py-12">
			<AnimatedPlaceholder class="max-w-[300px] w-full mb-4" />
		</div>
	</div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>
