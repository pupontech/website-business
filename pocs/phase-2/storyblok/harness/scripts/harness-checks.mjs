// P2.5 — credential-free harness checks for the Storyblok + Astro integration.
//
// WHAT THIS PROVES: that OUR code path works — the official packages install and
// typecheck, the documented integration setup behaves as the guide implies, the
// official client emits the requests the protocol depends on (token present,
// version=draft|published), and the block/SEO/preview-header plumbing renders.
//
// WHAT THIS DOES NOT PROVE: any Storyblok product behaviour. The responses come
// from a local mock CDN, not from Storyblok. Every protocol operation that needs
// the vendor (O1–O10) stays blocked and is recorded separately in operations.jsonl.
//
// Output: ../evidence/run-01/{environment.json,harness-checks.json,operations.jsonl,
// summary.json,MANIFEST.sha256,logs/**,renders/**}
import { spawn, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
	existsSync,
	mkdirSync,
	readFileSync,
	readdirSync,
	statSync,
	writeFileSync,
} from "node:fs";
import path from "node:path";

const HARNESS = path.resolve(import.meta.dirname, "..");
const EVIDENCE = path.resolve(HARNESS, "..", "evidence", "run-01");
const LOGS = path.join(EVIDENCE, "logs");
const RENDERS = path.join(EVIDENCE, "renders");

const PLACEHOLDER_TOKEN = "poc-test-invented-placeholder";
// Port allocation note: poc-plan.md §8.3 reserves 4321 for candidate 1 (EmDash)
// and 4322/4323 for candidate 2. On 2026-09-22 a sibling EmDash POC was holding
// 4321 concurrently on this host (observed: `astro dev --port 4321`, pid 29207),
// and the first harness run's HTTP checks were answered by THAT process. The
// harness therefore uses its own ports and separately records the collision.
const SITE_PORT = 4322;
const MOCK_PORT = 4399;
const RUN_ID = `${new Date().toISOString().slice(0, 19)}Z-c2-storyblok-harness-01`;
const RUN_STARTED_MS = Date.now();

for (const dir of [EVIDENCE, LOGS, RENDERS]) mkdirSync(dir, { recursive: true });

const checks = [];
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const read = (p) => readFileSync(p, "utf8");
const writeLog = (name, body) => {
	writeFileSync(path.join(LOGS, name), body);
	return path.posix.join("run-01", "logs", name);
};

// Placeholder-value scrubber for saved transcripts. There is no real credential
// anywhere in this POC; this keeps the saved transcripts free of even the
// invented placeholder so the hygiene assertion is unambiguous.
const redact = (text) =>
	text.split(PLACEHOLDER_TOKEN).join("[REDACTED-INVENTED-PLACEHOLDER]");

const astroBin = path.join(HARNESS, "node_modules", ".bin", "astro");

const runAstro = (args, { env = {}, timeout = 300000 } = {}) => {
	const started = Date.now();
	const result = spawnSync(astroBin, args, {
		cwd: HARNESS,
		env: { ...process.env, ...env },
		encoding: "utf8",
		timeout,
	});
	return {
		command: `astro ${args.join(" ")}${Object.keys(env).length ? ` [env: ${Object.keys(env).join(",")}]` : ""}`,
		status: result.status,
		ms: Date.now() - started,
		output: redact(`${result.stdout ?? ""}${result.stderr ?? ""}`),
	};
};

const waitForHttp = async (url, timeoutMs = 40000) => {
	const deadline = Date.now() + timeoutMs;
	let lastError = "not attempted";
	while (Date.now() < deadline) {
		try {
			const res = await fetch(url, { redirect: "manual" });
			return { ok: true, status: res.status, response: res };
		} catch (error) {
			lastError = error instanceof Error ? error.message : String(error);
			await new Promise((r) => setTimeout(r, 400));
		}
	}
	return { ok: false, error: lastError };
};

const record = (check) => {
	checks.push({
		run_id: RUN_ID,
		candidate: "c2-storyblok",
		evidence_class: "harness",
		...check,
	});
	process.stdout.write(`${check.status.toUpperCase().padEnd(6)} ${check.check_id} ${check.title}\n`);
};

const assert = (condition, message) => {
	if (!condition) throw new Error(`assertion failed: ${message}`);
};

// Single-attempt liveness probe used for the port preflight.
const probePort = async (port) => {
	try {
		const res = await fetch(`http://127.0.0.1:${port}/`, {
			signal: AbortSignal.timeout(900),
			redirect: "manual",
		});
		return { in_use: true, status: res.status };
	} catch {
		return { in_use: false, status: null };
	}
};

// H0 — port preflight. Any process already answering on our ports would make
// every subsequent HTTP assertion meaningless, so this is checked first.
{
	const envFile = read(path.join(HARNESS, ".env"));
	const configuredEndpoint =
		envFile.match(/^STORYBLOK_POC_ENDPOINT=(.+)$/m)?.[1]?.trim() ?? "(absent)";
	const siteProbe = await probePort(SITE_PORT);
	const mockProbe = await probePort(MOCK_PORT);
	const endpointMatchesMock = configuredEndpoint === `http://127.0.0.1:${MOCK_PORT}/v2`;
	record({
		check_id: "H0",
		title: "Ports and client endpoint are consistent before the run",
		status:
			!siteProbe.in_use && !mockProbe.in_use && endpointMatchesMock ? "pass" : "fail",
		observable_result: `port ${SITE_PORT} in use before start: ${siteProbe.in_use}; port ${MOCK_PORT} in use before start: ${mockProbe.in_use}; client endpoint ${configuredEndpoint} points at the mock CDN: ${endpointMatchesMock}`,
		observed_values: {
			site_port: SITE_PORT,
			site_port_in_use_before_run: siteProbe.in_use,
			mock_port: MOCK_PORT,
			mock_port_in_use_before_run: mockProbe.in_use,
			configured_endpoint: configuredEndpoint,
			endpoint_matches_mock_port: endpointMatchesMock,
			plan_reserved_port_4321_held_by_sibling_poc: true,
		},
		commands: [`fetch http://127.0.0.1:${SITE_PORT}/`, `fetch http://127.0.0.1:${MOCK_PORT}/`],
		evidence_files: [],
		blocked_reason: null,
		notes:
			"poc-plan.md §8.3 allocates 4321 to candidate 1 and 4322/4323 to candidate 2. A concurrent EmDash POC held 4321 during this run, which is why this harness moved to dedicated ports and asserts its own process identity (H4).",
	});
}

// ---------------------------------------------------------------- mock CDN ---
const mockOut = [];
const mockLogFile = path.join(LOGS, "mock-cdn-requests.jsonl");
const mock = spawn(process.execPath, [path.join(HARNESS, "mock-cdn", "server.mjs")], {
	cwd: HARNESS,
	env: {
		...process.env,
		MOCK_CDN_PORT: String(MOCK_PORT),
		MOCK_CDN_LOG: mockLogFile,
		POC_MOCK_TOKEN: PLACEHOLDER_TOKEN,
	},
});
mock.stdout.on("data", (d) => mockOut.push(d.toString()));
mock.stderr.on("data", (d) => mockOut.push(d.toString()));
const mockReady = await waitForHttp(`http://127.0.0.1:${MOCK_PORT}/v2/cdn/stories`);

let siteServer = null;
const siteOut = [];

try {
	// ------------------------------------------------------------ H1 typecheck
	{
		const run = runAstro(["check"]);
		const file = writeLog("h1-astro-check.txt", `$ ${run.command}\nexit=${run.status}\n\n${run.output}\n`);
		// A bare exit code is not type-check evidence: the first harness run showed
		// `astro check` printing an interactive "requires @astrojs/check" prompt and
		// still exiting 0. A pass therefore requires the checker's own result line.
		const aborted = /requires the following dependency to be installed/.test(run.output);
		const zeroErrors = /0 errors/.test(run.output);
		record({
			check_id: "H1",
			title: "TypeScript/astro check passes on the harness",
			status: run.status === 0 && zeroErrors && !aborted ? "pass" : "fail",
			observable_result: aborted
				? `astro check exited ${run.status} but aborted at the interactive "@astrojs/check is required" prompt — this is NOT a type check`
				: `astro check exited ${run.status} with the checker's "0 errors" summary line: ${zeroErrors}`,
			observed_values: {
				exit_code: run.status,
				checker_reported_zero_errors: zeroErrors,
				aborted_on_missing_dependency: aborted,
				ms: run.ms,
			},
			commands: [run.command],
			evidence_files: [file],
			blocked_reason: null,
		});
	}

	// ------------------------- H2 the guide's exact config (server, no adapter)
	{
		const run = runAstro(["build", "--config", "astro.config.documented.mjs"]);
		const file = writeLog("h2-build-documented-config.txt", `$ ${run.command}\nexit=${run.status}\n\n${run.output}\n`);
		const mentionsAdapter = /adapter/i.test(run.output);
		record({
			check_id: "H2",
			title: "Official guide config (output: \"server\", no adapter) — actual build result",
			status: "pass", // this check records a documented-setup observation, not a desired outcome
			observable_result:
				run.status === 0
					? "The documented config built without an adapter."
					: `The documented config failed the build with exit ${run.status}${mentionsAdapter ? " and an adapter-related message" : ""}.`,
			observed_values: {
				exit_code: run.status,
				mentions_adapter: mentionsAdapter,
				first_error_line:
					run.output
						.split("\n")
						.find((line) => /error|adapter/i.test(line))
						?.trim() ?? null,
			},
			commands: [run.command],
			evidence_files: [file],
			blocked_reason: null,
		});
	}

	// ------------------------------------------- H3 on-demand build with adapter
	{
		const run = runAstro(["build"], { env: { POC_ASTRO_OUTPUT: "server" } });
		const file = writeLog("h3-build-server-adapter.txt", `$ ${run.command}\nexit=${run.status}\n\n${run.output}\n`);
		const entry = path.join(HARNESS, "dist", "server", "entry.mjs");
		const hasEntry = existsSync(entry);
		record({
			check_id: "H3",
			title: "On-demand build succeeds with the official @astrojs/node adapter",
			status: run.status === 0 && hasEntry ? "pass" : "fail",
			observable_result: `exit ${run.status}; dist/server/entry.mjs present: ${hasEntry}`,
			observed_values: { exit_code: run.status, entry_present: hasEntry, ms: run.ms },
			commands: [run.command],
			evidence_files: [file],
			blocked_reason: null,
		});
	}

	// ------------------------------------------------ start the on-demand server
	siteServer = spawn(process.execPath, [path.join(HARNESS, "dist", "server", "entry.mjs")], {
		cwd: HARNESS,
		env: { ...process.env, HOST: "127.0.0.1", PORT: String(SITE_PORT) },
	});
	siteServer.stdout.on("data", (d) => siteOut.push(d.toString()));
	siteServer.stderr.on("data", (d) => siteOut.push(d.toString()));
	const ready = await waitForHttp(`http://127.0.0.1:${SITE_PORT}/`);

	const fetchText = async (url) => {
		const res = await fetch(url, { redirect: "manual" });
		return { status: res.status, csp: res.headers.get("content-security-policy"), body: await res.text() };
	};

	const published = ready.ok ? await fetchText(`http://127.0.0.1:${SITE_PORT}/`) : null;
	const draft = ready.ok ? await fetchText(`http://127.0.0.1:${SITE_PORT}/?version=draft`) : null;
	const second = ready.ok ? await fetchText(`http://127.0.0.1:${SITE_PORT}/poc-test-second-page`) : null;

	if (published) writeFileSync(path.join(RENDERS, "home-published.html"), published.body);
	if (draft) writeFileSync(path.join(RENDERS, "home-draft.html"), draft.body);
	if (second) writeFileSync(path.join(RENDERS, "second-page.html"), second.body);

	// ------------------------- H4 served HTML carries CMS-supplied content
	{
		const needed = [
			"POC Test Shared Feature Definition",
			"Published text for the shared feature block.",
			'data-poc="page-title"',
		];
		const found = needed.filter((s) => published?.body.includes(s));
		// Identity assertion: proves the response came from THIS harness process and
		// not from an unrelated server that happens to hold the port.
		const ownProcess = Boolean(published?.body.includes('data-poc="requested-version"'));
		record({
			check_id: "H4",
			title: "Served HTML renders the story content fetched through the official client",
			status:
				published?.status === 200 && found.length === needed.length && ownProcess ? "pass" : "fail",
			observable_result: `GET / returned ${published?.status} from the harness's own process: ${ownProcess}; ${found.length}/${needed.length} expected POC Test strings present in the served HTML`,
			observed_values: {
				http_status: published?.status ?? null,
				served_by_own_harness_process: ownProcess,
				matched: found,
				missing: needed.filter((s) => !found.includes(s)),
			},
			commands: [
				`node dist/server/entry.mjs (HOST=127.0.0.1 PORT=${SITE_PORT})`,
				`curl-equivalent: fetch http://127.0.0.1:${SITE_PORT}/`,
			],
			evidence_files: [path.posix.join("run-01", "renders", "home-published.html")],
			blocked_reason: null,
		});
	}

	// ------------------------- H5 draft vs published separation over HTTP
	{
		const draftOnly = "DRAFT-ONLY-EDIT-2026-09-22";
		const publishedOnly = "Published text for the shared feature block.";
		record({
			check_id: "H5",
			title: "version=draft and version=published return different bodies from the same route",
			status:
				draft?.body.includes(draftOnly) &&
				!draft.body.includes(publishedOnly) &&
				published?.body.includes(publishedOnly) &&
				!published.body.includes(draftOnly)
					? "pass"
					: "fail",
			observable_result: `/?version=draft contained the draft-only marker: ${Boolean(draft?.body.includes(draftOnly))}; the published route contained the published-only text: ${Boolean(published?.body.includes(publishedOnly))}`,
			observed_values: {
				draft_status: draft?.status ?? null,
				published_status: published?.status ?? null,
				draft_only_marker_present_in_draft: Boolean(draft?.body.includes(draftOnly)),
				published_text_present_in_published: Boolean(published?.body.includes(publishedOnly)),
			},
			commands: [`fetch http://127.0.0.1:${SITE_PORT}/?version=draft`, `fetch http://127.0.0.1:${SITE_PORT}/`],
			evidence_files: [
				path.posix.join("run-01", "renders", "home-draft.html"),
				path.posix.join("run-01", "renders", "home-published.html"),
			],
			blocked_reason: null,
		});
	}

	// ------------------------- H6 same component definition in two stories
	{
		const shared = "POC Test Shared Feature Definition";
		record({
			check_id: "H6",
			title: "One registered component definition renders in two different content items",
			status: published?.body.includes(shared) && second?.body.includes(shared) ? "pass" : "fail",
			observable_result: `the shared feature headline appeared on both / (${Boolean(published?.body.includes(shared))}) and /poc-test-second-page (${Boolean(second?.body.includes(shared))})`,
			observed_values: { second_page_status: second?.status ?? null },
			commands: [`fetch http://127.0.0.1:${SITE_PORT}/poc-test-second-page`],
			evidence_files: [path.posix.join("run-01", "renders", "second-page.html")],
			blocked_reason: null,
		});
	}

	// ------------------------- H7 nested blocks render
	{
		const nested = ["POC Test Teaser One", "POC Test Teaser Two", 'data-blok="grid"'];
		const found = nested.filter((s) => published?.body.includes(s));
		record({
			check_id: "H7",
			title: "Nested blocks (grid with repeated teaser children) render through StoryblokComponent",
			status: found.length === nested.length ? "pass" : "fail",
			observable_result: `${found.length}/${nested.length} nested-block markers present in the served HTML`,
			observed_values: { matched: found },
			commands: [`fetch http://127.0.0.1:${SITE_PORT}/`],
			evidence_files: [path.posix.join("run-01", "renders", "home-published.html")],
			blocked_reason: null,
		});
	}

	// ------------------------- H8 modelled SEO fields reach <head>
	{
		const expected = [
			"<title>POC Test Home | modelled SEO title</title>",
			'<meta name="description" content="POC Test invented meta description (published).">',
			'<meta property="og:title" content="POC Test Home | modelled SEO title">',
			'<meta property="og:image" content="http://127.0.0.1:4399/assets/poc-test-og.png">',
		];
		const head = published?.body.split("</head>")[0] ?? "";
		const found = expected.filter((s) => head.includes(s));
		record({
			check_id: "H8",
			title: "Modelled SEO fields from the content item reach the served <head>",
			status: found.length === expected.length ? "pass" : "fail",
			observable_result: `${found.length}/${expected.length} expected head tags present with the exact invented values`,
			observed_values: { missing: expected.filter((s) => !found.includes(s)) },
			commands: [`fetch http://127.0.0.1:${SITE_PORT}/ (head excerpt)`],
			evidence_files: [path.posix.join("run-01", "renders", "home-published.html")],
			blocked_reason: null,
		});
	}

	// ------------------------- H9 frame-ancestors header (our side only)
	{
		const csp = published?.csp ?? "";
		const ownProcess = Boolean(published?.body.includes('data-poc="requested-version"'));
		record({
			check_id: "H9",
			title: "Site emits the documented frame-ancestors CSP on the on-demand route (our side only)",
			status:
				ownProcess && csp === "frame-ancestors https://app.storyblok.com" ? "pass" : "fail",
			observable_result: `Content-Security-Policy response header from the harness's own process was: ${JSON.stringify(csp)}`,
			observed_values: { csp_header: csp || null, served_by_own_harness_process: ownProcess, vendor_side_tested: false },
			commands: [`fetch http://127.0.0.1:${SITE_PORT}/ (response headers)`],
			evidence_files: [path.posix.join("run-01", "renders", "home-published.html")],
			blocked_reason: null,
			notes:
				"This verifies only that our site can emit the header the Visual Editor requires. Whether app.storyblok.com will accept the iframe, and the vendor's HTTPS-for-localhost requirement, are untested (no account).",
		});
	}

	// ------------------------- H13 visual capture of the local harness pages
	{
		const shots = [
			{ name: "home-published.png", url: `http://127.0.0.1:${SITE_PORT}/` },
			{ name: "home-draft.png", url: `http://127.0.0.1:${SITE_PORT}/?version=draft` },
		];
		const results = [];
		for (const shot of shots) {
			const out = path.join(RENDERS, shot.name);
			const run = spawnSync(
				"chromium",
				[
					"--headless",
					"--disable-gpu",
					"--no-sandbox",
					"--hide-scrollbars",
					"--window-size=1280,900",
					`--screenshot=${out}`,
					shot.url,
				],
				{ encoding: "utf8", timeout: 90000 },
			);
			results.push({
				name: shot.name,
				exit_code: run.status,
				bytes: existsSync(out) ? statSync(out).size : 0,
			});
		}
		const ok = results.every((r) => r.exit_code === 0 && r.bytes > 5000);
		record({
			check_id: "H13",
			title: "Screenshots of the rendered harness pages (local harness UI, not the vendor app)",
			status: ok ? "pass" : "fail",
			observable_result: `${results.length} headless Chromium screenshots captured at 1280x900 (${results.map((r) => `${r.name}=${r.bytes}B`).join(", ")})`,
			observed_values: { screenshots: results, browser: "chromium (headless, --no-sandbox)" },
			commands: results.map((r) => `chromium --headless --window-size=1280,900 --screenshot=${r.name} <url>`),
			evidence_files: results.map((r) => path.posix.join("run-01", "renders", r.name)),
			blocked_reason: null,
			notes:
				"These are pixels of the local harness page. No Storyblok UI exists or was reachable in this run, so no vendor screenshot can be produced.",
		});
	}

	// ------------------------- H11 static (build-time) output also renders
	{
		const run = runAstro(["build"], { env: { POC_ASTRO_OUTPUT: "static" } });
		const file = writeLog("h11-build-static.txt", `$ ${run.command}\nexit=${run.status}\n\n${run.output}\n`);
		const indexFile = path.join(HARNESS, "dist", "index.html");
		const html = existsSync(indexFile) ? read(indexFile) : "";
		writeFileSync(path.join(RENDERS, "static-index.html"), html);
		const ok = run.status === 0 && html.includes("Published text for the shared feature block.");
		record({
			check_id: "H11",
			title: "Static (build-time fetch) output also renders the same content",
			status: ok ? "pass" : "fail",
			observable_result: `static build exit ${run.status}; dist/index.html present: ${existsSync(indexFile)}; published text rendered at build time: ${html.includes("Published text for the shared feature block.")}`,
			observed_values: { exit_code: run.status, index_html_bytes: html.length },
			commands: [run.command],
			evidence_files: [file, path.posix.join("run-01", "renders", "static-index.html")],
			blocked_reason: null,
			notes:
				"Static output emits files, so response-header behaviour (H9) and per-request draft reads do not exist in that mode; the draft path requires the on-demand build.",
		});
	}

	// ------------------------- H14 client script the integration injects
	{
		const html = existsSync(path.join(HARNESS, "dist", "index.html"))
			? read(path.join(HARNESS, "dist", "index.html"))
			: "";
		const srcs = [...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map((m) => m[1]);
		const assets = srcs.map((src) => {
			const assetPath = path.join(HARNESS, "dist", src.replace(/^\//, ""));
			return {
				src,
				bytes: existsSync(assetPath) ? statSync(assetPath).size : null,
				sha256: existsSync(assetPath) ? sha256(readFileSync(assetPath)) : null,
			};
		});
		record({
			check_id: "H14",
			title: "Client-side script the integration injects into the public page (recorded, not judged)",
			status: "pass",
			observable_result: `the public page references ${assets.length} module script(s): ${assets.map((a) => `${a.src} (${a.bytes ?? "missing"} B)`).join(", ") || "none"}`,
			observed_values: { script_tags: assets, bridge_enabled_by_default: true },
			commands: ["read dist/index.html and stat the referenced assets"],
			evidence_files: [path.posix.join("run-01", "renders", "static-index.html")],
			blocked_reason: null,
			notes:
				"Recorded because AGENTS.md treats client JavaScript as a design constraint. The Storyblok Astro integration injects its bridge loader by default; this measurement covers one page of the harness only.",
		});
	}

	// ------------------------- H10 client request transcript from the mock CDN
	{
		const lines = read(mockLogFile).trim().split("\n").filter(Boolean).map((l) => JSON.parse(l));
		// The harness's own readiness probe is an unauthenticated request on purpose
		// and is reported separately rather than counted as a client request.
		const served = lines.filter((l) => l.response_status === 200);
		const rejected = lines.filter((l) => l.response_status === 401);
		const versions = [...new Set(served.map((l) => l.query.version))].sort();
		const allTokenPresent = served.every((l) => l.query.token_present && l.query.token_matches_placeholder);
		const draftRequested = served.some((l) => l.query.version === "draft");
		const publishedRequested = served.some((l) => l.query.version === "published");
		record({
			check_id: "H10",
			title: "Official client sent the expected CDN requests (token present, version parameter)",
			status:
				served.length > 0 && allTokenPresent && draftRequested && publishedRequested ? "pass" : "fail",
			observable_result: `mock CDN served ${served.length} requests to the official client (versions seen: ${versions.join(", ") || "none"}), every one carrying the token parameter; ${rejected.length} unauthenticated request(s) were rejected with 401 by the mock's own token check`,
			observed_values: {
				requests_served: served.length,
				requests_rejected_401: rejected.length,
				versions,
				all_served_requests_token_present: allTokenPresent,
			},
			commands: [`node mock-cdn/server.mjs (MOCK_CDN_LOG=${path.posix.join("run-01", "logs", "mock-cdn-requests.jsonl")})`],
			evidence_files: [path.posix.join("run-01", "logs", "mock-cdn-requests.jsonl")],
			blocked_reason: null,
			notes:
				"The CDN base URL was redirected to 127.0.0.1 by the harness endpoint override; the request shape (path, query parameters) is generated by the unmodified official client.",
		});
	}

	// ------------------------- H12 hygiene: no credential value in evidence
	{
		const offenders = [];
		const walk = (dir) => {
			for (const entry of readdirSync(dir, { withFileTypes: true })) {
				const full = path.join(dir, entry.name);
				if (entry.isDirectory()) walk(full);
				else if (entry.name !== "MANIFEST.sha256")
					if (read(full).includes(PLACEHOLDER_TOKEN)) offenders.push(path.relative(EVIDENCE, full));
			}
		};
		walk(EVIDENCE);
		record({
			check_id: "H12",
			title: "No credential value appears anywhere in the evidence tree",
			status: offenders.length === 0 ? "pass" : "fail",
			observable_result:
				offenders.length === 0
					? "no evidence file contains the invented placeholder token value; no real credential was ever configured"
					: `credential value found in: ${offenders.join(", ")}`,
			observed_values: { offenders },
			commands: ["scan evidence tree for the placeholder token value"],
			evidence_files: [],
			blocked_reason: null,
		});
	}
} finally {
	// ------------------------------------------------------------- teardown ---
	for (const proc of [siteServer, mock]) {
		if (proc && proc.exitCode === null) proc.kill("SIGTERM");
	}
	if (mockOut.length) writeLog("mock-cdn-server-output.txt", redact(mockOut.join("")));
	if (siteOut.length) writeLog("site-server-output.txt", redact(siteOut.join("")));

	// --------------------------------------------------------- environment ---
	const lock = path.join(HARNESS, "package-lock.json");
	const pkg = JSON.parse(read(path.join(HARNESS, "package.json")));
	const installed = (name) => {
		const manifest = path.join(HARNESS, "node_modules", name, "package.json");
		return existsSync(manifest) ? JSON.parse(read(manifest)).version : null;
	};
	const environment = {
		run_id: RUN_ID,
		candidate: "c2-storyblok",
		evidence_class: "harness",
		recorded_at: new Date().toISOString(),
		host: {
			os: readFileSync("/etc/os-release", "utf8").split("\n")[0],
			node: process.version,
			npm: spawnSync("npm", ["--version"], { encoding: "utf8" }).stdout.trim(),
			cpu_count: (await import("node:os")).cpus().length,
			total_mem_mb: Math.round((await import("node:os")).totalmem() / 1024 / 1024),
			python: spawnSync("python3", ["--version"], { encoding: "utf8" }).stdout.trim(),
			node_env_on_host: process.env.NODE_ENV ?? "(unset)",
			node_env_note:
				"the host exports NODE_ENV=production, so plain `npm install` silently omits devDependencies (@astrojs/check, typescript); they must be installed with `npm install --include=dev` or the type-check step cannot run",
		},
		packages: {
			astro: installed("astro"),
			"@storyblok/astro": installed("@storyblok/astro"),
			"@storyblok/js": installed("@storyblok/js"),
			"storyblok-js-client": installed("storyblok-js-client"),
			"@astrojs/node": installed("@astrojs/node"),
			"@astrojs/check": installed("@astrojs/check"),
			typescript: installed("typescript"),
			declared_in_package_json: pkg.dependencies,
		},
		lockfile: existsSync(lock)
			? { path: "harness/package-lock.json", sha256: sha256(read(lock)), bytes: statSync(lock).size }
			: null,
		network_egress: {
			vendor_api_contacted: false,
			during_run_endpoint: `http://127.0.0.1:${MOCK_PORT}/v2 (local mock CDN; no Storyblok host is contacted by the harness)`,
			npm_registry_used: "yes, to install the official packages listed above",
		},
		ports: {
			site_http: SITE_PORT,
			mock_cdn_http: MOCK_PORT,
			plan_reserved_ports: { "candidate 1 (EmDash)": [4321], "candidate 2 (Storyblok)": [4322, 4323] },
			foreign_process_observed:
				"an EmDash POC dev server (astro dev --port 4321) from a sibling task was listening on 4321 during this run; it must not be disturbed, and this harness moved to 4322/4399 and asserts its own process identity (H0, H4)",
		},
		secrets_configured: {
			names_only: ["STORYBLOK_DELIVERY_API_TOKEN"],
			values_real: false,
			note: "the only configured value is the invented placeholder; no Storyblok account, space, or token exists in this POC",
		},
		local_ca: { mkcert_present: true, chromium_nssdb: false, https_preview_attempted: false },
		environments: { POC_ASTRO_OUTPUT: ["static (H11)", "server (H3–H9)"] },
		no_account_created: true,
		no_payment: true,
		no_deployment: true,
	};
	writeFileSync(path.join(EVIDENCE, "environment.json"), `${JSON.stringify(environment, null, 2)}\n`);
}

// ------------------------------------------------------------- operations ---
const ops = [
	["O1", "create_content", "O1", "blocked", "ACCOUNT_REQUIRED", "Creating a story requires a Storyblok account and space (pricing page: 1 space, 1 included seat on the free Starter plan; no account exists in this environment)."],
	["O2", "edit_text", "O2", "blocked", "ACCOUNT_REQUIRED", "Editing a text field requires the vendor's editor surface; no account. Starter's version/activity retention of 1 day is an additional expected limitation (pricing comparison table, observed 2026-09-22)."],
	["O3", "upload_select_image", "O3-a", "blocked", "ACCOUNT_REQUIRED", "The Asset Manager is inside the vendor app; no account."],
	["O3", "upload_select_image", "O3-b", "blocked", "ACCOUNT_REQUIRED", "Serving an asset through the vendor CDN/image service requires a real space asset; no account. Pricing FAQ 13 (observed 2026-09-22) also records that Storyblok may restrict certain file types in unverified spaces."],
	["O4", "preview_draft", "O4-a", "blocked", "ACCOUNT_REQUIRED", "A draft fetch against the real CDN requires a preview token issued from a space (Access Tokens page, observed 2026-09-22). The harness proves the client sends version=draft and the token parameter, but no vendor response was ever fetched."],
	["O4", "preview_draft", "O4-b", "blocked", "ACCOUNT_REQUIRED", "The Visual Editor only exists with an account. Second, independent gate if an account existed: the Visual Editor page states Storyblok's security policy requires the preview to be served over HTTPS, 'whether deployed or on localhost'."],
	["O4", "preview_draft", "O4-c", "blocked", "ACCOUNT_REQUIRED", "CSP/frame acceptance is decided by the vendor's editor origin; only our own header emission was verified (harness check H9)."],
	["O5", "publish", "O5-a", "blocked", "ACCOUNT_REQUIRED", "Publishing a story requires the vendor app or a management token; no account."],
	["O5", "publish", "O5-b", "blocked", "ACCOUNT_REQUIRED", "Draft/published separation was exercised only against the local mock fixtures, which cannot evidence vendor behaviour."],
	["O5", "publish", "O5-c", "blocked", "PLAN_GATED", "Scheduled single stories appear on the Growth/Growth Plus cards and the comparison table shows Starter blank (pricing page observed 2026-09-22).",],
	["O6", "edit_seo", "O6-a", "blocked", "ACCOUNT_REQUIRED", "Modelled SEO fields render in the harness (H8), but an editor setting those values in the CMS requires an account."],
	["O6", "edit_seo", "O6-b", "blocked", "PLAN_GATED", "'SEO meta tags' is listed as a Growth/Growth Plus enhancement on the pricing page and is absent from the Starter card's 'Start with' list (observed 2026-09-22); whether the native feature is reachable on Starter cannot be confirmed without an account."],
	["O7", "reuse_page_sections", "O7", "blocked", "ACCOUNT_REQUIRED", "Component definition reuse was verified in code (harness check H6); real component creation, the block library, and copy-vs-reference semantics for content live in the vendor app."],
	["O8", "manage_permissions", "O8-a", "blocked", "ACCOUNT_REQUIRED", "A second editable actor needs an account, an invited user, and an accepted invite."],
	["O8", "manage_permissions", "O8-b", "blocked", "ACCOUNT_REQUIRED", "A real denial (HTTP 403/route refusal) cannot be produced without the vendor app. Secondary gate: the Starter plan caps seats at 2 and invites are accepted by email, so a second deliverable inbox would also be required."],
	["O8", "manage_permissions", "O8-c", "blocked", "ACCOUNT_REQUIRED", "Revocation cannot be exercised without users."],
	["O9", "export", "O9-a", "blocked", "ACCOUNT_REQUIRED", "CLI export (storyblok login / sync / pull-components) and Management API export both require a personal or OAuth token from a real account (CLI and access-token docs observed 2026-09-22)."],
	["O9", "export", "O9-b", "blocked", "ACCOUNT_REQUIRED", "No space content exists to export."],
	["O9", "export", "O9-c", "blocked", "ACCOUNT_REQUIRED", "Exclusion assertions need a real export artifact."],
	["O10", "recover_from_backup", "O10-a", "blocked", "ACCOUNT_REQUIRED", "There is no space content to damage and restore."],
	["O10", "recover_from_backup", "O10-b", "blocked", "ACCOUNT_REQUIRED", "The documented restore UI (Settings -> Backup & Restore) is inside the vendor app; the backups page also shows the restore dropdown lists only backups from the last 30 days, and older files must be referenced by an S3 path."],
	["O10", "recover_from_backup", "O10-c", "blocked", "PLAN_GATED", "Managed backup requires the S3 Backups app plus a customer-owned AWS bucket, Role ARN and CloudFormation stack; the pricing comparison table shows S3 backup frequency for Premium (Weekly) and Elite (Daily) only, with Starter/Growth/Growth Plus blank (observed 2026-09-22)."],
];

checks.sort((a, b) => a.check_id.localeCompare(b.check_id, "en", { numeric: true }));

const operationsLines = ops.map(
	([operation_id, operation, criterion_id, status, blocked_reason, blocked_evidence]) =>
		JSON.stringify({
		run_id: RUN_ID,
		candidate: "c2-storyblok",
		operation_id,
		operation,
		criterion_id,
		status,
		actor_role: "anonymous",
		observable_result: `operation not executed: ${blocked_reason}`,
		observed_values: {},
		evidence_files: [],
		blocked_reason,
		blocked_evidence,
		started_at: null,
		ended_at: null,
		minutes: 0,
		notes: "Recorded by the credential-free harness run. See harness-checks.json for what was verified locally instead.",
		redacted: true,
	}),
);
writeFileSync(path.join(EVIDENCE, "operations.jsonl"), `${operationsLines.join("\n")}\n`);
writeFileSync(
	path.join(EVIDENCE, "harness-checks.json"),
	`${JSON.stringify(
		{
			run_id: RUN_ID,
			candidate: "c2-storyblok",
			evidence_class: "harness",
			scope_statement:
				"These checks verify the local harness and the request behaviour of the unmodified official client against a local mock CDN. They are NOT evidence of any Storyblok product operation; every protocol operation remains blocked in operations.jsonl.",
			checks,
		},
		null,
		2,
	)}\n`,
);

const counts = checks.reduce((acc, c) => ({ ...acc, [c.status]: (acc[c.status] ?? 0) + 1 }), {});
const opCounts = ops.reduce((acc, op) => ({ ...acc, [op[3]]: (acc[op[3]] ?? 0) + 1 }), {});
checks.sort((a, b) => a.check_id.localeCompare(b.check_id, "en", { numeric: true }));
writeFileSync(
	path.join(EVIDENCE, "summary.json"),
	`${JSON.stringify(
		{
			run_id: RUN_ID,
			candidate: "c2-storyblok",
			verdict:
				"Candidate 2 (Storyblok) could not be executed. No account, space, session, or token exists in this environment, and creating one is not authorized for this task; every protocol operation O1–O10 is blocked at the account gate. A credential-free Astro integration harness was built and verified instead.",
			harness_check_counts: counts,
			protocol_operation_counts: opCounts,
			protocol_blocked_reasons: [...new Set(ops.map((op) => op[4]))],
			operations_total: ops.length,
			account_dependent_criteria: ops.length,
			criteria_passed: 0,
			account_created: false,
			payment_made: false,
			deployment_made: false,
			run_started_at: RUN_ID.slice(0, 19),
			elapsed_minutes_total: Number(((Date.now() - RUN_STARTED_MS) / 60000).toFixed(2)),
			elapsed_minutes_astro_commands: Number(
				(checks.reduce((sum, c) => sum + (c.observed_values?.ms ?? 0), 0) / 60000).toFixed(2),
			),
		},
		null,
		2,
	)}\n`,
);

// ------------------------------------------------------------- manifest -----
const files = [];
const walk = (dir) => {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) walk(full);
		else if (entry.name !== "MANIFEST.sha256") files.push(full);
	}
};
walk(EVIDENCE);
files.sort();
const manifest = files
	.map((f) => `${sha256(readFileSync(f))}  ${path.relative(path.dirname(EVIDENCE), f)}`)
	.join("\n");
writeFileSync(path.join(EVIDENCE, "MANIFEST.sha256"), `${manifest}\n`);

process.stdout.write(`\noperations: ${JSON.stringify(opCounts)}\nharness checks: ${JSON.stringify(counts)}\n`);
process.stdout.write(`evidence: ${EVIDENCE}\n`);
