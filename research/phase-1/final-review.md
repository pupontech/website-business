# P1.7 — Final Phase 1 re-review (fresh-eyes)

- **Task:** P1.7 (Kanban `t_1c4ae0cb`). Board `website-business`. Assignee `dsflash`.
- **Review window:** 2026-09-22T17:26Z–17:36Z (UTC), local 19:26–19:36 CEST.
- **Subject under review:** `docs/01-business.md` (369 lines, 40,921 bytes) — the rework output of card `t_05840e46`.
- **Predecessor:** `research/phase-1/review.md` (P1.5, card `t_6b3908b6`), verdict `pass_with_minor_fixes`, findings F-1…F-8.
- **Verdict:** **`pass`** — all eight findings closed, all Phase 1 counts exact, citation↔source bijection exact, one URL per source entry, no citation ranges, 15 source URLs independently re-opened (requirement: ≥5), and `docs/01-business.md` unmodified by this review. Three LOW observations are recorded in §9; none is a Phase 1 acceptance condition and none requires rework.
- **Nature of this review:** read-only except for this file. A local parser and direct URL re-fetches were used; no claim below rests on the rework card's own verification output.

## 1. Method

1. Read `AGENTS.md`, `PROJECT_STATUS.md`, `DECISIONS.md`, `README.md`, `docs/01-business.md` in full, `research/phase-1/review.md` in full, and the three Phase 1 research artifacts (`competitors.md`, `segments.md`, `business-model.md`) at the sections the fixes touch.
2. Ran a purpose-written local parser over `docs/01-business.md` (script: `/root/.hermes/profiles/dsflash/cache/scratch/p17_check.py`) that splits the document at `## Sources`, parses the numbered list and every inline `[n]` token, and diffs both directions. It separately counts sections, competitor rows, segment headings, package headings, label tokens, and citation ranges.
3. Recounted the eight competitors, two segments and three packages by rule (table rows starting `| **`; headings matching `^### Segment [AB] —`; headings matching `^### Package \d`), not by trusting the self-check block.
4. Re-opened 15 direct URLs (covering 15 listed source entries, plus one identity cross-check) against the live web on 2026-09-22 and compared the live text with the specific sentence each citation supports.
5. Audited the content added or reworded by the rework against the upstream artifacts and the governing documents, to test for new unsupported facts and for any change to an approval gate.
6. Ran a semantic sweep over every citation in the renumbered tail of the source list, because splitting two bundled entries shifted source IDs and a mechanical check cannot detect a *semantically* stale ID.

## 2. Read-only attestation (SHA-256)

Recorded before writing this file; re-verified after writing it.

| File | SHA-256 (before) | Verified after |
|---|---|---|
| `docs/01-business.md` | `40214176a75bd6105ad113bd30dcabdaba042a3031b81ea533bfa46a3891618d16` | unchanged |
| `AGENTS.md` | `326727ed97c67ceee3d7d813e56144e3c22ee16758b83b8ca319912aa8ab2ace` | unchanged |
| `PROJECT_STATUS.md` | `6659b569c463adbb9c67c0927c202edac218d7aef82cd76438ceb444a63a5d1e` | unchanged |
| `DECISIONS.md` | `263e4b92ec0db2e7e38a948e39ea4c00aa09be90bd91a1eeb93731703a50d769` | unchanged |
| `README.md` | `eee54bca8e46d307b31fee3e40c2971e90584c833a76d1173e3c586c9f2b2c1e` | unchanged |
| `research/phase-1/business-model.md` | `7f734b542d9bc376c96618c552f6e12348767f191b4192ad058199d6570c0f9f` | unchanged |
| `research/phase-1/competitors.md` | `537b04e0275fc4a0f7801b2b6d958dcf6773ab374286740b0aa022ec3402ea61` | unchanged |
| `research/phase-1/segments.md` | `5abc18a38d87767e0160b0d264e7cd6eec9dd849be6becea8a346af7269ec870` | unchanged |
| `research/phase-1/review.md` | `6be85929d6055bd05c1b31a2f8d606f8492419d5d3a8492879646eaa96e725d4` | unchanged |

The deliverable hash under review (`40214176…`) equals the post-rework hash reported by card `t_05840e46` and differs from the pre-fix hash (`48eee762…`) recorded by P1.5, so the file being reviewed is the rework output and not an earlier revision.

## 3. F-1…F-8 closure matrix

| # | P1.5 finding (old line) | Fix claimed by rework | Reviewer check on the current file | Status |
|---|---|---|---|---|
| **F-1** | Mis-citation at old line 247 (`[43][60–61]` used for Business Profile / on-site SEO; correct `[58][59]` orphaned) | Replace with the Business-Profile and SEO sources | Line 261 now reads `… Business Profile/on-site SEO basics, and Ghost Forum presence. [45][60][61]`. `[45]` = `forum.ghost.org` (live: Marketplace category exists), `[60]` = Google Business Profile guidelines (live: "Guidelines for representing your business on Google", profile creation/verification/representation), `[61]` = Google Search Central SEO Starter Guide (live). Each element of the sentence now maps to a page that supports it; the previously mis-used Reddit and care-plan sources are no longer attached to this item | **CLOSED** |
| **F-2** | 14 of 61 sources never cited (`[4]`,`[9]`–`[16]`,`[18]`,`[19]`,`[57]`,`[58]`,`[59]`) | Cite-or-drop | Parser: 63 entries, 63 distinct IDs cited in the body, **0 orphan entries**, **0 dangling citations**. `[4]` line 72; `[9]`/`[10]`/`[11]` lines 112, 180, 257; `[12]`/`[13]`/`[14]`/`[15]`/`[16]`/`[19]` line 102; `[18]` line 92; `[57]` line 253; `[58]`/`[59]` line 259; `[60]`/`[61]` lines 180, 257, 261. List grew 61→63 (+2), consistent with the two multi-URL entries P1.5 §6 flagged being split | **CLOSED** |
| **F-3** | WCAG 2.2 AA baseline (`AGENTS.md:35`) absent from the body | Add baseline sentence plus jurisdiction caveat | Line 112 (`FACT (project baseline)`): "WCAG 2.2 AA is the build baseline, with a recorded manual keyboard/focus/semantics check [9]. Legal accessibility obligations remain jurisdiction-specific…"; line 257 gate 5 repeats it; line 180 adds it to the new capability table. `AGENTS.md:35` confirmed verbatim ("Meet WCAG 2.2 AA as the baseline target, with documented manual checks"); `[9]` live = WCAG 2.2 W3C Recommendation; upstream support: `business-model.md:45`, `business-model.md:152`, `segments.md:154` | **CLOSED** |
| **F-4** | Six range citations sweeping unrelated pages (old lines 35, 39, 184, 196, 206, 219) | Narrow to supporting pages; cite D-004 for the headless constraint | Parser: **0 citation ranges anywhere in the file**. Line 35 `[21][27][34]` (was `[21–42]`); line 39 `[21][27][29]` + `[31][40][41]` (was `[21–32][40–42]`); line 198 `[43][44][45]` (was `[41–43]`); line 210 `[43][44][45][46][47]`; line 220 `[48][49]` (was `[46–48]`, dropping the unrelated Astro licence entry); line 233 `[2][3]` with `DECISIONS.md` D-004 named in prose. D-004 verified to say exactly what is claimed | **CLOSED** |
| **F-5** | Undeclared `INTERPRETATION` / `LIMITATION` / `ASSUMPTION` labels | Relabel to the declared four | Token scan of the whole file returns only `FACT` (18), `RECOMMENDATION` (16), `UNKNOWN` (11), `ESTIMATE` (5). Zero occurrences of `INTERPRETATION`, `LIMITATION` or `ASSUMPTION` as labels; line 37 is now `ESTIMATE`, line 58 `UNKNOWN`, the former assumption list is `UNKNOWN: Planning assumption: …` | **CLOSED** |
| **F-6** | Ghost $18 vs $15 same-day first-party conflict dropped from limitations | Record the conflict in a limitation | Line 282 (limitation 2) records: "Ghost's pricing page listed Starter at $18/month billed yearly, while its hosting comparison quoted base hosting 'from $15/month' on the same retrieval date; the pricing-page figure is used here, and any client-facing cost must be re-retrieved. [2][48]". Both pages re-opened live: `ghost.org/pricing` shows `$18` "Billed yearly"; `docs.ghost.org/hosting` shows Ghost(Pro) "Base hosting cost … From **$15**/mo". Attribution is to the correct two entries. Upstream: `business-model.md:197`, `segments.md:196` | **CLOSED** |
| **F-7** | Capability→benefit translation only implicit | Add explicit table | Lines 174–180 add a four-column table (Capability / Mechanic / Customer benefit / Status) with the required ESTIMATE markers retained: "Astro static output … ESTIMATE until a Phase 2/5 proof of concept measures it". Rows mirror `segments.md` §5 (lines 150–154) line for line, including the static-hosting ESTIMATE and the jurisdiction caveat | **CLOSED** |
| **F-8** | Substack take-rate labelled FACT with no inline secondary-source note | Qualify inline | Line 68 now ends: "The cited source is secondary trade coverage dated 2026-05-10, so it is directional evidence rather than primary platform documentation." Live check of `[17]`: article bylined "Sunday, May 10, 2026"; "takes 10 percent of every paid subscription in perpetuity"; names Ghost and beehiiv moves *and* Substack's network defence. Date, number and the "directional" framing are all accurate | **CLOSED** |

**All eight findings: CLOSED. No finding re-opened.**

## 4. Entity recounts (independent, by rule rather than by self-check)

| Entity | Requirement / claim | Reviewer count | Evidence (current line numbers) | Result |
|---|---|---|---|---|
| Competitors | 6–8 required; document claims 8 | **8** | table rows at lines 49–56 (WebAnts, Motivation Digital, Plinth Studio, Saintek, Lambda Studio, FrontendWeb, Naveen Gaur, Designjoy); upstream `competitors.md` has exactly 8 numbered evidence notes (`### 1.`…`### 8.`) | Match |
| Initial segments | exactly 2 | **2** | `### Segment A` line 64, `### Segment B` line 80; upstream `segments.md:107` "Exactly two segments are recommended for the first cohort." (The parser also matched `### Segment A/B experiments` in §6 — different construct, not segments.) | Match |
| Initial packages | exactly 3 | **3** | `### Package 1` line 108, `### Package 2` line 128, `### Package 3` line 147; "Not an initial fourth package" line 162; upstream `business-model.md` §6 has Packages A/B/C | Match |
| Numbered sections | 8 | **8** | lines 12, 31, 60, 104, 164, 188, 214, 247 | Match |
| Numbered sources | 63 (rework claim) | **63**, IDs `1…63`, contiguous, no duplicate IDs, no duplicate URLs, no entry with 0 or 2+ URLs | lines 297–359 | Match |
| Label tokens | four declared labels only | FACT 18, RECOMMENDATION 16, UNKNOWN 11, ESTIMATE 5; no undeclared label | whole file | Match |

## 5. Citation-check output (local parser)

```
SOURCE LIST
entries            : 63
id range           : 1..63
contiguous         : True
duplicate ids      : none
entries != 1 URL   : none
entries with 0 URL : none
duplicate URLs     : none

BODY CITATIONS
citation tokens    : 105
distinct ids cited : 63
dangling (not in list)  : none
orphan (never cited)    : none
citation ranges in body : 0
citation ranges anywhere: 0
hyphen/en-dash ranges   : none
```

Bijection holds in both directions: every in-body ID resolves to exactly one listed entry (0 dangling) and every listed entry is used at least once (0 orphan). "One URL per source" holds for all 63 entries, with no duplicate URLs across the list. The self-check block at lines 367–368 therefore makes statements that are now literally true; the same block's claim at line 369 ("only `docs/01-business.md` is changed by this task") matches that card's file scope.

## 6. Source spot-checks (live re-open, 2026-09-22 UTC)

15 direct URLs were fetched; each is a load-bearing source for a claim named below. The rework's own three corrected claims (channel readiness, WCAG baseline, Ghost price conflict) are all inside this set.

| # | Entry | Claim it carries | Live result | Verdict |
|---|---|---|---|---|
| 1 | `[2]` ghost.org/pricing | line 70: Starter $18 / Publisher $29 / Business $199 annual; custom themes and paid subscriptions unavailable on Starter, available from Publisher; line 224: 99.9% SLA only on Custom | `$18`/`$29`/`$199` "Billed yearly"; comparison rows "Custom themes – No" on Starter, "Paid subscriptions – No" on Starter; "Uptime SLA – No/– No/– No / 99.9%"; automatic weekly updates, worldwide CDN, automated backups, free SSL at all paid tiers | CONFIRMED |
| 2 | `[48]` docs.ghost.org/hosting | line 282: same-day first-party conflict "from $15/month"; line 220: self-hosting responsibilities | "Base hosting cost … From **$15**/mo" for Ghost(Pro); self-host column: install & setup "Manual", weekly updates "Manual", server maintenance & updates "Manual", SSL "Manual", plus separately sourced CDN/WAF from $20, email from $15, analytics from $10, backups from $5, image editor from $12 | CONFIRMED |
| 3 | `[9]` w3.org/TR/WCAG22/ | line 112/180/257: WCAG 2.2 AA as build baseline | "Web Content Accessibility Guidelines (WCAG) 2.2", W3C Recommendation, conformance levels A/AA/AAA, dated 2024-12-12 | CONFIRMED |
| 4 | `[11]` commission.europa.eu EAA | line 112/180/257: accessibility law is jurisdiction-specific, not blanket protection | European Accessibility Act page: an EU directive aiming to remove barriers created by different Member-State rules | CONFIRMED (page is a short official landing page; it supports the *existence and nature* of the instrument, not article-level scope — the deliverable claims no more than that) |
| 5 | `[60]` support.google.com/business/answer/3038177 | line 261: "Business Profile … basics" | "Guidelines for representing your business on Google" — profile creation, representation, categories, address, hours, suspensions | CONFIRMED |
| 6 | `[61]` developers.google.com/search/docs/fundamentals/seo-starter-guide | line 261: "on-site SEO basics" | Google Search Central "SEO Starter Guide: The Basics" (last updated 2025-12-10) | CONFIRMED |
| 7 | `[45]` forum.ghost.org | line 198: "Ghost Forum marketplace category"; line 261: forum presence | Forum live; category "Marketplace — Advertise or request commercial services for Ghost, like apps, jobs, premium themes, hosting or consulting" | CONFIRMED |
| 8 | `[42]` docs.ghost.org/themes | line 139/257: `gscan` validation of shipped themes | "GScan will check your theme for errors, deprecations and compatibility issues"; "When a theme is uploaded in Ghost admin, it will automatically be checked with `gscan`"; CLI usage documented | CONFIRMED |
| 9 | `[17]` webpronews.com Substack tax | line 68: 10% in perpetuity, moves to Ghost and beehiiv, discovery still valuable, secondary, dated 2026-05-10 | Bylined "Sunday, May 10, 2026"; "takes 10 percent of every paid subscription in perpetuity"; documents Ghost, beehiiv, Patreon and Passport moves *and* Substack's claim that its network drives half of new subscriptions | CONFIRMED |
| 10 | `[3]` docs.ghost.org/migration/substack | line 74; lines 178–179 of the new table: built-in migrator, free/paid subscriber import, Stripe continuity | Migrator in Ghost Admin; separate free- and paid-subscriber CSV steps; "Make sure to use the same Stripe account that is connected to your Substack"; `/p/` redirect regex documented | CONFIRMED |
| 11 | `[51]` netlify.com/pricing | line 224: 99.99% SLA only on Enterprise | "Enterprise — Custom pricing … 99.99% SLA"; Personal $9/mo, Pro $20/mo, no SLA row on either | CONFIRMED |
| 12 | `[52]` vercel.com/pricing | line 224: same claim for Vercel | Hobby $0, Pro $20/mo, Enterprise "…platform SLAs… 99.99% SLA" | CONFIRMED |
| 13 | `[6]` docs.astro.build/en/concepts/why-astro/ | new table rows 176–177 (islands / HTML-CSS by default; static output) | "Islands: a component-based web architecture…", "Zero JS, by default", "Server-first … Moves expensive rendering off of your visitors' devices", MPA vs SPA | CONFIRMED for the framework mechanics; the client-benefit column carries the ESTIMATE marker required by F-7 |
| 14 | `[31]` saintek.pro/pricing/ | line 39: "fixed tiers"; line 52 row | Starter Landing $350 / Professional $1,950 / Authority Build $4,900 one-time; $890 WordPress→Astro add-on; retainers $400/$600/$800/$1,500; "50% upfront, 50% on launch" | CONFIRMED |
| 15 | `[32]` saintek.pro/about/ | line 52 row (Saintek) | About page documents the four-phase process (Audit / Build / Launch / Grow) and the tier-by-tier positioning; it is the page that carries the "four-stage process" element of line 39 | CONFIRMED (see observation R-2) |

Identity cross-check: `[10]` (EUR-Lex Directive (EU) 2019/882) was not fetched directly; the EC page in row 4 is the deliverable's `[11]` and links to CELEX 32019L0882, i.e. the same instrument, so `[10]`'s identity is corroborated but its own URL was not opened. Stated here rather than counted as a checked source.

## 7. Post-renumbering semantic sweep

Splitting two bundled entries renumbered the tail of the source list, so a mechanical bijection is necessary but not sufficient. Every citation outside the F-1…F-3 edits was therefore re-read against its entry's subject:

- Competitor rows 49–56: `[21]`–`[26]` all WebAnts pages, `[27]`/`[28]` Motivation Digital, `[29]`/`[30]` Plinth, `[31]`–`[33]` Saintek, `[34]`/`[35]` Lambda, `[36]`/`[37]` FrontendWeb, `[38]`/`[39]` Naveen Gaur, `[40]`/`[41]` Designjoy — each group matches its row's provider.
- `[50]` line 172 = Astro repository MIT licence (matches "its repository is MIT-licensed").
- `[43]`/`[44]`/`[45]` lines 198 and 210 = Ghost Experts, apply page, forum (matches "Forum… Ghost Experts… directories").
- `[46]`/`[47]` line 210 = Astro Agency Partner join page and directory (matches the sentence naming the Astro partner directory).
- `[48]`/`[49]` line 220 = hosting comparison + Ubuntu install (matches self-hosting responsibilities).
- `[53]`/`[54]` line 238 = Ghost theme marketplace + the named theme example.
- `[55]`/`[56]`/`[57]` line 253 = GDPR, EDPB landing page, EDPB PDF (matches "EU and EDPB sources").
- `[58]`/`[59]` line 259 = Cloudflare Pages limits and Workers pricing (matches "Cloudflare Pages limits, Cloudflare Workers pricing").
- `[63]` line 245 = the care-plan cost page cited as "pattern evidence, not a market rate".

No stale or mismatched ID found.

## 8. New-content audit — no new unsupported facts, no approval change

Every block the rework added or rewrote was traced to an upstream artifact or a live first-party page:

1. **WCAG sentences (lines 112, 180, 257)** — traceable to `AGENTS.md:35` (verbatim requirement), `business-model.md:45` and `:152`, and `segments.md:154`; the sources `[9]`/`[10]`/`[11]` re-opened. No compliance or legal-efficacy claim is made beyond "jurisdiction-specific".
2. **Capability→benefit table (lines 174–180)** — a condensation of `segments.md` §5 rows, preserving each row's status label including the two ESTIMATE rows; `[2]`, `[3]`, `[6]`, `[9]` re-opened. Note on citation scope: the row "Ghost themes, Portal, memberships, and newsletters … sign-in, paywalls" cites `[2][3]`, and those two pages evidence themes, memberships, paid tiers, premium tiers and sending but do not themselves use the words "Portal", "paywall" or "magic-link sign-in". This is **not** a new unsupported fact: `segments.md:150` carries the same sentence with the same citation pair, so the synthesis is faithful to its source artifact and inherits its citation scope. Recorded here for transparency, not as a finding.
3. **Ghost $18/$15 clause (line 282)** — accurate; both pages re-opened (§6 rows 1–2).
4. **Secondary-source qualifier (line 68)** — accurate; article date and figure re-opened (§6 row 9).
5. **Renumbered citations and de-ranged citation groups** — covered by §5 and §7.
6. **Deleted undeclared labels** — cosmetic; no claim changed strength (checked line by line: the former `INTERPRETATION` sentence is now `ESTIMATE`, the former `LIMITATION` sentence is now `UNKNOWN`, and the four planning assumptions are now `UNKNOWN: Planning assumption: …`).

**Approval and authorization posture unchanged.** Lines 29, 258 and 287 still state that paid services, domains, DNS changes, production infrastructure and public launch remain unauthorized pending the named owner checkpoints; line 287 still marks the whole recommendation provisional pending Phase 1 review and Checkpoint 1. `DECISIONS.md` D-002 (agency-site implementation not before Checkpoint 2) is not contradicted anywhere — the §8 gate 9 "truthful agency site" is phrased as a minimum-viable prerequisite for selling, alongside gates 1–8, not as an authorization. D-003 (lines 218), D-004 (line 233) and D-005 (line 274) are each invoked consistently with the decision text in `DECISIONS.md`, and `DECISIONS.md` itself is byte-identical to the version P1.5 reviewed. No decision was amended, and no previously gated action is now described as approved.

## 9. Remaining observations (LOW, non-blocking)

These do not affect the verdict: each acceptance condition in the P1.7 card is met. They are recorded so the parent can decide whether to spend a further edit.

- **R-1 (LOW) — the same claim fixed at line 261 is uncited at its sibling, line 210.** Line 210 is a `RECOMMENDATION` whose citation group `[43][44][45][46][47]` supports the directory/experts clause but not the earlier "Google Business Profile/on-site SEO basics" clause in the same sentence; line 261 (gate 9) now carries `[45][60][61]` for exactly that clause. This is the residual of F-1's class at a second site. Exact fix: append `[60][61]` to line 210, or add "(see gate 9, §8)" so the reader is routed to the cited instance.
- **R-2 (LOW) — element-level citation of the Saintek process.** Line 39 credits "Saintek publishes fixed tiers **and a four-stage process**" to `[31]` (the pricing page) alone. Live check: the fixed tiers are on `[31]`, while the four-stage process (Audit/Build/Launch/Grow) is documented on `[32]` (`saintek.pro/about/`), which is cited for Saintek in the §2.2 row at line 52. The claim is true and sourced in the document; only this sentence's citation group is one token narrow. Exact fix: `[31][32]` instead of `[31]`.
- **R-3 (LOW) — two source descriptions in the deferred-candidates sentence are loose.** Line 102 describes `[15]` as part of "community anecdotes about **photographer** maintenance"; `[15]` is the `r/squarespace` "$33/month for a basic business site" pricing anecdote (`segments.md:216`) and the photography/maintenance thread is `[16]` (`segments.md:217`). The same sentence describes `[19]` as "trade reporting on design-work demand"; `[19]` is staffing-industry coverage of the Upwork 2026 report on fastest-growing work categories. Both are prose characterisations of Reddit/industry sources that are correctly listed and correctly cited; the deferral decision, the segment count and the no-market-size rule are unaffected. Exact fix, if wanted: "community anecdotes about builder pricing and photographer maintenance [15][16]" and "trade reporting on web-development work demand [19]".

No other defects were found: no citation out of range, no duplicate or missing URL, no undeclared label, no invented client, testimonial, metric, award or outcome, no price of ours asserted (lines 106, 286), no market-size claim (line 100), no proof-of-concept overclaim (lines 183, 285).

## 10. Reviewer limitations

1. 15 of 63 source entries were re-opened live (the rest taken on the strength of the three upstream artifacts and the mechanical bijection check); `[10]`'s own URL was not fetched (§6 note).
2. Re-fetching happened minutes after the rework and on the same UTC day as the recorded retrieval date, so it can confirm agreement with the recorded figures, not detect later drift. Nothing here validates prices after 2026-09-22.
3. No pre-fix copy of `docs/01-business.md` exists on disk (the deliverable is untracked in Git and no backup was retained), so the diff against the reviewed pre-fix revision could not be computed mechanically; §8 rests on reading the P1.5 quoting, the rework's change list, and the current content against the upstream artifacts. A byte-level diff of the rework itself is therefore **unverified** by this review.
4. Vendor-reported figures (Lighthouse scores, GScan status, portfolio outcomes, project counts) are not auditable by design; the deliverable already labels them as unaudited vendor claims.
5. The citation check is mechanical plus a semantic sweep of the renumbered tail; it does not prove that each sentence uses the strongest available source, only that every citation resolves, is used, and is topically appropriate.
6. No Phase 2–5 proof exists yet, so no CMS, hosting, migration, permission, export, backup or restore behaviour could be verified and none was expected at Phase 1.

## 11. Handoff

Phase 1's substantive output survived this fresh-eyes pass unchanged: the accepted recommendation (Astro + Ghost, two segments, three bounded packages, client-owned accounts, native Ghost with headless requiring justification) is intact, the eight competitors, two segments and three packages are exact, every source entry is cited exactly once-or-more through a contiguous list with one URL each, and the three corrected claims — the channel citation, the WCAG 2.2 AA baseline, and the Ghost $18/$15 first-party conflict — were each re-verified against the live page named for them.

Verdict: **`pass`**. Recommendations for the parent, none of which gates acceptance: (a) optionally fold R-1/R-2/R-3 into a later hygiene edit rather than reopening the rework; (b) apply the R-1 one-token fix if the §6 recommendation line is going to be quoted client-facing, since it is the same claim that F-1 was raised about; (c) update the `PROJECT_STATUS.md` P1.5/P1.7 rows and the Kanban cards from the parent side — this review did not write to either. The file `docs/01-business.md` is byte-identical before and after this review (`40214176…`).

## 12. Parent follow-up after the pass

After the reviewer returned `pass`, the parent applied all three non-blocking observations R-1–R-3: the channel sentence now cites the Business Profile/SEO sources at the exact claim, the Saintek process sentence cites the About page, and the deferred-segment source descriptions were made exact. The parent also split three over-cited prose sentences so no sentence carries more than three source IDs while retaining every source.

Post-follow-up verification on 2026-09-22:

- `docs/01-business.md` SHA-256: `ffd6f20ce86f7cedadd00f2ef6782d97cec9554884f42416367dd726227466b2`.
- 63 contiguous source IDs; one URL per source; 0 dangling citations; 0 orphan sources; 0 range citations; 0 sentences with more than three citations.
- Independent counts remain 8 competitors, exactly 2 segments, and exactly 3 packages.
- WCAG 2.2 AA baseline and the no-final-price statement remain present.
- A task-specific grounded-citation ledger was rebuilt in source order and matched all 63 normalized URLs; `sources.py verify --strict` returned `citations OK`.
- `git diff --check` returned clean.

These parent edits do not change the `pass` recommendation or any business decision; this addendum supersedes the pre-follow-up hash statement only for the final delivered file.
