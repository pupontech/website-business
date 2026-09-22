# P1.2 — Customer segments: research and initial selection

- **Task:** P1.2 (Kanban `t_41165c2a`)
- **Status:** Phase 1 research artifact, input to P1.4 synthesis. Not an approved decision.
- **Author run:** `dsflash`, 2026-09-22.
- **Scope:** Candidate-segment comparison, source-grounded pain/opportunity notes, selection of exactly two initial segments, framework-to-benefit translation, acquisition hypotheses, evidence limitations.
- **Explicitly out of scope:** pricing, CMS selection, Ghost architecture details, competitor selection, legal advice. Those belong to P1.1, P1.3, P1.4, Phases 2–4.

## How to read this document

- Labels follow `AGENTS.md`: **FACT** (stated by the cited source), **ESTIMATE** (derived or third-party modelled number), **RECOMMENDATION** (this document's judgement), **ASSUMPTION** (unverified belief used for planning), **UNKNOWN** (no credible source retrieved).
- Inline numbered citations `[n]` map to the source list at the end. Every cited page was re-opened on 2026-09-22 and its content checked against the claim made here; where a source is a community thread, an agency blog, or stale, that is stated in-line.
- Anecdotes from forums are labelled **[community anecdote]** and are used only to form hypotheses. They are not evidence of market behaviour.

## 1. Method and selection criteria

Candidate segments were taken verbatim from the task brief: small businesses, photographers, creative professionals, consultants, professional services, independent publications/newsletter businesses, and WordPress migrations.

Criteria applied, in priority order:

1. **Urgent, funded problem.** Is the pain expensive or risky enough that the buyer acts, not merely agrees?
2. **Buying trigger clarity.** Is there an identifiable moment that starts a project (fee change, security incident, deadline, stalled pipeline, platform migration)?
3. **Fit with the actual content/business need.** Does the site genuinely need Astro's static-first output, or Ghost's publication/membership features — or is a builder adequate?
4. **Delivery repeatability.** Can the same bounded build be replayed with modest variation per client?
5. **Recurring, honest maintenance.** Is there real ongoing work that can be sold without manufacturing busywork?
6. **Reachable acquisition channels.** Can a two-to-three-person agency actually reach these buyers without a paid-media budget?
7. **Budget and decision simplicity.** Can one or two people decide and pay?
8. **Competition and substitution risk** (rated inversely — higher means *better* for us).

No market-size claim is made anywhere in this document. Counts of publications, photographers, or firms in any geography are **UNKNOWN** — no credible primary source was retrieved, and none is needed to make the selection below.

## 2. Segment evaluation matrix

Scale 1 (weak) to 5 (strong). "Frame fit" = does the customer's content/business need match Astro (static-first site) and/or Ghost (publication, newsletter, memberships).

| Candidate | Urgent problem | Trigger clarity | Frame fit (Astro/Ghost) | Repeatability | Recurring work | Channels reachable | Budget & simple decision | Low substitution risk | Read |
|---|---|---|---|---|---|---|---|---|---|
| **S1 Small businesses (general / local service)** | 4 | 3 | Astro 5 / Ghost 1 | 4 | 3 | 2 | 2 | 2 | High volume, low average value, DIY/AI builders and managed builders crowd the low end; sales efficiency is the binding constraint. |
| **S2 Photographers** | 3 | 3 | Astro 4 / Ghost 1 | 4 | 3 | 3 | 2 | 2 | Real pain (image performance, local search) but heavy free/cheap substitution (Adobe Portfolio bundled with Creative Cloud; Behance; gallery-platform sites). [12][13][14] |
| **S3 Creative professionals (designers, illustrators, small studios)** | 2 | 2 | Astro 4 / Ghost 1 | 4 | 2 | 3 | 2 | 2 | Peer-visible norm of having a site, but demand for *custom* portfolio builds is openly contested by practitioners and hiring managers. [14] |
| **S4 Consultants / coaches (solo)** | 3 | 3 | Astro 4 / Ghost 4 | 4 | 3 | 3 | 2 | 3 | Strong content/authority need, and a good Ghost fit when they already publish; weak build budgets, most are adequately served by DIY/AI builders. |
| **S5 Professional-services firms (accounting, legal, specialist advisory; 5–50 staff)** | 4 | 4 | Astro 5 / Ghost 3 | 4 | 4 | 4 | 4 | 4 | Site's job is a credibility check run by a referred prospect; decayed WordPress sites actively undermine it; higher value per engagement, referral-driven. [15][16][20] |
| **S6 Independent publications / newsletter businesses** | 5 | 5 | Astro 3 / Ghost 5 | 4 | 4 | 4 | 3 | 4 | Quantified, recurring economic pain (platform take rate), an official migration path, native Ghost feature fit, and a design/upgrade need every few years. [2][3][17] |
| **S7 WordPress migrations** *(candidate as listed)* | — | — | — | — | — | — | — | — | **Not a segment.** It is a buying trigger/wedge that spans S1, S5 and (partly) S6. Rated separately in §3.7 and deliberately not selected as one of the two segments. |

**Selection view (RECOMMENDATION):** S6 and S5 are the two initial segments. S1 and S2 are the strongest deferred candidates.

## 3. Evidence-backed pain and opportunity notes

### 3.1 S1 — Small businesses (general / local service)

- **FACT:** 71% of US small businesses have a website (source: a 2024 Top Design Firms survey, quoted by Reapify, an agency that sells website audits — commercial interest, secondary). More than half of those sites have not been updated in over two years, and the typical spend is $2,000–$10,000, almost all of it on the initial build, with "zero budget" for maintenance, security patches and performance. [15]
- **FACT:** Managed builders are the default substitute and are cheap: Squarespace's listed plans on 2026-09-22 (EUR, annual billing) were Basic €12, Core €18, Plus €32, Advanced €69 per month, with a free custom domain in year one and a 14-day trial. [11]
- **ESTIMATE (third-party, agency-authored):** only 42% of mobile sites passed all three Core Web Vitals in 2026 (the agency cites the 2025 Web Almanac), and 53% of mobile visitors abandon after a three-second load (the agency cites Google). [16]
- **Opportunity:** the volume of under-maintained sites is real, and the maintenance gap is the strongest part of the story.
- **Why not selected now (RECOMMENDATION):** average engagement value is low relative to sales effort, the buyer compares against a €12–€32/month subscription and free AI builders, and the same source that documents the opportunity concedes that the hard part is "sorting the businesses that need help and know it from the ones that need help and will never act" [15]. Revisit after the maintenance offer and delivery economics are proven in Phases 4 and 9.

### 3.2 S2 — Photographers

- **FACT:** Photographers on managed builders are being asked to pay recurring subscriptions for simple sites; a photographer in the `r/squarespace` thread describes a portfolio + contact form + blog at $33/month and asks what to switch to. **[community anecdote]** Notably, another commenter disputes the figure, writing that "there's not even a Squarespace plan that costs $33/month" [12] — a useful reminder that community price claims are unreliable.
- **FACT:** In an `r/photography` thread, one photographer reports "WordPress gave me more control, but I lost two weekends tweaking plugins instead of editing photos", and a commenter summarises the pattern as "you end up maintaining a site instead of shooting". Another commenter reports self-hosting a static site with Astro on object storage plus CDN for near-zero cost. **[community anecdotes, single thread]** [13]
- **FACT:** Squarespace's listed prices as captured are €12–€69/month by tier [11]; several third-party write-ups report 2026 price increases and plan restructuring, but those specific increases were **not verified at the source** and are treated as ESTIMATE/UNVERIFIED.
- **Opportunity:** image-heavy performance and local/venue search are genuine technical differentiators, and platform price changes create switching windows.
- **Why not selected now (RECOMMENDATION):** the segment's documented pain is about *cost and maintenance time*, not about budget availability. Substitutes are free or bundled (Adobe Portfolio ships with Creative Cloud; gallery platforms bundle hosting, proofing and sales) [14], average project value is low, and one-off portfolio sites generate little honest recurring work. **UNKNOWN:** willingness to pay for a bespoke build rather than a €12/month builder or a bundled gallery platform.

### 3.3 S3 — Creative professionals (designers, illustrators, small studios)

- **FACT:** In an `r/Design` thread asking whether a personal portfolio site is still worth building in 2026, a creative director says he would not hire a designer without one, while others report using Google Slides decks because it is "100x faster", and one commenter highlights platform-pivot risk: "If any of them pivot (e.g. Dribbble) you are at their whim." **[community anecdotes]** [14]
- **FACT:** Upwork's 2026 skills report (data covering freelancer earnings and completed jobs from 1 Jan–31 Dec 2025, reported by Staffing Industry Analysts) lists graphic design first and brand identity design tenth among the most in-demand design and creative skills — demand exists, but it is for services the buyer sells, not necessarily for their own site. [19]
- **Why not selected now (RECOMMENDATION):** portfolio builds for this group are a notoriously contested purchase, decision budgets are personal rather than business, and the "own your domain" argument is cultural rather than commercial. Keep as a low-priority inbound channel rather than an outbound target.

### 3.4 S4 — Consultants / coaches (solo)

- **RECOMMENDATION (inferred, not sourced):** the strongest sub-case (a consultant who already publishes regularly and wants an owned audience and paid tiers) is in practice Segment 6's use case with a different job title; the rest are adequately served by DIY builders. Solitary consultants were not researched in depth because they did not survive the first pass of §1 criteria 1 (urgent, funded problem) and 7 (budget and decision simplicity). Treat solo consultants as a **sub-case of S6 when they publish**, and as inbound-only otherwise.

### 3.5 S5 — Professional-services firms (accounting, legal, specialist advisory) — **SELECTED**

- **FACT:** In a 2025 survey of 350 US businesses with $1M–$100M revenue, 57% found their accountant through peer referral and 3% through advertising; 98% of businesses that left a specialist firm moved to another specialist. (Primary survey: TaxDome 2025 Niche Business Accounting Report, reported via CPA Practice Advisor; here quoted from a secondary agency blog, DiverseKit, which cites both.) [20]
- **FACT (same source, ESTIMATE-grade):** among businesses paying $10K+/year, 83% say a firm's use of technology is a key factor in the choice — which makes a dated site a direct commercial liability. [20]
- **FACT:** More than half of small business websites have not been updated in over two years, and maintenance/security work gets "zero budget" after launch [15]; the professional-services analysis reaches the same conclusion from the buyer's side, framing a dated site as answering the technology question badly "before anyone reads a word". [20]
- **FACT:** WordPress is the incumbent platform they are likely on — used by 40.2% of all websites and 58.8% of sites with a known CMS (values captured 2026-09-22; W3Techs updates daily). [1]
- **FACT:** The WordPress ecosystem carries a documented maintenance cost: Patchstack counted 11,334 new vulnerabilities in 2025 (a 42% increase on 2024), 91% of them in plugins and 9% in themes, with only 6 in core; 1,966 (17%) were rated high severity, and highly exploitable vulnerabilities grew 113% year on year. In the same whitepaper's large-scale pentest of popular hosting companies, only 26% of vulnerability attacks were blocked. It also states that from 2026 every commercial WordPress plugin serving European users must operate a vulnerability disclosure programme under law. [6] **ESTIMATE:** the maintenance burden that follows from this falls on whoever maintains the site — in a small firm, usually nobody.
- **FACT:** Performance work on lead-generation sites has documented commercial effect (Vodafone Italy: 31% better LCP → 8% more sales; iCook: 15% better CLS → 10% more ad revenue; Tokopedia: 55% better LCP → 23% better average session duration). **This page was last updated 2021-09-01** and predates INP; treat as directional, not current magnitude. [7]
- **ESTIMATE:** only 55.6% of 18,294,881 origins in the August 2026 CrUX release had good Core Web Vitals, so a random firm's existing site is more likely than not to have field-measurable problems. [18]
- **Accessibility context (must not be overclaimed):** US digital accessibility litigation is on pace for roughly 6,000 suits in 2026 (up 20–25% on 2025), but about 80% of those involve e-commerce, 10 plaintiff firms account for ~84% of filings, and ~20% of companies sued had an accessibility widget installed — i.e. overlays are not a shield. [8] In the EU, Directive (EU) 2019/882 applies from 28 June 2025 to specified service categories (e-commerce, consumer banking, e-books, electronic communications, elements of transport) and excludes microenterprises providing services. [9] WCAG 2.2 is a W3C Recommendation (2024-12-12). [10]
- **Business need → framework fit:** a firm's site is mostly static service, people, proof and insight pages, read by a referred prospect deciding whether to call [20]. That is exactly Astro's shape (server-rendered HTML, no client-side framework, islands only where interaction is needed) [5], and the editing need is limited to insights/team/service updates — a light CMS question for Phase 2, not a heavy publishing platform.
- **Counterarguments:** sales cycles are long and risk-averse; many firms are satisfied by WordPress plus a maintenance retainer, so the substitution risk is real; the buyer is reached through referral sources rather than the firms themselves [20]; migration without a redirect plan is the classic way to lose organic traffic permanently [16]; and "accessibility law protects you" is a marketing claim that would misstate both the US litigation pattern [8] and the EAA scope [9].

### 3.6 S6 — Independent publications / newsletter businesses — **SELECTED**

- **FACT:** Substack takes 10% of paid subscription revenue in perpetuity, which with card processing is about 13% of every dollar, and it does not phase out at scale; the same trade coverage documents named publications and writers moving to Ghost and beehiiv for flat fees. (WebProNews, citing its own reporting and linking The Verge; trade press, secondary but specific and dated 2026-05-10.) [17]
- **FACT:** Ghost is built by a non-profit foundation and publishes live metrics: 30,579 active customers, 2.92% net churn, $11.1M annual run rate, 100M+ installs (live counters captured 2026-09-22; counts move). [4]
- **FACT:** Ghost(Pro) pricing captured 2026-09-22 (annual billing): Starter $18/mo (1 staff user, 1 newsletter, 1,000 members, **no** paid subscriptions, **no** custom themes); Publisher $29/mo (3 staff users, custom themes, 8,000+ integrations, paid subscriptions, advanced analytics, 0% transaction fees); Business $199/mo (15 staff users, priority support); Custom at 99.9% uptime SLA. All plans include the managed platform: automatic weekly updates, worldwide CDN, automated backups, free SSL; custom SSL and custom subdirectory installs are Business add-ons at $50/mo each. [2]
- **FACT:** Ghost ships a built-in Substack migrator that imports posts, free subscribers and paid subscribers, and paid continuity works by connecting the same Stripe account; Ghost documents the required redirect for Substack's `/p/` post URLs. Ghost's own migration page still notes that Substack continues to charge 10% on existing paid subscriptions after the move, and that Ghost's migrations team supports larger moves for Ghost(Pro) customers. [3]
- **FACT:** The pain is quantifiable in the buyer's own numbers: at $10/month across 10,000 subscribers, roughly $15,900/month goes to the platform and processors; at 50,000 subscribers, more than $79,000/month. [17]
- **Business need → framework fit:** this buyer needs a website, an email newsletter, paid tiers, a sign-in/subscription experience and SEO — all native Ghost behaviours (themes, Portal, memberships, newsletters, custom sending domain from Publisher up) [2][3] — with design and structure as the differentiator, not a custom application. Astro remains relevant for their adjacent marketing site or for later work.
- **Counterarguments:** Substack's discovery network is genuinely valuable — the trade coverage quotes Substack's position that internal recommendations and Notes drive half of all new subscriptions, and documents that some writers moved to beehiiv or Patreon instead of Ghost, in one case explicitly for hands-on migration help. [17] Ghost's floor for the outcomes we sell is Publisher at $29/mo, not Starter [2], so the client's total cost must be presented honestly. Cheap configured themes and low-cost DIY migrations are real substitutes (the vendors selling them were reviewed only at search-result level during this task and are therefore not cited), so the sellable work is migration, information architecture, membership/newsletter setup, SEO/redirect discipline, performance and ongoing care — not "a theme".

### 3.7 S7 — WordPress migrations (considered as listed)

- **RECOMMENDATION:** WordPress migration is not a customer segment; it is a **trigger and delivery wedge** that applies to S5 (and S6/S2 secondarily). Keeping it out of the selected two is deliberate: it describes *how* work starts, not *who* buys it, and treating it as a segment would blur positioning, pricing and the maintenance offer.
- It is nevertheless central to the S5 thesis: WordPress's share is still dominant [1] while its ecosystem's maintenance load is documented at scale [6], performance failure is field-measurable on most sites [7][18], and the migration itself carries a known failure mode — skipping a 301 redirect plan — that can cost a client their organic traffic permanently [16].
- Migrations must therefore be sold with redirect mapping, URL parity checks and post-launch verification as first-class deliverables, not as an implementation detail.

## 4. Selected initial segments

**Exactly two segments are recommended for the first cohort.**

### Segment A — Independent publications and newsletter businesses (Ghost-led)

**Qualifying criteria:** publishes on a regular cadence; owns its email list; currently on Substack, beehiiv, WordPress or a hand-rolled stack; monetising or with a stated plan to; 1–3 people; willing to own its hosting and Stripe relationship.

**Why (RECOMMENDATION, grounded in [2][3][4][17]):** a recurring, quantifiable cost problem the buyer already understands; a documented, official migration path with Stripe continuity and redirects; a native product match for the actual need (site + newsletter + paid memberships + SEO); bounded recurring maintenance that the client can fund from subscription revenue; and a buyer who is reachable directly and publicly.

**Counterarguments:** the incumbent platform's discovery network is a real benefit the buyer gives up [17]; our cheapest credible Ghost configuration is Publisher at $29/mo, not Starter [2]; cheap themes and DIY migrations undercut a bespoke build; and willingness to pay for a bespoke build versus a configured premium theme is **UNKNOWN**.

**Kill criteria:** if, after ten scoped conversations, fewer than two buyers accept a paid migration/design engagement at a price that covers delivery plus review, this segment is not commercially viable for a first cohort.

### Segment B — Professional-services firms on legacy WordPress (Astro-led, migration as the entry wedge)

**Qualifying criteria:** accounting/tax, legal, or specialist B2B advisory; roughly 5–50 staff; an existing WordPress or builder site that is 5+ years old or visibly unmaintained; a referral-driven pipeline; services/people/insights content that needs editing; one or two decision-makers.

**Why (RECOMMENDATION, grounded in [1][5][6][7][15][16][18][20]):** the website's real job — a credibility check performed by an already-referred prospect — is measurable and currently failing on many such sites; the incumbent platform is dominant [1] and carries a documented maintenance and security load [6]; performance problems are field-measurable and commercially material [7][18]; Astro's static-first model matches a mostly-static trust site with light editing [5]; and the engagements support genuinely recurring work (hosting/DNS, backups, content updates, performance and accessibility regression checks) rather than manufactured retainers.

**Counterarguments:** long, referral-mediated sales cycles; strong substitution by "WordPress + maintenance retainer"; overclaiming on accessibility and security would be both wrong and commercially fragile [8][9]; scope creep into practice-management/CRM tooling must be excluded; migration performed without redirect discipline destroys value [16].

**Kill criteria:** if fewer than two of ten audited firms accept a paid, scoped migration or rebuild at a price that covers delivery plus review, re-scope toward the deferred S1/S2 cohorts before investing further in this vertical.

### Deferred, with reason

| Candidate | Disposition | Reason |
|---|---|---|
| S1 Small businesses | Second wave | Real maintenance gap but low value per engagement and crowded substitution [11][15]. |
| S2 Photographers | Second wave / inbound | Cost-and-time pain, not budget; free or bundled substitutes [12][13][14]. |
| S3 Creative professionals | Inbound only | Contested purchase decision, personal budgets [14]. |
| S4 Consultants (solo) | Sub-case of Segment A when they publish; inbound otherwise | Their real need is an owned audience, which is Segment A's use case. |
| S7 WordPress migrations | Cross-cutting wedge, not a segment | Describes how work starts, not who buys [1][6][16]. |

## 5. Framework-to-benefit translation

Customer-facing language. Each row ties a verified technical fact to a business outcome. Anything not yet proven in a project is marked.

| Technical fact (source) | What it does mechanically | Customer-facing benefit | Status |
|---|---|---|---|
| Astro renders components to HTML & CSS and strips client-side JavaScript unless a `client:*` directive opts in [5] | Less JavaScript to download, parse and execute | "Pages open quickly on the phone in a customer's hand — fewer people leave before they read anything" | FACT (framework behaviour); magnitude on any client site is measured per project |
| Islands hydrate independently, so one slow component does not block the page [5] | Interaction is scoped to the widget that needs it | "The one interactive bit loads on its own; the rest of the page is already there" | FACT |
| Static output is pre-built at deploy time, so the public host serves files rather than querying a database per request [architecture principle; execution to be proven in P2/P5] | No application runtime/database on the public host | "Your site doesn't depend on a server that needs patching, and it doesn't slow down when it's busy" | ESTIMATE until a POC is measured (Phase 2/5) |
| WordPress ecosystem: 11,334 vulnerabilities in 2025, 91% in plugins, only 26% of attacks blocked in host pentests [6] | Fewer moving parts to keep updated and a much smaller attack surface | "There's no plugin stack to update every week, and no plugin of ours that can take the site down" | FACT (ecosystem data); the client-side claim is our design intent, **not** a security guarantee — forms, DNS, CDN and third parties remain |
| TypeScript and component-based templates (`AGENTS.md` requirement) [5] | Repeatable, typed patterns across projects | "Changes later are small, predictable jobs instead of rebuilds" | RECOMMENDATION |
| Ghost themes + Portal + memberships + newsletters [2][3] | Sign-up, paid tiers, paywalls, magic-link sign-in and sending are product features | "You turn on paid subscriptions and tiered access without anyone building a payments system" | FACT |
| Ghost keeps 0% of subscription revenue; Substack takes 10% in perpetuity (~13% with processing) [2][17] | Subscription revenue stays with the publisher | "You stop paying a permanent tax on your own list" | FACT; the break-even point belongs to P4 pricing |
| Ghost has a built-in Substack import and documents Substack→Ghost redirects; paid tiers continue via the same Stripe account [3] | Posts, free and paid members move with the payer relationship intact | "Your archive and your paying readers come with you, and old links keep working" | FACT |
| Ghost(Pro) includes automatic weekly updates, automated backups, CDN and free SSL on every plan; custom SSL/subdirectory are Business add-ons [2] | Operational hygiene is the platform's job, not the client's | "Nobody has to remember update nights or back up the site" | FACT (plan inclusions); verification plan belongs to P3/P5 |
| WCAG 2.2 as the build baseline plus documented manual keyboard/screen-reader checks [10]; EU service-category duties from 28 June 2025 with a microenterprise exclusion [9] | Semantics, focus order, labels, contrast and error handling designed in, not retrofitted | "More of your customers can actually use the site — and you're not the obvious target for an accessibility complaint" | RECOMMENDATION; legal characterisation must stay jurisdiction-specific and never be sold as blanket protection [8][9] |

## 6. Acquisition hypotheses

Each hypothesis is a bounded, falsifiable first experiment. Community channels are treated as places to listen, not as proof of demand.

### Segment A — Independent publications

| # | Channel | Why it is reachable | First experiment | Falsified if |
|---|---|---|---|---|
| A1 | Migration-intent content and search | Substack→Ghost migration is a specific, researched decision with an official path [3]; trade coverage shows a live wave of moves [17] | Publish one deeply factual migration guide (cost comparison, Stripe continuity, redirect handling, what does *not* transfer), with no fabricated case studies | No qualified enquiries within 90 days of publication |
| A2 | Direct, cited outreach | Publications that publish publicly their pricing, platform and design age are identifiable | Send 25 factual audits (performance, mobile, newsletter setup, cost maths) and offer a paid, scoped migration | Fewer than 2 of 25 reply with a scoped conversation |
| A3 | Ghost-ecosystem adjacency | Ghost's own platform provides the migration tooling, recommendations network and a migrations team for Ghost(Pro) customers [2][3][4] | Apply to and be listed in relevant official/partner directories; offer implementation capacity | No directory- or partner-sourced conversations in 6 months |
| A4 | Referral from delivered work | Publishers talk to each other; one satisfied publisher is a named reference | After the first two projects, ask each client for two named introductions | No introductions in 3 months after delivery |
| A5 | Upwork/marketplace as a messaging and pricing probe | Web design is #2 and CMS development #10 in Upwork's most in-demand coding/web skills for 2026 [19] | Run a limited, well-scoped listing to test scope wording and price anchoring | Only price-shopping enquiries at below-floor rates |

### Segment B — Professional-services firms

| # | Channel | Why it is reachable | First experiment | Falsified if |
|---|---|---|---|---|
| B1 | Referral-source partnerships | Buyers select firms through referrals (57% referral vs 3% advertising) [20], so the agency should be visible to the people who *make* referrals | Approach 10 bookkeepers, brokers, IT providers and lawyers with a "second opinion" site audit for their referrals | No partner forwards a referral in 6 months |
| B2 | Evidence-led outreach using field data | Performance failure is objectively measurable per site via public field data [7][18] | Audit 25 firms showing decay signals (slow mobile field data, no HTTPS, 2022-era content, plugin-era stack) and send a two-page factual report | Fewer than 2 of 25 request a scoping call |
| B3 | Vertical-specific authority content | The buyer's decision is a niche-fit check, and specialist positioning reportedly wins referral checks [20] | Publish one vertical page ("what a referred prospect needs to see on a boutique accounting firm's site") with cited sources and no invented client examples | No enquiries attributed to the page in 90 days |
| B4 | Migration-discipline positioning | Redirect handling is the known failure mode [16]; competitors rarely publish redirect/verification commitments | Offer a fixed-scope "migration safety audit" (URL inventory, redirect map, before/after verification report) | No paid audits sold after 5 proposals |
| B5 | Local professional networks | Referral-driven buyers meet peers in structured business networks | Join one network, attend three sessions, measure introductions rather than attendance | No qualified introduction after three sessions |

## 7. Assumptions and unknowns recorded

- **ASSUMPTION:** both selected segments will pay for a bespoke build rather than a configured premium theme or a template-based builder. Unproven; kill criteria in §4 exist to test it cheaply.
- **ASSUMPTION:** migration intent converts to paid projects at a workable rate. `[17]` documents movement between platforms, not the size or accessibility of the service market.
- **UNKNOWN:** market size for either segment in any geography. No credible primary source retrieved; none is claimed.
- **UNKNOWN:** whether recurring maintenance can be priced sustainably per segment — explicitly deferred to P4.
- **UNKNOWN:** the first customers' language/RTL and jurisdiction needs, which affect delivery model and accessibility obligations. Deferred to P7.1.
- **UNKNOWN (technical, deferred):** the client-facing editing, permissions and export experience of the CMS chosen for Segment B. `DECISIONS.md` D-005 forbids a universal CMS decision before scenario testing; this document does not pre-empt Phase 2, and D-004 keeps native Ghost themes as the default for Segment A.

## 8. Evidence limitations

1. **Retrieval date.** All pages were opened on 2026-09-22. W3Techs updates daily [1] and Ghost's about-page metrics are a live counter [4]; Squarespace prices vary by currency/locale and were captured in EUR via the EU storefront [11]. Re-check before any customer-facing use.
2. **Stale evidence.** The web.dev business-impact page states "Last updated 2021-09-01" and references FID rather than INP [7]. Its case studies remain Google's own first-party documentation, but the magnitudes should not be quoted as current.
3. **Vendor and agency sources with commercial interest.** Reapify (sells site audits) [15], Untapweb (sells subscriptions) [16], DiverseKit (sells templates) [20], the Ghost theme blog and migration listicles seen during research all have an interest in the conclusion drawn. They are used here for leads, framing and secondary quotation of named primary studies, and are labelled as such. Where a claim could only be sourced to such a page, it was downgraded to ESTIMATE or dropped.
4. **Community anecdotes.** The Reddit threads [12][13][14] are single-thread community anecdotes. One exists entirely to promote an article, and a commenter disputes its central price claim [12]. They are hypothesis generators only.
5. **Third-party pricing claims not verified at source.** Reports of 2026 Squarespace increases, Ghost custom-theme market rates, and WordPress maintenance retainer bands were seen in search results but **were not verified against the vendor's own page**; only Squarespace's own listed prices [11] and Ghost's own pricing page [2] are treated as fact.
6. **A documented first-party/third-party conflict.** Trade press written in May 2026 says Ghost "starts at $15/mo" [17]; Ghost's own page on 2026-09-22 says Starter is $18/mo billed yearly [2]. This is exactly why first-party pricing wins and why the P1.4 synthesis must cite Ghost's page, not the article.
7. **Accessibility claims are narrow.** US litigation concentrates on e-commerce [8]; the EU directive is category-based with a microenterprise exemption and a disproportionate-burden provision [9]; WCAG 2.2 is a voluntary W3C Recommendation [10]. Do not sell "ADA compliance".
8. **No proof of delivery.** Nothing here proves a CMS workflow, migration, permission model or performance outcome. Those are Phase 2, 3 and 9 obligations under `AGENTS.md` ("A proof of concept is complete only when the named operation was actually exercised").
9. **Scope boundary.** This artifact recommends segments. It does not set prices, package names, or service promises.

## 9. Sources

All URLs retrieved and re-opened 2026-09-22 (UTC). Volatile figures noted in-line.

1. W3Techs — Usage statistics and market shares of content management systems (September 2026 survey; WordPress 40.2% of all websites / 58.8% of known-CMS sites; "None" 31.5%; Shopify 5.4%; Wix 4.2%; Squarespace 2.4%). https://w3techs.com/technologies/overview/content_management
2. Ghost — Ghost(Pro) plans & pricing (Starter $18/mo, Publisher $29/mo, Business $199/mo annual; custom themes and paid subscriptions from Publisher; 0% transaction fees; automatic weekly updates, CDN, backups, free SSL; custom SSL/subdirectory +$50/mo on Business). https://ghost.org/pricing/
3. Ghost Developer Docs — Migrating from Substack (built-in migrator; free and paid subscriber CSVs; same Stripe account required for paid continuity; Substack continues to take 10% on existing paid subscriptions; `/p/` redirect guidance; Ghost migrations team for large moves). https://docs.ghost.org/migration/substack
4. Ghost — About ("non-profit organisation"; live metrics captured 2026-09-22: 30,579 active customers, 2.92% net churn, $11.1M annual run rate, 100M+ installs). https://ghost.org/about/
5. Astro Docs — Islands architecture (HTML/CSS by default, client-side JavaScript stripped unless opted in; `client:*` hydration directives; islands run independently). https://docs.astro.build/en/concepts/islands/
6. Patchstack — State of WordPress Security in 2026 whitepaper (11,334 new vulnerabilities in 2025, +42% YoY; 91% plugins / 9% themes / 6 core; 1,966 = 17% high severity; highly exploitable +113% YoY; 26% of attacks blocked in host pentest; 2026 EU vulnerability-disclosure-programme requirement for commercial plugins). https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/
7. Google web.dev — The business impact of Core Web Vitals (Vodafone Italy +8% sales; iCook +10% ad revenue; Tokopedia +23% session duration; Redbus conversion and ranking uplift). Page marked "Last updated 2021-09-01". https://web.dev/case-studies/vitals-business-impact
8. UsableNet — Digital Accessibility Lawsuits in 2026: Five Trends Companies Should Know (~6,000 lawsuits on pace for 2026, +20–25% on 2025; 10 firms = ~84% of filings; ~80% e-commerce; ~20% of defendants had an accessibility widget). https://blog.usablenet.com/digital-accessibility-lawsuits-in-2026-five-trends-companies-should-know
9. EUR-Lex — Directive (EU) 2019/882 (European Accessibility Act), official text: https://eur-lex.europa.eu/eli/dir/2019/882/oj — and the European Union's own summary "Accessibility of products and services" (applies from 28 June 2025; in-scope services include e-commerce, consumer banking, e-books, electronic communications, transport elements; microenterprises providing services excluded; disproportionate-burden provision): https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=LEGISSUM:4403933
10. W3C — Web Content Accessibility Guidelines (WCAG) 2.2, W3C Recommendation, 2024-12-12. https://www.w3.org/TR/WCAG22/
11. Squarespace — Pricing page, captured via browser in the EUR storefront on 2026-09-22, annual billing: Basic €12/mo, Core €18/mo, Plus €32/mo, Advanced €69/mo; free custom domain in year one; 14-day free trial. Prices vary by locale; re-check before quoting. https://www.squarespace.com/pricing
12. Reddit `r/squarespace` — "$33/month for a basic business site feels insane in 2026. what are people switching to?" **[community anecdote; the $33 figure is disputed in-thread]**. https://www.reddit.com/r/squarespace/comments/1rsjg0r/33month_for_a_basic_business_site_feels_insane_in/
13. Reddit `r/photography` — "What's the best website builder for photographers right now?" **[community anecdotes: plugin-tweaking weekends, WordPress maintenance complaints, one static-hosting/Astro self-build]**. https://www.reddit.com/r/photography/comments/1rkpwoe/whats_the_best_website_builder_for_photographers/
14. Reddit `r/Design` — "Is building a personal portfolio site still worth it for designers in 2026?" **[community anecdotes: hiring-manager expectations, Google Slides portfolios, platform-pivot risk]**. https://www.reddit.com/r/Design/comments/1sve82g/is_building_a_personal_portfolio_site_still_worth/
15. Reapify — The State of Small Business Websites in 2026 (agency analysis; 71% of US small businesses have a website, citing a 2024 Top Design Firms survey; >half of sites not updated in 2+ years; $2,000–$10,000 typical spend citing Clutch; maintenance under-funded). Secondary, commercial interest. https://reapify.io/blog/state-of-small-business-websites-2026
16. Untapweb — Small Business Website Redesign (agency content; 42% of mobile sites passing all three Core Web Vitals in 2026 "per 2025 Web Almanac"; 53% of mobile visitors abandoning past 3 seconds "per Google"; 301-redirect failure as the most common traffic-loss cause; their own subscription alternative at $249/mo). Secondary, commercial interest; cited figures are the agency's, not first-party. https://untapweb.com/blog/small-business-website-redesign
17. WebProNews (2026-05-10) — The Substack Tax Drives Writers to Beehiiv and Ghost (10% take in perpetuity, ~13% with processing; named publications/writers moving platforms; Substack's position that the network drives half of new subscriptions; Ghost "starts at $15/mo" — stale, superseded by [2]). Trade press, secondary. https://www.webpronews.com/the-substack-tax-drives-writers-to-beehiiv-and-ghost/
18. ppc.land — Explaining CrUX (August 2026 CrUX release published 2026-09-08: 18,294,881 origins, 55.6% with good Core Web Vitals; CrUX informs the page experience ranking factor per Google documentation; page-experience rollout history). Secondary, but specific and dated. https://ppc.land/crux/
19. Staffing Industry Analysts (2026-02-04) — Fastest-growing work categories include coding and web development, reporting Upwork's 2026 most-in-demand skills lists (web design #2, CMS development #10 in coding and web development; data from freelancer earnings and completed jobs 1 Jan–31 Dec 2025). Trade press reporting a first-party platform report. https://www.staffingindustry.com/news/global-daily-news/fastest-growing-work-categories-include-coding-and-web-development
20. DiverseKit (2026-08-17) — Accounting Firm Website Design (quotes TaxDome's 2025 Niche Business Accounting Report, 350 US businesses with $1M–$100M revenue, as reported by CPA Practice Advisor, 2025-08-19: 57% found their accountant by peer referral; 3% by advertising; 98% who left a specialist moved to another specialist; 83% of businesses paying $10K+ say technology use is a key factor). Secondary agency blog citing named primary survey; the underlying survey itself was not read. https://diversekit.com/blog/accounting-firm-website-design

## 10. Self-check against P1.2 acceptance criteria

| Requirement | Status |
|---|---|
| All listed candidate segments considered | Yes — §2 matrix covers all seven; §3 gives evidence notes; §4 dispositions each. |
| Exactly two initial segments recommended | Yes — Segment A (independent publications/newsletters) and Segment B (professional-services firms on legacy WordPress). |
| Evidence distinguished from assumptions | Yes — FACT/ESTIMATE/RECOMMENDATION/ASSUMPTION/UNKNOWN labels and §7. |
| No unsupported market-size claim | Yes — no counts or market sizes asserted; §7 records market size as UNKNOWN. |
| Astro/Ghost fit tied to actual content/business needs | Yes — §3.5/§3.6 business-need analysis and §5 translation table. |
| Community anecdotes labelled | Yes — [12][13][14] labelled **[community anecdote]** at every use, including the disputed $33 figure. |
| Sources re-opened and checked | Yes — all 20 sources fetched in full on 2026-09-22; stale (7), vendor-interested (15, 16, 20), and conflict (17 vs 2) cases recorded in §8. |
| No fabricated quote, statistic, customer, or test result | Yes — every quotation is attributed to its source; no client work is claimed. |
