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
				<p v-if="searchError">Something went wrong, please try again later.</p>
				<p v-if="!searchError && mapboxResults.length === 0">
					No results found for "{{ searchQuery }}, try a different search term.
				</p>
				<template v-else>
					<li
						v-for="searchResult in mapboxResults"
						:key="searchResult.id"
						@click="previewCity(searchResult)"
						class="px-1 py-2 cursor-pointer hover:bg-gray-600">
						{{ searchResult.place_name }}
					</li>
				</template>
			</ul>
		</div>
		<div class="flex flex-col gap-4">
			<Suspense>
				<CityList />
				<template #fallback>
					<CityCardSkeleton />
				</template>
			</Suspense>
		</div>
	</main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
import CityCardSkeleton from "../components/CityCardSkeleton.vue";

const router = useRouter();
const previewCity = (searchResult) => {
	const [city, country] = searchResult.place_name.split(", ");
	router.push({
		name: "city",
		params: {
			city: city,
			country: country,
		},
		query: {
			lat: searchResult.geometry.coordinates[1],
			lon: searchResult.geometry.coordinates[0],
			preview: true,
		},
	});
};

const mapboxToken = import.meta.env.VITE_APP_MAPBOX_TOKEN;

const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
	clearTimeout(queryTimeout.value);
	queryTimeout.value = setTimeout(async () => {
		if (searchQuery.value !== "") {
			try {
				const result = await axios.get(
					`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxToken}&types=place`
				);
				mapboxResults.value = result.data.features;
			} catch {
				searchError.value = true;
			}

			return;
		}
		mapboxResults.value = null;
	}, 300);
};
</script>
