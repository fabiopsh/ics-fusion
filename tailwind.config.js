/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#6750A4",
				"on-primary": "#FFFFFF",
				"primary-container": "#EADDFF",
				"on-primary-container": "#21005D",
				secondary: "#625B71",
				"on-secondary": "#FFFFFF",
				"secondary-container": "#E8DEF8",
				"on-secondary-container": "#1D192B",
				tertiary: "#7D5260",
				"on-tertiary": "#FFFFFF",
				"tertiary-container": "#FFD8E4",
				"on-tertiary-container": "#31111D",
				error: "#B3261E",
				"on-error": "#FFFFFF",
				"error-container": "#F9DEDC",
				"on-error-container": "#410E0B",
				background: "#FFFBFE",
				"on-background": "#1C1B1F",
				surface: "#FFFBFE",
				"on-surface": "#1C1B1F",
				"surface-variant": "#E7E0EC",
				"on-surface-variant": "#49454F",
				outline: "#79747E",
			},
			fontFamily: {
				sans: ["Roboto", "sans-serif"],
			},
			borderRadius: {
				xl: "1rem",
				"2xl": "1.5rem",
				"3xl": "1.75rem",
			},
		},
	},
	plugins: [],
};
