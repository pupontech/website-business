# Acceptance and verification plan — private agency-site draft

**Status:** Future implementation checks only. Nothing in this file was executed by authoring the OpenSpec. A missing, simulated, or unavailable result is BLOCKED/NOT RUN, not PASS.

## Preconditions

- Independent review of the change: PASS before implementation dispatch.
- D-016 explicitly permits local-only development on the parent-verified local foundation baseline. Formal P8.1 and draft acceptance still require exact-commit hosted CI, currently BLOCKED / NOT RUN due to billing; no push, merge, preview or deployment under this exception.
- D-016 records separate owner authorization and explicit draft defaults.
- No preview/production action: implementation is local only.

## Acceptance matrix

| Requirement | Acceptance evidence | Procedure | Fail-closed result |
|---|---|---|---|
| REQ-01 gates | Parent-accepted foundation with hosted run URL and exact commit, evidence reconciliation, independent review, and owner decisions are recorded | Read `PROJECT_STATUS.md`, foundation evidence, hosted run record, review record, and owner decision record before dispatch | Any missing gate blocks implementation and acceptance |
| REQ-02 routes/static output | Exactly `/`, `/services/`, `/contact/` and their agreed trailing-slash behavior; no aliases, server routes, or extra files | `cd site && npm run test:scope:source && npm run build && npm run test:scope:output`; inspect output inventory | Any extra/missing route, unknown output, or route mismatch fails |
| REQ-03 truthful draft | Persistent identical draft notice on every route; approved generic/omitted identity; qualified/omitted Services labels; no proof or claims | Scope verifier for source and built output; render all pages and compare every visible string against owner-approved allowlist | Missing notice, ambiguous placeholder, unapproved copy, or fabricated/unsupported claim fails |
| REQ-04 no data collection | Contact-coming-soon and no-channel statement; no form/control/action/destination/API/cookie/network | Source/output verifier; DOM review at `/contact/`; inspect links and built HTML | Any collection or implied functional path fails |
| REQ-05 static/local-only | Static Astro, no client JS, CMS, adapter, framework, remote asset/font/script, or external request | `npm run check`, scope source/output checks, built-resource inventory and browser network log | Any prohibited package/runtime/resource or unrecognized output fails |
| REQ-06 accessibility/reflow | Semantic shell, one H1 per page, working skip/nav, focus, contrast, keyboard, reduced motion, no overflow | `npm run test:a11y`; manual keyboard/landmark/contrast/reduced-motion review at required sizes and actual 200% browser UI zoom | Any unresolved automated/manual issue or missing evidence blocks acceptance |
| REQ-07 metadata/privacy boundary | English `lang`, accurate titles and noindex/nofollow on all three; no canonical/sitemap/business schema; no preview config | Inspect source and built head for every route; inspect app/workflow for publish/deploy/preview actions | Missing noindex/title or publication/access-control implication fails |
| REQ-08 scope/CI | Exact source/output allowlists and real hosted run preserving guards/scans/no-release policy | Local positive and disposable-copy negative tests; inspect actual hosted run URL/commit and checkout guard | Unknown paths/check failures, weak guard, missing hosted evidence, deploy/upload, or scan error blocks acceptance |
| REQ-09 handoff | Evidence note, 9 screenshots, per-route findings, accurate status/card updates after acceptance | Read evidence note and records; compare every PASS claim to command/browser/hosted evidence | Missing artifacts or overstated result fails |

## Local command record

Run Gitleaks first, before dependency installation/build, from the repository root and only against the exact existing site/workflow allowlist. Preserve the reviewed Gitleaks version/checksum and `--redact=100` behavior; do not scan the repository root, Git history, POC paths, docs, generated output, or dependency directories. Then run the following from `site/` with the pinned project Node version. The current environment's npm config omitted dev dependencies for plain `npm ci`; use the recorded working form `npm ci --include=dev`.

```sh
# From repository root, before npm install/build; exact file/directory invocations, redacted, no report:
gitleaks dir site/.gitignore --redact=100
gitleaks dir site/.nvmrc --redact=100
gitleaks dir site/package.json --redact=100
gitleaks dir site/package-lock.json --redact=100
gitleaks dir site/astro.config.mjs --redact=100
gitleaks dir site/tsconfig.json --redact=100
gitleaks dir site/src/ --redact=100
gitleaks dir site/scripts/ --redact=100
gitleaks dir site/playwright.config.ts --redact=100
gitleaks dir site/tests/ --redact=100
gitleaks dir .github/workflows/route-neutral-astro-foundation.yml --redact=100

cd site
node --version
npm --version
npm ci --include=dev
npm audit --include=dev --audit-level=low
npm run check
npm run test:scope:source
npm run build
npm run test:scope:output
./node_modules/.bin/playwright install chromium
npm run test:a11y
npm run preview -- --host 127.0.0.1
```

Record command, exit status, Node/npm/Astro/Playwright/Chromium/Gitleaks versions, audit advisory count, redacted leak count, and evidence path. Any low-or-higher dependency advisory, secret finding, scan error, or inability to complete blocks acceptance. Never print or retain secret values. If the workflow’s current Gitleaks path list changes as part of a future approved implementation, review and update the exact list consistently before running scans.

## Browser, screenshot, and performance record

- Test all three routes at 195, 320, 390, 768, 1024, and 1440 CSS-pixel widths. Record HTTP/render status, overflow, clipping, source/content order, banner visibility, navigation and focus. Preserve 195 px as a proxy only; separately operate actual browser UI zoom at 200% and record the browser/version and finding. The 195-pixel proxy is not a substitute for browser zoom.
- Run automated axe WCAG 2.0/2.1/2.2 A/AA checks on every route at 320, 390, 768, 1024, and 1440 CSS px; include the 195 px overflow assertion. Fail on any violation, omitted scan, browser error, or skipped route/width. Automation is not a conformance claim.
- Manually verify Tab/Shift+Tab and Enter navigation/skip-link operation, visible/unobscured focus, landmarks, one H1 and heading order per route, reduced-motion behavior, and text/link/focus/non-text contrast. Record measurements: normal text ≥4.5:1, large text ≥3:1, relevant non-text UI/focus ≥3:1. Fix and retest all findings.
- Capture and visually inspect nine local-only screenshots: each of Home, Services, Contact at 390×844, 768×1024, and 1440×900. Retain under `docs/08-agency-draft-site/screenshots/` using the names assigned in T6. Record findings separately for each route/viewport; do not upload screenshots from CI.
- Record built output size and confirm no application JavaScript and zero third-party network requests. If running a lab/performance audit, record tool version, environment, command, and result. No numeric byte or score pass threshold exists unless the owner chose one before implementation; do not infer field/Core Web Vitals evidence from a lab score.

## Offline and hosted checks

These are checks for the implemented three-route draft, not the OpenSpec authoring task or a retroactive claim about the synthetic foundation.

After a successful lockfile install, repeat the production build and output-scope verification with outbound network denied and only `site/` mounted/available (for example, a `--network none` container). Record the exact isolation mechanism. If that cannot be enforced, mark BLOCKED/NOT RUN; a normal build or package-cache/offline install is not a substitute.

Hosted CI must run on the exact foundation and implementation commits before acceptance, once the account billing block is cleared. Record the run URL, commit, runner image, exact sparse-checkout patterns, materialized working-tree inventory result, Node/npm versions, audit/Gitleaks summaries, type/source/build/output/a11y steps, and absence of deploy/preview/upload. Keep explicit read-only permissions, `persist-credentials: false`, no secrets, fail-closed isolation, and no full-checkout fallback. A local workflow simulation is not hosted evidence.

## Completion boundary

Local verification is not acceptance while hosted CI remains blocked. The development exception covers only a local static draft. No domain, password-protected preview, hosting account, DNS/TLS, production deployment, public release, CMS, live form, or G3 action is tested or authorized by this change. Every unrun item remains clearly BLOCKED/NOT RUN.