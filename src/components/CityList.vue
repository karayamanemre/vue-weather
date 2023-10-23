<template>
	<div
		v-for="city in savedCities"
		:key="city.id">
		<CityCard
			:city="city"
			@click="goToCityView(city)" />
	</div>

	<p v-if="savedCities.length === 0">
		No locations added. To start tracking a location, use the search bar above.
	</p>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import CityCard from "./CityCard.vue";
import { useRouter } from "vue-router";

const savedCities = ref([]);
const getCities = async () => {
	if (localStorage.getItem("savedCities")) {
		savedCities.value = JSON.parse(localStorage.getItem("savedCities"));

		const requests = [];
		savedCities.value.forEach((city) => {
			requests.push(
				axios.get(
					`http://api.weatherapi.com/v1/current.json?key=${
						import.meta.env.VITE_APP_WEATHER_API_KEY
					}&q=${city.coords.lat},${city.coords.lon}&aqi=no`
				)
			);
		});

		const weatherData = await Promise.all(requests);

		await new Promise((resolve) => setTimeout(resolve, 1000));

		weatherData.forEach((value, index) => {
			savedCities.value[index].weather = value.data;
		});
	}
};

await getCities();

const router = useRouter();
const goToCityView = (city) => {
	router.push({
		name: "city",
		params: {
			city: city.city,
			country: city.country,
		},
		query: {
			id: city.id,
			lat: city.coords.lat,
			lon: city.coords.lon,
		},
	});
};
</script>
