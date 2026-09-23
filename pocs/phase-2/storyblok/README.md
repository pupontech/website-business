# P2.5 — Storyblok POC harness (credential-free)

Isolated, disposable POC for the Storyblok candidate of `research/phase-2/poc-plan.md`.
**No Storyblok account exists.** Nothing in this directory contacts a Storyblok host,
and no credential, token, space, plan or payment was created. The official client is
pointed at a local mock CDN so the integration code path can be exercised and asserted
without an account.

The report and every operation status live in `../../../research/phase-2/poc-storyblok.md`.

## What this harness is for

| It verifies (locally) | It does NOT verify (needs an account) |
|---|---|
| The official packages install, typecheck and build | Anything about the Storyblok product |
| The documented integration setup, and where that documented setup fails | Visual Editor behaviour, roles, permissions, publishing |
| The request shape the official client emits (`version=draft|published`, token parameter) | Real draft/published content separation |
| Block registration, nested blocks, one component in two stories | The vendor's component/blocks library, asset manager |
| Modelled SEO fields reaching `<head>` | The vendor's native SEO feature or its plan gating |
| Our side of the `frame-ancestors` CSP requirement | Whether app.storyblok.com accepts the iframe |
| Static and on-demand rendering of the same components | Preview over HTTPS on localhost |

Every protocol operation `O1`–`O10` is recorded **blocked** in
`evidence/run-01/operations.jsonl` — a blocked operation is a result, not an omission.

## Layout

```
harness/
  astro.config.ts               integration setup (see "deviations" below)
  astro.config.documented.mjs   the official guide's config verbatim, built once (check H2)
  .env.example / .env           invented placeholder values only (.env is gitignored)
  src/
    layouts/Layout.astro        modelled SEO fields -> <head>
    middleware.ts               frame-ancestors CSP (documented requirement)
    pages/index.astro           fetch cdn/stories/home (official guide pattern)
    pages/poc-test-second-page.astro  second content item, same feature component
    storyblok/{Page,Feature,Teaser,Grid}.astro  registered components
  mock-cdn/server.mjs           local Storyblok-CDN-shaped server + request transcript
  mock-cdn/fixtures.mjs         invented "POC Test" data (no real content)
  scripts/harness-checks.mjs    runs every check and writes ../evidence/run-01/**
```

## Run it

```bash
cd pocs/phase-2/storyblok/harness
npm install --include=dev --no-audit --no-fund   # --include=dev is required on this host
node scripts/harness-checks.mjs                  # writes evidence and prints all check statuses
```

`--include=dev` matters: this host exports `NODE_ENV=production`, so a plain
`npm install` silently omits `@astrojs/check` and `typescript`, and `astro check`
then exits 0 after printing an interactive "dependency required" prompt — a false pass.

Run the harness rather than `npm run build` alone for the isolated proof. A bare
`npm run check` passes, but a bare `npm run build` fails with `fetch failed`
because these static routes fetch the local mock CDN during prerender and that
server is not running. The harness starts/stops its own mock server and checks
both static and server builds. This failure is not a test of Storyblok's service.

Individual steps, if needed:

```bash
node_modules/.bin/astro check                       # typecheck
POC_ASTRO_OUTPUT=static node_modules/.bin/astro build
POC_ASTRO_OUTPUT=server node_modules/.bin/astro build
node mock-cdn/server.mjs &                          # mock CDN on 127.0.0.1:4399
HOST=127.0.0.1 PORT=4322 node dist/server/entry.mjs # site on 127.0.0.1:4322
```

Ports: site `4322` (the port `poc-plan.md` §8.3 reserves for candidate 2), mock CDN
`4399` (harness-internal). Do not use `4321`: a sibling EmDash POC owns it.

## Deliberate deviations from the official guide

1. `apiOptions.endpoint` is set from `STORYBLOK_POC_ENDPOINT`. `endpoint` is an official
   field of the underlying `storyblok-js-client` config (`ISbConfig`), but it is not in the
   Storyblok Astro guide. It exists here only so no vendor host is contacted.
2. The routes read `?version=draft|published` from the request query instead of
   hard-coding `version: "draft"`, so both paths can be asserted separately.
3. `output` is env-selectable, because the guide's documented `output: "server"` fails to
   build without an adapter (see the report, finding F2).
4. Routes own the document shell; the `page` component is content-only. The guide's
   examples place the layout inside the content component, which produces a nested
   `<head>` inside `<body>` and silently loses the SEO tags the head assertions check.

## Evidence

`evidence/run-01/` — `environment.json`, `harness-checks.json` (H0–H14),
`operations.jsonl` (O1–O10 blocked), `summary.json`, `MANIFEST.sha256`, `logs/`, `renders/`.

Verify the evidence hashes:

```bash
cd pocs/phase-2/storyblok/evidence
sha256sum -c run-01/MANIFEST.sha256
```
