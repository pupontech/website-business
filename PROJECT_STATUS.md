# Project Status

**Last updated:** 2026-09-23
**Current phase:** Phase 2 and Phase 3 reviewed; Phase 4 synthesis and Phase 5 architecture/security research active
**Current authorization:** Research and planning through Checkpoint 1; no production implementation or infrastructure changes
**Current task:** Complete and independently verify Phases 4–5, then present the owner’s Checkpoint 1 decision
**Board:** `website-business`
**Repository:** `https://github.com/pupontech/website-business` (private, default branch `main`)

## Completed tasks

- Project brief accepted as the governing scope.
- Initial constraints and approval checkpoints recorded.
- Planning repository initialized locally and pushed to the verified private GitHub remote.
- Governance documents, complete dependency-aware task breakdown, OpenSpec policy, Kanban graph, and three protected owner gates created and verified.
- Phase 1 competitor, segment, and business-model research completed with Luna/DeepSeek lanes and source-grounded synthesis in `docs/01-business.md`.
- Phase 1 independent review, rework, and fresh-eyes re-review completed; final verdict `pass`. Parent citation verification: 63/63 source bijection, 8 competitors, 2 segments, 3 packages, WCAG 2.2 AA baseline retained. A later Ghost(Pro) live billing-toggle check corrected the annual Starter figure in `docs/01-business.md` and the Phase 1 business-model research; recheck it before quoting.
- Phase 2 capability/permission/cost research and two POC attempts completed. EmDash local proof: 18 subcriteria, 11 pass / 4 partial / 3 blocked; supported browser admin, permissions, scheduling, and full restore unproven. Storyblok product proof: all 22 subcriteria blocked at the account/plan gate; the 15 passing local harness checks prove only integration code against a mock CDN. `docs/02-cms.md` passed independent final document review; its recommendations remain provisional pending owner approval and untested product gates. Seven stale Storyblok report hashes were reconciled to the unmodified, manifest-verified evidence.
- Phase 3 Ghost hosting/theme research and `docs/03-ghost.md` synthesis completed. Independent review requested changes; corrections received a fresh-eyes `pass` in `research/phase-3/final-review.md`. Native Ghost themes and Ghost(Pro) remain provisional recommendations, not a product test.
- Phase 4 pricing-model and operations/ownership research completed in separate Luna lanes; the bottom-up arithmetic and care work mix were reconciled. Phase 4 synthesis is delegated and not yet independently reviewed; no client price approved.
- Phase 5 Astro/hosting research completed; security/recovery research is delegated. A parent spot-check corrected the same-day Astro npm `latest` version from 7.2.4 to 7.3.4. Architecture/security synthesis and independent review remain open.

## Blockers

- A real Storyblok account/space and a second editor inbox are required to exercise its CMS product; no account or payment has been authorized. EmDash requires supported browser authentication and a second actor/email transport to validate the permissions gate.
- The EmDash POC uses a disposable local auth helper that was removed before final checks; its API proof is not evidence of a supported client editing workflow.
- Storyblok Starter's commercial suitability for agency-managed client production remains UNKNOWN pending written vendor confirmation; the Storyblok product and roles require an authorized real-space test before a customer recommendation is operationally validated.
- EmDash's local recovery evidence includes an SQLite backup with nonempty user, auth-token, and API-token tables. It is excluded from Git; the complete EmDash POC evidence remains local pending a safe, manifest-consistent publication strategy. Never publish the raw backup as ordinary source evidence.
- Paid services, domains, DNS, production deployment, and public launch remain unauthorized.

## Pending approvals

1. **Checkpoint 1 — Business and architecture:** after Phases 1–5.
2. **Checkpoint 2 — Design and website specification:** after Phases 6–7.
3. **Checkpoint 3 — Production deployment:** before paid services, production hosting, DNS, or public launch.

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
| P4.5 | Synthesize and review `docs/04-pricing-operations.md` | P4.1–P4.4 | ACTIVE — synthesis delegated; independent review pending |

### P5 — Technical architecture and security

| ID | Task | Depends on | Status |
|---|---|---|---|
| P5.1 | Define Astro runtime/content/image/preview/build/deployment architecture | P2.7 | DONE — research only, no deployment |
| P5.2 | Evaluate managed vs self-hosted hosting, BunnyCDN, media, forms/Letterbird, email, analytics, monitoring | P2.7, P3.5, P4.5 | DONE — conditional research only |
| P5.3 | Define environments, CI/CD, DNS/TLS, rollback, backup, restore-test, and monitoring procedures | P5.1, P5.2 | ACTIVE — security/recovery research delegated |
| P5.4 | Threat-model credentials, CMS roles, previews, webhooks, forms, isolation, updates, access revocation | P5.1–P5.3 | ACTIVE — security/recovery research delegated |
| P5.5 | Produce and review `docs/05-architecture.md`, diagrams, and `docs/05-security.md` | P5.4 | FUTURE |
| G1 | **Checkpoint 1 owner approval** | P1.5, P2.7, P3.5, P4.5, P5.5 | BLOCKED |

### P6 — Design system and skill research

| ID | Task | Depends on | Status |
|---|---|---|---|
| P6.1 | Select/analyze 5–8 current design references across named galleries/showcases | G1 | FUTURE |
| P6.2 | Develop three distinct agency visual directions with responsive/mobile treatments | P6.1 | FUTURE |
| P6.3 | Research required skill repositories for license, maintenance, compatibility, install, and security | G1 | FUTURE |
| P6.4 | Recommend minimal non-duplicative skill stack; install only after review/approval | P6.3 | FUTURE |
| P6.5 | Produce/review `docs/06-design.md`, `docs/06-skills.md`, and draft `DESIGN.md` | P6.2, P6.4 | FUTURE |

### P7 — Agency website specification

| ID | Task | Depends on | Status |
|---|---|---|---|
| P7.1 | Confirm content strategy, target market language/RTL needs, pages, and blog justification | P6.5 | FUTURE |
| P7.2 | Define sitemap, navigation, page hierarchy, wireframes, and real-content requirements | P7.1 | FUTURE |
| P7.3 | Define CMS schemas, reusable components, image/form/SEO/analytics/accessibility behavior | P2.7, P5.5, P7.2 | FUTURE |
| P7.4 | Define preview/publishing/deployment and implementation order | P7.3 | FUTURE |
| P7.5 | Produce/review `docs/07-agency-site.md` and finalize `DESIGN.md` proposal | P7.4 | FUTURE |
| G2 | **Checkpoint 2 owner approval of visual direction, content model, and implementation plan** | P7.5 | BLOCKED |

### P8 — Agency website implementation

| ID | Task | Depends on | Status |
|---|---|---|---|
| P8.1 | OpenSpec + Astro/TypeScript foundation and approved dependencies | G2 | FUTURE |
| P8.2 | OpenSpec + CMS schemas/integration, preview, and seeded truthful content | P8.1 | FUTURE |
| P8.3 | Shared tokens, typography, navigation, footer, and layouts | P8.1 | FUTURE |
| P8.4 | Homepage implementation with screenshot inspection | P8.2, P8.3 | FUTURE |
| P8.5 | Services, portfolio, and case-study pages | P8.4 | FUTURE |
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

Review `docs/04-pricing-operations.md` after Luna synthesis, including price formulas, care scope and Storyblok commercial/permission gates. Review Phase 5 security research, then delegate disjoint architecture/security syntheses and independent reviews. Preserve sensitive EmDash SQLite evidence locally and do not claim portable restore proof from a missing backup. Present Checkpoint 1 with exact unresolved product/legal/operating gates; do not unblock any owner gate without approval.
