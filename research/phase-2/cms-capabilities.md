# Phase 2 — CMS capability and pricing research

Retrieval date for external research: 2026-09-22 (UTC). This is an evidence record for Phase 2 scenario testing, not a CMS selection or owner-approved recommendation. Prices, quotas, product features, releases, plan names, and repository state are volatile and must be rechecked before a customer-facing quote or implementation.

Evidence labels used here:

- FACT — stated by a cited official source.
- ESTIMATE — arithmetic or an explicitly marked interpretation of cited evidence.
- RECOMMENDATION — intentionally not used for a product choice in this artifact.
- UNKNOWN — not established by the reviewed official evidence.

The five evaluated approaches are Sanity, Keystatic, Storyblok, EmDash, and native Astro content collections with Markdown/MDX. They are not equivalent products: Sanity and Storyblok are hosted headless platforms; Keystatic is a code-and-Git-oriented CMS; EmDash is an Astro-integrated, self-hostable CMS; native Astro content is a framework capability rather than an editorial product.

## 1. Evaluation frame

The project requires separate scenario decisions under `DECISIONS.md` D-005. This document therefore records evidence against three working scenarios without selecting a universal CMS:

- Scenario A — agency site: mostly static pages, small structured content model, client-owned repository and accounts, low runtime responsibility, and a practical preview/publishing path.
- Scenario B — straightforward small-client site: a small number of pages, occasional nontechnical edits, low recurring platform cost, simple handover, and little operational overhead.
- Scenario C — advanced editorial site: multiple editors, roles and approval boundaries, drafts and preview, reusable structured sections, media management, localization or scheduled publishing where needed, and tested export/backup/recovery.

Scenario labels are planning frames, not claims about a future customer's requirements. The project brief still requires account-dependent proofs before any behavior is marked verified. No create/edit/preview/publish/permission/export/restore proof was run in this task.

## 2. Comparable evidence table

| Approach | Editing and nontechnical usability | Drafts, preview, visual editing | Structured content, sections, media | Astro integration and runtime | Roles and permissions | Pricing evidence retrieved 2026-09-22 | Backup, export, ownership, and key risk |
|---|---|---|---|---|---|---|---|
| Sanity | Hosted Studio; schemas define documents and fields editors may author. Structured editing, references, Portable Text, and GROQ are documented. [S1][S8][S9] | Live previews and visual editing tools are included on the Free plan. The Astro visual-editing guide supports Presentation Tool, draft mode, click-to-edit overlays, and live updates, but requires SSR and several integration packages. [S1][S3] | Schema-defined document types, arrays/objects, references, and Portable Text support structured editorial models. The Astro guide documents CDN image transforms and Portable Text rendering. Reusable page sections are an implementation/schema concern, not evidence of a turnkey page builder. [S2][S8] | Official `@sanity/astro` integration supports an Astro client, embedded Studio, queries, images/Portable Text, and static or server rendering. The advanced visual-editing path requires `output: "server"`; static output does not support that draft-mode workflow. [S2][S3] | Free includes Administrator and Viewer roles; Growth adds Editor, Developer, and Contributor; custom roles/content resources are Enterprise features in the roles documentation. Viewer users are free; other seats are billable according to plan. [S1][S4] | Free: $0, up to 20 seats, 2 permission roles, 2 public datasets, unlimited content types/locales, hosted real-time database, and live previews/visual-editing tools. Growth: $15 per seat/month, up to 50 seats, 5 roles, and 2 public or private datasets. Enterprise: custom. Self-serve plans are monthly; Enterprise can be annual. [S1] | Enterprise backup service is daily, with daily backups retained 365 days and weekly backups retained for an additional 2 years; downloaded backups include documents/assets and can be restored with dataset import. Any plan can use CLI dataset export, subject to credentials and project access. Hosted Content Lake creates vendor dependency; Studio is MIT, but hosted data and plan features are not Git content by default. [S5][S6][S9][S10] |
| Keystatic | Admin UI is schema-driven and writes local files, GitHub repository files, or Cloud storage depending on mode. Collections and singletons map to content structures; Markdoc provides a WYSIWYG-like editor. [S12][S15][S16][S18] | Local mode saves to the filesystem; GitHub mode authenticates users with GitHub and requires repository write access. The reviewed official docs do not document a hosted visual editor or built-in draft/preview service; preview depends on the Astro deployment/Git workflow. [S12][S14] | Collections/singletons and typed fields provide structured content. Image fields store images in the local filesystem or GitHub repository; Markdoc fields can store content and images in project files. Reusable sections require schema/content-component design. [S16][S17][S18] | Official Astro installation requires `@keystatic/core`, `@keystatic/astro`, React, and Markdoc integrations. Keystatic needs server-side code and Node APIs, so the deployment guide says to use an Astro adapter; GitHub mode also needs server environment variables. [S13][S14] | In GitHub mode, access is based on GitHub repository write access. Local mode documentation reviewed here does not establish multi-user roles or an editorial approval workflow. Cloud authentication is mentioned in the configuration docs, but plan-level role details were not established. [S14][S15] | The open-source packages/repository are MIT-licensed. No public self-hosted CMS subscription price was found in the reviewed official docs. Keystatic Cloud is identified as a separate cloud option, but its current pricing and limits were not recorded here. Do not treat the total cost as $0 without a hosting/GitHub/Cloud review. [S19][S20] | Git history and repository ownership provide a natural content backup/export path; image files can travel with the repository. The trade-off is Git/branch/deploy complexity for nontechnical editors, plus the requirement for a server runtime for the admin. Account-gated GitHub App/OAuth setup and the absence of documented built-in visual preview are open proof items. [S12][S14] |
| Storyblok | Hosted visual CMS with component/block-based editing, WYSIWYG-style interface, content folders, and a native asset manager. The Visual Editor is designed for nontechnical collaborators. [S22][S23][S26] | Draft content is fetched with `version: "draft"`; `_editable` metadata and the preview bridge connect blocks to the iframe. The Visual Editor updates the preview after edits and supports click-to-edit/context-menu interactions. Preview requires a configured HTTPS preview URL and CSP/frame-ancestor handling. [S23] | Components and nestable blocks provide structured, reusable sections. Asset Manager supports folders, metadata, image service transforms, CDN delivery, private assets, and shared libraries subject to plan/region details. [S23][S26] | Official Astro guide installs `@storyblok/astro`, fetches draft stories, renders registered Astro components, and shows server output. The guide states the versions it tested (`astro@5.7.14`, `storyblok-astro@6.2.0`, Node.js v22.13.0); that is documentation test context, not a current project lockfile. [S25] | Default Owner/Admin/Editor roles exist. Custom roles can restrict stories, blocks, fields, assets, languages, datasources, and apps; the pricing comparison marks custom roles as an enterprise-plan feature. [S24][S22] | Starter: Free, 1 space, 1 included seat, max 2 seats, 100GB traffic/month, 100k API requests/month, 2 locales, 2,000 assets, 20,000 stories, and 1-day version/activity retention. Growth: displayed as $99.00/month and also $90.75/month on the page; the extracted page does not label the second figure's billing qualifier, so it must not be quoted without rechecking. Growth Plus: displayed as $349.00/month and also $319.91/month with the same qualifier ambiguity. Premium/Elite: custom. [S22] | S3 backup app/managed backup depends on plan; the pricing table shows weekly Premium and daily Elite managed backup frequencies, while self-serve rows do not show an S3 backup frequency. Official docs describe user-owned S3 backup and restore plus CLI/API/schema/content exports. Content remains primarily in the hosted space, so portability is possible but requires deliberate export/backup operations. The official `storyblok-astro` repository is archived and says development moved to the Storyblok monorepo. [S27][S28][S29][S31] |
| EmDash | Astro-native admin with database-first collections and fields; nondevelopers can create/modify content types through the admin UI. It explicitly targets editors without code access and includes rich text, taxonomies, menus, widgets, search, drafts, revisions, and scheduling. [S34][S35][S37] | Secure, time-limited preview URLs use HMAC-SHA256 tokens and middleware; the site documents live preview and `data-emdash-ref` attributes for visual editing. It explicitly says it is not a page builder; layout remains Astro components. [S34][S39] | Database-first collections/fields, generated TypeScript types, Portable Text/rich text, taxonomies, menus, widgets, sections, and plugin-extensible blocks. Media library supports local/S3/R2 storage, folders/search/filters, signed uploads, metadata, and provider image transforms. [S35][S37][S38] | Runs as an Astro integration using Astro Live Content Collections. Content is read at runtime without a static rebuild. Deployment options include Cloudflare Workers + D1 + R2, Node.js + SQLite, libSQL, and S3-compatible storage. [S35][S42][S43] | Five levels: Subscriber, Contributor, Author, Editor, Admin. Docs describe invitations, passkeys, magic links, OAuth, optional Cloudflare Access, group-to-role mapping, and draft restrictions. [S41] | No EmDash hosted CMS subscription plan or per-seat price was identified in the reviewed official pages. The official repository states EmDash is in beta preview and notes Cloudflare Dynamic Workers are a paid account feature starting at $5/month; that is a Cloudflare runtime/account qualification, not an EmDash price. [S44] | Downloadable JSON backup includes content, schema, taxonomies, menus, widgets, sections, SEO settings, revisions, and media metadata, but excludes users/secrets and media binaries. Daily object-storage backups are supported; D1 Time Travel is documented as 7 days on free and 30 days on paid plans. JSON restore is deliberately not one-click and a guided CLI restore is planned. Seed JSON supports schema/content portability. [S40][S37] |
| Native Astro content collections + Markdown/MDX | Developer/Git editing rather than a nontechnical CMS UI. Markdown supports frontmatter and GFM; MDX adds variables, JSX expressions, and components. [S49][S50] | No built-in CMS draft workflow, role system, or visual editor. Preview can be supplied by Git branches, hosting previews, or a custom server path; those are project/infrastructure choices, not core Astro features. Build-time versus live collections determines when content appears. [S48][S49] | Content collections provide loaders and optional schemas with validation, type safety, autocomplete, and references. Markdown/MDX and Astro components can implement reusable sections, but the editor is code/Git. Local images can use Astro asset tooling; a DAM, media permissions, and asset workflow are not part of core content collections. [S48][S49][S50] | Astro supports local build-time collections, remote loaders, and live collections. Build-time collections suit mostly static content and optimization; live collections fetch at request time for frequently changing data and preview, with no MDX or runtime image optimization. [S48] | None in core Astro content collections. Repository/hosting/CI permissions can control who changes content, but this is not an editorial role model. [S48][S51] | Astro and its repository are MIT-licensed. There is no CMS subscription fee; hosting, CI, repository, image storage, preview, and any editorial tooling are separate costs/responsibilities. [S51][S52] | Git is a transparent content export and backup mechanism, and static build output is portable. Recovery depends on repository history, asset retention, deployment artifacts, and any external data source. There is no CMS-managed backup/restore or account handoff unless the team adds it. Astro repository activity and the current release provide maintenance evidence, but individual integrations and custom loaders remain separate dependencies. [S51][S53][S54] |

The table intentionally separates vendor claims from operating conclusions. For example, a hosted plan that advertises previews is not proof that this project's preview route, authentication boundary, deployment, and rollback procedure work.

## 3. Per-platform evidence and limitations

### 3.1 Sanity

#### Editing and content model

FACT: Sanity's schema documentation defines document types and fields editors may author in Studio. The schema system includes common validation and typed schema helpers; GROQ can filter, project, sort, join references, and shape responses. [S8][S9]

FACT: The official Astro documentation describes a preconfigured `@sanity/astro` client, an optional embedded Studio route, GROQ queries, Portable Text and image rendering, and static or server rendering. [S2]

ESTIMATE: Sanity can represent reusable page sections through schema-defined arrays/objects and frontend components, but the evidence does not establish that every project receives a no-code page builder. The page model, block constraints, and component mapping would need to be designed and tested per site. [S8][S2]

#### Drafts, visual editing, and Astro constraints

FACT: Sanity's Astro visual-editing guide connects the Presentation Tool to an Astro SSR frontend. It documents draft-mode cookies, a server-side `loadQuery`, Content Source Maps/stega, click-to-edit overlays, live updates, and document-to-URL mapping. [S3]

FACT: The same guide requires Astro server output and states that static output does not work for this draft-mode workflow. It also requires a server adapter, React components for overlays, a server-only draft token, and CORS configuration with credentials. [S3]

UNKNOWN: Whether the project's eventual hosting adapter, CSP, auth boundary, and preview route can meet these requirements without extra operational work. No Sanity project or preview route was created in this task.

#### Media, roles, security, and ownership

FACT: The Astro integration documentation covers Sanity image CDN transforms and Portable Text. Sanity's roles documentation describes Administrator, Viewer, Editor, Developer, Contributor, and Enterprise custom roles/content resources, with additive permission behavior and dataset-level controls. [S2][S4]

FACT: Sanity warns not to expose access tokens in browser JavaScript or public repositories, and recommends a server proxy for writes. Private datasets and assets need separate attention: the docs state that asset files are not private merely because a dataset is private. [S7]

ESTIMATE: Sanity's project/dataset model can support isolated client ownership if each client receives a separate project and billing/account boundary. This is an operating design, not a proof that an agency can transfer every project concern without an account-level procedure. [S1]

#### Pricing and limits

FACT: The pricing page identifies Free, Growth, and Enterprise plans. Free includes up to 20 user seats, 2 permission roles, 2 public datasets, unlimited content types/locales, hosted real-time content, and live previews/visual-editing tools. Growth is displayed at $15 per seat/month with up to 50 seats, 5 roles, and 2 private or public datasets. Enterprise has custom seats, roles, datasets, usage quota, and support/SLA options. [S1]

FACT: Sanity says prices are per month, self-serve plans are monthly only, and Viewer users do not consume billable seats. [S1][S4]

UNKNOWN: The relevant project's actual document, API, asset, bandwidth, and usage consumption. Quotas and add-ons must be modelled from the current pricing comparison and measured POC usage, not from the seat price alone. [S1]

#### Backup, export, maintenance, and license

FACT: Sanity's backup service is an Enterprise-plan feature in the reviewed backup documentation. It creates daily offsite backups retained 365 days and weekly backups retained for two additional years; the archive includes documents and assets, while comments and document history are excluded. [S5]

FACT: The CLI supports dataset export/import, including documents and optional assets, and can export published-only or selected document types. [S6]

FACT: The official Sanity repository is MIT-licensed. The GitHub API showed a published `v6.16.0` release on 2026-09-22 and a same-day release commit, which is maintenance evidence for the Studio repository, not a guarantee about every plugin or hosted feature. [S9][S10][S11]

LIMITATION: Backup service, custom roles, and content resources introduce plan/account gates. A lower-cost project may need CLI exports and a separately owned backup schedule instead of managed platform backups. [S1][S4][S5][S6]

### 3.2 Keystatic

#### Editing, storage, and content model

FACT: Keystatic can save content locally, directly to GitHub, or through its Cloud option. Its configuration separates collections (repeatable content) and singletons (one-off content), and paths determine the generated content files. [S12][S15][S16]

FACT: The Astro installation guide configures `@keystatic/core`, `@keystatic/astro`, React, and Markdoc. The guide shows a local posts collection stored as `.mdoc` content and rendered using Astro's content APIs. [S13]

FACT: Markdoc fields provide an editor with content components and configurable formatting; the official docs say the developer is responsible for rendering Markdoc content. [S18]

ESTIMATE: A small client can have a friendlier form-based editor than opening Markdown manually, but the operator still owns schema design, Astro rendering, deployment, authentication, and preview integration. The evidence does not justify treating Keystatic as a managed SaaS editor equivalent to Storyblok or Sanity.

#### GitHub mode, roles, preview, and media

FACT: GitHub mode requires an existing repository and collaborator write access. The user visits `/keystatic`, authenticates with GitHub, and the setup creates/uses a GitHub App plus environment variables. The Admin UI can expose branches with an optional prefix. [S14]

UNKNOWN: A built-in Keystatic role/approval model comparable to hosted CMS roles was not established by the reviewed official docs. GitHub repository permissions are the documented control in GitHub mode; local mode's multi-user security boundary is not established. [S12][S14]

UNKNOWN: A built-in visual preview/live editing workflow was not established. The official Astro guide documents the Admin UI and content rendering, while GitHub mode documents repository branches and authentication rather than an iframe preview or click-to-edit overlay. Preview therefore remains a deployment/branch/CI design item. [S13][S14]

FACT: Image fields store images in the local filesystem or GitHub repository. Directory and publicPath settings control where images are written and how references are formed; a separate Cloud image field is documented for Keystatic Cloud. [S17]

#### Hosting, pricing, portability, and maintenance

FACT: Keystatic requires server-side code and Node.js APIs in the Astro deployment guide, so an Astro adapter is required. The GitHub deployment path needs server environment variables and GitHub authentication. [S13][S14]

FACT: The official repository and LICENSE are MIT-licensed. The GitHub API showed a protected `main` branch with required lint/type/build/test checks and a latest commit by the project team on 2026-09-08. [S19][S20][S21]

UNKNOWN: No current Keystatic Cloud price, seat limit, storage quota, SLA, or backup-retention figure was captured in the reviewed official sources. No public self-hosted CMS subscription price is stated in the sources used here. [S12][S15][S19]

ESTIMATE: When content and images are committed to the client's repository, normal Git history, repository exports, and client-controlled hosting can provide strong portability. That does not automatically cover GitHub App credentials, CI secrets, deploy previews, or a restore test; those still need an operational procedure.

LIMITATION: The Astro integration requires React for the Admin UI. This is not the same as adding React to the public frontend, but it is relevant to the project's constraint against adding a UI framework without a documented requirement. [S13]

### 3.3 Storyblok

#### Editing, visual workflow, and content model

FACT: Storyblok's Visual Editor embeds the website in an iframe, fetches draft content, maps `_editable` block metadata to frontend elements, and uses a bridge for save/publish/input events. It provides outlines, click-to-edit behavior, context menus, and real-time preview updates. [S23]

FACT: Storyblok's Astro guide uses a space access token, the `@storyblok/astro` integration, a draft API request, and registered Astro components. Stories can contain arrays of custom and nested blocks, which the `StoryblokComponent` renders. [S25]

ESTIMATE: The component/nested-block model is a direct fit for reusable sections when the site's Astro components and Storyblok components are designed together. It is still a coupled schema/component contract and should be tested for migrations and editor guardrails. [S23][S25]

#### Media, roles, and security

FACT: Storyblok includes a digital asset manager, asset folders, metadata fields, CDN delivery, image transformations, private assets, and regional asset domains. [S26]

FACT: Default roles include Owner, Admin, and Editor. Custom roles can apply granular allowlists/denylists to stories, blocks, fields, assets, languages, datasources, and apps. [S24]

FACT: Storyblok distinguishes public, preview, asset, and release access tokens. The Management API documentation warns not to expose management credentials in browser code, and the access-token docs distinguish delivery tokens from management tokens. [S28][S30]

LIMITATION: The pricing comparison indicates custom roles and higher workflow/security controls are enterprise-plan features even though the roles documentation describes the feature generally. Plan-level availability must be confirmed in the account before a proposal. [S22][S24]

#### Pricing, backup, export, and portability

FACT: Storyblok's current page describes a 45-day Growth Plus trial, followed by Starter, Growth, Growth Plus, and custom Premium/Elite options. Starter is free with one included seat and a maximum of two seats. Growth and Growth Plus are displayed at $99.00/month and $349.00/month respectively, alongside $90.75/month and $319.91/month figures whose billing qualifier is not clear in the extracted page. [S22]

FACT: The same page lists plan-dependent limits for traffic, API requests, locales, assets, stories, previews, version/activity retention, scheduled stories, and uptime SLA. Starter has 1-day version/activity retention; Growth and Growth Plus show 30 days. [S22]

FACT: Storyblok's backup guide supports an S3 Backups app, user-owned S3 storage, restore into an existing or new space, CLI/API backup strategies, and asset-specific backup scripts. The pricing table shows weekly Premium and daily Elite managed-backup frequencies; self-serve rows do not show an S3 backup frequency. [S22][S27]

FACT: The Management API and CLI support CSV/content export, schema pull/push, synchronization of components/roles/stories/datasources, and migration rollback files for the last migration. [S28][S29]

ESTIMATE: Storyblok has a practical export path, but a client handoff must include space ownership, tokens, asset export, schema export, backup storage, and restore instructions. Exportability is not the same as operating without the vendor's hosted editor/CDN/API. [S27][S28][S29]

#### Maintenance state and license

FACT: The official `storyblok-astro` repository is archived; its latest commit records the archive action on 2025-06-19 and the repository notice says development moved to the Storyblok monorepo. The archived integration repository is MIT-licensed. [S31][S32]

UNKNOWN: This research did not independently verify release cadence, package location, or license metadata for the replacement monorepo's Astro package. The current official Astro guide remains the authoritative integration setup source used here. [S25][S31][S33]

### 3.4 EmDash

#### Editing, schema, and Astro architecture

FACT: EmDash describes itself as an open-source, Astro-native CMS. Its schema is database-first: collections and fields are created or changed through the admin UI and stored in database tables rather than only in code. It supports SQLite-compatible databases and S3-compatible/local media storage. [S34][S35][S37]

FACT: The content-model documentation describes runtime schema changes, real SQL columns, generated Zod validation, generated TypeScript types, JSON seed export, content collections, taxonomies, menus, and fields. [S37]

FACT: EmDash uses Astro Live Content Collections, so runtime content changes do not require a static rebuild. Supported deployment documentation covers Cloudflare Workers/D1/R2; architecture docs also describe Node.js, local SQLite, libSQL, and S3-compatible options. [S35][S42][S43]

FACT: The docs explicitly say EmDash is not a separate headless CMS and not a page builder; layout is built with Astro components. [S35]

#### Preview, media, and permissions

FACT: Preview URLs contain expiring HMAC-SHA256 signatures. Middleware verifies the token and serves drafts through normal query functions. The docs describe `data-emdash-ref` attributes for editor visual-editing affordances that produce no output in production. [S39]

FACT: The media library supports images, documents, video, and audio; local, R2, S3-compatible, and external media providers; signed direct uploads; folders/search/filters; alt text; and image transformation components. [S38]

FACT: EmDash documents five roles: Subscriber (published read only), Contributor (create, needs approval), Author (own content), Editor (all content), and Admin (settings/full access). It documents passkey-first auth, magic links, OAuth, invitations, optional Cloudflare Access, group mapping, and draft restrictions. [S41]

ESTIMATE: EmDash's combination of runtime schema editing, local deployment, and role-based admin could reduce the need for a separate hosted CMS for a small Astro site. It also shifts database, storage, runtime, auth, backup, upgrades, and incident-response responsibility to the site operator. This is an operating trade-off, not a product selection.

#### Pricing, hosting, backup, and recovery limits

UNKNOWN: No EmDash hosted service price or seat-based SaaS plan was identified in the reviewed official pages. The GitHub README states that Cloudflare Dynamic Workers needed for secure sandboxed plugins are currently available only on paid accounts starting at $5/month; this is a Cloudflare account feature and must not be presented as an EmDash subscription price. [S44]

FACT: The backup guide documents one-click JSON backup, daily automatic backups to configured storage with 1–30 retention, D1 point-in-time recovery, raw SQL dumps, and a restore path. JSON backups intentionally exclude user accounts, sessions, passkeys, API tokens, secrets, and media binaries. A guided CLI JSON restore is planned rather than a one-click admin restore. [S40]

FACT: EmDash's seed format supports portable schema definitions and optional content, and the project can run on client-owned Node/Cloudflare/storage accounts. [S37][S42][S43]

LIMITATION: A backup archive without media binaries or secrets is not a complete site recovery package. Recovery requires storage-bucket retention, secret escrow/rotation, database recovery, dependency pinning, and a tested restore procedure. D1 Time Travel is described as 7 days on free and 30 days on paid plans; those are Cloudflare plan qualifications, not EmDash limits. [S40]

#### Maintenance state and license

FACT: The official repository LICENSE is MIT. The repository README labels EmDash as beta preview, and the GitHub API showed same-day main-branch activity on 2026-09-22. The GitHub release page showed an `emdash@0.36.0` release entry while the API's latest release endpoint returned a package release for `@emdash-cms/plugin-test@0.1.0`; these are different release records and should not be collapsed into one CMS version claim. [S44][S45][S46][S47]

UNKNOWN: Beta status means production stability, upgrade compatibility, ecosystem size, migration tooling maturity, and support expectations remain unproven. No EmDash POC, upgrade test, restore test, or Cloudflare deployment was run here.

### 3.5 Native Astro content collections with Markdown/MDX

#### Editing and content model

FACT: Astro content collections support build-time and live loaders, optional schemas, type safety, autocomplete, validation, local files, remote sources, and custom/community loaders. Built-in local loaders cover Markdown, MDX, Markdoc, YAML, TOML, and JSON. [S48]

FACT: Markdown pages support frontmatter and GitHub Flavored Markdown. MDX adds variables, JSX expressions, and component imports, and has an official Astro integration. [S49][S50]

FACT: Build-time collections are intended for relatively static data, performance, build-time optimization, MDX, and image optimization. Live collections fetch at request time and are useful for real-time data or CMS preview; Astro documents live-collection limitations including no MDX support, no runtime image optimization, request-time performance cost, and no data-store persistence. [S48]

ESTIMATE: Native Markdown/MDX is the smallest operational surface for a technical owner who is comfortable with Git. It is not evidence of a nontechnical editing experience, roles, approval workflow, visual editing, or a managed media library. Reusable sections can be implemented as Astro/MDX components, but the editorial model is code-driven.

#### Hosting, ownership, and security

FACT: Native Astro content can produce static output from local/build-time content, or use a server adapter for live content. The content and schema remain in the repository unless a remote loader is selected. [S48]

ESTIMATE: Client ownership and export are straightforward when the client owns the repository, deployment, image assets, and any remote data source. Recovery still depends on repository history, external asset retention, deployment artifacts, environment secrets, and any custom loader database.

FACT: Astro is MIT-licensed. The official repository describes current package releases and links to the official documentation, license, governance, and integrations. The GitHub API showed Astro `astro@7.3.1` published 2026-09-03 and a same-day main-branch commit on 2026-09-22. [S51][S52][S53][S54]

LIMITATION: A repository-based content workflow does not remove the need for content handoff, preview deployment, branch protection, image processing, backup, restore, and access-revocation procedures. Those are project responsibilities rather than built-in CMS features.

## 4. Scenario evidence matrix (not a selection)

This matrix records what must be proven, not which approach should win. A blank or `UNKNOWN` is a test requirement, not a negative product verdict.

| Scenario | Sanity | Keystatic | Storyblok | EmDash | Native Astro content |
|---|---|---|---|---|---|
| A — agency site, mostly static, client-owned | Static Astro integration and hosted Studio are documented; visual editing adds SSR/runtime complexity. [S2][S3] | Strong repository ownership and local/GitHub content path; Node adapter and GitHub auth are required. [S13][S14] | Hosted editor is capable, but content/space/API remain vendor-dependent and current cost is more than a file workflow. [S22][S25] | Astro-native and portable, but beta plus database/storage/backup responsibility need proof. [S35][S40][S44] | Lowest CMS overhead and strongest file portability, but technical editing only. [S48][S49] |
| B — straightforward small-client site | Free plan is available, but Studio setup, account transfer, and usage/preview limits need a handoff test. [S1][S4] | Form UI can write client-owned content files, but deployed auth/preview and role simplicity need testing. [S13][S14] | Nontechnical visual editing is documented; Starter is free with explicit limits, but hosted plan/account remains. [S22][S23] | Admin UI targets nondevelopers and supports local deployment; beta and recovery path must be tested. [S34][S40][S44] | No nontechnical editing surface in core Astro; requires a separate workflow/tool. [S48][S49] |
| C — advanced editorial | Roles, drafts, scheduled drafts, Presentation Tool, visual editing, exports, and Enterprise backup paths are documented; plan gates matter. [S1][S3][S4][S5][S6] | GitHub permissions and branches are documented; hosted roles, editorial workflows, and visual preview remain UNKNOWN. [S14] | Strong documented visual editor, roles, assets, locales, workflows/enterprise features, S3 backup, and API/CLI export. [S22][S23][S24][S27][S28] | Roles, live preview, revisions, scheduling, media, and backups are documented; beta maturity and restore gaps remain. [S34][S39][S40][S41][S44] | Requires composing a separate editorial system; core collections alone do not provide roles, drafts UI, or visual editing. [S48][S49] |

## 5. Account gates, security, and proof boundaries

The following gates are explicit and must not be silently assumed:

- Sanity visual editing requires a Sanity project/dataset, a server-rendered Astro frontend, a server-only viewer token for draft queries, CORS credentials, and a configured Presentation Tool/preview route. [S3]
- Storyblok requires a space, delivery/preview access token, draft API access, a preview URL, HTTPS for the iframe, and CSP/frame-ancestor configuration. Management API export requires authenticated account access. [S23][S25][S28][S30]
- Keystatic GitHub mode requires a repository, write access for collaborators, GitHub App/OAuth setup, server environment variables, and an Astro Node-capable deployment. [S13][S14]
- EmDash local development can use local SQLite/filesystem, but production needs a database, storage, auth secrets, preview secret, and an operational backup/restore procedure. Cloudflare deployment adds account, D1, R2, Wrangler, and plan-specific features. [S36][S40][S41][S43]
- Native Astro content needs no CMS account for local Git content, but preview hosting, CI, repository access, image storage, external loaders, and backup policy remain project choices. [S48][S49][S50]

Security claims are bounded by the official documentation, not by a completed audit. No privileged token was retained. Any future POC must keep API keys/server tokens out of browser bundles and commits, use separate preview/staging/production credentials, and verify access revocation and restore behavior. Sanity and Storyblok explicitly warn about token exposure; EmDash documents server-side secrets and signed preview/media flows. [S7][S28][S38][S39][S43]

## 6. Open questions for the next POC/cost tasks

1. Can the selected candidates complete the same create/edit/image/preview/publish/SEO/sections/permissions/export/recovery protocol under client-owned accounts?
2. For Sanity, what is the measured monthly usage for one small site, and does the required role/backup/preview workflow remain within Free/Growth or require Enterprise features?
3. For Keystatic, can a nontechnical editor use the deployed Admin UI safely with GitHub mode, and what is the smallest acceptable preview/approval workflow without inventing a CMS feature?
4. For Storyblok, which displayed prices are monthly versus annual-equivalent figures, and which roles, workflows, backup frequencies, and localization features are available at the plan needed by each scenario?
5. For EmDash, can a clean install, upgrade, migration, media backup, database restore, secret recovery, and production deployment be completed on a supported Node/Cloudflare path while it remains beta preview?
6. For native Astro content, what repository/preview/editorial workflow is acceptable to a small client, and what external tool or process would cover nontechnical editing if required?
7. For every approach, who owns the account, repository, billing, deployment, media, backups, tokens, and offboarding materials at handover?
8. Which features are account-gated, paid, beta, or unverified in a real proof? A documentation statement must not be converted into a verified requirement until the operation is exercised.

## 7. Official source ledger

All entries below are official product documentation, official pricing pages, official repositories, or official GitHub API endpoints. Retrieval date for this ledger: 2026-09-22 (UTC). API endpoints are cited for the exact repository/release state observed on that date.

### Sanity

[S1] Sanity pricing and plan comparison: https://www.sanity.io/pricing

[S2] Sanity and Astro integration index: https://www.sanity.io/docs/astro

[S3] Sanity visual editing with Astro: https://www.sanity.io/docs/visual-editing/astro-visual-editing

[S4] Sanity roles and permissions: https://www.sanity.io/docs/user-guides/roles

[S5] Sanity Content Lake backups: https://www.sanity.io/docs/content-lake/backups

[S6] Sanity datasets CLI export/import reference: https://www.sanity.io/docs/cli-reference/cli-datasets

[S7] Sanity token and dataset security guidance: https://www.sanity.io/docs/content-lake/keeping-your-data-safe

[S8] Sanity schema types: https://www.sanity.io/docs/studio/schema-types

[S9] Sanity official repository: https://github.com/sanity-io/sanity

[S10] Sanity repository MIT license: https://raw.githubusercontent.com/sanity-io/sanity/main/LICENSE

[S11] Sanity latest-release API response: https://api.github.com/repos/sanity-io/sanity/releases/latest

### Keystatic

[S12] Keystatic introduction and storage modes: https://keystatic.com/docs/introduction

[S13] Keystatic with Astro: https://keystatic.com/docs/installation-astro

[S14] Keystatic GitHub mode: https://keystatic.com/docs/github-mode

[S15] Keystatic configuration: https://keystatic.com/docs/configuration

[S16] Keystatic content organisation: https://keystatic.com/docs/content-organisation

[S17] Keystatic image field: https://keystatic.com/docs/fields/image

[S18] Keystatic Markdoc field: https://keystatic.com/docs/fields/markdoc

[S19] Keystatic official repository: https://github.com/Thinkmill/keystatic

[S20] Keystatic repository MIT license: https://raw.githubusercontent.com/Thinkmill/keystatic/main/LICENSE

[S21] Keystatic main-branch API response: https://api.github.com/repos/Thinkmill/keystatic/commits?per_page=1

### Storyblok

[S22] Storyblok pricing and plan comparison: https://www.storyblok.com/pricing

[S23] Storyblok Visual Editor: https://www.storyblok.com/docs/concepts/visual-editor

[S24] Storyblok roles: https://www.storyblok.com/docs/concepts/roles

[S25] Storyblok Astro integration guide: https://www.storyblok.com/docs/guides/astro

[S26] Storyblok assets and DAM: https://www.storyblok.com/docs/concepts/assets

[S27] Storyblok backups and restore: https://www.storyblok.com/docs/concepts/backups

[S28] Storyblok Management API content handling/export: https://storyblok.com/docs/guide/in-depth/handling-content

[S29] Storyblok CLI, schema export, sync, and migration rollback: https://storyblok.com/docs/Guides/command-line-interface

[S30] Storyblok access tokens: https://www.storyblok.com/docs/concepts/access-tokens

[S31] Archived official Storyblok Astro repository and migration notice: https://github.com/storyblok/storyblok-astro

[S32] Storyblok Astro SDK repository MIT license: https://raw.githubusercontent.com/storyblok/storyblok-astro/main/LICENSE

[S33] Storyblok current monorepo named by the archived Astro repository: https://github.com/storyblok/storyblok

### EmDash

[S34] EmDash official product page and FAQ: https://www.emdashcms.com/

[S35] EmDash introduction and architecture overview: https://docs.emdashcms.com/introduction/

[S36] EmDash getting started: https://docs.emdashcms.com/getting-started/

[S37] EmDash content model and seed export: https://docs.emdashcms.com/concepts/content-model/

[S38] EmDash media library: https://docs.emdashcms.com/guides/media-library/

[S39] EmDash preview mode and visual-editing attributes: https://docs.emdashcms.com/guides/preview/

[S40] EmDash backups and recovery limits: https://docs.emdashcms.com/guides/backups/

[S41] EmDash authentication and roles: https://docs.emdashcms.com/guides/authentication/

[S42] EmDash architecture and supported data/storage options: https://docs.emdashcms.com/concepts/architecture/

[S43] EmDash Cloudflare deployment: https://docs.emdashcms.com/deployment/cloudflare/

[S44] EmDash official repository and beta/runtime note: https://github.com/emdash-cms/emdash

[S45] EmDash repository MIT license: https://raw.githubusercontent.com/emdash-cms/emdash/main/LICENSE

[S46] EmDash main-branch API response: https://api.github.com/repos/emdash-cms/emdash/commits?per_page=1

[S47] EmDash official releases page: https://github.com/emdash-cms/emdash/releases

### Native Astro content

[S48] Astro content collections, build-time/live loaders, schemas, and limitations: https://docs.astro.build/en/guides/content-collections/

[S49] Astro Markdown content: https://docs.astro.build/en/guides/markdown-content/

[S50] Astro MDX integration: https://docs.astro.build/en/guides/integrations-guide/mdx/

[S51] Astro official repository: https://github.com/withastro/astro

[S52] Astro repository MIT license: https://raw.githubusercontent.com/withastro/astro/main/LICENSE

[S53] Astro latest-release API response: https://api.github.com/repos/withastro/astro/releases/latest

[S54] Astro main-branch API response: https://api.github.com/repos/withastro/astro/commits?per_page=1

## 8. Verification boundary

- All five named approaches are covered.
- Current claims in this artifact map to direct official URLs in the source ledger.
- Currency, unit, and monthly/billing ambiguity are preserved rather than normalized away.
- EmDash price, beta, backup-restore, and release ambiguity is reported explicitly.
- No CMS winner or universal recommendation is selected.
- No account was created, no package was installed, no POC was run, and no external credentials were retained.
- This artifact does not claim any create/edit/preview/publish/permission/export/recovery requirement as verified; those remain Phase 2 proof tasks.
