# Phase 2 — CMS scenarios, permissions, and point-in-time costs

**Task:** P2.2 — model CMS suitability, permissions/ownership/security, and costs for agency, small-client, and advanced-editorial scenarios at 1, 5, and 20 websites.
**Retrieval date for all external facts and prices:** 2026-09-22 (UTC). Volatile prices, plan limits, seat caps, and vendor claims must be re-retrieved before customer-facing or contractual use.
**Scope:** this artifact only. No CMS is selected here (`DECISIONS.md` D-005 forbids a universal CMS decision before scenario testing), no account was created, and no proof of concept was executed. Selection belongs to P2.4/P2.7.

Evidence labels used throughout (`AGENTS.md` research standards):

- **FACT** — stated by a cited first-party source or a binding project document.
- **ESTIMATE** — arithmetic or judgement derived from cited facts, not a market fact.
- **RECOMMENDATION** — proposed operating choice, pending the applicable owner checkpoint.
- **UNKNOWN** — not established by available evidence, or not testable without accounts.

---

## 1. Method, evidence limits, and what was not tested

**FACT (method):** every price, seat cap, role, retention figure, and quota in this document was read from a first-party page on 2026-09-22. Page bodies were retrieved with a text extractor; the Sanity plan-comparison table renders client-side, so it was read from the live DOM in a headless browser at the same URL as [1]. The EmDash MIT licence was confirmed through the GitHub licence API and by decoding the repository `LICENSE` blob [23]; the Keystatic core licence was confirmed the same way [15].

**FACT (limits):** no account was created for any of the five options, no plan was purchased, no seat was assigned, no export/backup/restore was executed, and no permission change was exercised in a real project. Everything below is documentation-backed, not exercised. `AGENTS.md` requires this to be reported as a limitation, and it is reported again in §8.

**FACT (pricing shape):** all prices are the vendors' published list prices in USD per month at the retrieval date. Self-serve Sanity plans are monthly-only (no annual prepay, card payments only; invoicing is Enterprise-only) [1]. Storyblok publishes annual-billing figures alongside monthly ones (Growth `$99.00/mo` or `$90.75/mo`; Growth Plus `$349.00/mo` or `$319.91/mo`) [7]. This document uses the **monthly** figure in every calculation and states that choice explicitly, because month-to-month is the honest posture for a new agency with an unproven client base.

**UNKNOWN:** whether any vendor's plan structure, seat definition, or quota will still hold at contracting time; vendor pages carry no change log for plan limits.

---

## 2. Scenario definitions and explicit assumptions

The scenario shapes are derived from the accepted Phase 1 segments and packages (`docs/01-business.md` §§3–4; `DECISIONS.md` D-005, D-003) and made numeric here so every cost in §6 is reproducible.

### Scenario A — agency's own site

- **Shape:** 8–12 pages, one insights/article stream, one editor (the operator), no client handoff, no approval workflow, no localization.
- **Assumptions:** A1 the operator is technical and owns every account; A2 one billable editor seat with repository access by definition; A3 fewer than 200 documents; A4 content changes are weekly and can tolerate a rebuild.
- **Least-privilege posture:** not the binding constraint; the operator legitimately holds admin rights on their own property.

### Scenario B — small professional-services client (`docs/01-business.md` Segment B)

- **Shape:** 8–15 pages plus an insights stream; two non-technical client editors (for example an office manager and a partner); one agency developer who maintains schema, Studio/theme deployment, and integrations; single language; 200–500 documents; monthly copy edits plus occasional posts.
- **Assumptions:** B1 the client owns domain, hosting, CMS account, repository, analytics, and backups (D-003, `docs/01-business.md` §7); B2 **two** client editor seats; B3 **one** billable agency seat per site while the site is under active work; B4 client editors must **not** receive repository or platform-administrator access (`AGENTS.md` §Security); B5 scheduled publishing and approval workflows are not required.
- **Binding constraint:** B4. Any option whose only non-read-only role is a platform administrator, or whose editing path requires repository write access, fails this scenario as configured.

### Scenario C — advanced editorial client (`docs/01-business.md` Segment A)

- **Shape:** multi-author publication; eight authors/editors plus one agency seat; draft/approval separation; scheduled publishing; version history of at least 90 days; media library; two locales; 5,000–25,000 documents; meaningful public traffic.
- **Assumptions:** C1 **eight** client editorial seats plus **one** agency seat (nine billable seats); C2 two locales; C3 10,000 documents; C4 up to 1,000,000 API CDN reads/month; C5 custom roles, release/scheduling workflow, and audit retention are required features, not nice-to-haves.
- **Note:** for a publication whose core need is membership, Portal, and newsletters, the Ghost path in `docs/03-ghost.md` governs (D-004). Scenario C here covers the **Astro-headless** publication case only.

### Site counts

1, 5, and 20 websites under each scenario. Per D-003, every site is assumed to be its own isolated repository, account, CMS instance, and backup — no shared tenancy is priced in, and none of the totals below assume an agency-owned multi-tenant platform (`AGENTS.md` architectural constraints).

---

## 3. Option fact sheets

### 3.1 Sanity (hosted content platform)

**Permission model and seats — FACT.** A seat is consumed by every user type except **Viewer**, which is free on all plans; if a Viewer is also given another role, that user becomes billable. The **Free** plan includes **20 seats but only two roles, Administrator and Viewer** — the Editor, Developer, and Contributor roles exist only from Growth [1]. The **Growth** plan is `$15` per seat per month with up to 50 seats and five roles; **Enterprise** has custom seats and roles [1]. Sanity's roles guide states that roles govern dataset and document access, that custom roles, custom content resources, and user attributes are paid Enterprise features, that dataset **tags** are a Growth feature, and that permission grants are additive and cascade from "all datasets" down to individual datasets [2].

**Isolation — FACT.** "A member of one project is not automatically granted access to any other, though an administrator member may invite them"; organization membership does not imply project access; "the roles in each project are created uniquely" [1]. This means one project (and therefore one Studio) per client site, with per-project membership — native isolation that matches D-003.

**Project/site limits — FACT (Growth figures, [1]).** 2 datasets (Free: public only; Growth: private or public); 10,000 documents on Free / 25,000 on Growth; 2,000 unique attributes per dataset on Free / 10,000 on Growth; 1,000,000 API CDN requests and 250,000 API requests per month on both; 100 GB assets and 100 GB bandwidth on both; live retention 15 minutes; 2 GROQ webhooks on Free / 4 on Growth. Extra datasets cost `$999` per dataset per month and the "Increased quota" add-on is `$299`/month; overage rates are `$1` per 250k CDN requests, `$1` per 25k API requests, `$0.50` per GB assets, `$0.30` per GB bandwidth [1].

**Ownership and transfer — FACT.** Projects live in an organization that is the billing point; a project can be moved between organizations by an owner after claiming, and the claim link transfers ownership of an unowned project to whoever signs in with it [1][6]. Organization administrators, or a Billing Manager role, control billing [1].

**Export — FACT.** Datasets export through the CLI (`sanity dataset export`) and imports run through `sanity datasets import`; exports are **billed against the API quota** and documents are streamed to limit that; dataset visibility can be switched with `sanity dataset visibility set` [4][5].

**Backups and recovery — FACT.** Sanity's managed backup service is a **paid Enterprise feature**: daily dataset backups retained 365 days plus weekly backups for two further years, enabled per dataset through `sanity backups enable`, listed and downloaded through the CLI, and restored by importing the tarball with `--replace`. The documentation is explicit that an import **is not a point-in-time reset** — it never removes documents that exist in the target but not in the backup — so an exact rollback requires deleting and recreating the dataset or running a content migration [3]. Without a backup-entitled plan, the documented recovery path is manual CLI export/import [3][4]. Draft history in "Review Changes" is 3 days on Free, 90 days on Growth, 365 days on Enterprise; the activity feed retains 90 days on Growth and 365 on Enterprise; the History API and full audit trail are Enterprise [1].

**Hosting requirements — FACT.** Content Lake and Studio hosting are managed by Sanity ("free hosting" is included on every plan); a Studio can be published to a `sanity.studio` address with `sanity deploy`, which requires a claimed project with an owner [1][6]. The public site remains the client's Astro deployment.

**Security responsibilities — FACT.** Access tokens are project-specific credentials that must never be shipped in browser JavaScript or committed to repositories, and a leaked token must be deleted rather than trusted again [5]. Custom roles, content resources, and user attributes — the mechanisms for field- or document-level restriction — are Enterprise features, and Sanity documents a specific privilege-escalation pitfall: a mis-typed or missing user attribute can make a GROQ filter evaluate to "grant access to everything" [2]. On a **public** dataset, unauthenticated requests can read any document whose `_id` contains no dot, which excludes drafts and release versions; **asset files are never private, even in a private dataset** [5][6]. A private dataset requires a token and is a Growth-and-above feature [6].

**Direct first-party URLs:** pricing [1] `https://www.sanity.io/pricing`; roles [2] `https://www.sanity.io/docs/user-guides/roles`; backups [3] `https://www.sanity.io/docs/content-lake/backups`; datasets [4] `https://www.sanity.io/docs/content-lake/datasets`; data-safety/dataset visibility [5] `https://www.sanity.io/docs/content-lake/keeping-your-data-safe`; unclaimed projects and dataset privacy [6] `https://www.sanity.io/docs/getting-started/projects-without-an-account`.

### 3.2 Storyblok (hosted content platform)

**Permission model and seats — FACT.** Seats are sold per **space**: Starter includes 1 seat with a maximum of 2 and "add 1 more user at `$15.00`/month"; Growth is `$99.00`/month with 5 seats included, a maximum of 10, and `$15.00` per additional seat; Growth Plus is `$349.00`/month with 15 seats included. Premium and Elite are custom-priced [7]. Default space roles are **Owner, Admin, Editor**, with fixed permissions; custom roles are configurable only on Premium (10) and Elite (unlimited) [7][9][10]. Roles can be applied per space, a user can hold multiple roles in one space, and **the more restrictive role wins** when permissions conflict [9].

**Isolation — FACT.** A space is the per-project content repository holding its own stories, blocks, assets, datasources, configurations, users, roles, and access tokens; subscriptions are per space, and one account can create many spaces [7][8].

**Project/site limits — FACT ([7]).** Spaces per plan: 1 on Starter, Growth, and Growth Plus. Starter: 100 GB traffic with **no extra purchasable**, 100k API requests with no extra, 2 locales with no extra, 20,000 stories, 2,000 assets (500 MB max asset), 3 webhooks, 100 content folders, 200 components, no uptime SLA, versioning/activity/webhook-log retention 1 day. Growth: 400 GB traffic included (up to 1 TB, `$75` per extra 250 GB), 1M API requests (up to 5M, `$10` per extra 1M), extra locales at `$20` each, 25,000 stories, 2,500 assets (1,000 MB max asset), 5 webhooks, 97% uptime SLA, 30-day retention. Asset counts and stories become unlimited only on Premium and Elite; the Storyblok comparison table lists Growth's maximum locale count as unlimited while its plan card lists two included.

**Ownership and transfer — FACT.** Space ownership transfers only to an account **already added as a user of that space**: "Open Settings → Users… Select the cog icon next to the Owner role, then choose Transfer ownership" [8]. Space settings, maintenance mode, deletion, and duplication are restricted to owners and admins [8].

**Export — FACT.** Storyblok "only delivers JSON" and is intended to be combined with any static site generator, so the site output is not vendor-hosted [7]. Datasource entries can be exported by the Editor role per the official collaborator role table [10]. **UNKNOWN:** this task did not locate a first-party page documenting a full space export/import or a self-service content dump, so no export claim is made beyond the JSON delivery model.

**Backups and recovery — FACT.** Managed backup services are marked as a paid item on Premium and Elite only; S3 backup frequency is weekly on Premium and daily on Elite, with retention of 180 days (Premium) and 7 years (Elite) [7]. No backup frequency is offered on Starter, Growth, or Growth Plus.

**Hosting requirements — FACT.** Content is delivered through Storyblok's CDN regardless of the selected space location; the site itself is built and hosted by the agency/client [7][8]. **Environments** (separate staging/testing environments) are a Premium/Elite feature, so a self-serve plan has no documented staging environment [7].

**Security responsibilities — FACT.** Custom roles, SSO, SCIM, restricted IP ranges, security audits, and advanced access-token scopes are Premium/Elite features; managed backups, preferred data centres, and enterprise assets libraries are likewise gated [7]. The client owns the space and its tokens; the agency works inside it.

**Direct first-party URLs:** pricing and plan comparison [7] `https://www.storyblok.com/pricing`; spaces, ownership transfer, multi-space guidance [8] `https://www.storyblok.com/docs/manuals/spaces`; roles and permissions model [9] `https://www.storyblok.com/docs/concepts/roles`; collaborator role table [10] `https://www.storyblok.com/docs/terminology/collaborator`.

### 3.3 Keystatic (Git-backed editor, open source + optional hosted auth)

**Permission model — FACT.** Keystatic stores content as files in the client repository. In **GitHub mode** "collaborators will need `write` access to this repository", and authentication is derived from each user's access to that repository through a GitHub App the agency creates and installs [13]. In **local mode** content is read from and written to the local filesystem and there is no editor authentication at all [12]. **Keystatic Cloud** replaces the GitHub App setup and adds authentication that "allows team members to edit content without needing a GitHub account" [14]. The permission granularity available is therefore the Git host's (read/write/admin on a repository) plus Keystatic Cloud team membership — **no field-level, folder-level, or role-based editorial permissions are documented**.

**Isolation and access scoping — FACT.** Keystatic Cloud organises projects into teams; "each project is connected to a specific GitHub repository"; and critically, "user access is set at the team level, so every user in team will have access to all projects within that team" [14]. One team per client site is therefore the isolation unit. A `branchPrefix` option can restrict the admin UI to branches with a given prefix [13].

**Limits and seats — FACT.** The free Keystatic Cloud plan allows up to **3 users per team**, and "you can create as many teams and projects as needed"; **Pro** starts at `$10`/month per team with `$5`/month for each user beyond three, and applies only to the team it is purchased for [14]. Pro also adds Cloud Images (image storage/optimisation/delivery so binaries stay out of Git) and experimental multi-player editing [14]. **Limitation:** the Keystatic Cloud application itself (keystatic.cloud) redirects to a sign-in page and publishes no public pricing page, so the `$10`/`$5` figures are taken from the official documentation page [14] and were not cross-checked against a pricing page; third-party posts advertising `$9`/`$29`/`$79` tiers were found but are not first-party and are not relied on.

**Ownership — FACT (licence).** The Keystatic core is MIT-licensed in the official repository, so the editor software carries no per-seat licence fee [15]. Content lives in the client's own repository, which satisfies client ownership and portability directly.

**Export and backups — FACT/ESTIMATE.** There is no CMS database to export: content is the repository's Markdown/MDX/YAML/JSON files, and version history is Git history (**ESTIMATE**, derived from the documented file-based storage model [11][12][13]). Media files live in Git unless Cloud Images is enabled [14]. Recovery is repository-level (Git history, clones, the client's hosting backup), which makes backup *tooling* the client's/agency's responsibility rather than a vendor feature.

**Hosting requirements — FACT.** The site is the Astro (or Next.js/Remix) deployment; the host "must run Node.js for Keystatic's API routes", and the Keystatic environment variables must be copied to that host [13]. A purely static host without Node is not a documented deployment target.

**Security responsibilities — FACT.** In GitHub mode the agency operates a GitHub App and holds `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, and `KEYSTATIC_SECRET` in the deployment environment [13] — these are privileged credentials that must not reach browser bundles (`AGENTS.md` §Security). Content approval, scheduled publishing, and editorial workflow are not documented features of the product; every save is a commit.

**Direct first-party URLs:** product overview and storage modes [11] `https://keystatic.com/docs/introduction`; local mode [12] `https://keystatic.com/docs/local-mode`; GitHub mode, repo write access, deployment requirements [13] `https://keystatic.com/docs/github-mode`; Cloud pricing, team-level access, Pro features [14] `https://keystatic.com/docs/cloud`; core licence [15] `https://api.github.com/repos/Thinkmill/keystatic/license`.

### 3.4 EmDash (self-hosted Astro-native CMS, MIT)

**Status — FACT.** EmDash is an Astro integration that adds an admin panel, REST API, authentication, media library, and plugin system to an Astro project, and describes itself as being in **beta preview** [16][22]. Repository facts at the retrieval date: organisation `emdash-cms`, created 2026-04-01, 12,447 stars, 1,162 forks, 306 open issues, last push 2026-09-22, MIT licence with the copyright line "Copyright 2026 Cloudflare Inc." [16][23]. **ESTIMATE:** a five-month-old beta with 306 open issues is a material delivery risk for client sites, independent of its technical quality.

**Permission model — FACT.** Five built-in roles: **Subscriber (10)** read published content only, **Contributor (20)** create content requiring approval to publish, **Author (30)** create/edit/publish own content, **Editor (40)** manage all content, **Admin (50)** full access including settings; each role inherits lower levels, and the first user is always Admin. Admins invite users by email with a chosen role (invites valid 7 days, resendable/revocable); optional self-signup can be enabled for named email domains with a default role; Cloudflare Access can replace passkeys as the identity provider, with IdP groups mapped to role levels [18]. Subscribers hold read access to published member content but cannot see drafts, scheduled items, trash, revisions, or preview URLs [18].

**Authentication security — FACT.** Passkey (WebAuthn) first, with magic-link and OAuth (GitHub/Google) fallbacks; magic-link tokens are SHA-256 hashed; sessions are HttpOnly/Secure/SameSite=Lax with 30-day sliding expiry; login attempts are rate-limited to 5/minute/IP; users may register up to 10 passkeys [18].

**Isolation — FACT.** One deployment per site (Cloudflare Worker, or a Node.js server with SQLite); content lives in the same deployment as the site rather than a separate service [16][22]. This satisfies D-003 naturally, and non-technical editors never touch the repository.

**Limits — FACT.** No seat, document, or API metering is imposed by EmDash itself: it is self-hosted software, and its resource ceilings are the hosting platform's [16][21][27]. Sandboxed plugins are constrained to 50 ms CPU, 10 subrequests, 128 MB memory, and 30 s wall time per invocation [21].

**Ownership — FACT.** The software is MIT-licensed with no vendor account, so ownership is limited only by where it is deployed; content, schema, and users live in the client's own database [16][23].

**Export and backups — FACT.** An admin-role "Download backup" produces a **JSON** snapshot containing content entries (including drafts, scheduled, and trashed), collection and field definitions, taxonomies, menus, widgets, sections, SEO settings, revisions, media metadata, and site settings. Backups **exclude** user accounts, sessions, passkeys and API tokens, secrets, and **media binaries** — media stays in R2/S3/local storage and only its metadata is captured. Daily automatic backups can be written to the storage backend with retention of 1–30 archives. On Cloudflare D1, Time Travel provides point-in-time recovery for the whole database — 30 days on the paid plan, 7 days on free. Offsite raw SQL dumps use `wrangler d1 export`; on Node the database is a single SQLite file. **Restore from the JSON backup is deliberately not a one-click admin action yet**; current options are D1 Time Travel, re-importing a SQL dump, or a planned guided CLI restore [19].

**Hosting requirements — FACT.** Cloudflare Workers with D1 (database) and R2 (media), or Node.js with SQLite and S3-compatible storage; `EMDASH_AUTH_SECRET` and `EMDASH_PREVIEW_SECRET` are required secrets for production and preview; schema changes are applied with `wrangler d1 migrations`; separate preview/preview-database environments are configured with `wrangler deploy --env preview` [20]. **Sandboxed plugins** ("marketplace and registry installs always run sandboxed") require the Cloudflare **Workers Paid** plan on Cloudflare because they use Dynamic Workers; on Node.js the sandbox runs `workerd` locally instead, so the Cloudflare paid requirement applies to the Cloudflare deployment path, not to Node [16][21].

**Security responsibilities — FACT.** The agency/client operates the runtime: secrets, database migrations, plugin sandbox configuration, and updates are all first-party responsibilities [20][21]. There is no vendor-operated control plane, SLA, or support contract behind the open-source project.

**Direct first-party URLs:** repository README, licence pointer, cloud requirements [16] `https://github.com/emdash-cms/emdash`; documentation index [17] `https://docs.emdashcms.com/llms.txt`; authentication and roles [18] `https://docs.emdashcms.com/guides/authentication/`; backups and recovery [19] `https://docs.emdashcms.com/guides/backups/`; Cloudflare deployment [20] `https://docs.emdashcms.com/deployment/cloudflare/`; plugin sandbox [21] `https://docs.emdashcms.com/deployment/plugin-sandbox/`; "Why EmDash?" [22] `https://docs.emdashcms.com/why-emdash/`; licence blob [23] `https://github.com/emdash-cms/emdash/blob/main/LICENSE`; content editing model [24] `https://docs.emdashcms.com/guides/working-with-content/`.

### 3.5 Astro content collections (no CMS; content in the repository)

**What it is — FACT.** Content collections are defined in `src/content.config.ts` with a required `loader` and an optional schema; the built-in `glob()` loader reads directories of Markdown, MDX, Markdoc, JSON, YAML, or TOML files and the `file()` loader reads a single local file, while remote sources need a custom loader or a community loader. Build-time collections are cached in the content layer; **live** collections fetch at request time through `getLiveCollection()`/`getLiveEntry()` with cache hints, and cannot render MDX, cannot optimise images, and do not persist to the data store [25].

**Permission model — FACT.** No user, role, seat, or permission model is documented, because content is files inside the project [25]. Editing is therefore repository editing. There is no intermediate privilege: a person can write to the repository (and therefore change code, configuration, and content) or cannot change content at all.

**Hosting requirements — FACT.** A purely static build needs no server. If any route is rendered on demand — which is what live collections and CMS-preview-on-request need — the project must add a server adapter (Node.js, Netlify, Vercel, or Cloudflare are the Astro-maintained ones) and either set `output: 'server'` or mark routes with `export const prerender = false` [26]. The customer-facing effect: preview-against-draft content turns a static site into a server-rendered one, with the hosting and security responsibilities that implies.

**Cost — FACT.** Astro is MIT-licensed and the collections APIs are part of the framework, so there is no vendor platform cost. **ESTIMATE:** the costs that appear instead are labour (who edits Markdown, and how a build is triggered and verified) and the hosting/adapter cost of any on-demand route.

**Backups and export — FACT/ESTIMATE.** Content is the repository, so export/portability is inherent and copy operations are Git operations. Media placed in the repository inflates repository size; there is no media library UI.

**Direct first-party URLs:** content collections [25] `https://docs.astro.build/en/guides/content-collections/`; on-demand rendering and adapters [26] `https://docs.astro.build/en/guides/on-demand-rendering/`.

---

## 4. Permission, ownership, and access matrix

Legend: **Editor-only client access** = can the client's non-technical staff edit without administrator or repository rights? **Agency access** = what the agency must hold to do its work.

| Option | Client editor role available without admin | Repository access needed by editors | Git identity needed by editors | Agency access level required | Client-owned accounts | Isolation unit |
|---|---|---|---|---|---|---|
| **Sanity Free** | **No.** Only Administrator and Viewer exist; an editor is a project administrator [1] | No | No | Administrator (no lesser role exists) [1] | Yes (project + organization) | Project (`_id`-scoped, per-project membership) [1] |
| **Sanity Growth** | **Yes.** Editor, Developer, Contributor roles; Viewer seats free [1][2] | No | No | Editor/Developer seat, `$15`/seat/mo [1] | Yes | Project [1] |
| **Storyblok Starter** | **Yes.** Editor role available from the free plan [7][9][10] | No | No | A seat in the client's space: `$15`/mo when the space is over its included seat [7] | Yes (space) | Space (1 per self-serve plan) [7][8] |
| **Storyblok Growth+** | Yes, plus custom roles on Premium/Elite only [7][9] | No | No | `$15`/seat beyond the included five [7] | Yes | Space [7][8] |
| **Keystatic (GitHub mode)** | Not applicable — there are no editorial roles | **Yes — `write` access to the repository** [13] | **Yes — GitHub account** [13] | Repo access + GitHub App secrets [13] | Yes (repo is the client's) | Repository |
| **Keystatic Cloud** | Cloud handles auth so editors need **no GitHub account** [14] | No GitHub repo access required for editors (auth via Cloud) [14] | No [14] | Team membership; access is **team-wide across all projects in that team** [14] | Yes | Team (one team per client) [14] |
| **EmDash** | **Yes — five-role RBAC including Contributor (approval-gated) and Author** [18] | No | No | Admin/Editor in the site's own admin, plus hosting access where the agency operates the deployment [18][20] | Yes (Cloudflare/Node account + database) | Deployment per site [16][22] |
| **Astro content collections** | **No.** No role model exists; content editing is repository editing [25] | **Yes** | **Yes** | Repo access (the agency is the editor) | Yes (repo is the client's) | Repository |

**FACT (directly relevant to `AGENTS.md` §Security "clients do not receive unnecessary repository or platform-administration access"):**

1. **Sanity Free cannot express least privilege.** With only Administrator and Viewer roles, any client staff member who needs to edit is a project administrator — able to manage members, API tokens, datasets, and the organization's billing [1]. Giving a small-client editor "just editing" therefore requires the Growth plan (`$15`/seat/mo), or accepting the over-privilege. The same constraint applies to the agency side: on Free, the agency developer is also an administrator of the client's project.
2. **Keystatic's GitHub mode and Astro content collections both make repository write access the editing permission.** For scenario B that is precisely the access `AGENTS.md` rules out; Keystatic Cloud removes the GitHub-account requirement but replaces it with team-wide access to every project in the team, so the mitigation is one team per client, not a role [13][14][25].
3. **Storyblok and EmDash can express least privilege on free/near-free tiers** (Storyblok's Editor role; EmDash's Contributor/Author/Editor roles) [7][9][18].
4. **No option requires handing the client platform-administrator rights to the *agency*** except where the agency deliberately holds them; the risk is the reverse direction — the agency receiving more access than the work needs. The two cases to watch are Sanity on Free (administrator is the only non-viewer role) [1] and EmDash hosted by the agency (deployment/hosting admin implies database and secret access) [20][21].
5. **Repository access is never required for editing on Sanity, Storyblok, or EmDash**; on Keystatic GitHub mode and Astro content collections it is the only editing path [1][7][13][18][25].

---

## 5. Cost model — formulas and reproducible totals

**FACT (price constants, all retrieved 2026-09-22, monthly USD):** Sanity Growth `$15.00`/seat/month [1]; Storyblok extra seat `$15.00`, Growth `$99.00` (5 seats included, max 10), Starter max 2 seats [7]; Keystatic Cloud Pro `$10.00`/team/month plus `$5.00` per user beyond three [14]; Cloudflare Workers Paid `$5.00` minimum per account [27]; Astro content collections and the Keystatic and EmDash software `$0.00` in licence fees [15][16][23][25].

**Formulas (exact arithmetic used by the verification script):**

1. Sanity Growth: `cost_per_site = billable_seats × 15.00`; `total = sites × cost_per_site`. Viewers are excluded from seats [1].
2. Storyblok self-serve: `users ≤ 2 → (users − 1) × 15.00`; `2 < users ≤ 10 → 99.00 + (users − 5 when users > 5, else 0) × 15.00`; `users > 10 → no self-serve plan (Premium/Elite are custom-priced)` [7].
3. Keystatic Cloud: `users ≤ 3 → 0.00`; `users > 3 → 10.00 + (users − 3) × 5.00` per team (one team per client site) [14].
4. EmDash hosting: `5.00` per client Cloudflare account with the Workers Paid plan (needed for sandboxed plugins on Cloudflare); `0.00` on the Workers Free plan with sandboxed plugins disabled [16][21][27].
5. Astro content collections: `0.00` platform cost; any on-demand route adds the chosen host's plan and an adapter [25][26].

**Excluded from every figure below (and therefore not a total cost of ownership):** agency labour, domains, TLS, email, forms, analytics, image CDN, the Astro/R2 hosting of the public site, transaction fees, and taxes. Labour is deliberately unpriced — `docs/01-business.md` §8 records capacity and hours as UNKNOWN until P9.5.

### 5.1 Seats per website implied by the scenarios

| Scenario | Client editor seats | Agency seats | Billable seats | Source of the shape |
|---|---|---|---|---|
| A — agency site | 0 | 1 | 1 | §2 scenario A |
| B — small client | 2 | 1 | 3 | §2 scenario B (B2, B3) |
| C — advanced editorial | 8 | 1 | 9 | §2 scenario C (C1) |

### 5.2 Per-site monthly platform cost

| Option | A | B | C | Basis |
|---|---|---|---|---|
| Sanity Growth | `$15.00` | `$45.00` | `$135.00` | seats × `$15` [1] |
| Sanity Free | `$0.00` | `$0.00` | `$0.00` | 20 seats, but Administrator + Viewer roles only [1] |
| Storyblok | `$0.00` | `$99.00` | `$159.00` | A: Starter 1 seat; B: 3 users exceed the 2-seat Starter cap, so Growth; C: Growth, 9 seats = `$99` + 4 × `$15` [7] |
| Keystatic Cloud | `$0.00` | `$0.00` | `$40.00` | A: 1 user; B: 3 users = free tier; C: 9 users = `$10` + 6 × `$5` [14] |
| EmDash hosting | `$5.00` | `$5.00` | `$5.00` | Cloudflare Workers Paid minimum per account [27] |
| EmDash (sandboxed plugins disabled) | `$0.00` | `$0.00` | `$0.00` | Workers Free plan [27] |
| Astro content collections | `$0.00` | `$0.00` | `$0.00` | no vendor platform; editing is the project's labour or another tool [25] |

### 5.3 Totals for 1, 5, and 20 websites (monthly, and annual at 20 sites)

**Scenario A — agency's own site**

| Option | 1 site | 5 sites | 20 sites | Annual at 20 sites |
|---|---|---|---|---|
| Sanity Growth | `$15.00` | `$75.00` | `$300.00` | `$3,600.00` |
| Sanity Free | `$0.00` | `$0.00` | `$0.00` | `$0.00` |
| Storyblok Starter | `$0.00` | `$0.00` | `$0.00` | `$0.00` |
| Keystatic Cloud | `$0.00` | `$0.00` | `$0.00` | `$0.00` |
| EmDash (Cloudflare Workers Paid) | `$5.00` | `$25.00` | `$100.00` | `$1,200.00` |
| EmDash (Workers Free, no sandboxed plugins) | `$0.00` | `$0.00` | `$0.00` | `$0.00` |
| Astro content collections | `$0.00` | `$0.00` | `$0.00` | `$0.00` |

**Scenario B — small client (2 client editors + 1 agency seat per site)**

| Option | 1 site | 5 sites | 20 sites | Annual at 20 sites |
|---|---|---|---|---|
| Sanity Growth | `$45.00` | `$225.00` | `$900.00` | `$10,800.00` |
| Sanity Free | `$0.00` | `$0.00` | `$0.00` | `$0.00` |
| Storyblok Growth | `$99.00` | `$495.00` | `$1,980.00` | `$23,760.00` |
| Keystatic Cloud | `$0.00` | `$0.00` | `$0.00` | `$0.00` |
| EmDash (Cloudflare Workers Paid) | `$5.00` | `$25.00` | `$100.00` | `$1,200.00` |
| EmDash (Workers Free, no sandboxed plugins) | `$0.00` | `$0.00` | `$0.00` | `$0.00` |
| Astro content collections | `$0.00` | `$0.00` | `$0.00` | `$0.00` |

**Scenario C — advanced editorial client (8 client seats + 1 agency seat per site)**

| Option | 1 site | 5 sites | 20 sites | Annual at 20 sites |
|---|---|---|---|---|
| Sanity Growth | `$135.00` | `$675.00` | `$2,700.00` | `$32,400.00` |
| Sanity Enterprise features (custom roles, audit, backups) | custom | custom | custom | custom pricing (UNKNOWN) |
| Storyblok Growth | `$159.00` | `$795.00` | `$3,180.00` | `$38,160.00` |
| Storyblok Premium/Elite (custom roles, environments, backups) | custom | custom | custom | custom pricing (UNKNOWN) |
| Keystatic Cloud Pro | `$40.00` | `$200.00` | `$800.00` | `$9,600.00` |
| EmDash (Cloudflare Workers Paid) | `$5.00` | `$25.00` | `$100.00` | `$1,200.00` |
| Astro content collections | `$0.00` | `$0.00` | `$0.00` | `$0.00` |

### 5.4 Sensitivity notes

- **Sanity: seats, not sites, drive the bill.** At 20 sites the same option ranges from `$300` to `$6,000` per month depending only on seats per site (1 / 3 / 5 / 9 / 20 seats → `$300` / `$900` / `$1,500` / `$2,700` / `$6,000`). [1]
- **Sanity: the Free plan's 20 free seats do not buy least privilege.** They buy 20 *administrator* seats; editor-level access starts at `$15`/seat/month [1].
- **Storyblok: the Starter plan's 2-seat cap creates a `$84`/month cliff per site.** A client with one editor plus the agency fits Starter (1 included + 1 extra = `$15`/month); a client with two editors plus the agency needs Growth at `$99`/month, because Starter maxes out at two seats [7]. Both variants matter for small-client quoting.
- **Storyblok scenario C:** Growth at 9 seats (`$159`) is cheaper than Growth Plus (`$349`), but custom roles, environments, backups, and SSO are Premium/Elite only, so a scenario-C client that needs approvals, staging, or vendor backups is on **unpublished** custom pricing [7].
- **Keystatic: cost is a step function based on the third and fourth user.** Three users per team are free; a fourth costs `$15`/month (`$10` base + `$5`), and one Pro subscription covers one team only, so cost scales with the number of *clients that exceed three users*, not with site count [14]. GitHub mode costs `$0` at any seat count but requires repository write access for every editor [13].
- **EmDash: the licence is free, the platform bill is trivial, and the real cost is operational.** `$5`/month per client Cloudflare account assumes one account per client for isolation; a single shared account would cut that but break D-003's isolation posture. The unpriced items — updates, database migrations, plugin sandbox configuration, restore procedures, and the beta-stage risk [16][19][20][21] — dominate any comparison at 20 sites, and no measured hours exist yet (P9.5).
- **Astro content collections: `$0` in platform fees, and the trade is labour.** For scenario B and C the editing requirement is unsolved by the framework alone; either the agency performs content edits (service cost) or another editor layer from this list is added, at which point its costs and permissions apply [25].
- **Usage overages are unlikely to bind at these sizes (ESTIMATE).** Against scenario C's modelled 10,000 documents: Sanity Growth includes 25,000 documents, 1M CDN requests, 250,000 API requests, 100 GB assets and bandwidth [1]; Storyblok Growth includes 400 GB traffic, 1M API requests, 25,000 stories and 2,500 assets [7]; Cloudflare's paid Workers plan includes 10M requests and 30M CPU-ms, D1 includes 25bn rows read and 50M rows written per month, and R2's free tier includes 10 GB storage and 10M Class B operations [27]. Only storyblok's 2,500-asset ceiling and Sanity's API-request allowance are close enough to justify re-checking per client. **UNKNOWN:** Cloudflare D1 rows read under real traffic cannot be estimated without deployment data.

---

## 6. Responsibility matrix — who owns what

Client = the client organisation; Agency = this business; Vendor = the platform operator. "Client owns" reflects D-003 and `docs/01-business.md` §7.

| Responsibility | Sanity | Storyblok | Keystatic (GitHub mode / Cloud) | EmDash (self-hosted) | Astro content collections |
|---|---|---|---|---|---|
| Domain/DNS | Client [1] | Client [7][8] | Client | Client [20] | Client |
| Site hosting and TLS | Client (Astro deploy) | Client (Astro deploy) [7] | Client; host must run Node for Keystatic's API routes [13] | Client (Cloudflare Workers or Node server); secrets required [20] | Client (static host; adapter if on-demand) [26] |
| CMS platform billing | Client (organization) [1] | Client (per space) [7] | Client (Cloud Pro per team) or none [14] | none (MIT software); Cloudflare account if Cloudflare-deployed [16][23] | none |
| CMS content database | Vendor-hosted | Vendor-hosted | Client repository (files) | Client database (D1/SQLite) [20][22] | Client repository (files) [25] |
| Backups | Vendor feature is Enterprise-only; otherwise agency-run CLI export [3] | Vendor feature is Premium/Elite only [7] | Client/agency (Git and hosting backups) | Client/agency: JSON + daily archives + D1 Time Travel + SQL dumps [19] | Client/agency (Git) |
| Restore tests | Agency procedure; documented import is not a point-in-time reset [3] | Agency procedure (no vendor backup on self-serve) | Agency procedure (Git) | Agency procedure; no one-click restore yet [19] | Agency procedure |
| CMS/dependency updates | Vendor-operated platform; agency updates Studio code | Vendor-operated platform; agency updates the site build | Agency updates Keystatic/Astro/Node dependencies [13] | **Agency/client**: core migrations, EmDash upgrades, plugin updates, runtime patching [19][20][21] | **Agency/client**: Astro and dependency upgrades |
| Monitoring and incident response | Agency (site) + vendor (platform) | Agency (site) + vendor (platform) | Agency (site + editor API routes) | Agency/client end-to-end (no vendor control plane) [16][21] | Agency/client end-to-end |
| Secrets handling | Project tokens must not reach browsers or repos [5] | Space tokens/client-owned [7] | GitHub App client id/secret and `KEYSTATIC_SECRET` in the deployment env [13] | Auth and preview secrets managed in the deployment [20] | Build/deploy secrets only |
| Access revocation | Remove project member / organization member [1][2] | Remove collaborator from the space [8] | Remove team member and/or revoke repo access [13][14] | Revoke invite/role in admin [18] | Revoke repository access |
| Offboarding/exit | CLI export of each dataset [3][4] | JSON delivery model; full-space export not documented here (**UNKNOWN**) [7] | Repository clone is the content [11] | JSON backup + SQL dump [19] | Repository clone is the content [25] |

---

## 7. Least-privilege client workflow comparison

| Question | Sanity | Storyblok | Keystatic Cloud | EmDash | Astro content collections |
|---|---|---|---|---|---|
| Can a client editor work with **no** repo access? | Yes [1] | Yes [7] | Yes (Cloud mode) [14] | Yes [18] | **No** [25] |
| Does the client need a **Git identity**? | No | No | No (Cloud) / Yes (GitHub mode) [13][14] | No | **Yes** [25] |
| Is there a role below "administrator" for client staff? | **Only with Growth** ($15/seat) [1] | Yes, from free Starter (Editor) [7][9] | No editorial roles; GitHub permissions only [13][14] | Yes (Contributor/Author/Editor) [18] | No roles exist [25] |
| Can the client be denied settings/member/billing access? | Growth+ (Editor/Contributor) [1][2] | Yes (Editor, and custom roles on Premium) [7][9] | Not applicable/limited | Yes [18] | Not applicable |
| Does the agency need admin rights on the client's account? | On Free, yes (only role available); Editor/Developer on Growth [1] | No — a seat with Editor rights suffices [7][9] | Team membership; **team-wide across that team's projects** [14] | Editor/Admin in the site admin plus hosting access if it operates the deployment [18][20] | Repo write (the agency is the editor) |
| Where a paid seat is unavoidable | Growth seats for any non-admin editor [1] | Any user beyond the plan's included seats, and any 3rd user on Starter [7] | 4th user in a team [14] | None (no seat metering) | Not applicable |
| Where an **enterprise plan** is unavoidable | Custom roles, content resources, user attributes, SAML SSO, managed backups, full audit trail [1][2][3] | Custom roles, environments/staging, SSO/SCIM, managed backups, restricted IPs [7] | Not applicable (Pro is the top published tier) [14] | Not applicable (no vendor tiers) | Not applicable |

**RECOMMENDATION (permission posture, not a CMS choice):** for every client engagement, define in writing which role the client's staff hold, which role the agency holds, and which account holds billing — before any account is created. On Sanity Free the written answer would be "the client's marketing contact is an administrator", which conflicts with `AGENTS.md` §Security; that is a cost and posture decision (Growth seats) rather than a documentation exercise. On Keystatic GitHub mode the honest answer is "the client's editor can change the code repository", which is likewise a posture decision. On Storyblok Starter and EmDash both answers can be least-privilege at low or zero seat cost [7][18].
**No option in this study justifies giving a client repository-administrator or platform-owner rights for work that the agency performs**, and none of the scenarios in §2 require the agency to hold the client's billing account.

---

## 8. Unknowns and account-gated facts that remain untested

1. **No plan feature, seat cap, or quota was exercised.** All permission, export, backup, and recovery behaviour above is documentation-backed. `AGENTS.md` requires that documentation is not reported as a completed proof (P2.5/P2.6 exist for that).
2. **Storyblok full-space export/import and ownership-transfer mechanics** were not found in first-party documentation at this depth; the JSON delivery model and per-space ownership transfer are documented, a self-service content dump is not [7][8].
3. **Storyblok Premium/Elite and Sanity Enterprise pricing are unpublished** ("custom"), so scenario-C totals that need custom roles, environments, managed backups, SSO, or audit retention cannot be calculated from public pages [1][7].
4. **Storyblok self-serve plans document no staging environment**; Environments are Premium/Elite, so preview/staging separation is an enterprise-gated item for that option [7].
5. **Keystatic Cloud's live pricing page could not be verified**: `keystatic.cloud` serves a sign-in page with no public pricing [28]. The `$10` + `$5` figures come from the official documentation page [14]; third-party posts quoting `$9`/`$29`/`$79` tiers are not first-party and were not used.
6. **Sanity plan limits are per project or per organization?** The pricing FAQ describes plan selection at the project level and a seat allowance per plan; whether the 50-seat Growth allowance is shared across an organization's projects is not stated on the pricing page [1]. **UNKNOWN**, and material at 20 sites.
7. **Cloudflare account-role granularity** (whether a client can own a Cloudflare account and give the agency deployment-only access without account admin) was not researched; this affects EmDash's ownership posture at 20 sites.
8. **EmDash is a five-month-old beta with 306 open issues** at the retrieval date and documents restore friction (no one-click restore) and excluded auth data in backups [16][19]. Production suitability is UNKNOWN and cannot be resolved by document review.
9. **No cost of agency labour is stated anywhere in this document** by design; `docs/01-business.md` §8 and P9.5 own that measurement.
10. **Vendor drift:** every price and limit here is a 2026-09-22 snapshot; all figures must be re-retrieved before quoting a client.

---

## 9. Verification record

- **Retrieval:** all first-party pages listed in §10 were opened on 2026-09-22 (UTC). The Sanity pricing plan-comparison table was read from the live DOM in a headless browser because the extractor received only the table's headings; the page URL and the retrieved figures are recorded in §3.1.
- **Independent recomputation:** `/root/.hermes/profiles/dsflash2/cache/scratch/p22_costs.py` (run with `python3 p22_costs.py`) holds every price constant, formula, seat assumption, and table in §5, recomputes each 1/5/20 total twice (per-site × count, and explicit repeated-sum), and asserts the two agree for every cell. It also decodes the cached EmDash licence blob and asserts the MIT licence text and the "Copyright 2026 Cloudflare Inc." line, and prints the sensitivity probes and quota-headroom checks quoted in §5.4. Both scripts live outside the repository, so this artifact is the only changed file.
- **Deliverable re-derivation:** `/root/.hermes/profiles/dsflash2/cache/scratch/p22_verify.py` (run with `python3 p22_verify.py`) re-parses the finished markdown and re-derives every figure from the price constants a third time: **19 cost rows, 57 monthly cells (1 / 5 / 20 sites) and 19 annual-at-20-sites cells all matched**, over 5 options × 3 scenarios, with the retrieval date, evidence labels, contiguous source numbering, body citation of every source, and one-URL-per-entry rules all asserted. Verdict on the run: PASS.
- **Checks executed:** all 19 rows across §5.3 recomputed with assertions passing in both scripts; sensitivity probes for Sanity seat scaling, Storyblok's Starter→Growth cliff, Keystatic's 3→4 user step, EmDash Workers Free vs Paid, and Storyblok Growth vs Growth Plus; EmDash licence SPDX id and licence text asserted; Keystatic licence SPDX id read from the GitHub licence API.
- **Not verified:** anything requiring an account (see §8). No vendor page was re-opened a second time to test same-day stability, and no screenshot or DOM archive of the Storyblok, Keystatic, EmDash, or Astro pages was retained.

## 10. Sources

All URLs are direct first-party pages retrieved 2026-09-22 (UTC) unless noted.

[1] Sanity — Pricing (plans, seats, roles, quotas, add-ons, FAQ): https://www.sanity.io/pricing
[2] Sanity Docs — Roles (default roles per plan, custom roles, content resources, user attributes, viewer seats, tags): https://www.sanity.io/docs/user-guides/roles
[3] Sanity Docs — Backups (Enterprise feature, retention, CLI, restore semantics): https://www.sanity.io/docs/content-lake/backups
[4] Sanity Docs — Datasets (exports billed against API quota, add-on datasets, advanced management): https://www.sanity.io/docs/content-lake/datasets
[5] Sanity Docs — Keeping your data safe (access tokens, dataset visibility, drafts and assets): https://www.sanity.io/docs/content-lake/keeping-your-data-safe
[6] Sanity Docs — Projects created without an account (claiming, private datasets on Growth, Studio deploy): https://www.sanity.io/docs/getting-started/projects-without-an-account
[7] Storyblok — Pricing and plan comparison (seats, spaces, limits, backup, roles, environments): https://www.storyblok.com/pricing
[8] Storyblok Docs — Spaces (space contents, ownership transfer, settings, multi-space guidance): https://www.storyblok.com/docs/manuals/spaces
[9] Storyblok Docs — Roles (default roles, custom roles, multiple-role precedence, permission tabs): https://www.storyblok.com/docs/concepts/roles
[10] Storyblok Docs — Collaborator (role permission table, advanced roles): https://www.storyblok.com/docs/terminology/collaborator
[11] Keystatic Docs — Introduction (storage modes): https://keystatic.com/docs/introduction
[12] Keystatic Docs — Local mode: https://keystatic.com/docs/local-mode
[13] Keystatic Docs — GitHub mode (repo write access, GitHub App, env vars, deployment requires Node): https://keystatic.com/docs/github-mode
[14] Keystatic Docs — Keystatic Cloud (team-level access, free vs Pro, pricing, Cloud Images): https://keystatic.com/docs/cloud
[15] GitHub Licence API — Thinkmill/keystatic is MIT: https://api.github.com/repos/Thinkmill/keystatic/license
[16] EmDash — Repository README (Astro integration, beta status, Cloudflare paid requirement for sandboxed plugins, RBAC list, deployment targets): https://github.com/emdash-cms/emdash
[17] EmDash Docs — Documentation index: https://docs.emdashcms.com/llms.txt
[18] EmDash Docs — Authentication (roles and levels, invites, self-signup, Cloudflare Access, session security): https://docs.emdashcms.com/guides/authentication/
[19] EmDash Docs — Backups (contents and exclusions, daily archives, D1 Time Travel, dumps, restore limits): https://docs.emdashcms.com/guides/backups/
[20] EmDash Docs — Deploy to Cloudflare (D1/R2 provisioning, migrations, required secrets, preview env, custom domain): https://docs.emdashcms.com/deployment/cloudflare/
[21] EmDash Docs — Plugin sandbox (Workers Paid requirement, Node workerd runner, per-plugin limits): https://docs.emdashcms.com/deployment/plugin-sandbox/
[22] EmDash Docs — Why EmDash? (single deployment, Cloud-portability, Astro coupling): https://docs.emdashcms.com/why-emdash/
[23] EmDash — LICENSE blob (MIT; "Copyright 2026 Cloudflare Inc."), confirmed through the GitHub licence API: https://github.com/emdash-cms/emdash/blob/main/LICENSE
[24] EmDash Docs — Working with content (drafts/published/archived, revisions, scheduling, media): https://docs.emdashcms.com/guides/working-with-content/
[25] Astro Docs — Content collections (loaders, schemas, build-time vs live collections, limitations): https://docs.astro.build/en/guides/content-collections/
[26] Astro Docs — On-demand rendering (server adapters, `prerender = false`, output modes): https://docs.astro.build/en/guides/on-demand-rendering/
[27] Cloudflare Docs — Workers pricing (Paid plan `$5` minimum, included requests/CPU, D1 and R2 tiers): https://developers.cloudflare.com/workers/platform/pricing/
[28] Keystatic Cloud — sign-in page, no public pricing surface (basis for the §8 limitation): https://keystatic.cloud
