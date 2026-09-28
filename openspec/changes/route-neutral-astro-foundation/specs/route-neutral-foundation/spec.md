# Specification: route-neutral static Astro foundation

## Requirements

### REQ-01 — Isolated application root

The implementation MUST place the Astro application under `site/` and configure every package, type-check, test, development, preview, and build command to use that directory as the project root. The hosted CI job MUST materialize the `site/**` tree plus only `.github/` and `.github/workflows/` as parent directories of `.github/workflows/route-neutral-astro-foundation.yml` and that single workflow file. It MUST verify the exact sparse-checkout patterns and full materialized working-tree inventory before any installation or scan, excluding only Git metadata `.git/`, and fail closed on any other file or directory. The guard MUST NOT read file contents or print unexpected path values, checkout credentials, or environment values; failure output MUST be generic. It MUST NOT create a root-level application or read/import/symlink/copy any POC path. If isolation cannot be verified, CI MUST stop without a full-checkout fallback.

#### Scenario: repository contains unrelated local POC material

- GIVEN the repository has unrelated POC material outside `site/`
- WHEN the foundation is checked, built, or run in CI
- THEN the application inputs and generated output are restricted to `site/`
- AND the CI working tree contains only the `site/` tree and the single workflow file, with `.github/` parent directories allowed only to contain that workflow
- AND CI fails before installation or scanning if sparse checkout or inventory verification is missing, incomplete, or mismatched
- AND no POC path or content is read into the application, test scan, runner artifact, or deliverable.

### REQ-02 — Reproducible pinned toolchain

The implementation MUST verify the latest stable (non-prerelease) Astro version and its supported Node engine from official sources at implementation time. It MUST record the version, engine evidence, exact source URLs, and retrieval date. Astro and direct dependencies MUST use exact versions; the npm lockfile MUST be committed and used with `npm ci`. A single exact Node version MUST be pinned and shared by local setup and hosted CI.

#### Scenario: version is a prerelease or engine-incompatible

- GIVEN the registry's latest tag resolves to a prerelease or an Astro version does not support the selected Node release
- WHEN toolchain selection is made
- THEN the implementation MUST select a current stable release with a supported pinned Node version and document that evidence
- AND MUST NOT silently pin the prerelease or retain an incompatible Node version.

#### Scenario: lockfile is stale or dependency range floats

- GIVEN the manifest uses a floating/ranged direct dependency or the lockfile is absent/inconsistent
- WHEN `npm ci` or the scope verifier runs
- THEN verification MUST fail until the exact manifest and lockfile are reconciled.

### REQ-03 — Static TypeScript-only architecture

The application MUST use Astro with TypeScript, strict Astro TypeScript configuration, and explicit `output: 'static'`. It MUST contain no adapter, server output, request-time route, API/action, framework island, CMS/editor, content collection, Markdown/MDX, form, analytics, webhook, mail, or host integration.

#### Scenario: source or dependency adds runtime/editor functionality

- GIVEN a package, configuration, import, page, or output adds a prohibited integration or request-time capability
- WHEN `npm run test:scope:source` runs
- THEN it MUST exit non-zero and identify the violated scope rule without accepting an unknown exception.

### REQ-04 — Local-only demonstration, not a public site

The application MUST render only `/` as a clearly disclosed local foundation demonstration. Its visible body text MUST match the exact four-string allowlist in `design.md` (skip-link label plus three synthetic demo labels) after whitespace normalization, and its document title MUST equal `Local foundation demonstration`. The only head metadata beyond the title and local stylesheet reference may be charset, viewport, and noindex/nofollow. It MUST NOT contain a description, canonical/social/structured-data metadata, hidden/off-screen/CSS-generated text, or additional accessible name. It MUST NOT state or imply agency/client identity, a named service, capability, buyer, geography, completed work, testimonial, metric, credential, portfolio, public contact route, or finished site. It MUST include a noindex/nofollow directive as a precaution, while documenting that this is not access control.

#### Scenario: content changes beyond the fixture

- GIVEN any additional visible body text, route, image, identity, claim, proof, or publication cue appears
- WHEN the scope verifier runs against source and built output
- THEN it MUST fail closed pending an approved scope change.

### REQ-05 — No data collection or outbound runtime dependency

The app MUST contain no form/control that submits data, contact destination, API endpoint, server action, cookie/session, analytics, remote asset, remote font, remote script/style, network request, or third-party runtime call. No client-side JavaScript is necessary or allowed in this demonstration.

#### Scenario: form, network request, or external resource is introduced

- GIVEN the source or generated output contains a submission mechanism, outbound URL/request, unrecognized script, or non-local resource
- WHEN the scope verifier runs
- THEN it MUST fail and provide no waiver-by-warning path.

### REQ-06 — Truthful accessible semantic shell

The root page MUST use semantic header, main, footer, one page-level heading, and a first-focusable skip link to the main region. Focus MUST be visible; layout MUST preserve logical reading order and reflow without horizontal scrolling. It MUST use local styling, minimal/no JavaScript, and no nonessential motion. WCAG 2.2 AA is the target, not a certification claim.

#### Scenario: keyboard or responsive review finds a defect

- GIVEN the browser check finds inaccessible focus, a broken skip link, lost content, overlap, or horizontal scrolling
- WHEN acceptance is reviewed
- THEN the defect MUST be fixed and the applicable browser evidence repeated before acceptance.

### REQ-07 — Fail-closed exclusion verifier

`site/scripts/verify-scope.mjs` MUST provide `--source` and `--output` modes exposed as `npm run test:scope:source` and `npm run test:scope:output`. CI MUST run source mode before build and output mode after build. Source mode checks the app/page/config/manifest/dependency/ignore boundary and exact markup/head/content constraints; output mode checks the built HTML/CSS/file inventory, resource and script boundary, and exact rendered content. Output mode MUST fail if `dist/` is missing or malformed. Each mode MUST fail if a required input is missing. Both MUST check absence of integrations/routes/MDX/forms/contact/network/script features, exact four-string body copy, exact document title and allowed head metadata, no hidden/CSS-generated/accessibility-only claim text, mandatory synthetic disclaimer/noindex directive, absence of external URLs and unexpected output, and source path confinement where applicable. They MUST scan only the application source and its build output and MUST NOT walk the POC tree. Unknown or uncheckable cases MUST fail, not pass silently.

#### Scenario: verifier cannot complete a required check

- GIVEN a required file, manifest, output directory, or check is missing or unreadable
- WHEN the verifier runs
- THEN it MUST exit non-zero; it MUST NOT skip the failed check.

### REQ-08 — Offline build

After dependencies have been installed from the committed lockfile, `npm run build` MUST pass with outbound network access denied and with only the app root mounted/available to the build. Package installation itself may use the network before this test. `npm ci --offline` alone is not offline-build evidence.

#### Scenario: network isolation cannot be enforced

- GIVEN the local environment cannot deny outbound network access
- WHEN offline-build verification is attempted
- THEN the evidence MUST state BLOCKED/NOT RUN and the foundation MUST NOT be marked fully verified.

### REQ-09 — Local automated verification

The following commands MUST pass from `site/` using the pinned toolchain:

```sh
npm ci
npm audit --include=dev --audit-level=low
npm run check
npm run test:scope:source
npm run build
npm run test:scope:output
./node_modules/.bin/playwright install chromium
npm run test:a11y
```

The checks MUST include `astro check`, lockfile-wide vulnerability audit, scope verification both before and after build, production static build, and the locked-browser automated accessibility test. The Gitleaks scans required by REQ-13 run from the repository root before dependency installation/build. A passing build alone MUST NOT be represented as verification of TypeScript, accessibility, responsive behavior, or public claims.

### REQ-10 — Manual browser and accessibility review

The built local preview MUST be inspected at 320, 390, 768, 1024, and 1440 CSS-pixel widths and 200% zoom; with keyboard-only input; for landmarks, heading, skip link and visible focus; for reduced motion; and for text/focus/non-text contrast against the thresholds in `design.md`. The evidence MUST state browser/version, widths, zoom, measurements, findings, and fixes. No conformance claim may be made without appropriate evidence.

### REQ-11 — Hosted CI only, no release actions

A GitHub-hosted workflow MUST run on pull requests and pushes with explicit read-only permissions, full-SHA-reviewed actions, no secrets, and mandatory non-cone sparse checkout of exactly `site/` and `.github/workflows/route-neutral-astro-foundation.yml`. It MUST set checkout `persist-credentials: false`, verify sparse-checkout configuration and the entire materialized working-tree inventory before any installation or scan, and fail closed without full-checkout fallback if any extra path appears or verification cannot run. It MUST run install, dependency audit, secret scan, type check, source-scope verification, static build, output-scope verification, and automated browser accessibility test. It MUST NOT deploy, publish a preview, upload repository/build/screenshot/scan artifacts, use a paid service/account, change DNS, or perform production work.

#### Scenario: pull request requests production credentials or deployment

- GIVEN a change introduces a secret, deploy step, upload, preview publish, or production credential to the workflow
- WHEN workflow review or the scope verifier runs
- THEN the change MUST be rejected as outside this specification and the workflow MUST remain non-deploying.

### REQ-12 — Evidence-based implementation handoff

The implementation handoff MUST include `docs/08-route-neutral-foundation.md` and a narrow update to the P8.1 entry and next-step pointer in `PROJECT_STATUS.md` after verification and acceptance. The evidence note MUST map every requirement to its actual commands, results, browser/manual observations, hosted run evidence, and artifact paths as applicable, and MUST label missing, simulated, research-only, or unobserved checks `BLOCKED` or `NOT RUN`. Neither the note nor status may describe a requirement as verified without corresponding executed evidence. The handoff MUST preserve the D-013 scope and G3 boundary.

#### Scenario: required verification is unavailable or incomplete

- GIVEN a required check is blocked, simulated, research-only, or not run
- WHEN the implementation handoff is prepared
- THEN the evidence note and project status MUST identify the limitation accurately
- AND MUST NOT mark the requirement or foundation fully verified.

### REQ-13 — Dependency-vulnerability and secret-scanning gates

Local verification and hosted CI MUST run a dependency-vulnerability scan of the complete `site/package-lock.json` dependency graph, including development dependencies, using `npm audit --include=dev --audit-level=low` under the pinned Node/npm toolchain [5][6]. Any reported advisory at low or higher severity, scan error, missing lockfile, or inability to complete the scan MUST fail acceptance and CI. They MUST also run Gitleaks filesystem directory/file mode only against exactly `site/.gitignore`, `site/.nvmrc`, `site/package.json`, `site/package-lock.json`, `site/astro.config.mjs`, `site/tsconfig.json`, `site/src/`, `site/scripts/`, `site/playwright.config.ts`, `site/tests/`, and `.github/workflows/route-neutral-astro-foundation.yml`; generated output/dependency directories, docs, and Git history are excluded, and scanners MUST NOT target repository root. Install Gitleaks outside the repository from an exact stable official release with its published SHA-256 verified, and run with full redaction, no verbose output, and no unredacted report. Any detected secret or scanner/install/configuration error MUST fail acceptance and CI. Record scanner/tool versions, checksum, exact scope/commands, exit statuses, vulnerability severity/count, and redacted finding count; never print, upload, or retain secret values. These scans are independent of and MUST NOT be claimed as satisfied by the scope verifier.

#### Scenario: a vulnerability or secret finding is detected

- GIVEN either required scan reports a vulnerability at low or greater severity, detects a secret, or cannot complete
- WHEN local or hosted verification runs
- THEN the command/job MUST fail and acceptance MUST remain blocked
- AND the evidence/log may contain only non-sensitive, redacted summaries and MUST NOT expose secret values.

### REQ-14 — Automated accessibility and retained responsive screenshots

The implementation MUST use exact locked versions of maintained Playwright Test and `@axe-core/playwright`, with the Chromium revision installed by that locked Playwright version. Playwright MUST serve only the built local static preview on loopback. The browser test MUST scan the synthetic page at 320, 390, 768, 1024, and 1440 CSS-pixel widths for WCAG 2.0, 2.1, and 2.2 A/AA axe rules; any violation, test/browser error, or skipped scan MUST fail local verification and hosted CI. It MUST NOT suppress violations without a reviewed scope change. Local evidence MUST retain screenshots of the synthetic page at 390×844 (mobile), 768×1024 (tablet), and 1440×900 (desktop) at `docs/08-route-neutral-foundation/screenshots/mobile-390x844.png`, `tablet-768x1024.png`, and `desktop-1440x900.png`, respectively, and record visual inspection findings for each. CI MUST NOT upload screenshot or test-report artifacts. Automated checks and screenshots do not replace the manual keyboard, focus, zoom, semantic, reduced-motion, and contrast review in REQ-10, and do not establish WCAG conformance.

#### Scenario: an axe violation or responsive screenshot review fails

- GIVEN an automated axe scan reports any violation or any required screenshot/visual inspection is missing or has an unresolved defect
- WHEN acceptance is reviewed
- THEN the test or acceptance MUST fail until the defect is fixed and evidence is repeated
- AND no automated scan or screenshot alone may be represented as manual accessibility review or conformance.
