// P2.5 Storyblok POC — Astro integration harness (credential-free).
//
// This config follows the official setup path documented at
// https://www.storyblok.com/docs/guides/astro (re-verified 2026-09-22):
//   npm install @storyblok/astro
//   integrations: [storyblok({ accessToken, apiOptions: { region: "eu" }, components: {...} })]
//   output: "server"
//
// TWO DELIBERATE DEVIATIONS, both recorded as findings in
// research/phase-2/poc-storyblok.md §3 and in evidence/run-01/environment.json:
//
//   1. `apiOptions.endpoint` is set from STORYBLOK_POC_ENDPOINT so the official
//      client can be pointed at the local mock CDN. `endpoint` is an official
//      field of the underlying client config (storyblok-js-client ISbConfig,
//      confirmed in the installed typings); it is NOT in the Storyblok Astro
//      guide, so this is a harness-only deviation and is not a vendor claim.
//   2. `output` is env-selectable so the documented value ("server") and a
//      static value can both be built. POC_ASTRO_OUTPUT=server also requires an
//      Astro adapter, which the official Storyblok guide does not mention.
import node from "@astrojs/node";
import { storyblok } from "@storyblok/astro";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const env = loadEnv("", process.cwd(), "");

const accessToken =
	process.env.STORYBLOK_DELIVERY_API_TOKEN ??
	env.STORYBLOK_DELIVERY_API_TOKEN ??
	"";

const endpoint = process.env.STORYBLOK_POC_ENDPOINT ?? env.STORYBLOK_POC_ENDPOINT;

const output = process.env.POC_ASTRO_OUTPUT === "server" ? "server" : "static";

export default defineConfig({
	output,
	// The adapter is only added for the on-demand build; the official Storyblok
	// guide's config snippet sets output: "server" with no adapter at all, and
	// that documented combination is exercised separately (see H2 in
	// harness-checks.json).
	...(output === "server" ? { adapter: node({ mode: "standalone" }) } : {}),
	integrations: [
		storyblok({
			accessToken,
			apiOptions: {
				region: "eu",
				...(endpoint ? { endpoint } : {}),
			},
			components: {
				page: "storyblok/Page",
				feature: "storyblok/Feature",
				teaser: "storyblok/Teaser",
				grid: "storyblok/Grid",
			},
		}),
	],
	server: { port: Number(process.env.POC_PORT ?? 4321), host: "127.0.0.1" },
});
