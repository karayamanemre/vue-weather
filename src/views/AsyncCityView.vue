<template>
	<div class="flex flex-col items-center flex-1">
		<!-- Lottie animation container -->
		<div class="relative w-full max-w-screen-lg py-12">
			<div
				id="lottie-animation"
				v-if="
					shouldShowRainAnimation ||
					shouldShowSnowAnimation ||
					shouldShowWindAnimation
				"
				class="absolute inset-0"></div>

			<!-- Content (Always visible) -->
			<div class="relative flex flex-col items-center space-y-3 text-white">
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
					{{ Math.round(weatherData.data.current.temp_c) }}
					<span class="text-2xl">°C</span>
				</p>
				<p>
					Feels like: {{ Math.round(weatherData.data.current.feelslike_c) }}
				</p>
			</div>
		</div>

		<hr class="w-full border border-white border-opacity-10" />

		<div class="w-full max-w-screen-md py-12">
			<div class="mx-8 text-white">
				<h2 class="mb-4">Hourly Weather</h2>
				<div
					class="flex gap-4 py-4 overflow-x-scroll scrollbar scrollbar-rounded scrollbar-thumb-[#454756] scrollbar-track-[#2E213A]">
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
						class="flex flex-col items-center justify-between w-40 p-4 space-y-1 h-52 bg-weather-secondary rounded-2xl">
						<p class="text-sm text-center">{{ day.date }}</p>
						<img
							:src="day.day.condition.icon"
							:alt="day.day.condition.text"
							class="w-12 h-12" />
						<p class="text-xs text-center">{{ day.day.condition.text }}</p>
						<p class="text-lg text-center">
							{{ Math.round(day.day.avgtemp_c) }}°C
						</p>
					</div>
				</div>
			</div>
		</div>

		<hr class="w-full border border-white border-opacity-10" />

		<!-- Past 7 Days Weather -->
		<div class="w-full max-w-screen-md py-12">
			<div class="mx-8 text-white">
				<h2 class="mb-4">Past 7 Days</h2>
				<div
					class="flex gap-4 py-4 overflow-x-scroll scrollbar scrollbar-rounded scrollbar-thumb-[#454756] scrollbar-track-[#2E213A]">
					<div
						v-for="day in pastWeekWeather"
						:key="day.date"
						class="flex flex-col items-center justify-between h-56 p-4 space-y-1 w-36 bg-weather-secondary rounded-2xl">
						<p class="text-sm text-center">{{ day.date }}</p>
						<img
							:src="day.day.condition.icon"
							:alt="day.day.condition.text"
							class="w-12 h-12" />
						<p class="text-xs text-center">{{ day.day.condition.text }}</p>
						<p class="text-lg">{{ Math.round(day.day.avgtemp_c) }}°C</p>
					</div>
				</div>
			</div>
		</div>

		<hr class="w-full border border-white border-opacity-10" />
		<!-- air quality -->
		<div class="w-full max-w-screen-md py-12">
			<div class="mx-8 text-white">
				<h2 class="mb-4">Air Quality</h2>
				<div class="p-4 bg-weather-secondary rounded-2xl">
					<p class="flex flex-col gap-2 mt-4">
						<span class="flex justify-between"
							>Carbon Monoxide (CO):<span>
								{{ weatherData.data.current.air_quality.co }}
								μg/m3
							</span></span
						>
						<span class="flex justify-between"
							>Ozone (O3):<span>
								{{ weatherData.data.current.air_quality.o3 }}
								μg/m3
							</span></span
						>
						<span class="flex justify-between"
							>Nitrogen dioxide (NO2):<span>
								{{ weatherData.data.current.air_quality.no2 }}
								μg/m3
							</span></span
						>
						<span class="flex justify-between"
							>Sulphur dioxide (SO2):<span>
								{{ weatherData.data.current.air_quality.so2 }}
								μg/m3
							</span></span
						>
						<span class="flex justify-between"
							>PM2.5:<span>
								{{ weatherData.data.current.air_quality.pm2_5 }}
								μg/m3
							</span></span
						>
						<span class="flex justify-between"
							>PM10:<span
								>{{ weatherData.data.current.air_quality.pm10 }} μg/m3</span
							></span
						>
					</p>

					<p class="flex justify-between mt-2">
						US - EPA standard:
						<span v-if="(weatherData.data.current.air_quality.us_epa_index = 1)"
							>Good</span
						>
						<span
							v-else-if="
								(weatherData.data.current.air_quality.us_epa_index = 2)
							"
							>Moderate</span
						>
						<span
							v-else-if="
								(weatherData.data.current.air_quality.us_epa_index = 3)
							"
							>Unhealthy for Sensitive Groups</span
						>
						<span
							v-else-if="
								(weatherData.data.current.air_quality.us_epa_index = 4)
							"
							>Unhealthy</span
						>
						<span
							v-else-if="
								(weatherData.data.current.air_quality.us_epa_index = 5)
							"
							>Very Unhealthy</span
						>
						<span
							v-else-if="
								(weatherData.data.current.air_quality.us_epa_index = 6)
							"
							>Hazardous</span
						>
					</p>

					<p class="flex justify-between mt-2">
						UK Defra Index:
						<span
							v-if="
								weatherData.data.current.air_quality['gb-defra-index'] >= 1 &&
								weatherData.data.current.air_quality['gb-defra-index'] <= 3
							"
							>Low</span
						>
						<span
							v-else-if="
								weatherData.data.current.air_quality['gb-defra-index'] >= 4 &&
								weatherData.data.current.air_quality['gb-defra-index'] <= 6
							"
							>Moderate</span
						>
						<span
							v-else-if="
								weatherData.data.current.air_quality['gb-defra-index'] >= 7 &&
								weatherData.data.current.air_quality['gb-defra-index'] <= 9
							"
							>High</span
						>
						<span
							v-else-if="
								weatherData.data.current.air_quality['gb-defra-index'] > 9
							"
							>Very High</span
						>
						<span v-else
							>Unexpected Value:
							{{ weatherData.data.current.air_quality["gb-defra-index"] }}</span
						>
					</p>
				</div>
			</div>
		</div>

		<div
			v-if="isCitySaved"
			class="flex items-center gap-2 py-12 text-white duration-150 cursor-pointer hover:text-red-500"
			@click="removeCity">
			<i class="text-2xl fas fa-trash"></i>
			<p>Remove City</p>
		</div>
	</div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import lottie from "lottie-web";

const isCitySaved = computed(() => {
	const savedCities = JSON.parse(localStorage.getItem("savedCities") || "[]");
	return savedCities.some(
		(city) =>
			city.coords.lat === route.query.lat && city.coords.lon === route.query.lon
	);
});

const route = useRoute();
const getWeatherData = async () => {
	try {
		const weatherData = await axios.get(
			`https://api.weatherapi.com/v1/forecast.json?key=${
				import.meta.env.VITE_APP_WEATHER_API_KEY
			}&q=${route.query.lat},${route.query.lon}&days=3&aqi=yes&alerts=yes`
		);

		await new Promise((resolve) => setTimeout(resolve, 1000));

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

const getPastWeatherData = async (date) => {
	try {
		const response = await axios.get(
			`https://api.weatherapi.com/v1/history.json?key=${
				import.meta.env.VITE_APP_WEATHER_API_KEY
			}&q=${route.query.lat},${route.query.lon}&dt=${date}`
		);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const lottieInstance = ref(null);

const shouldShowRainAnimation = computed(() => {
	return weatherData.data.current.condition.text.includes("rain");
});

const shouldShowSnowAnimation = computed(() => {
	return weatherData.data.current.condition.text.includes("snow");
});

const shouldShowWindAnimation = computed(() => {
	return weatherData.data.current.condition.text.includes("wind");
});

onMounted(() => {
	let animationPath = "";
	if (shouldShowRainAnimation.value) {
		animationPath = "/animation_lo39nxbr.json";
	} else if (shouldShowSnowAnimation.value) {
		animationPath = "/animation_lo3anjhu.json";
	} else if (shouldShowWindAnimation.value) {
		animationPath = "/wind_animation.json";
	}

	if (animationPath) {
		lottieInstance.value = lottie.loadAnimation({
			container: document.getElementById("lottie-animation"),
			renderer: "svg",
			loop: true,
			autoplay: true,
			path: animationPath,
		});
	}
});

onBeforeUnmount(() => {
	if (lottieInstance.value) {
		lottieInstance.value.destroy();
	}
});

// Fetch past 7 days weather data
const pastWeekWeather = [];
const currentDate = new Date();
for (let i = 1; i <= 7; i++) {
	const previousDate = new Date(currentDate);
	previousDate.setDate(currentDate.getDate() - i);
	const formattedDate = `${previousDate.getFullYear()}-${String(
		previousDate.getMonth() + 1
	).padStart(2, "0")}-${String(previousDate.getDate()).padStart(2, "0")}`;
	const dayWeather = await getPastWeatherData(formattedDate);
	if (dayWeather && dayWeather.forecast && dayWeather.forecast.forecastday) {
		pastWeekWeather.push(dayWeather.forecast.forecastday[0]);
	}
}

const router = useRouter();
const removeCity = () => {
	const cities = JSON.parse(localStorage.getItem("savedCities"));
	const updatedCities = cities.filter((city) => city.id !== route.query.id);
	localStorage.setItem("savedCities", JSON.stringify(updatedCities));
	router.push({
		name: "home",
	});
};
</script>
