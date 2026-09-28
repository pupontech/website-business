# Phase 7.5 — Dual-track owner-review proposal

**Status:** Owner-review proposal synthesized from the accepted Phase 7.1–7.4 planning artifacts and D-009–D-012, updated for D-013. D-012 refines the agency-site plan only. D-013 conditionally approves the clean corporate-minimal, responsive planning direction and separate agency/client scope, and authorizes only a route-neutral, static-first Astro/TypeScript foundation **after** this proposal's independent review passes and Phase 6/7 parent evidence is reconciled. G2 is not complete and implementation must not be dispatched before those conditions pass. No CMS, host, form provider, public identity/copy, or G3 action is approved; product proof is NOT RUN, and no site, account, product workflow, form, or deployment was tested for this proposal. [I1][I2][I6][I7][I8][I9]

**Decision boundary:** Keep the agency marketing site distinct from the professional-services client-site archetype. D-010 scopes planning to both and leaves Markdown/MDX, Sanity, and Storyblok under comparison. D-011's agency-only planning inputs remain bounded: Astro static and Astro CMS are named service categories, not verified capabilities or approved public claims; no agency work, credential, testimonial, or other proof is publishable right now; a simple form is preferred subject to provider/privacy review. D-012 clarifies that the agency audience is English speakers in Israel; this does not prescribe future clients' audience, language, geography, or jurisdiction. The agency's public name and person/team identity are deferred. Plan Home, Services, and Contact; make About conditional on real identity; omit Work and Insights for now. Keep the simple form as a plan only—not live—until provider, privacy, data-flow, and test gates are resolved. No CMS is selected pending separately authorized tests. Client language, identity, services, proof, and contact needs remain client-specific. [I1][I2]

**Proposal:** Use clean corporate minimal as a constraint for a future responsive design review, not as selection of Direction A/B/C or approval of a final identity. Avoid drafting public claims until their factual basis and scope are confirmed. [I4][I5][I6]

## 1. Candidate information architecture — two separate tracks

All routes, labels, and page counts below remain planning inputs, not approved requirements. D-012 gives the current agency page plan; the client track remains a discovery archetype only. Omit or defer any page that lacks a confirmed visitor need, accountable content owner, and publishable content. [I1][I2][I6][I7]

### Track A — agency marketing site

```text
Agency site (D-012 page plan; D-013 conditional foundation approval, not G2 completion)
├── Home
├── Services
│   ├── Astro static — candidate service category, not capability proof
│   └── Astro CMS — candidate service category, not capability proof
├── About — conditional on real, owner-confirmed public name and person/team identity
└── Contact — planned page; no live form or guessed recipient/channel
```

Home, Services, and Contact are the current agency planning pages; About is conditional on real identity. Omit Work and Insights from the current plan. The D-011 service categories can inform Services planning, but are not promises, packages, verified capabilities, scope, or public copy. Any eventual service claim needs substantiated capability and owner-approved scope/exclusions. The agency audience is English speakers in Israel; do not transfer that audience or geography to client sites or infer jurisdiction-dependent claims. Identity-dependent public copy and public launch remain blocked while identity is deferred. [I1][I2]

### Track B — professional-services client-site archetype

```text
Client site (discovery menu, not a universal template)
├── Home
├── Services / Practice areas — only confirmed offerings
├── About / People — only verified identities and approved biographies
├── Contact — route chosen by that client
├── Practical information — conditional on actual client/user need
├── Work / Results — optional and evidence/permission-gated
└── Insights / Resources — optional and editorial-capacity-gated
```

This is a per-engagement discovery archetype, not a selected client, profession, universal sitemap, language, jurisdiction, or content model. Each actual client must supply and approve its own task priorities, services and limits, identity, locale, proof, contact route, content owners, and publication permissions. Do not infer that client proof exists or is absent. [I6][I7]

### Proposed page/content inventory and truth gates

| Track / candidate page | Content to establish before publication | Truthful-claims and inclusion gate |
|---|---|---|
| Agency — Home | Real public identity when supplied, audience-appropriate purpose, substantiated service summary, and an approved next step | Planned for English speakers in Israel. Do not invent name, person/team, claims, client, outcome, or capability. Keep copy that depends on deferred identity unpublished. |
| Agency — Services | Actual service scope, inclusions/exclusions, delivery responsibilities, and evidence supporting each capability statement | Astro static and Astro CMS remain planning categories only. Verify capability and scope before any public offer or claim. |
| Agency — About (conditional) | Real, owner-confirmed public name and person/team identity; accurate roles and approved biography | Not in scope unless real identity is supplied and confirmed. No stock people, fictional team, credentials, office, or local-presence implication. |
| Agency — Contact | Approved purpose and page content; any eventual contact path must have an owner-approved, verified recipient/channel | Contact is planned, but the preferred form is NOT LIVE and must not collect data before provider, privacy, data-flow, and test gates pass. No guessed address, recipient, functional-status claim, privacy promise, or response-time commitment. If no route is approved, keep it a page plan without a functional inquiry path. |
| Agency — Work / Insights (omitted for now) | No current page/content inventory; reconsider only after a later owner decision and applicable evidence/editorial gates | D-012 omits both from the current agency plan. Do not create placeholder pages or imply publishable proof/editorial capacity. |
| Client — Home / Services | Client-confirmed identity, actual offerings, fit, scope, and limits | Per-client source and approval required; no inferred outcomes or professional claims. |
| Client — About / People | Verified names, roles, biography/credentials where applicable, and image rights | Client and relevant subjects approve each claim/asset. Do not infer team size or qualifications. |
| Client — Contact / Practical information | Client-confirmed recipient/channel, availability, and practical details that are accurate | No invented location, hours, fees, response time, or form. Contact/data decisions are client-specific. |
| Client — Work / Results | Relevant, substantiated evidence and explicit permission from affected parties | Optional; omit if evidence or permission is missing. Do not assume proof is absent. |
| Client — Insights / Resources | Approved, useful material, accountable subject-matter reviewer, and maintenance/correction process | Optional; omit if the client has no demonstrated editorial need or sustainable capacity. |

For either track, maintain an evidence record for each public claim or asset: source, date/context, factual reviewer, rights/permission, allowed wording, approving owner, and review/expiry point. A draft in a CMS, preview, mockup, or repository is not public-claim evidence. [I3][I6][I7]

## 2. Responsive hierarchy and visual proposal

**Proposal:** Explore a restrained, corporate-minimal system with clear type hierarchy, readable body text, whitespace, limited decoration, and ordinary links. Do not select A/B/C, typefaces, palette, imagery, breakpoints, or tokens here. The design must work without imagery and without a sticky/floating contact control. The two tracks may share design-neutral patterns only where useful; each retains its own identity, vocabulary, content, assets, and approval. [I4][I5][I6]

| View | Proposed reading and interaction order |
|---|---|
| Desktop | For the agency plan, simple navigation and only an owner-approved identity element (no name assumed) → page purpose for English speakers in Israel → supported Services content → About only if identity is confirmed → Contact plan without implying a live form → utility footer. Client layouts follow each client's own brief. |
| Tablet | Preserve the same source order for each track. Keep side-by-side sections only while readable; otherwise stack. Secondary notes and optional imagery follow the core purpose; do not use unverified claims to fill space. |
| Mobile | Single column in the same logical order; concise navigation disclosure only if needed, then page purpose, supported service content, conditional About content, and Contact information only if an approved route exists. No fixed CTA or nonfunctional form presented as live. |

Use semantic landmarks/headings, skip link, descriptive link text, keyboard access, visible/unobscured focus, useful image alternatives, and labels/error associations if a form is approved. WCAG 2.2 AA is the project target, not a conformance claim; evaluate rendered pages at the project’s proposed widths and with keyboard/manual checks before acceptance. [I3][I5][I7][E8]

## 3. CMS/editor comparison — no route selected

**Proposal:** Keep three routes open and compare them independently for the agency and each real client configuration (six cases for the two-track test plan). Documentation helps define tests; it is not evidence of usability, role enforcement, protected preview, publishing, export completeness, or a successful restore. [I8][I9][I10]

| Candidate route | Documentation-level description | Agency-specific proof/account blocker | Client-specific proof/account blocker |
|---|---|---|---|
| Markdown/MDX in Astro | Content is repository-held; it does not supply a content-only hosted editor role. Astro documents local/remote content collection options and build-time use. [I10][E1] | Test the agency editor’s actual source/Git workflow, review/build preview, draft separation, publication/rebuild, and full source/media recovery. No editor workflow, repository, host preview, or restore is approved/tested here. | Test with an actual nontechnical editor and the client’s owner-approved access boundary. Repository permissions can reach more than page content; decide whether that boundary is acceptable or whether agency-edits is a separately scoped service. Test client-owned source/assets and clean restore. |
| Sanity | Role, dataset export, and import documentation describes available mechanisms; configured grants/denials and a successful project restore remain unproven. [E2][E3][E4] | Requires a future authorized project and named actors to test agency tasks, actual roles/denials, draft privacy, publishing/build, export/assets, and clean import/rebuild. No account/project or product test is authorized by this proposal. | Requires a separate client-owned test project, actual client/editor/agency actors and any required second-editor inbox. Test owner/billing boundaries, role denials/revocation, draft privacy, export/assets, and clean restore. Agency-site results cannot establish client suitability. |
| Storyblok | Role, Visual Editor, and backup documentation describes product concepts and limitations; it is not configured-space or recovery proof. [E5][E6][E7] | Requires an authorized agency test space and actual editor/owner tests for edit tasks, grants/denials, preview privacy, build/publish, export/media, and clean recovery. Prior project evidence records an account/plan-blocked product test; mock-CDN checks are not vendor-product evidence. Starter commercial suitability still needs written vendor clarification before reliance. [I10] | Requires a distinct client-owned authorized space, named client editor(s), owner and agency actor, plus isolated preview/export/restore tests. Do not transfer an agency result to any client. The earlier mock harness does not establish actual client roles or recovery. [I8][I10] |

For each of the six route/audience cases, use synthetic fixtures and record edit effort, allowed/denied actions, protected preview, published static output/rebuild, export including usable media, clean-destination restore, owner independence, revocation, and burden. If authorization, account, plan, participant, or destination is missing, mark the exact case BLOCKED/NOT RUN; do not simulate product behavior. [I8][I9]

**External evidence boundary:** Astro describes content collection mechanisms, Sanity describes roles and export/import, and Storyblok describes roles, editor preview, and backup coverage; those pages establish documentation claims only, not a chosen route or tested project. [E1][E2][E3][E4][E5][E6][E7]

## 4. Contact route and conditional form gate

D-011 records an agency preference for a simple form, and D-012 retains it only as a plan—not a live form—until provider/privacy, data-flow, and test gates are resolved. No provider, recipient, fields, data flow, retention, or permission to collect has been approved. A planned Contact page need not have a functional live form; do not guess a recipient or channel. This does not decide client-site contact needs. [I1][I2]

**Proposal — non-form fallback:** If the form gate is not ready, prefer an owner-supplied, verified non-form contact channel (for example, a confirmed contact address or link) only after its publication and recipient are approved. If no channel is approved, defer the live contact route and avoid a nonfunctional form or guessed destination.

Before any form is published or accepts submissions, the relevant site owner must approve its purpose/minimum fields, recipient/access, provider and current terms/data location, privacy/legal review for the applicable jurisdiction, retention/deletion, abuse/rate controls, accessible validation and success/failure behavior, operational owner, and fallback. Then pass synthetic success and failure tests; no live form or real collection until these gates are resolved and collection is separately authorized. Static hosting does not itself provide a form endpoint, and any server route/provider adds runtime/data duties. [I9][I11][I12][E9]

## 5. Site-specific ownership, preview, and recovery

- **Agency site:** the agency owner controls its own source, accounts, billing, content, publication, domain/hosting decisions, and retained recovery materials. Name the accountable owner and any separately authorized editor/operator before setup.
- **Each client site:** that client owns or explicitly controls its own source, accounts, billing, domain/hosting decisions, content, data, and retained recovery materials. Keep repository, CMS instance, credentials, deployment, data, and backups isolated by default; agency access is named, least-privileged, and revocable. No agency-site account or test grants client access. [I3][I6][I9][I11][I12]
- **Preview:** any future preview must have an explicit authorized audience and tested access control. `noindex` or an obscure URL alone is not privacy. Test anonymous direct access to preview routes, draft APIs, and private assets; keep production secrets and real inquiry data out of previews. No preview host is selected or tested. [I9][I11][I12]
- **Recovery:** retain source, lockfile/build settings, content/schema if chosen, redirects, and required asset binaries in the owning site's recovery set. Test export and restore into a clean isolated destination, compare content and media, and record gaps/time. Deployment rollback is not data recovery; provider documentation or an archive is not a restore test. No recovery operation was run for this proposal. [I9][I11][I12]

## 6. Static-first implementation sequence — conditional narrow foundation only

1. **G2 review:** D-013 conditionally approves the two-track boundary, clean corporate-minimal responsive direction, and a route-neutral foundation only. First obtain a verified independent PASS on this D-012/D-013 proposal and reconcile Phase 6/7 parent evidence; unresolved identity, copy, form, CMS, host, and product questions remain blocked or omitted. Do not mark G2 complete or dispatch implementation until those conditions pass. [I1][I2]
2. **Route decision before integration:** keep the CMS open until the owner reviews separate audience-specific evidence. If a live comparison is desired, first obtain exact authorization for candidate route, account/project, actors/inboxes, synthetic data, plan/billing state, preview/build destination, and clean restore target. Do not create an account or trial as part of this proposal. [I8][I9][I10]
3. **OpenSpec and scoped foundation:** after the review/reconciliation conditions pass and G2 is recorded, define significant foundation work in OpenSpec. D-013 permits only a route-neutral static-first Astro/TypeScript foundation with local development, automated verification, and hosted CI; it does not authorize a client-specific build or CMS/form integration. Use separate projects per site if and when each is approved; add a server adapter/runtime only for a named, separately approved requirement. Do not smuggle in Markdown/MDX or CMS selection as an assumed foundation. [I1][I2][I3][I9][I11][E9]
4. **Site-specific content and release:** create only the approved site's content model/workflow; preserve ownership and isolated credentials; protect preview; require factual/permission review for public content; test build, accessibility, responsive behavior, SEO, security, and recovery per site.
5. **G3 release gate:** a production provider, paid service, DNS change, and public launch each remain subject to current terms/cost review, security/recovery evidence, and explicit G3 authorization. G2 or a local build is not G3. [I2][I9][I12]

## 7. Evidence and acceptance matrix

“Documentation” below means a source or planning artifact was read; it does not mean a site/product operation passed. “NOT RUN” is the current status unless explicitly noted. No browser rendering, screenshot, product test, or user test is claimed. [I7][I8][I9][I10][I11][I12]

| Acceptance area | Documentation/planning evidence available | Product/site proof and current status | Future acceptance evidence |
|---|---|---|---|
| D-009–D-013 scope and truth gates | Decision/status and Phase 6/7 artifacts read; D-012 agency planning inputs and D-013 conditional narrow foundation approval recorded. [I1][I2][I6][I7] | Owner approval is conditional, not G2 completion; independent re-review PASS is recorded in `research/phase-7/d013-owner-proposal-rereview.md`, while Phase 6/7 parent reconciliation remains pending. No public copy approved. Identity-dependent copy/public launch remain blocked. **G2 NOT COMPLETE.** | Reconcile Phase 6/7 parents before recording G2; dated claim/source/permission register before public claims. |
| Dual-track sitemap and content | P7.1/P7.2 provide separate track proposals; D-012 plans agency Home/Services/Contact, conditional About, and omits Work/Insights for now. [I1][I2][I6][I7] | No user research, client brief, rendered site, or page approval. **NOT RUN.** | Owner review at G2; actual client brief per project. |
| CMS/editor routes | Astro/Sanity/Storyblok first-party documentation and comparative/test-plan artifacts reviewed. [I8][I9][I10][E1][E2][E3][E4][E5][E6][E7] | No route selected. All six Phase 7 route/audience product cases **NOT RUN**; live tests require separate authorization. Prior Storyblok product test remains account/plan blocked; mock checks do not count as product pass. [I10] | Six separately recorded synthetic test cases; direct permission/preview checks; publish/rebuild; complete export and clean restore. |
| Agency proof and service claims | D-011 says no agency proof is publishable now; named service categories are planning inputs only. [I1][I4] | No new proof or capability validated. **No publishable proof supplied; capability proof NOT RUN.** | Owner-supplied scope/evidence, factual basis, rights, and approval—or omit/defer. |
| Client proof and claims | P7.1/P7.2 require per-client sources and permission. [I6][I7] | No actual client/site or proof inventory. **UNKNOWN / NOT RUN.** | Client-specific claims/evidence/permission register and approval. |
| Contact/form | D-012 keeps the agency simple form as a gated plan; project architecture/security sources define provider, privacy, validation, and abuse gates. [I1][I2][I9][I11][I12] | Contact page is planning only. No provider, recipient, data flow, live form, submission, or delivery test. **NOT LIVE; NOT RUN / BLOCKED pending decisions.** | Approved data map and provider terms; synthetic success/failure, abuse, accessibility, and recipient checks before any live form or collection. |
| Responsive/accessibility | WCAG 2.2 AA is the project target; design documents specify future checks. [I3][I5][I7][E8] | No implementation, screenshot, keyboard/AT review, contrast measurement, or conformance test. **NOT RUN.** | Rendered desktop/tablet/mobile review, keyboard/manual checks, automated support, and recorded findings; no certification claim without evidence. |
| Ownership/preview/recovery | Architecture/security planning specifies isolation, protected preview, client-owned copies, and separate rollback/restore. [I9][I11][I12] | No host, preview, backup, revocation, or clean restore exercised. **NOT RUN.** | Per-site owner/access register, anonymous denial evidence, clean restore and owner sign-off, revocation test. |
| Static build/performance/SEO/security | Project standards and delivery plan define prospective checks. [I3][I9][I11][I12] | No source implementation, CI/build, deployment, Lighthouse/CWV measurement, SEO scan, or security scan. **NOT RUN.** | Approved scope-specific OpenSpec, reproducible build/CI, route/output and metadata checks, accessibility/performance/security/recovery evidence. |
| G2/G3 | D-013 conditionally authorizes only the route-neutral static-first foundation, subject to independent review PASS and Phase 6/7 reconciliation. [I1][I2] | Independent corrected-proposal review PASS (`research/phase-7/d013-owner-proposal-rereview.md`); parent reconciliation pending. **G2 NOT COMPLETE; foundation NOT DISPATCHABLE. G3 BLOCKED.** No CMS/form/account/production authorization. | Reconcile Phase 6/7 parent evidence before G2 completion; separate G3 approval before paid/production/DNS/public launch. |

## 8. G2 owner decision register

For each unresolved item, record either a decision or an explicit deferral with owner, evidence needed, and whether it blocks implementation, publication, or both. Deferral is not permission to assume a default. [I6][I7][I9]

| Decision area | Must be resolved at G2 (answer or explicit blocking deferral) | May be deferred only with a named gate |
|---|---|---|
| Two-track scope | Confirm agency-site purpose and approve the client-site archetype as a discovery boundary—not a universal client spec. | Actual future client, profession, audience, language, content, and pages require that client’s own brief/approval. |
| Agency identity and audience | D-012 sets the agency audience as English speakers in Israel and explicitly defers public name/person identity. Keep identity-dependent copy and public launch blocked until real identity is supplied; no identity is inferred from the audience. | Future client audience, language, geography, and jurisdiction remain client-specific. Agency identity and associated copy can remain deferred; no invented name, person/team, buyer, or claim. |
| Service categories and claims | Decide whether the proposal may carry the named Astro static/Astro CMS categories as planning labels, and identify what substantiates the actual scope before service copy/publication. | Detailed copy, capability evidence, exclusions, and any specific offering may block publication until verified; do not claim capability meanwhile. |
| Page families and proof | Record D-012's agency planning scope: Home/Services/Contact; About only if real identity is confirmed; omit Work and Insights for now. G2 review may revise the plan but does not authorize unsupported claims. Keep client archetype as an optional discovery menu only. | Reopen omitted pages only with a later owner decision and relevant evidence/editorial capacity. Any future agency/client proof item requires item-level source, substantiation, permissions, and owner approval. |
| Visual/content hierarchy | Review a concrete proposal applying clean corporate minimal to both distinct tracks; approve/revise responsive order and quality checks. No A/B/C is selected here. | Final rendered tokens/assets can be completed only within an approved implementation scope and reviewed before publication. |
| Contact scope | D-012 retains the simple form as a plan only; it is NOT LIVE. Do not guess a recipient or claim a working contact route. Any non-form route also requires an owner-supplied, verified, approved recipient/channel. Confirm client contact remains client-specific. | Provider, fields, recipient, privacy/legal review, data flow, retention, abuse controls, and synthetic delivery tests are separate prerequisites before any form is live or collects data. |
| CMS/editor plan | Keep Markdown/MDX, Sanity, and Storyblok unselected pending separately authorized tests; do not choose a CMS or host by implication. | Accounts, invitations, plan/trial, product tests, CMS/host choice, preview configuration, and route-specific schema require separate explicit authorization. |
| Ownership and recovery | Confirm agency owner controls its own site and that each client controls its own project; approve the per-site isolation and handoff principle. | Exact provider/account, role configuration, recovery cadence/retention, and successful restore must be established for the selected site/route before a recovery claim or production commitment. |
| Implementation boundary | D-013 conditionally approves only route-neutral static-first Astro/TypeScript foundation with local development, automated verification and hosted CI, after independent review PASS and Phase 6/7 reconciliation. Record those conditions before G2 completion or dispatch. | CMS/form integration, client-specific builds, further scope, G3, paid services, production hosting, DNS, and public launch require separate decisions. |

**Explicitly not selected or authorized beyond D-013's conditional narrow foundation:** CMS or plan; hosting/vendor; agency public name/person identity; client-specific content/language/geography/proof/contact route; form provider or data collection; final design tokens/assets or public copy; account/trial/purchase; CMS/form/client-specific implementation; production, DNS, or launch. The clean corporate-minimal responsive planning direction is conditionally accepted, not a completed visual system. The agency audience is English speakers in Israel, but this does not define any future client's audience or locale. [I1][I2][I9]

## 9. Verification performed and limits

- Read the required governance, Phase 6 design/skills and DESIGN inputs, accepted Phase 7.1–7.4 artifacts, CMS comparison, architecture/security sources, and only the invalidation header of the old interim agency-site document. D-012 is recorded as agency-only planning input; the invalidated body was not used as requirements. [I1][I2][I3][I4][I5][I6][I7][I8][I9][I10][I11][I12][I13]
- Reviewed documentation-level claims and inherited first-party source URLs. No account, live CMS task, form submission, build, restore, deployment, screenshot, accessibility evaluation, or user research occurred for this proposal.
- Every table, sitemap, workflow, and acceptance item is proposed unless explicitly identified as owner input or project rule. Product/site criteria remain **NOT RUN** or **BLOCKED** as marked.
- D-013 conditionally authorizes only the narrow foundation after review PASS and Phase 6/7 reconciliation; G2 remains incomplete and no implementation is dispatchable yet. G3 remains blocked. No account, purchase, production service, DNS change, or public launch is authorized. [I1][I2]

## Sources

Internal source IDs point to repository documents and the cited headings/line ranges as read for this proposal. External pages are first-party documentation references; the P7.1/P7.4 artifacts record reopening them on 2026-09-24. Claims are bounded to documentation, not this project's configuration or results.

- **[I1]** `DECISIONS.md`, D-009–D-013 (lines 77–121): Astro-first planning scope, two tracks, CMS comparison boundary, D-012 agency-only page/audience/identity/form clarifications, and D-013's conditional narrow foundation approval (not G2 completion or G3 approval).
- **[I2]** `PROJECT_STATUS.md`, current authorization/task (lines 3–6), pending approvals and D-010–D-013 inputs (lines 34–50), Phase 6/7 and G2/G3 rows (lines 120–152 and 173–183): conditional foundation authorization and incomplete gate status.
- **[I3]** `AGENTS.md`, architectural/development/security/research standards (lines 19–58), testing and OpenSpec requirements (lines 87–110), documentation/status rules (lines 112–118).
- **[I4]** `docs/06-design.md`, decision boundary/truthful content (lines 9–17), D-010/D-011 open items (lines 63–82), verification limits (lines 105–112).
- **[I5]** `DESIGN.md`, audience/message and provisional visual inputs (lines 7–23), responsive order (lines 25–32), form/interaction requirements (lines 34–39), G2 and future browser checks/limitations (lines 41–64).
- **[I6]** `research/phase-7/dual-audience-spec-outline.md`, decision boundary (lines 7–17), client and agency tracks (lines 38–98), separate content/ownership boundary (lines 99–105), form/language/proof gates (lines 122–160), source and verification register (lines 180–217).
- **[I7]** `research/phase-7/dual-track-ia.md`, agency candidate IA/inventory (lines 22–76), client archetype/inventory (lines 117–169), optional blog/proof and permission gates (lines 209–237), G2 register (lines 252–276), verification/source register (lines 278–301).
- **[I8]** `research/phase-7/editor-content-test-plan.md`, route/audience cases (lines 9–22), authorization/actors (lines 54–80), preview/export/restore tests and evidence rules (lines 96–201), blockers and limitations (lines 203–257).
- **[I9]** `research/phase-7/dual-track-delivery-plan.md`, hard boundaries/G2/G3 (lines 27–55), static-first sequence (lines 100–161), acceptance/evidence matrix (lines 163–212), open questions/source register (lines 214–279).
- **[I10]** `research/astro-only/dual-track-cms-comparison.md`, all three route comparisons (lines 25–92), evidence/unknowns (lines 94–104), acceptance tests/open decisions (lines 106–123), first-party URLs and verification record (lines 125–161).
- **[I11]** `docs/05-architecture.md`, Astro static/on-demand gate (lines 47–73), ownership/isolation and forms (lines 210–239), backup/restore/rollback (lines 241–256).
- **[I12]** `docs/05-security.md`, protected preview and form controls (lines 206–230), backup/restore/rollback evidence (lines 247–290), production gates (lines 316–347).
- **[I13]** `docs/07-agency-site.md`, opening invalidation notice only (lines 1–9); superseded recommendations were not used.

First-party external references (documentation claims only):

- **[E1]** Astro Docs, “Content collections”: https://docs.astro.build/en/guides/content-collections/
- **[E2]** Sanity Docs, “Roles”: https://www.sanity.io/docs/user-guides/roles
- **[E3]** Sanity Docs, “Export a dataset”: https://www.sanity.io/docs/content-lake/exporting-data
- **[E4]** Sanity Docs, “Import data”: https://www.sanity.io/docs/content-lake/importing-data
- **[E5]** Storyblok Docs, “Roles”: https://www.storyblok.com/docs/concepts/roles
- **[E6]** Storyblok Docs, “Visual Editor”: https://www.storyblok.com/docs/concepts/visual-editor
- **[E7]** Storyblok Docs, “Backups”: https://www.storyblok.com/docs/concepts/backups
- **[E8]** W3C, “Web Content Accessibility Guidelines (WCAG) 2.2”: https://www.w3.org/TR/WCAG22/
- **[E9]** Astro Docs, “On-demand rendering”: https://docs.astro.build/en/guides/on-demand-rendering/
