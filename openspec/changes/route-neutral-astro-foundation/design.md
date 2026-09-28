# Design: route-neutral Astro foundation

## Boundary and repository layout

Use one explicit Astro project root so build inputs cannot implicitly include unrelated repository paths:

```text
site/
  .gitignore
  .nvmrc
  package.json
  package-lock.json
  astro.config.mjs
  tsconfig.json
  src/
    pages/index.astro
    styles/global.css
  scripts/verify-scope.mjs
  playwright.config.ts
  tests/foundation-accessibility.spec.ts
.github/workflows/route-neutral-astro-foundation.yml
docs/08-route-neutral-foundation.md
docs/08-route-neutral-foundation/screenshots/
```

`site/` is the Astro root, dependency-install directory, source/output-scope-verifier boundary, and build context. For hosted CI, sparse checkout is mandatory in non-cone mode with exactly these working-tree path patterns: `site/` and `.github/workflows/route-neutral-astro-foundation.yml` [1]. The only materialized paths permitted are the `site/` tree; `.github/` and `.github/workflows/` as necessary parent directories; and the single workflow file, which is trusted minimal workflow material. The checkout step MUST set `persist-credentials: false`. Before installing tools/dependencies or running scans, a workflow guard MUST verify the sparse-checkout configuration and recursively inspect the materialized working tree (excluding only Git's `.git/` metadata) and fail if any other file or directory exists. The guard MUST NOT read file contents or print unexpected path values, checkout credentials, or environment values; report only a generic isolation failure. The existing site scope verifier MUST also reject any unallowlisted path inside `site/`. If sparse checkout or either inventory check is unavailable, incomplete, or mismatched, the job fails before proceeding; a full-checkout fallback is forbidden. Run app commands with `working-directory: site`. Do not access or materialize any other repository path, POC path, or POC content. Preserve the local POC state untouched. Do not create a root-level Astro project, root package manifest, repository archive, broad workspace, or build artifact containing the repository. The workflow has no artifact-upload or deployment step.

The site-local ignore file excludes `node_modules/`, `dist/`, `.astro/`, local `.env*`, test/browser output, and logs (with no credentials committed). This supplements, and does not replace or alter, the existing repository `.gitignore` and its POC database exclusions.

## Framework, versions, and build contract

- At implementation time, re-check the latest non-prerelease Astro release and its supported Node engine using the official npm registry and Astro documentation. Record the exact URLs, retrieval date, version, and engine evidence in the Phase 8 evidence note. Do not reuse the dated Astro version in Phase 5 research without rechecking.
- Pin Astro, Playwright Test (`@playwright/test`), `@axe-core/playwright`, and all other direct npm dependencies to exact versions without `^`, `~`, wildcard, tag, or floating range. At implementation time, select maintained stable releases using their official project/npm sources, record version/source/retrieval date, and commit them in `site/package-lock.json`; require `npm ci` and reject lockfile drift. Select and pin an exact Node release in `site/.nvmrc` satisfying the Astro and tooling engines; configure hosted CI to use the same version. Install Chromium explicitly with the locked Playwright CLI (`npx playwright install chromium`); use the browser revision associated with that exact package version and record browser/version evidence. Do not use an unpinned `npx` package download.
- Use npm only for this project root. Use TypeScript and Astro's strict TypeScript configuration; run `astro check` as well as the production build because a build alone is not the TypeScript check.
- Configure `output: 'static'` explicitly. Do not add an Astro adapter, server output, integration, UI framework, content collection, MDX support, or CMS/editor package. Do not add a dependency without reviewing provenance, maintenance, license, install scripts, permissions, and transitive impact.
- Build output is only `site/dist/`, expected to contain the root HTML and locally authored CSS. No canonical production URL, sitemap, public robots policy, runtime, source map, or deployment configuration is needed for this local demonstration.
- Use local system fonts and local styles only. No remote fonts, images, scripts, styles, fetches, or build-time network content. The static build must succeed after dependencies are installed while outbound network access is denied. `npm ci --offline` by itself is not evidence that the Astro build is offline.

## Demonstration and content model

The only rendered path is `/`, used as a local foundation smoke test. It contains a semantic `header`, skip link, `main`, one `h1`, and `footer`; no navigation, CTA, interactive widget, form, or client script is needed. Keep the visual treatment restrained and corporate-minimal as a direction, without selecting a brand, identity, palette, typography system, or final design tokens.

The only user-visible text is restricted to the following exact allowlist: one functional skip-link label and three synthetic disclosure/demo labels (punctuation may be encoded by HTML):

- `Skip to main content`
- `Local foundation demonstration`
- `Synthetic demonstration content — not an agency website or client work.`
- `This local page verifies the static Astro shell only.`

These strings are test fixture labels, not public service copy. The output must also set a noindex/nofollow robots directive as an accidental-publication precaution; that directive is not access control and does not authorize publishing. There are no other content records, images, people, organizations, client references, social links, credentials, outcomes, or claims.

Set the document `<title>` to exactly `Local foundation demonstration`. Keep document metadata to the minimum required charset/viewport declarations, that title, the noindex/nofollow directive, and the local stylesheet reference. Do not add a description, canonical URL, Open Graph/Twitter fields, structured data, or identity-bearing metadata. Do not add hidden/off-screen claim text, CSS-generated text, extra accessible names, or attributes carrying identity/proof; the skip-link accessible name is its visible allowlisted label.

## Scope verifier and fail-closed exclusions

Implement a deterministic Node script under `site/scripts/` with separate source and output modes. Run the source mode before build and the output mode after build in CI; each fails non-zero if any check cannot run or a prohibited feature is present. Check only the application tree and generated `site/dist/`; never traverse the POC tree.

The site-local scope verifier must check all of the following and must never substitute for the separate security scans below:

1. The project root/config/output are exactly the static Astro app; the only page source is `src/pages/index.astro`; no symlink or path alias/import can escape `site/`; no server route, API endpoint, adapter, integration, content collection, `.md`/`.mdx`, or external content source exists.
2. Direct dependencies and imports contain only the selected Astro/TypeScript/checking/build requirements. Fail on CMS/editor integrations or SDKs (including Markdown/MDX editor packages), web UI frameworks, adapters, forms, analytics, mail, webhook, host, or deploy packages. Unknown additions require spec review rather than automatic acceptance.
3. Page source and built HTML contain no form/control submission path, `fetch`/XHR/network client, server action, API route, cookie/session behavior, email/telephone/contact destination, or external-resource URL. The only anchor is the local skip link. Fail closed on an unrecognized script or asset.
4. The source mode verifies the sole route and exact markup/head/visible-text/accessibility-name allowlists; `<title>` matches its exact value above; only allowed head metadata is present; the synthetic disclosure and `noindex,nofollow` directive are mandatory. The allowlist prevents names, identity, service claims, fabricated proof, and an implied finished public site rather than trying to guess every prohibited phrase.
5. The output mode verifies that the built site contains only the permitted local root output and styles, no JavaScript bundle, secret-like environment value, external URL, POC path, source map, or unexpected generated file. Source checks reject references outside the `site/` root. Any uncertainty is a failure, not a warning.
6. The source mode verifies `site/.gitignore` ignores local environment files and generated output. Builds, checks, and artifacts are scoped to `site/`; nothing under POC paths can enter an artifact because there is no repository-root archive or upload step.
7. Source and output modes verify the rendered DOM, head metadata, accessibility names, and CSS contain no unapproved or hidden/generated text; the sole document title and body/skip-link text match the exact allowlists above.

Document the exact checks and known limits in the verifier comments and evidence note. A scope scan is not a dependency-vulnerability or secret scan and cannot satisfy either security gate.

## Accessibility and responsive behavior

Use HTML landmarks and headings natively, one `h1`, a first-focusable skip link targeting `main`, visible focus, normal-flow content, readable line length, and responsive CSS that reflows without horizontal scrolling. No interaction should require JavaScript. Target WCAG 2.2 AA for this foundation but make no conformance claim.

The implementation evidence must record manual browser inspection at 320, 390, 768, 1024, and 1440 CSS-pixel widths and at 200% zoom; keyboard-only Tab/Shift+Tab and Enter operation of the skip link; semantic landmark/heading review; reduced-motion behavior; and measured text, focus, and non-text contrast. Record browser/version, viewport, zoom, contrast results, and findings. Normal text contrast target is at least 4.5:1, large text at least 3:1, and relevant non-text focus/UI contrast at least 3:1. Fix all failures before acceptance; automation or compilation alone is insufficient.

### Automated accessibility and visual evidence

Use the exact locked Playwright Test and `@axe-core/playwright` versions to run a headless Chromium test against the built local preview, not an external page [2]. At each width 320, 390, 768, 1024, and 1440 CSS pixels, run axe checks tagged for WCAG 2.0, 2.1, and 2.2 A/AA [4]; any violation or inability to complete the scan fails the test. Do not exclude rules or elements to obtain a pass without a reviewed OpenSpec change. This automation detects only some accessibility defects and does not replace the manual checks above. Capture screenshots at the canonical mobile 390×844, tablet 768×1024, and desktop 1440×900 viewports. The local implementation evidence handoff MUST retain the three synthetic-page captures at `docs/08-route-neutral-foundation/screenshots/mobile-390x844.png`, `tablet-768x1024.png`, and `desktop-1440x900.png`, and record visual inspection findings for each. CI may generate temporary screenshots under ignored `site/test-results/`, but MUST NOT upload them or any other artifact. The evidence note and retained screenshots are bounded documentation evidence, contain only the synthetic page, and do not authorize a public site or identity claim.

## Hosted CI and security

The workflow runs on the GitHub-hosted `ubuntu-24.04` runner label for pull requests and pushes, with explicit read-only `contents: read` permissions, no repository/environment secrets, no deploy, no public preview, no external service account, and no production job. Record the actual runner image version from the hosted run; the label itself is not an immutable image pin. Use sparse checkout in non-cone mode for exactly `site/` and the workflow file; set checkout `persist-credentials: false`. Verify the configured patterns and the complete materialized working-tree allowlist before any installation or scan, then fail closed on any extra path. Never retry as a full checkout. Review each GitHub Action's source, maintenance, license, and permission scope, then pin it to a reviewed full 40-character commit SHA (not a tag). Do not use a privileged trigger that exposes secrets to untrusted pull-request code.

After the checkout guard passes, install Gitleaks from an exact stable official release in runner temp storage only and verify its published SHA-256 [3]. Run its filesystem `dir` command separately against exactly these application source/config/manifest paths plus the single workflow file: `site/.gitignore`, `site/.nvmrc`, `site/package.json`, `site/package-lock.json`, `site/astro.config.mjs`, `site/tsconfig.json`, `site/src/`, `site/scripts/`, `site/playwright.config.ts`, `site/tests/`, and `.github/workflows/route-neutral-astro-foundation.yml`. Do not scan repository root, generated directories, docs, or Git history. Use full redaction (`--redact=100`), no verbose logging, and no unredacted report. Any detected secret or scanner/install/configuration error fails the job. Then run `npm ci`, `npm audit --include=dev --audit-level=low`, `./node_modules/.bin/playwright install chromium`, `npm run check`, `npm run test:scope:source`, `npm run build`, `npm run test:scope:output`, and `npm run test:a11y`. The audit explicitly includes development dependencies and fails on any low-or-higher advisory [5][6]. Record tool versions, checksum, command, exit status and redacted finding/advisory counts; never print or retain secret values. Do not place Gitleaks reports or scan artifacts in the repository or upload artifacts. CI records the lockfile/tool versions and green hosted run URL/commit in the evidence note. CI success is hosted automation evidence only; it does not replace local offline build, manual browser/accessibility inspection, product proof, production readiness, or G3. Do not upload build output, screenshots, reports, or the repository as an artifact.

For offline-build evidence, first install from the committed lockfile in an allowed networked step. Then run the production build and output-mode scope test in an OS-level outbound-network-denied sandbox (for example, a network-isolated namespace or container) with only `site/` mounted as the project. Record the exact mechanism and result. If the environment cannot enforce network denial, mark this check BLOCKED/NOT RUN; do not infer offline success from a normal build, source search, or npm's package-cache option.

## Failure and change handling

A mismatch in version compatibility, scope verifier, accessibility, offline build, local build, or hosted CI blocks acceptance. Do not weaken a guard merely to make the build pass. A necessary exception, new route, package, remote resource, generated artifact, public claim, API, integration, or change outside the owned path is a scope change: stop and obtain owner approval plus a revised OpenSpec change before continuing.

## Tool references

- [1] GitHub `actions/checkout` documentation for sparse checkout and recommended read-only permissions: https://github.com/actions/checkout (retrieved 2026-09-27).
- [2] Playwright accessibility-testing documentation for `@axe-core/playwright`, automated rule checks, and the limits requiring manual review: https://playwright.dev/docs/accessibility-testing (retrieved 2026-09-27).
- [3] Gitleaks official project documentation for directory scanning and redacted output: https://github.com/gitleaks/gitleaks (retrieved 2026-09-27).
- [4] Deque axe-core rule-tag documentation: https://www.deque.com/axe/core-documentation/api-documentation/#axecore-tags (retrieved 2026-09-27).
- [5] npm audit command documentation: https://docs.npmjs.com/cli/v11/commands/npm-audit (retrieved 2026-09-27).
- [6] npm CLI configuration documentation for include/omit precedence: https://docs.npmjs.com/cli/v11/using-npm/config/ (retrieved 2026-09-27).
