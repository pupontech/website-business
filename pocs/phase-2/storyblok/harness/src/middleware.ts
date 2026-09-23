// Astro middleware — the site side of the Visual Editor embedding requirement.
//
// The official Visual Editor documentation (re-verified 2026-09-22) requires the
// site to be served over HTTPS and to send a frame-ancestors Content-Security-Policy
// that permits the Storyblok app origin. This harness can only verify OUR side of
// that contract: that the documented header is actually emitted by the site. Whether
// app.storyblok.com accepts the frame is vendor behaviour and is NOT tested here.
//
// Middleware only affects the on-demand (server output) build; static output emits
// files and no response headers, which is itself a finding recorded in the report.
import { defineMiddleware } from "astro:middleware";

const EDITOR_ORIGIN = "https://app.storyblok.com";

export const onRequest = defineMiddleware(async (_context, next) => {
	const response = await next();
	response.headers.set(
		"Content-Security-Policy",
		`frame-ancestors ${EDITOR_ORIGIN}`,
	);
	return response;
});
