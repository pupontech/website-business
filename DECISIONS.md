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

## D-008 — Native Ghost and managed publication hosting as the proposed default

- **Decision:** Propose client-owned Ghost(Pro) with a native Ghost theme for normal publication work. A custom or premium theme requires Publisher or a higher qualifying plan. Self-hosting and headless Ghost require separately justified and priced operating/rebuild plans.
- **Reasoning:** Native themes retain Ghost's publication, membership, Portal, newsletter, archive, and SEO frontend behavior. Ghost(Pro) includes managed platform and email duties; a self-hosted VPS invoice omits mail, database, backups, edge, monitoring, updates, incident response, and labour. Documentation-backed headless membership and Portal limitations remain unresolved by runtime proof.
- **Alternatives considered:** Ghost(Pro) Starter with an uploaded custom theme (plan-gated), default self-hosting, and headless Astro for every Ghost publication.
- **Relevant sources:** `docs/03-ghost.md` §§2–6, 9; `research/phase-3/hosting-operations.md`; `research/phase-3/themes-product-headless-backup.md`; final review `research/phase-3/final-review.md`.
- **Date:** 2026-09-23.
- **Approval status:** Provisional until Checkpoint 1; no Ghost account or production operation authorized.

## D-009 — Astro-first planning direction (scoped owner approval)

- **Decision:** On 2026-09-24 the owner chose the Astro-first plan in response to the Checkpoint 1 choice. Proceed with Astro-focused Phase 6 design/reference and skill research, then Phase 7 agency-site specification for a static-first Astro service business. Defer Ghost work; preserve its existing research without treating it as a launch commitment.
- **Scope:** This is a direction to plan, not approval of particular CMS/hosting vendors, prices, operating policies, design identity, third-party skill installations, application implementation, client-account creation, purchases, DNS, or production deployment. The agency-site Markdown/MDX scenario is a working hypothesis; client CMS permissions and recovery remain unproven. Phase 7 and the design proposals still require Checkpoint 2 before implementation. Checkpoint 3 still gates public launch and paid/production actions.
- **Reasoning:** The reviewed Astro-only exploratory research maps static-first, single-editor agency content separately from the untested nontechnical-client CMS workflows. The owner explicitly selected Astro first rather than revising the entire business/CMS architecture now.
- **Alternatives considered:** Continue Ghost work now, approve a universal CMS/host, or start implementation before a reviewed design and specification.
- **Relevant sources:** Owner instruction in this session; `research/astro-only/visual-references.md`, `research/astro-only/cms-hosting-gates.md`, `research/astro-only/independent-review.md`; `docs/02-cms.md` and `docs/05-architecture.md` (provisional planning only).
- **Date:** 2026-09-24.
- **Approval status:** Approved for Astro-first planning only; D-006–D-008 recommendations not blanket-approved, and Ghost delivery remains deferred.

## D-010 — Owner inputs for Astro-first design/specification pass

- **Decision:** On 2026-09-24 the owner confirmed: keep the project **Astro-only for now** with Ghost parked; cover **both** professional-services client websites and the agency's own marketing site; compare local Markdown/MDX, Sanity, and Storyblok without choosing a CMS yet; proceed from exploratory research into a Phase 6 design/specification pass; preferred visual tone is **clean corporate minimal**.
- **Scope:** These are inputs to Phase 6/7 planning, not Checkpoint 2 approval, a CMS/host choice, final identity/copy approval, implementation permission, account creation, purchase, DNS, deployment, or production launch. The CMS outcome must remain comparative until a later owner decision. Ghost remains deferred.
- **Reasoning:** The answers narrow the next planning work while preserving the gated process: design/specification can advance, but vendor selection and implementation remain blocked.
- **Alternatives considered:** Ghost continuation now; a single CMS choice now; research-only pause; non-minimal/agency-heavy visual directions.
- **Relevant sources:** Owner answers in this session on 2026-09-24; `research/astro-only/visual-references.md`, `research/astro-only/cms-hosting-gates.md`, and `research/astro-only/independent-review.md`.
- **Date:** 2026-09-24.
- **Approval status:** Approved inputs for planning only; Checkpoint 2 remains blocked until the final design/specification proposal is reviewed and explicitly approved by the owner.

## D-011 — Agency-site content and contact planning inputs

- **Decision:** On 2026-09-24 the owner left the public business name and person/team identity undecided; named **Astro static** and **Astro CMS** as services to plan around; chose **English** for launch language without specifying a buyer or geography; stated there is **no publishable work, credential, testimonial, or other proof right now**; and prefers a **simple contact form**, conditional on provider and privacy review.
- **Scope:** These are agency-site planning inputs, not verified service capabilities, final copy, a selected CMS/host/form provider, authority to collect inquiries, or Checkpoint 2 implementation approval. Do not infer a country, target buyer, identity, service promises, CMS vendor, or client-site language/content from these answers. A real form remains blocked on owner/provider/privacy/data-flow decisions and synthetic testing. Client-specific briefs remain separate.
- **Reasoning:** The answers narrow truthful agency-site content and contact planning while preserving unknown identity/audience and unresolved product/data gates.
- **Relevant sources:** Owner answers to the agency-site planning questions in this session on 2026-09-24; D-009 and D-010 for the Astro-first and dual-track boundaries.
- **Date:** 2026-09-24.
- **Approval status:** Approved inputs for planning only; G2 and G3 remain blocked.

## D-012 — Agency-site owner clarifications for the G2 proposal

- **Decision:** On 2026-09-25 the owner deferred the agency's public business name and person/team identity. The agency site is intended for **English speakers in Israel**; this audience/geography is agency-specific and does not prescribe future clients' locale or language. Plan agency **Home, Services, and Contact** pages, with **About conditional on real identity**; omit **Work and Insights** for now. Keep the preferred simple contact form in the plan, but **do not make it live** until a provider and privacy review and the required data-handling/test gates are resolved. Keep Markdown/MDX, Sanity, and Storyblok **unselected** pending separately authorized tests.
- **Scope:** These are planning inputs to revise the owner-review proposal, not approval of a finished visual design, service claim, public copy, form provider, CMS, host, account, implementation, or launch. With identity deferred, no guessed business name or team/about copy may be published. A planned Contact page cannot claim a working form or guessed recipient; a non-form alternative requires a separately verified and owner-approved route. Client-site briefs remain separate.
- **Relevant sources:** Owner answers in this conversation on 2026-09-25 to the five agency-site proposal questions; D-009–D-011 and `docs/07-owner-review-proposal.md` for prior scope.
- **Date:** 2026-09-25.
- **Approval status:** Approved planning clarifications only; Checkpoint 2 and Checkpoint 3 remain blocked.

## D-013 — Checkpoint 2 scoped implementation approval, pending final review

- **Decision:** On 2026-09-25 the owner answered “Approved” to the Checkpoint 2 proposal as just described: accept the clean corporate-minimal, responsive planning direction and the separate agency/client-site scope, and authorize only a **route-neutral, static-first Astro/TypeScript foundation** after the independent D-012 proposal review passes and Sol reconciles Phase 6/7 evidence. This is not approval to publish unfinished copy or to implement a CMS integration or working contact form.
- **Conditions and boundaries:** G2 may be completed only after review `t_2708d383` has a verified PASS and the Phase 6/7 parent cards are reconciled without treating invalidated `docs/07-agency-site.md` as the approved spec. The agency-site plan remains Home/Services/Contact, About conditional on real identity, Work/Insights omitted for now, intended for English speakers in Israel. Public name/person identity is deferred. Markdown/MDX, Sanity and Storyblok remain unselected pending separate authorization and tests; the initial foundation must not silently choose any of them as the site editor or integrate a CMS. The contact form is planning-only until provider/privacy/data-flow/recipient/abuse and synthetic delivery gates; no real data collection. No invented agency proof, service capability, identity, copy, or client-specific requirements. Scope includes local development, automated verification and GitHub-hosted CI for the foundation, not production hosting.
- **Still requires separate authorization:** Exact CMS route/account/product tests, form provider or real recipient, paid services, domain/DNS, production deployment and public launch (G3), plus any implementation change beyond the route-neutral foundation. Significant source changes require the project OpenSpec gate and normal tests/review before they are claimed complete.
- **Relevant sources:** Owner's “Approved” response in this conversation to the Checkpoint 2 explanation, D-009–D-012, `docs/07-owner-review-proposal.md`; independent D-012 review still running at record time.
- **Date:** 2026-09-25.
- **Approval status:** The corrected proposal received independent PASS (`research/phase-7/d013-owner-proposal-rereview.md`); Sol verified and completed the Phase 6/7 parent cards on 2026-09-27. G2 is now complete **only for the stated route-neutral foundation**, recorded by Kanban `t_13af4836`. OpenSpec, scoped tasks, and verification still precede implementation claims. G3 remains blocked.

## D-014 — Future password-protected development preview target

- **Decision:** The owner chose `astrodev.aygross.xyz` as a **password-protected staging preview once the actual site is built**, not a public development preview or an immediate publication of the synthetic Astro foundation.
- **Scope:** This authorizes planning a private preview on that exact hostname after a separately scoped site build and verification. It does not expand D-013's current route-neutral foundation implementation into a finished agency site, approve a live form or public copy, or release G3 for public launch, production/paid services, or unrelated DNS changes. Before provisioning, document the precise artifact, owner-only access and credential handling, noindex/non-public safeguards, HTTPS, data/secret isolation, rollback, and verification; secure password material must never enter Git or chat. Do not configure the vhost or publish unfinished content yet.
- **Evidence:** On 2026-09-27, `astrodev.aygross.xyz` resolved to this VPS (`159.195.23.224`), but Caddy had no matching host block and the HTTPS handshake failed. No `site/` foundation application existed at this check. These are discovery results, not deployment proof.
- **Relevant sources:** Owner's staging-preview choice in this conversation; `PROJECT_STATUS.md` and D-013 scope.
- **Date:** 2026-09-27.
- **Approval status:** Approved target and private-preview intent only; deployment is deferred until the site and preview-specific security/verification gates are satisfied. G3 remains blocked.

## D-015 — Owner answers for the first Astro build defaults

- **Decision:** On 2026-09-27 the owner confirmed: proceed with the approved foundation first; use a clearly generic placeholder identity when a private draft needs one; make Contact “coming soon” with no working form; use `astrodev.aygross.xyz` as a password-protected private preview after the actual site is built and verified; and keep the first draft minimal/corporate with a one-page feel split across Home, Services, and Contact.
- **Scope:** These answers do not expand D-013 beyond the current route-neutral foundation implementation. The generic placeholder, Contact-coming-soon copy, private preview, and Home/Services/Contact draft shape are defaults for the next agency-draft scope after the foundation is accepted or for documentation of later preview behavior. Do not publish a real identity, live contact form, email route, CMS integration, analytics, public launch, paid service, DNS/public production change, or client-specific site from this decision alone.
- **Relevant sources:** Owner answers in this conversation on 2026-09-27 to the first-build questions.
- **Date:** 2026-09-27.
- **Approval status:** Approved defaults for first draft/private preview planning; foundation implementation remains the current authorized build. G3 remains blocked.

## D-016 — Local-only agency draft exception and content defaults

- **Decision:** Owner explicitly authorized starting agency application source locally only while GitHub Actions billing/spending-limit failure prevents hosted runs. This overrides the hosted-CI prerequisite for *local development*, not acceptance: P8.1 and the agency draft remain UNACCEPTED until hosted CI runs green on exact required commits. No push, merge, private preview, deployment, DNS, production, or public launch is authorized under this exception.
- **Draft contract:** Three short linked routes `/`, `/services/`, `/contact/` with trailing slashes and a compact shared feel. Literal placeholder `[Agency name — placeholder]` with persistent `PRIVATE DRAFT — placeholder identity; not for publication.` notice on all routes. Services may show `Astro static` and `Astro CMS` only as explicitly unverified planning labels, qualified by `Service areas under consideration — scope and capability not yet confirmed.` Contact says `Contact — coming soon` and `This private draft has no contact form or message channel.` English only; qualitative no application JavaScript and zero external requests, without a numeric score target. Home uses only clearly marked content-needed placeholders, not invented claims.
- **Scope:** Local static Astro draft and local verification only. Ghost/CMS integration or editor selection, working contact path, real identity/claims, accounts, paid services, remote preview, DNS, public indexing and G3 remain excluded. Noindex is not access control.
- **Evidence:** Owner answered “Authorize local-only draft now; CI acceptance and deployment stay blocked” and “Use these safe defaults” in this conversation. GitHub Actions runs 36333293071 and 36333299182 failed pre-run on account billing/spending-limit annotation; no hosted runner steps executed.
- **Date:** 2026-09-28.
- **Approval status:** Approved local-only development exception and draft defaults. Historical restriction on pushing the draft is superseded by D-017; acceptance and deployment still require separate gates.

## D-017 — Public repository and hosted CI continuation

- **Decision:** On 2026-09-28 the owner requested making the Astro repository public so GitHub Actions can run, then continuing. The repository was already observed public via the GitHub API; foundation PR #1 hosted push and PR jobs passed on `a2298ca`. Continue by publishing the reviewed agency-draft branch for hosted verification against the foundation branch.
- **Scope:** This supersedes D-016's no-push limit solely for the allowlisted draft source/spec/evidence and CI. It does not approve merging PRs, publishing a website, provisioning a preview, DNS/hosting, form/CMS integration, real content claims, or G3. Retain unfinished acceptance/manual-review labels and exclude local sensitive EmDash artifacts.
- **Relevant sources:** Owner's current instruction; GitHub API visibility check; PR #1 checks on commit `a2298ca`.
- **Date:** 2026-09-28.
- **Approval status:** Approved for repository visibility and hosted CI continuation; no site launch.
