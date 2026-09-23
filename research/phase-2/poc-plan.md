# Phase 2 — POC candidate selection and test protocol

**Task:** P2.3 — select the two strongest proof-of-concept candidates and define one identical, executable ten-operation protocol for both.
**Retrieval date for every external fact, command, and price in this document:** 2026-09-22 (UTC). Volatile prices, plan limits, commands, and vendor claims must be re-retrieved before customer-facing or contractual use.
**Scope:** this artifact only. No account was created, no package was installed, no plan was purchased, and no proof of concept was executed. Candidate selection for *evidence generation* is **not** a CMS selection: `DECISIONS.md` D-005 forbids a universal CMS decision before scenario testing, and this document selects nothing for a client.

Evidence labels follow `AGENTS.md`: **FACT** (stated by a cited first-party source or a binding project document), **ESTIMATE** (arithmetic or marked judgement derived from cited facts), **RECOMMENDATION** (proposed operating choice), **UNKNOWN** (not established by available evidence).

Local project files referenced as `[P1]`–`[P6]`; external sources as `[1]`–`[27]`. Every external source was opened on 2026-09-22 and is listed with an exact URL in §15.

---

## 1. Inputs, method, and what was not done

**FACT (inputs).** This plan consumes two accepted parent artifacts and does not re-derive their content: `research/phase-2/cms-capabilities.md` `[P1]` (54-entry official source ledger) and `research/phase-2/scenarios-costs-permissions.md` `[P2]` (28 first-party sources, scenario A/B/C definitions, permission/ownership matrix, 1/5/20-site cost tables). Both parent artifacts state that no account was created and no CMS behaviour was exercised.

**FACT (method).** Scoring (§4) uses a published rubric, published weights, and one hard gate; the totals were computed by a script that evaluates every cell twice by two independent arithmetic paths and asserts agreement, then by a second script that re-parses this finished document (`/root/.hermes/profiles/dsflash2/cache/scratch/p23_score.py` and `p23_verify.py`, both outside the repository).

**FACT (what this task did).** Candidate-relevant official pages were re-opened on 2026-09-22 to verify every command and package name the protocol asks a later worker to run (§11), to confirm the permission facts the selection turns on (§4.3), and to check that the protocol's proposed operations exist as documented product behaviour rather than assumption.

**UNKNOWN (not established).** Whether Storyblok's native SEO feature is available on the free Starter plan (§10, O6); whether EmDash exposes a native per-entry SEO panel or only content-model fields (§10, O6); EmDash's production stability (§13). The question of whether the candidate accounts can be created without payment details was resolved for Storyblok's Starter plan by a first-party statement ("The Starter plan is always free with no credit card required" `[27]`).

**FACT (not done).** No POC was run, no account created, no package installed, no dataset/space/deployment created, no export, backup, restore, permission change, or publish was exercised, and no credential was retained. Nothing in this document is a verified CMS requirement.

---

## 2. Why exactly two candidates, and what the selection is for

**RECOMMENDATION.** Run exactly two proofs of concept, because (a) the task graph (`PROJECT_STATUS.md` `[P3]` P2.5/P2.6) provides two execution slots, (b) two candidates executed under one protocol produce a *comparison*, while one candidate produces only a description, and (c) `AGENTS.md` requires the account/credential gates to be reported honestly rather than assumed — which is cheaper to establish on two contrasting architectures than on five.

The two candidates are chosen for **evidence value against the decisions Phase 2 must inform**, not for product merit:

1. one **self-hosted, zero-vendor-account** option — every one of the ten operations can be exercised end to end locally, including permissions and recovery; and
2. one **hosted, free-tier** option with the strongest documented non-technical editing surface — which tests the scenario-B hypothesis (client staff edit without repository or administrator access) in its strongest documented form.

Scenario coverage requirement (`[P2]` §2): A agency site, B small client, C advanced editorial. A candidate pair of one hosted and one self-hosted option lets the synthesis distinguish "hosted platform limitation" from "self-hosted operational burden", which a pair of two hosted platforms cannot.

---

## 3. Scoring rubric

Each option is scored 0–5 per criterion. Anchors:

| Score | Meaning |
|---|---|
| 5 | Documented, native, and exercisable at zero cost with no vendor account |
| 4 | Documented and native; a minor documented gap or a zero-cost account requirement |
| 3 | Documented but requires meaningful custom engineering, or a free-tier limitation that is known and workable |
| 2 | Partially documented; needs custom engineering plus an account, or a paid seat to satisfy the requirement |
| 1 | Exists only outside the option, or only on an enterprise tier, or only through a workaround that contradicts a project constraint |
| 0 | Not documented, or fails the requirement outright |

Weights reflect what the project has already committed to (`AGENTS.md` `[P5]` §Security, `DECISIONS.md` `[P6]` D-003/D-005, `docs/01-business.md` §7 `[P4]`): least-privilege editing and client ownership carry the highest weights; cost and maturity are weighted lower because both are already quantified in `[P2]`.

**Hard gate (FACT — hard criterion).** C5 "least-privilege editing at zero seat cost" is a **gate, not a weight**: an option scoring below **3** on C5 cannot be selected as a POC candidate, because the protocol's O8 (permissions) and the scenario-B binding constraint B4 both depend on it. Rationale is `AGENTS.md` `[P5]`: clients must not receive "unnecessary repository or platform-administration access", and `[P2]` §4 shows only Storyblok and EmDash can express that at zero or near-zero seat cost.

---

## 4. Scoring matrix — all five options

### 4.1 Criterion scores

Columns: Sanity (Sa), Storyblok (Sb), Keystatic (Ke), EmDash (Em), Astro content collections (As).

| ID | Criterion | Weight | Gate | Sa | Sb | Ke | Em | As |
|---|---|---|---|---|---|---|---|---|
| C1 | Scenario A fit (agency site) | 1.0 | no | 4 | 4 | 4 | 3 | 5 |
| C2 | Scenario B fit (small client) | 1.5 | no | 2 | 4 | 2 | 4 | 0 |
| C3 | Scenario C fit (advanced editorial) | 1.0 | no | 3 | 4 | 1 | 3 | 0 |
| C4 | Nontechnical editing usability | 1.5 | no | 4 | 5 | 3 | 4 | 0 |
| C5 | **Least-privilege editing at zero seat cost** | 2.0 | **yes** | 0 | 4 | 1 | 5 | 0 |
| C6 | Draft + preview path on a free plan | 1.0 | no | 3 | 4 | 1 | 4 | 1 |
| C7 | Image / media handling | 1.0 | no | 4 | 5 | 3 | 4 | 3 |
| C8 | Structured, reusable sections | 1.0 | no | 3 | 5 | 3 | 3 | 3 |
| C9 | Export and recovery testable | 1.5 | no | 2 | 2 | 4 | 4 | 4 |
| C10 | Client ownership and portability | 1.5 | no | 3 | 3 | 5 | 4 | 5 |
| C11 | Platform cost at 1/5/20 sites (scenario-B seat shape) | 1.0 | no | 3 | 2 | 5 | 4 | 5 |
| C12 | Maintenance maturity | 1.0 | no | 5 | 4 | 4 | 1 | 5 |
| C13 | Isolated local POC feasibility without a vendor account | 1.5 | no | 3 | 2 | 5 | 5 | 5 |

Total weight **16.5**; maximum weighted total **82.5**.

### 4.2 Weighted totals

| Rank | Option | Weighted total | % of maximum | Gate |
|---|---|---|---|---|
| 1 | EmDash | 63.50 | 77.0% | pass |
| 2 | Storyblok | 60.00 | 72.7% | pass |
| 3 | Keystatic | 51.50 | 62.4% | **fail (C5 = 1)** |
| 4 | Sanity | 46.00 | 55.8% | **fail (C5 = 0)** |
| 5 | Astro content collections | 43.00 | 52.1% | **fail (C5 = 0)** |

Per-criterion weighted contributions (weight × score), baseline: EmDash `C1=3, C2=6, C3=3, C4=6, C5=10, C6=4, C7=4, C8=3, C9=6, C10=6, C11=4, C12=1, C13=7.5`; Storyblok `4, 6, 4, 7.5, 8, 4, 5, 5, 3, 4.5, 2, 4, 3`; Sanity `4, 3, 3, 6, 0, 3, 4, 3, 3, 4.5, 3, 5, 4.5`; Keystatic `4, 3, 1, 4.5, 2, 1, 3, 3, 6, 7.5, 5, 4, 7.5`; Astro content collections `5, 0, 0, 0, 0, 1, 3, 3, 6, 7.5, 5, 5, 7.5`.

### 4.3 Evidence behind every score

| ID | Evidence used | Sources |
|---|---|---|
| C1 | Astro integration and static/SSR paths documented for all four CMS options; native content needs no CMS; EmDash's live collections make every route runtime-rendered, which adds runtime responsibility to an otherwise static site | `[P1]` §4; `[1]` `[14]` |
| C2 | Scenario B4 requires client editors without repository or platform-admin access. EmDash's five roles and Storyblok's Editor role satisfy it at $0; Sanity Free exposes only Administrator and Viewer, so any client editor is an administrator; Keystatic GitHub mode makes repository write access the editing permission and Keystatic Cloud grants team-wide access with no editorial roles; Astro content collections have no role model at all | `[P2]` §4, §7; `[20]` `[21]` `[13]` `[23]` `[26]` |
| C3 | Scenario C needs multi-author roles, approval separation, scheduling, ≥90-day history, media library, two locales, 10k documents. Storyblok documents the fullest editorial surface (visual editor, roles, DAM, locales, workflows) with custom roles/workflows/environments gated to Premium/Elite; Sanity documents scheduled drafts, comments/tasks, Editor/Contributor roles, with custom roles/audit Enterprise-gated; EmDash documents roles including approval-gated Contributor, revisions, scheduling and i18n translations, but is beta; Keystatic documents no roles, no approval workflow and no preview service; Astro content requires a separate editorial system | `[12]` `[13]` `[15]` `[20]` `[21]` `[6]` `[2]` `[23]` `[26]` |
| C4 | Storyblok's Visual Editor is explicitly aimed at non-technical collaborators; Sanity Studio is structured but schema-driven; EmDash's admin targets non-developers but is "not a page builder"; Keystatic's admin is form-based but its preview/approval path is a deployment concern; core Astro content is developer/Git editing | `[15]` `[1]` `[P1]` §3 |
| C5 | Sanity Free: "20 included seats … with access to the Administrator and Viewer roles"; Editor/Developer/Contributor exist only on Growth ($15/seat/month). Storyblok: default roles Owner/Admin/**Editor** on all plans including free Starter (Editor = "manage content, assets, and tags"); custom roles only on Premium/Elite. EmDash: Subscriber/Contributor/Author/Editor/Admin with no seat metering and no vendor account. Keystatic: GitHub repo permissions or Cloud team membership, no editorial roles. Astro content: no role model; editing is repository editing | `[20]` `[21]` `[12]` `[13]` `[6]` `[P2]` §4, §7 |
| C6 | EmDash: HMAC-SHA256 signed, time-limited preview URLs served by middleware, works on localhost, no HTTPS requirement documented. Storyblok: draft API plus the Visual Editor iframe bridge, which requires **HTTPS even on localhost** and a `frame-ancestors` CSP. Sanity: live previews and visual-editing tools are on the Free plan, but the Astro visual-editing path requires server output, a viewer token and CORS. Keystatic: no hosted preview documented. Astro content: preview is a deployment/branch choice | `[5]` `[15]` `[20]` `[P1]` §3.1, §3.2; `[26]` |
| C7 | Storyblok DAM with folders, metadata, private assets, image-service transforms and CDN delivery; EmDash media library with folders/search/filters, signed uploads, alt text and a responsive `Image` component; Sanity image CDN with the documented caveat that asset files are not private even in a private dataset; Keystatic image fields write into the repository (or Cloud Images on Pro); Astro has asset tooling but no media workflow | `[4]` `[P1]` §3.3, §3.1; `[24]` `[26]` |
| C8 | Storyblok components + nestable blocks; EmDash sections inserted with `/section` (documented as **copy-on-insert**, not a live reference); Sanity arrays/objects plus frontend components, no turnkey page builder; Keystatic collections/singletons and Markdoc components; Astro MDX/components, code-driven | `[3]` `[P1]` §3.1, §3.2, §3.5 |
| C9 | EmDash: `export-seed` CLI export plus admin JSON backup that includes entries, drafts, schema, sections, menus, SEO settings, revisions and media metadata, and **excludes** users/secrets/media binaries; Storyblok: JSON-only delivery model, CLI schema pull/sync and Management-API CSV export, managed backup gated to Premium/Elite, and no first-party full-space export page found; Sanity: CLI dataset export on any plan, managed backup Enterprise-only, import documented as not a point-in-time reset; Keystatic and Astro content: the repository is the export | `[7]` `[8]` `[16]` `[17]` `[19]` `[P2]` §3.1–§3.5, §8 |
| C10 | Keystatic/Astro: content is files in the client's own repository (MIT tooling). EmDash: MIT, content in the client's own database, no vendor account. Storyblok: space ownership transfers only to an account already added to that space, content is delivered from the vendor CDN. Sanity: project/organization ownership transfer plus CLI export, hosted Content Lake dependency | `[P2]` §3, §6, §7 |
| C11 | Scenario-B per-site monthly platform cost: Sanity Growth $45 (3 seats), Storyblok Growth $99 (3 users exceed the free 2-seat cap), Keystatic $0, EmDash $0–5, Astro content $0 with editing unsolved | `[P2]` §5; `[12]` `[20]` `[23]` |
| C12 | Sanity `v6.16.0` released 2026-09-22; Astro `astro@7.3.1`, main-branch activity 2026-09-22; Storyblok is a hosted platform but its `storyblok-astro` repository is **archived** (2025-06-19) and the replacement monorepo's Astro package/licence metadata were not independently verified; Keystatic main branch protected with CI, last commit 2026-09-08; EmDash is **beta preview**, five months old, 306 open issues, no one-click restore | `[P1]` §3.1–§3.5 |
| C13 | EmDash runs locally with SQLite + local storage and no vendor account; CLI commands on localhost authenticate through a documented **dev bypass**, so no token is needed locally; Keystatic local mode stores content on the filesystem with no authentication at all; Astro content is local files; Sanity requires a login to create the project/dataset that Studio reads; Storyblok requires an account and a space, and preview requires HTTPS | `[1]` `[8]` `[22]` `[P1]` §3.2, §3.5 |

### 4.4 Weight sensitivity and robustness (recomputed, not asserted)

Eight probes were computed by the scoring script; all are reproduced here:

| Probe | Top two | Same pair? |
|---|---|---|
| P1 gate removed (C5 dropped) | EmDash, Storyblok | yes |
| P2 C3 (scenario C fit) double weight | EmDash, Storyblok | yes |
| P3 C11 (cost) double weight | EmDash, Storyblok | yes |
| P4 C12 (maturity) double weight | EmDash, Storyblok | yes |
| P5 gate removed + C12 double weight | Storyblok 56.00, EmDash 54.50 | yes (order flips) |
| P6 gate removed + C13 dropped | Storyblok 49.00, EmDash 46.00 | yes (order flips) |
| P7 all criteria equally weighted | Storyblok 48.00, EmDash 48.00 | yes (tie) |
| P8 C2 and C4 double weight (editorial-first) | EmDash 75.50, Storyblok 73.50 | yes |

**Exhaustive single-criterion sweep (FACT).** Every criterion was perturbed to ×0.5 and ×2.0, with the gate enforced and with it removed (52 perturbations). **With the gate enforced, no perturbation changes the selected pair.** Only 4 of 52 perturbations change it, and every one of them both removes the gate and doubles a criterion that favours repository-native tools (C9 export/recovery ×2, C10 ownership ×2, C11 cost ×2, C13 local feasibility ×2) — each yielding {EmDash, **Keystatic**} in place of Storyblok.

**Honest reading of that result.** Keystatic is the genuine third contender, and it wins precisely when least-privilege editing stops mattering and portability/cost/local-testability dominate. The selection below is therefore not "EmDash and Storyblok are simply better products"; it is "under the project's committed constraints — least privilege is a hard criterion and non-technical client editing must be evidenced — the two evidence-richest candidates are EmDash and Storyblok". If the permission gate were relaxed by an owner decision, Keystatic would displace Storyblok and the pair would become two repository-native tools, which would leave the hosted-editorial hypothesis untested. That trade-off is recorded in §5.5 as a decision the owner may take instead.

---

## 5. Selection

### 5.1 Candidate 1 — EmDash (self-hosted, MIT, Astro-native)

**RECOMMENDATION.** Highest weighted total (63.50, 77.0%) and the only option that can exercise **all ten operations with no vendor account, no plan gate and no payment** — which is exactly what turns O8 (permissions) and O10 (recovery) from a documentation claim into measured evidence.

Decisive evidence: five built-in roles including an approval-gated Contributor and a publishing Author, with no seat metering and no vendor account `[6]`; signed time-limited preview URLs that work locally without HTTPS `[5]`; a media library with alt text and a responsive image component `[4]`; sections inserted by slash command `[3]`; `export-seed` plus an admin JSON backup whose contents and exclusions are documented `[7]` `[8]`; a documented CLI dev-bypass so content operations can be automated on localhost without tokens `[8]`.

**Counterarguments (all recorded as first-class risks, `[P1]` §3.4, `[P2]` §3.4, §8):**

1. **Beta, and young.** EmDash labels itself beta preview; the repository is ~5 months old with 306 open issues. No amount of local POC success proves production stability, upgrade safety, or ecosystem depth. C12 was scored 1 for this reason.
2. **Recovery is documented as incomplete.** "Restoring from a backup JSON is intentionally not exposed as a one-click admin action yet"; the JSON backup excludes users, sessions, passkeys, API tokens, secrets and media binaries. A passing local file-level restore therefore does **not** imply a production disaster-recovery story, and O10 must report exactly which half was proven.
3. **It converts platform cost into operational cost.** Database migrations, plugin sandbox configuration, upgrades, secrets, monitoring and incident response become the agency's or client's work. `[P2]` §5.3 ($0–5/month) is licence-and-hosting arithmetic, not total cost of ownership.
4. **React in the admin.** The official configuration requires `react()` because "the admin UI is a React app" `[1]`. This is admin-only (not the public frontend), but `AGENTS.md` forbids adding a UI framework without a documented requirement — this candidate creates that requirement and the synthesis must record it explicitly.

### 5.2 Candidate 2 — Storyblok (hosted, free Starter plan)

**RECOMMENDATION.** Second-highest total (60.00, 72.7%), and the only hosted option that combines a real least-privilege **Editor** role on the *free* plan, a documented non-technical visual editing experience, a DAM, and nestable reusable blocks `[12]` `[13]` `[15]`.

Decisive evidence: Starter is free with 1 included seat and a maximum of 2 (so one editor can be added at $0) `[12]`; default roles Owner/Admin/**Editor** exist on every plan, with Editor able to manage content, assets and tags but not users or space settings `[13]`; the Visual Editor documents click-to-edit, outlines, context menus and real-time preview `[15]`; assets have folders, metadata, transforms and CDN delivery `[P2]` §3.2; components and nestable blocks are the documented section model `[14]` `[15]`.

**Counterarguments:**

1. **Scenario B is priced at Growth, not Starter.** The scenario-B seat shape (2 client editors + 1 agency seat) needs 3 users; Starter caps at 2, so the honest per-site cost is **$99/month**, not $0 `[P2]` §5.4. The POC tests the *free* tier's editing and permission behaviour, not the scenario-B price point.
2. **The export and backup story is the weakest of the two candidates.** There is no first-party full-space export page; the documented backup path is the S3 Backups app into a customer-owned AWS bucket, and the pricing table shows S3 backup frequency only on Premium (weekly) and Elite (daily) — so on Starter, O10 is expected to end **PARTIAL**, and the plan pre-commits to reporting it that way rather than dressing up a plan-gated feature as tested `[16]` `[12]`.
3. **Native SEO may be plan-gated.** The pricing page lists "SEO meta tags" as a Growth/Plus inclusion; Starter's card does not list it `[12]`. O6 must therefore distinguish "modelled SEO fields" (available on any plan through a custom component) from "the vendor's native SEO feature" (UNKNOWN on Starter) instead of declaring SEO "tested".
4. **The official Astro SDK repository is archived.** `storyblok-astro` was archived 2025-06-19 and development moved to a monorepo whose replacement package and licence metadata were not independently verified `[P1]` §3.3.
5. **Preview requires HTTPS even on localhost**, plus a `frame-ancestors` CSP entry `[15]` — a real setup cost and a candidate failure point (§8.2).
6. **Pricing display ambiguity.** Growth is displayed as both `$99.00/month` and `$90.75/month` with no labelled billing qualifier on the extracted page; the ambiguity is preserved rather than normalized `[P2]` §1, `[12]`.

### 5.3 Why not Sanity — the deviation from the initial preference, stated explicitly

Sanity was the earlier working preference. It is **not** selected, on evidence:

1. **It fails the hard gate.** "Free plan: 20 included seats … with access to the Administrator and Viewer roles"; Editor, Developer and Contributor exist only from Growth at $15/seat/month `[20]` `[21]`. Any client staff member who can edit is therefore a project administrator — able to manage members, tokens and datasets — which is exactly the access `AGENTS.md` `[P5]` §Security tells this business not to hand over.
2. **The scenarios that matter are the expensive ones.** Under the scenario-B seat shape Sanity Growth is $45/site/month and under scenario C $135, before any Enterprise feature `[P2]` §5.2.
3. **A free-tier POC would produce documentation, not proof.** Managed backups, custom roles, content resources, user attributes and the full audit trail are Enterprise-gated, and the dataset import is documented as *not* a point-in-time reset `[P1]` §3.1. On the two criteria where Sanity needs evidence most (permissions, recovery), a free POC can only report "blocked at the plan gate".
4. **Its documented strengths are not in dispute.** Live previews and visual editing are on the Free plan, the Studio is MIT-licensed and actively released, and the schema/GROQ model is mature — hence 4s on C1, C4 and C7 and a 5 on C12.

**Counterargument to this deviation (recorded, not dismissed).** Sanity is the only option here whose *content model* is aimed at exactly the structured, component-mapped page sections this business will sell, and a free POC would still verify create/edit/image/publish/export behaviour cheaply. If the owner decides during Checkpoint 1 that paying $15/seat/month for client editor seats is acceptable, Sanity's gate failure disappears and it becomes a strong third POC candidate. That decision is the owner's, not this task's.

### 5.4 Why not Keystatic, and why not Astro content collections

**Keystatic** (51.50, gate fail): the best portability and local-testability scores of the field (5s on C10, C11, C13), MIT, and a genuine contender under the probe set (§4.4). It is not selected because (a) GitHub mode makes repository `write` access the editing permission, and (b) Keystatic Cloud removes the GitHub account but sets access **at team level**, so every user in a team reaches every project in it, with no documented editorial roles — both fail the scenario-B constraint, and the sanctioned mitigation ("one team per client") is an isolation rule, not a role. Secondary: no documented hosted preview or approval workflow, and an Astro adapter (Node runtime) is required.

**Astro content collections** (43.00, gate fail): retained as the **control** rather than a candidate. Its 5s on C1, C10, C11, C12 and C13 are real, and it is the option the agency's own site (scenario A, one technical editor) can legitimately use with no CMS at all. It is not a POC candidate because there is nothing to prove: no role model, no draft/preview product behaviour, no media workflow, and no CMS-side export or recovery to test. Proving "a Git repository works" would consume a POC slot and answer no open question.

### 5.5 What would falsify this selection

| Trigger | Consequence |
|---|---|
| Storyblok's free signup cannot avoid entering payment details despite the "no credit card required" statement `[27]` | C2 becomes unexecutable as specified; either the owner approves the signup with a stop-rule, or C2 falls back to **Keystatic local mode** (zero accounts) and the hosted-editorial hypothesis is recorded as UNTESTED rather than assumed. Substitution requires an explicit owner decision. |
| EmDash O8 or O10 cannot be executed locally (e.g. no email transport for invites) | Recount: the self-hosted candidate loses its main advantage; the pair's evidence value drops and the synthesis must record that scenario-B permission evidence rests on Storyblok alone. |
| Storyblok O10 is plan-gated on Starter | Expected, not a surprise: recorded as PARTIAL, and the decision tree carries "hosted recovery requires Premium/Elite" as a cost line. |
| EmDash's release activity stops, or its beta status is withdrawn/abandoned before P2.5 | C12 = 1 stands and the maturity risk dominates the recommendation; the pair's second slot may need re-selection. |

---

## 6. The ten-operation protocol (identical for both candidates)

**Rules that apply to every operation.**

- **R1 — No pre-claiming.** Before a run, every operation is `not_attempted`. No operation may be marked `pass` from documentation, a product tour, a marketing page, or a screenshot of a settings screen. Only the named observation, produced in this environment, counts.
- **R2 — Pass requires machine-checkable evidence.** At least one evidence file per `pass` must contain a machine-checkable fact: an HTTP status and body excerpt, a file hash, a JSON field, a database row, a CLI transcript, or a DOM excerpt. A screenshot alone is never sufficient, though it is required for UI-affecting operations.
- **R3 — Blocked is a first-class result.** A blocked operation is recorded with the exact gate and the exact source that predicts it, and it is counted in the run summary. It is never silently omitted and never upgraded to `partial` without a stated observation.
- **R4 — One operation, one status.** Operations with several independent claims (O4, O6, O8, O10) are split into sub-criteria, each with its own status.
- **R5 — Roles are named.** Every observation states the actor: `anonymous`, `editor-role`, `author-role`, `admin`, or `agency-seat`.
- **R6 — Timebox.** Hold the whole run to one working day per candidate. On timeout, remaining operations are recorded `not_attempted` with the clock as the reason. An honest unfinished run beats a finished-looking fabricated one.
- **R7 — Seed content is invented and labelled.** Sample content is clearly test content ("POC Test …"). No real client, person, testimonial, metric, or outcome is invented or reused (`AGENTS.md`).

### 6.1 Operation summary

| # | Operation | EmDash execution | Storyblok execution | Sub-criteria |
|---|---|---|---|---|
| O1 | Create content | Admin → collection → New entry (or CLI content create against localhost) | Space → Content → new story of a registered content type (or Management API create) | O1 |
| O2 | Edit text | Edit body in the rich text editor, save | Edit a text/richtext field in the Visual Editor, save | O2 |
| O3 | Upload/select image | Media → upload → alt text → insert in body + featured image | Asset Manager → upload → attach to an image/asset block | O3-a upload, O3-b render |
| O4 | Preview draft | `_preview` signed URL serves the draft; the same token after expiry is rejected | draft API returns `_editable`; Visual Editor iframe live-updates over HTTPS | O4-a draft fetch, O4-b editor bridge, O4-c expiry/CSP |
| O5 | Publish | Set status Published; public route serves it without a rebuild | Publish the story; published API shows it and a later draft edit does not | O5-a publish, O5-b draft/published separation, O5-c scheduling |
| O6 | Edit SEO | Content-model SEO field group rendered into `head` (plus documented global site settings) | Modelled SEO fields (custom component) and/or the native SEO feature if present on the plan | O6-a modelled fields, O6-b native feature |
| O7 | Reuse page sections | Create a section, insert with `/section` on two entries; establish copy-vs-reference semantics | Create a component, use it in two stories, edit it once and re-read both | O7 |
| O8 | Manage/test permissions | Invite a second user at the lowest editable role; attempt denial cases; revoke | Invite a collaborator with the Editor role; attempt denial cases; revoke | O8-a editor can edit, O8-b editor cannot administer, O8-c revocation |
| O9 | Export | `export-seed` + admin JSON backup; assert contents **and** documented exclusions | CLI schema pull + CLI/Management API content export; record the gated vendor-backup path | O9-a export produced, O9-b contents, O9-c exclusions |
| O10 | Recover from backup | Stop server, copy SQLite file, damage a row, restore, verify; attempt the JSON restore path | Attempt the documented restore paths; record which are plan-gated; test any available history revert | O10-a file/DB restore, O10-b JSON restore, O10-c vendor backup path |

### 6.2 Operation detail — observable pass criteria, evidence, and blocked handling

**O1 — Create content.**
*Observable pass:* a new entry exists and is readable by two independent paths (the admin's list view **and** a second read path — the public route, the API, or the export file), and its identifier is stable.
*Evidence:* `operations.jsonl` record; admin list screenshot; the second read path's raw output (HTTP status + body, or JSON field); the entry's id/slug.
*Blocked handling:* Storyblok requires an account and a space. If owner approval for the free account is not given, record `ACCOUNT_REQUIRED` with source `[12]` and stop the candidate run; do not proceed with a partial substitute.

**O2 — Edit text.**
*Observable pass:* after saving, the rendered output contains the new string and does not contain the old one, verified from the served HTML rather than the editor UI, and — where the product documents history — a second version/revision exists.
*Evidence:* before/after rendered excerpts with sha256 of each excerpt; the revision/version list (screenshot or API JSON); for Storyblok, the version/activity view.
*Blocked handling:* Starter retains version/activity for **1 day** `[12]`. The edit itself can still pass; the *history-retention* claim is recorded `PLAN_GATED` with that citation if the version cannot be observed.

**O3 — Upload/select image.**
*Observable pass:* the uploaded binary exists in the configured storage, the CMS has a media record with alt text, and the page emits an `<img>` whose `src` resolves to that asset (HTTP 200, correct dimensions where the product documents transforms).
*Evidence:* `ls -l` plus `sha256sum` of the stored file; media record JSON; rendered `<img>` excerpt; response headers for a transformed variant.
*Blocked handling:* Storyblok restricts certain file types in unverified spaces `[12]`; private assets need the asset token `[18]`. If either is hit, record `PLAN_GATED` or `PARTIAL` for the affected sub-criterion (O3-b) while keeping O3-a's result.

**O4 — Preview draft.**
*Observable pass, O4-a (both candidates):* the draft body is served over HTTP by the site's own route with an unauthenticated request carrying the CMS-issued preview credential, and the served body matches the draft, not the published version.
*Observable pass, O4-b (EmDash):* the token payload decodes to `cid`/`exp`/`iat` and a banner/flag indicates preview mode. (Storyblok): the Visual Editor loads the site in its iframe and an edit made in the editor updates the preview without a manual reload.
*Observable pass, O4-c:* the preview credential is refused after expiry (EmDash: `verifyPreviewToken` returns `expired`; Storyblok: the draft cannot be fetched with `version=published`); and, for Storyblok, the response carries a `frame-ancestors` CSP that permits the editor origin.
*Evidence:* HTTP status + body excerpts; decoded/parsed token payload; the post-expiry rejection; a screenshot or short recording of the Visual Editor; response headers for CSP; browser console log showing the bridge connecting.
*Blocked handling:* EmDash needs `EMDASH_PREVIEW_SECRET` (documented as generated and stored in the database on first use, so it is not an account gate) `[1]` `[8]`. Storyblok **requires HTTPS even on localhost** `[15]`; if the local CA cannot be trusted by the browser in use, record O4-b `BLOCKED / HTTPS_PREVIEW_REQUIRED` while O4-a may still pass, and do not claim Visual Editor evidence. A free quick tunnel is permitted only with an explicit owner decision, because draft content would leave the machine.

**O5 — Publish.**
*Observable pass, O5-a:* an unauthenticated request to the public route returns the published content.
*Observable pass, O5-b (the claim that actually matters):* a subsequent edit saved as a draft is **not** visible in the published response while remaining visible as a draft.
*Observable pass, O5-c:* a scheduled publication is either observed to fire or recorded `PLAN_GATED` with its plan citation.
*Evidence:* both API/HTTP responses with timestamps; status column or status field; screenshot of the publish control.
*Blocked handling:* Storyblok lists scheduling from Growth `[12]`; EmDash documents scheduling `[2]`. O5-c must never be reported as passing on the strength of the feature list.

**O6 — Edit SEO.**
*Observable pass, O6-a (both candidates):* SEO values set by an editor in the CMS appear in the served HTML `head` (`<title>`, `<meta name="description">`, `og:*`), and the excerpt shows the exact value typed, not a default.
*Observable pass, O6-b:* the product's *native* SEO feature is located in the admin and its output observed — or it is recorded as absent/gated.
*Evidence:* `head` excerpt from a `curl` against the public route; screenshot of the field editor; for Storyblok, the plan row used to justify any gating.
*Blocked handling:* this is the operation most likely to be overstated, so it is split deliberately. EmDash's documented SEO surface is a JSON backup entry plus global site settings `[7]` `[10]`, and its modelled SEO fields are ordinary content-model `string`/`text`/`image` fields `[9]`; a **native per-entry SEO panel is UNKNOWN** and must be reported as such. Storyblok's pricing page lists "SEO meta tags" from Growth `[12]`, so on Starter O6-b is expected to be `PLAN_GATED` with O6-a carrying the result. `not_attempted` is not an acceptable final state for either sub-criterion.

**O7 — Reuse page sections.**
*Observable pass:* the same reusable definition is used in two different content items, is discoverable by the editor (search/library), and editing the definition once is re-read in both items — with the copy-vs-reference semantics recorded, not assumed.
*Evidence:* screenshots of both rendered pages; the section/component definition JSON; for EmDash the sections API response `[3]`; for Storyblok the `pull-components` output `[17]`.
*Blocked handling:* none expected; both candidates document the capability. If reuse only works by manual re-entry, the correct outcome is `PARTIAL` plus a written description — that is a finding, not a failure.

**O8 — Manage/test permissions (hard criterion; the operation the selection turns on).**
*Observable pass, O8-a:* a user holding the lowest role that must be able to edit can create/edit content, evidenced by content that exists with that user recorded as its author.
*Observable pass, O8-b:* the same user is **actually refused** an administrative action — a real denial (HTTP 403/redirect, missing route, rejected API call), not the mere absence of a button in the UI. For EmDash, the Contributor role's publishing restriction is the primary denial test; for Storyblok, an Editor must not be able to manage users or space settings.
*Observable pass, O8-c:* after revocation, the same credential can no longer read drafts or edit.
*Evidence:* role/permission screenshots; the raw HTTP responses of every denied attempt; the invite record and its acceptance; the post-revocation failure; `whoami`-style output where the product provides it.
*Blocked handling — explicit, because this operation has real dependencies:*
- **EmDash:** invites, magic links and self-signup verification all require an **email transport**; OAuth (GitHub/Google) is an alternative `[6]`. If no transport is configured, record `BLOCKED / EMAIL_TRANSPORT_MISSING`, state exactly what was and was not configured, and do **not** mark O8 pass. A local, offline SMTP catcher is an acceptable free configuration and must be described in `environment.json`.
- **Storyblok:** a collaborator invite must be accepted from a **second deliverable inbox** `[13]`. Starter permits a maximum of 2 seats `[12]`, so the operator's own seat plus exactly one invited editor is the supported free configuration; a third user requires Growth. If no second inbox exists, record `BLOCKED / SECOND_INBOX_REQUIRED`.
- Neither candidate may enter payment details for this operation.
*Hard rule:* role-definition screenshots are **not** permission evidence. If no second actor can be created, O8 is `blocked` — never `pass`.

**O9 — Export.**
*Observable pass, O9-a:* an export artifact is produced by a documented mechanism and parses (JSON/SQL) on the POC machine.
*Observable pass, O9-b:* the artifact demonstrably contains the specific content created in O1/O7 (asserted by identifier), plus the schema/model where documented.
*Observable pass, O9-c:* the documented exclusions are asserted as **absent** — for EmDash at minimum users/passkeys/secrets and media binaries `[7]` — which is a security assertion, not a completeness assertion.
*Evidence:* the artifact itself (hashed), a counts/summary JSON, the assertion output, and the exact command transcript.
*Blocked handling:* Storyblok's vendor-managed backup is Premium/Elite `[12]` `[16]`; the export must then be the CLI/Management-API path, and the gated path recorded with its plan row. If no content export can be produced at all, that is a decisive negative finding for scenario C and must be reported as `fail` or `blocked`, not softened.

**O10 — Recover from backup.**
*Observable pass, O10-a (primary, both):* a real destructive change is made (an entry's text altered or a row deleted), the backup is applied through the documented local mechanism, and the entry is served again with the original content; the elapsed time is recorded.
*Observable pass, O10-b:* the documented limitation is **re-checked in the product** rather than repeated: for EmDash, confirm in the admin whether a one-click JSON restore exists, and record the actual recovery route used `[7]`.
*Observable pass, O10-c (Storyblok):* each documented restore path is either exercised or recorded `PLAN_GATED` with its pricing row `[12]` `[16]`.
*Evidence:* pre/post database file hashes (or row dumps), the backup artifact (hashed), the restore command transcript, timings, and an explicit list of **what was not recoverable** (media binaries, users, secrets, or vendor-side plan-gated backups).
*Blocked handling:* this is the operation where optimism is most tempting. Rules: a restore that was not executed is not evidence; a vendor backup that requires an enterprise plan or a third-party (AWS/S3) account is `PLAN_GATED` with the citation; a `PARTIAL` recovery is reported as `PARTIAL` with the missing half named. EmDash's media binaries living outside the JSON backup and Storyblok's Starter plan having no documented backup frequency are both expected to produce partial results.

### 6.3 Pre-run status of every operation (no pre-claiming)

| Operation | Pre-run status | Known gate before the run |
|---|---|---|
| O1, O2, O3, O5, O7 | `not_attempted` | EmDash: none. Storyblok: free account + space required; Starter seat cap 2 |
| O4 | `not_attempted` | Storyblok: HTTPS preview required even on localhost |
| O6 | `not_attempted` | Storyblok: native SEO possibly Growth+; EmDash: native SEO panel UNKNOWN |
| O8 | `not_attempted` | EmDash: email transport required; Storyblok: second inbox required |
| O9 | `not_attempted` | Storyblok: vendor-managed backup Premium/Elite only |
| O10 | `not_attempted` | EmDash: no one-click JSON restore documented; Storyblok: Starter has no documented backup frequency |

---

## 7. Shared evidence schema

Both candidates write the same records; the schema lives here (not in a shared file) so file ownership stays disjoint.

**Per-operation record** — one JSON object per line in `operations.jsonl`:

```json
{
  "run_id": "2026-09-22T20:00:00Z-c1-emdash-01",
  "candidate": "c1-emdash",
  "operation_id": "O4",
  "operation": "preview_draft",
  "criterion_id": "O4-a",
  "status": "pass | fail | partial | blocked | not_attempted",
  "actor_role": "anonymous | editor-role | author-role | admin | agency-seat",
  "observable_result": "one factual sentence describing what was observed",
  "observed_values": { "http_status": 200, "token_exp": 1790105000, "entry_id": "..." },
  "evidence_files": ["run-01/o4a-draft-response.txt", "run-01/o4a-preview-banner.png"],
  "blocked_reason": null,
  "blocked_evidence": null,
  "started_at": "2026-09-22T20:04:11Z",
  "ended_at": "2026-09-22T20:19:02Z",
  "minutes": 14.9,
  "notes": "",
  "redacted": true
}
```

**Run-level files:** `environment.json` (OS, CPU/RAM, Node and package versions with lockfile hashes, browser binary and flags, ports, whether a local CA was trusted, email transport used, and every secret **name** configured — never a value), `summary.json` (per-operation counts by status, criteria failed/gated/blocked, minutes per operation, and a one-line verdict), `MANIFEST.sha256` (hashes of every evidence file).

**`blocked_reason` taxonomy** (closed list; anything else needs a note): `ACCOUNT_REQUIRED`, `PLAN_GATED`, `PAYMENT_REQUIRED`, `SECOND_INBOX_REQUIRED`, `EMAIL_TRANSPORT_MISSING`, `OAUTH_CREDENTIALS_REQUIRED`, `HTTPS_PREVIEW_REQUIRED`, `FEATURE_NOT_DOCUMENTED`, `BETA_UNSTABLE`, `TIMEBOX_EXCEEDED`, `ENVIRONMENT_MISSING`.

**Cross-candidate comparison rule:** the synthesis may not compare two operations whose statuses differ in kind (a `pass` against a `blocked`) without stating the asymmetry, and may never average statuses into a single "winner" number.

---

## 8. Environment and isolation plan

### 8.1 Directories and file ownership (disjoint by construction)

| Owner task | Path | Kind | Contents |
|---|---|---|---|
| P2.3 (this task) | `research/phase-2/poc-plan.md` | repo | this document; sole file changed by P2.3 |
| P2.5 (candidate 1) | `/root/poc/p2-c1-emdash/` | outside repo | EmDash project, `node_modules`, `data.db`, `uploads/`, `.env`, run scripts |
| P2.5 (candidate 1) | `research/phase-2/poc-evidence/c1-emdash/**` | repo | `run-01/operations.jsonl`, screenshots, transcripts, exports, `environment.json`, `summary.json`, `MANIFEST.sha256` |
| P2.6 (candidate 2) | `/root/poc/p2-c2-storyblok/` | outside repo | Astro + Storyblok project, local HTTPS material, `.env`, run scripts |
| P2.6 (candidate 2) | `research/phase-2/poc-evidence/c2-storyblok/**` | repo | same structure as candidate 1 |
| P2.7 (synthesis) | `docs/02-cms.md` | repo | later synthesis; not touched by P2.5/P2.6 |

Rules: no POC writes outside its own two rows; no POC edits `research/phase-2/cms-capabilities.md` or `research/phase-2/scenarios-costs-permissions.md`; no POC edits governance files, the Kanban board from a shell, or Git history; `/root/poc/**` is outside the repository so POC code never enters the planning repo, and only the run-level environmental facts needed to interpret evidence are copied into `environment.json`.

**Hotspot note.** `research/phase-2/` is a **shared directory** across P2.1, P2.2, P2.3, P2.5 and P2.6. Ownership is disjoint at file level and P2.5/P2.6 own separate subdirectories, so the parallelism is safe; this note exists so the orchestrator does not add a task that writes a shared file (for example a single `poc-evidence/schema.md`) into that directory.

### 8.2 Local environment (verified on this host, 2026-09-22)

| Check | Command | Result |
|---|---|---|
| Node.js | `node --version` | `v22.23.2` — meets Astro's and EmDash's `>= v22.12.0` prerequisite `[1]` `[25]` |
| npm | `npm --version` | `10.9.8` |
| Local CA tool | `mkcert -version`, `mkcert -CAROOT` | `1.4.4`, CA present at `/root/.local/share/mkcert` (created 2026-08-22) |
| Browser | `which chromium` | present at `/usr/bin/chromium` |
| Chromium trust store | `ls ~/.pki/nssdb`, `which certutil` | **both absent** — a Chromium instance will not trust the mkcert CA until `libnss3-tools`/`certutil` is available or the CA is installed system-wide `mkcert -install` is run |
| Disk / RAM | `df -h /root`, `free -m` | 80 GB free on `/`; ~1.4 GB available RAM — sufficient for one POC at a time, not two heavy builds in parallel |
| Python (tooling) | `python3 --version` | `3.13.5` |

**RECOMMENDATION.** Run the two POCs sequentially rather than concurrently on this host (memory, port and browser-profile contention), and record the actual browser binary and flags in `environment.json` for every visual criterion.

### 8.3 Ports, secrets, and hygiene

- **Ports:** candidate 1 on `4321` (EmDash's documented default `[1]`), candidate 2 on `4322` (HTTP) and `4323` (HTTPS for the Visual Editor), all recorded in `environment.json`. Nothing binds a privileged port except the storyblok HTTPS dev server, which uses a high port with an mkcert certificate.
- **Secrets:** only in `/root/poc/p2-*/**/.env` (mode `600`), never in the repository, never in a log, never in a screenshot, never in `operations.jsonl`. Every transcript is passed through a redaction step before being saved as evidence; the schema carries a `redacted` flag. Only secret **names** (for example `EMDASH_PREVIEW_SECRET`, `STORYBLOK_DELIVERY_API_TOKEN`) may appear in evidence.
- **No privileged CMS credential may reach browser code** (`AGENTS.md` §Security): the Storyblok delivery token is read server-side from the environment `[14]`, and where a public/draft token must be visible in markup, that fact is recorded as a finding, not hidden.
- **Evidence size:** ≤25 MB per file, ≤200 MB per candidate; large binaries stay outside Git with hashes recorded in `MANIFEST.sha256`.
- **No production, no paid services, no DNS:** no deployment to any vendor, no domain, no DNS record, no billing details, no plan upgrade. A free account is the maximum external commitment, and only with owner approval (§11).

---

## 9. Security constraints

1. **Isolation (`DECISIONS.md` `[P6]` D-003, `AGENTS.md` `[P5]`).** Each POC is its own directory, its own credentials, its own database/space, and its own evidence tree. No POC touches another project's data or any client data — none exists at this phase.
2. **Least privilege in the POC itself.** The operator's own admin/passkey is used for setup only; O8 is executed from a second, lowest-role actor. Where a candidate's free tier cannot express least privilege, that is the finding — not a reason to grant broader access.
3. **Credential handling.** No secret in a repository, a commit, a log, a screenshot, a JSON record, or a chat transcript. Tokens are stored only in the POC `.env` files and are deleted at the end of the run; the deletion is recorded. `AGENTS.md` forbids exposing privileged CMS credentials, Ghost Admin API keys, tokens, or private environment variables to browser code.
4. **Preview is a data-exposure surface.** Draft-content URLs are credentials: they are time-limited, never posted in comments, and the tunnel fallback for Storyblok's HTTPS requirement is an owner decision precisely because it would route draft content through a third-party host.
5. **No fabricated results.** Every status is traceable to an evidence file; if an operation cannot be run, its status is `blocked` with the gate named. `AGENTS.md`: documentation-backed behaviour is not a completed proof.
6. **No destructive Git.** Neither POC commits, pushes, rebases, resets, cleans or stashes. Evidence lives as untracked files until the milestone owner decides how it is versioned.
7. **Third-party review.** Any package added must be an official package from the candidate's own documentation (§11) and recorded with version and licence; no community scaffolding, no unreviewed installers.

---

## 10. Account and credential dependency register

| Dependency | Candidate 1 (EmDash) | Candidate 2 (Storyblok) |
|---|---|---|
| Vendor account required | **No** — self-hosted MIT software, no vendor control plane `[P1]` §3.4 | **Yes** — a free account and one space are required to create content `[12]` `[14]` |
| Payment details | None | **None.** FACT: "The Starter plan is always free with no credit card required" `[27]`. The pricing page additionally advertises a 45-day Growth Plus trial at signup `[12]`; the run must decline that offer and stay on Starter. **Stop rule:** if the signup flow does not allow completing on Starter without payment details, abandon the signup and record `PAYMENT_REQUIRED`; never enter card data |
| Owner approval before account creation | Not applicable (no external account) | Required — one free account, one space, Starter plan, no card |
| Local credentials created | Admin passkey registered against `localhost:4321` (documented as domain-bound `[6]`), `EMDASH_ENCRYPTION_KEY` and `EMDASH_PREVIEW_SECRET` generated locally `[1]` `[8]` | `STORYBLOK_DELIVERY_API_TOKEN` (and a preview token) stored in the POC `.env` `[14]` `[18]` |
| Second actor for O8 | A second user must be invited; invites are emailed `[6]` → needs an email transport (local SMTP catcher is acceptable) | A collaborator invite must be accepted from a second deliverable inbox `[13]`; Starter allows at most 2 seats `[12]` |
| Operations impossible without an account/plan | None identified: all ten are executable locally, subject to the O8 email-transport gate | O8 without a second inbox; O9/O10 vendor-managed backup without Premium/Elite; O6-b if the native SEO feature is Growth-only; consistently, any operation that needs a *plan* feature |
| Internet access | Required once, to install npm packages from official registries | Required to reach the vendor API/editor |

---

## 11. Command and package verification (official docs, 2026-09-22)

Every command the protocol asks a later worker to run, with its official source. Commands not listed here may not be invented at POC time.

| Command / package | Purpose | Official source | Status |
|---|---|---|---|
| `npm create emdash@latest` then `npm install`, `npm run dev`, admin at `http://localhost:4321/_emdash/admin` | Scaffold and run candidate 1 | `[1]` | verified |
| `npx emdash init`, `npx emdash dev`, `npx emdash types`, `npx emdash seed`, `npx emdash export-seed`, `npx emdash auth secret`, `npx emdash login`, `npx emdash whoami` | DB init, dev server, types, seed, **export**, secrets, auth | `[8]` | verified; localhost commands auto-authenticate via a documented dev bypass, so O1/O9 automation needs no token |
| `npx emdash secrets generate` → `EMDASH_ENCRYPTION_KEY` | Encryption key for plugin secrets | `[1]` | verified — **documentation inconsistency:** the getting-started page uses `secrets generate` while the CLI reference lists `auth secret`; P2.5 must record which one the installed version actually provides |
| `EMDASH_PREVIEW_SECRET`, `EMDASH_AUTH_SECRET` / `DATABASE_PATH`, `HOST`, `PORT`, `S3_*` | Preview signing, auth signing, Node deployment env | `[1]` `[8]` `[11]` | verified |
| SQLite recovery: stop server and copy the DB file, or `sqlite3 db ".backup out.db"` | O10-a | `[7]` | verified (documented for Node deployments) |
| `npm create astro@latest`, `npm install`, `npm run dev` (Node ≥ 22.12) | Scaffold candidate 2's site | `[25]` | verified |
| `npm install @storyblok/astro`, `output: "server"`, `STORYBLOK_DELIVERY_API_TOKEN`, `storyblok({ components: {...} })` | Storyblok client and block registration | `[14]` | verified (guide states it was tested with `astro@5.7.14`, `storyblok-astro@6.2.0`, Node `v22.13.0` — documented test context, not a lockfile) |
| `version: "draft"` / `version: "published"` on the CDN API | O4-a, O5-b | `[15]` `[18]` | verified |
| HTTPS preview for the Visual Editor: `vite-plugin-mkcert` (Vite-based frameworks) or `mkcert` | O4-b | `[15]` | verified; host already has `mkcert 1.4.4` and a local CA, but Chromium trust needs `certutil`/NSS (§8.2) |
| `Content-Security-Policy: frame-ancestors https://app.storyblok.com` | O4-c | `[15]` | verified |
| `storyblok login`, `storyblok spaces`, `storyblok pull-components --space <ID>`, `storyblok push-components`, `storyblok sync`, `storyblok import`, `generate-migration`, `run-migration`, `rollback-migration` | O7/O9 schema and content export | `[17]` | verified |
| Management API CSV export/import (`previewToken` for export, OAuth token for import) and asset upload flow | O9-b alternative | `[19]` | verified |
| Free Starter space signup at `app.storyblok.com/#/signup` (decline the Growth Plus trial) | Create the one free account and space needed by candidate 2 | `[27]` `[12]` | verified as free with no credit card required; owner approval still required before signup |
| S3 Backups app + AWS CloudFormation stack (bucket name, Role ARN), restore via Settings → Backup & Restore | O10-c | `[16]` | verified as documented; **plan-gated** (S3 backup frequency appears only on Premium/Elite `[12]`) and requires a customer AWS account |

**No other package, CLI, or flag may be introduced at POC time without recording it here or citing an official page in that run's `environment.json`.**

---

## 12. Risks and limitations

1. **EmDash maturity is the single largest risk in this pair** (`[P1]` §3.4). A successful local POC cannot substitute for production stability evidence; the synthesis must carry the beta status and the 306 open issues forward regardless of POC results.
2. **Storyblok's free-tier evidence may be thinner than the plan's**: managed backups and custom roles are Premium/Elite, native SEO may be Growth+, and the 2-seat Starter cap excludes the scenario-B seat shape. Expect O6-b, O9 and O10 to end gated or partial.
3. **Signup discipline** (§10) is a precondition, not a detail: the Starter plan is stated to be free with no credit card required `[27]`, the signup screen first offers a 45-day Growth Plus trial `[12]`, and the run must decline it — or abort and record `PAYMENT_REQUIRED`.
4. **Local HTTPS friction** for the Visual Editor is already visible in this host's environment (§8.2). If it cannot be resolved, one Visual Editor criterion is blocked and the run must say so.
5. **Second-actor dependency for O8** affects both candidates; permissions are the hard criterion, so an unresolved O8 is a material gap in the evidence, not a footnote.
6. **Time:** each POC is timeboxed to one working day; the ten operations plus evidence hygiene are ambitious for that budget, and the honest outcome may be a partially completed run.
7. **Environment:** this host has ~1.4 GB available RAM. Heavy Storyblok builds plus a browser may be slow; the POCs run sequentially.
8. **Vendor drift:** every price, limit, plan gate and command in this document is a 2026-09-22 snapshot and must be re-retrieved before it is quoted or relied on.

---

## 13. What the results will feed

Each POC returns a `summary.json` whose per-criterion statuses map directly onto the three scenario decisions that `docs/02-cms.md` must make (`DECISIONS.md` D-005, `[P4]` §8):

- **Scenario A (agency site):** can a zero-vendor-account option (candidate 1) or the native-content control carry a small mostly-static site with a practical preview path and no recurring platform fee?
- **Scenario B (small client):** does the permission evidence support "client editors edit without administrator or repository access" *and* a handover the client can own — and at what documented seat cost?
- **Scenario C (advanced editorial):** which editorial requirements (custom roles, approval workflow, environments, managed backup, localization at volume) are plan-gated, and therefore must be priced as a cost line rather than promised.
- **Cost and responsibility:** the gated operations found in O6, O9 and O10 are the concrete inputs that turn `[P2]`'s price tables into per-scenario cost lines.

**RECOMMENDATION.** P2.7 should treat any criterion still `not_attempted` or `blocked` as an open question for the decision tree, never as a neutral result, and should record the candidate pair's asymmetry (one self-hosted, one hosted) wherever it compares them.

---

## 14. Verification record

- **Scoring recomputation (two paths, one script):** `/root/.hermes/profiles/dsflash2/cache/scratch/p23_score.py` holds the 13 criteria, their weights, the gate threshold, and all five option score vectors; it computes each option's weighted total by dot-product **and** by explicit summation and asserts the two agree (5/5 options), then computes the eight weight probes, the 52-perturbation sweep, the gate evaluation and the max-points denominators. Run with `python3 p23_score.py`. Output quoted verbatim in §4.2 and §4.4.
- **Deliverable re-derivation:** `/root/.hermes/profiles/dsflash2/cache/scratch/p23_verify.py` re-parses *this finished document* — the §4.1 score table, the §4.2 totals, the §4.4 probe table, the §4.3 evidence mapping, the two candidate sections, the ten operation blocks, the §6.3 pre-run statuses, the §7 schema fields, the §8 ownership paths and the whole §15 ledger — and re-derives the weighted totals and percentages from the document's own numbers. Latest run: **136 checks, 136 passed, verdict PASS**. Its independently re-derived totals are EmDash 63.50, Storyblok 60.00, Keystatic 51.50, Sanity 46.00, Astro content collections 43.00 (maximum 82.5), identical to §4.2.
- **Source verification:** every external command, package, permission claim and plan gate in §4.3, §10, §11 was read from the first-party page cited, on 2026-09-22, through a text extractor; the Sanity Free-role statement was read directly from the pricing FAQ and the roles page `[20]` `[21]`. Two first-party inconsistencies were found and preserved rather than resolved: `npx emdash secrets generate` vs `npx emdash auth secret` `[1]` `[8]`, and Storyblok's dual `$99.00`/`$90.75` Growth display `[12]`.
- **Not verified (stated as limitation):** EmDash's native SEO surface, Storyblok Starter's native SEO availability, the Storyblok monorepo's Astro package and licence metadata, and every behaviour that requires an account. No vendor page was re-opened to test same-day stability.
- **Scope attestation:** only `research/phase-2/poc-plan.md` was created by this task; no other repository file, governance document, Kanban record, or Git state was modified, and no destructive Git command was run.
- **Stopping point:** the two POCs (P2.5, P2.6) and the synthesis (P2.7) are not started here.

---

## 15. Sources

External sources — first-party documentation, pricing pages, or official framework documentation — retrieved 2026-09-22 (UTC).

[1] EmDash — Getting Started (scaffold command, Node prerequisite, admin URL, SQLite/local storage config, environment variables): https://docs.emdashcms.com/getting-started/
[2] EmDash — Working with Content (create/edit, statuses, scheduling, images, sections slash commands, revisions, REST API): https://docs.emdashcms.com/guides/working-with-content/
[3] EmDash — Sections (reusable sections, `/section` insert semantics, library, API): https://docs.emdashcms.com/guides/sections/
[4] EmDash — Media Library (uploads, folders, search, alt text, signed uploads, responsive image component): https://docs.emdashcms.com/guides/media-library/
[5] EmDash — Preview Mode (HMAC-signed time-limited preview URLs, secret, `isPreview`, visual-editing attributes): https://docs.emdashcms.com/guides/preview/
[6] EmDash — Authentication (five roles and levels, invites, magic links, OAuth, self-signup, session security): https://docs.emdashcms.com/guides/authentication/
[7] EmDash — Backups (JSON contents and exclusions, daily archives, D1 Time Travel, SQL dumps, restore limitations): https://docs.emdashcms.com/guides/backups/
[8] EmDash — CLI Reference (commands, dev bypass on localhost, export-seed, auth secret, environment variables): https://docs.emdashcms.com/reference/cli/
[9] EmDash — Field Types (14 field types, validation, reserved slugs): https://docs.emdashcms.com/reference/field-types/
[10] EmDash — Site Settings (global settings, social links, `head` metadata pattern): https://docs.emdashcms.com/guides/site-settings/
[11] EmDash — Deploy to Node.js (Node adapter config, build/init/start, environment variables, SQLite persistence): https://docs.emdashcms.com/deployment/nodejs/
[12] Storyblok — Pricing and plan comparison (Starter free with 1 included and max 2 seats at $15/additional; Growth $99.00 or $90.75 with 5 included and max 10; SEO meta tags and single story scheduling from Growth; custom roles, environments, S3 backup frequency Premium/Elite; preview URL counts): https://www.storyblok.com/pricing
[13] Storyblok — Roles (default Owner/Admin/Editor permissions, custom roles, multi-role precedence, permission tabs): https://www.storyblok.com/docs/concepts/roles
[14] Storyblok — Integrate Astro with Storyblok (install `@storyblok/astro`, server output, access token env, block registration, tested versions): https://www.storyblok.com/docs/guides/astro
[15] Storyblok — Visual Editor (draft fetch, `_editable`, bridge, preview URL configuration, HTTPS requirement including localhost, `frame-ancestors`): https://www.storyblok.com/docs/concepts/visual-editor
[16] Storyblok — Backups (S3 Backups app, CloudFormation setup, restore options, alternative CLI/API approaches): https://www.storyblok.com/docs/concepts/backups
[17] Storyblok — Command Line Interface (`login`, `spaces`, `pull-components`, `push-components`, `sync`, `import`, migration commands): https://storyblok.com/docs/Guides/command-line-interface
[18] Storyblok — Access Tokens (public, preview, asset, release, theme tokens; personal and OAuth management tokens): https://www.storyblok.com/docs/concepts/access-tokens
[19] Storyblok — Handling content with the Management API (CSV export/import, asset upload flow, migration use cases): https://storyblok.com/docs/guide/in-depth/handling-content
[20] Sanity — Pricing (Free: 20 seats with Administrator and Viewer roles; Growth $15/seat/month with Admin, Viewer, Editor, Developer, Contributor; Enterprise custom roles; add-ons): https://www.sanity.io/pricing
[21] Sanity — Roles (default roles per plan, custom roles as a paid Enterprise feature, viewer seats billing behaviour): https://www.sanity.io/docs/user-guides/roles
[22] Keystatic — Local mode (filesystem storage, no authentication): https://keystatic.com/docs/local-mode
[23] Keystatic — Keystatic Cloud (free up to 3 users per team, Pro $10/month plus $5/user, team-level access across all projects, Cloud Images, multi-player editing): https://keystatic.com/docs/cloud
[24] Keystatic — Image field (images stored on the local filesystem or in the GitHub repository; directory and publicPath options): https://keystatic.com/docs/fields/image
[25] Astro — Install Astro (`npm create astro@latest`, Node v22.12.0+ prerequisite): https://docs.astro.build/en/install-and-setup/
[26] Astro — Content collections (loaders, schemas, build-time versus live collections, local files, remote sources): https://docs.astro.build/en/guides/content-collections/
[27] Storyblok — Headless CMS for developers ("The Starter plan is always free with no credit card required"): https://www.storyblok.com/lp/developers

Local project sources:

[P1] `research/phase-2/cms-capabilities.md` — P2.1 capability/pricing research, 54 first-party sources.
[P2] `research/phase-2/scenarios-costs-permissions.md` — P2.2 scenarios, permission matrix, and 1/5/20-site cost model, 28 first-party sources.
[P3] `PROJECT_STATUS.md` — phase/task graph, P2.5/P2.6 POC tasks, approval checkpoints.
[P4] `docs/01-business.md` — segments, packages, ownership posture, minimum viable requirements.
[P5] `AGENTS.md` — architectural constraints, security requirements, delegation and evidence rules.
[P6] `DECISIONS.md` — D-003 isolated client boundaries, D-005 no universal CMS decision before scenario testing.
