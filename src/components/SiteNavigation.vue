<template>
	<header class="sticky top-0 shadow-xl bg-weather-primary">
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
					<h1 class="mb-1 text-2xl">About:</h1>
					<p class="mb-4">
						The Local Weather allows you to track the current and future weather
						of cities of your choosing.
					</p>
					<h2 class="text-2xl">How it works:</h2>
					<ol class="mb-4 list-decimal list-inside">
						<li>
							Search for your city by entering the name into the search bar.
						</li>
						<li>
							Select a city within the results, this will take you to the
							current weather for your selection.
						</li>
						<li>
							Track the city by clicking on the "+" icon in the top right. This
							will save the city to view at a later time on the home page.
						</li>
					</ol>

					<h2 class="text-2xl">Removing a city</h2>
					<p>
						If you no longer wish to track a city, simply select the city within
						the home page. At the bottom of the page, there will be am option to
						delete the city.
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
