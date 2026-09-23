// P2.5 — exact reproduction of the configuration shown in the official
// Storyblok Astro guide (https://www.storyblok.com/docs/guides/astro,
// re-verified 2026-09-22): `output: "server"` with the Storyblok integration and
// no Astro adapter.
//
// This file exists only to be built once so the documented combination's actual
// result is captured as evidence (check H2). It is deliberately not the config
// used for the harness itself.
import { storyblok } from "@storyblok/astro";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const env = loadEnv("", process.cwd(), "STORYBLOK");
const { STORYBLOK_DELIVERY_API_TOKEN } = loadEnv(
	import.meta.env.MODE,
	process.cwd(),
	"",
);

export default defineConfig({
	integrations: [
		storyblok({
			accessToken: env.STORYBLOK_DELIVERY_API_TOKEN,
			apiOptions: {
				region: "eu",
			},
			components: {
				page: "storyblok/Page",
				feature: "storyblok/Feature",
				teaser: "storyblok/Teaser",
				grid: "storyblok/Grid",
			},
		}),
	],
	output: "server",
	// `STORYBLOK_DELIVERY_API_TOKEN` is destructured above to mirror the guide's
	// snippet verbatim; the harness build uses astro.config.ts instead.
});
