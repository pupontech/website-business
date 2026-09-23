// Local mock of the Storyblok Content Delivery API v2 — P2.5 credential-free harness.
//
// NO VENDOR IS CONTACTED. This server exists only so the official client and
// integration can be exercised without an account. Nothing it returns is
// evidence about Storyblok's real service; it is evidence about our own code
// path and about which requests the official client emits.
//
// Environment:
//   MOCK_CDN_PORT   default 4322
//   MOCK_CDN_LOG    path to a JSONL request transcript (default ./mock-cdn-requests.jsonl)
//
// The transcript records the request line, the `version` query value, and
// whether a token was present — never the token value.
import { createServer } from "node:http";
import { appendFileSync, writeFileSync } from "node:fs";
import { STORIES } from "./fixtures.mjs";

const PORT = Number(process.env.MOCK_CDN_PORT ?? 4322);
const LOG = process.env.MOCK_CDN_LOG ?? "./mock-cdn-requests.jsonl";
const EXPECTED_TOKEN = process.env.POC_MOCK_TOKEN ?? "poc-test-invented-placeholder";

writeFileSync(LOG, "");

const json = (res, status, body) => {
	const payload = JSON.stringify(body);
	res.writeHead(status, {
		"content-type": "application/json; charset=utf-8",
		"content-length": Buffer.byteLength(payload),
	});
	res.end(payload);
};

const record = (entry) => {
	appendFileSync(LOG, `${JSON.stringify(entry)}\n`);
};

const server = createServer((req, res) => {
	const url = new URL(req.url ?? "/", `http://127.0.0.1:${PORT}`);
	const token = url.searchParams.get("token");
	const version = url.searchParams.get("version") ?? "(absent)";
	const entry = {
		ts: new Date().toISOString(),
		method: req.method,
		path: url.pathname,
		query: {
			version,
			token_present: Boolean(token),
			token_matches_placeholder: token === EXPECTED_TOKEN,
			cv: url.searchParams.get("cv"),
		},
	};

	const prefix = "/v2/cdn/stories";
	if (!url.pathname.startsWith(prefix)) {
		record({ ...entry, response_status: 404 });
		json(res, 404, { error: "mock CDN: unsupported route" });
		return;
	}
	if (token !== EXPECTED_TOKEN) {
		record({ ...entry, response_status: 401 });
		json(res, 401, { error: "Unauthorized" });
		return;
	}

	const slug = url.pathname.slice(prefix.length).replace(/^\//, "");
	if (!slug) {
		const stories = Object.entries(STORIES).map(([key, variants]) => {
			const variant = variants[version === "draft" ? "draft" : "published"];
			const story = variant?.story ?? variants.published.story;
			return { id: story.id, slug: story.slug, name: story.name, key };
		});
		record({ ...entry, response_status: 200, matched: "list" });
		json(res, 200, { stories, cv: 1, total: stories.length });
		return;
	}

	const fixture = STORIES[slug];
	if (!fixture) {
		record({ ...entry, response_status: 404, matched: "none" });
		json(res, 404, { error: "mock CDN: unknown story slug" });
		return;
	}

	const wantedDraft = version === "draft";
	const variant = wantedDraft && fixture.draft ? fixture.draft : fixture.published;
	record({
		...entry,
		response_status: 200,
		matched: slug,
		variant_served: wantedDraft && fixture.draft ? "draft" : "published",
	});
	json(res, 200, variant);
});

server.listen(PORT, "127.0.0.1", () => {
	process.stdout.write(`mock CDN listening on http://127.0.0.1:${PORT}/v2\n`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
	process.on(signal, () => {
		server.close(() => process.exit(0));
	});
}
