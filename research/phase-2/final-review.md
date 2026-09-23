# P2.9 — Final re-review of the corrected Phase 2 CMS synthesis

Review date: 2026-09-23 (UTC). Reviewer pass: independent final acceptance gate (read-only) on the P2.8 corrections.
Reviewed subject: `docs/02-cms.md`, 354 lines, sha256 `23d5ee09c409678c9402f318d25090494fb3e93bc2be6a1d84a482a35b83f9fd` (unchanged by this review); also `research/phase-2/poc-storyblok.md` (232 lines, sha256 `822a891ea87d2f16d9ad495b52f743ac2842339b8ac9f4242e0933e61b8e71ed`), `research/phase-2/review.md`, `research/phase-2/poc-emdash.md`, and the machine-readable POC evidence named in the task card.
Verdict: **pass**

## 1. Result

All four P2.7 findings (F-1 high, F-2 medium, F-3 medium, F-4 low) are resolved in the current line text, and every correction is supported by the evidence I re-checked independently rather than by the correction's own prose. No new **acceptance-blocking** contradiction was found: every price, seat count, plan gate, scenario, POC status, and citation in `docs/02-cms.md` verifies. Four new observations are recorded in §5 — one MEDIUM documentation defect (D-1: the *POC report's* §7 artifact-hash table is stale relative to the evidence tree it indexes) and three LOW wording/durability items. D-1 changes no claim in the synthesis, no price, no gate and no POC status, and the authoritative integrity mechanism (the manifest) passes; it is therefore not acceptance-blocking, but it must be fixed by the POC-report owner (§5).

Two boundaries deliberately survive this review and are not defects: Storyblok's *product* remains unmeasured (all 22 protocol criteria blocked at the account gate), and Starter's commercial suitability for an agency-managed client site remains `UNKNOWN` pending written vendor confirmation. The document states both explicitly and conditions its recommendations on them.

## 2. Method and what I re-checked myself

| Check | How | Result |
|---|---|---|
| Seat arithmetic, one/two/three total seats | Python re-derivation from the price constants (monthly list prices, 1/5/20 sites, annual at 20) | 0 mismatches; full table in §4.1 |
| Every displayed §7 cost cell | Parsed §7.1–§7.3 tables and re-derived each cell from its seat shape | 76 numeric cells (57 monthly + 19 annual) + 2 custom-quote rows; 0 mismatches |
| Storyblok pricing, seats, scheduling, plan gates | Live retrieval of `https://www.storyblok.com/pricing` on 2026-09-23 | All load-bearing rows confirmed (§4.3) |
| Sanity pricing, roles per plan, scheduling, custom roles | Live retrieval of `https://www.sanity.io/pricing` including the full comparison table on 2026-09-23 | Confirmed (§4.3) |
| Storyblok terms (F-2 basis) | Live retrieval of `https://www.storyblok.com/legal/terms`; sections 1–12 from the page text and 13–16 read verbatim through direct DOM access | Confirmed; nothing in §13–§16 or in §14's fifteen self-service clauses resolves the agency-managed client-site case (§4.4) |
| Storyblok space ownership / transfer | Live retrieval of `https://www.storyblok.com/docs/manuals/spaces` | Confirmed (§4.5) |
| POC operation totals and gates | Parsed `operations.jsonl`, `summary.json`, `harness-checks.json`, mock transcript directly | Confirmed (§4.2) |
| Evidence integrity | `sha256sum -c` on both manifests; sha256 of EmDash `operations.jsonl`; every hash prefix quoted in `poc-storyblok.md` §7 and every full hash in `poc-emdash.md` re-computed against the files | Manifests 194/194 OK and 17/17 OK; EmDash hash matches `docs/02-cms.md:41`; **Storyblok report hash table shows 7 of 13 stale prefixes → D-1** (§4.2, §5) |
| Citations and local references | Local parser over `docs/02-cms.md` | 49 sources, 49 cited, 0 dangling, 0 orphan, 0 ranges, 0 duplicate URLs; all repo-relative path references resolve (§4.6) |
| Mermaid decision tree | Fence balance, node-id uniqueness, edge-target resolution, terminal branches | One balanced mermaid fence, 15 unique nodes, all edge targets defined, 5 terminal branches all routing to the O1–O10 gate node (§4.7) |
| Unsupported test claims | Targeted sweep for vendor-proof language | No account-gated or paid behaviour represented as tested (§4.8) |
| Report hygiene | `git diff --check` (tracked files) and `git diff --no-index --check /dev/null research/phase-2/final-review.md` | Clean, no whitespace diagnostics (§4.9) |

Verification code: `/root/.hermes/profiles/dsflash3/cache/scratch/p29_verify.py` (seat arithmetic, required literals, F-1…F-4 anchors), `p29_citations.py` (source-list and citation bijection, Mermaid, local path resolution), `p29_evidence.py` (Mermaid structure + POC JSON/transcript counts), `p29_cells.py` (re-derivation of every displayed §7 cell), `p29_hashes.py` and `p29_emdash_hashes.py` (evidence-index hash cross-check → D-1). All were run in this session; their outputs are the figures quoted in §4.

## 3. Finding-by-finding resolution matrix

### F-1 — High: Starter price for the stated seat configurations — **RESOLVED**

Required correction: state that Starter is $0 for one total user; one client editor plus one agency seat is $15/month; two client editors plus agency is three seats and requires Growth at $99/month; keep any alternate one-editor case on its actual seat shape; at 1/5/20 sites the two-person Starter case is $15/$75/$300 per month and $3,600/year at 20 sites.

| Required statement | Where it now appears | Text observed |
|---|---|---|
| Starter $0 is for **one** total seat | `docs/02-cms.md:105` | "Starter is $0 only for one total seat" |
| One client editor + agency = two people = $15 | `docs/02-cms.md:14`; `:100` | "$15/month, not $0, because its one included seat is followed by a $15 second seat"; "costs $15/month on Starter (one included seat plus one $15 additional seat), not $0" |
| Defined B (two editors + agency = three) requires Growth $99 | `docs/02-cms.md:14`; `:100`; `:146`; `:253` | "Storyblok Growth at $99/month per site (five seats included)"; table row "Storyblok Growth (3 users exceed the Starter cap)" |
| Two-person alternative priced at its real shape | `docs/02-cms.md:152`, `:169` | "**$15/$75/$300 per month**, and **$3,600/year at 20 sites**"; sensitivity note repeats both and the $84/site delta |
| No residual $0-for-two-people claim | `:105`, `:134`, `:152`, `:169`, `:250-252` | `:134` scenario-A row is explicitly labelled "Storyblok Starter (one seat; …)"; the decision tree branches on "One client editor + agency seat (2 total)" → "$15/month (1 included + 1 paid seat)" |
| Price constants themselves | `docs/02-cms.md:117` | "Starter includes one seat with a two-seat maximum" |

Independent evidence (2026-09-23): `https://www.storyblok.com/pricing` → Starter card "Includes 1 team member seat, add 1 more user at $15.00 /month"; comparison table "Costs per additional seat — Starter $15.00", "Users/Seats Maximum — max 2"; Growth "$99.00 /mo", "5 user seats included", "max 10"; extra seat $15.00 on both plans. Source IDs used by the document: `[13]` (`docs/02-cms.md:310`), backed by `[35]`.
Recomputed arithmetic agrees exactly: $15 → $15/$75/$300 monthly and $3,600/year at 20 sites; $99 → $99/$495/$1,980 and $23,760/year; $45 (three Sanity seats) → $45/$225/$900 and $10,800/year; $30 (two Sanity seats) → $30/$150/$600 and $7,200/year. The step between the two Storyblok seat shapes is $84/site/month, as stated at `:169`.

### F-2 — Medium: Starter commercial suitability qualified — **RESOLVED**

| Required correction | Where it now appears |
|---|---|
| Commercial use marked `UNKNOWN` pending confirmation | `docs/02-cms.md:14` ("**Commercial suitability is UNKNOWN**: do not propose or use Starter for client production unless Storyblok confirms this use in writing"), `:100`, `:152`, `:266` |
| Commercial-use check an explicit precondition to proposing Starter | `docs/02-cms.md:100` ("Obtain written vendor confirmation before proposing or using Starter for client production"), `:101`, `:169`, `:284` (follow-up item 2: "Resolve Starter commercial suitability and authorize testing separately") |
| Trial/no-card point kept separate from suitability evidence | `docs/02-cms.md:101` ("That product test does not resolve Starter's commercial-use ambiguity"), `:284` |
| Terms source added and cited | `docs/02-cms.md:346` `[49]` `https://www.storyblok.com/legal/terms`; cited at `:14`, `:100`, `:101`, `:105`, `:152`, `:169`, `:266`, `:284` (no orphan source) |

Independent evidence (2026-09-23, first-party): pricing page Starter is titled "Limited plan for testing and personal projects" while the page headline reads "Free to go live" and FAQ 03 says a user can "continue building on the Starter plan, which is always free and requires no credit card" — i.e. conflicting signals, exactly as characterised. Terms: §1.2 allows self-service sign-up "directly or indirectly on behalf of an organization"; §3.5 grants use "for its own internal business purposes"; §3.11(ii) forbids to "transfer, sell, resell, license, sublicense, distribute, rent, lease, make available, offer or otherwise commercially exploit any Storyblok Services or act as a reseller"; §3.11(viii) and §14.2 bar self-service accounts using an Organization's domain where that Organization is an Enterprise Plan Customer. I read **§14.1–§14.15 in full** (self-service fees, billing, availability, backups, references, liability, termination) and found no clause that resolves whether an agency may operate a **client's** commercial site on Starter. The document's negative claim therefore holds, and its conservative remedy (UNKNOWN + written confirmation) is the correct posture. Note also §14.11 "Storyblok does not create or provide any back-ups of Customer data", consistent with the document's Premium/Elite backup gate at `:59`, `:225`, `:271`.

### F-3 — Medium: scheduled publishing separated from release management — **RESOLVED**

| Required correction | Where it now appears |
|---|---|
| Do not call ordinary scheduling universally non-self-serve | `docs/02-cms.md:15` ("Ordinary scheduled publishing is available on self-serve tiers: Storyblok Growth/Growth Plus list two scheduled single stories, and Sanity Growth lists Scheduled drafts"), `:237`, `:271` |
| Scenario C reasoning names the real gate | `docs/02-cms.md:109` (release/workflow requirement "means more than ordinary scheduled publishing … so those self-serve features alone do not trigger an upgrade"), `:111` ("Quote the applicable higher tier for those actually gated requirements; ordinary scheduled publishing alone is not a quote trigger") |
| Concrete plan limits stated | `docs/02-cms.md:15`, `:111` (two scheduled single stories; 30/180/unlimited retention) |
| Only genuine higher-tier requirements presented as quote drivers | `docs/02-cms.md:111` (Storyblok custom roles/workflows/Release Management/environments/managed backups = Premium/Elite; Sanity custom roles/user attributes/content resources/audit/history/managed backups = Enterprise) |
| Reconciled in exec recommendation, scenario C, and risks | `:15` (exec), `:109-111` (scenario C), `:271` (risk 6; the old `:266` grouping is gone) |

Independent evidence (2026-09-23): Storyblok comparison table — "Scheduled Single Stories": Starter `—`, Growth 2, Growth Plus 2, Premium 100, Elite 100; "Custom Roles": Premium 10 / Elite Unlimited; "Custom Workflows": 2 / Unlimited; "Environments": Premium and Elite only; "S3 Backup Frequency": Premium Weekly / Elite Daily; "Managed Backup Frequency & Retention": Premium "Weekly, 180 days" / Elite "Daily, 7 years"; retention row "1 day (Starter) / 30 days (Growth, Growth Plus) / 180 days (Premium) / Unlimited (Elite)". Sanity comparison table — "Scheduled drafts": Free not included, Growth included; "# roles available": Free 2, Growth 5; "Custom roles": Enterprise only; "Content releases (add-on)" and "Review Changes: Complete history": Growth not included, Enterprise included. Both platform statements at `:15` and `:111` are therefore accurate, including the "Growth/Growth Plus list two" detail.

### F-4 — Low: Storyblok harness H10 request count — **RESOLVED**

| Item | Value observed now | Location |
|---|---|---|
| POC narrative, harness table | "local mock served **8** requests, versions seen `draft` + `published`, token parameter present on **all**; **1** unauthenticated probe correctly refused 401" | `research/phase-2/poc-storyblok.md:50` |
| POC narrative, evidence index | "8 client requests, `version=draft|published`, token presence, 1× 401" | `research/phase-2/poc-storyblok.md:197` |
| Machine record | `check_id: H10`, `status: pass`, `evidence_class: harness`, `observed_values.requests_served: 8`, `requests_rejected_401: 1`, observable text "mock CDN served 8 requests … 1 unauthenticated request(s) were rejected with 401" | `pocs/phase-2/storyblok/evidence/run-01/harness-checks.json:234-246` (values at `:239-240`) |
| Raw transcript | 9 records: 8 × `response_status: 200` (6 `published`, 2 `draft`, `token_present: true` on all 8) and 1 × `401` (no token) | `pocs/phase-2/storyblok/evidence/run-01/logs/mock-cdn-requests.jsonl` |
| No stale "6" remains | `**6** requests` appears nowhere in `research/phase-2/poc-storyblok.md` | grep over the file |

The mock-only boundary is intact and machine-declared: `harness-checks.json` carries `evidence_class: "harness"` at top level and on all 15 checks, with the scope statement "These checks verify the local harness and the request behaviour of the unmodified official client against a local mock CDN. They are NOT evidence of any Storyblok product operation". The evidence tree was not modified by the correction: all Storyblok evidence mtimes are `2026-09-22T18:41:39Z`, before P2.8's edits, and the manifest verifies 17/17 OK against the current files — consistent with `docs/02-cms.md:352`. The report's §7 hash table, however, still lists the pre-regeneration hashes for seven files; see §4.10 and D-1.

## 4. Independent re-verification

### 4.1 Seat arithmetic (one / two / three total seats, and the defined shapes)

| Configuration | Per site / month | 1 site | 5 sites | 20 sites | Annual @ 20 |
|---|---|---|---|---|---|
| Storyblok Starter, **one** total seat | $0.00 | $0 | $0 | $0 | $0 |
| Storyblok Starter, **two** total seats | $15.00 | $15 | $75 | $300 | $3,600 |
| Sanity Growth, **two** total seats | $30.00 | $30 | $150 | $600 | $7,200 |
| Sanity Growth, **three** total seats | $45.00 | $45 | $225 | $900 | $10,800 |
| Storyblok Growth, three seats (defined B) | $99.00 | $99 | $495 | $1,980 | $23,760 |
| Sanity Growth, nine seats (C) | $135.00 | $135 | $675 | $2,700 | $32,400 |
| Storyblok Growth, nine seats (C) | $159.00 | $159 | $795 | $3,180 | $38,160 |
| Keystatic Cloud Pro, nine users (C) | $40.00 | $40 | $200 | $800 | $9,600 |
| EmDash, Cloudflare Workers Paid | $5.00 | $5 | $25 | $100 | $1,200 |

Every per-site figure above appears in the document; the two-seat Sanity row's 5/20-site and annual cells are my arithmetic extension of its stated $30/site rate (`:105`, `:152` state the per-site rate only), and they are consistent with the document's 1/5/20 and annual treatment elsewhere. Every displayed §7 cell re-derives from the constants: 76 numeric cells checked, 0 mismatches; the two "custom / unpublished (UNKNOWN)" rows (`:159`, `:161`) are correctly left unquantified. The sensitivity statement at `:168` (Sanity $300 → $6,000 per month at 20 sites depending only on 1…20 seats/site) recomputes exactly ($20×1×$15 = $300; $20×20×$15 = $6,000).

### 4.2 POC operation totals and gates

- EmDash: `operations.jsonl` → 18 records, 11 pass / 4 partial / 3 blocked / 0 fail / 0 not_attempted; `summary.json` totals agree; sha256 `ddefcfd6076d380327f59fed243846a8de338efb1380165fbcab4a8c7dd92178` equals the hash recorded at `docs/02-cms.md:41`. Manifest 194 lines, `sha256sum -c` → 194 OK / 0 FAILED.
- Storyblok: `operations.jsonl` → 22 records, all `blocked`; gates 19 × `ACCOUNT_REQUIRED` + 3 × `PLAN_GATED`, and the gated criteria are exactly O5-c, O6-b, O10-c as the document's §8.2 table claims; `summary.json` records `criteria_passed: 0`, `account_created: false`. Manifest 17 lines, `sha256sum -c` → 17 OK / 0 FAILED.
- Harness: 15 checks, H0–H14, all `pass`, all classed `harness`; H10 as tabulated in §3 (F-4).
- The document's asymmetry statements (`:21`, `:200`, `:233`) match these counts, and no status is upgraded anywhere: `docs/02-cms.md:233` lists exactly the open items (EmDash scheduling, permissions, JSON restore; the whole Storyblok product surface; both vendor-managed backup paths).

### 4.3 Storyblok and Sanity current official pricing (retrieved 2026-09-23)

Confirmed verbatim from the live pages: Storyblok Starter 1 included seat / $15 per extra / max 2 / "Limited plan for testing and personal projects" / "Free to go live" / FAQ 03 no credit card and 45-day Growth Plus trial; Growth $99.00 per month ($90.75 annual figure present but unlabelled, which is why `:123` excludes annual figures), 5 seats included, max 10; Growth Plus $349.00; Growth quotas 400 GB traffic, 1M API requests, 25,000 stories, 2,500 assets; Premium/Elite custom with Release Management, custom roles/workflows, environments, SSO/SCIM. Sanity: Free 20 seats, 2 roles, 10K documents; Growth $15 per seat/month, up to 50 seats, 5 roles, 25K documents, 1M API CDN requests, Scheduled drafts; Enterprise custom roles, user attributes, custom history retention, releases/history comparison; add-ons $799 dedicated support, $299 increased quota, $999 per extra dataset. The seat and role facts behind the least-privilege argument (Free = Administrator/Viewer only; Editor/Developer/Contributor from Growth) are unchanged.

### 4.4 Storyblok terms (F-2 basis)

All 16 sections retrieved and read on 2026-09-23 (page last updated 07 April 2025; sections 1–12 read verbatim from the page text, 13–16 read verbatim through direct DOM access). Load-bearing clauses: §1.2 self-service sign-up on behalf of an organization; §3.5 "for its own internal business purposes"; §3.11(ii) prohibition on transferring, reselling or "otherwise commercially exploit[ing] any Storyblok Services or act[ing] as a reseller"; §3.11(viii) and §14.2 barring self-service accounts on an Organization's domain where that Organization is an Enterprise Plan Customer; §14.11 "Storyblok does not create or provide any back-ups of Customer data" (consistent with the document's Premium/Elite backup gate at `:59`, `:225`, `:271`); §15.1 free/trial/beta offerings are discretionary and may be withdrawn to paid plans; §13 jurisdiction is Austria/Linz; §16 miscellaneous. **No clause in §13–§16, and none in §14's fifteen self-service provisions, resolves whether an agency may operate a *client's* commercial site on Starter**, so `docs/02-cms.md:100`'s refusal to resolve it, and its `UNKNOWN` label, are correct rather than evasive.

### 4.5 Ownership, plan gates, and other load-bearing claims

- Storyblok space transfer: live `https://www.storyblok.com/docs/manuals/spaces` → "Ownership of a space transfers to another account that already belongs to the space, so add the account as a user first." Matches `docs/02-cms.md:61`, `:83`, `:276`.
- Client ownership posture (`:61`, `:83`, `:287`) remains consistent with `[1][3][10][19][20][26][29]`; the Cloudflare account-role gap is retained as `UNKNOWN` at `:83` and follow-up item 7 at `:289`.
- Plan gates (`:59`, `:75`, `:111`, `:219-225`, `:271`) all match the live comparison tables, including the Growth-Plus-is-also-30-days retention detail (the document's "30 days on Growth, 180 days on Premium, unlimited on Elite" is correct but not exhaustive for Growth Plus; that omission does not affect any decision and is not a contradiction).
- Required scenario structure: exactly three scenarios (`:89`, `:96`, `:107`), no universal CMS winner, `D-005` respected at `:5`.

### 4.6 Citations and local references

Parser over `docs/02-cms.md`: 49 source entries, ids exactly 1–49, one URL or one project path each, no duplicate URLs, no source entry outside §12; 49 distinct ids cited in the body, 0 dangling, 0 orphan, 0 range-form citations (the P2.7 F-4-style range sweep), 434 citation markers. All 24 repo-relative path references in the document resolve on disk (`pocs/phase-2/…`, `research/phase-2/…`, `docs/01-business.md`, `DECISIONS.md`, `AGENTS.md`); bare filename mentions in prose ("`summary.json`", "`validate_operations.py`", "`operations.jsonl`") are names, not paths, and each is disambiguated by context.

### 4.7 Decision tree

One fenced `mermaid` block, fences at `:239` and `:260` (balanced, no second block anywhere in the file); 15 unique node ids (A–N incl. J2/J3), no duplicates; every `-->` target is a defined node; all five terminal branches route into the O1–O10 account-test node `M`; three scenario paths plus the reduced two-person branch and the gated-custom branch are present, with no universal winner — matching the §6 text and `:262`'s reading guide.

### 4.8 Unsupported test claims

Sweep found no promotion of untested behaviour: `:5` (no account/plan/deployment, nothing account-gated claimed tested), `:21` (candidate 2 produced zero criterion results), `:200` (all 22 blocked with gates), `:229` (harness explicitly "not evidence about Storyblok's product", vendor never contacted), `:55`/`:189` (EmDash permissions unproven; "no scheduled publication is claimed"), `:266` (Editor role unverified in this project; Starter suitability UNKNOWN). `[D]`/`[G]`/`[H]`/`[V]`/`[U]` markers are used as defined in §2 and are not presented as test results.

### 4.9 Report hygiene and scope

`git diff --check` → no diagnostics; `git diff --no-index --check /dev/null research/phase-2/final-review.md` → no whitespace diagnostics. This review changed only `research/phase-2/final-review.md`. No account, plan, payment, deployment, DNS record, POC evidence file, governance file, Kanban record, or Git history was modified, and no destructive Git command was run.

### 4.10 Evidence-index hash cross-check (new; see D-1)

I re-computed every hash the POC reports print and compared it with the files on disk:

- `research/phase-2/poc-storyblok.md` §7 table (13 cited artifacts): **6 match, 7 do not.** Mismatching prefixes and their current values — `environment.json` 792261b7→`83dc500b`; `harness-checks.json` 0358a518→`63db1f09`; `operations.jsonl` 09f287f4→`a1486649`; `summary.json` d960fe57→`1acd96f4`; `logs/h1-astro-check.txt` 54e265d1→`fbde4f19`; `logs/h3-build-server-adapter.txt` 108980b6→`5f2563b9`; `logs/mock-cdn-requests.jsonl` 9ef6db2d→`e18e4455`. Matching: the h2 failure log and all three HTML/PNG renders. The five harness *source* hashes at `:204` all match.
- The evidence tree is self-consistent with its own manifest: 17 entries, all recomputed OK. Every Storyblok evidence file has mtime `2026-09-22T18:41:39Z`, i.e. **before** the P2.8 edits to `poc-storyblok.md` (`2026-09-23T10:31:22Z`) and `docs/02-cms.md` (`2026-09-23T10:35:49Z`) — so P2.8 did not modify evidence, as `docs/02-cms.md:352` claims.
- The report's own stated write time is 18:38:50Z, ~3 minutes *before* that 18:41:39Z regeneration, and the pattern of divergence (deterministic artifacts identical, run-captured artifacts such as the request transcript, environment dump, and check outputs different) is what a second harness invocation produces. The same second invocation is the most likely origin of the original 6-vs-8 H10 divergence: the narrative's "6" described the first generation, the machine record's "8" the final one. P2.8's correction to 8 therefore aligns the narrative with the manifest-verified final record — the right direction — but neither the report nor `docs/02-cms.md` explains the second run, and the §7 table was left stale.
- `research/phase-2/poc-emdash.md`: all 8 full sha256 values quoted were checked; 7 resolve to files inside the EmDash evidence manifest and 1 (`package-lock.json`, `430f9b2b…`) matches the manifest-verified `lockfile_sha256` inside `environment.json`. No stale hash in the EmDash report.

## 5. New defects and observations

*None is acceptance-blocking. D-1 is a real defect that must be fixed by the POC-report owner; O-1…O-3 are LOW.*

- **D-1 (MEDIUM, documentation integrity — `research/phase-2/poc-storyblok.md`, not `docs/02-cms.md`).** The §7 evidence table (`:188-202`) prints 13 artifact hashes, of which **7 no longer match the files** (list in §4.10), while the evidence tree's manifest is fully self-consistent (17/17 OK). Cause, evidenced by mtimes and artifact composition: the harness was re-run at 2026-09-22T18:41:39Z, ~3 minutes after the report's stated write time (18:38:50Z), regenerating environment/operations/summary/harness-checks, two logs, and the manifest, without the §7 table being updated; the same re-run explains the H10 6→8 divergence that F-4 corrected. Impact: a reader verifying provenance from the report's own table sees hash mismatches that look like tampering, even though the manifest (the mechanism the report itself tells readers to use, `:5`, `:206`) passes and no evidence file has changed since. It does not touch any claim in `docs/02-cms.md` — the 22 blocked criteria, 19/3 gate split, 15/15 harness checks, and H10's 8+1 counts all verify against the current records. Required fix (owner: POC-report owner / P2 milestone owner, **not made here** — this card may only write its own review artifact): regenerate the §7 hash table from `sha256sum` of the current tree, and record in §6 the second harness invocation and its effect on both the transcript count and the hashes. Residual limit: no earlier generation of the evidence survives on disk, so the two-run explanation is inferred from mtimes, from the composition of the changed artifacts, and from the report's own timeline, not from a byte-diff (§6).
- **O-1 (LOW, wording).** `docs/02-cms.md:173` calls scenario C "scenario C's modelled 10,000 documents", while `:109` defines the C shape as "5,000–25,000 documents". The 10,000-document model comes from the Phase 2 scenario artifact (`research/phase-2/scenarios-costs-permissions.md`, C assumption: 10,000 documents). A range and a modelled point are compatible, and the headroom conclusion holds under either (Sanity Growth includes 25K documents; Storyblok Growth 25,000 stories), so no cell or recommendation changes. Suggested future fix: say "the 10,000-document model behind scenario C" or restate the range.
- **O-2 (LOW, labelling).** `docs/02-cms.md:134` labels the scenario-A row "Storyblok Starter (one seat; commercial eligibility UNKNOWN)". Scenario A is the agency's own property, where `[49]` §3.5's internal-business-use grant is the closest fit, so the caveat is over-conservative in that one row. It is not a contradiction and is consistent with the document's single UNKNOWN posture; no change required.
- **O-3 (LOW, durability).** `docs/02-cms.md:350-351` records the P2.6/P2.8 verifier script paths under `/root/.hermes/profiles/luna2/cache/scratch/`. Those files exist now and were re-checked, but another profile's scratch directory is not durable project evidence. Future verification records should also record an in-repo or hash-anchored pointer. Non-blocking.

## 6. Limits of this review

- I re-opened live and re-read in full: Storyblok pricing, Sanity pricing (including the complete comparison table), Storyblok General Terms all 16 sections, and the Storyblok spaces manual. The remaining ~45 first-party sources were not re-opened in this pass; their claims rest on the 2026-09-22 retrievals, the P2.6 re-validation note (`docs/02-cms.md:39`), and the P2.7 review. A vendor change after 2026-09-23 would not be caught here.
- Storyblok product behaviour is still unmeasured by this project. Nothing in this review validates Storyblok's product surface, the Editor role in practice, scheduling, SEO features, export, or backup/restore; Starter's commercial suitability is still `UNKNOWN`, and no written vendor confirmation exists.
- EmDash evidence is reused, not re-executed: I re-hashed and re-parsed the artifacts (`operations.jsonl`, `summary.json`, manifests) but did not re-run the POC. Permissions (O8), scheduling (O5-c), live-linked sections (O7), and complete restore (O10-b/c) remain unproven, as the document states.
- Same-day re-fetch confirms agreement, not later drift. This review does not authorize any account, purchase, deployment, or client commitment.
- D-1's two-run explanation is inferred, not byte-proven: only the final generation of the Storyblok evidence exists on disk (no pre-regeneration copy, and the POC tree is untracked in Git), so I could not diff the two generations. The evidence for the inference is the file mtimes, the report's own stated 18:38:50Z write time, the composition of the seven changed artifacts (all run-captured; every deterministic artifact identical), and the fact that the current H10 record, transcript, and manifest agree.
- I did not re-open all 49 cited sources; §4.3–§4.5 list exactly which first-party pages were re-retrieved live in this pass.

## 7. Verdict

**pass** — F-1, F-2, F-3, and F-4 are resolved in the current line text with first-party support I verified independently; the arithmetic (including all 76 displayed cost cells), POC evidence counts and gates, citation graph, decision tree, ownership/plan-gate statements, and test-claim boundaries in `docs/02-cms.md` are internally consistent and reproduce. One new MEDIUM defect, D-1, is recorded against `research/phase-2/poc-storyblok.md` (stale §7 artifact hashes left by a post-narrative harness re-run, which also explains the corrected H10 count); it changes no claim, price, gate, or POC status in the synthesis, the evidence tree is manifest-consistent and untouched since 2026-09-22, and the fix is a mechanical regeneration owned by the POC-report/milestone owner — so it does not block acceptance of `docs/02-cms.md`. Three LOW observations (O-1…O-3) are non-blocking. `docs/02-cms.md` is accepted as the reviewed Phase 2 CMS synthesis, with Storyblok product behaviour and Starter commercial suitability explicitly retained as open evidence questions for the owner checkpoint, not as silent approvals.
