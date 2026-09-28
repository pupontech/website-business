# Project Status

**Last updated:** 2026-09-27
**Current phase:** Scoped Phase 8 foundation after G2; Phases 1–7 planning reviewed locally, not product-validated or fully adopted
**Current authorization:** Owner approved only a route-neutral static-first Astro/TypeScript foundation (D-013). The corrected proposal received independent PASS in `research/phase-7/d013-owner-proposal-rereview.md`; Sol parent-verified and completed P6/P7 and narrow G2 on 2026-09-27. Ghost work, CMS integration/product tests, live form, accounts, purchases, production hosting/DNS and public launch remain unauthorized.
**Current task:** D-016 Home/Services/Contact draft is implemented provisionally in isolated `feat/agency-local-draft`; local check/build/scope and 27 browser tests passed. Independent code review's verifier/skip-link concerns were investigated and addressed or disproved by negative controls; acceptance-quality manual checks remain open. Foundation PR #1 has green hosted CI on `a2298ca`; the owner requested public repository visibility so Actions can run and continuation of verification. Draft PR #2 hosted push and PR jobs passed on `eeecd0a`; manual accessibility and owner copy acceptance remain pending. No merge, preview, CMS/form or deployment is authorized; G3 remains blocked.
**Board:** `website-business`
**Repository:** `https://github.com/pupontech/website-business` (public as observed 2026-09-28, default branch `main`; repository visibility does not authorize public site launch)

**Local unpublished WIP:** `docs/04-pricing-operations.md`, `docs/05-architecture.md`, `docs/05-security.md`, `research/phase-4/`, `research/phase-5/`, and `pocs/phase-2/emdash/` are currently untracked local paths. They have not been committed, pushed, or published. P4/P5 review passes accept planning content only; they do not establish vendor-account/product proof, CI or production runtime validation, or owner approval. Keep the sensitive EmDash backup excluded from ordinary source evidence.

## Completed tasks

- Project brief accepted as the governing scope.
- Initial constraints and approval checkpoints recorded.
- Planning repository initialized locally and pushed to the verified private GitHub remote.
- Governance documents, complete dependency-aware task breakdown, OpenSpec policy, Kanban graph, and three protected owner gates created and verified.
- Phase 1 competitor, segment, and business-model research completed with Luna/DeepSeek lanes and source-grounded synthesis in `docs/01-business.md`.
- Phase 1 independent review, rework, and fresh-eyes re-review completed; final verdict `pass`. Parent citation verification: 63/63 source bijection, 8 competitors, 2 segments, 3 packages, WCAG 2.2 AA baseline retained. A later Ghost(Pro) live billing-toggle check corrected the annual Starter figure in `docs/01-business.md` and the Phase 1 business-model research; recheck it before quoting.
- Phase 2 capability/permission/cost research and two POC attempts completed. EmDash local proof: 18 subcriteria, 11 pass / 4 partial / 3 blocked; supported browser admin, permissions, scheduling, and full restore unproven. Storyblok product proof: all 22 subcriteria blocked at the account/plan gate; the 15 passing local harness checks prove only integration code against a mock CDN. `docs/02-cms.md` passed independent final document review; its recommendations remain provisional pending owner approval and untested product gates. Seven stale Storyblok report hashes were reconciled to the unmodified, manifest-verified evidence.
- Phase 3 Ghost hosting/theme research and `docs/03-ghost.md` synthesis completed. Independent review requested changes; corrections received a fresh-eyes `pass` in `research/phase-3/final-review.md`. Native Ghost themes and Ghost(Pro) remain provisional recommendations, not a product test.
- Phase 4 pricing-model and operations/ownership research completed; `docs/04-pricing-operations.md` corrected after review and independently accepted with a final-review **PASS** (`research/phase-4/final-review.md`). Arithmetic and cited price claims were reviewed as dated planning evidence only; no client price or operating policy is approved.
- Phase 5 Astro/hosting and security/recovery research completed; `docs/05-architecture.md` and `docs/05-security.md` and their corrections passed independent fresh-eyes review (**P5.8 PASS**, `research/phase-5/final-review.md`). Review covered source/document corrections only. Storyblok and EmDash product/account gates remain open; no application source implementation, CI execution, production/runtime test, account, deployment, backup, restore, or DNS operation was performed or authorized.
- Astro-only exploratory artifacts `research/astro-only/visual-references.md` and `research/astro-only/cms-hosting-gates.md` received independent **PASS with limits** in `research/astro-only/independent-review.md`. The owner subsequently chose Astro-first planning; this does not convert exploratory observations into verified product behavior or select a design/CMS/host.

## Blockers

- A real Storyblok account/space and a second editor inbox are required to exercise its CMS product; no account or payment has been authorized. EmDash requires supported browser authentication and a second actor/email transport to validate the permissions gate.
- The EmDash POC uses a disposable local auth helper that was removed before final checks; its API proof is not evidence of a supported client editing workflow.
- Storyblok Starter's commercial suitability for agency-managed client production remains UNKNOWN pending written vendor confirmation; the Storyblok product and roles require an authorized real-space test before a customer recommendation is operationally validated.
- EmDash's local recovery evidence includes an SQLite backup with nonempty user, auth-token, and API-token tables. It is excluded from Git; the complete EmDash POC evidence remains local pending a safe, manifest-consistent publication strategy. Never publish the raw backup as ordinary source evidence.
- Paid services, domains, DNS, production deployment, and public launch remain unauthorized.

## Pending approvals

1. **Checkpoint 1 — Astro-first planning direction:** Owner selected Astro first on 2026-09-24. The Kanban gate records this *scoped* direction so Astro-only Phase 6/7 planning can proceed; it does not approve Ghost work, a CMS/host, prices, implementation, accounts, or production.
2. **Checkpoint 2 — Design and website specification:** scoped owner approval received 2026-09-25 (D-013); corrected proposal independently passed and P6/P7 parent reconciliation completed 2026-09-27. G2 is complete **only for the route-neutral Astro/TypeScript foundation**, not CMS/form/client work or production.
3. **Checkpoint 3 — Production deployment:** before paid services, production hosting, DNS, or public launch.

**Owner scope change (2026-09-24):** Defer further Ghost investigation, Ghost theme/headless work, and Ghost-related implementation. Continue bounded, read-only Astro research as a separate exploratory artifact before Checkpoint 1; it must not silently approve the CMS/hosting recommendations, count as completed Phase 6, or unlock its G1-dependent cards. Keep the Ghost planning already written as historical evidence rather than deleting it. Continue only on Codex/Luna; on quota exhaustion pause until the hourly Codex smoke returns a trustworthy `CODEX_OK` (no DeepSeek research fallback).

**Owner Astro-first direction (2026-09-24):** The subsequent owner reply chose the Astro-first plan. The earlier pre-G1 research boundary is historical; proceed with *Astro-only planning* for Phases 6–7, using the reviewed exploratory evidence as input rather than repeating it. Do not interpret this as blanket adoption of all Phase 1–5 recommendations. Leave Ghost Phase 9 work and both implementation/launch gates parked. D-009 records the exact scope.

**Checkpoint 2 inputs (2026-09-24, D-010):** Owner chose to keep Ghost parked and proceed Astro-only; target both professional-services client websites and the agency marketing site; compare Markdown/MDX, Sanity, and Storyblok without choosing a CMS yet; move from exploratory research into Phase 6 design/specification planning; and prefer a clean corporate minimal visual direction. These inputs are not G2 approval; review the full design/specification proposal with the owner before source implementation.

**Further agency-site inputs (2026-09-24, D-011):** Public name and person/team identity undecided; plan around the owner's named Astro static and Astro CMS services without claiming verified capability; English launch language, but buyer and geography still unknown; no publishable proof now; simple form preferred subject to provider/privacy/data-flow review. These do not select a CMS or approve G2, form collection, or implementation; client-site language/content remains client-specific.

**Agency-site clarifications (2026-09-25, D-012):** The owner deferred public business/person identity, specified English speakers in Israel for the agency site, selected Home/Services/Contact as planning pages with About conditional on real identity, and omitted Work/Insights for now. Keep the simple form only as a gated plan, not a live route, until provider/privacy/data handling and tests are reviewed; Markdown/MDX, Sanity, and Storyblok remain unselected pending authorized tests. These are planning inputs, not G2 implementation or G3 launch approval; future client-site language/geography remain client-specific.

**Scoped Checkpoint 2 completion (2026-09-27, D-013):** The owner said “Approved” on 2026-09-25 to the bounded G2 proposal: clean corporate-minimal responsive direction, separate agency/client archetypes and route-neutral Astro/TypeScript foundation. The initial D-012 review requested changes; the corrected proposal passed independent D-013 re-review `t_0837ac91`. Sol verified P6/P7 parent evidence and completed G2 `t_13af4836` on 2026-09-27. Only the narrow foundation is authorized; no CMS/host selected, form live, identity invented, or G3 action authorized.

**Future private preview target (2026-09-27, D-014):** Owner chose `astrodev.aygross.xyz` for a password-protected staging preview **once an actual site is built and verified**, not for the current synthetic foundation or a public launch. DNS already points to this VPS, but there is no matching Caddy host/working HTTPS yet. Do not provision now; preview-specific authorization scope, HTTPS/access controls, no real inquiries/secrets, artifact integrity and rollback must be verified before use. G3 remains blocked for public/production launch.

**First-build defaults (2026-09-27, D-015):** Owner confirmed foundation-first; a generic placeholder identity is fine for a later private draft; Contact should say “coming soon” with no working form; `astrodev.aygross.xyz` should be used only as a password-protected private preview after build and verification; first draft should stay minimal/corporate with a one-page feel split across Home/Services/Contact. These defaults do not expand the current P8 foundation scope or authorize CMS/form/production/G3 work.

**Local-only continuation (2026-09-28, D-016):** Owner asked to continue without GitHub testing for now. Proceed with a separately reviewed OpenSpec and locally verified, provisional three-route agency draft in an isolated worktree, using bracketed placeholder identity, persistent private-draft notice, content-needed Services, and Contact coming soon. This is not a permanent CI waiver or foundation final acceptance; hosted jobs failed before runner steps due to GitHub account billing/spending-limit. No merge, preview provisioning, DNS/Caddy, form/CMS, or public deployment.

## Dependency-aware task breakdown

Status vocabulary: `DONE`, `ACTIVE`, `READY`, `BLOCKED`, `FUTURE`.

### P0 — Initialization and control plane

| ID | Task | Depends on | Status |
|---|---|---|---|
| P0.1 | Initialize repository and required governing documents | — | DONE |
| P0.2 | Initialize Git and private GitHub repository | P0.1 | DONE |
| P0.3 | Create Kanban board and dependency-aware phase/task cards | P0.1 | DONE |
| P0.4 | Verify repository structure, card graph, permissions, and status/update protocol | P0.2, P0.3 | DONE |

### P1 — Business and competitor research

| ID | Task | Depends on | Status |
|---|---|---|---|
| P1.1 | Research 6–8 relevant competitors using first-party pages; capture public prices only | P0.1 | DONE |
| P1.2 | Research two strongest customer segments, pains, buying triggers, and framework-to-benefit translation | P0.1 | DONE |
| P1.3 | Evaluate initial business models, maintenance/hosting boundaries, acquisition paths, and services to defer | P0.1 | DONE |
| P1.4 | Synthesize `docs/01-business.md` with citations and explicit fact/estimate/recommendation boundaries | P1.1–P1.3 | DONE |
| P1.5 | Independent source/coverage review and parent verification | P1.4 | DONE |
| P1.6 | Correct review findings without changing the recommendation | P1.5 | DONE |
| P1.7 | Fresh-eyes final review and parent citation verification | P1.6 | DONE |

### P2 — Astro CMS research and proof of concept

| ID | Task | Depends on | Status |
|---|---|---|---|
| P2.1 | Current official capability/pricing research: Sanity, Keystatic, Storyblok, EmDash, Astro content collections | P1.7 | DONE |
| P2.2 | Model permissions, ownership, export, backups, dependency, and security for scenarios A/B/C | P1.7 | DONE |
| P2.3 | Cost model for 1, 5, and 20 sites with stated assumptions | P2.1 | DONE |
| P2.4 | Select two POC candidates and define isolated test protocol | P2.1–P2.3 | DONE |
| P2.5 | Execute candidate 1 POC: create/edit/image/preview/publish/SEO/sections/permissions/export/recovery | P2.4 | DONE — partial/blocked criteria recorded |
| P2.6 | Attempt candidate 2 POC with the same protocol | P2.4 | DONE — account/plan blocked; mock harness is not vendor proof |
| P2.7 | Synthesize and review `docs/02-cms.md` and CMS decision tree | P2.5, P2.6 | DONE — independent final review pass; product gates remain |

### P3 — Ghost architecture

| ID | Task | Depends on | Status |
|---|---|---|---|
| P3.1 | Research Ghost(Pro), self-hosting total stack, current pricing, ownership, backups, updates, and security | P1.7 | DONE |
| P3.2 | Research native themes, custom themes, APIs, GScan, Starter, memberships, Portal, newsletters, Stripe, and email | P1.7 | DONE — bounded backup lane authoritative |
| P3.3 | Test/document headless limitations and decision criteria without overstating untested behavior | P3.2 | DONE — documentation-backed only |
| P3.4 | Define setup/customization/theme/migration/membership/maintenance service boundaries and cost assumptions | P3.1–P3.3 | DONE — proposed only |
| P3.5 | Synthesize and independently review `docs/03-ghost.md` | P3.4 | DONE — final review `pass`; no Ghost runtime test |

### P4 — Pricing and operations

| ID | Task | Depends on | Status |
|---|---|---|---|
| P4.1 | Build bottom-up pricing calculator for small Astro, custom Astro+CMS, Ghost, and maintenance | P1.5, P2.7, P3.5 | DONE — proposed assumptions, arithmetic verified |
| P4.2 | Define inquiry-to-maintenance workflow, milestones, revision/scope/content/support/cancellation rules | P4.1 | DONE — provisional policy research |
| P4.3 | Define ownership, portability, offboarding, and recurring-cost policies | P4.1 | DONE — provisional policy research |
| P4.4 | Identify legal/privacy/tax/accessibility/licensing matters for professional jurisdiction-specific review | P4.2, P4.3 | DONE — professional-review register, not legal advice |
| P4.5 | Synthesize and review `docs/04-pricing-operations.md` | P4.1–P4.4 | DONE — corrected synthesis; independent final-review PASS; provisional only |

### P5 — Technical architecture and security

| ID | Task | Depends on | Status |
|---|---|---|---|
| P5.1 | Define Astro runtime/content/image/preview/build/deployment architecture | P2.7 | DONE — research only, no deployment |
| P5.2 | Evaluate managed vs self-hosted hosting, BunnyCDN, media, forms/Letterbird, email, analytics, monitoring | P2.7, P3.5, P4.5 | DONE — conditional research only |
| P5.3 | Define environments, CI/CD, DNS/TLS, rollback, backup, restore-test, and monitoring procedures | P5.1, P5.2 | DONE — proposed in reviewed architecture; no runtime/CI/restore proof |
| P5.4 | Threat-model credentials, CMS roles, previews, webhooks, forms, isolation, updates, access revocation | P5.1–P5.3 | DONE — proposed in reviewed security standard; no controls implemented |
| P5.5 | Produce and review `docs/05-architecture.md`, diagrams, and `docs/05-security.md` | P5.4 | DONE — deliverables and diagrams independently reviewed; P5.8 PASS; local unpublished WIP |
| G1 | **Checkpoint 1 owner direction: Astro-first planning only** | P1.5, P2.7, P3.5, P4.5, P5.5 | DONE (scoped) — unlock Astro-only Phase 6/7 planning; no blanket CMS/host/Ghost approval |

### P6 — Design system and skill research

| ID | Task | Depends on | Status |
|---|---|---|---|
| P6.1 | Extend/reassess design references, including mobile and buyer fit | G1 | DONE — `research/phase-6/references.md`; references are observations, not a chosen identity |
| P6.2 | Develop three agency visual directions with responsive/mobile treatments | P6.1 | DONE — `research/phase-6/directions.md`; no direction selected |
| P6.3 | Research skill repositories for license, maintenance, compatibility, install, and security | G1 | DONE — `research/phase-6/skills-audit.md`; no installation |
| P6.4 | Recommend minimal non-duplicative skill stack; install only after review/approval | P6.3 | DONE (proposal only) — `docs/06-skills.md`; no third-party skill installed |
| P6.5 | Produce/review `docs/06-design.md`, `docs/06-skills.md`, and draft `DESIGN.md` | P6.2, P6.4 | DONE (planning proposal) — D-011 reconciled; independent P6 review plus P7 owner-proposal review; final visual design still requires G2 |

### P7 — Agency website specification

| ID | Task | Depends on | Status |
|---|---|---|---|
| P7.1 | Specify dual-audience planning outline and preserve open CMS comparison | P6.5 | DONE (planning) — `research/phase-7/dual-audience-spec-outline.md` |
| P7.2 | Propose separate sitemaps, navigation, hierarchy, responsive content order, and real-content gates | P7.1 | DONE (proposals) — `research/phase-7/dual-track-ia.md`; no page approved |
| P7.3 | Define candidate content/editor models and six CMS-route test protocols, including conditional forms and proof gates | P2.7, P5.5, P7.2 | DONE (protocol only) — `research/phase-7/editor-content-test-plan.md`; CMS schemas/integration/product tests NOT RUN |
| P7.4 | Define prospective protected preview/publishing/recovery and gated implementation order | P7.3 | DONE (plan only) — `research/phase-7/dual-track-delivery-plan.md`; no runtime, host, or recovery test |
| P7.5 | Produce/review owner-facing Phase 7 and `DESIGN.md` proposals | P7.4 | DONE (planning review) — corrected `docs/07-owner-review-proposal.md` independently passed D-013 re-review; older `docs/07-agency-site.md` INVALIDATED; G2 reconciled for narrow foundation only |
| G2 | **Checkpoint 2 owner approval of visual direction, content model, and implementation plan** | P7.5 | DONE (scoped) — D-013 route-neutral Astro/TypeScript foundation only; P6/P7 verified, `t_13af4836` completed |

### P8 — Agency website implementation

| ID | Task | Depends on | Status |
|---|---|---|---|
| P8.1 | OpenSpec + Astro/TypeScript foundation and approved dependencies | G2 | HOSTED CI PASS on foundation PR #1 head `a2298ca` (push and PR checks); owner acceptance/merge and remaining manual gates pending. Draft CI is separate. |
| P8.2 | Conditional OpenSpec + selected CMS schemas/integration and protected preview; truthful content only | P8.1, separate route decision and product/account gate | FUTURE — no CMS selected |
| P8.3 | Shared tokens, typography, navigation, footer, and layouts | P8.1 | FUTURE |
| P8.4 | Homepage implementation with screenshot inspection | P8.2, P8.3 | FUTURE |
| P8.5 | Approved Services content; portfolio/case-study pages only if real cleared proof exists | P8.4 | FUTURE — no agency proof publishable now |
| P8.6 | About and contact pages | P8.4 | FUTURE |
| P8.7 | Forms, metadata, sitemap, redirects, analytics/privacy integrations | P8.5, P8.6 | FUTURE |
| P8.8 | Full test, visual, accessibility, performance, security, and production-readiness review | P8.7 | FUTURE |

### P9 — Reusable foundations and pilots

| ID | Task | Depends on | Status |
|---|---|---|---|
| P9.1 | Extract design-neutral Astro engineering foundation from proven patterns | P8.8 | FUTURE |
| P9.2 | Build bounded native Ghost theme foundation from current official Starter guidance | P3.5, P8.8 | FUTURE |
| P9.3 | Demonstration Astro business-site pilot with edit/publish/deploy/backup/handoff proof | P9.1 | FUTURE |
| P9.4 | Demonstration Ghost publication pilot with GScan and operating/handoff proof | P9.2 | FUTURE |
| P9.5 | Record actual time, costs, repetition, failures, and improvements in `docs/09-pilots.md` | P9.3, P9.4 | FUTURE |

### P10 — Standard quality control

| ID | Task | Depends on | Status |
|---|---|---|---|
| P10.1 | Define reusable automated test matrix and CI gates | P8.8, P9.5 | FUTURE |
| P10.2 | Define desktop/tablet/mobile visual-review protocol and artifact retention | P10.1 | FUTURE |
| P10.3 | Define manual accessibility, CMS publishing, SEO, CWV/Lighthouse, link, and security checks | P10.1 | FUTURE |
| P10.4 | Exercise the complete QC process on both pilots and fix gaps | P10.2, P10.3 | FUTURE |

### P11 — Business launch

| ID | Task | Depends on | Status |
|---|---|---|---|
| P11.1 | Finalize positioning, package presentation, portfolio truth labels, and contact workflow | P9.5, P10.4 | FUTURE |
| P11.2 | Prepare first-five-customers plan across referrals, partnerships, communities, outreach, and content | P11.1 | FUTURE |
| P11.3 | Prepare discovery/proposal/SOW/content/design/change/launch/training/handoff/maintenance templates | P4.5, P11.1 | FUTURE |
| P11.4 | Evaluate n8n/Make/Zapier/simple scripts only for observed repeated work | P9.5 | FUTURE |
| P11.5 | Produce/review `docs/10-launch.md`, executive summary, decision tree, roadmap, and final acceptance matrix | P11.2–P11.4 | FUTURE |
| G3 | **Checkpoint 3 owner approval before production/paid/DNS/public launch** | P11.5 | BLOCKED |
| P11.6 | Execute approved production launch and verify public state | G3 | FUTURE |

## Final acceptance matrix

The final review must explicitly map evidence to: business model/segments; competitors; CMS selection and editing/permission proofs; Ghost architecture, membership, and newsletters; pricing/recurring costs; hosting; security/backups; ownership/portability; licensing; design; skills/delegation; site spec; reusable foundations; SEO; accessibility; performance; testing; onboarding/handoff; acquisition; and automation backlog.

## Next task

Foundation PR #1 head `a2298ca` and draft PR #2 head `eeecd0a` both have green hosted push/PR checks. Merges and owner acceptance remain separate. Complete manual accessibility and owner copy review before any claim of acceptance. Preserve sensitive EmDash SQLite evidence locally and keep it out of ordinary source/release artifacts. Storyblok/EmDash product gates remain open; no Ghost work, CMS or form integration, account, purchase, deployment, DNS, or production operation is authorized. G3 remains blocked.
