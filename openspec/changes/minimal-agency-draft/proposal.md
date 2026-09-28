# Proposal: private static agency-site draft

**Status:** Draft for independent review. This authoring task creates specification artifacts only; it does not authorize source implementation, preview publication, or launch.

## Problem

The locally verified, not hosted-accepted P8.1 work is a single synthetic `/` foundation fixture, not an agency-site draft. D-015 gives planning defaults for a later minimal Home/Services/Contact draft, but explicitly does not expand the route-neutral foundation authorization. A separate bounded OpenSpec and owner gate are therefore needed before any agency routes or draft content are added.

**Readiness gate:** `PROJECT_STATUS.md` records P8.1 hosted GitHub Actions CI as **BLOCKED / NOT RUN** because GitHub Actions jobs 36333293071 and 36333299182 failed before runner start due to account billing/spending limits. The foundation evidence note contains detailed actual headed-browser 200% zoom evidence, but also retains a contradictory later sentence saying that check remains unverified; reconcile that evidence before P8.1 acceptance. P8.1 requires a green hosted run for full acceptance. D-016 expressly allows only local source development while this gate is blocked; acceptance, push, preview, and deployment remain blocked. Neither local checks nor D-015 authorize implementation.

## Proposal

After the preconditions below are closed, extend only the existing `site/` Astro application into a local-only, static, English-language draft with three short routes: Home `/`, Services `/services/`, and Contact `/contact/`. The intended “one-page feel” is a compact shared shell and navigation across three conventional pages, not a new site family or literal scrolling one-page layout; D-016 confirms these exact routes and trailing slashes.

Use a clearly generic identity placeholder and a persistent, legible private-draft notice on every route. Do not invent identity, service scope/capability, clients, proof, prices, credentials, outcomes, process, or public claims. Services uses only the D-016 approved `Astro static` and `Astro CMS` planning labels, explicitly qualified as unverified; these are not capability claims or a CMS selection. Contact must say **“Contact — coming soon”** and state that the draft has no form or message channel. It must not present any contact destination or collection mechanism.

Keep the app static-first and TypeScript-based, using the existing toolchain and local CSS/system fonts. Do not add a CMS/editor, Markdown/MDX, content collection, server adapter, API/action, form, analytics, client-side framework/script, external font, remote asset, or new runtime dependency. Keep noindex/nofollow as an accidental-discovery precaution, never as access control. Work remains on loopback/local files only: no password-protected preview, hosting, domain, DNS, or deployment configuration is included.

## Scope

### In scope for D-016 local-only development

- Exactly three D-016-confirmed static routes under `site/`, with one shared semantic shell, visible navigation, persistent draft notice, and footer.
- Truthful, owner-approved placeholder text only; English-only for this bounded draft unless the owner changes that scope before implementation.
- Contact-coming-soon state with no form, destination, or data collection.
- A narrow extension of the existing fail-closed source/output verifier and local browser tests to cover all three routes and their built output.
- Preserve the existing non-deploying, least-privilege hosted-CI and dependency/secret-scan boundaries; obtain hosted evidence after the foundation prerequisite is accepted.
- Responsive, accessibility, truth-boundary, route/output, static-build, and local-only verification evidence, with no conformance or production-readiness claim.

### Out of scope

- No remote publication or accepted implementation while CI is blocked; specification authoring itself did not execute source work.
- Public business or person/team identity, final marketing copy, verified service offers/capability, clients, testimonials, case studies, credentials, prices, guarantees, outcomes, or other proof.
- About, Work, Insights, service-detail routes, aliases, redirects, additional routes, client-site work, or a reusable website builder/platform.
- Ghost or any CMS/editor selection or integration; Markdown/MDX; content schemas/collections; accounts, product tests, or content-publishing workflows.
- Contact forms, email/phone/social destinations, analytics, cookies, message collection, server endpoints, or privacy/data-handling promises.
- Password-protected preview provisioning/publication at `astrodev.aygross.xyz`, hosting, paid services, DNS/TLS changes, production deployment, public indexing, or G3. D-014's future private-preview intent is a separate gate, not a task here.

## Preconditions and owner gate

1. D-016 permits local-only source work against the locally verified foundation despite the GitHub Actions billing block. The parent must verify the local baseline and reconcile evidence; P8.1 and the draft remain UNACCEPTED until exact-commit hosted CI runs green. No push, merge, preview, or deployment is permitted under this exception.
2. An independent review of this revised change must pass before source implementation.
3. D-016 records owner-approved choices in `design.md`: exact routes/trailing slash and meaning of “one-page feel”; literal placeholder identity and banner wording; whether/how service category labels appear; confirmation of English-only/no Hebrew or RTL in this draft; and any numeric performance budget (or explicit decision to use the qualitative no-JS/no-remote-request contract only). The owner explicitly authorized only this local-only draft scope in D-016; D-015 alone did not authorize it.
4. Any request for real identity/copy, CMS, data collection, preview, hosting, DNS, production, or launch requires a revised decision and the applicable OpenSpec/owner gate.

## Decision links

- `DECISIONS.md` D-001 and D-003 — avoid speculative platforms and isolate site/project boundaries.
- `DECISIONS.md` D-009–D-012 — Astro-first planning, agency/client separation, agency audience/page planning, deferred identity, no selected CMS, and no live form.
- `DECISIONS.md` D-013 — authorization is limited to the route-neutral foundation; it does not approve these routes or this draft implementation.
- `DECISIONS.md` D-014 — `astrodev.aygross.xyz` is only a future password-protected preview target after a built and verified site; no provisioning here.
- `DECISIONS.md` D-015 — generic placeholder permitted for a later private draft, Contact “coming soon” with no working form, and minimal/corporate Home/Services/Contact shape; no expansion of current implementation authority.
- `AGENTS.md`, `PROJECT_STATUS.md`, `docs/08-agency-draft-proposal.md`, `docs/08-route-neutral-foundation.md`, `docs/07-owner-review-proposal.md`, and the route-neutral foundation OpenSpec — project constraints, current gate, draft proposal, and inherited technical contracts.