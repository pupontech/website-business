# P2.7 — Independent review of the Phase 2 CMS synthesis

Review date: 2026-09-23 (UTC). Reviewed: `docs/02-cms.md`, its cited Phase 2 research and POC artifacts, `AGENTS.md`, `PROJECT_STATUS.md`, `DECISIONS.md`, and relevant project context. Verdict: **changes_requested**.

## Executive result

The synthesis is unusually careful about evidence boundaries and the POC asymmetry. Scenario A, the defined three-seat scenario B cost row, the scenario C self-serve arithmetic, and the EmDash/Storyblok status counts reconcile with the supporting records. The document nevertheless has a material Storyblok Starter seat-price contradiction in its lead recommendation, leaves the Starter plan's stated intended use unresolved for commercial client work, and overstates the plan gate for ordinary scheduling in scenario C. Correct those points before accepting the synthesis.

## Findings (severity ordered)

### F-1 — High: Starter price is wrong for the stated client-plus-agency seat configuration

`docs/02-cms.md:14` describes Storyblok Starter at **$0** for “one client editor plus the included agency seat.” The current official pricing page says Starter includes **one** user seat and one additional seat costs **$15/month**; the plan's maximum is two seats. Thus a client editor plus an agency editor is two people and costs $15/month, not $0. The same contradiction appears in `docs/02-cms.md:100` (“one client editor plus the included agency seat ($0, with a second seat at $15/month)”). The sensitivity note at `docs/02-cms.md:167` correctly says that one client editor plus agency costs $15, while the decision-tree wording at `docs/02-cms.md:248-249` gives a $0–$15 range without clearly attaching it to one versus two total seats.

The defined scenario B has **two client editors plus one agency seat** (three people). Its Starter cap is exceeded, and the $99/month Growth figure in `docs/02-cms.md:100,146` is correct. Keep that three-seat recommendation distinct from the optional two-person configuration.

Correction requested: state plainly that Starter is $0 for one total user; one client editor plus one agency seat is $15/month; two client editors plus agency is three seats and requires Growth at $99/month. If retaining an alternate one-editor scenario, use its actual seat shape consistently. At 1/5/20 sites, the one-client-editor-plus-agency Starter alternative is $15/$75/$300 per month and $3,600 per year at 20 sites—not $0. The underlying scenario B cost table is not itself miscalculated.

Evidence: official Storyblok pricing, re-checked 2026-09-23: https://www.storyblok.com/pricing . It states “1 user seat included,” “add 1 more user at $15.00 /month,” and “max 2.” The source is also listed as [13] in `docs/02-cms.md:305` and [7] in `research/phase-2/scenarios-costs-permissions.md:96`.

### F-2 — Medium: Starter is recommended for commercial client work despite conflicting plan-use wording

`docs/02-cms.md:14,100-103` presents Starter as the default hosted small-client path. The current pricing page describes Starter as a “Limited plan for testing and personal projects,” while also saying “Free to go live” and that users can continue on Starter without a card. The page therefore contains conflicting signals about whether a commercial client website is an intended Starter use; it does not establish a clear prohibition, so do not claim commercial use is disallowed. But the synthesis should not make Starter an unqualified client-production recommendation without resolving that ambiguity.

Correction requested: mark commercial use/terms as **UNKNOWN** pending confirmation from Storyblok or its terms, and make a commercial-use check an explicit precondition to proposing Starter for a client. Keep the 45-day Growth Plus trial/no-card point separate from evidence of product suitability; no account or product behavior was tested.

Evidence: https://www.storyblok.com/pricing (same current official page, re-checked 2026-09-23). The trial and Starter FAQ explains how a user can continue with Starter, but the Starter card still calls it a testing/personal-project plan.

### F-3 — Medium: Scenario C conflates self-serve scheduling with enterprise release/workflow gates

`docs/02-cms.md:15,111` says that none of custom roles, a “release/scheduling workflow,” and audit retention is self-serve. That grouping is too broad: the current Storyblok pricing page lists **single-story scheduling on Growth and Growth Plus** (two scheduled single stories in the comparison table), and Sanity's current pricing page lists **Scheduled drafts on Growth**. Advanced Release Management/custom workflows and custom roles remain separate higher-tier gates; Sanity custom roles and full audit trail remain Enterprise features. Therefore the scenario C custom-quote outcome may still be correct because C requires custom roles/audit and has other stated requirements, but the document should not say scheduling itself is universally unavailable on self-serve.

Correction requested: distinguish scheduled publishing from release management/approval workflows, specify the concrete plan limits, and name only the actual Enterprise/custom-plan requirements as the reason a quote is necessary. Reconcile this phrasing in the executive recommendation, scenario C recommendation, and risks at `docs/02-cms.md:266`.

Evidence, re-checked 2026-09-23: Storyblok pricing https://www.storyblok.com/pricing (Growth lists “Single story scheduling”; Premium/Elite list Release Management and custom roles/workflows); Sanity pricing https://www.sanity.io/pricing (Growth lists “Scheduled drafts”). Sanity role documentation confirms custom roles are Enterprise: https://www.sanity.io/docs/user-guides/roles .

### F-4 — Low: Storyblok harness request count differs between narrative and machine record

This does not change the CMS synthesis's stated 15/15 harness-check count or the 22 blocked vendor criteria, but the underlying evidence should be internally consistent. `research/phase-2/poc-storyblok.md:50` says H10's mock served **6** requests; `pocs/phase-2/storyblok/evidence/run-01/harness-checks.json:237-245` records `requests_served: 8` (and one rejected 401). Correct the POC narrative or explain the differing count/snapshot before treating the detailed transcript count as settled. Do not promote either count to vendor behavior: both are local mock-harness evidence only.

Evidence: the two project paths above; Storyblok's machine-readable POC summary remains 22 blocked / 0 passed for protocol operations.

## Requirement coverage

| Review requirement | Result | Evidence / note |
|---|---|---|
| All five CMS options and capability claims | Pass | `docs/02-cms.md:43-64` compares Sanity, Keystatic, Storyblok, EmDash, and native Astro content; plan and evidence markers are generally kept distinct. |
| Scenario A recommendation | Pass | `docs/02-cms.md:89-95`; technical-owner-only Markdown/MDX is consistent with the stated scenario and D-005. |
| Scenario B recommendation, roles, account ownership | Changes requested | `docs/02-cms.md:96-106`; Editor role is distinct from Admin, but Starter seats/pricing contradict the recommendation (F-1), and commercial use needs qualification (F-2). Defined B is three seats and Growth at $99. |
| Scenario C recommendation and plan gates | Changes requested | `docs/02-cms.md:107-113`; nine-seat Growth arithmetic is right, but ordinary scheduling is incorrectly grouped with non-self-serve requirements (F-3). Custom roles/audit requirements still justify a custom-tier gate. |
| 1/5/20-site arithmetic and assumptions | Pass, with F-1 narrative correction | Recomputed the displayed standard seat-shape rows: A Sanity $15/$75/$300 and $3,600 annual at 20; B Sanity $45/$225/$900 and $10,800 annual, Storyblok $99/$495/$1,980 and $23,760 annual, EmDash paid $5/$25/$100 and $1,200 annual; C Sanity $135/$675/$2,700 and $32,400 annual, Storyblok $159/$795/$3,180 and $38,160 annual, Keystatic $40/$200/$800 and $9,600 annual. Recomputed the $15 one-client-editor-plus-agency Starter case and $84 step to Growth. These agree with the published formulas and tables; the separately described $0 two-person Starter configuration does not. |
| Sanity role/pricing facts | Pass | Current Sanity pricing and role pages confirm Free has Administrator/Viewer only; Growth is $15/seat/month and adds Editor/Developer/Contributor; Viewer users are free. https://www.sanity.io/pricing ; https://www.sanity.io/docs/user-guides/roles . |
| EmDash POC pass/partial/blocked, export and recovery | Pass | `operations.jsonl` has 18 criterion records; `summary.json` reports 11 pass / 4 partial / 3 blocked. The synthesis accurately limits proof to local/API/CLI evidence, marks O8 permissions blocked, O5 scheduling blocked, O10 JSON restore partial, and SQLite file restore pass (`docs/02-cms.md:179-194`). No supported admin-browser workflow or full recovery is claimed. |
| Storyblok POC and harness boundary | Pass | Machine summary reports 22 blocked protocol criteria, 0 passed; operations show 19 `ACCOUNT_REQUIRED` and 3 `PLAN_GATED`. `harness-checks.json` has 15 passing harness checks, explicitly classed as local mock evidence. `docs/02-cms.md:198-227` does not present them as vendor proof. See F-4 for the local H10 request-count inconsistency. |
| Backup/export/ownership claims | Pass | `docs/02-cms.md:59-63,83,111-112,190-194,221-227` accurately distinguishes EmDash's proven file restore from untested JSON restore, Storyblok's blocked product backup/restore and the self-serve backup gate, and the unresolved full-space export/ownership details. |
| Citations, local evidence integrity, Mermaid, unsupported execution claims | Pass for reviewed scope | Load-bearing Storyblok/Sanity claims were checked against current official URLs; the cited POC JSON records and summaries were read directly. EmDash manifest verified 194/194 OK; Storyblok manifest verified 17/17 OK (from `pocs/phase-2/storyblok/evidence/`). The decision tree at `docs/02-cms.md:237-255` has one balanced Mermaid fence and encodes the three scenarios without a universal winner. No account-gated or paid operation is represented as tested. |

## Verification notes

- Retrieved current Storyblok pricing and roles/backup documentation and current Sanity pricing/roles documentation on 2026-09-23. Storyblok's Editor role is documented to manage content, assets, and tags; Admin manages users/apps and the rest of the space, consistent with the synthesis's role distinction: https://www.storyblok.com/docs/concepts/roles .
- Parsed the EmDash and Storyblok `operations.jsonl`, `summary.json`, and Storyblok `harness-checks.json` directly rather than relying only on report prose.
- Recomputed the standard cost rows and the Starter seat correction using `expr`; the defined 1/5/20-site rows reconcile as listed above.
- Verified both POC evidence manifests: EmDash 194 files and Storyblok 17 files, all OK.
- The first Storyblok manifest invocation used the wrong relative working directory and did not verify anything; the successful check was `sha256sum -c run-01/MANIFEST.sha256` from `pocs/phase-2/storyblok/evidence/`.

## Verdict

**changes_requested** — resolve F-1 through F-3 before accepting `docs/02-cms.md`; also correct or explain the H10 count divergence (F-4) in the source POC report. No CMS choice is approved by this review, and no account-gated test is authorized or implied.