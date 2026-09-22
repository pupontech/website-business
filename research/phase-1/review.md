# P1.5 — Independent review of the Phase 1 deliverable

- **Task:** P1.5 (Kanban `t_6b3908b6`), independent coverage and credibility review. Board `website-business`.
- **Reviewer run:** `dsflash3`, 2026-09-22 (UTC). Review window opened 2026-09-22T16:00Z.
- **Subject under review:** `docs/01-business.md` (352 lines, 37,490 bytes) and the three Phase 1 research artifacts it synthesizes.
- **Verdict:** **`pass_with_minor_fixes`** — the deliverable is substantively accurate, correctly qualified, and complete against the Phase 1 requirements; three fixes (F-1, F-2, F-3) should be applied before Phase 1 is accepted, and five optional fixes (F-4…F-8) are recorded for the same pass.
- **Nature of this review:** read-only. No sentence of `docs/01-business.md`, the research artifacts, the governing files, Kanban state, or Git history was modified, and no silent rewrite is proposed — every finding names the file, the line, and a concrete fix for the original author or the parent to apply.

## 1. Method

1. Read the governing and context files: `AGENTS.md`, `PROJECT_STATUS.md`, `README.md`, `DECISIONS.md`, and the P1.4 card body (`t_e35eecbb`) plus the parent pre-review comment (`t_e35eecbb`, comment of 2026-09-22 17:57).
2. Read all three research artifacts in full: `research/phase-1/competitors.md` (180 lines), `research/phase-1/segments.md` (237 lines), `research/phase-1/business-model.md` (396 lines).
3. Recounted entities and ran a machine citation check over `docs/01-business.md` (script: parse source list, parse every `[n]` and `[n–m]` in the body, diff both directions, count label usage).
4. Re-opened 15 of the 61 cited URLs against the live web on 2026-09-22 (same UTC day as the recorded retrieval date) and compared the live text with the specific claims made in `docs/01-business.md`.
5. Cross-read the deliverable against the upstream artifacts for reconciliation errors, dropped qualifiers, and dropped governing requirements.

Read-only attestation (SHA-256 recorded before this review was written, re-verified after):

| File | SHA-256 |
|---|---|
| `AGENTS.md` | `326727ed97c67ceee3d7d813e56144e3c22ee16758b83b8ca319912aa8ab2ace` |
| `PROJECT_STATUS.md` | `6659b569c463adbb9c67c0927c202edac218d7aef82cd76438ceb444a63a5d1e` |
| `docs/01-business.md` | `48eee762c2df16f4319507e38bf57875ed209009b6f4ab2b792fc6584709b1f6` |
| `research/phase-1/business-model.md` | `7f734b542d9bc376c96618c552f6e12348767f191b4192ad058199d6570c0f9f` |
| `research/phase-1/competitors.md` | `537b04e0275fc4a0f7801b2b6d958dcf6773ab374286740b0aa022ec3402ea61` |
| `research/phase-1/segments.md` | `5abc18a38d87767e0160b0d264e7cd6eec9dd849be6becea8a346af7269ec870` |

## 2. Acceptance matrix

| Phase 1 requirement (source) | Where satisfied in `docs/01-business.md` | Reviewer check | Status |
|---|---|---|---|
| Concise executive recommendation | §1, lines 12–29 | Present; recommendation, segment pair, package trio, ownership posture, and authorization gate all stated | PASS |
| 6–8 competitors from first-party pages | §2.2 table, lines 43–56 | Exactly 8 rows recounted; all 8 are first-party vendor pages | PASS |
| Category coverage of the competitor set | §2.1 line 35; §2.2 table | Astro development, Ghost development, boutique studios, productized services, templates/themes, recurring care — matches `competitors.md` §"Category coverage summary" (lines 122–131) | PASS |
| Public competitor prices only, with qualifiers | §2.2 rows; line 45; lines 267–268 | Every price is a first-party snapshot; each of the 8 rows carries an explicit qualifier or limitation | PASS |
| Exactly two initial customer segments | §3, lines 60–98 (Segment A line 64, Segment B line 78) | Exactly 2 selected; WordPress migration explicitly excluded as a segment (line 62) | PASS |
| Segment pains, buying triggers, counterarguments, kill criteria | lines 66–92 | Pains and triggers present; counterarguments and two kill criteria present and consistent with `segments.md` lines 115–127 | PASS |
| Framework-to-benefit translation (P1.2 brief) | §5 pillar 1, line 166; line 88; lines 70–72 | **Only partially carried** — see F-7 | PARTIAL |
| Exactly three initial service packages | §4, lines 100–156 (Packages 1/2/3 at lines 104, 122, 141) | Exactly 3; "Not an initial fourth package" at line 156; no service price proposed (lines 102, 272) | PASS |
| Positioning and differentiation | §5, lines 158–172 | Positioning statement plus five differentiation pillars | PASS |
| Acquisition opportunities with falsification tests | §6, lines 174–198 | 8 experiments, each with a "Falsified if" condition | PASS |
| Operating boundaries, ownership, exclusions | §7, lines 200–231 | Ownership posture, deferred/excluded list, future care boundary | PASS |
| Minimum viable requirements, assumptions, limitations, gates | §8, lines 233–277 | 9 gates, 4 assumptions, 6 unknowns, 7 limitations, acceptance/next-gate statement | PASS |
| Inline citations with direct URLs + source list | Sources, lines 279–343 | 61 numbered entries, contiguous `1…61`, no duplicates; 0 dangling citations; but 14 sources are never cited (F-2) | PASS with F-2 |
| Retrieval date for volatile prices/limits (`AGENTS.md`:55) | line 3; lines 45, 70, 210, 245, 267 | Stated at document level and repeated inline where volatile | PASS |
| FACT/ESTIMATE/RECOMMENDATION/UNKNOWN labelling (`AGENTS.md`:56) | lines 5–10 (declared set) | Four declared labels used, **plus** three undeclared labels (F-5) | PASS with F-5 |
| WCAG 2.2 AA baseline target (`AGENTS.md`:35) | — | **Not stated anywhere in the body**; the source that would carry it is uncited (F-3) | FAIL (recoverable) |
| No fabricated clients, testimonials, metrics, outcomes (`AGENTS.md`) | whole document | No client, testimonial, award, or delivered-result claim exists; all third-party outcomes are attributed vendor claims | PASS |
| No market-size claim (`segments.md` §7) | line 96 | Explicitly declared UNKNOWN with no figure | PASS |
| No proof-of-concept overclaiming | lines 169, 271 | "acceptance procedures, not claims already executed"; "No CMS, hosting, migration, permission, performance, recovery, or restore proof was executed in Phase 1" | PASS |
| P1.5 acceptance: ≥5 load-bearing sources independently spot-checked | this document §4 | 15 URLs re-opened and compared | PASS |
| P1.5 acceptance: no silent rewrite of the deliverable | this document §1 | Hashes recorded; only `research/phase-1/review.md` written | PASS |

## 3. Entity recounts (independent)

| Entity | Deliverable claim | Reviewer recount | Result |
|---|---|---|---|
| Numbered sections | 8 (self-check line 350) | 8 (`## 1.` … `## 8.` at lines 12, 31, 60, 100, 158, 174, 200, 233) | Match |
| Competitors | 8 (lines 35, 45) | 8 rows at lines 49–56 (WebAnts, Motivation Digital, Plinth Studio, Saintek, Lambda Studio, FrontendWeb, Naveen Gaur, Designjoy) | Match |
| Initial segments | exactly 2 (line 14, line 62) | 2 (`### Segment A` line 64, `### Segment B` line 78) | Match |
| Initial packages | exactly 3 (lines 19–23, line 102) | 3 (lines 104, 122, 141) | Match |
| Numbered sources | 61 (metadata of `t_e35eecbb`) | 61 entries, lines 283–343, contiguous, no duplicate numbers | Match |
| Distinct sources actually cited in the body | not claimed | 47 of 61 | see F-2 |

## 4. Source spot-checks (live re-fetch, 2026-09-22 UTC)

All quotes below are from the live pages as re-opened by this review, compared against the claim in `docs/01-business.md`.

| # | Source (deliverable ref) | Deliverable claim | Live result | Verdict |
|---|---|---|---|---|
| 1 | `[2]` ghost.org/pricing (line 284) | Starter $18 / Publisher $29 / Business $199 on annual billing; custom themes and paid subscriptions unavailable on Starter, available from Publisher (lines 70, 135); 99.9% uptime SLA only on Custom (line 210) | Page shows `$18`, `$29`, `$199` "Billed yearly"; feature tables show "Custom themes – No" on Starter, "Paid subscriptions – No" on Starter; uptime SLA row: Starter/Publisher/Business "– No", Custom "99.9%"; automatic weekly updates, worldwide CDN, automated backups, free SSL on all tiers | CONFIRMED |
| 2 | `[1]` w3techs.com/technologies/overview/content_management (line 283) | WordPress 40.2% of all websites and 58.8% of sites with a known CMS on 2026-09-22, values update daily (line 82) | "WordPress is used by 40.2% of all the websites, that is a content management system market share of 58.8%"; page title "September 2026"; "reports are updated daily" | CONFIRMED |
| 3 | `[7]` patchstack.com/whitepaper/state-of-wordpress-security-in-2026/ (line 289) | 11,334 new WordPress vulnerabilities in 2025, 91% plugins / 9% themes (line 84) | "11,334 new vulnerabilities were found in the WordPress ecosystem in 2025 — that's a 42% increase"; "91% of new vulnerabilities were found in plugins, and 9% were found in themes"; 6 core; 1,966 (17%) high severity; "only 26% of all vulnerability attacks were blocked" | CONFIRMED |
| 4 | `[21]` webants.io/astro-website-development (line 303) | £5,000–£12,000 marketing sites; discovery, flat-fee quote, milestones, weekly progress, ownership (lines 39, 49) | FAQ: "A marketing site built with Astro typically costs £5,000–£12,000 … documentation site with Starlight costs £3,000–£8,000 … content-heavy publication with custom design costs £10,000–£25,000"; "free 30-minute call", "written flat-fee proposal within 24 hours", "Milestone payments — you see progress weekly and own every deliverable the moment it's completed" | CONFIRMED |
| 5 | `[22]` webants.io/ghost-cms-development-london (line 304) | custom Ghost theme £1,500–£3,000; full Ghost setup £4,000–£10,000 (line 49) | FAQ: "A custom Ghost theme for an existing Ghost site starts from £1,500–£3,000. A full Ghost setup … typically costs £4,000–£10,000. A headless Ghost + Next.js build starts from £10,000" | CONFIRMED |
| 6 | `[28]` plinthstudio.dev/pricing (line 310) | Launchpad $3,500 / Accelerator $8,500 / Authority $22,000 / Enterprise $50,000+; care $149/$499/$2,500 per month; page limits, revisions, payment terms, delivery windows, source files (lines 39, 51) | Launchpad "Starting at $3,500" (up to 7 pages), Accelerator "$8,500" (15), Authority "$22,000" (30), "Enterprise Starting at $50,000+"; Care $149/mo, Growth $499/mo, Partnership $2,500/mo; "50% upfront / 50% on launch", source files, 2–3 / 4–5 / 8–10 week delivery | CONFIRMED |
| 7 | `[30]` saintek.pro/pricing/ (line 312) | Starter Landing $350, Professional Site $1,950, Authority Build $4,900; WordPress-to-Astro migration $890; recurring plans cover search/visibility, not clearly code care (line 52) | "$350 one-time", "$1,950 one-time", "$4,900 one-time"; FAQ: "Migration is a $890 one-time service … Typical delivery: 5–7 days"; retainers $400/$600/$800/$1,500 per month all scoped to GBP/SEO/AEO/GEO work; "50% upfront, 50% on launch" | CONFIRMED |
| 8 | `[36]` frontendweb.agency/hire-us (line 318) | Custom Ghost themes start at $500; hourly retainer $15/hour; page still says "Available for H2 2024", stale on the retrieval date (line 54) | Page opens "Available for H2 2024"; "Starting at $500"; "$15/hr"; "Response time is typically within 24 hours" | CONFIRMED (staleness flag still valid on re-fetch) |
| 9 | `[35]` frontendweb.agency/ (line 317) | Site claims 98/100 Lighthouse Performance and 100% GScan validation (line 54) | "98/100 Lighthouse Performance"; "100% GScan Validated"; free Fastest and Logly themes | CONFIRMED (vendor claim, correctly reported as a claim) |
| 10 | `[37]` naveengaur.com/ (line 319) | Homepage lists emergency fixes $60–$150, an audit at $150, maintenance $49/month, consulting $149/month (line 55) | "Emergency Fix & Recovery $60–$150 / Response within 4 hours"; "Site Growth & Performance Audit $150"; "Professional … $49"; "Expert Consulting $149 per month"; "Response within 24 hours guaranteed" | CONFIRMED |
| 11 | `[39]` designjoy.co/pricing and `[40]` www.designjoy.co/ (lines 321–322) | One page displays $1,999/$2,499; the homepage displays a separate $4,995/$5,995 "Monthly Club"; conflicting first-party displays (line 56) | `/pricing`: "Design … $1,999/month", "Design + Webflow … $2,499/month"; homepage: "Monthly Club — Lifetime Discount — $4,995 /month, $5,995, One request at a time, Avg. 48 hour delivery" | CONFIRMED (both displays still divergent) |
| 12 | `[33]`/`[34]` lambdastudio.io templates + Lambda Agency product page (lines 315–316) | Templates $39–$49; catalog and product page differ on license coverage (line 53) | Catalog: Lambda SaaS $49, Portfolio/Minimal/Agency $39; catalog FAQ: "One purchase covers personal and commercial use across multiple websites, including client projects"; product page: "One purchase covers one website — yours or a client's"; page metadata "Astro 6.1.8 · v1.0.0 · updated April 27, 2026" | CONFIRMED (ambiguity real on both live pages) |
| 13 | `[3]` docs.ghost.org/migration/substack (line 285) | Built-in Substack migrator for posts and free/paid subscribers; Stripe continuity; `/p/` redirects (line 72) | Migrator in Ghost Admin with content zip + free/paid subscriber CSV import; "Make sure to use the same Stripe account that is connected to your Substack"; `/p/` → root 302 redirect regex documented; Ghost(Pro) migrations team | CONFIRMED |
| 14 | `[41]` docs.ghost.org/themes (line 323) | `gscan` validation for themes, incl. automatic check on upload (lines 133, 243) | "GScan will check your theme for errors, deprecations and compatibility issues"; "When a theme is uploaded in Ghost admin, it will automatically be checked with `gscan`"; CLI usage documented | CONFIRMED |
| 15 | `[49]` netlify.com/pricing (line 331) | Netlify lists a 99.99% SLA only on Enterprise (line 210) | "Enterprise — Custom pricing … 99.99% SLA"; Personal $9/month, Pro $20/month, no SLA listed on either | CONFIRMED |

The 15 re-opened URLs cover 17 of the 61 source entries (`[33]`/`[34]` and `[39]`/`[40]` are paired on one page each).

Not re-opened by this review (44 of 61 entries, mostly secondary or tangential): `[4]`–`[6]`, `[8]`–`[20]`, `[23]`–`[27]`, `[29]`, `[31]`, `[32]`, `[38]`, `[42]`–`[48]`, `[50]`–`[61]`. Their claims are single-sourced in the deliverable and are inside the qualifiers the document already publishes.

## 5. Findings

Severity: **MODERATE** = fix before Phase 1 acceptance; **MINOR** = fix in the same pass if cheap; **LOW** = documentation hygiene.

### F-1 (MODERATE) — Unsupported claim with wrong citations at line 247

- **Reference:** `docs/01-business.md:247` — "9. Channel readiness: truthful agency site, written referral offer, Business Profile/on-site SEO basics, and Ghost Forum presence. `[43][60–61]`"
- **Evidence:** `[43]` resolves to the Ghost Forum (line 325) and supports only the forum item. `[60]` resolves to a Reddit r/Design portfolio anecdote (line 342) and `[61]` to a Kyln care-plan cost page (line 343); neither is about Google Business Profile or on-site SEO. The sources that do support the claim — `[58]` Google Business Profile guidelines (line 340) and `[59]` Google Search Central SEO Starter Guide (line 341) — are listed but never cited anywhere in the document.
- **Why it matters:** `AGENTS.md:54` requires an inline numbered citation directly after externally sourced claims. Here an operational recommendation is attributed to two pages that do not support it, which is exactly the "recommendation/evidence confusion" this review was commissioned to find.
- **Fix:** replace `[43][60–61]` with `[43][58–59]`. The underlying recommendation is sound and traceable to `business-model.md` §8 channels C3/C4 (`business-model.md:260–261`); only the citation is wrong.

### F-2 (MODERATE) — 14 of 61 listed sources are never cited (23% of the source list)

- **Reference:** source list lines 283–343. Never cited in the body: `[4]` (286), `[9]` (291), `[10]` (292), `[11]` (293), `[12]` (294), `[13]` (295), `[14]` (296), `[15]` (297), `[16]` (298), `[18]` (300), `[19]` (301), `[57]` (339), `[58]` (340), `[59]` (341).
- **Evidence:** machine check of `docs/01-business.md`: 61 entries numbered contiguously, 0 citations pointing outside the list, 47 distinct entries cited. `[13]`–`[16]` and `[18]`–`[19]` are the small-business, photographer, creative-professional, CrUX and Upwork evidence from `segments.md` that the synthesized "Deferred candidates" paragraph (line 98) relies on without citing them.
- **Why it matters:** the source list is the audit surface for Phase 1. Mixed cited/uncited entries make the list look stronger than the traceability it provides, and the deferral rationale at line 98 currently rests on uncited sources.
- **Fix (either/or, both cheap):** (a) cite the sources where their evidence is used — `[13]`–`[16]` at line 98, `[58]`–`[59]` at lines 196/247, `[9]`–`[11]` at whatever accessibility sentence F-3 produces, `[57]`/`[12]`/`[18]`/`[19]`/`[4]` dropped; or (b) delete the unused entries and say so. Do not leave 14 orphan entries in a list the parent is expected to audit.

### F-3 (MODERATE) — The governing WCAG 2.2 AA baseline is absent from the deliverable

- **Reference:** `AGENTS.md:35` — "Meet WCAG 2.2 AA as the baseline target, with documented manual checks." In `docs/01-business.md`, "WCAG" appears only once, in the source list at line 291 (`[9]`), and never in the body. Accessibility is otherwise described only generically: "Automated accessibility checks plus recorded manual keyboard/focus/semantics review" (line 116), "accessibility review of touched templates" (line 132), "prevent performance, structural accessibility … findings" (line 148), "automated accessibility plus manual keyboard/focus/semantics review" (line 243).
- **Evidence:** the upstream artifacts do carry the baseline — `segments.md` (framework-to-benefit table, WCAG 2.2 row) and `business-model.md:152` ("semantic HTML, responsive images, WCAG 2.2 AA baseline with a documented manual check pass") — and `business-model.md:45` restates it as a binding constraint. The synthesis dropped it, leaving `[9]` W3C WCAG 2.2, `[10]` Directive (EU) 2019/882 and `[11]` European Commission EAA page uncited.
- **Why it matters:** Phase 1 output feeds Checkpoint 1 and defines the offer surface. A package scope that never names the accessibility baseline it is priced against will be resolved inconsistently in P4/P5/P7, and the deliverable currently omits a requirement that `AGENTS.md` makes non-negotiable.
- **Fix:** add one sentence to the package/acceptance language — e.g. in §4 Package 1 acceptance evidence (line 116) and §8 gate 5 (line 243) — "WCAG 2.2 AA is the build baseline, with a recorded manual keyboard/focus/semantics pass `[9]`; legal characterisation stays jurisdiction-specific and is not sold as blanket protection `[10][11]`." That simultaneously clears three of the F-2 orphans. Note the doc already contains the correct precaution at lines 92 and 170 ("accessibility/security law must not be marketed as blanket protection"; "no blanket accessibility claim"), so only the baseline statement is missing.

### F-4 (MINOR) — Citation ranges that sweep in unrelated pages

- **References and evidence:**
  - line 35 `[21–42]` — attached to a statement about *eight public businesses*, but the range runs through `[41]` Ghost themes docs and `[42]` Ghost Experts.
  - line 39 `[21–32][40–42]` — the sentence concerns WebAnts, Motivation, Plinth, Saintek and Designjoy (design joy is `[39]`–`[40]`); `[41]` and `[42]` are irrelevant to process transparency.
  - line 184 `[41–43]` — forum/experts channel row; `[41]` (themes docs) is irrelevant, `[42]`–`[43]` are correct.
  - line 196 `[41–45]` — directory/channel paragraph; `[41]` irrelevant; `[44]`–`[45]` correct.
  - line 206 `[46–48]` — Ghost hosting comparison sentence; `[47]` (Ubuntu install) is adjacent, `[48]` (Astro MIT licence) is unrelated.
  - line 219 `[2–3]` — a project constraint (D-004, headless requires justification) cited to Ghost's pricing and migration pages rather than to `DECISIONS.md`.
- **Why it matters:** range citations make a claim look multiply sourced when it is not, and they are the specific failure mode the parent pre-review asked P1.5 to inspect. `AGENTS.md:54` asks for a citation "directly after" the claim.
- **Fix:** narrow each range to the pages that actually support the sentence (`[21–32][39–40]`; `[42–43]`; `[42–45]`; `[46–47]`), and for line 219 cite `DECISIONS.md` D-004 plus `[2]`–`[3]`.

### F-5 (MINOR) — Label vocabulary drifts from the set the document declares

- **Reference:** the document declares exactly four labels at lines 5–10 (`FACT`, `ESTIMATE`, `RECOMMENDATION`, `UNKNOWN`), then uses three more: **INTERPRETATION** at line 37, **LIMITATION** at line 58, and **ASSUMPTION** at lines 251, 252, 253, 254. `AGENTS.md:56` names the four-label set; `business-model.md:141` explicitly recommended that the synthesized document "normalise label vocabulary to the set in `AGENTS.md` … while preserving its provenance distinctions".
- **Why it matters:** a reader auditing the deliverable cannot tell whether ASSUMPTION is stronger or weaker than UNKNOWN, and the declared vocabulary at lines 5–10 is self-inconsistent with the body. The document also uses an unlabelled judgement at line 154 ("**Why it is an initial package:**").
- **Fix:** either add `INTERPRETATION`, `LIMITATION` and `ASSUMPTION` to the definitions block at lines 5–10 (with one line each on how they relate to `ESTIMATE`/`UNKNOWN`), or relabel: INTERPRETATION → ESTIMATE, LIMITATION → FACT/UNKNOWN as appropriate, ASSUMPTION → UNKNOWN ("unverified assumption"), and label line 154 as RECOMMENDATION.

### F-6 (MINOR) — A recorded first-party Ghost price conflict was dropped from the limitations

- **Reference:** line 70 states Ghost(Pro) Starter $18 / Publisher $29 / Business $199 as a FACT from `[2]` and the limitations block (lines 265–273) does not mention any conflict.
- **Evidence:** `business-model.md:352` (L7) records that two first-party Ghost pages retrieved the same day disagree — the pricing page says Starter **$18/mo billed yearly**, while Ghost's hosting comparison quotes Ghost(Pro) base hosting "from **$15**/mo" — and states it was "recorded rather than resolved". `segments.md:196` records a related third-party "$15/mo" conflict against `[17]`. This review re-confirmed the $18 figure on `ghost.org/pricing`.
- **Why it matters:** the deliverable's whole pricing discipline is "first-party prices win"; silently dropping a same-day first-party conflict weakens that discipline and hides a documented ambiguity from the parent.
- **Fix:** one clause in limitation 2 (line 268) or a footnote on `[2]`: "Ghost's pricing page and its hosting comparison page quoted $18/mo and 'from $15/mo' respectively on 2026-09-22; the pricing-page figure is used and any client-facing cost figure must be re-retrieved."

### F-7 (MINOR) — Framework-to-benefit translation is only implicit

- **Reference:** §3 and §5 carry the segment rationale, and line 166 asserts "Astro is presented as a way to reduce unnecessary client-side JavaScript; Ghost is presented as a native publication, membership, newsletter, and migration system", with `[5–6]` and `[2–3]`. There is no explicit capability → customer-benefit mapping.
- **Evidence:** the P1.2 brief required "framework-to-benefit translation"; `segments.md` §5 (lines 139–154) delivers it as a 10-row table with per-row status labels (FACT / ESTIMATE / RECOMMENDATION) and includes the honest caveat that static-host claims stay ESTIMATE until Phase 2/5 measurement. None of that structure survives into the synthesis.
- **Why it matters:** this is the material the agency site and the sales conversation will be built from in Phases 6–7, and the "static output is pre-built at deploy time" benefit is exactly the claim that must stay marked unproven until a POC runs.
- **Fix:** add a short table to §5 (capability → mechanic → customer benefit → FACT/ESTIMATE status), reusing `segments.md` §5 rows, and keep the ESTIMATE marker on the static-hosting and TypeScript rows.

### F-8 (LOW) — Inconsistent inline handling of secondary sources

- **Reference:** line 68 labels the Substack 10% take-rate as **FACT** citing trade coverage `[17]`, with no inline note that the source is secondary. By contrast line 86 does exactly that well ("the cited summary is a secondary agency source and the underlying survey was not read directly here"). The document's limitation 3 (line 269) covers secondary sourcing globally, but the labels are not applied uniformly at the claim level.
- **Fix:** add the same short qualifier to line 68 ("trade press, secondary, dated 2026-05-10") or downgrade the label to **FACT (secondary trade report)**. Optional.

## 6. What held up (explicitly checked, no defect found)

- **Counts.** 8 competitors, exactly 2 segments, exactly 3 packages, 8 numbered sections — all independently recounted and matching both the body and the self-check at lines 345–352. The self-check's claim that "every external factual claim in the document maps to a numbered direct URL" is true in the forward direction (0 dangling citations); it is silent on the 14 unused entries (F-2).
- **Public-pricing discipline.** Every one of the eight competitor rows carries a qualifier: WebAnts ("ranges are scope-dependent", line 49), Motivation ("not evidence of our achievable price or capacity", line 50), Plinth ("boutique comparator, not a normalized market sample", line 51), Saintek ("cannot be treated as a benchmark for bespoke work", line 52), Lambda ("license ambiguity must not be normalized", line 53), FrontendWeb ("stale on the retrieval date; current availability, prices, and scores require re-verification", line 54), Naveen Gaur ("must not be merged", line 55), Designjoy ("no single price should be treated as current", line 56). No competitor price is used as our price (lines 102, 272).
- **Volatility handling.** Retrieval date at line 3, repeated at line 45 ("FACT snapshots from first-party pages, not recommendations or market rates"), line 70, line 210, line 245 and limitation 1 (line 267). Re-fetching fifteen pages on the same UTC day found no drift, which is consistent with the recorded date.
- **No invented content.** No client, testimonial, award, or delivered-outcome claim appears anywhere in the document; all third-party outcomes are attributed vendor claims and the limitation at line 58 states they were not audited.
- **Honest unknowns.** Lines 76, 96, 198, 240, 246 and the unknown list at lines 256–263 keep willingness-to-pay, market size, capacity, insurance and CMS choice explicitly open; limitation 5 (line 271) restates that no CMS/hosting/migration/recovery proof was executed in Phase 1.
- **Governance alignment.** The document repeats the authorization gate (lines 29, 244, 273), client-ownership and isolation posture (line 204 → `AGENTS.md`, D-003), native-Ghost baseline (line 219 → D-004), and the no-universal-CMS rule (line 260 → D-005) without contradicting any approved decision.
- **Source list integrity.** 61 entries, contiguous numbering, no duplicates, no broken or non-http entries. Entries `[25]` (line 307) and `[42]` (line 324) bundle two URLs each; acceptable, but a one-URL-per-citation split would make the list easier to audit.
- **Competitor-published platform prices are not relied on.** The live WebAnts Ghost page currently advises that Ghost(Pro) starts "from $9/month", which conflicts with Ghost's own $18. `docs/01-business.md` correctly uses only `[2]` for platform pricing, so this defect exists upstream in a competitor's page and does not propagate into the deliverable.

## 7. Reviewer limitations

1. 17 of the 61 source entries (across 15 re-opened URLs) were checked against the live web; the other 44 were not independently fetched, so their content is taken on the strength of the two upstream research artifacts, which the author of this review read in full.
2. Re-fetching happened on the same UTC day as the recorded retrieval date, so this review can confirm agreement, not detect later drift. Nothing here validates the prices after 2026-09-22.
3. Vendor-reported figures (Lighthouse scores, GScan status, portfolio outcomes, project counts) are not auditable by design; the deliverable already labels them as unaudited vendor claims.
4. No Phase 2–5 proof exists yet, so no CMS, hosting, migration, permission, export, or restore behaviour could be verified, and none was expected at Phase 1.
5. The citation consistency check is mechanical (parse and diff); it verifies that citations resolve to listed entries and that the listed pages are first-party where the document says so, not that every sentence is the strongest available source for its claim.

## 8. Handoff

Phase 1 has substance: the recommendation, the competitor evidence, the two segments, the three packages and the qualification of every price survived independent live re-checking. Acceptance is blocked only by citation hygiene and one dropped governing requirement.

Recommended sequence before Phase 1 is marked accepted:

1. Author (or parent) applies F-1 (one line), F-2 (cite-or-drop), F-3 (one sentence restoring the WCAG 2.2 AA baseline) to `docs/01-business.md`.
2. F-4…F-8 applied in the same edit if cheap; F-6 and F-7 are content additions, F-5 and F-8 are one-line label changes.
3. Parent re-runs the mechanical checks in §3 and §4 of this review (counts, citation diff) and confirms the hashes changed only in `docs/01-business.md`.
4. `PROJECT_STATUS.md` P1.5 row and the P1.4/P1.5 Kanban cards updated by the parent, not by this review.
