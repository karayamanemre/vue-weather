<template>
	<div
		class="flex items-center px-3 py-6 rounded-lg shadow-lg cursor-pointer bg-weather-secondary">
		<div class="flex flex-col flex-1">
			<h2 class="text-2xl">
				{{ city.city }}
			</h2>
			<h3>
				{{ city.country }}
			</h3>
		</div>

		<div class="flex flex-col gap-2">
			<p class="self-end text-3xl">
				{{ Math.round(city.weather.current.temp_c) }}
				<span class="text-xl">°C</span>
			</p>
			<div class="flex items-center self-end gap-2">
				<img
					:src="city.weather.current.condition.icon"
					:alt="city.weather.current.condition.text"
					class="w-8 h-8" />
				<p class="text-sm">
					{{ city.weather.current.condition.text }}
				</p>
			</div>
			<div class="self-end">
				<span>
					Feels like: {{ Math.round(city.weather.current.feelslike_c) }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup>
defineProps({
	city: {
		type: Object,
		default: () => {},
	},
});
</script>
