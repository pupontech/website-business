# Acceptance and verification matrix

This matrix defines future implementation evidence. Nothing below is reported as run by authoring this change.

| Requirement | Acceptance evidence | Command / procedure | Fail-closed result |
|---|---|---|---|
| REQ-01 isolated root | Project commands/build context resolve only to `site/`; hosted checkout materializes only `site/**` plus the named workflow file (allowing its two parent directories); exact non-cone sparse patterns and recursive working-tree inventory are checked before installation/scan | From repository root inspect checkout settings and inventory guard; in hosted run verify exact `git sparse-checkout list` and filesystem inventory before any install | Any extra/missing path, inability to verify, or full-checkout fallback fails before proceeding |
| REQ-02 pinned stable toolchain | Dated record of official npm registry/Astro docs lookup, current stable Astro version, supported Node engine, exact Node pin, direct dependency exact versions, committed lockfile | At implementation time verify `https://registry.npmjs.org/astro/latest` plus official Astro TypeScript/CLI docs; inspect `site/package.json`, `site/package-lock.json`, `site/.nvmrc`; run `npm ci` | Prerelease, incompatible Node, range/floating dependency, missing or stale lockfile fails |
| REQ-03 static TypeScript architecture | Strict TS check; explicit static output; no adapter/server/API/MDX/CMS/editor/framework packages or source | `cd site && npm run check && npm run test:scope:source`; review Astro config and manifest | Any prohibited direct dependency, integration, route, content system or unknown addition fails |
| REQ-04 demo truth boundary | One root page; exact four-string allowlist, exact document title, allowed head metadata, noindex/nofollow; no identity, public claim, proof or extra route | `cd site && npm run test:scope:source && npm run build && npm run test:scope:output`; inspect `site/dist/index.html` and CSS | Missing disclaimer/noindex/title or extra text, metadata, route, claim, or output fails |
| REQ-05 no form/network | No form or submit controls/destination, API/action, mail, contact path, runtime network request, remote resource, or client script | `cd site && npm run test:scope:source && npm run build && npm run test:scope:output`; inspect output resource references | Any such behavior or unknown script/resource fails |
| REQ-06 accessible shell | Semantic landmarks, single H1, skip link target, visible focus, logical reading order; responsive local styling | Built preview plus `npm run test:a11y`; separate manual checks at required widths/zoom and keyboard steps | Any automated/manual accessibility, focus, semantic, overflow, or reflow failure blocks acceptance |
| REQ-07 exclusion guard | Source-mode and output-mode checks reject invalid input at the correct build stage without accessing POC paths | `cd site && npm run test:scope:source && npm run build && npm run test:scope:output`; mutation checks in disposable copies as specified in T2 | Missing/wrong-stage input, prohibited feature or unknown output cannot be skipped |
| REQ-08 offline build | Production build and output-mode check succeed after install while outbound network is denied; exact isolation mechanism is recorded | After `npm ci`, run `npm run build && npm run test:scope:output` inside an OS network-isolated namespace/container with only `site/` available | If isolation cannot be enforced, record BLOCKED/NOT RUN; regular build is not a substitute |
| REQ-09 local checks | All local commands pass under the pinned toolchain, including the lockfile audit and automated browser test | Run the full command record below after the separate Gitleaks source scan | Any failed command blocks acceptance |
| REQ-10 manual browser/accessibility review | Browser/version, 320/390/768/1024/1440 CSS-pixel widths, 200% zoom, keyboard, landmarks, reduced motion, and contrast findings recorded; no conformance claim | Inspect the local built preview. Measure normal text ≥4.5:1, large text ≥3:1, and relevant non-text focus/UI ≥3:1; Tab/Shift+Tab and activate the skip link | Missing measurements, findings, or unresolved defect blocks acceptance |
| REQ-11 hosted CI/no release | Green actual GitHub-hosted run URL/commit; explicit read-only permissions; checkout `persist-credentials: false`; exact non-cone sparse allowlist and fail-closed recursive inventory check before installation/scans; all required checks pass; no deploy/upload | Inspect workflow and actual hosted run; verify exact sparse patterns, only `site/` plus named workflow file in working tree, and sequential check results | Local-only result, workflow simulation, extra path, missing isolation proof, full-checkout fallback, credential exposure, or deployment/upload step fails |
| REQ-12 honest handoff | Phase 8 evidence note and narrow status update distinguish each result and limitation | Read `docs/08-route-neutral-foundation.md` and `PROJECT_STATUS.md`; compare each claim to command/browser/hosted evidence | Simulated, blocked, research-only, or unobserved items labeled verified fail review |
| REQ-13 vulnerability/secret scans | Full lockfile vulnerability audit and Gitleaks scans of exact allowlisted source/config/manifest/workflow paths; exact versions/checksum, scan scope, exit statuses, advisory severity/count, redacted finding count, and no secret values recorded | `cd site && npm audit --include=dev --audit-level=low`; separately run pinned Gitleaks `dir` mode for each named source/config/manifest/workflow path with `--redact=100`, no verbose output/report; repeat in hosted CI | Any low-or-higher advisory, secret finding, scanner/install/configuration failure, wrong scope, missing evidence, or secret value in logs/evidence fails |
| REQ-14 automated accessibility/screenshots | axe WCAG 2.0/2.1/2.2 A/AA checks pass at all five widths; three retained mobile/tablet/desktop screenshots each have visual-inspection record; hosted CI does not upload test artifacts | `cd site && ./node_modules/.bin/playwright install chromium && npm run test:a11y`; retain/inspect the three named docs paths; verify same browser test in hosted CI | Any axe violation/error/skipped width, missing screenshot/inspection, unresolved visual defect, unpinned browser/tool, or CI artifact upload fails |

## Required implementation command record

Record exit status and relevant version output for the app commands below. Run Gitleaks from a separate repository-root invocation before `npm ci` or build, not from the `site/` working directory.

```sh
cd site
node --version
npm --version
npm ci
npm audit --include=dev --audit-level=low
npm run check
npm run test:scope:source
npm run build
npm run test:scope:output
./node_modules/.bin/playwright install chromium
npm run test:a11y
npm run preview -- --host 127.0.0.1
```

Run the production build and output-mode scope check again after `npm ci` inside an outbound-network-denied sandbox. The sandbox run is separate from package installation. Do not use `npm ci --offline` as the only offline check.

Before `npm ci` or build, install the exact Gitleaks stable release outside the repository and verify its official published SHA-256. From the repository root, run `gitleaks dir --redact=100` separately for each path below (no `-v`, no report file, no repository-root scan, no Git-history scan); any scan error or finding fails. Use the same explicit path list in the hosted workflow. Record version, official release/checksum, path scope, command and exit status, with a redacted finding count only:

```sh
gitleaks dir site/src/ --redact=100
gitleaks dir site/scripts/ --redact=100
gitleaks dir site/tests/ --redact=100
gitleaks dir site/.gitignore --redact=100
gitleaks dir site/.nvmrc --redact=100
gitleaks dir site/package.json --redact=100
gitleaks dir site/package-lock.json --redact=100
gitleaks dir site/astro.config.mjs --redact=100
gitleaks dir site/tsconfig.json --redact=100
gitleaks dir site/playwright.config.ts --redact=100
gitleaks dir .github/workflows/route-neutral-astro-foundation.yml --redact=100
```

Never print or retain a secret value in logs, reports, or the evidence note. The Gitleaks binary/checksum remain in temporary storage, not the repository. `npm audit --include=dev --audit-level=low` runs after `npm ci` and any advisory at low or greater severity blocks acceptance.

## Manual browser record

For each viewport (320, 390, 768, 1024, 1440 CSS px), record rendered status, horizontal overflow, clipping, content order, and focus appearance. Record 200% zoom behavior; keyboard-only reachability/activation of the skip link; landmark/H1 review; reduced-motion state; contrast ratios and colors/states measured; browser/version; and any remediation/retest. Retain the Playwright PNGs at 390×844, 768×1024, and 1440×900 as `docs/08-route-neutral-foundation/screenshots/mobile-390x844.png`, `tablet-768x1024.png`, and `desktop-1440x900.png`; record an actual visual inspection and findings for each screenshot. No screenshots, test reports, or other artifacts are uploaded from CI. Because the demonstration has no form or navigation, do not add controls merely to create test coverage.

## Hosted CI record

Record workflow filename, run URL, commit SHA, runner image version, Node/npm/Astro/Playwright/Chromium/Gitleaks versions, Gitleaks checksum, exact checkout allowlist and inventory result, vulnerability/secret scan scopes and redacted results, source-scope/build/output-scope/accessibility step results, and confirmation that no secrets, checkout credential persistence, deployment, preview publishing, artifact upload, account, or paid service was used. Green hosted CI is not a production, manual accessibility, conformance, CMS, form, or offline-network proof unless that exact evidence is separately recorded.
