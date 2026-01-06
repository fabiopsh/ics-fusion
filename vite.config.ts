import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
	plugins: [solid()],
	// IMPORTANT: If deploying to https://<USERNAME>.github.io/<REPO>/
	// you must set this to '/<REPO>/'.
	// We leave it commented or empty for root domain or if user configures it manually.
	// base: '/ics-fusion/',
});
