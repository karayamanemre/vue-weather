/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"weather-primary": "#2E213A",
				"weather-secondary": "#200E1D",
			},
		},
		fontFamily: {
			Montserrat: ['"Montserrat"', "sans-serif"],
		},
		container: {
			center: true,
			padding: "2rem",
		},
		screens: {
			sm: "640px",
			md: "768px",
		},
	},
	plugins: [require("tailwind-scrollbar")],
};
