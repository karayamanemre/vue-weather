<template>
	<div class="flex flex-col items-center flex-1">
		<div
			v-if="route.query.preview"
			class="w-full p-4 text-center text-white bg-weather-secondary">
			<p>
				You are currently previewing the city, click the "+" icon to start
				tracking it.
			</p>
		</div>

		<div class="flex flex-col items-center py-12 space-y-3 text-white">
			<h1 class="text-3xl">{{ weatherData.data.location.name }}</h1>
			<p class="text-sm">
				{{ weatherData.data.location.region }},
				{{ weatherData.data.location.country }}
			</p>
			<p class="text-sm">
				Local Time: {{ weatherData.data.location.localtime }}
			</p>
			<p class="flex items-center text-xl">
				{{ weatherData.data.current.condition.text }}
				<img
					:src="weatherData.data.current.condition.icon"
					:alt="weatherData.data.current.condition.text"
					class="w-16 h-16" />
			</p>

			<p class="text-6xl">
				{{ weatherData.data.current.temp_c }}
				<span class="text-2xl">°C</span>
			</p>
			<p>Feels like: {{ weatherData.data.current.feelslike_c }}</p>
		</div>

		<hr class="w-full border border-white border-opacity-10" />

		<div class="w-full max-w-screen-md py-12">
			<div class="mx-8 text-white">
				<h2 class="mb-4">Hourly Weather</h2>
				<div class="flex gap-4 py-4 overflow-x-scroll">
					<div
						v-for="hour in next24HourForecast"
						:key="hour.time_epoch"
						class="flex flex-col items-center justify-between h-48 p-4 space-y-1 w-36 bg-weather-secondary rounded-2xl">
						<p class="text-sm">{{ hour.time.split(" ")[1] }}</p>
						<!-- Displaying only the time part -->
						<img
							:src="hour.condition.icon"
							:alt="hour.condition.text"
							class="w-8 h-8" />
						<p class="text-xs text-center">{{ hour.condition.text }}</p>
						<p class="text-lg">{{ Math.round(hour.temp_c) }}°C</p>
					</div>
				</div>
			</div>
		</div>

		<hr class="w-full border border-white border-opacity-10" />

		<!-- 3 days forecast -->
		<div class="w-full max-w-screen-md py-12">
			<div class="mx-8 text-white">
				<h2 class="mb-4">3 Days Forecast</h2>
				<div class="flex gap-4 py-4">
					<div
						v-for="day in weatherData.data.forecast.forecastday"
						:key="day.date"
						class="flex flex-col items-center justify-between h-48 p-4 space-y-1 w-36 bg-weather-secondary rounded-2xl">
						<p class="text-sm">{{ day.date }}</p>
						<img
							:src="day.day.condition.icon"
							:alt="day.day.condition.text"
							class="w-12 h-12" />
						<p class="text-xs text-center">{{ day.day.condition.text }}</p>
						<p class="text-lg">Max: {{ Math.round(day.day.maxtemp_c) }}°C</p>
						<p class="text-lg">Min: {{ Math.round(day.day.mintemp_c) }}°C</p>
					</div>
				</div>
			</div>
		</div>

		<hr class="w-full border border-white border-opacity-10" />

		<!-- air quality -->
		<div class="w-full max-w-screen-md py-12">
			<div class="mx-8 text-white">
				<h2 class="mb-4">Air Quality</h2>

				<div class="grid grid-cols-2 gap-4">
					<p>Carbon Monoxide (CO):</p>
					<p>{{ weatherData.data.current.air_quality.co }} μg/m3</p>

					<p>Ozone (O3):</p>
					<p>{{ weatherData.data.current.air_quality.o3 }} μg/m3</p>

					<p>Nitrogen dioxide (NO2):</p>
					<p>{{ weatherData.data.current.air_quality.no2 }} μg/m3</p>

					<p>Sulphur dioxide (SO2):</p>
					<p>{{ weatherData.data.current.air_quality.so2 }} μg/m3</p>

					<p>PM2.5:</p>
					<p>{{ weatherData.data.current.air_quality.pm2_5 }} μg/m3</p>

					<p>PM10:</p>
					<p>{{ weatherData.data.current.air_quality.pm10 }} μg/m3</p>
				</div>

				<p class="mt-4">
					US - EPA standard:
					<span v-if="(weatherData.data.current.air_quality.us_epa_index = 1)"
						>Good</span
					>
					<span
						v-else-if="(weatherData.data.current.air_quality.us_epa_index = 2)"
						>Moderate</span
					>
					<span
						v-else-if="(weatherData.data.current.air_quality.us_epa_index = 3)"
						>Unhealthy for Sensitive Groups</span
					>
					<span
						v-else-if="(weatherData.data.current.air_quality.us_epa_index = 4)"
						>Unhealthy</span
					>
					<span
						v-else-if="(weatherData.data.current.air_quality.us_epa_index = 5)"
						>Very Unhealthy</span
					>
					<span
						v-else-if="(weatherData.data.current.air_quality.us_epa_index = 6)"
						>Hazardous</span
					>
				</p>

				<p>
					UK Defra Index:
					<span>{{ weatherData.data.current.air_quality.gb_defra_index }}</span>
					(<!-- Corresponding band interpretation based on the index -->
					<span v-if="weatherData.data.current.air_quality.gb_defra_index <= 3"
						>Low</span
					>
					<span
						v-else-if="weatherData.data.current.air_quality.gb_defra_index <= 6"
						>Moderate</span
					>
					<span
						v-else-if="weatherData.data.current.air_quality.gb_defra_index <= 9"
						>High</span
					>
					<span v-else>Very High</span>
					)
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const getWeatherData = async () => {
	try {
		const weatherData = await axios.get(
			`http://api.weatherapi.com/v1/forecast.json?key=${
				import.meta.env.VITE_APP_WEATHER_API_KEY
			}&q=${route.query.lat},${route.query.lon}&days=3&aqi=yes&alerts=yes`
		);

		return weatherData;
	} catch (error) {
		console.log(error);
	}
};

const weatherData = await getWeatherData();

const localTime = new Date(weatherData.data.location.localtime);
const localHour = localTime.getHours();

const todayHourlyForecast = weatherData.data.forecast.forecastday[0].hour;
const tomorrowHourlyForecast =
	weatherData.data.forecast.forecastday[1]?.hour || [];

const hoursFromToday = todayHourlyForecast.filter(
	(hour) => new Date(hour.time).getHours() >= localHour
);
const remainingHours = 24 - hoursFromToday.length;
const hoursFromTomorrow = tomorrowHourlyForecast.slice(0, remainingHours);

const next24HourForecast = [...hoursFromToday, ...hoursFromTomorrow];
console.log(weatherData);
</script>