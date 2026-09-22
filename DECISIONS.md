# Decision Log

Decision states: **Provisional**, **Approved**, **Superseded**, **Rejected**. Recommendations remain provisional until the relevant owner checkpoint.

## D-001 — Lean service business before internal platform

- **Decision:** Prioritize sellable Astro/Ghost services, documented operating workflows, and two pilots. Defer proprietary builders, multi-tenant hosting, custom CRM, and speculative automation.
- **Reasoning:** The business objective is near-term service viability. Internal platforms add capital cost, security exposure, and maintenance before demand is proven.
- **Alternatives considered:** Build a site generator, shared multi-tenant platform, or custom client portal first.
- **Relevant sources:** Project brief (repository origin requirement); external market evidence will be added in Phase 1.
- **Date:** 2026-09-22.
- **Approval status:** Approved by project brief.

## D-002 — Phase-gated delivery

- **Decision:** Research and planning proceed through three explicit approval checkpoints. No agency-site implementation before Checkpoint 2, and no paid service creation, domain purchase, DNS change, production infrastructure, or public launch before Checkpoint 3.
- **Reasoning:** Business, CMS, architecture, and design choices materially affect cost and rework.
- **Alternatives considered:** Begin implementation while architecture and visual direction remain unresolved.
- **Relevant sources:** Project brief approval checkpoints.
- **Date:** 2026-09-22.
- **Approval status:** Approved by project brief.

## D-003 — Isolated client boundaries by default

- **Decision:** Plan separate client repositories, credentials, CMS instances, deployments, data, and backups unless a future approved requirement demonstrates otherwise.
- **Reasoning:** Isolation reduces blast radius, simplifies ownership transfer, and avoids premature multi-tenancy.
- **Alternatives considered:** Central shared repository, shared CMS tenancy, or agency-owned multi-tenant runtime.
- **Relevant sources:** Project brief technical architecture and ownership requirements; detailed validation belongs to Phase 5.
- **Date:** 2026-09-22.
- **Approval status:** Approved by project brief; implementation specifics pending Checkpoint 1.

## D-004 — Native Ghost themes are the default evaluation baseline

- **Decision:** Evaluate native Ghost themes as the default service architecture; require a documented functional reason before recommending headless Ghost + Astro.
- **Reasoning:** Native themes preserve Ghost’s integrated publication, membership, Portal, and newsletter frontend behavior unless project requirements outweigh those benefits.
- **Alternatives considered:** Headless Ghost + Astro as the default for all Ghost work.
- **Relevant sources:** Project brief; current Ghost documentation and limits will be cited in `docs/03-ghost.md`.
- **Date:** 2026-09-22.
- **Approval status:** Approved evaluation constraint; final architecture pending Checkpoint 1.

## D-005 — No universal CMS decision before scenario testing

- **Decision:** Select CMS approaches separately for the agency site, small client sites, and advanced editorial sites after pricing, permissions, editing, preview, export, and recovery testing.
- **Reasoning:** Editorial requirements and account/permission economics differ by project.
- **Alternatives considered:** Mandate one CMS for all Astro projects.
- **Relevant sources:** Project brief; Phase 2 evidence pending.
- **Date:** 2026-09-22.
- **Approval status:** Approved research constraint; product choices pending Checkpoint 1.

## D-006 — Initial target segments

- **Decision:** Prioritize independent publications/newsletter businesses for Ghost-led work and professional-services firms on legacy WordPress for Astro-led migrations and rebuilds.
- **Reasoning:** The first segment has a clear publication, membership, newsletter, migration, and ownership problem; the second has a referral-trust problem, a visible legacy-platform trigger, and a strong fit for mostly static content with controlled editing.
- **Alternatives considered:** General small businesses, photographers, creative professionals, solo consultants, and “WordPress migrations” as a standalone segment. Migration is retained as a cross-segment buying trigger rather than a customer segment.
- **Relevant sources:** `docs/01-business.md` §§3 and 6; `research/phase-1/segments.md`; final review `research/phase-1/final-review.md`.
- **Date:** 2026-09-22.
- **Approval status:** Provisional until Checkpoint 1.

## D-007 — Three-package initial offer shape

- **Decision:** Develop three bounded opening offers: an Astro launch site, a native Ghost publication launch, and a migration/remediation package. Do not set final prices until Phase 4 and pilot time data.
- **Reasoning:** Fixed scope makes sales and delivery legible while preserving a quoted custom path. Migration/remediation provides a concrete trigger and evidence-producing acceptance criteria. A separate launch care/hosting package would introduce unmeasured recurring responsibility.
- **Alternatives considered:** Custom-only projects, agency-owned hosting as the lead offer, unlimited maintenance retainers, a theme product line, and marketing retainers.
- **Relevant sources:** `docs/01-business.md` §§1, 4, and 7; `research/phase-1/business-model.md`; public competitor evidence in `research/phase-1/competitors.md`.
- **Date:** 2026-09-22.
- **Approval status:** Provisional until Checkpoint 1.
