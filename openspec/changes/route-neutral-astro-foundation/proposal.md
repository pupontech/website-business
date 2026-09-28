# Proposal: route-neutral Astro foundation

**Status:** Draft for independent review; specification only, no implementation has started.

## Problem

D-013 authorizes a narrow Astro/TypeScript foundation, but the repository is still planning material and contains unrelated local POC work, including sensitive EmDash backup material. A bounded application root, static runtime contract, truthful local demonstration, exclusion checks, and hosted CI contract are needed before source work can begin. The foundation must not silently become an agency site, choose an editor or host, or expose unrelated POC material.

## Proposal

Create one isolated Astro application rooted at `site/`. Pin a currently stable Astro release and a compatible exact Node version at implementation time, commit the npm lockfile, use TypeScript with Astro's strict configuration, and generate static output only. Include one local-only root demonstration whose visible copy identifies it as synthetic and not a finished agency or client website. Keep it semantic, responsive, keyboard-operable, and free of client JavaScript, remote assets, forms, service claims, client names, and proof.

Add a fail-closed scope verifier and one GitHub-hosted CI workflow that checks out only `site/**` plus the single trusted workflow file, verifies that exact materialized-path allowlist, and builds only `site/`. Checkout must fail closed rather than fall back to a full checkout; checkout credentials are not persisted. The workflow includes required dependency-vulnerability and redacted secret-scanning gates, automated accessibility checks on the synthetic static page, and no secrets, deploy, preview publication, artifact upload, or production action. Retain desktop/tablet/mobile screenshots with documented visual inspection in the later implementation evidence. Add a Phase 8 evidence note and update the project status only as part of the later implementation's accepted handoff.

## Scope

### In scope for the later implementation authorized by this change

- The Astro application and its local configuration, dependencies, lockfile, TypeScript settings, styles, and local-only demo under `site/`.
- One `/` demonstration route solely to exercise the foundation. It is not an approved sitemap, agency homepage, client site, or public content.
- Explicit static rendering (`output: 'static'`), no adapter/runtime, no API route, no content/editor model, and no framework island.
- A fail-closed verifier for the source/output exclusions and build-context boundary in `specs/route-neutral-foundation/spec.md`.
- Playwright Test with `@axe-core/playwright` automation against the built local synthetic page, using exact versions locked in `site/package-lock.json` and the browser revision selected by that lockfile.
- A GitHub-hosted, non-deploying workflow at `.github/workflows/route-neutral-astro-foundation.yml`, with mandatory fail-closed sparse checkout/materialization checks, least privilege, and reviewed SHA-pinned actions.
- Required lockfile-wide dependency-vulnerability scanning and redacted secret scanning of only the checked-out app and trusted workflow file.
- An implementation evidence note at `docs/08-route-neutral-foundation.md`, retained screenshots at `docs/08-route-neutral-foundation/screenshots/{mobile-390x844,tablet-768x1024,desktop-1440x900}.png`, and the narrow `PROJECT_STATUS.md` update required by project governance, after actual verification and acceptance.

### Out of scope

- A client-specific site, finished agency marketing site, page family or information architecture. D-012's Home/Services/Contact planning, conditional About, and omission of Work/Insights are not implementation requirements here.
- Agency/client identity, names, biographies, service promises, capabilities, clients, testimonials, results, credentials, case studies, portfolio items, prices, or public copy.
- Markdown/MDX, Astro content collections, any CMS/editor comparison or integration, schemas, previews, publishing, or product/account tests.
- A live or mock contact form, recipient, contact channel, data collection, server action, API, webhook, analytics, or email.
- Vendor host/runtime adapter, hosting account, preview host, domain, DNS, TLS, paid service, production deployment, or public launch.
- Ghost work, reusable client platform, shared tenancy, unrelated POC investigation, or changes to old research/planning artifacts.

## Approval and next gate

D-013 is the owner authorization for only this route-neutral static-first Astro/TypeScript foundation. The independent proposal review PASS and Phase 6/7 reconciliation are recorded in `research/phase-7/d013-owner-proposal-rereview.md` and the G2 handoff `t_13af4836`; G2 remains scoped to this foundation. This document does not claim implementation evidence or G3 approval.

The next gate is independent review/acceptance of this OpenSpec change. After that, a separately scoped implementation task may execute only this exact change under D-013. Any expansion or changed decision requires a new owner decision and applicable OpenSpec review. CMS, form, accounts, paid services, production hosting, DNS, and public launch remain separately unauthorized; G3 continues to block all production/paid/DNS/public-launch actions.

## Decision links

- `DECISIONS.md` D-001 — no speculative internal platform.
- `DECISIONS.md` D-003 — isolate projects and credentials by default.
- `DECISIONS.md` D-009 — Astro-first planning only; no blanket CMS/host/Ghost choice.
- `DECISIONS.md` D-010–D-012 — separate agency/client planning tracks; deferred identity; no live form; no CMS selected; agency page plan is planning input, not this implementation mandate.
- `DECISIONS.md` D-013 — owner-approved scope and explicit exclusions/gates.
- `AGENTS.md` — static-first Astro, TypeScript, semantic/accessibility, security, no fabricated proof, and OpenSpec requirements.
- `PROJECT_STATUS.md` — current authorization, G2/G3 state, and P8.1 boundary.
- `docs/07-owner-review-proposal.md` and `research/phase-7/d013-owner-proposal-rereview.md` — reviewed proposal boundary and review PASS.
- `docs/05-architecture.md` and `docs/05-security.md` — static/CI and security planning constraints; research, not runtime proof.
- `DESIGN.md` — provisional clean corporate-minimal input and future browser/accessibility check targets, not a selected identity or visual system.
