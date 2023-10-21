<template>
	<main class="container text-white">
		<div class="relative pt-4 mb-8">
			<input
				v-model="searchQuery"
				@input="getSearchResults"
				type="text"
				placeholder="Search for a city.."
				class="w-full px-1 py-2 bg-transparent border-b focus:border-gray-500 focus:outline-none focus:shadow-2xl" />
			<ul
				v-if="mapboxResults"
				class="absolute bg-weather-secondary text-white shadow-lg py-2 px-2 w-full top-[66px]">
				<li
					v-for="searchResult in mapboxResults"
					:key="searchResult.id"
					class="py-2 cursor-pointer">
					{{ searchResult.place_name }}
				</li>
			</ul>
		</div>
	</main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const mapboxToken = import.meta.env.VITE_APP_MAPBOX_TOKEN;

const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxResults = ref(null);

const getSearchResults = () => {
	clearTimeout(queryTimeout.value);
	queryTimeout.value = setTimeout(async () => {
		if (searchQuery.value !== "") {
			const result = await axios.get(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxToken}&types=place`
			);
			mapboxResults.value = result.data.features;
			console.log(mapboxResults.value);
			return;
		}
		mapboxResults.value = null;
	}, 300);
};
</script>
