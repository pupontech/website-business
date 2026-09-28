# Ordered implementation tasks — future work only

These tasks specify D-016 local-only implementation; authoring/reviewing the OpenSpec itself did not execute them. Do not dispatch source work until T0 is closed. Lanes A–E have sole, mutually disjoint file ownership. Reconcile every path against the locally verified foundation and its actual verifier before editing.

## T0 — Close gates and owner choices (no file writes)

**Depends on:** independent review of this revised OpenSpec, D-016 local-only authorization and approved choices, and parent verification of the local foundation baseline. Hosted P8.1 acceptance is deferred and blocks acceptance, push, preview and deployment—not local development.

**Work:** Apply D-016's exact route, identity, draft notice, qualified planning-label and Contact strings. Use only bracketed content-needed placeholders for other unknown copy. English only; qualitative static/no-JS/no-remote-request budget, with no numeric score. Confirm Ghost/any CMS, forms, preview, deployment, and public release are excluded.

**Exit checks:** Decisions are recorded in the owner-approved project record; the hosted gate is green for acceptance, or D-016 is recorded and the work remains local-only/unaccepted; the parent has verified local P8.1 checks under D-016 (hosted acceptance remains blocked); independent review passed; and the owner authorized this scope. Owner-approved defaults are recorded in D-016; no unresolved item silently defaults. If any gate remains open, stop without source edits.

## Lane A — Build the shared draft shell (T1)

**Depends on:** T0.

**Sole file ownership:** `site/src/layouts/AgencyDraftLayout.astro`; `site/src/components/DraftBanner.astro`; `site/src/components/PrimaryNav.astro`; `site/src/components/SiteFooter.astro`; `site/src/styles/global.css`.

**Work:** Implement semantic shared layout, skip link, navigation to the three confirmed routes, persistent approved private-draft banner, restrained responsive styling, and minimal footer. Keep the shell English, image-independent, local-only, and usable without JavaScript. Do not add page-specific copy or controls.

**Exit checks:** Shared contracts match owner decisions; every shell link is a local approved route; keyboard order/focus and responsive shell work; no external resource, hidden claim, final brand token, or inferred identity is introduced.

## Lane B — Implement Home route (T2)

**Depends on:** T1.

**Sole file ownership:** `site/src/pages/index.astro`.

**Work:** Replace only the synthetic foundation body with the minimal owner-approved Home draft and shared shell. Use the approved generic placeholder or neutral identity omission; include only clearly marked content-needed slots where real facts are unavailable.

**Exit checks:** `/` renders exactly one `h1`, shared shell and draft notice; contains no fabricated copy/proof or unapproved external/contact action; links only to confirmed Services and Contact routes.

## Lane C — Implement Services route (T3)

**Depends on:** T1 and T0 service-label decision.

**Sole file ownership:** `site/src/pages/services.astro`.

**Work:** Add only the owner-approved draft placeholders or explicitly qualified category labels. No service packages, capability claims, outcomes, prices, process, vendor selection, or CMS/editor claim.

**Exit checks:** `/services/` follows the confirmed trailing-slash contract, has one `h1` and shared notice, and rendered copy matches the approved placeholder/qualification allowlist.

## Lane D — Implement Contact route (T4)

**Depends on:** T1.

**Sole file ownership:** `site/src/pages/contact.astro`.

**Work:** Add the owner-approved “Contact — coming soon” text and clear statement that there is no form or message channel. No working-looking button, destination, or interactive contact control.

**Exit checks:** `/contact/` is static, has one `h1` and shared notice, and contains no form, submit path, email/phone/social destination, guessed recipient, or collection mechanism.

## Lane E — Extend route/output verification, browser tests, and hosted CI (T5)

**Depends on:** T1–T4.

**Sole file ownership:** `site/astro.config.mjs`; `site/scripts/verify-scope.mjs`; `site/tests/foundation-accessibility.spec.ts`; `site/playwright.config.ts`; `site/package.json`; `site/package-lock.json` only if a justified script/dependency change is required; `.github/workflows/route-neutral-astro-foundation.yml`. Lane E must not edit files owned by lanes A–D; any required cross-lane change stops for reassignment.

**Work:** Set the confirmed static route behavior; extend source and output allowlists from one synthetic page to exactly the three approved pages and local styles; verify per-route exact text/head/banner, metadata, nav and no-form/no-network boundaries; reject all unexpected files/routes/packages. Adapt the existing Playwright suite to each route and all required widths. Preserve exact pinned tooling unless review demonstrates a necessary change; add no dependency by default. Preserve fail-closed checkout/materialized-tree guards, `persist-credentials: false`, read-only permissions, full-lockfile audit, exact-scope redacted Gitleaks scan before package install/build, no deployment/preview/upload, and hosted evidence capture.

**Exit checks:** Positive route/source/build/output and accessibility tests pass; disposable-copy negative tests fail closed for extra route/output, unapproved text/metadata, form/contact destination, external resource, prohibited dependency, and missing input. Hosted CI remains BLOCKED/NOT RUN until billing is resolved. Passing hosted CI on exact commits is required for acceptance; local test work may proceed under D-016. No POC path is accessed or included.

## T6 — Run evidence matrix and hand off

**Depends on:** T5.

**Sole file ownership:** `docs/08-agency-draft-site.md`; `docs/08-agency-draft-site/screenshots/home-{mobile-390x844,tablet-768x1024,desktop-1440x900}.png`; equivalent `services-*` and `contact-*` screenshots; narrowly scoped P8.1/P8 status pointer in `PROJECT_STATUS.md`.

**Work:** Execute the command matrix in `verification.md`; inspect each route at required widths and actual 200% UI zoom; test keyboard/focus, semantics, reduced motion, contrast, route/status/content; capture and visually inspect three viewport screenshots per route; record output/JS/network inventory and reproducible lab result if run. Update status/card only after accepted evidence; retain blocked/not-run items honestly.

**Exit checks:** Evidence maps all requirements and exact artifacts/results; 9 screenshots exist at the specified dimensions and have route-specific visual findings; actual hosted CI URL/commit is recorded as blocked until a runner executes; no check is claimed passed without execution.

## Final stop

Stop after the locally verified, explicitly UNACCEPTED draft and evidence handoff while hosted CI is blocked. Do not configure or publish a password-protected preview, buy a service/domain, alter DNS, deploy production, enable a form/CMS, or launch publicly. Any preview requires a separate owner-approved task with tested authentication, HTTPS, noindex/non-public safeguards, artifact integrity, access denial, secret isolation, and rollback. G3 remains separate.