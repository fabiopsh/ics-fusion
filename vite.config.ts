import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
	plugins: [solid()],
	// Since you are deploying to https://fabiopsh.github.io/ics-fusion/
	// The base path MUST be set to the repository name.
	base: "/ics-fusion/",
});
