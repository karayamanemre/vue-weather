<template>
	<header class="sticky top-0 bg-weather-primary shadow-xl">
		<nav
			class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
			<RouterLink :to="{ name: 'home' }">
				<div class="flex items-center gap-3">
					<i class="fas fa-cloud-sun-rain text-3xl"></i>
					<p class="text-2xl">Local Weather</p>
				</div>
			</RouterLink>

			<div class="flex gap-3 flex-1 justify-end">
				<i
					class="fas fa-circle-info text-2xl hover:text-gray-400 duration-150 cursor-pointer"></i>
				<i
					class="fas fa-plus text-2xl hover:text-gray-400 duration-150 cursor-pointer"></i>
			</div>
		</nav>
	</header>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
