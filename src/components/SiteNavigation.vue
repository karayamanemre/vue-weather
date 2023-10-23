<template>
	<header class="sticky top-0 z-10 shadow-xl bg-weather-primary">
		<nav
			class="container flex flex-col items-center gap-4 py-6 text-white sm:flex-row">
			<RouterLink :to="{ name: 'home' }">
				<div class="flex items-center gap-3">
					<i class="text-3xl fas fa-cloud-sun-rain"></i>
					<p class="text-2xl">Local Weather</p>
				</div>
			</RouterLink>

			<div class="flex justify-end flex-1 gap-3">
				<i
					class="text-2xl duration-150 cursor-pointer fas fa-circle-info hover:text-gray-400"
					@click="toggleModal"></i>
				<i
					class="text-2xl duration-150 cursor-pointer fas fa-plus hover:text-gray-400"
					@click="addCity"
					v-if="route.query.preview"></i>
			</div>
			<BaseModal
				:modalActive="modalActive"
				@close-modal="toggleModal">
				<div class="text-black">
					<h1 class="mb-1 text-2xl">Overview:</h1>
					<p class="mb-4">
						With Local Weather, monitor present and upcoming weather conditions
						and air quality for any city you desire.
					</p>
					<h2 class="text-2xl">Steps to use:</h2>
					<ol class="mb-4 list-decimal list-inside">
						<li>
							Type the name of the city you're interested in into the search
							box.
						</li>
						<li>
							From the search results, pick a city to see its current weather
							details.
						</li>
						<li>
							To save and quickly access the city's weather later, click on the
							"+" symbol at the top right corner.
						</li>
					</ol>

					<h2 class="text-2xl">How to remove a city:</h2>
					<p>
						To stop tracking a city, select it from the main page. You'll find a
						delete option at the page's end to remove the city from your list.
					</p>
				</div>
			</BaseModal>
		</nav>
	</header>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { uid } from "uid";
import BaseModal from "./BaseModal.vue";

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();

const addCity = () => {
	if (localStorage.getItem("savedCities")) {
		savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
	}

	const locationObj = {
		id: uid(),
		city: route.params.city,
		country: route.params.country,
		coords: {
			lat: route.query.lat,
			lon: route.query.lon,
		},
	};

	savedCities.value.push(locationObj);
	localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

	let query = Object.assign({}, route.query);
	delete query.preview;
	query.id = locationObj.id;
	router.replace({ query });
};

const modalActive = ref(null);
const toggleModal = () => {
	modalActive.value = !modalActive.value;
};
</script>
