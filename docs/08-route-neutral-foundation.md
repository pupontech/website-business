# Phase 8.1 Route-Neutral Astro Foundation — Local Evidence

Last verified: 2026-09-27
Scope: D-013 route-neutral static-first Astro/TypeScript foundation only. This is local evidence, not approval of a finished agency site, preview publication, production readiness, or G3.
Overall status: BLOCKED / NOT FULLY VERIFIED.

## Summary

The Node-pinned dependency install, audit, Astro check, source/output scope checks, static build, Playwright accessibility suite, secret scans, network-denied build, and three post-fix canonical screenshot captures passed. The six Playwright cases (195 CSS px reflow proxy and required 320, 390, 768, 1024, and 1440 CSS px) passed with zero axe violations and no horizontal overflow. Additional headless Chromium manual probes confirmed no overflow at all six widths; keyboard skip-link operation, reduced-motion behavior, and measured text/focus contrast passed.

The dependent fix `t_42066f18` resolved the previously measured 195 CSS-pixel overflow: the post-fix document scroll width is 195 px, main content width is 161 px, and all text fits. The 195 CSS-pixel viewport is only a layout-width proxy for a 390 CSS-pixel viewport at 200% zoom. Sol separately operated actual browser UI zoom at 200% in headed Chromium after this revalidation; the measured layout and visual inspection passed (record below). Full P8.1 acceptance is still BLOCKED pending hosted CI. A read-only `gh run list --workflow route-neutral-astro-foundation.yml --limit 5` attempt returned HTTP 404 because that workflow is not present on the remote repository; no hosted run URL/commit exists. No commit or push was started at this evidence checkpoint.

Hosted GitHub Actions CI acceptance is BLOCKED; the run is NOT RUN. The workflow is local, uncommitted/unpushed work in this repository state; no hosted run URL, commit, or runner image evidence exists. No commit or push was started for this task. No deployment, preview publication, CMS/form work, account, paid service, DNS, or production action occurred. G3 remains blocked.

## Toolchain and dependency evidence

Retrieval date for volatile package metadata: 2026-09-27.

- `site/.nvmrc` pins Node 24.21.0. The official Node.js release page identifies v24.21.0 as the LTS release dated 2026-09-08 [1]. The local checks used Node v24.21.0 via `npm exec --yes --package=node@24.21.0`; the host default was v22.23.2. npm CLI used for local commands was 10.9.8. The npm CLI version is recorded, not pinned by this project.
- Astro is pinned at 7.3.5. The live npm registry `latest` metadata returned 7.3.5 with `node >=22.12.0`; Astro's current installation docs also require Node v22.12.0 or higher [2].
- Registry `latest` versions matched the exact pins for `@astrojs/check` 0.9.10, `@playwright/test` 1.63.0, and `@axe-core/playwright` 4.13.0 [3].
- TypeScript is pinned exactly at 6.0.3. Registry `latest` was 7.0.2, but the pinned `@astrojs/check` 0.9.10 peer range is `^5.0.0 || ^6.0.0`; TypeScript 6.0.3 is within that declared range, whereas 7.0.2 is not. The existing exact pin was retained; this evidence task made no dependency changes [4].
- Playwright's installed Chromium reported version 153.0.8010.12; the T3 handoff records locked Playwright 1.63.0 and Chromium revision v1243.

## Command record

All commands below ran from `site/`, except Gitleaks, offline-container commands, and `git diff --check`.

| Command | Result |
|---|---|
| Node/npm versions | PASS — Node v24.21.0 (pinned Node binary on PATH); npm 10.9.8 |
| `npm ci` | PASS with environment note — plain `npm ci` exited 0 but `npm config get omit` reported `dev`, leaving dev dependencies absent; reran as `npm ci --include=dev` under Node v24.21.0: 282 packages added, 283 audited, 0 vulnerabilities |
| `npm audit --include=dev --audit-level=low` | PASS — 283-package lockfile graph; 0 vulnerabilities at any severity, including development dependencies |
| `npm run check` | PASS — Astro check: 0 errors, 0 warnings, 0 hints |
| `npm run test:scope:source` | PASS |
| `npm run build` | PASS — one static `/` page generated |
| `npm run test:scope:output` | PASS |
| `./node_modules/.bin/playwright install chromium` | PASS — exit 0; installed locked Playwright Chromium |
| `npm run test:a11y` | PASS — 6/6 tests at 195, 320, 390, 768, 1024, and 1440 CSS px; axe reported zero violations for the configured WCAG 2.0/2.1/2.2 A/AA tags; no overflow assertion failed |
| Offline `npm run build` + output scope | PASS — exact Docker commands and network-isolation record below |
| `git diff --check` | PASS — final run after evidence note/status edits; no whitespace errors |
| Lint/format | NOT RUN — no lint or format script is declared in `site/package.json` |

The T2 handoff (`t_df06a521`) records positive source/build/output checks and disposable-copy negative cases: prohibited React dependency, form/action, external URL, unapproved copy, unexpected source route, unexpected output file, unapproved built copy, missing CSS source, missing `dist/`, and missing mode argument all failed closed. These probes used disposable copies and did not traverse POC paths.

## Secret-scan record

Gitleaks v8.30.1 scanned each of the exact 11 paths below in a separate invocation with `dir --redact=100`; all invocations exited 0 and reported `no leaks found` (0 findings). Scans ran from the official GHCR image with `--network none` and a read-only bind mount of only the individual path; no report was written and no secret values were printed or retained:

- `site/.gitignore`
- `site/.nvmrc`
- `site/package.json`
- `site/package-lock.json`
- `site/astro.config.mjs`
- `site/tsconfig.json`
- `site/src/`
- `site/scripts/`
- `site/playwright.config.ts`
- `site/tests/`
- `.github/workflows/route-neutral-astro-foundation.yml`

The official v8.30.1 Linux x64 release archive was downloaded outside the repository. `sha256sum` returned `551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb`, matching the Linux x64 entry in the official release checksum list [5]. The archive binary itself was not executed: the prior local extraction attempt was blocked by the terminal safety gate, so the scanner ran from official image `ghcr.io/gitleaks/gitleaks:v8.30.1` (reported version v8.30.1; image digest `sha256:c00b6bd0aeb3071cbcb79009cb16a60dd9e0a7c60e2be9ab65d25e6bc8abbb7f`). Each invocation used `docker run --network none` with a read-only mount of exactly one allowlisted file/directory. This is the installation fallback, not a claim that the downloaded archive executable ran. Hosted scanning is NOT RUN.

## Offline-build evidence

After dependency installation, used official `node:24.21.0` image digest `sha256:64af3819f9275802414d7cdc38c27e9d82bd564dec4d4da87d008255d36c63b4`. Both exact commands exited 0:

```sh
docker run --network none --mount type=bind,src=/root/Projects/website-business/site,dst=/site --workdir /site --entrypoint npm node:24.21.0 run build
docker run --network none --mount type=bind,src=/root/Projects/website-business/site,dst=/site --workdir /site --entrypoint npm node:24.21.0 run test:scope:output
```

Only `site/` was mounted, at `/site`; outbound networking was disabled. The build generated one static `/` page and the output verifier passed. No `/app` mis-mount attempt was made during this revalidation.

## Built preview and manual/browser findings

The automated suite used the configured local preview command `npm run preview -- --host 127.0.0.1` at `http://127.0.0.1:4321/`. Supplemental headless Chromium 153.0.8010.12 measurements served only `site/dist/` on loopback and confirmed the built title/fixture and geometry. These are headless CSS viewport checks, not browser UI zoom.

| CSS viewport | HTTP | Horizontal overflow | Main within viewport | Landmarks/H1 |
|---|---:|---|---|---|
| 195 × 900 zoom-equivalent proxy | 200 | No; document scroll width 195 px | Yes; main width 161 px and all text fits | header, main, footer; one H1 |
| 320 × 900 | 200 | No; document scroll width 320 px | Yes | header, main, footer; one H1 |
| 390 × 844 | 200 | No; document scroll width 390 px | Yes | header, main, footer; one H1 |
| 768 × 1024 | 200 | No; document scroll width 768 px | Yes | header, main, footer; one H1 |
| 1024 × 900 | 200 | No; document scroll width 1024 px | Yes | header, main, footer; one H1 |
| 1440 × 900 | 200 | No; document scroll width 1440 px | Yes | header, main, footer; one H1 |

At 195 CSS px after the fix, the H1 and paragraphs wrap inside the card and no document or content overflow is measured. This is a CSS viewport proxy, not the actual browser zoom check below.

Sol's separate actual zoom check: headed Chromium 153.0.8010.12 under Xvfb, serving only the built `site/dist/` on loopback. An X11 `xdotool` physical `Ctrl++` key sequence focused the Chrome window and increased the browser's own UI zoom through 110%, 125%, 150%, 175%, to **200%**, visibly confirmed by Chrome's zoom popup in a full-screen `scrot` capture. At the 800-pixel browser window the CSS `innerWidth` changed from 800 to 400 and `devicePixelRatio` from 1 to 2; document scroll width was 392, main scroll width 359, and H1 scroll width 311 CSS px. The physical screen capture at 200% was visually inspected: complete heading and both paragraphs remain inside the card, with no horizontal clipping or overlap. The capture is temporary at `/root/.hermes/cache/scratch/astro-actual-200-screen.png`, not a retained deliverable screenshot; the three canonical screenshots remain the retained ones. This checks a real browser UI zoom on the available window, not every possible viewport/device combination. An earlier Playwright page-screenshot of a zoomed page showed an incorrectly cropped 400-pixel image despite the full physical window being intact; the full physical screen capture, not that page-screenshot, is the visual evidence used here.

Keyboard-only review: first Tab focused the visible “Skip to main content” link with a 3 px blue outline (`:focus-visible` true); Enter moved focus to `main#main-content`; Shift+Tab returned to the skip link with `:focus-visible` true. Landmark review found semantic header/main/footer and one H1. No additional focusable controls were present.

Reduced-motion review: Chromium emulation of `prefers-reduced-motion: reduce` matched true and computed `scroll-behavior: auto`; the fixture has no animated content. Contrast was measured from computed CSS colors using WCAG relative luminance: normal body text on the white card 16.29:1; white skip-link text on dark background 16.29:1; blue focus outline against page background 5.48:1 and card white 5.98:1. These measured text ratios exceed 4.5:1 and focus-indicator ratios exceed 3:1. No conformance claim is made.

## Retained screenshots and visual inspection

All three screenshots were copied from the post-fix local Playwright run, verified from PNG headers at their exact named dimensions, and visually inspected. They contain only the approved synthetic fixture; no POC material or private data appears.

- `docs/08-route-neutral-foundation/screenshots/mobile-390x844.png` — 390 × 844, 22,293 bytes. Card has 16 px side gutters; H1 wraps cleanly; both fixture paragraphs are visible; no clipping or unexpected content.
- `docs/08-route-neutral-foundation/screenshots/tablet-768x1024.png` — 768 × 1024, 27,156 bytes. Card spans most of the viewport with balanced margins; heading and both paragraphs are visible without overlap or clipping.
- `docs/08-route-neutral-foundation/screenshots/desktop-1440x900.png` — 1440 × 900, 31,880 bytes. Constrained card is centered with generous whitespace; all fixture text is visible; no unexpected content.

These canonical-width screenshots pass visual inspection. The separate 195 px proxy was also retested after the fix and passes; actual 200% browser UI zoom remains unverified.

Additional non-retained diagnostic captures at 320 × 900 and 1024 × 900 were also visually inspected. At 320 px the card and all text remain within the viewport, with the H1 and paragraphs wrapping inside the card; at 1024 px the constrained card is centered and all fixture text is visible. These diagnostic captures are temporary and are not retained as deliverable screenshots.

## Requirement-by-requirement disposition

| Requirement | Status | Evidence / limitation |
|---|---|---|
| REQ-01 Isolated application root | PARTIAL | Site-local source/output checks pass and T2 negative cases pass. Workflow statically defines fail-closed sparse checkout and materialized-path guard, but hosted guard was not exercised. |
| REQ-02 Pinned toolchain | PASS locally | Exact Node pin, exact npm dependency pins, lockfile, `npm ci`, registry/Astro/Node provenance recorded above. Local npm CLI was 10.9.8. |
| REQ-03 Static TypeScript architecture | PASS locally | `astro check` and source-scope verification pass; static build succeeds. |
| REQ-04 Synthetic-only content | PASS locally | Source/output scope checks pass; preview and screenshots contain only the exact synthetic copy/title/noindex fixture. |
| REQ-05 No form/network behavior | PASS locally | Source/output scope checks pass; static output is restricted to one HTML page and one local stylesheet. |
| REQ-06 Accessible semantic shell | PASS locally for tested conditions; not a conformance claim | Axe, keyboard, semantics, contrast, reduced motion, 195/320/390/768/1024/1440 CSS-pixel reflow, and a separate actual 200% Chrome UI zoom check pass. |
| REQ-07 Fail-closed exclusion verifier | PASS locally | T2 reports successful source/output checks and required disposable-copy negative cases. No POC path was traversed. |
| REQ-08 Offline build | PASS locally | Docker `--network none`, only `site/` mounted at `/site`; static build and output-scope check both pass. |
| REQ-09 Local automated verification | PASS locally | Node 24.21.0 dependency install (with `--include=dev` because npm config otherwise omits dev dependencies), full low-level audit, Astro check, source scope, build, output scope, Chromium install, and 6/6 a11y tests pass. |
| REQ-10 Manual browser/accessibility review | PASS locally for tested conditions; not a conformance claim | Required CSS widths including the 195 px proxy, keyboard, landmarks, reduced motion, and contrast were measured. Sol independently used headed Chrome UI zoom at 200% and inspected the full physical screen; details and limitation above. |
| REQ-11 Hosted CI/no release | BLOCKED — NOT RUN | Read-only `gh run list --workflow route-neutral-astro-foundation.yml --limit 5` returned HTTP 404 (workflow absent remotely); no hosted run URL/commit/runner evidence. No commit or push was performed. |
| REQ-12 Honest handoff | PASS | This evidence note and the narrow P8.1/Next task status update distinguish results and blockers. |
| REQ-13 Vulnerability/secret scans | PASS locally; hosted NOT RUN | `npm audit --include=dev --audit-level=low`: zero findings. All 11 Gitleaks scans via official v8.30.1 image passed with `--redact=100`; each reported no leaks and zero findings. Release archive checksum matched official list. Native archive extraction was blocked; see scanner note. |
| REQ-14 Automated a11y/screenshots | PASS locally | Six axe/overflow widths pass with zero axe violations; all three exact-size post-fix screenshots retained and visually inspected. CI artifact upload behavior was reviewed in the workflow; hosted behavior was not exercised. |

## Sources

[1] Node.js v24.21.0 LTS release page, dated 2026-09-08: https://nodejs.org/en/blog/release/v24.21.0

[2] Astro install prerequisites: https://docs.astro.build/en/install-and-setup/ ; npm registry Astro latest metadata: https://registry.npmjs.org/astro/latest

[3] Official npm registry metadata, retrieved 2026-09-27: https://registry.npmjs.org/%40astrojs%2fcheck/latest ; https://registry.npmjs.org/%40playwright%2ftest/latest ; https://registry.npmjs.org/%40axe-core%2fplaywright/latest

[4] TypeScript download/version page: https://www.typescriptlang.org/download/ ; npm registry TypeScript latest metadata: https://registry.npmjs.org/typescript/latest

[5] Gitleaks official project and Docker guidance: https://github.com/gitleaks/gitleaks ; v8.30.1 official release checksum list: https://github.com/gitleaks/gitleaks/releases/download/v8.30.1/gitleaks_8.30.1_checksums.txt

[6] Playwright accessibility testing documentation: https://playwright.dev/docs/accessibility-testing
