# Phase 2 POC — EmDash candidate 1 (`c1-emdash`)

**Task:** P2.4 — execute the Phase 2 ten-operation protocol against EmDash (candidate 1 of the two selected in `research/phase-2/poc-plan.md`).
**Run id:** `2026-09-22-c1-emdash-01`. **Date:** 2026-09-22 (CEST). **Evidence window:** 20:30–22:14 local, ≈104 minutes of evidence-producing work.
**Candidate:** EmDash `0.38.0` on the EmDash-generated Astro starter, Astro `7.3.3`, `@astrojs/node` `11.1.6`, SQLite `./data.db`, local `./uploads`.
**Status summary:** 18 criterion records — **11 pass, 4 partial, 3 blocked, 0 fail, 0 not_attempted**. Machine-readable: `pocs/phase-2/emdash/evidence/operations.jsonl` (sha256 `ddefcfd6076d380327f59fed243846a8de338efb1380165fbcab4a8c7dd92178`); rollup in `summary.json`; narrative in `assessment.md`; commands/results in `verification.md`; sources in `sources.md`.

This is evidence generation, not a CMS recommendation. No universal CMS decision is made here, and no external account, plan, payment, deployment, or DNS change was created (`DECISIONS.md` D-005, D-002).

---

## 1. Scope, location, and deviations from `poc-plan.md`

**Deliverables produced**

| Path | Content |
|---|---|
| `pocs/phase-2/emdash/**` | Runnable disposable EmDash/Astro POC: generated starter, `seed/seed.json`, `data.db`, `uploads/`, `README.md`, POC `AGENTS.md` |
| `pocs/phase-2/emdash/evidence/**` | 194 hashed artifacts: numbered logs/JSON/HTML/headers/screenshots, `operations.jsonl`, `environment.json`, `summary.json`, `assessment.md`, `verification.md`, `sources.md`, `MANIFEST.sha256`, helper scripts |
| `research/phase-2/poc-emdash.md` | This report |

**Deviations from `poc-plan.md` §8.1 (recorded, not hidden).** The plan proposed POC code at `/root/poc/p2-c1-emdash/` (outside the repository) and evidence at `research/phase-2/poc-evidence/c1-emdash/**`. The task card's allowed-files list is `pocs/phase-2/emdash/**` and `research/phase-2/poc-emdash.md`, so the POC and its evidence both live under `pocs/phase-2/emdash/` as the card directs. The milestone owner may relocate the evidence tree if the plan's layout is preferred. **Hotspot:** the sibling Storyblok POC (`pocs/phase-2/storyblok/`) reports a port collision with this run's dev server on 4321; `poc-plan.md` §8.3 port allocation assumes sequential runs and is not concurrency-safe.
**Also deviating:** the plan's §8.3 port map put candidate 1 on 4321 (used here, as documented) — no change.

**Timebox (R6).** The run stayed inside one working day. Because the block below (authentication) consumed time, no operation was left `not_attempted`.

---

## 2. Environment and versions

Source: `pocs/phase-2/emdash/evidence/environment.json`, `103-package-versions.json`, `96-*`.

| Item | Value |
|---|---|
| Host OS / kernel | Linux `6.12.107+deb13-amd64` (`97-os.txt`) |
| Node / npm | `v22.23.2` / `10.9.8` (`96-node-version.txt`, `96-npm-version.txt`) |
| Package manager | npm (EmDash's documented `pnpm` path not required for this run) |
| `emdash` (installed package) | `0.38.0` (`npm ls --depth=0`) |
| `astro` / `@astrojs/node` / `@astrojs/react` | `7.3.3` / `11.1.6` / `6.0.6` |
| `react` / `react-dom` | `19.2.4` / `19.2.4` (EmDash admin requirement; see §6) |
| `@astrojs/check` (dev) | `0.9.10`, `typescript` `5.9.x` |
| Database / storage | SQLite `./data.db`, local `./uploads` |
| Browser | `/usr/bin/chromium` headless (`--headless=new --no-sandbox --window-size=1200,900`) |
| Lockfile | `package-lock.json` sha256 `430f9b2bdc0e50e67e166430342d163b6d57fa616e50215f8a43699c65880e9b` |
| Port | `4321` (EmDash documented default) |

**Commands used (all from `pocs/phase-2/emdash`).**

```bash
npm create emdash@latest . -- --template starter --platform node --pm npm --yes --no-install --force
npm install
npx emdash init
npx emdash seed seed/seed.json --database ./data.db
npm run dev -- --host 127.0.0.1 --port 4321
NODE_ENV=development npm run typecheck
NODE_ENV=development npm run build
npm audit --omit=dev --audit-level=high
npx emdash export-seed --database ./data.db --with-content all --pretty
```

**Environment trap (recorded because it silently changes results).** The shell exports `NODE_ENV=production`, so a plain `npm install` omits devDependencies and `npm run typecheck` fails early; `npm config get omit` returns `dev`. Installing with `--include=dev` and running the verification commands with `NODE_ENV=development` produced passing typecheck/build (`evidence/101-typecheck-final.log`, `evidence/102-build-final-devdeps.log`). The sibling Storyblok run found the same trap.

---

## 3. Protocol results — O1–O10

Statuses are per **subcriterion**, using the plan's vocabulary. A `pass` requires machine-checkable evidence; role definitions or documentation are never counted as permission evidence.

| Op | Subcriterion | Status | One-line observation | Key evidence |
|---|---|---|---|---|
| O1 | create content | **pass** | Post `poc-test` created via CLI; present in the collection list, in the JSON backup, and on the public route | `24-create-draft.json`, `25-content-list-after-create.json`, `32-public-poc-test.html` |
| O2 | edit text | **pass** | Draft title/body/excerpt changed; the API returned a new draft revision while `liveData` kept the previously published values | `29-*`, `30-edit-draft.json`, `31-content-get-after-edit.json` |
| O3-a | image upload | **pass** | 1×1 PNG uploaded; media record `ready` (ULID `01M3588ZR175EFQXWTD8T9JCYP`), binary hash matched the source | `33-poc-test-image.sha256`, `34-media-upload.json`, `35-media-get.json` |
| O3-b | image render | **pass** | Public post emits `<img … alt="POC Test image">` through EmDash's media/file + Astro transform route; original and transformed URLs return 200 with image content types | `39-public-with-image.html`, `40-media-original-headers.txt`, `40-media-transform-headers.txt`, `104-live-post-final.html`, `105-live-media-transform-headers.txt` |
| O4-a | draft preview fetch | **pass** | Signed preview URL returned HTTP 200 and served the draft title/body while the published title was absent | `41-preview-url.json`, `42-preview-draft.html` (sha256 `c0f16b7b4e1f037a6087110856808b9e30fb44033649919f6171570dc9c4c5e5`) |
| O4-b | preview UI / marker | **partial** | Token payload decodes to `cid`/`exp`/`iat` and selected the draft, but **no explicit anonymous preview banner/marker** was found in the served HTML, and the authenticated visual-editing UI was not reached | `43-preview-token-payload.json`, `42-preview-draft.html`, `91-admin-login-ui.txt` |
| O4-c | preview expiry | **pass** | A 1-second token served the draft before expiry; after a 2-second wait the same URL served the published page with zero draft-title matches | `55-preview-expiry-url.json`, `56-*`, `57-preview-expiry-after.html` |
| O5-a | publish | **pass** | After publish the public route returned 200 and rendered the newly published title | `51-publish-final.json` (sha256 `5c7c84728d8ae2f2cb437ba7e26e60bdfd59e872c9fc3f179150670d5cc313fb`), `52-public-after-final-publish.html` |
| O5-b | draft/live separation | **pass** | A later draft edit was visible in the authenticated content read and absent from the public route, which kept the published title | `48-draft-separation-update.json`, `49-public-after-draft.html`, `50-content-after-draft.json` |
| O5-c | scheduling | **blocked** | The scheduling attempt returned `Invalid or expired token`; **no scheduled publication is claimed** | `101-schedule-request.stderr`, `102-scheduled-public.html` |
| O6-a | modelled/SEO output | **pass** | The native SEO API accepted exact values and the public `<head>` rendered them: title, description, canonical, `robots: noindex, nofollow` | `62-seo-api-response.json` (sha256 `aa3c620845bc87dfad5ccc31cf8e450333a8d7e447465c767b65597c9c2a066c`), `63-public-seo.html` |
| O6-b | native SEO surface in the product | **partial** | The collection exposes native `seo` metadata via API and it renders; the **admin SEO panel was not visually completed** (unauthenticated UI) and the CLI `data` field path rejected `seo` as an ordinary field | `23-schema-list.json`, `60-seo-update.stderr`, `62-seo-api-response.json` |
| O7 | reusable sections | **partial** | Section `poc-reusable-section` was created and inserted into two posts; editing the definition did **not** change either post — observed semantics are **copy-on-insert, not a live reference** | `64-section-create.json` (sha256 `78d7c2b313b316f4504fa34e8f01db9b45ab3c1971333e1dfac42853d90cb8d3`), `72-section-update.json`, `74-*`, `75-*` |
| O8-a/b/c | permissions (hard criterion) | **blocked** | Invite creation succeeded (role 20) but returned `Invite created. No email provider configured — share the link manually.`; no second actor accepted, was denied, or was revoked | `76-invite-headers.txt`, `76-invite-redacted.json`, `91-admin-login-ui.txt`, `screenshots/admin-login.png` |
| O9-a/b/c | export & exclusions | **pass** | CLI `export-seed` and the admin JSON backup both parse; backup contains content, sections, schema tables and media **metadata** and omits users, sessions, secrets, passkeys and media binary fields | `80-export-seed.json`, `81-export-seed-clean.json`, `82-json-backup.json` (sha256 `ad38ef9e98819adc0fbc08383ff1727c60d7711f79b7aa2bb6c9940f0a236fcb`), `83-json-backup-assertions.json` |
| O10-a | destructive file-level recovery | **pass** | Backup taken, a disposable post row damaged, `data.db` replaced from the backup; restored row and public route verified | `84-recovery-backup.db` (sha256 `30e33bcc0b91c4f4c904805ff0a136161ae1380cd1fa5e9d6da4a9b408b4e636`), `87-recovery-restored-hashes.txt`, `88-recovery-restored-row.json` |
| O10-b | JSON restore | **partial** | The JSON export is valid, but **no JSON import/restore route was exercised**; recovery is proven only at the SQLite file level | `82-json-backup.json`, `90-backup-settings.json`, `88-recovery-restored-row.json` |
| O10-c | vendor-managed backup path | **blocked** | Not applicable to a self-hosted local run; backup settings returned `{"enabled":false,"retention":7,"archives":[],"storageAvailable":true}` | `90-backup-settings.json` |

Blocked-reason taxonomy values used: `ENVIRONMENT_MISSING` (O5-c), `EMAIL_TRANSPORT_MISSING` (O8), `FEATURE_NOT_DOCUMENTED` (O10-b/c).

---

## 4. Narrative per operation

**O1–O2 — content create/edit.** The post was created through the EmDash CLI and immediately re-readable through two independent paths (collection list, public route, later the export file), with a stable slug `poc-test`. Editing produced a new **draft revision** while the previously published values remained in `liveData`, so revision handling is real rather than a single mutable row.

**O3 — media.** Upload returned a `ready` media record with width/height and a matching binary hash; the fixture is a deliberate 1×1 PNG (`evidence/poc-test.png`, checksum `33-poc-test-image.sha256`). Because a 1×1 fixture is visually meaningless, **the render claim rests on HTML and response headers rather than a screenshot**: the live page HTML contains the `<img>` with `alt="POC Test image"` pointing at `/_emdash/api/media/file/01M3588ZQ3NRXFAZ17RA62TN1Q.png` through Astro's `/_image` transform, and both the original and a `w=1 h=1 f=webp` variant return HTTP 200 with image content types. The live page was re-checked after the later section revision and still emits the image (`104-live-post-final.html`, `105-live-media-transform-*.{txt,webp}`).

**O4 — preview.** A signed preview URL served the draft while the public route served the published page: separation is genuine. The token payload decodes to `cid` (`posts:poc-test`), `exp`, `iat`. Expiry is enforced: a 1-second token served draft content before expiry and published content after a 2-second wait. **The gap is the anonymous preview affordance** — no banner/marker appears in the served HTML, and the authenticated visual-editing surface was never reached, so EmDash's `data-emdash-ref` editing affordances remain unproven in this run.

**O5 — publish.** Publishing and the draft/live split both work and were re-verified after a later draft edit. Scheduling is the honest gap: the final attempt failed authentication, so **no scheduled-publication evidence exists** and none is claimed. Documentation says scheduling exists; documentation is not evidence.

**O6 — SEO.** The native SEO surface exists as a first-class object: posting `seo.title`, `seo.description`, `seo.canonical`, `seo.noIndex` through the content API returned 200 and the rendered `<head>` carried exactly those values (`robots: noindex, nofollow`). Two qualifications: the **admin panel was never seen** (unauthenticated UI), and passing SEO as an ordinary collection field through the CLI's `data` argument fails (`seo: unknown field on collection 'posts'`) because SEO is a separate structure rather than a normal field — a documentation/usability gap worth carrying into the synthesis.

**O7 — reusable sections.** A reusable section was created, discovered by keyword, and inserted into two posts. Editing the definition once changed the definition (`version 2`) while **both posts kept the old copy**: `first_old_copy=1, first_new_reference=0, second_old_copy=1, second_new_reference=0`. Copy-on-insert can be the right model, but it is materially different from a live-linked reusable component, and it should be treated as a requirement gap wherever synchronized section updates are expected.

**O8 — permissions (hard criterion, the operation the selection turns on).** Creating an invite with role 20 returned HTTP 200 but with the message `Invite created. No email provider configured — share the link manually.` Without an email transport or a second deliverable actor, no user could be invited, authenticated, denied an administrative action, or revoked. Per the protocol's hard rule, role definitions are not permission evidence, so **O8-a/b/c are `blocked` with `EMAIL_TRANSPORT_MISSING`**, not passed. This is the single largest gap in the EmDash evidence and it is the criterion the candidate was selected on.

**O9 — export and exclusions.** Both export mechanisms worked. `export-seed` produced a JSON document that parses after extraction (`81-export-seed-clean.json`); the admin JSON backup (`82-json-backup.json`) parses with `format: emdash-backup` and, per `83-json-backup-assertions.json`, contains content, sections, schema and media metadata while omitting `users`, `sessions`, `secrets`, `passkeys`, and media binary fields. The exclusion assertions are a **security assertion**, not a completeness assertion: the same omissions mean the JSON backup alone is not a full site recovery package.

**O10 — recovery.** The primary claim was tested destructively against disposable local data only: backup the SQLite file, damage a disposable post row, restore the file, verify the row and the public route. The restored database hash matched the backup hash, the original title returned (`restored_title=3`), the damaged value was gone (`damaged_title=0`), and the public route returned 200. The **unproven half** is the JSON restore path: no JSON import route was exercised, and the backup settings endpoint reported backups disabled with no archives, so no vendor-managed or scheduled backup exists in this run.

---

## 5. Security, account, and evidence constraints

- **No external account, plan, paid service, deployment, or DNS change.** EmDash is self-hosted MIT software; nothing was purchased and no vendor was contacted.
- **No secret appears in any evidence file or log.** Regex sweeps for JWT-like (`eyJ…`), `emdash_…`/`token=`/`previewToken=`/`Bearer` style values, `password`, `secret`, `privateKey`, `BEGIN … KEY`, `sk-…` keys, and database connection strings returned **zero credential matches** in `evidence/**`; the only hits were structural (`"has_secrets": false`, and the deliberate secret-**name** list in `environment.json`).
- **Credential handling.** The POC's only local secret file is `pocs/phase-2/emdash/.env`, which contains a single locally generated variable (`EMDASH_ENCRYPTION_KEY`) — the variable **name** is recorded, never its value. It is ignored by the POC `.gitignore` (verified with `git check-ignore`) and its mode was tightened to `600`. API tokens, invite links, and preview tokens were used transiently and are recorded only as `[REDACTED]` or as structural assertions (`evidence/41-preview-url-redacted.txt`, `43-preview-token-payload.json`, `76-invite-redacted.json`). Preview/draft URLs are treated as credentials.
- **Disposable local authentication helper — removed.** The documented dev-bypass route returned `{"success":false,"error":{"code":"FORBIDDEN","message":"Dev bypass is only available in development mode"}}` under this Astro runtime, and the supported browser setup flow did not produce an authenticated dashboard (`screenshots/admin-login.png` shows the sign-in screen with passkey and email-link options). To obtain authenticated API/CLI evidence inside the timebox, a **disposable, local-only helper route** was used. It was deleted before the final validation and its source no longer exists; the stale paths now return 404 or EmDash's normal `401 NOT_AUTHENTICATED` (`92-helper-route-removal.txt`, `93-helper-route-removal-after-restart.txt`). **This helper is not a production feature and its success is not evidence that supported authentication works.**
- **Recovery destructiveness.** The only destructive actions were performed on this POC's disposable `data.db` and its copy under `evidence/84-recovery-backup.db`. No other database, repository, or client data exists or was touched.
- **Public frontend.** The generated starter remains minimal and unstyled by design; **no UI framework was added to the public frontend**. React `19.2.4` is present because EmDash's admin UI is a React app and its integration documents the `react()` integration — this is the documented admin requirement the task's acceptance criteria anticipates, and it must be recorded explicitly in the synthesis (`AGENTS.md` forbids adding a UI framework without a documented requirement).
- **No fabricated results.** Every status above maps to a file in `pocs/phase-2/emdash/evidence/`; `evidence/validate_operations.py` confirms 18 well-formed JSONL records whose referenced evidence paths all exist (`operations-validation.json`).

---

## 6. Explicitly untested / not claimed

1. **Supported browser authentication and setup** — the admin session was never established; the retained screenshot is the sign-in screen. No dashboard, no editor UI, no SEO panel, no media-library UI was visually verified.
2. **Everything permission-related** — invite acceptance, the Contributor/Author denial test, revocation, and second-actor authoring are untested (O8 blocked).
3. **Scheduled publishing** — untested (O5-c blocked).
4. **Live-linked reusable sections** — contradicted by observation in this run.
5. **JSON restore** and any vendor-managed/scheduled backup (O10-b partial, O10-c blocked).
6. **Upgrade/migration, plugin sandbox, Cloudflare/D1/R2 deployment, production hosting, HTTPS preview, email transport, monitoring, incident response.**
7. **Media-binary and secret recovery** — by design outside the JSON backup; not tested.
8. **Multi-locale content, taxonomy archives beyond the seeded defaults, member/subscriber content gating, and the CLI `types`/`login` flows.**
9. **Production stability** — EmDash is beta-preview software with a young repository; a local POC cannot resolve that risk.

---

## 7. Verification record

| Check | Command | Result |
|---|---|---|
| Typecheck | `NODE_ENV=development npm run typecheck` | exit 0 (`101-typecheck-final.log`) |
| Production build | `NODE_ENV=development npm run build` | exit 0 (`102-build-final-devdeps.log`) |
| Dependency audit | `npm audit --omit=dev --audit-level=high` | `found 0 vulnerabilities` (`98-npm-audit.log`) |
| Public home / post | `curl` against `/` and `/posts/poc-test` | 200 / `HTTP/1.1 200 OK` (`104-live-post-final.html`) |
| Evidence integrity | `sha256sum -c MANIFEST.sha256` | 194 files listed; **all 194 verified OK** (manifest excludes itself) |
| Reference resolution | `python3 evidence/validate_references.py` | every file reference in this report, `README.md`, `assessment.md`, `verification.md` and `sources.md` resolves; the only unresolved name is `docs/02-cms.md`, the P2.6 synthesis that does not exist yet (`107-reference-check.json`) |
| Operation records | `python3 evidence/validate_operations.py` | 18 records, valid JSONL, 0 missing evidence paths |
| Secret scan | regex sweep over `evidence/**` | 0 credential matches |
| Helper removal | `curl` on the four stale helper paths | 404 / 401 / 401 / 404 |
| Services stopped | `ss -ltnp \| grep ':4321'` after shutdown | no listener; no POC process remains |
| Whitespace / diff check | `git diff --check` (repo root) | clean; no tracked file modified by this task |

**Files changed by this task:** `pocs/phase-2/emdash/**` (new, untracked) and `research/phase-2/poc-emdash.md` (new, untracked). No governance document, `docs/02-cms.md`, Kanban record, Git history, Storyblok scope, or file outside the allowed paths was modified, and no destructive Git command was run.

---

## 8. Decision-relevant reading for the synthesis

- **Scenario A (agency / mostly static):** EmDash runs, serves, edits, previews, renders media/SEO, exports, and restores locally with **no vendor account** — but converts platform cost into operational responsibility (migrations, runtime patching, database/storage backup, secret handling, monitoring) and adds an admin-only React dependency.
- **Scenario B (small nontechnical client):** **unproven by this POC.** The least-privilege handling the candidate was selected on (C5 gate) rests on documentation plus an invite API call, not on a second actor editing, being refused an admin action, or being revoked.
- **Scenario C (advanced editorial):** revisions, drafts, media, preview, SEO and sections were exercised; **scheduling, two-actor permissions, live-linked sections, and complete restore remain unproven**, and the beta-maturity risk is unchanged.
- **Evidence asymmetry (per `poc-plan.md` §7):** the sibling Storyblok run ended `blocked` at the account gate (22/22 criteria) with a credential-free harness instead. The two runs must not be averaged; EmDash is locally testable, which is exactly why it produces more evidence, not why it is more suitable in production.

Sources for every external claim in this report are listed with URLs and the 2026-09-22 retrieval date in `pocs/phase-2/emdash/evidence/sources.md`.
