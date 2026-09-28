# Acceptance criteria

This acceptance list applies only after a separate implementation task; the OpenSpec authoring task does not satisfy it.

- [ ] Independent review accepted this OpenSpec change before implementation began.
- [ ] Astro project exists only at `site/`; the exact currently stable Astro and compatible Node releases were verified from official sources and recorded with URLs/date.
- [ ] Direct dependencies, including Playwright Test and `@axe-core/playwright`, are exact versions; `site/package-lock.json` is committed; `.nvmrc` and CI Node agree; `npm ci` is reproducible; the locked Chromium revision is installed explicitly and recorded.
- [ ] Astro TypeScript strict checking and static build succeed; `output: 'static'` is explicit; no CMS, editor, MDX, forms, API, adapter, analytics, or hosted runtime is selected or integrated.
- [ ] The only route is `/`, with only the approved skip-link label and synthetic disclosure/demo labels, the exact demo document title, and allowed noindex metadata; no identity, service claim, proof, contact route, or finished-site implication appears in body, head, accessibility text, or CSS.
- [ ] Source-scope checks before build and output-scope checks after build fail closed on prohibited or unknown source, dependency, route, output, public text/metadata, form/network feature, and missing/wrong-stage check inputs; tests never traverse the POC tree.
- [ ] The build context and output are constrained to `site/`; no POC path/content, credential, source map, or unexpected asset is present in the app or build output.
- [ ] Local `npm audit --include=dev --audit-level=low` passes against the complete lockfile dependency graph; pinned Gitleaks scans the exact allowlisted source/config/manifest/workflow paths and reports no findings, with verified release checksum and no secret values in output/evidence.
- [ ] `npm ci`, `npm audit --include=dev --audit-level=low`, `npm run check`, `npm run test:scope:source`, `npm run build`, `npm run test:scope:output`, `./node_modules/.bin/playwright install chromium`, and `npm run test:a11y` pass locally; browser installation uses the locked Playwright CLI.
- [ ] A production build and output-scope check pass with outbound networking denied after dependencies have been installed; the isolation mechanism and result are recorded.
- [ ] Playwright/axe automation passes without violations at 320, 390, 768, 1024, and 1440 CSS-pixel widths; no rule/element suppression is used.
- [ ] Mobile 390×844, tablet 768×1024, and desktop 1440×900 synthetic-page PNGs are retained at the three named Phase 8 evidence paths and each has documented visual-inspection findings; manual keyboard/focus/zoom/semantics/reduced-motion/contrast review is separately complete with findings/fixes recorded. No unresolved accessibility issue or unsupported conformance claim remains.
- [ ] GitHub-hosted CI passes on the implementation commit, uses reviewed full-SHA actions and read-only permissions, and before any install/scan verifies exact non-cone sparse checkout of the `site/` tree and only the named workflow file (allowing `.github/` parent directories only). Checkout credentials are not persisted; extra paths fail closed with a generic error that does not print path/environment values; no secret, deployment, preview publishing, report, screenshot, or artifact upload occurs.
- [ ] Hosted `npm audit --include=dev --audit-level=low` and pinned/checksum-verified Gitleaks scans pass with exact scan scope and redacted result/count evidence; failures block acceptance and no secret values are emitted or retained.
- [ ] The Phase 8 evidence note and narrow status update reflect only executed evidence and retain CMS/form/account/paid/production/DNS/G3 boundaries.
- [ ] No implementation beyond this exact foundation is started; any scope change stops for owner decision and revised OpenSpec.
