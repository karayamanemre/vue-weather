<template>
	<div>
		<Suspense>
			<AsyncCityView />
			<template #fallback>Loading..</template>
		</Suspense>
	</div>
</template>

<script setup>
import AsyncCityView from "./AsyncCityView.vue";
</script>
