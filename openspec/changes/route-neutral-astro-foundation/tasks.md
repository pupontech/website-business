# Ordered implementation tasks

Implementation starts only after this OpenSpec change passes independent review. These tasks are for a future implementation card; this specification task itself must not perform them. Each task has one writer and disjoint path ownership.

## T1 — Create the isolated Astro/TypeScript application

**Depends on:** OpenSpec review acceptance.

**Sole file ownership:** `site/.gitignore`, `site/.nvmrc`, `site/package.json`, `site/package-lock.json`, `site/astro.config.mjs`, `site/tsconfig.json`, `site/src/pages/index.astro`, and `site/src/styles/global.css`.

**Work:** Re-check and record current stable Astro/Node compatibility and official sources; select maintained stable Playwright Test and `@axe-core/playwright` versions from official sources; pin all direct dependencies exactly, commit npm lockfile, configure strict TypeScript and explicit static output; build only the four-string local/synthetic fixture (skip-link label plus three demo labels) and local responsive stylesheet. Declare `npm run test:a11y` and the exact browser-install procedure. No integrations, API routes, content models, form, images, external resource, client JavaScript, or production identity.

**Exit checks:** `npm ci` works in `site/`; exact package/browser versions and official source evidence are recorded; command scripts are declared for `check`, `test:scope:source`, `test:scope:output`, `test:a11y`, `build`, and `preview`; page/source stays within `site/`; no public-site route plan is created. The scope verifier and browser tests are delivered by T2 and T3, so T1 alone is not an accepted foundation.

## T2 — Implement fail-closed scope verification

**Depends on:** T1.

**Sole file ownership:** `site/scripts/verify-scope.mjs`.

**Work:** Implement the app-local portions of REQ-01 and REQ-03–REQ-07 checks with `--source` and `--output` modes from the exact manifest, page source, site-local ignore rules, and built output. The hosted checkout guard belongs to T4, not this site-only verifier. Source mode runs before build; output mode runs after build. Check only `site/`; fail closed on a missing/wrong-stage input, prohibited content/features, unknown files/dependencies, external resources, or output beyond the allowlist. Do not traverse or read POC directories. Keep fixture strings and guard behavior aligned with `design.md` and the normative specification.

**Exit checks:** `npm run test:scope:source` exits zero for compliant source; after a build, `npm run test:scope:output` exits zero for compliant output. Deliberately introduce temporary violations in a disposable copy (never in the shared POC paths) to demonstrate nonzero failures for at least a prohibited integration/dependency, a form/external URL, unapproved body/head text or proof, unexpected route/output, and missing/wrong-stage check input; restore only the test copy and record results. No waiver or skipped check remains.

## T3 — Add browser accessibility automation

**Depends on:** T1.

**Sole file ownership:** `site/playwright.config.ts` and `site/tests/foundation-accessibility.spec.ts`.

**Work:** Configure Playwright's test server to serve only the already-built static output on loopback using `npm run preview -- --host 127.0.0.1`. Test only that local preview with locked Playwright Test/Chromium and `@axe-core/playwright`. Run automated WCAG 2.0/2.1/2.2 A/AA axe checks at 320, 390, 768, 1024, and 1440 CSS-pixel widths; fail on any violation, omitted scan, or browser/test error. Capture PNG screenshots named `mobile-390x844.png`, `tablet-768x1024.png`, and `desktop-1440x900.png` into ignored `site/test-results/screenshots/` output for later local evidence retention. Do not visit external pages, suppress violations, add page content, or claim automated conformance.

**Exit checks:** Browser test exits zero with zero axe violations at all required widths and retains its temporary screenshots; test/browser version evidence is available. Manual review and retained evidence screenshots remain T5 obligations.

## T4 — Add isolated non-deploying GitHub-hosted CI and scans

**Depends on:** T1–T3.

**Sole file ownership:** `.github/workflows/route-neutral-astro-foundation.yml`.

**Work:** Configure push and pull-request verification on the explicit `ubuntu-24.04` GitHub-hosted runner label. Use reviewed full-40-character-SHA actions, explicit read-only permissions, same exact Node as `.nvmrc`, and mandatory non-cone sparse checkout of exactly `site/` and this workflow file. Before any tool/dependency install or scan, verify exact sparse patterns and fail if any other working-tree file/directory is materialized; only `.github/` and `.github/workflows/` as parents of the named workflow are additionally allowed. Never fall back to full checkout; use a generic failure message without printing unexpected paths or environment values. Set `persist-credentials: false`. Install the pinned/checksum-verified Gitleaks binary in runner temp storage and scan only the app/workflow source/config/manifest paths with `gitleaks dir`, `--redact=100`, no verbose output, and no unredacted report. Then run `npm ci`, `npm audit --include=dev --audit-level=low`, `./node_modules/.bin/playwright install chromium`, `npm run check`, source scope, build, output scope, and `npm run test:a11y`, in that order. Keep scan results to redacted summaries; no secrets, deployment, preview, or artifact upload.

**Exit checks:** Workflow and action references reviewed; local syntax/structure check passes; actual hosted run is green and its URL/commit are recorded. Confirm exact checkout patterns and workspace inventory guard; an unavailable/incomplete sparse checkout or extra path fails the job. A local simulation is not hosted evidence. If repository/workflow permissions prevent a hosted run, record BLOCKED/NOT RUN and do not claim this requirement passed.

## T5 — Run full evidence matrix and update project records

**Depends on:** T1–T4.

**Sole file ownership:** `docs/08-route-neutral-foundation.md`, `docs/08-route-neutral-foundation/screenshots/mobile-390x844.png`, `tablet-768x1024.png`, `desktop-1440x900.png`, and `PROJECT_STATUS.md` (status update only; do not rewrite unrelated rows or planning text).

**Work:** Run Gitleaks before package installation/build, using separate directory/file scans only for `site/.gitignore`, `site/.nvmrc`, `site/package.json`, `site/package-lock.json`, `site/astro.config.mjs`, `site/tsconfig.json`, `site/src/`, `site/scripts/`, `site/playwright.config.ts`, `site/tests/`, and `.github/workflows/route-neutral-astro-foundation.yml`; install its exact official release in temporary storage and verify the published SHA-256. Then run the full local command set including `npm audit --include=dev --audit-level=low`, source scope before build, output scope after build, `./node_modules/.bin/playwright install chromium`, and browser accessibility automation. Repeat the build and output-scope check with outbound networking denied after dependency installation. Run the local built preview and required responsive/keyboard/contrast/reduced-motion manual inspection. Copy the three synthetic-page screenshots from the local browser-test output into the named evidence paths, visually inspect each, and record browser/tool versions, viewport, results/findings/fixes, scan versions/results, isolation mechanism, hosted workflow URL/commit, and limitations. Update the current P8.1 row and next-step pointer narrowly, only on evidence actually obtained. Screenshots remain project evidence and are not CI artifacts. No `DECISIONS.md` edit is warranted if the approved scope is unchanged.

**Exit checks:** Evidence note maps every requirement to concrete results or clearly says BLOCKED/NOT RUN; status does not mark blocked/research-only/browser or unobserved checks verified; all three screenshots exist at their named evidence paths and have recorded visual inspection. No copy of POC material appears in source, output, workflow, or evidence artifacts; scanner evidence contains no secret values.

## Final acceptance

All T1–T5 exit checks and the verification matrix pass, except no item may be waived by marking a missing proof as passed. A documented blocker prevents full acceptance. Stop after the route-neutral foundation; do not start agency pages, CMS/form work, accounts, service purchases, vendor-hosting, DNS, production deploy, public release, or G3 work.
