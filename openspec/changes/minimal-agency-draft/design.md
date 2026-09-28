# Design: private static agency-site draft

## Boundary, prerequisites, and routes

The future implementation extends only the already isolated `site/` Astro project. D-016 permits local-only development while P8.1 hosted CI is blocked by account billing. The parent verified the foundation local check/build/scope/a11y baseline; formal P8.1 and draft acceptance require successful hosted runs later. Independent review of this revised OpenSpec precedes source edits; owner scope and choices are recorded in D-016. D-016 explicitly permits local-only agency source edits before P8.1 hosted acceptance; neither the foundation nor the draft may be marked accepted until hosted CI passes. This proposal itself does none of that work.

D-016 approved route contract:

| Page | Candidate URL | Local output | Role |
|---|---|---|---|
| Home | `/` | `dist/index.html` | Minimal orientation using only approved placeholder text. |
| Services | `/services/` | `dist/services/index.html` | Draft-only service categories or neutral placeholders; no capability promise. |
| Contact | `/contact/` | `dist/contact/index.html` | “Contact — coming soon”; explicitly no form or message channel. |

The proposal recommends conventional routes with trailing slashes, shared navigation/footer, and one compact overall feel. D-016 confirms these routes and trailing slashes. Verify Astro's output mapping during build; no redirects are authorized. No aliases, About, Work, Insights, service-detail pages, or 404/content families are requested.

## Owner choices resolved by D-016 for this local-only draft

1. **Routes and composition:** D-016 approves `/`, `/services/`, `/contact/` with trailing slashes as three short linked routes sharing a compact feel.
2. **Identity treatment:** D-016 approves the exact generic token `[Agency name — placeholder]` and persistent notice `PRIVATE DRAFT — placeholder identity; not for publication.` Keep the notice visible on every route and viewport.
3. **Services wording:** D-016 approves only the planning labels `Astro static` and `Astro CMS`, alongside the exact qualification `Service areas under consideration — scope and capability not yet confirmed.` These are not capability or CMS-vendor claims; do not mention Ghost or select an editor.
4. **Language:** D-016 confirms English only for this draft, without claiming Hebrew/RTL support or deciding future client-site locales.
5. **Visual/performance:** D-016 retains corporate-minimal direction, system fonts, no imagery, and qualitative no-JS/no-external-request limits. No numeric score or final brand is approved.

## Content and truth contract

- Every route carries the same persistent, legible private-draft notice. The generic identity token is explicitly a placeholder, never a business/person/team assertion. Do not add an address, logo, local-presence cue, copyright claim, social profile, public CTA, or hidden claim text.
- Home has a page title and only owner-approved, non-claim placeholder text. Do not fill it with generic promises, audience assertions beyond the planning context, or statements of verified capability.
- Services either omits the category labels or renders only the owner-selected draft labels with a conspicuous “not yet confirmed” qualification. No packages, prices, process, deliverables, scope, guarantee, performance/SEO/accessibility claim, or vendor selection is permitted.
- Contact contains the exact owner-confirmed coming-soon state; candidate copy is `Contact — coming soon` and `This private draft has no contact form or message channel.` No `<form>`, controls for submission, `mailto:`, `tel:`, social/contact URL, guessed recipient, API, action, or data collection.
- Omit work/proof entirely. Do not use synthetic testimonials, client logos, screenshots, metrics, credentials, outcomes, or portfolio cards.
- Use English `lang="en"` for the proposed English-only draft. Do not claim Hebrew/RTL support.

The literal strings above and D-016 Contact text are approved for this private draft. For any other copy, use an unmistakable bracketed content-needed token or omit it; do not improvise claims.

## App and file boundary

Use the existing Astro project, existing pinned Node/npm toolchain, TypeScript strict configuration, lockfile, and static output. No new direct dependency is expected. A possible disjoint implementation ownership map (reconcile at task dispatch):

| Lane | Sole file ownership | Boundary |
|---|---|---|
| A — shared shell | `site/src/layouts/AgencyDraftLayout.astro`; `site/src/components/DraftBanner.astro`; `site/src/components/PrimaryNav.astro`; `site/src/components/SiteFooter.astro`; `site/src/styles/global.css` | Semantic shared layout, skip link, persistent notice, ordinary route links, responsive local styling; no page-specific body copy. |
| B — Home | `site/src/pages/index.astro` | Home content only; uses the accepted shell and content/truth contract. |
| C — Services | `site/src/pages/services.astro` | Services page only; category visibility follows the owner choice. |
| D — Contact | `site/src/pages/contact.astro` | Contact-coming-soon state only; no form or destination. |
| E — verification/integration | `site/astro.config.mjs`; `site/scripts/verify-scope.mjs`; `site/tests/foundation-accessibility.spec.ts`; `site/playwright.config.ts`; `site/package.json`; `site/package-lock.json` only if a justified script/dependency change is required; `.github/workflows/route-neutral-astro-foundation.yml` | Extend the existing route/output and content allowlists and tests without weakening fail-closed checks, dependency/secret gates, checkout isolation, or no-release constraints. |

No two lanes A–E may own the same file. If integration requires a cross-lane edit, stop and explicitly reassign before editing. Do not change `DECISIONS.md` if this approved scope remains unchanged; record any new owner choice there through the appropriate owner workflow.

## Rendering, accessibility, and performance

- Static Astro output only; no adapter, request-time route, API, server action, client-side JavaScript, framework island, CMS, collection/schema, Markdown/MDX, analytics, or external service. Use local CSS and system fonts; no remote fonts, scripts, styles, images, or build-time content calls.
- Use semantic `header`, `nav`, `main`, and `footer`, one page-level `h1` per route, correctly ordered headings, descriptive ordinary links, first-focusable skip link, visible/unobscured focus, and a shared navigation usable without JavaScript. Do not add a collapsible menu unless a separately reviewed interaction is necessary.
- Preserve logical source order and reflow without horizontal scrolling or clipped content. No sticky/floating action, carousel, modal, autoplay, or motion-dependent content. Honor reduced-motion preferences. Target WCAG 2.2 AA; do not claim conformance on automation alone.
- Verify 195 CSS-pixel proxy plus 320, 390, 768, 1024, and 1440 CSS-pixel widths on each route; separately inspect actual browser UI zoom at 200%. Record browser/version and findings. The 195-pixel proxy is not a substitute for browser zoom.
- Measure text, link, focus, and relevant non-text contrast; minimum targets are 4.5:1 normal text, 3:1 large text, and 3:1 relevant non-text UI/focus. Run automated axe checks for WCAG 2.0/2.1/2.2 A/AA at required CSS widths and manual keyboard/landmark/focus/reduced-motion review.
- No application JavaScript and zero third-party network requests are the proposed qualitative performance contract. Record build-output size and a reproducible local lab result/environment if run. No numeric size or Lighthouse score is set; D-016 explicitly defers numerical thresholds for this local-only draft, rather than retrofitting a target. Lab scores are not field/Core Web Vitals evidence.

## Metadata, privacy, and release boundary

- Each draft route gets an accurate, minimal title, `lang="en"`, viewport/charset, and `noindex,nofollow`. No canonical URL, sitemap, social metadata, structured business data, unsupported description, or public indexing is required.
- Noindex is not authentication. The implementation serves only a local loopback preview for testing. It does not configure `astrodev.aygross.xyz`, password protection, HTTPS, host access rules, publication, deployment, or DNS. Any later private preview requires a separate owner-approved scope and gate covering the exact artifact, owner-only authentication, HTTPS, non-public/noindex safeguards, direct page/asset access denial, secret isolation, and rollback/recovery verification; D-014 does not authorize that work here.
- Preserve the existing GitHub workflow's fail-closed sparse checkout/materialized-tree guard, `persist-credentials: false`, explicit read-only permissions, dependency audit, redacted secret scan, and no deploy/preview/artifact upload. Hosted CI is blocked pending account billing resolution; a local test or workflow edit is not hosted evidence.

## Failure and change handling

Any new route, route alias, identity/capability claim, proof, asset, dependency, runtime, form/contact channel, external request, host/preview action, or relaxation of a verifier/CI guard is a scope change. Stop; obtain the applicable owner decision and revise/review this OpenSpec before implementation continues. Any new unresolved owner choice blocks its affected source work. Hosted CI failure blocks acceptance, push, preview and deployment, not D-016 local development.