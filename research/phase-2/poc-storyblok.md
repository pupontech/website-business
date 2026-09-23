# P2.5 — Storyblok POC attempt (candidate 2)

**Task:** t_af9c1ab5 — P2.5, attempt the Storyblok proof of concept under the identical Phase 2 protocol.
**Run date (all commands, hashes and page retrievals in this document):** 2026-09-22, UTC.
**Verdict:** **BLOCKED at the account gate.** No Storyblok account, space, session, token or CLI exists in this environment, and creating one is not authorized for this task. **Zero of the 22 protocol criteria (O1–O10 sub-criteria) could be executed; all 22 are recorded `blocked` with their exact gate, not omitted.** What was executed is a credential-free Astro integration harness: **15/15 harness checks pass**, all machine-checkable. Evidence: `pocs/phase-2/storyblok/evidence/run-01/` (`sha256sum -c run-01/MANIFEST.sha256` from the `evidence/` directory → 17/17 OK).

**What this document is not.** It is not evidence about Storyblok's product. Every harness check runs against a local mock CDN; the vendor was never contacted. No operation is marked `pass` on the strength of documentation, a marketing page, or a settings screenshot (protocol rule R1). Plan/pricing statements below are marked **observed** only where this run read the exact first-party page text on 2026-09-22; everything else the parent artifact asserted is left as inherited, not re-verified here.

---

## 1. Authorization, scope, and the exact gate

| Step | Command / check | Result |
|---|---|---|
| Credentials in the environment | inspect environment variable **names** only | no `STORYBLOK_*` variable exists (the only match was an unrelated `TERMINAL_DOCKER_SHARED_CONTAINER_KEY`) |
| Storyblok CLI | `which storyblok sb` | absent |
| CLI config/session | `ls ~/.storyblok`, `~/.config/storyblok`, `~/.netrc`, `~/.npmrc` | all absent — no stored session or token |
| Local `.env` files | repository scan | none existed before this task; the only `.env` created is this harness's placeholder file (gitignored) |
| Signup | **not attempted** | the task forbids creating an account; `AGENTS.md`/`DECISIONS.md` D-002/D-003 allow no external commitment without owner approval |

**Gate: `ACCOUNT_REQUIRED`.** Storyblok is a hosted platform: creating a story requires an account and a space, and the free Starter plan includes 1 seat with a maximum of 2 (*observed* on `https://www.storyblok.com/pricing`, 2026-09-22: "Includes 1 team member seat, add 1 more user at $15.00 /month", comparison row "Users/Seats Maximum: max 2"). The signup path itself is documented as free — *observed* FAQ 03 on the same page: "No! Every space comes with a 45-day free trial on our Growth Plus plan. At any time you can provide payment for a plan with the features you want, or continue building on the Starter plan, which is always free and requires no credit card." **That statement was not acted on:** no signup, no trial, no card, no plan. It is recorded because it tells the owner precisely what an authorized run would cost (a free account and a declined Growth Plus trial), not as evidence that any operation works.

**Consequences for the protocol.** Rule R3 makes `blocked` a first-class result, so §5 lists every sub-criterion with its gate. Rule R6's timebox was consumed by the harness work instead; the account-gated operations were never started, and are recorded `blocked` rather than `not_attempted` because the gate was identified by direct observation, not assumed.

---

## 2. What was built and verified instead

A disposable harness at `pocs/phase-2/storyblok/harness/` (see its `README.md`): an Astro 7 project in TypeScript using the official `@storyblok/astro` integration and the documented component/block registration pattern, plus a local mock of the Storyblok CDN v2 story endpoint serving invented "POC Test" fixtures (protocol rule R7). The mock records a request transcript containing request path, `version` parameter and token **presence** — never a token value.

```
pocs/phase-2/storyblok/harness/         code (npm-installable, 17 files outside node_modules/dist)
pocs/phase-2/storyblok/evidence/run-01/ evidence (17 artifacts + MANIFEST.sha256)
```

### 2.1 Harness checks (H0–H14) — all pass

| ID | Check | Status | Observable result | Evidence |
|---|---|---|---|---|
| H0 | Ports and client endpoint consistent before the run | pass | 4322 and 4399 free before start; configured endpoint `http://127.0.0.1:4399/v2` matches the mock | `harness-checks.json` |
| H1 | TypeScript typecheck of the harness | pass | `astro check` → **0 errors, 0 warnings, 0 hints** (7 files) | `logs/h1-astro-check.txt` |
| H2 | The official guide's config (`output: "server"`, no adapter), built once | pass (records a **doc defect**, §3 F2) | build **fails** exit 1: `[NoAdapterInstalled] Cannot use server-rendered pages without an adapter` | `logs/h2-build-documented-config.txt` |
| H3 | On-demand build with the official `@astrojs/node` adapter | pass | exit 0, `dist/server/entry.mjs` present | `logs/h3-build-server-adapter.txt` |
| H4 | Served HTML renders the story the official client fetched | pass | `GET /` → 200 from the harness's own process; 3/3 expected POC Test strings present | `renders/home-published.html` |
| H5 | `version=draft` and `version=published` return different bodies from one route | pass | draft route contains the draft-only marker and not the published text; published route the reverse | `renders/home-draft.html`, `renders/home-published.html` |
| H6 | One registered component definition renders in two different content items | pass | shared `feature` component rendered on `/` and `/poc-test-second-page` | `renders/second-page.html` |
| H7 | Nested blocks (grid → repeated teasers) render | pass | 3/3 nested markers present | `renders/home-published.html` |
| H8 | Modelled SEO fields reach the served `<head>` | pass | 4/4 head tags with the exact invented values (`title`, `description`, `og:title`, `og:image`) | `renders/static-index.html` |
| H9 | Site emits the documented `frame-ancestors` CSP (our side only) | pass | header exactly `frame-ancestors https://app.storyblok.com` | `harness-checks.json` |
| H10 | Request transcript of the unmodified official client | pass | local mock served **8** requests, versions seen `draft` + `published`, token parameter present on **all**; **1** unauthenticated probe correctly refused 401 | `logs/mock-cdn-requests.jsonl` |
| H11 | Static (build-time fetch) output renders the same content | pass | static build exit 0; published text rendered at build time | `logs/h11-build-static.txt`, `renders/static-index.html` |
| H12 | No credential value anywhere in the evidence tree | pass | 0 offenders; no real credential was ever configured | `harness-checks.json` |
| H13 | Screenshots of the rendered harness pages (1280×900, headless Chromium 153) | pass | 2 PNGs captured; visually inspected — title, feature section and both teaser headings render | `renders/home-published.png`, `renders/home-draft.png` |
| H14 | Client script the integration injects into the public page (recorded, not judged) | pass | 1 module script: `/_astro/page.*.js`, **2271 B** | `harness-checks.json` |

Every check that depends on an HTTP response also asserts that the responder is *this* harness's process (`data-poc="requested-version"` in the body), because the first run of this harness was silently answered by a foreign server (§3 F5).

### 2.2 Rendering the assertions were made against

`renders/static-index.html` (1151 B, sha256 `29c7aba4…`):

```html
<title>POC Test Home | modelled SEO title</title>
<meta name="description" content="POC Test invented meta description (published).">
<meta property="og:title" content="POC Test Home | modelled SEO title">
<meta property="og:image" content="http://127.0.0.1:4399/assets/poc-test-og.png">
<script type="module" src="/_astro/page.CZkWFe1x.js"></script>   <!-- bridge loader, H14/F6 -->
<p data-poc="requested-version">published</p>
<main data-blok="page"><h1 data-poc="page-title">POC Test Home</h1>
<section class="feature" data-blok="feature"><h2>POC Test Shared Feature Definition</h2>
<p>Published text for the shared feature block.</p></section>
<div class="grid" data-blok="grid">…POC Test Teaser One…POC Test Teaser Two…</div></main>
```

---

## 3. Findings (all machine-checked in this run)

**F1 — The parent's `UNKNOWN` on the replacement package is now resolved.** `research/phase-2/cms-capabilities.md` §3.3 recorded that "release cadence, package location, or license metadata for the replacement monorepo's Astro package" were not independently verified. Registry facts read during this run (`npm view`, 2026-09-22): `@storyblok/astro@10.3.2`, **licence MIT**, repository `git+https://github.com/storyblok/monoblok.git` — i.e. the maintained package lives in the `monoblok` monorepo under the same MIT licence as the archived `storyblok-astro` repository. The CLI package `storyblok` is at `4.23.0` and `@storyblok/js` at `6.3.2` (installed), resolved to `storyblok-js-client@7.7.6` in this run's lockfile.

**F2 — The official Astro guide's configuration does not build as written.** The guide (`https://www.storyblok.com/docs/guides/astro`, re-read 2026-09-22) sets `output: "server"` and never mentions an adapter. Building that configuration verbatim — `harness/astro.config.documented.mjs`, which reproduces the guide's snippet — fails:

```
[NoAdapterInstalled] Cannot use server-rendered pages without an adapter.
Please install and configure the appropriate server adapter for your final deployment.
```

Adding the official `@astrojs/node@11.1.6` adapter makes the same project build (check H3). This is a real, reproducible gap in the first-party setup instructions, and it matters commercially: the documented setup path is the one a delivery process would copy.

**F3 — Documented test context has drifted from current packages.** The same guide states it was tested with `astro@5.7.14`, `storyblok-astro@6.2.0`, Node `v22.13.0`. This run installed `astro@7.3.3` / `@storyblok/astro@10.3.2` on Node `v22.23.2`; the integration still typechecks and renders (H1, H11), which is *our* observation, not a vendor claim about the tested matrix.

**F4 — Host environment trap for any future SDK work.** This host exports `NODE_ENV=production`, so a plain `npm install` in a fresh Astro project silently omits devDependencies. `astro check` then prints an interactive "Astro requires `@astrojs/check`" prompt and **exits 0** — a false pass that the first harness run produced and that H1 now detects explicitly (`aborted_on_missing_dependency`). Install with `npm install --include=dev`.

**F5 — `poc-plan.md` §8.3's port allocation is not concurrency-safe.** The plan assigns 4321 to candidate 1 and 4322/4323 to candidate 2, on the assumption (its own recommendation) that the POCs run sequentially. On this host an EmDash POC dev server (`astro dev --port 4321`, pid 29207) was running concurrently and **answered this harness's first HTTP checks**, producing a plausible-looking but meaningless pass/fail set until it was caught. The harness now uses 4322 (its own reserved port) and 4399, records the collision (H0), and asserts process identity (H4). The sibling process was left untouched. **This is evidence for the synthesis that two POCs on one host must be serialized or given disjoint, verified ports.**

**F6 — The integration injects a client script by default.** The public page emits `/_astro/page.*.js` (2271 B) — the Storyblok bridge loader, enabled by default. Recorded, not judged, because `AGENTS.md` treats client JavaScript as a design constraint; whether the bridge is needed on public pages (as opposed to preview) is a configuration decision a delivery standard must make explicitly.

**F7 — Plan rows observed this run** (all from the *pricing* comparison table, `https://www.storyblok.com/pricing`, 2026-09-22; quoted, not inferred):

| Row | Starter | Growth | Premium / Elite |
|---|---|---|---|
| Users/seats included / maximum | 1 / **max 2** | 5 / max 10 | custom |
| Costs per additional seat | $15.00 | $15.00 | custom |
| Content versioning / activity / webhook-log retention | **1 day** | 30 days | 180 days / unlimited |
| Preview URLs | **2** | 6 | unlimited |
| Scheduled single stories | *(blank)* | 2 | 100 |
| "SEO meta tags" | not listed on the Starter card | listed as a Growth enhancement | listed |
| Custom roles / workflows, Environments, SSO, SCIM | *(blank)* | *(blank)* | listed |
| S3 Backup Frequency | *(blank)* | *(blank)* | **Weekly** / **Daily** |

Also observed: FAQ 13 — "Storyblok reserves the right to restrict certain file types in unverified spaces"; the backups page — restore is configured in Settings → Backup & Restore, the restore dropdown "displays backups created within the last 30 days", and older archives must be referenced by an explicit S3 path; the roles page — default roles are Admin / Editor / Owner, with Editor able to "Manage content, assets, and tags"; the access-tokens page — public tokens reach `published` content, preview tokens reach `draft` **and** `published`; the Visual Editor page — "Storyblok's security policy requires that you serve the preview over HTTPS (whether deployed or on localhost)" and the documented CSP is `frame-ancestors https://app.storyblok.com`. **None of these were tested in the product.**

---

## 4. Protocol operation status (O1–O10) — every sub-criterion

Source of every record: `evidence/run-01/operations.jsonl` (schema per `poc-plan.md` §7). `actor_role` is recorded `anonymous` because no authenticated actor existed and no request was ever sent to a Storyblok host.

| Op | Criterion | Status | Gate | Blocked evidence (exact) |
|---|---|---|---|---|
| O1 create content | O1 | **blocked** | ACCOUNT_REQUIRED | creating a story needs an account and a space (1 space / 1 seat on Starter, observed) |
| O2 edit text | O2 | **blocked** | ACCOUNT_REQUIRED | the editor surface is inside the vendor app; Starter retains versions 1 day (observed row) |
| O3 image | O3-a upload | **blocked** | ACCOUNT_REQUIRED | Asset Manager is inside the vendor app |
| O3 image | O3-b render/select | **blocked** | ACCOUNT_REQUIRED | serving a vendor CDN asset needs a real space; unverified spaces may have file-type restrictions (FAQ 13, observed) |
| O4 preview draft | O4-a draft fetch | **blocked** | ACCOUNT_REQUIRED | a real draft fetch needs a preview token issued from a space (access-tokens page, observed). Harness H10 shows the client does send `version=draft` + token parameter |
| O4 preview draft | O4-b Visual Editor bridge | **blocked** | ACCOUNT_REQUIRED | the Visual Editor cannot exist without a space. Second, independent gate if an account existed: HTTPS is required "whether deployed or on localhost" (observed) — the host has mkcert 1.4.4 but **no Chromium NSS trust store** (`~/.pki/nssdb` absent, no `certutil`), so this is the expected first failure point |
| O4 preview draft | O4-c expiry / CSP | **blocked** | ACCOUNT_REQUIRED | frame acceptance is decided by the vendor origin; only our own header emission was verified (H9) |
| O5 publish | O5-a publish | **blocked** | ACCOUNT_REQUIRED | publishing requires the vendor app or a management token |
| O5 publish | O5-b draft/published separation | **blocked** | ACCOUNT_REQUIRED | exercised against local fixtures only (H5) — that cannot evidence vendor behaviour |
| O5 publish | O5-c scheduling | **blocked** | PLAN_GATED | scheduling rows: Starter blank, Growth = 2 (observed) |
| O6 SEO | O6-a modelled fields | **blocked** | ACCOUNT_REQUIRED | H8 proves the render path; an editor setting values in the CMS needs an account |
| O6 SEO | O6-b native SEO feature | **blocked** | PLAN_GATED | "SEO meta tags" appears as a Growth/Growth Plus enhancement and is absent from the Starter card (observed); whether it is reachable on Starter is unconfirmed without an account |
| O7 reuse sections | O7 | **blocked** | ACCOUNT_REQUIRED | H6 proves one component definition renders in two content items; creating components, the block library, and content-level copy-vs-reference semantics live in the vendor app |
| O8 permissions | O8-a editor can edit | **blocked** | ACCOUNT_REQUIRED | needs an invited, accepted second actor |
| O8 permissions | O8-b editor cannot administer | **blocked** | ACCOUNT_REQUIRED | a real denial (403 / missing route / rejected API call) cannot be produced without the app. Secondary gate: Starter caps seats at **2** and invites are accepted by email, so a second deliverable inbox would also be required — `SECOND_INBOX_REQUIRED` is the next gate, not a pass |
| O8 permissions | O8-c revocation | **blocked** | ACCOUNT_REQUIRED | no users to revoke |
| O9 export | O9-a export produced | **blocked** | ACCOUNT_REQUIRED | `storyblok login` and Management-API export both need a personal or OAuth token from a real account |
| O9 export | O9-b contents asserted | **blocked** | ACCOUNT_REQUIRED | no space content exists to export |
| O9 export | O9-c exclusions | **blocked** | ACCOUNT_REQUIRED | needs a real export artifact |
| O10 recovery | O10-a restore exercised | **blocked** | ACCOUNT_REQUIRED | no space content to damage and restore |
| O10 recovery | O10-b documented restore path | **blocked** | ACCOUNT_REQUIRED | restore UI is inside the vendor app; the 30-day dropdown / S3-path caveat is documented (observed) and untested |
| O10 recovery | O10-c vendor backup path | **blocked** | PLAN_GATED | **Backup gate, explicit:** managed backup = S3 Backups app + customer-owned AWS bucket + Role ARN + CloudFormation stack; S3 backup frequency exists only on Premium (Weekly) and Elite (Daily); Starter, Growth and Growth Plus are blank (observed). Nothing on the self-serve tiers gives the client a managed restore path |

**Counts** (`summary.json`): 22 blocked — **19 × ACCOUNT_REQUIRED, 3 × PLAN_GATED** (O5-c, O6-b, O10-c) — 0 pass, 0 fail, 0 partial, 0 not_attempted. Cross-candidate comparison rule (`poc-plan.md` §7): because candidate 2 is blocked end-to-end, **the synthesis may not compare its operations against candidate 1's results as if they were measured**; the asymmetry must be stated wherever they are compared.

---

## 5. Explicitly untested

1. Everything vendor-side: content creation, editing, assets, publishing, scheduling, SEO features, roles, permissions, revocation, export, backup, restore, history.
2. The Visual Editor's iframe bridge, click-to-edit, outlines, and the HTTPS/localhost requirement — the CSP header is only verified on **our** side (H9).
3. Real draft/published separation (H5 proves our routing, not Storyblok's).
4. Whether the native SEO feature is reachable on Starter (page text suggests not; unconfirmed).
5. Whether `@storyblok/astro@10.3.2` behaves the same against the real CDN: the client request shape was verified, its response handling only against a mock that mirrors the documented payload.
6. Asset handling, image transforms, private assets, the asset token.
7. Any price, limit or gate other than the rows quoted in F7 — no plan was purchased and no subscription screen was opened.

**A credentialed run would additionally require (owner decisions, not taken here):** one free Starter space; declining the 45-day Growth Plus trial; a second email inbox for the invited Editor; no payment details; deleting the disposable space afterwards. Expect O6-b, O5-c, O9 and O10 to remain partially gated even then (F7).

---

## 6. Commands, versions, and elapsed time

```bash
cd pocs/phase-2/storyblok/harness
npm install --include=dev --no-audit --no-fund     # 268 + 26 + 75 packages (3 installs during setup)
node scripts/harness-checks.mjs                    # all checks + evidence + manifest
node_modules/.bin/astro build --config astro.config.documented.mjs   # documented config (expected failure)
POC_ASTRO_OUTPUT=server node_modules/.bin/astro build
node mock-cdn/server.mjs                           # 127.0.0.1:4399
HOST=127.0.0.1 PORT=4322 node dist/server/entry.mjs
chromium --headless --disable-gpu --no-sandbox --window-size=1280,900 --screenshot=<png> <url>
cd ../evidence && sha256sum -c run-01/MANIFEST.sha256
```

Versions — Node `v22.23.2`, npm `10.9.8`, Python `3.13.5`, Chromium `153.0.8010.47`, astro `7.3.3`, `@storyblok/astro` `10.3.2`, `@storyblok/js` `6.3.2`, `storyblok-js-client` `7.7.6`, `@astrojs/node` `11.1.6`, `@astrojs/check` `0.9.10`, TypeScript `5.9.3`; lockfile `harness/package-lock.json` sha256 `3e0f45b0…`. Host: 2 vCPU, 3915 MB RAM (~1.2 GB available), Debian 13, `NODE_ENV=production`.

Elapsed: task claimed 18:27:32Z, evidence run started 18:37:21Z, this report first written 18:38:50Z — **~11 minutes wall clock** to the first report, of which that harness run itself was 0.23 min. The current evidence files were regenerated at 18:41:39Z by an apparent second harness run, after the original report text; only the final generation survives. This second-run explanation is inferred from file times and changing run-captured artifacts, not proven by a retained prior transcript. The final `summary.json` and manifest are authoritative for the present run, including H10's 8 served requests plus one 401; the account gate remained the product-test constraint.

Cleanliness: no harness process remains and ports 4322/4399 are free (verified after the run). The sibling EmDash POC on 4321 was left running and untouched.

---

## 7. Evidence index and verification

All paths relative to `pocs/phase-2/storyblok/`; hashes in `evidence/run-01/MANIFEST.sha256`.

| Artifact | sha256 (prefix) | What it proves |
|---|---|---|
| `evidence/run-01/environment.json` | `83dc500b` | host, package versions, lockfile hash, ports, secret **names**, no account/payment/deployment |
| `evidence/run-01/harness-checks.json` | `63db1f09` | H0–H14 with statuses, observed values and evidence paths |
| `evidence/run-01/operations.jsonl` | `a1486649` | all 22 protocol criteria, `blocked`, with gate and reason |
| `evidence/run-01/summary.json` | `1acd96f4` | per-status counts and the run verdict |
| `evidence/run-01/logs/h1-astro-check.txt` | `fbde4f19` | 0 errors / 0 warnings / 0 hints |
| `evidence/run-01/logs/h2-build-documented-config.txt` | `2d3b2846` | the documented config's exact failure (F2) |
| `evidence/run-01/logs/h3-build-server-adapter.txt` | `5f2563b9` | build succeeds with an official adapter |
| `evidence/run-01/logs/mock-cdn-requests.jsonl` | `e18e4455` | 8 client requests, `version=draft|published`, token presence, 1× 401 |
| `evidence/run-01/renders/home-published.html` | `29c7aba4` | and identical to `static-index.html` — same output in both build modes |
| `evidence/run-01/renders/home-draft.html` | `c5456f3c` | draft variant differs (H5) |
| `evidence/run-01/renders/second-page.html` | `fad2e0b0` | shared component in a second content item (H6) |
| `evidence/run-01/renders/home-published.png` | `2419d3cb` | visual capture, inspected |
| `evidence/run-01/renders/home-draft.png` | `006f6af9` | visual capture, inspected |

Harness source hashes (recomputed after the final run): `harness/scripts/harness-checks.mjs` `a877c0b4`, `harness/astro.config.ts` `a2079cbd`, `harness/src/middleware.ts` `f3f466eb`, `harness/mock-cdn/server.mjs` `6bf92682`, `harness/mock-cdn/fixtures.mjs` `f895309c`.

**Reproduce:** `cd pocs/phase-2/storyblok/harness && node scripts/harness-checks.mjs` then `cd ../evidence && sha256sum -c run-01/MANIFEST.sha256`. Rendered output regenerates byte-identically except the PNGs (browser timestamps) and the transcript timestamps.

---

## 8. Scope attestation and stopping point

- **Files changed by this task:** `pocs/phase-2/storyblok/**` (harness + evidence + README) and this document. `git status` shows only `?? pocs/` and `?? research/phase-2/`; **no tracked file was modified**, `git diff --check` is clean, and no commit, push, reset, clean, or stash was run.
- **Path-layout deviation (flagged, not hidden).** `poc-plan.md` §8.1 proposes candidate 2's code at `/root/poc/p2-c2-storyblok/` and its evidence at `research/phase-2/poc-evidence/c2-storyblok/**`. This card's allowed-file list is narrower — only `pocs/phase-2/storyblok/**` and `research/phase-2/poc-storyblok.md` — so the code and **all** evidence were kept inside `pocs/phase-2/storyblok/`. The milestone owner must decide whether to move/duplicate `evidence/run-01/` to the planned evidence path; nothing outside the card's two paths was written.
- **Hotspot flags for the orchestrator:** (a) `research/phase-2/` remains a shared directory — this task added only `poc-storyblok.md` there; (b) **port 4321 is contended** by a concurrent EmDash POC (§3 F5) — the plan's port allocation needs serialization or a verified-disjoint scheme before more browser-facing work is dispatched.
- **Not touched:** `docs/02-cms.md`, `docs/01-business.md`, `PROJECT_STATUS.md`, `DECISIONS.md`, `AGENTS.md`, the Kanban board, Git history, and any other task's files. `PROJECT_STATUS.md` was deliberately **not** updated (the stopping point forbids it); P2.5's status is for the milestone owner to record.
- **Stopping point honoured:** no signup, no purchase, no trial, no deployment, no DNS, no production data, no destructive Git. The POC attempt is complete: it ended at the account gate, which is reported rather than worked around.
- **Handoff to P2.7.** Treat candidate 2 as *unmeasured*. Its evidence value in this run is (i) the doc/package findings F1–F4, which are decision-relevant regardless of the account, (ii) the plan-row map in F7 — the inputs that turn price tables into per-scenario cost lines, and (iii) a verified, reusable harness that becomes a real POC the moment an authorized free account exists.

## 9. Sources retrieved 2026-09-22 (UTC)

First-party pages re-read in this run; quoted text above is from these pages.

1. Storyblok — Integrate Astro with Storyblok (setup commands, `output: "server"`, component registration, documented test versions): https://www.storyblok.com/docs/guides/astro
2. Storyblok — Pricing and plan comparison (Starter/Growth/Growth Plus/Premium/Elite rows, FAQ 03 credit card, FAQ 13 asset types): https://www.storyblok.com/pricing
3. Storyblok — Roles (default Admin/Editor/Owner permissions, custom-role tabs): https://www.storyblok.com/docs/concepts/roles
4. Storyblok — Backups (S3 Backups app, CloudFormation stack, 30-day restore dropdown, CLI/API alternatives): https://www.storyblok.com/docs/concepts/backups
5. Storyblok — Visual Editor (draft fetch, `_editable`, bridge, HTTPS requirement including localhost, `frame-ancestors` CSP): https://www.storyblok.com/docs/concepts/visual-editor
6. Storyblok — Access Tokens (public = published, preview = draft + published, asset/release/theme): https://www.storyblok.com/docs/concepts/access-tokens

Machine-checked package facts: the npm registry via `npm view` (`@storyblok/astro`, `@storyblok/js`, `storyblok`, `astro`, `@astrojs/node`, `@astrojs/check`, `typescript`) and the installed lockfile.

Project sources: `AGENTS.md`; `DECISIONS.md` (D-002, D-003, D-005); `PROJECT_STATUS.md` (P2 graph); `research/phase-2/poc-plan.md` (protocol, §7 schema, §8.1 ownership, §8.3 ports, §11 commands); `research/phase-2/cms-capabilities.md` §3.3; `research/phase-2/scenarios-costs-permissions.md` §3.2.
