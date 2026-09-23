# P3.4 — Independent review of `docs/03-ghost.md`

- **Task:** Kanban `t_9a59ddaf` (Phase 3, board `website-business`), profile `dsflash2`.
- **Subject:** `/root/Projects/website-business/docs/03-ghost.md` (413 lines, untracked, reviewed as of the working-tree state below).
- **Verdict:** **`changes_requested`** — the synthesis is substantively sound and its arithmetic, source structure, and execution boundary all verify, but two defects must be fixed before acceptance: one load-bearing citation points at a source that does not contain the claim it supports (F1), and one recorded factual conflict is left unattributed to the accepted deliverable that still carries the superseded figure (F2).
- **Subject-file discipline:** this review did not edit `docs/03-ghost.md` or any other file. The only file written by this task is `research/phase-3/review.md`. No Git command other than read-only inspection was run; no destructive Git command was run.
- **Evidence boundary:** this is a document-review task. Every finding below is backed by either (a) the live re-open of a cited URL on 2026-09-22, (b) a mechanical structural check whose script and output are stated, or (c) the two Phase 3 research artifacts and the accepted Phase 1 deliverable. No Ghost account, instance, theme, or API was exercised, and nothing in this review claims executed product behaviour.

## 1. Method

1. Read `AGENTS.md`, `PROJECT_STATUS.md`, `DECISIONS.md`, `docs/01-business.md`, `docs/03-ghost.md`, `research/phase-3/hosting-operations.md`, and `research/phase-3/themes-product-headless-backup.md` in full.
2. Parsed the Sources block mechanically (ID contiguity, one-URL-per-entry, duplicate URLs, dangling citations, orphan sources, citation ranges, per-sentence citation density), and verified Mermaid fence balance and the R1–R16 register row count.
3. Recomputed every published arithmetic figure, including the self-hosted component floor and the Ghost(Pro) billing-frequency pairs.
4. Re-opened **30 of the 59 cited source URLs** and inspected content for the specific claims they carry (list in §5.3), plus 2 uncited URLs used to test two claims, plus a live browser session on `ghost.org/pricing` toggling Monthly/Yearly billing.
5. Cross-read the two Phase 3 research artifacts claim-by-claim against the synthesis for dropped, altered, or contradicted statements.
6. Ran `git diff --no-index --check` against the review artifact after writing it.

## 2. Findings — defects, ordered by severity

### F1 — MEDIUM / must fix — the Portal/headless conflict is attributed to a source that does not contain half the claim

**Where:** `docs/03-ghost.md` lines **185** (capability table row "Portal"), **252** (the UNKNOWN paragraph), **327** (§9 conflict bullet).

**What is claimed:** that "a monorepo README documents external embedding" (line 185), that "the official monorepo README describes an external embed" (line 252), and that "the official Portal README describes an external embed" (line 327) — each cited `[38][42]`.

**Evidence (live re-open, 2026-09-22):**
- `[38]` = `https://ghost.org/help/customize-portal/` — full text re-read. It documents Portal as "the full membership experience … can be added to any Ghost site, using any theme, without needing to write code", the signup/look-and-feel/account settings, and Portal links (`#/portal`, `#/portal/signup`). It contains **no** statement about embedding Portal on pages outside Ghost and **no** reference to any repository README. `[38]` therefore supports the "Portal is the native UI" half of the row and none of the "external embed" half.
- `[42]` = `https://ghost.org/help/can-i-run-a-headless-site-with-ghost-pro/` — re-read. It contains exactly the Help-Center half: "Portal is not available to be used for subscription management with a headless setup". It does not document an external embed either.
- The document the synthesis actually names does exist and does say it — `https://raw.githubusercontent.com/TryGhost/Ghost/main/apps/portal/README.md` ("Alternatively, Portal can be enabled on pages outside Ghost by adding this script … `data-ghost` … is the only input Portal needs to work with your site's membership data via Ghost APIs") — but **that URL is not in the 59-entry Sources block**, and neither is the Ghost 5.0 breaking-change note that also documents the external embed, which *is* in the list as `[50]` (`https://docs.ghost.org/changes`, Portal section: "If you're embedding portal on an external site, you'll need to update your script tag … `data-ghost` … `data-api` … `data-key`").

**Concrete fix:** at all three sites replace `[38]` with `[50]` (the in-list source that documents the external embed), keeping `[42]` for the Help-Center statement; or add the monorepo README as a new numbered source and cite it. Do not leave an existing numbered source attached to a claim it does not contain — the two halves of this conflict are the document's headline "recorded, not smoothed over" item, so the evidence pointer has to be exact. Keep `[38]` only where the claim is the Portal UI/settings themselves (it is used correctly at line 194).

### F2 — MEDIUM / must fix — the Starter annual-price conflict is recorded but the accepted upstream deliverable that carries the superseded figure is never named

**Where:** `docs/03-ghost.md` lines **88** (FACT: annual-billed Starter $15) and **326** (§9 "Starter price rendering conflict"); against `docs/01-business.md` lines **70**, **78**, **141**, **282** and `research/phase-1/business-model.md` §12 L7 (recorded in `hosting-operations.md` conflict C1).

**Evidence (independently reproduced, 2026-09-22):**
- Live browser session on `https://ghost.org/pricing/`, audience slider at 1,000: **Yearly billing → Starter $15, Publisher $29, Business $199**; **Monthly billing → Starter $18, Publisher $35, Business $239**. This reproduces line 88 exactly, including the "Billed monthly"/"Billed yearly" labels.
- The automated text extractor, on the same URL and the same day, rendered Starter as "**$18** USD / mo — **Billed yearly**", which is exactly the artifact line 326 describes.
- So the underlying facts in the synthesis are correct and the conflict is real and reproducible, and the doc's choice of basis (live interaction over the extractor) is the defensible one.
- The gap: `docs/01-business.md` — an accepted Phase 1 deliverable with a `pass` verdict (`PROJECT_STATUS.md` line 17) — states as **FACT** "Ghost's official pricing page captured on 2026-09-22 lists Ghost(Pro) Starter at **$18/month** … on annual billing" (line 70), repeats the $18 line as the pricing-page figure at line 282, and both §3 and §4 already carry the same Publisher-floor constraint from the same page. `research/phase-3/hosting-operations.md` C1 explicitly declined to edit it ("Upstream artefact untouched"). The synthesis §9 bullet flags the page conflict but does not name the documents that carry the superseded annual figure, while §1.1 *does* set the precedent of naming an upstream correction ("The Ghost release-cadence observation in the hosting artifact is corrected here"). P4.1 (pricing) reads both documents.

**Concrete fix:** extend the line 326 bullet, in the same shape as §1.1, to state that `docs/01-business.md` §3/§4/§8 item 2 and `research/phase-1/business-model.md` §12 L7 carry the $18-annual Starter figure, that this synthesis uses the $15-annual live-toggle reading, and that the upstream figure is queued for correction at Checkpoint 1. This is a documentation-integrity fix inside `docs/03-ghost.md`; no edit to Phase 1 is required by this task.

### F3 — LOW / should fix — paraphrase drift on the Ghost(Pro) headless limitation

**Where:** `docs/03-ghost.md` line **225**: "…the need for a custom theme to avoid exposing **duplicate content** `[42]`".

**Evidence:** `[42]` reads "A headless setup requires a custom theme, to **not expose content to search**" (live re-open). The duplicate-content/noindex mechanism is `[41]`'s material — "you'll want to disable Ghost's default front-end to prevent duplicate content issues … enable 'Private Site Mode' … which will put a password on your Ghost install's front-end, disable all SEO features, and serve a `noindex` meta tag" (live re-open of `docs.ghost.org/jamstack`). The synthesis has merged two adjacent but distinct statements.

**Concrete fix:** reword to match the source, e.g. "…the need for a custom theme so the Ghost origin's content is not exposed to search `[42]`", and cite `[41]` if the duplicate-content framing is kept (it is already cited in the same paragraph).

### F4 — LOW / should fix — wrong source ID for the production-database facts

**Where:** `docs/03-ghost.md` line **112**: "MySQL 8 is the supported production database, while SQLite is development-only and MariaDB is unsupported `[2][3][11]`".

**Evidence:** `[11]` = `https://docs.ghost.org/faq/node-versions` — re-read in full; it is the Node support matrix (22.x Required; 20.x/21.x/23+ Unsupported; Ghost 6.0 removed Node 18 and 20) and contains no database content. The correct in-list source is `[12]` = `https://docs.ghost.org/faq/supported-databases` — re-read: "MySQL 8 is the only supported database in production", MariaDB → "strongly recommend migrating", SQLite3 → "full reinstall of Ghost". `[50]` (`docs.ghost.org/changes`) adds the precise qualification "SQLite3 is supported only in development environments". The claim itself is accurate; only the pointer is wrong, and the same sentence's stack half is correctly supported by `[2]` (live re-open: Ubuntu 22.04/24.04/26.04, Node 22 LTS, MySQL 8.0/8.4, NGINX, systemd, ≥1GB, non-root).

**Concrete fix:** `[2][3][12]` (optionally `+[50]` for the development-only qualifier).

### F5 — LOW / should fix — one uncited quantitative scope claim, and inconsistent per-row citation in the rebuild register

**Where:** `docs/03-ghost.md` line **239** (R7 row: "…adopt the documented Algolia path; define scope beyond **10,000 posts**") carries no citation, while the neighbouring R9 (line 241, `[55]`) and R10 (line 242, `[54]`) rows do, and the other 13 rows do not.

**Evidence:** the 10,000-post native-search scope and the Algolia path are documented at `https://docs.ghost.org/themes/search` (title + excerpt of "the most recent 10,000 posts"; Algolia CLI/functions for larger sites) and `https://github.com/TryGhost/algolia` — both present in `research/phase-3/themes-product-headless-backup.md` sources `[12]`/`[66]`, neither carried into the 59-entry list. The Help Center page in the list, `https://ghost.org/help/search/` (re-read), confirms search exists on all sites and `#/search`/`data-ghost-search`, but does **not** state the 10,000-post figure.

**Concrete fix:** add `docs.ghost.org/themes/search` as a numbered source and cite it on R7 (and on line 149 if the scope figure is repeated there), or drop the numeric scope claim from the row. Then make per-row citation use uniform — either cite every R row or cite none and support the register from the §6.1 paragraphs.

### F6 — LOW / provenance — the "Starter custom-theme correction" has no identifiable corrected statement in the repository

**Where:** `docs/03-ghost.md` line **92** ("Any older statement that Ghost(Pro) Starter supports uploading a custom theme is outdated or ambiguous") and line **344** ("The Starter custom-theme conflict is corrected in favour of the newer plan/Help Center evidence").

**Evidence:** the corrected position is **verified** (see §4.1). The correction *target* is not findable: a repository-wide search of `docs/` and `research/` for `Starter` shows every existing artifact already states the opposite — `docs/01-business.md` lines 70/78/141 ("Custom themes and paid subscriptions are unavailable on Starter and available from Publisher"), `research/phase-3/hosting-operations.md` §3 plan table ("Custom themes **No**" on Starter) and §10 item 2, `research/phase-3/themes-product-headless-backup.md` §6.4/§7.4 ("Only official themes can be used with the Starter plan"). The abandoned earlier lane (`t_0f05553f`) left no artifact in the tree, so a reader cannot tell what was corrected or from where.

**Concrete fix:** either name the source of the older statement, or reframe lines 92 and 344 as a clarification driven by newer, more specific evidence (plan table + Help Center) rather than as the correction of a statement that the repository does not contain.

## 3. Recommendations — no factual defect, not required for acceptance

1. **Line 46 compound citation.** "…while the client's owner still controls billing and the site account `[1]`" — `[1]` documents plan features; owner-only billing/plan/cancel is `[14]`/`[16]`. Add `[14]` or split the sentence.
2. **Name the documented mechanism in §6.1 criterion 3** (line 220). The criterion says "private-site/noindex or duplicate-content plan" without naming Private Site Mode or citing `[41]`; naming it makes the gate quotable in an SOW.
3. **Carry the hosting artifact's C5** (Help Center "20% discount … if you subscribe annually" vs observed 16.7%/17.1%/16.7% annual savings — recomputed here, see §4.6) into §9 if client-facing plan-cost language will be produced, since it is the same class of first-party pricing conflict as the Starter bullet.
4. **Extend §9.1 (line 338) with the research artifacts' own "not measured" items** that the synthesis inherits but does not restate: the §6.2 register is a structural count of documented behaviours, not a work estimate.
5. **Optional traceability:** several §4.1/§4.3 claims now rest on a narrower source set than the two research artifacts carried (e.g. §4.1 optional templates and helper inventory, §4.3 GScan behaviour). No unsupported claim was found, but adding the surviving artifact citations would keep future reviewers from having to repeat this trace.

## 4. Verified-correct items (the five specifically scoped corrections plus arithmetic)

### 4.1 Starter custom-theme correction — CORRECT

Lines 88–92, 106, 344. Live re-open of `[1]` (`ghost.org/pricing`, browser + extractor): plan table rows "Marketplace themes – No | Yes | Yes | Yes" and "Custom themes – No | Yes | Yes | Yes"; "Paid subscriptions – No" on Starter; "Custom sending domain – No" on Starter; "Admin API – No", "Webhooks – No", "Custom integrations – No" on Starter; "Registered members 1,000 | 1,000 | 10,000 | Unlimited"; "Newsletters 1 | 3 | 10 | Unlimited"; "Email Sends Unlimited"; "Uptime SLA No | No | No | 99.9%"; "Custom SSL certificate … + $50/mo" on Business. Live re-open of `[49]` (`ghost.org/help/installing-a-theme/`): "On Ghost(Pro), only official themes can be used with the Starter plan." The corrected position and every plan-limit figure in line 106 verify. Only the provenance of the corrected statement is open (F6).

### 4.2 Release-version correction — CORRECT

Line 28 and line 133. Live `GET https://api.github.com/repos/TryGhost/Ghost/releases/latest` returned `"tag_name": "v6.65.0"`, `"published_at": "2026-09-22T15:28:40Z"`, `prerelease: false` — exactly the figure and date the synthesis cites to `[51]`. The earlier `v6.38.0` page-capture ambiguity in `hosting-operations.md` C8 is therefore correctly treated as a capture artifact, and the doc's handling matches its own `themes-product-headless-backup.md` §7.3 correction (which cites the sibling artifact's GitHub-API evidence). Cadence statements at lines 133 and 135 were re-checked against `[5]`/`[6]`/`[11]`/`[12]`/`[50]` (breaking-change catalogue re-read: `?limit=all` removed with a 100-item page cap; Node 22 only; MySQL 8 only both dev and production).

### 4.3 Portal conflict — RECORDED, and correctly left UNKNOWN; evidence pointer defective (F1)

Lines 185, 252, 327. The substance verifies: `[42]` does say subscription management is unavailable in a headless setup, and the monorepo README does document an external embed. The synthesis does not resolve it, does not claim an untested flow, and flags "No live member or Stripe flow was tested". No Portal embed, no member sign-in, and no Stripe connection were exercised here either. The defect is the citation, not the conclusion.

### 4.4 Backups conflict — CORRECT, and resolved in the safe direction

Lines 124, 139, 329. Live re-opens: `[1]` platform table lists "Automated backups | Yes" on every plan; `[15]` states "As Ghost(Pro) is a managed service, you don't need to worry about data backups" while also stating archives "are not provided for service continuity and are not provided as backups" and cannot be provided after cancellation; `[21]` Terms 2.1 states "**You are solely responsible for securing and backing up Your Content**". All three sides are quoted accurately, and the doc's operational instruction (define who retains exports, how often, whether a restore has been tested; never imply the marketing row is a tested recovery guarantee) follows from the evidence. Verified as a genuine first-party conflict, not an authoring error.

### 4.5 Self-hosted $72 component arithmetic — CORRECT

Line 114. Live re-open of `[2]` (`docs.ghost.org/hosting.md`) shows the comparison table verbatim: self-hosting base hosting "From **$10**/mo", "Global CDN & WAF … From **$20**/mo", "Email newsletter delivery … From **$15**/mo", "Analytics platform … From **$10**/mo", "Full site backups … From **$5**/mo", "Image editor … From **$12**/mo", with Ghost(Pro) listed as "From **$15**/mo" base plus Included on the rest.

- Recomputed total: 10 + 20 + 15 + 10 + 5 + 12 = **$72** → matches "a **$72/month** advertised component floor".
- Recomputed delegated lines excluding base hosting: 20 + 15 + 10 + 5 + 12 = **$62** → matches "the delegated lines excluding base hosting total **$62/month**".
- Recomputed VPS share: 10 / 72 = **13.89%** → matches "only about **14%** of that $72 component floor" (line 116), and the claim that neither figure is a quote or a complete operating cost is supported by the same table, which lists 24/7 on-call and enterprise-grade security as "Not available" for self-hosting.
- The artifact's inherited correction also holds: the delegated lines do not sum to Phase 1's "roughly $57+/mo" (`hosting-operations.md` C7), and the synthesis correctly uses $62 without copying $57 forward.

### 4.6 Remaining arithmetic recomputed

- Ghost(Pro) annual-vs-monthly saving at the 1,000-member band: Starter 15/18 = **16.7%** lower yearly, Publisher 29/35 = **17.1%**, Business 199/239 = **16.7%** — reproduces `hosting-operations.md` C5 and shows line 88's two price columns are internally consistent with the live page.
- Audience ladder (lines 98–102, 104) matches `hosting-operations.md` §3 exactly at every band (Starter $15 flat; Publisher $29/$46/$88/$141/$274; Business $199/$199/$199/$266/$399; monthly at 100k $329/$479; "Over 100,000 members? Reach out to our team" at the final slider position) — re-confirmed against the live pricing page's slider and card structure.
- `[1]`'s "one, three, fifteen, or unlimited staff users; one, three, ten, or unlimited newsletters" (line 106) matches the live table.

## 5. Coverage matrix — required Phase 3 deliverables

| Required deliverable | Where in `docs/03-ghost.md` | Status |
|---|---|---|
| Native-theme architecture default, per `AGENTS.md`/D-004 | §1 (16, 22), §2.1, §6.4, §10 (342) | Present; verified |
| Ghost(Pro) full-stack costs and duties | §3.1 (88–108), §7.5 | Present; verified |
| Self-hosting full-stack costs and duties | §2.2, §3.2 (112–129), §3.3, §7.3 | Present; verified |
| Packages and maintenance boundaries | §7.1–§7.4 | Present; no final prices claimed |
| Memberships, Portal, newsletters, transactional + bulk email, Stripe, APIs | §5 table (181–192), §5.1 (204–210) | Present; F1 on the Portal pointer |
| Headless limitations and decision criteria | §6.1 (216–225), §6.4, R1–R16 (231–248) | Present; R1–R16 = 16 rows verified; F3, F5 |
| Ownership, offboarding, backups, updates, security | §3.3 (131–141), §8 (310–320) | Present; verified |
| Reusable theme strategy (not multi-tenant) | §4.2 (157–163) | Present; consistent with `AGENTS.md`/D-001 |
| GScan and validation workflow | §4.3 (165–177) | Present; verified against `[33]`; no run claimed |
| Diagrams | §2.1, §2.2, §2.3 | 3 Mermaid blocks, fences balanced (open 34/50/69, close 44/63/80) |
| Explicit execution boundary | §1.1 (24–28), §9.1 (336–338) | Present; no test claimed as executed |
| Governance alignment | §1 (20), §7.4, §7.5, §9 | Consistent with D-001/D-003/D-004, `AGENTS.md`; nothing authorizes spend or deployment |

## 6. Citation and structural audit

### 6.1 Mechanical results (script: `~/.hermes/profiles/dsflash2/cache/scratch/p34_check.py`, `…/p34_check2.py`)

| Check | Result |
|---|---|
| Source entries | 59; IDs contiguous **1–59** |
| URLs per entry | exactly 1 for all 59; **0** duplicate URLs |
| Dangling citations (cited ID absent from Sources) | **0** |
| Orphan sources (listed but never cited) | **0** |
| Citation ranges (`[1-3]`) | **0** |
| Max citations in one sentence | **3** (nine sentences use exactly 3; none exceed 3) |
| Mermaid fences | 3 openings / 3 closings, correctly paired |
| R-register rows | R1–R16, **16** rows |
| HTTP probe of all 59 source URLs | **59/59 HTTP 200**, 0 non-200 |
| Execution claims | none — every mention of testing/measurement is either negated ("did not run GScan", "This sequence was not executed") or explicitly future/pilot-bound |

Cross-artifact source counts for context: `hosting-operations.md` 39/39 cited, 0 dangling, 0 orphans; `themes-product-headless-backup.md` 83/83 cited, 0 dangling, 0 orphans (both re-parsed here, matching their self-reported checks).

### 6.2 Spot-check method

Exactly 30 of the 59 cited source IDs were re-opened and read for the specific claim they carry (not merely for a 200): `[1]`, `[2]`, `[9]`, `[11]`, `[12]`, `[14]`, `[15]`, `[16]`, `[17]`, `[18]`, `[19]`, `[20]`, `[21]`, `[23]`, `[28]`, `[30]`, `[32]`, `[33]`, `[35]`, `[37]`, `[38]`, `[41]`, `[42]`, `[43]`, `[44]`, `[49]`, `[50]`, `[51]`, `[55]`, `[59]` — plus a live browser session on `[1]` toggling both billing frequencies, plus two **uncited** URLs used only to test whether two claims were attributable at all (`https://raw.githubusercontent.com/TryGhost/Ghost/main/apps/portal/README.md` and `https://ghost.org/help/search/`). All 30 matched the claim they were cited for except the three items recorded as F1, F3 and F4.

### 6.3 Artifact hygiene

- `git diff --no-index --check /dev/null research/phase-3/review.md` → no whitespace errors (non-zero exit is expected for a new untracked file).
- `git status --short` after this task: `docs/03-ghost.md`, `pocs/`, `research/phase-2/`, `research/phase-3/` remain untracked; no tracked file was modified, nothing was staged, committed, or pushed.

## 7. Acceptance decision

**`changes_requested`.**

Required before acceptance (both are one-line-to-one-paragraph fixes inside `docs/03-ghost.md`):

1. **F1** — replace `[38]` with `[50]` (or add the monorepo README as a numbered source) at lines 185, 252 and 327 so each half of the Portal/headless conflict points at a source that actually contains it.
2. **F2** — extend the line 326 bullet to name `docs/01-business.md` §3/§4/§8 item 2 and `research/phase-1/business-model.md` §12 L7 as the documents that still carry the superseded $18-annual Starter figure, in the same form as the §1.1 upstream correction.

Recommended but not blocking: **F3** (reword line 225 to the source's "not expose content to search"), **F4** (line 112 → `[2][3][12]`), **F5** (cite the search-scope source and make R-row citation use uniform), **F6** (name or reframe the Starter correction target), plus the §3 recommendations.

What already passes and should not be reworked: the native-theme default and headless gate, both responsibility models and the $72/$62/14% self-hosted stack arithmetic, the Ghost(Pro) plan facts and audience ladder, the memberships/Portal/Stripe/newsletter/API ownership and secret boundaries, the R1–R16 register, ownership/offboarding/export/cancellation content, the licensing statements, the three diagrams, the 59-source citation structure (contiguous, complete, all resolving), the no-execution boundary, and every conflict register entry except F1's pointer.
