# P3.5 — Final re-review of `docs/03-ghost.md`

- **Task:** Kanban `t_15bc9efb` (Phase 3, board `website-business`), profile `dsflash`.
- **Subject:** `/root/Projects/website-business/docs/03-ghost.md` — 414 lines, 60 numbered sources, sha256 `cb7792960bf7055b04482261dd7e8bcbe7c2c4b9ffcfdfe6b89478e7e87e7a7c` (supersedes the reviewed revision's `8a15e05…`, 413 lines, 59 sources).
- **Prior verdict under review:** `changes_requested` in `research/phase-3/review.md` (task `t_9a59ddaf`), findings F1–F6.
- **Verdict:** **`pass`** — both mandatory findings (F1, F2) are resolved against the exact current lines and re-opened source content, all six findings' recommended fixes are either adopted or resolved in an equivalent form, and no new unsupported claim, execution overclaim, or mechanical citation defect was introduced.
- **Subject-file discipline:** this task wrote only `research/phase-3/final-review.md`. No edit to `docs/03-ghost.md` or any other file. No Git write, no destructive Git command.
- **Evidence boundary:** document review only. Every statement below is backed by (a) a live re-open of a cited URL on 2026-09-22, (b) a mechanical check whose script path and output are stated, or (c) a named repository artifact at a named line. Nothing here claims executed Ghost product behaviour.

## 1. Method (fresh-eyes, this session)

1. Read `AGENTS.md`, `docs/03-ghost.md` (full, 414 lines), `research/phase-3/review.md` (full), and the two Phase 3 research artifacts.
2. Re-ran the mechanical audit with a new script, `~/.hermes/profiles/dsflash/cache/scratch/p35_check.py` (structure, bijection, contiguity, ranges, per-sentence density, Mermaid balance, R-register count), plus a full-coverage URL probe `…/p35_probe.py` (60/60, all IDs, no sampling).
3. Live re-opened the sources named by the task (Portal, pricing, database, headless, search) plus the two sources carrying the corrected citations, and inspected content for the specific claim each carries: `[1]`, `[2]`, `[12]`, `[14]`, `[38]`, `[42]`, `[50]`, `[60]`.
4. Ran a live browser session on `https://ghost.org/pricing` at the 1,000-member band, toggling **Yearly billing → Monthly billing**, and read the rendered cards from the DOM.
5. Recomputed the published arithmetic from the live `[2]` comparison table and the live `[1]` price pairs.
6. Re-read the corrected regions for new unsupported claims and for any execution overclaim, including a grep sweep for affirmative execution language.
7. Ran `git diff --check` on this report after writing it.

## 2. Finding-by-finding verification

| # | Severity (prior) | Required fix | Current state | Exact evidence | Status |
|---|---|---|---|---|---|
| **F1** | MEDIUM / must fix | Replace `[38]` with `[50]` (or add the monorepo README) at lines 185, 252, 327 so each half of the Portal conflict points at a source that contains it | All three sites now cite `[42][50]`; `[38]` no longer carries any embed claim anywhere in the document | Line 185 (`[42][50]`); line 252 (`[42][50]`); line 327 (`[42][50]`); `[38]` survives only at line 194 ("Portal provides the member UI and account/subscription screens `[37][38]`") | **Resolved** |
| **F2** | MEDIUM / must fix | Name the upstream accepted deliverables that still carry the superseded $18-annual figure | Line 326 now names them explicitly and states the basis used and the queued correction | Line 326: "`docs/01-business.md` §§3–4 and §8 item 2, plus `research/phase-1/business-model.md` §12 L7, still carry the superseded $18-annual figure; this synthesis uses the $15-annual live-toggle reading and queues the upstream figure for correction at Checkpoint 1" | **Resolved** (one precision nit, §3.1 below) |
| **F3** | LOW / should fix | Reword line 225 to the source's "not expose content to search" | Reworded verbatim to the source's meaning | Line 225: "…the need for a custom theme so the Ghost origin's content is not exposed to search `[42]`" ↔ live `[42]`: "A headless setup requires a custom theme, to not expose content to search." | **Resolved** |
| **F4** | LOW / should fix | Line 112 → `[2][3][12]` (optionally `+[50]`) | Corrected exactly as proposed | Line 112 now ends `…MariaDB is unsupported [2][3][12]`; the wrong ID `[11]` is gone from that sentence and remains only at line 133, where it is the correct Node-support source | **Resolved** (the optional `[50]` addition was not taken; non-blocking) |
| **F5** | LOW / should fix | (a) add the search-scope source and cite R7; (b) make R-row citation use uniform | (a) done: source `[60]` added and cited; (b) not done | Line 239: "…adopt the documented Algolia path; define scope beyond 10,000 posts `[60]`"; sources line 414: `[60] https://docs.ghost.org/themes/search — Ghost developer docs — Search`. The page does contain both facts (raw HTML fetch: "The post title and excerpt are used to search post content from the most recent 10,000 posts"; "more than 10,000 posts … we recommend using Algolia"; Algolia CLI / Netlify Functions sections). Citation density across the register remains 3 cited rows (R7 `[60]`, R9 `[55]`, R10 `[54]`) out of 16 | **Substantively resolved**; clause (b) residual, non-blocking (§3.2) |
| **F6** | LOW / provenance | Name the corrected statement's source, or reframe as a clarification from newer specific evidence | Reframed, second option | Line 92 is now `**CLARIFICATION:**` ("The current, specific plan-table and Help Center evidence controls this recommendation…") and line 344 reads "The Starter theme boundary is **clarified from** the current plan/Help Center evidence", dropping the unlocatable "correction target" framing | **Resolved** |

Non-finding recommendations from the prior review: **§3 rec 1 adopted** (line 46 now cites `[14]`, verified: `[14]` states "Only the site owner is able to access this page" and "Only the owner user of a Ghost(Pro) site has access to update billing information, or change plans"). Recs 2–5 remain open by design (line 220 still says "private-site/noindex or duplicate-content plan" without naming Private Site Mode `[41]`) — recommendations only, correctly not treated as acceptance conditions.

## 3. Residual observations (recorded, not acceptance-blocking)

### 3.1 F2's pointer is slightly over-broad — §4 of `docs/01-business.md` carries no price figure

Line 326 says §§3–4 plus §8 item 2 carry the superseded $18-annual figure. Verified carrier locations: `docs/01-business.md:70` (inside §3, "**FACT:** … lists Ghost(Pro) Starter at **$18/month** … on annual billing"), `docs/01-business.md:282` (inside §8's "Limitations and verification boundary" list, item 2, "listed Starter at $18/month billed yearly"), and `research/phase-1/business-model.md:352` (§12, label `L7`, "$18/mo billed yearly"). §4 of `docs/01-business.md` (lines 104–163) contains no price figure at all; its only Starter statement is the plan-tier constraint at line 141, which is not superseded. Also, §8 contains two numbered lists, so "§8 item 2" resolves to the $18 text only under the "Limitations and verification boundary" list (its item 2 under "Minimum viable requirements" is liability/insurance). No factual error is created — the named figure is findable in §3 and §8 — but "§§3–4 … §8 item 2" would be sharper as "§3 (line 70) and §8 limitations item 2 (line 282)". Recommended tightening only.

### 3.2 F5 clause (b) not adopted — R-row citation use is still non-uniform

Three of sixteen rows carry citations (R7, R9, R10) and thirteen do not. This was a LOW "should fix" clause, explicitly alternative ("either cite every R row or cite none"), and it does not affect the correctness of any row's content. Carried forward as an editorial consistency item, not a defect.

### 3.3 F4's optional `[50]` qualifier not taken

Line 112 states "SQLite is development-only"; the exact "supported only in development environments" wording lives in `[50]` and is implied by `[12]` (a production-databases FAQ that directs SQLite users to a full reinstall). The sentence's citation set (`[2][3][12]`) supports the claim as a whole; adding `[50]` would make the qualifier exact. Recommended tightening only.

## 4. Mechanical verification (all re-run this session)

| Check | Result |
|---|---|
| Source entries | **60**; IDs contiguous **1–60** |
| URLs per entry | exactly 1 for all 60; **0** duplicate URLs |
| Dangling citations (cited ID absent from Sources) | **0** |
| Orphan sources (listed, never cited) | **0** — `[60]` is cited at line 239 |
| Citation ranges | **0** |
| Max citations in one sentence | **3**; nine sentences use exactly 3; none exceed 3 |
| Mermaid fences | 3 openings / 3 closings, paired |
| R-register rows | R1–R16 = **16** rows, lines 233–248 |
| Live HTTP probe of all 60 source URLs | **60/60 HTTP 200**, 0 non-200 (`…/p35_probe.py`) |
| Stale counts in prose | none — no line refers to a 59-source block; `[59]` (line 320) and `[60]` (line 239) are distinct sources |
| `git diff --check` on this report | clean (no whitespace errors) |

Arithmetic recomputed from the live `[2]` component table (self-hosting: base `$10`, global CDN & WAF `$20`, email newsletter delivery `$15`, analytics platform `$10`, full site backups `$5`, image editor `$12`):

- 10 + 20 + 15 + 10 + 5 + 12 = **$72** ↔ line 114 "**$72/month advertised component floor**" ✓
- 20 + 15 + 10 + 5 + 12 = **$62** ↔ line 114 "the delegated lines excluding base hosting total **$62/month**" ✓
- 10 / 72 = **13.89%** ↔ line 116 "about **14%** of that $72 component floor" ✓
- Ghost(Pro) annual-vs-monthly gap: 15/18 = **16.7%**, 29/35 = **17.1%**, 199/239 = **16.7%** — internally consistent with line 88's two price columns ✓

Live price reproduction (browser session, 1,000-member band, 2026-09-22): **Yearly billing → Starter $15 / Publisher $29 / Business $199**; after clicking **Monthly billing → Starter $18 / Publisher $35 / Business $239**. This matches line 88 exactly. On the same day the non-rendering text extractor returned Starter "**$18** USD / mo — **Billed yearly**", which independently reproduces the extractor artifact that line 326 records. So F2's underlying conflict is real, the doc's chosen basis is the defensible one, and line 88's figures are correct as stated.

## 5. Re-opened sources and what each one settled

| Source | Re-opened | Confirms |
|---|---|---|
| `[50]` `docs.ghost.org/changes` | yes, full text | Ghost 5.0 "Portal" section: "If you're embedding portal on an external site, you'll need to update your script tag … `data-ghost` … `data-api` … `data-key`" — the in-list source that actually documents the external embed (F1) |
| `[42]` headless Ghost(Pro) Help Center | yes, full text | "Portal is not available to be used for subscription management with a headless setup"; "A headless setup requires a custom theme, to not expose content to search"; ghost.io View-in-Browser / unsubscribe links; loss of the Fastly CDN (F1 half 1, F3) |
| `[38]` `ghost.org/help/customize-portal` | yes, full text | Portal settings/links/account UI only — **no** external-embed statement and **no** README reference; confirms the mis-citation is gone and that `[38]`'s remaining use at line 194 is correct |
| `[60]` `docs.ghost.org/themes/search` | yes, raw HTML | "most recent 10,000 posts"; "more than 10,000 posts … we recommend using Algolia"; Algolia CLI / Netlify Functions workflow (F5a) |
| `[12]` supported databases | yes, full text | MySQL 8 for production/dev; MariaDB "strongly recommend migrating"; SQLite3 "full reinstall of Ghost" (F4) |
| `[2]` `docs.ghost.org/hosting` | yes, full text | component table (all six lines), the supported stack list (Ubuntu 22.04/24.04/26.04, Node 22 LTS, MySQL 8.0/8.4, NGINX, systemd, ≥1 GB, non-root), "Clustering or sharding is not supported", docker path labelled a preview (lines 65, 112–114, 129) |
| `[14]` manage your subscription | yes, full text | owner-only billing/plan/cancel access; "publishing content within Ghost Admin will be temporarily disabled" over the member limit; cancellation deletes site and account at end of billing cycle (line 46 as corrected, line 106, line 316) |
| `[1]` `ghost.org/pricing` | yes, browser + extractor | plan table rows quoted at lines 88, 90, 92, 106; Custom-only 99.9% SLA (line 328); the $18/"Billed yearly" extractor rendering recorded at line 326 |

## 6. New-defect scan

- **New unsupported claims:** none found. The three edited regions map 1:1 to re-opened source text: line 185/252/327 → `[42]`+`[50]`; line 225 → `[42]`; line 239 → `[60]`; line 326's upstream attribution → `docs/01-business.md:70/282` and `research/phase-1/business-model.md:352`, all read directly. The new source `[60]` is a first-party Ghost developer doc with a resolving URL and a matching title.
- **New execution overclaims:** none. The boundary text is intact at lines 26, 137, 177, 252, 327 and §9.1 (line 338); every measurement/permission statement in the document is still either negated ("This sequence was not executed", "did not run GScan", "No live member or Stripe flow was tested") or explicitly future/pilot-bound. No Ghost account, theme run, API call, or deployment is claimed anywhere.
- **Claims now attributed that were not before:** line 92 was downgraded from an assertion about an unlocatable "older statement" to a `**CLARIFICATION:**`; line 326 adds an explicit basis statement and a named correction queue. Both are narrower, not broader, than the prior revision.
- **Governance:** nothing in the document authorizes spend, account creation, DNS change, or deployment; §9/§10 keep every recommendation provisional to Checkpoint 1, consistent with `AGENTS.md` and D-001/D-003/D-004.

## 7. Verdict

**`pass`.**

Both mandatory findings are closed at the exact lines named by the prior review (F1 at 185/252/327 with `[42][50]`, verified against the live breaking-changes page that does contain the external-embed statement; F2 at 326, with the carriers verified at `docs/01-business.md:70`, `docs/01-business.md:282`, and `research/phase-1/business-model.md:352`), the four recommended findings are adopted or equivalently resolved, and the mechanical audit is clean at the new 60-source scale: contiguous IDs 1–60, zero dangling, zero orphans, zero ranges, max 3 citations per sentence, 3/3 balanced Mermaid fences, R1–R16 = 16 rows, 60/60 URLs HTTP 200, and the $72 / $62 / 13.89% arithmetic plus the $15/$29/$199-versus-$18/$35/$239 price pairs reproduced live. Three residual editorial items (§3.1 pointer precision, §3.2 R-row citation uniformity, §3.3 optional `[50]` qualifier) are recorded above as recommended tightenings and are not acceptance-blocking.

Next decision point is the owner's Checkpoint 1: the only remaining action this review identifies is the queued upstream correction of the $18-annual Starter figure in `docs/01-business.md` and `research/phase-1/business-model.md`, which line 326 now records and this review confirms is real.
