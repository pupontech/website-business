# P1.3 — Initial business model, offers, and operating boundaries

- **Task:** Kanban `t_e82dd7f6` (Phase 1 research, board `website-business`).
- **Status:** Research artifact for synthesis into `docs/01-business.md` (P1.4). Not an approved decision.
- **Date of authorship:** 2026-09-22 (all web sources retrieved 2026-09-22, UTC, unless stated otherwise).
- **File scope:** This is the only file written by this task. Governance files, `docs/`, Kanban state, and Git history were not modified.
- **Sibling artifacts:** `research/phase-1/competitors.md` and `research/phase-1/segments.md` were assigned to parallel tasks. `segments.md` appeared in the workspace during this run and was reconciled in section 5.1; `competitors.md` was not present and is not relied on here. Full reconciliation is P1.4's job.

Evidence labels used throughout: **FACT** (verified in a cited source during this task), **ESTIMATE** (arithmetic or reasoning by this author, no external source), **RECOMMENDATION** (proposed action, not yet approved), **UNKNOWN** (not established; must be resolved or verified elsewhere).

---

## 1. Method, sources, and what was actually verified

Work performed:

1. Read the governing files: `AGENTS.md`, `README.md`, `PROJECT_STATUS.md`, `DECISIONS.md`.
2. Retrieved and read first-party platform sources: Ghost pricing and hosting documentation [1][2][3][24], Astro framework and partner documentation [4][5][11][12], Cloudflare Pages/Workers limits and pricing [6][7], Netlify pricing [8], Vercel pricing [9].
3. Retrieved official marketplace/directory and channel sources: Ghost Experts directory and application criteria [10], Astro Agency Partner program and directory [11][12], Ghost Forum "Marketplace" category [13], Ghost theme marketplace including one paid theme [14].
4. Retrieved four publicly published agency offering pages to extract offering *patterns* (package shapes, exclusions, responsibility splits) [15][16][17] plus Ghost's own theme pricing [14].
5. Retrieved official acquisition-relevant sources: Google Business Profile content guidelines [18], Google Search Central SEO Starter Guide [19].
6. Retrieved official legal-frame sources: GDPR on EUR-Lex [20], EDPB Guidelines 07/2020 landing page and PDF URL [21], European Commission European Accessibility Act page [22], W3C WCAG 2.2 Recommendation [23].
7. Verified the MIT license text of the Astro repository directly from the repository file [5], and confirmed the presence of `gscan` validation in Ghost's official theme documentation [24].

Verification notes and method limits:

- Prices and plan limits are volatile. Every volatile figure below carries its retrieval date (2026-09-22) and is presented as a **point-in-time advertised price**, not as a stable market rate.
- **FACT** items are limited to what a cited page actually stated at retrieval time. Where a claim is a legal article number rather than page text I re-read during this task, it is marked as such in section 8.4.
- EUR-Lex blocks non-browser retrieval above the document shell (`HTTP 202`, empty body) from this workspace; the `eur-lex.europa.eu` document pages were readable through the standard extractor, but the article-level bodies of Directive (EU) 2019/882 were not re-read in full in this task (see section 13).
- No CMS account, hosting account, theme, or client system was used or created; no proof of concept was executed. Statements about platform behaviour are documentation-backed, not test-backed.
- Prices published by other agencies are used only as **attributed public offering patterns**. They are not a market rate, not a competitor's private pricing, and not a basis for our own pricing (which is P4.1's job).

---

## 2. Constraint baseline that shapes the model

These are binding project constraints, not research findings; they bound what a "recommended" model may contain.

- **FACT (project):** Sell services first; do not build a proprietary website builder, multi-tenant hosting platform, custom CRM, or generalized automation platform without an approved demonstrated requirement (`AGENTS.md`; `DECISIONS.md` D-001).
- **FACT (project):** Prefer static Astro output and minimal client JavaScript; do not add a UI framework without a documented requirement (`AGENTS.md`).
- **FACT (project):** Native Ghost themes are the default evaluation baseline; headless Ghost + Astro requires written justification (D-004).
- **FACT (project):** Client repositories, credentials, CMS instances, deployments, data, and backups stay isolated by default (D-003).
- **FACT (project):** Prefer managed hosting where its full cost is lower than the risk and labour of self-hosting — compare total responsibility, not VPS price (`AGENTS.md`).
- **FACT (project):** No paid services, domains, DNS changes, production infrastructure, or public launch before Checkpoint 3 (`README.md`, D-002).
- **FACT (project):** WCAG 2.2 AA is the accessibility baseline target; performance budgets and Core Web Vitals are design constraints (`AGENTS.md`). WCAG 2.2 is a W3C Recommendation dated 12 December 2024 [23].

Consequences for model design (RECOMMENDATION): the initial model must be deliverable by a small operator with no proprietary platform, must not depend on agency-owned multi-tenant infrastructure, and must not promise availability or marketing outcomes it cannot contractually control.

---

## 3. Business-model options evaluated

Twelve candidate models were enumerated from the task brief plus adjacent patterns observed in public offering pages [14][15][16][17].

| ID | Model | One-line definition |
|---|---|---|
| M1 | One-off custom project | Bespoke Astro/Ghost scope, quoted per project, milestone-billed. |
| M2 | Fixed-scope productised package | A named, bounded deliverable with published inclusions/exclusions [16]. |
| M3 | Ghost setup / migration service | Install or migrate a publication to Ghost (managed or self-hosted), bounded content move [15]. |
| M4 | Custom Ghost theme build | Handlebars theme built for a publication [15][24]. |
| M5 | Hosting / managed hosting responsibility | We hold or operate the site's hosting, or pass it through with defined boundaries. |
| M6 | Maintenance & care retainer | Recurring upkeep: availability, backups, updates, monitoring, a block of small changes, a named route to a human [17]. |
| M7 | Content/editorial support block | Prepaid hours for content edits and small build changes, no monitoring. |
| M8 | Theme/template product line | Sell themes/templates as products in a marketplace [14]. |
| M9 | White-label subcontracting | Deliver Astro/Ghost work under another agency's brand. |
| M10 | Training / handover workshop | Paid enablement and documentation handover for client teams. |
| M11 | Marketing retainer (SEO/ads/content) | Ongoing acquisition work for the client — outside the website remit. |
| M12 | Headless Ghost + Astro build | Ghost as CMS, separate Astro frontend (requires justification, D-004). |
| M13 | Self-hosted infrastructure productised | We run the client's VPS, updates, backups, monitoring ourselves. |

---

## 4. Business-model matrix

Ratings are this author's assessment (**ESTIMATE**) informed by the cited sources; they rate *the model as a business line for a small operator*, not the quality of the work.

| Model | Sales clarity | Delivery variance | Cash flow | Recurring responsibility | Support burden | Security / availability obligation | Margin potential | Small-operator fit |
|---|---|---|---|---|---|---|---|---|
| M1 One-off custom | Low–Medium (needs discovery/proposal) | High | Good (deposit + milestones [15][16]) | Low | Low after handover | Low if client owns platform | Medium–High | Medium |
| M2 Fixed-scope package | High (name, scope, exclusions [16]) | Low–Medium | Good–Excellent | Low | Low | Low (client-owned platform) | Medium | High |
| M3 Ghost setup/migration | High | Medium | Good | Low | Medium during cutover | Medium (DNS/TLS/mail cutover) | Medium | High |
| M4 Custom Ghost theme | Medium (scope varies widely) | High | Fair (long single deliverable) | Low | Low | Low | Medium (hour-bound) | Medium |
| M5 Hosting responsibility | Deceptively high to sell | Low delivery, high ops | Excellent (recurring) | **High** | **High** | **High** | Medium (thin per site) | **Low initially** |
| M6 Maintenance & care | High if tiers are named [17] | Medium | Excellent | **High** | **High** | **High** | Medium–High | Medium (later) |
| M7 Content hours block | High | Low | Good (prepaid) | Low | Medium | Low | Low–Medium | High |
| M8 Theme/template product | High (price on a page [14]) | Low per unit | Poor at first (build now, sell later) | Low | Low | Low | Unknown until volume | Low initially |
| M9 White-label subcontracted | High (one buyer) | Medium | Good (but concentrated) | Low | Medium (client's client) | Medium | Low–Medium (price pressure) | High as a bridge |
| M10 Training/handover | Medium | Low | Good | Low | Low | Low | Medium (hour-bound) | High |
| M11 Marketing retainer | Medium | Medium–High | Excellent | High (outcome promises) | High | Low | Medium | Low (out of remit) |
| M12 Headless Ghost + Astro | Medium | High | Fair | Low | Medium | Medium | Medium | Low (blocked by D-004 absent justification) |
| M13 Self-hosted infra productised | Medium | Medium | Excellent | **Very high** | **Very high** | **Very high** | Medium–High | **Low** |

### 4.1 Why the high-recurring, high-obligation models rate poorly *initially*

**FACT:** Ghost's own hosting documentation compares Ghost(Pro) with self-hosting line by line: self-hosting means manual install and setup, manual weekly updates, manual server maintenance, manual SSL, no 24/7 on-call team, and no "enterprise-grade security", while the buyer separately sources CDN/WAF (from **$20/mo**), email newsletter delivery (from **$15/mo**), analytics (from **$10/mo**), backups (from **$5/mo**) and image editing (from **$12/mo**), on top of base hosting from **$10/mo** ([2], retrieved 2026-09-22). The same page states the officially supported stack (Ubuntu 22.04/24.04/26.04 LTS, Node.js 22 LTS, MySQL 8.0/8.4, NGINX, systemd, ≥1 GB memory, non-root user) and lists hardening steps (HTTPS, separate admin domain, `mysql_secure_installation`, firewall rules, disabling SSH root/password logins) [2][3].

**ESTIMATE:** A $4–$10 VPS is therefore the smallest line item in a self-hosted stack, not the cost of the responsibility. Whoever holds the hosting line inherits updates, backups that have actually been restored, monitoring, TLS, deliverability, incident response, and the legal position of processing data on someone else's behalf (section 8.4). The published market pattern agrees in shape: a published care-plan breakdown defines a care plan as six jobs — keep it up, keep copies, keep it patched, watch it, change it, answer — and notes that "the maintenance is real; it is engineering rather than button-clicking" on non-WordPress stacks [17] (retrieved 2026-09-22).

**FACT:** On the managed side, an availability SLA is not part of the cheaper tiers. Ghost(Pro) lists a **99.9% uptime SLA only on its Custom plan**, with "no uptime SLA" on Starter/Publisher/Business [1] (retrieved 2026-09-22). Netlify lists a **99.99% SLA on Enterprise only** [8]; Vercel lists a **99.99% SLA on Enterprise only** [9] (both retrieved 2026-09-22).

**RECOMMENDATION:** Do not sell availability, uptime, or "the site will always be up" language below the tier where a provider actually backstops it. Any hosting or care line must be written as *best-effort response*, not availability guarantee, until a provider SLA is contractually passed through (section 8).

### 4.2 Why the low-variance, client-owned-platform models rate well initially

**FACT:** Static-output Astro sites ship zero client-side JavaScript by default, are server-first, and are designed so "it should be nearly impossible to build a slow website" [4] (retrieved 2026-09-22). Astro is MIT-licensed [5]. On Cloudflare Pages, static asset requests are free and unlimited, the free plan allows 500 builds/month, 20,000 files per site, up to 100 custom domains per project and 100 projects per account, with a 25 MiB per-asset limit [6][7]; dynamic Pages Functions draw on the Workers quota ($5/mo minimum account charge on Workers Paid, 10M requests included) [7] (both retrieved 2026-09-22).

**ESTIMATE:** A static marketing site delivered to a client-owned account on a free/near-free static host has near-zero recurring operational obligation for us — which is precisely why it is the correct opening offer for an operator without operational slack.

---

## 5. Recommended initial operating model

**RECOMMENDATION — the initial mix (sequenced, not simultaneous):**

1. **Front door (primary): M2 — fixed-scope productised packages.** A named Astro website package and a named Ghost package. Fixed inclusions, fixed exclusions, fixed timeline, one or two revision rounds, deposit + milestone billing. Pattern evidence: a publicly published Astro starter package with fixed price, fixed scope, an explicit "what this does not include" list, and one revision round [16]; a Ghost studio publishing per-deliverable estimates, a credited discovery fee, deposit-plus-hours invoicing, two revision rounds, and a repository the client owns [15] (both retrieved 2026-09-22).
2. **Inbound depth (secondary): M1 — custom Astro and Astro+CMS projects**, quoted individually, entered from the package front door. This is where margin and portfolio depth come from; it must not become the *only* offer, because it has the weakest sales clarity and highest delivery variance.
3. **Platform specialism (secondary): M3 — Ghost setup, migration, and bounded theme customisation.** Sold as its own bounded engagement with a cutover plan.
4. **Add-on after launch: M7 — prepaid content hours**, because it is low-obligation recurring revenue that does not create an availability promise.
5. **Not at launch: M5 hosting and M13 productised self-hosting.** Defer until (a) at least two documented pilots measured real cost per site, and (b) a written responsibility matrix exists (section 8). Sell hosting only as *pass-through in the client's own account* before then.
6. **Not at launch: M6 care retainer as a headline offer.** Introduce it only after pilots, bounded to the six-job shape [17] with named response windows and no availability guarantee (section 8). Care is the natural second purchase, not the first.

Explicitly rejected as an opening posture (**RECOMMENDATION**): selling hosting margin as the business, selling unlimited-edit retainers, selling marketing outcomes, or leading with custom theme builds (M4) whose scope variance is the highest of the delivery models.

### 5.1 Alignment with the sibling segment research

**FACT (sibling artifact, read 2026-09-22):** `research/phase-1/segments.md` (P1.2, task `t_41165c2a`) recommends exactly two initial segments: **Segment A — independent publications and newsletter businesses (Ghost-led)**, and **Segment B — professional-services firms on legacy WordPress (Astro-led, migration as the entry wedge)**. Its notes state that the cheapest credible Ghost configuration for Segment A's needs is **Publisher at $29/mo, not Starter**, and that migration is a cross-cutting wedge rather than a segment.

Consistency check against this document's recommendations:

| This document | Sibling segment evidence | Alignment |
|---|---|---|
| Package B (Ghost publication launch, Publisher-tier constraint [1]) | Segment A's Ghost-led buyers and the same Publisher-tier finding | Consistent |
| Package C (migration/remediation as a bounded, evidence-producing offer) | Segment B enters through migration; S7 treated as a wedge, not a segment | Consistent |
| Package A (bounded Astro site) | Segment B's mostly-static trust site with light editing | Consistent |
| Care plan deferred until after pilots (M6) | Segment B "supports genuinely recurring work … rather than manufactured retainers"; Segment A "bounded recurring maintenance that the client can fund" | Consistent in substance; this document additionally requires the section 7 responsibility matrix before any care line is sold |
| Hosting resale deferred (M5/M13) | Segment A's qualifying criterion is a client "willing to own its hosting and Stripe relationship" | Consistent — client-owned platform is the assumed posture |
| Exclusions: no CRM/practice-management tooling | Segment B counterargument names scope creep into practice-management/CRM tooling as a risk | Consistent |

**UNKNOWN:** whether Segment A buyers will pay for a bespoke build rather than configuring a premium theme is recorded in `segments.md` as an open question; this document does not resolve it, and Package B is deliberately scoped so that the theme decision (marketplace theme vs custom build) is made per client rather than assumed.

**RECOMMENDATION for P1.4:** `segments.md` uses the additional labels `ASSUMPTION` and `[community anecdote]`; the synthesised document should normalise label vocabulary to the set in `AGENTS.md` (`FACT` / `ESTIMATE` / `RECOMMENDATION` / `UNKNOWN`) while preserving its provenance distinctions.

---

## 6. Three initial package outlines (scope only, no final prices)

Pricing is deliberately absent. P4.1 builds the bottom-up calculator from measured pilot time (P9.5); presenting a price here would invent a market fact this research cannot support.

### Package A — "Launch site" (Astro marketing/site build), fixed scope

- **Outcome sold:** a fast, accessible, responsive site the client can host in their own account and edit without us.
- **Included scope (bounded):** up to a fixed page count (e.g. 8 pages; exact ceiling is a P4.1 decision); one design direction based on client brand assets already supplied; semantic HTML, responsive images, WCAG 2.2 AA baseline with a documented manual check pass [23]; metadata, sitemap, structured data basics, redirect map for moved URLs; contact form wired to a client-owned form provider or endpoint with server-side validation and spam control; analytics/privacy integration choice; one round of consolidated revisions; deployment to the client's hosting account; a written handover (how to edit, how to roll back, who owns what).
- **Explicit exclusions (pattern: [16]):** content writing and copy; photography/video; logo or brand identity; e-commerce, booking, member areas, dashboards; multi-language; integrations beyond an agreed list; paid-media or ongoing SEO; more than the stated page count; work on the platform after acceptance (that is Package C or care).
- **Client responsibilities:** brand assets, content, domain/hosting account, timely feedback in one consolidated batch, named decision-maker.
- **Acceptance evidence:** build passes type check and production build; automated accessibility run plus recorded manual keyboard/focus/semantics review; Lighthouse/CWV run with recorded environment; screenshots at desktop/tablet/mobile; link/metadata/sitemap checks (per `AGENTS.md` testing expectations).
- **Recurring implications if sold alone:** none. This is the deliberate design choice.

### Package B — "Ghost publication launch" (setup, customisation, handover), fixed scope

- **Outcome sold:** a working Ghost publication with a real domain, a correctly configured theme and membership/newsletter basics, and a team that has been trained to publish.
- **Platform decision inside this package:** Ghost(Pro) or an equivalent managed Ghost host by default, per `AGENTS.md`'s managed-hosting preference and D-004's native-theme baseline. **FACT (scoping constraint):** on Ghost(Pro), **custom themes and paid subscriptions are unavailable on Starter**; Publisher is the tier where custom themes, paid subscriptions, multiple staff users, and custom sending domain appear [1] (retrieved 2026-09-22). This must be stated to the client before any theme work is agreed.
- **Included scope (bounded):** account/host provisioning *in the client's name*; domain and DNS coordination; theme selection from the marketplace or a bounded customisation of an existing theme; membership/newsletter configuration review (tiers, signup/account pages, Stripe and sending-domain setup as client-owned decisions); bounded content/archive import; navigation, SEO basics, redirect map; accessibility pass on the touched templates [23]; staff training session; documented handover including backup/export procedure; `gscan` validation of any theme we ship [24].
- **Explicit exclusions:** bespoke theme design (that is Package C / M4 with its own scope); membership monetisation strategy; email deliverability consulting beyond the platform's documented setup; historical archive clean-ups beyond the agreed import volume; ongoing content entry.
- **Client responsibilities:** platform account ownership and payment; staff list and permissions; legal pages and consent text; content.
- **Recurring implications:** the client keeps paying the platform. We hold no availability obligation.

### Package C — "Migration or remediation" (bounded, evidence-producing), fixed scope

- **Outcome sold:** an existing site moved to Astro or Ghost (bounded page count), or a bounded fix of performance/accessibility/security basics, with before/after evidence.
- **Included scope (bounded):** either (a) move up to N pages/posts with a redirect map and pre/post crawl evidence; or (b) a bounded remediation: Core Web Vitals and structural fixes, accessibility fixes against WCAG 2.2 AA criteria, dependency/security update with rollback plan, and a written findings list.
- **Explicit exclusions:** redesign, content rewriting, SEO ranking outcomes, paid-media setup, ongoing monitoring (that is care), anything requiring access the client cannot grant.
- **Client responsibilities:** current-site credentials/host access, backup of the old site taken by the client or on their behalf, DNS control, decision authority.
- **Acceptance evidence:** redirect map verified, pre/post Lighthouse and accessibility runs with recorded environment, screenshots, and a written rollover/rollback note.
- **Why it exists at launch:** remediation is the offer with the clearest "you already have the problem" trigger, and it produces before/after evidence we can lawfully publish (subject to client permission), unlike custom builds whose value is comparative rather than measurable.

**RECOMMENDATION:** Do not add a fourth "care plan", "hosting plan", or "SEO plan" package before Phase 9 pilots and the section 8 boundaries exist. Three packages plus a quoted custom path is the whole initial offer surface.

---

## 7. Maintenance and hosting responsibility boundaries

The purpose of this section is to make "hosting and maintenance where the responsibility and margin are commercially justified" (`README.md`) operational, and to prevent the failure mode where a small operator sells a recurring line whose obligations exceed the fee.

### 7.1 Default posture (RECOMMENDATION)

1. **Client owns the platform by default.** Domain, hosting account, CMS account, repository, analytics account, payment/Stripe account, and backups live in the client's name. We work inside them. This follows D-003 (isolation) and `AGENTS.md` (client ownership and portability).
2. **We sell responsibility only where it is written down.** A responsibility table (7.3) is attached to every care/hosting proposal; anything not in the "we" column is explicitly not ours.
3. **No availability guarantee without a passed-through SLA.** **FACT:** Ghost(Pro) publishes a 99.9% uptime SLA only on Custom [1]; Netlify and Vercel publish 99.99% SLAs only on Enterprise [8][9]. Therefore, below those tiers, any promise we publish can only be a *response-time* and *scope* promise, never an uptime promise.
4. **Greenfield hosting resale is deferred.** Until we have measured cost per site, we do not present ourselves as a hosting provider. We may hold a client's hosting *transiently* during a build, with a written handover at acceptance.

### 7.2 Self-hosting is a scope of work, not a line item — the cost lines that must be counted

**FACT (Ghost's own comparison) [2], retrieved 2026-09-22:**

| Line | Ghost(Pro) | Self-hosting |
|---|---|---|
| Base hosting | From $15/mo | From $10/mo |
| Global CDN & WAF | Included | From $20/mo |
| Email newsletter delivery | Included | From $15/mo |
| Analytics platform | Included | From $10/mo |
| Full site backups | Included | From $5/mo |
| Image editor | Included | From $12/mo |
| Install & setup | Included | Manual |
| Weekly updates | Included | Manual |
| Server maintenance & updates | Included | Manual |
| SSL certificate | Included | Manual |
| 24/7 on-call team | Included | Not available |
| Enterprise-grade security | Included | Not available |
| Ghost product support | Email | Forum |
| Direct SSH/DB access, modify core, custom edge routing | Not available | Available |

**FACT:** The same documentation states self-hosting requires the supported stack and at least 1 GB memory, and that staying up to date is critical on a public-facing server: "If you don't keep everything up to date, you place your site and your server at risk of numerous potential exploits and hacks" [2][3]. Ghost states that scaling is done by adding a CDN/cache in front; clustering or sharding is not supported [2].

**ESTIMATE:** The managed-vs-self-hosted delta above is roughly $57+/mo of *delegated* services plus manual labour; the VPS price alone ($4–$10) understates the obligation by an order of magnitude, and adds a personal availability expectation that the fee rarely covers.

**RECOMMENDATION:** Any future self-hosting offer must include, and be priced against, these lines explicitly: server provisioning and hardening, TLS issuance and renewal, weekly/monthly update cycle (Ghost, Node, MySQL, OS), backup verification with a periodic restore test, email deliverability/SPF/DKIM/SPF-DMARC configuration, CDN/cache/WAF, monitoring and alerting, incident response with a named responder, access management and revocation, and an offboarding path. Anything that cannot be staffed should be delegated to a managed provider instead (`AGENTS.md`).

### 7.3 Responsibility matrix (attach to every recurring proposal)

| Responsibility | Us | Client | Platform provider |
|---|---|---|---|
| Domain registration/renewal | — | Owns | Registrar |
| DNS records | Advises / changes on request | Owns account | DNS host |
| Hosting account & billing | — | Owns | Provides |
| TLS certificate | Verifies | Owns account | Issues (managed hosts) |
| Site content and its accuracy | — | Owns | — |
| Content edits within the paid block | Delivers | Requests, approves | — |
| Backups | Documents the procedure; verifies restores *if contracted* | Owns/retains | Automated on managed tiers [1] |
| Restore test | If contracted, quarterly, recorded | Requests | — |
| Dependency/framework updates | If contracted, on the agreed cadence | Nothing | — |
| CMS core updates | If contracted (self-hosted only; managed tiers are automatic weekly [1]) | — | Managed tiers |
| Uptime monitoring & alerting | If contracted, alerts only | — | — |
| Incident response | Best-effort, business hours, named response window | Reports incidents | Platform's own incident handling |
| Availability guarantee | **Not offered** below provider-SLA tiers [1][8][9] | — | Enterprise/Custom tiers only |
| Email/newsletter deliverability | Configuration within documented platform capability | Owns sending account | Platform + ESP |
| Form submissions and spam control | Implements validation/controls | Owns mailbox/endpoint | Form provider |
| Analytics and privacy configuration | Implements on request | Owns account, decides lawful basis | Analytics provider |
| Accessibility statement | Drafts from documented checks [23] | Publishes, owns claims | — |
| Data-protection role for site data | Processor where we act on the client's instructions; we sign a processor agreement | Controller | Sub-processor [20][21] |
| Security of client credentials | Least-privilege, separate dev/prod, revocable (`AGENTS.md`) | Owns accounts | — |
| Offboarding / portability | Documented handover; no lock-in | Owns assets | — |

### 7.4 Legal frame (to be verified jurisdiction-specifically in P4.4, not here)

- **FACT:** Regulation (EU) 2016/679 (GDPR) is in force [20] (retrieved 2026-09-22). **FACT:** EDPB Guidelines 07/2020 (final version published 2021-07-07) address the controller/processor concepts and state that processing by a processor must follow the controller's instructions and that a controller-processor relationship must be governed by a binding written contract [21] (retrieved 2026-09-22).
- **FACT:** Directive (EU) 2019/882 (European Accessibility Act) is in force and, per the European Commission's official page, covers listed products and services **including e-commerce services** [22] (retrieved 2026-09-22). WCAG 2.2 is a W3C Recommendation (12 December 2024) [23].
- **UNKNOWN / to verify in P4.4:** the directive's article-level scope, exemptions (notably any micro-enterprise carve-out for service obligations), transitional periods, and member-state transposition details were **not** re-read from a first-party legal source in this task (EUR-Lex article bodies were not retrievable from this workspace; see section 13). No claim about them is made here.
- **RECOMMENDATION:** Any recurring hosting/care obligation should be reviewed by a qualified professional for the operator's jurisdiction before it is sold (this is P4.4's remit), because hosting client sites is a processor role, not a neutral technical act.

---

## 8. Customer-acquisition channel shortlist

Ordered by fit for an operator with no portfolio yet at launch. Lead times are estimates; eligibility facts are cited.

| # | Channel | What it is | Evidence / status | Effort | Lead time | Verdict |
|---|---|---|---|---|---|---|
| C1 | **Own site as proof** (agency site built per Phase 7–8, with truthful labels) | The site sells the same craft it delivers; no fabricated case studies (`AGENTS.md`) | Project-defined | High (already planned) | Launch | **Must-have** |
| C2 | **Referrals from the first clients and from complements** (designers, copywriters, photographers, SEO freelancers, hosts) | Referral is the default channel for small studios; publish an explicit referral offer | ESTIMATE | Low | Immediate | **Must-have** |
| C3 | **Local/first-party search presence** via Google Business Profile and on-site SEO basics | Official Google Business Profile representation guidelines [18]; official SEO Starter Guide [19] | Medium | Weeks | **Do at launch** |
| C4 | **Ghost Forum → Marketplace category** | Ghost's own forum has a category to "Advertise or request commercial services for Ghost, like apps, jobs, premium themes, hosting or consulting" [13] | Low | Immediate | **Do at launch** |
| C5 | **Ghost Experts directory** | Official vetted directory with filters by service type and budget; application requires "demonstrable Ghost experience" [10] | Medium (need evidence) | After 1–2 real Ghost builds | **Apply after pilots** |
| C6 | **Astro Agency Partner program** | Official program; benefit includes a directory listing linked from every page of the Astro site, "qualified leads", and being "first choice for direct referrals from the Astro team"; hand-picked agencies with a demonstrated track record [11][12] | Medium–High | After 1–2 real Astro builds | **Apply after pilots** |
| C7 | **Content/technical writing** (guides, migration write-ups, accessibility/CWV teardowns) | Distribution via the two above ecosystems and search [19] | Medium | Months | **Start early, expect lag** |
| C8 | **White-label/subcontract capacity for other agencies** (M9) | Cash-flow bridge, no client-relationship work; price pressure | ESTIMATE | Low | Immediate | **Opportunistic** |
| C9 | **Outbound to in-market triggers** (platform lock-in, EAA-affected e-commerce, broken Core Web Vitals, expiring platform contracts) | Trigger-based outreach; measurable via remediation offer (Package C) | ESTIMATE / UNKNOWN | Medium–High | Weeks | **Test, measure, keep or cut** |

**RECOMMENDATION:** Launch with C1–C4 and C8; treat C5 and C6 as earned channels that require the P9 pilots as evidence, and C7 as compounding work started early; C9 only with a measured reply/win rate.

---

## 9. Services and offerings to defer

Deferral list (**RECOMMENDATION**), each with the reason and the governing reference:

1. Proprietary builder, multi-tenant hosting platform, custom CRM/client portal, generalised automation platform — D-001, `AGENTS.md` architectural constraints.
2. Workflow automation tooling (n8n/Make/Zapier) sold as a service before repeated work is observed — `PROJECT_STATUS.md` P11.4 ("evaluate only for observed repeated work").
3. Headless Ghost + Astro as a default or headline offer — D-004 requires written justification; the native-theme default also keeps membership, Portal, and newsletter behaviour intact.
4. Reselling hosting with a margin and an availability promise — section 7; no usable SLA below provider enterprise tiers [1][8][9].
5. Unlimited-edit retainers and "we handle everything" language — undefined obligation; contradicts the bounded care shape [17].
6. Marketing retainers: SEO retainers, paid media, ads, email marketing, social — outside the website remit and outcome-based; the published pattern keeps these as separate productised lines even when the studio can do them [16].
7. Copywriting, photography/video, logo and brand identity — explicitly excluded in observed public package scopes [16]; subcontracting is the option later.
8. E-commerce, booking, member-area, dashboard or application builds — outside static-first scope; represent a different delivery and support model.
9. Theme/template product line (M8) — build after the foundation exists; note that paid themes already sell at e.g. **$99** in Ghost's official marketplace [14], so this is a volume product, not an opening offer.
10. Mobile apps, headless commerce, custom integrations requiring ongoing API maintenance — unbounded obligation.
11. 24/7 support and emergency-response commitments — cannot be staffed by a small operator; Ghost's own docs position 24/7 on-call as a managed-host feature [2].
12. CMS/editor-plugin development and editor customisation promises — reject anything the platform does not document.

**Scope discipline (RECOMMENDATION):** every package ships with a written exclusions list, and every out-of-scope request becomes either a change order or a separate fixed-scope engagement.

---

## 10. Minimum viable business requirements

**RECOMMENDATION — the minimum set before selling (each item is a gate, not a nicety):**

1. **Legal and commercial readiness:** entity/tax/invoicing setup; standard terms; SOW/proposal template; change-request template; cancellation and refund policy; ownership/handover clause; processor agreement (DPA) template for work where we touch client personal data [20][21]; accessibility-statement template [23]; jurisdiction-specific legal/privacy/tax/accessibility review (P4.4).
2. **Commercial risk cover:** professional-indemnity/liability insurance decision — **UNKNOWN** (not researched in this task; must be resolved before production work).
3. **A truthful portfolio:** at least one completed pilot per offered package line with recorded actual time and cost (P9.5), plus the templates from P10 QC. No invented clients, testimonials, metrics, or case-study results (`AGENTS.md`).
4. **Delivery toolchain that does not lock clients in:** client-owned repository and hosting accounts; documented rollback; secrets handling that never exposes CMS/Admin keys to browser code (`AGENTS.md` security requirements).
5. **A quality gate that exists before the first paying build:** formatting/lint, type check, production build, Playwright for critical paths, automated accessibility plus recorded manual review, Lighthouse/CWV with recorded environment, broken-link/metadata/sitemap/structured-data checks, and `gscan` for any Ghost theme [24] (per `AGENTS.md` testing expectations).
6. **Written operational procedures:** dependency-update cadence, backup and restore-test procedure, rollback, access revocation, incident response — required by `AGENTS.md` security requirements before production.
7. **Cost visibility:** a live list of our own operating costs (own site, repo, email, tooling, insurance) and of client-paid platform costs (hosting/CMS plan), separated so that pass-through costs are never mistaken for margin. Client-side anchors from first-party pricing: Cloudflare Pages free tier covers static sites (500 builds/month) [6]; Netlify Personal $9/mo or Pro $20/mo [8]; Vercel Pro $20/mo [9]; Ghost(Pro) Starter $18/mo, Publisher $29/mo, Business $199/mo (yearly billing, per Ghost's page) [1] — all retrieved 2026-09-22 and all **volatile**.
8. **Capacity honesty:** a stated maximum of concurrent projects derived from measured pilot time (P9.5). Current value: **UNKNOWN**. Launching with an unmeasured capacity claim is how a small operator ends up delivering care plans instead of building.
9. **Channel readiness:** agency site live (C1), referral offer written (C2), Business Profile and on-site SEO basics (C3), Ghost Forum marketplace presence (C4).

---

## 11. Price-setting inputs (deliberately no final prices)

**FACT/ESTIMATE split:** no price is proposed here. Instead, the following inputs must be measured or decided before P4.1 sets any number:

- measured hours per package from the P9 pilots (per stage: discovery, design, build, content, QA, handover);
- non-productive time and revision rounds already committed in scope (one or two rounds, per the observed public pattern [15][16]);
- client-paid platform costs (hosting/CMS/ESP/forms/analytics) separated from our fees [1][6][8][9];
- our own operating floor (own site, tooling, email, insurance) — **UNKNOWN** until item 10.7 is populated;
- risk loading for the responsibility actually accepted (section 7): monitoring, restore tests, incident response, update cadence;
- payment structure: deposit plus milestones, with invoice cadence during the build (pattern: [15]);
- a "walk away" floor: the price below which the engagement does not fund the responsibility it creates (RECOMMENDATION: define explicitly, per package).

**Explicitly not used as a basis for pricing:** third-party and vendor-published price surveys of "what agencies charge". They were not re-verified first-party in this task, they mix WordPress work with custom-code work, and treating them as market rates would violate the project's evidence standard.

---

## 12. Assumptions, estimates, unknowns, and limitations

**Assumptions**
- A1: The operator is small (effectively one principal plus occasional help). Model ratings assume this; they change if capacity changes.
- A2: Target clients can own their platform accounts and pay platform fees directly. If a client refuses account ownership, the responsibility profile shifts to M5/M13 and the pricing model in section 11 changes.
- A3: Astro + Ghost remain the delivery stack; nothing in this document assumes additional frameworks (D-004, `AGENTS.md`).

**Estimates (this author's reasoning, no external source)**
- E1: Model ratings in section 4.
- E2: The self-hosted stack carries roughly $57+/mo of delegated service lines plus labour [2], before incident response and updates.
- E3: Channel effort/lead-time ordering in section 8.
- E4: Static hosting on the free tier makes a launch package's recurring obligation approximately zero (evidence: [6][7]) — but only while the client owns the account.

**UNKNOWNs to resolve before selling**
- U1: Insurance/liability cover requirements for the operator's jurisdiction.
- U2: Measured hours and true capacity per package (P9.5).
- U3: The European Accessibility Act's article-level scope, exemptions, and transposition specifics for our and our clients' jurisdictions (P4.4) — not established here (section 7.4).
- U4: Whether the target segments will pay for a package versus a quoted custom scope (segment evidence is P1.2's artifact; not cross-read here).
- U5: Whether directory channels (C5, C6) actually convert, versus only confer credibility.

**Limitations of this task**
- L1: `research/phase-1/competitors.md` was not present in the workspace during this task, and `segments.md` appeared only late in the run; the reconciliation in section 5.1 is a consistency check against one sibling artifact, not a joint analysis. Multi-model recommendations must still be reconciled with competitor evidence at P1.4.
- L2: No proof of concept was run: no CMS/hosting account was created, no theme was validated with `gscan`, no restore test was executed. All platform claims are documentation-backed [1]–[24].
- L3: Prices are point-in-time (2026-09-22) advertised figures and change; every commercial decision must re-retrieve them.
- L4: Four agency offering pages [14][15][16][17] are used as *public pattern* evidence only. They are single examples, not a sample; they are attributed, not generalised, and no competitor's private process or pricing is inferred.
- L5: EUR-Lex article bodies were not retrievable from this workspace (HTTP 202 with empty body on direct fetch), so the GDPR / EDPB / EAA claims in section 7.4 are limited to document existence, force, and page-level content that was actually read.
- L6: This document writes no prices, no dates for pricing approval, and no client-facing template text; those belong to P4.
- L7: The first automated extraction of the Ghost pricing page displayed Starter at **$18/mo** with a "Billed yearly" label [1], while Ghost's hosting comparison quoted "From **$15**/mo" [2]. A later live billing-toggle observation on 2026-09-22 (recorded in `docs/03-ghost.md` §9 and corrected in `docs/01-business.md`) showed **$15/mo billed yearly** and **$18/mo billed monthly** for Starter at the 1,000-member band. The automated label remains a reproducible rendering conflict, not the annual-billing basis for future quotes; re-retrieve and select billing frequency before use.

---

## 13. Sources

All URLs retrieved 2026-09-22 unless a different date is stated. Volatile prices/limits carry their retrieval date inline.

1. Ghost — Ghost(Pro) plans & pricing. https://ghost.org/pricing/ (initial extraction showed Starter $18/mo with a "Billed yearly" label; later live toggle at 1,000 members showed Starter $15/mo, Publisher $29/mo, Business $199/mo billed yearly, and Starter $18/mo billed monthly; Custom plan carries the 99.9% uptime SLA; custom themes and paid subscriptions unavailable on Starter; automated backups, SSL, worldwide CDN, weekly automatic updates; file-upload limits per tier.) — retrieved 2026-09-22.
2. Ghost — Hosting Ghost (Ghost(Pro) vs self-hosting comparison; supported self-hosting stack; hardening guidance; ActivityPub usage limits; "weekly updates/backups/security/performed for you" on Ghost(Pro)). https://docs.ghost.org/hosting — retrieved 2026-09-22.
3. Ghost — How to install Ghost on Ubuntu (server prerequisites, ≥1 GB memory, domain/DNS prerequisite, non-root user). https://docs.ghost.org/install/ubuntu — retrieved 2026-09-22.
4. Astro — Why Astro? (content-driven, server-first, zero JS by default, islands). https://docs.astro.build/en/concepts/why-astro/ — retrieved 2026-09-22.
5. Astro — repository license (MIT License, Copyright (c) 2021 Fred K. Schott). https://raw.githubusercontent.com/withastro/astro/main/LICENSE — retrieved 2026-09-22.
6. Cloudflare — Pages limits (builds per plan, 20,000 files free / 100,000 paid, 25 MiB per asset, 100 projects per account, 2,000 static + 100 dynamic redirects). https://developers.cloudflare.com/pages/platform/limits/ — retrieved 2026-09-22.
7. Cloudflare — Workers pricing (Workers Paid $5/mo account minimum, 10M requests and 30M CPU-ms included, $0.30 per additional million requests, $0.02 per additional million CPU-ms; "requests to static assets are free and unlimited"). https://developers.cloudflare.com/workers/platform/pricing/ — retrieved 2026-09-22.
8. Netlify — Pricing and Plans (Free $0/300 credits; Personal $9/1,000 credits; Pro $20/3,000 credits with unlimited members; 99.99% SLA on Enterprise; production deploy 15 credits ≈ $0.10, bandwidth 20 credits/GB ≈ $0.13/GB). https://www.netlify.com/pricing/ — retrieved 2026-09-22.
9. Vercel — Pricing (Hobby $0; Pro $20/mo including $20 of usage credit; 99.99% SLA on Enterprise; flat-rate CDN option). https://vercel.com/pricing — retrieved 2026-09-22.
10. Ghost — Hire a Ghost Expert (official directory, filters by service type and budget) https://ghost.org/experts ; Apply to become a Ghost Expert (vetted for "demonstrable Ghost experience") https://ghost.org/experts/apply — retrieved 2026-09-22.
11. Astro — Become an Astro Agency Partner (directory listing linked from every page of the Astro site, "qualified leads", first choice for direct referrals from the Astro team, co-marketing; hand-picked agencies with a demonstrated track record; the page states the Astro site receives over three million page views from 250k unique users monthly). https://astro.build/agencies/join — retrieved 2026-09-22.
12. Astro — Partner Agencies directory. https://astro.build/agencies — retrieved 2026-09-22.
13. Ghost Forum — Marketplace category ("Advertise or request commercial services for Ghost, like apps, jobs, premium themes, hosting or consulting"). https://forum.ghost.org/ — retrieved 2026-09-22.
14. Ghost — Theme marketplace https://ghost.org/themes/ and example paid theme (single-theme purchase at $99) https://ghost.org/themes/quiet/ — retrieved 2026-09-22. (Pattern evidence that themes are sold as products in the official marketplace; used only as one example.)
15. Magic Pages — Custom development for Ghost [public studio offering pattern: €2,500 package floor; custom theme €6,500 estimate over 3–4 weeks; publication build €15,000 estimate over ~2 months; €1,500 credited discovery; deposit then invoicing for hours actually spent; two revision rounds; repository owned by the client; explicit "what we'd talk you out of"; published platform limitations]. https://www.magicpages.co/custom-development/ — retrieved 2026-09-22. Attributed single example; not a market rate.
16. Dynamics Agency — Starter packages [public Astro package pattern: fixed-price starter website (up to 8 pages) with fixed inclusions, one round of design revisions, three months hosting included, an explicit "what the starter website does not include" list, published capacity of 1–2 projects per month, and no automatic renewal]. https://dynamics.agency/starter-packages/ — retrieved 2026-09-22. Attributed single example; not a market rate.
17. Kyln — Website care plan costs (UK) [public care-plan pattern: published plan tiers; care defined as six jobs — keep it up, keep copies, keep it patched, watch it, change it, answer; explicit statement that custom/Next.js maintenance is engineering work, not plugin updates; hosting/SSL/backups managed, platform bills passed through at cost; month-to-month with client-owned code, domain, and site]. https://kyln.digital/insights/website-care-plan-costs-uk — retrieved 2026-09-22. Attributed single example; not a market rate.
18. Google — Guidelines for representing your business on Google (Business Profile Help). https://support.google.com/business/answer/3038177 — retrieved 2026-09-22.
19. Google Search Central — Search Engine Optimization (SEO) Starter Guide. https://developers.google.com/search/docs/fundamentals/seo-starter-guide — retrieved 2026-09-22.
20. European Union — Regulation (EU) 2016/679 (General Data Protection Regulation), document in force. https://eur-lex.europa.eu/eli/reg/2016/679/oj — retrieved 2026-09-22.
21. European Data Protection Board — Guidelines 07/2020 on the concepts of controller and processor in the GDPR (final version, 07 July 2021; processor acts on the controller's instructions; processing must be governed by a binding written contract). Landing page: https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-072020-concepts-controller-and-processor-gdpr_en ; document: https://www.edpb.europa.eu/system/files/documents/2023-10/EDPB_guidelines_202007_controllerprocessor_final_en.pdf — retrieved 2026-09-22.
22. European Commission — European Accessibility Act (official page; scope includes listed products and services including e-commerce services). https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/european-accessibility-act-eaa_en — retrieved 2026-09-22.
23. W3C — Web Content Accessibility Guidelines (WCAG) 2.2, W3C Recommendation 12 December 2024 (Level A/AA/AAA structure). https://www.w3.org/TR/WCAG22/ — retrieved 2026-09-22.
24. Ghost — Themes (Handlebars theme layer; `gscan` validation, including automatic `gscan` checks on theme upload in Ghost admin). https://docs.ghost.org/themes/ — retrieved 2026-09-22.

---

## 14. Acceptance self-check (for the parent/reviewer)

| Acceptance criterion | Where satisfied |
|---|---|
| All requested business-model options evaluated | Section 3 (M1–M13) with section 4 matrix |
| Recommendations operable by a small business | Sections 5, 6, 7, 10 — bounded scope, exclusions, capacity honesty, no proprietary infrastructure |
| No final price presented as a market fact | Section 11 defers pricing to P4.1; third-party prices in [14]–[17] are labelled attributed single examples; platform prices labelled volatile point-in-time facts |
| Self-hosting treated as more than VPS cost | Section 7.2 with Ghost's own comparison table [2] plus labour/obligation lines |
| Deferred work includes premature platform/CRM/automation | Section 9 items 1 and 2 (plus headless, hosting resale, unlimited retainers, marketing outcomes) |
| Every sourced factual claim has a direct URL | Inline [n] citations mapped to section 13 |
