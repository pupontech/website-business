# P3.2b — Ghost themes, product behavior, and headless limits (bounded backup lane)

- **Task:** Kanban `t_08e1324e` (Phase 3 research, board `website-business`). This is the bounded replacement for the abandoned first lane; it was produced independently from official current sources and does not read, depend on, or edit the earlier card (`t_0f05553f`).
- **Status:** Research artifact for synthesis into `docs/03-ghost.md` (P3.5). Nothing here is an approved decision, and nothing here authorizes a purchase, account, deployment, theme build, hosting platform, or infrastructure change.
- **Author:** worker profile `dsflash`, single-writer task.
- **Retrieval date for all external evidence:** 2026-09-22 (UTC). Volatile versions, prices, and plan limits carry their retrieval date inline and must be re-retrieved before any customer-facing use.
- **File scope:** this is the only file written by this task. `AGENTS.md`, `PROJECT_STATUS.md`, `DECISIONS.md`, `docs/`, `research/phase-1/*`, `research/phase-2/*`, `research/phase-3/hosting-operations.md`, the Kanban board, and Git history were not modified. No destructive Git command was run.
- **Constraint baseline read before research:** `AGENTS.md` (native Ghost themes by default; no React or other UI framework without a documented requirement; no secrets in browser code; no proprietary builder, multi-tenant platform, or generalized automation platform; client ownership and portability; managed hosting preferred when its full cost is lower; no production infrastructure before the applicable checkpoint), `PROJECT_STATUS.md` (P3.2/P3.3 are research tasks; Checkpoints 1 and 3 gate approval and spend), `DECISIONS.md` (D-001 no internal platform, D-002 phase gates, D-003 isolated client boundaries, D-004 **native Ghost themes are the default evaluation baseline; headless requires a documented functional reason**), `docs/01-business.md` §§4, 7, 8 (three-package shape, ownership posture, deferred offers), `research/phase-3/hosting-operations.md` (Ghost(Pro) versus self-hosted facts and its conflict register).

Evidence labels: **FACT** (read in the cited source during this task), **ESTIMATE** (arithmetic or judgement by this author, no external source), **RECOMMENDATION** (proposed action, not approved), **UNKNOWN** (not established).

---

## 1. Method, evidence boundary, and what was not executed

### 1.1 Method

1. Started from the official documentation index `https://docs.ghost.org/llms.txt` and read every listed page relevant to themes, routing, helpers, APIs, memberships, newsletters, recommendations, security, licensing, migrations, and breaking changes, using the `.md` variants of those pages [34].
2. Used the official Help Center content index `https://ghost.org/help/llms.txt` for product-level pages (Portal, sending domains, email, Stripe, tiers, protected content, search, social web, comments, SEO, exports, imports, theme installation, staff permissions) and read the named pages in `.md` form [36][37][38][39][40][41][42][43][44][45][46][47][48][49][50][51][52][53][54][55][56][57][58].
3. Inspected current official repository metadata and source over the GitHub REST API and raw content endpoints — the Ghost monorepo, `Starter`, `Source`, `Casper`, `gscan`, `Ghost-CLI`, `algolia`, the `action-deploy-theme` action, the archived `Portal` and `sodo-search` repositories, and the Ghost monorepo's `apps/` directory [58][59][60][61][62][63][64][65][66][67][68][69][70][71].
4. Read published package metadata from the official npm registry for `gscan` and Ghost's own client/bundle packages [74][75][76][77][78][79][82].
5. Re-opened 48 load-bearing official URLs at the end of the task and asserted an expected marker string in each response (§12). 45 matched the exact marker; three markers were case- or markup-variant mismatches that were then confirmed by hand — `jamstack.md` reads "Ghost's membership functionality is **not** compatible with headless setups" (markdown bold inside the phrase), `help/protected-content.md` reads "members need to login" rather than "server level" (the server-level gating sentence is in `members.md`), and `faq.md`'s heading is "Ghost Developer FAQs" [26][16][30].

### 1.2 Verification boundary — documentation and source inspection, not executed proof

- Everything in this document is **documentation-backed, page-render-backed, registry-backed, or repository-source-backed**. No Ghost instance was installed, no account or trial was created, no payment was made, no theme was written, zipped, uploaded, or activated, **`gscan` was not run against any theme**, no Portal embed was loaded, no member signed up or signed in, no newsletter was sent, no Stripe account was connected, and no REST request was made against a live Ghost site's Content or Admin API.
- Repository evidence is metadata and source text read over HTTPS at the stated retrieval date. It is not a clone, build, or test run.
- The card explicitly bounded this lane to current repository/source inspection plus official documentation, with execution proof separately scoped. Nothing below should be read as a test result.
- Where official first-party sources disagree with each other, both statements are recorded in §10 rather than reconciled silently.

### 1.3 Explicitly not executed

No Ghost install, no Docker Compose, no Ghost-CLI run, no `gscan` execution, no theme scaffold or build, no Astro project, no headless deployment, no Portal embed test, no member/membership test, no Stripe test, no email send or sending-domain activation, no DNS change, no import or export, no backup or restore, no monitoring, no CI pipeline, no package installation, no file written other than this artifact, no Git commit, and no destructive Git command.

---

## 2. Theme architecture — how a native Ghost front end actually works

- **FACT:** Ghost themes are Handlebars templates plus CSS. Ghost adds `express-hbs` for layouts and partials. The stated design goal is strong separation between templates (HTML) and logic (helpers), so that themes are fast and the server sends "server side publication content ... to the browser as static HTML" [1].
- **FACT:** Two templates are strictly required — `index.hbs` (post list, and the fallback for tag/author archives) and `post.hbs` (single post) — plus a `package.json`. A `default.hbs` base layout is recommended and is where the required `{{ghost_head}}` and `{{ghost_foot}}` live [2].
- **FACT:** For a theme to work, Ghost requires the helpers `{{asset}}`, `{{body_class}}`, `{{post_class}}`, `{{ghost_head}}` and `{{ghost_foot}}` [2].
- **FACT:** Optional templates and the per-slug variants: `home.hbs` (only `/`), `page.hbs`, `post-:slug.hbs`, `page-:slug.hbs`, `custom-{{template-name}}.hbs` (selectable per post in admin), `tag.hbs`, `tag-:slug.hbs`, `author.hbs`, `private.hbs` (password-protected publications), `error.hbs`, `error-4xx.hbs`, `error-404.hbs`, and a theme-supplied `robots.txt` that overrides Ghost's default [2].
- **FACT:** Six contexts decide which template renders and what data is available — `index`, `page`, `post`, `author`, `tag`, `error` — and contexts are what make helpers context-aware (for example `{{meta_title}}` resolves from the post in a post context and from the tag in a tag context). Contexts are detected with `{{#is "..."}}` [3].
- **FACT:** Helpers are grouped into functional (`foreach`, `get`, `has`, `if`, `is`, `match`, `unless`), data (`@config`, `@custom`, `@page`, `@site`, `authors`, `comments`, `content`, `date`, `excerpt`, `img_url`, `link`, `meta_data`, `navigation`, `post`, `price`, `readable_url`, `recommendations`, `tags`, `tiers`, `title`, `total_members`, `total_paid_members`, `url`) and utility (`asset`, `block`, `body_class`, `color_to_rgba`, `concat`, `contrast_text_color`, `encode`, `ghost_head`/`ghost_foot`, `json`, `link_class`, `log`, `pagination`, `partials`, `plural`, `post_class`, `prev_post`/`next_post`, `reading_time`, `search`, `split`, `translate`) [4]. The full page-level list of helper URLs is enumerated in the official index [34].
- **FACT:** `{{ghost_head}}` outputs meta description, Schema.org JSON-LD structured data, Open Graph and Twitter Card tags, RSS discovery links, **the scripts that enable the Ghost API**, and anything from code injection; `{{ghost_foot}}` outputs code injection only [6].
- **FACT:** `{{#get}}` makes a server-side query to the Ghost API before the template renders, supporting browse and read queries over `posts`, `tags`, `authors`, `tiers` and `newsletters`, with `limit`, `page`, `order`, `filter` and `include`. `limit` is capped: allowed values 1–100, and requesting more returns at most 100 [5].
- **FACT:** `package.json` configuration keys are `config.posts_per_page` (Ghost default 5), `config.image_sizes`, `config.card_assets`, and `config.custom`; other common keys are `description`, `docs` (a URL surfaced on the admin Design page), `license`, and `screenshots`. Changes to `package.json` require `ghost restart` [2].
- **FACT:** Ghost automatically compresses and resizes images added to post content and generates responsive assets. For other images (feature images, theme images), sizes declared in `package.json` are generated as a cache and consumed with `{{img_url ... size="s"}}` and `srcset`; the docs recommend no more than 10 declared sizes so media storage does not grow out of control [7].
- **FACT:** Theme custom settings are declared at `config.custom` in `package.json` with five types (`select`, `boolean`, `color`, `image`, `text`) and read in templates through the `@custom` object. **Themes are limited to a total of 20 custom settings** [8].
- **FACT (routes and navigation):** All routing configuration lives in `content/settings/routes.yaml` and can be uploaded/downloaded from `Settings » Labs`. The default install has one collection on `/` with `permalink: /{slug}/` and `template: index`, plus taxonomies `tag: /tag/{slug}/` and `author: /author/{slug}/`. Sites can define custom template routes (`/custom/` → `custom.hbs`), multiple collections with their own `permalink`, filters, `limit`, `order` and `data`, custom home pages, and channels. Taxonomies cannot be invented — only the existing `tag` and `author` prefixes can be renamed or removed. Every collection index, tag archive and author archive gets an automatically generated RSS feed at `/rss/` [9].
- **FACT (routing limits):** Ghost and `routes.yaml` have no shared knowledge of slugs, so a route `/about/` and a page slug `about` collide and only one works; collections must be filter-unique or based on `primary_tag`; and **trailing slashes are required** for dynamic routing to work [9].
- **FACT (redirects):** `content/data/redirects.yaml` (uploadable in admin, restart required when edited on the server) holds redirects; pre-4.0 installs may still use the legacy JSON file, and JSON support **will be removed in a later version**. `www`/HTTP→HTTPS rules belong at DNS, and Ghost already forces trailing slashes [9].
- **FACT:** Development is expected against a local Ghost install with the theme symlinked into `content/themes`. In production mode templates are cached by the server and `hbs` changes need `ghost restart` [2].
- **FACT (editorial surface):** `publishing.md` documents posts as the primary entry type and pages as a "subset of posts which are excluded from all feeds" — pages are published only at their own slug, never appear in the index, archives or RSS, and are reachable only through manual links. Custom templates can be attached per post or per page slug [23].
- **FACT (taxonomy/author surface):** Tags include regular, primary and internal tags with defined usage patterns; author archives are generated from staff users, and author archives are automatically added to Ghost's XML sitemap with their own pagination and RSS feeds. Public author archives exist only for staff users assigned to published posts [23][24].
- **FACT (SEO surface, theme layer):** Ghost advertises automatic and fallback metadata per post/page, Open Graph and Twitter Cards, an automatically created and updated XML sitemap, canonical tags, and automatic structured data [53]. The theme-side mechanism is `{{ghost_head}}` plus the `{{meta_data}}` helper family [6][4].

### 2.1 Feature/architecture matrix — native theme layer versus what is delegated

| Capability | Native theme layer (Ghost-served) | Mechanic / owner | Evidence |
|---|---|---|---|
| Templating | Handlebars + `express-hbs` layouts and partials; static HTML to the browser | Ghost core, server-side | [1][2] |
| Rendering model | Server-rendered templates; `hbs` cached in production; `ghost restart` to reload | Ghost server | [2] |
| Required files | `index.hbs`, `post.hbs`, `package.json` | Theme author | [2] |
| Required helpers | `asset`, `body_class`, `post_class`, `ghost_head`, `ghost_foot` | Theme author | [2] |
| Contexts | `index`, `page`, `post`, `author`, `tag`, `error`; `{{#is}}` detection | Ghost router + theme | [3] |
| URL structure | `routes.yaml`: collections, custom routes, channels; taxonomies renameable only | Ghost settings (admin Labs upload) | [9] |
| Archives + feeds | Auto tag/author archives, pagination, `/rss/` per archive | Ghost core | [9][24] |
| Redirects | `redirects.yaml` (legacy JSON deprecated) | Ghost settings | [9] |
| Navigation | Ghost-managed primary/secondary navigation via `{{navigation}}` | Ghost settings + theme | [4] |
| Responsive images | Post content auto-resized; theme sizes via `config.image_sizes` + `img_url`/`srcset` | Ghost core + theme | [7] |
| Theme options for non-developers | `config.custom` settings, max 20, five types, `@custom` in templates | Theme author + site owner | [8] |
| Structured data / OG / Twitter / canonical / sitemap | Emitted by Ghost (`ghost_head` + core sitemap) | Ghost core | [6][53] |
| Native search | `#/search` URL in navigation or `data-ghost-search` attribute; `{{search}}` helper; searches title+excerpt of the most recent 10,000 posts; Algolia path for larger sites | Ghost bundle + Algolia opt-in | [12][50] |
| Native share modal | Link to `#/share`; no custom JS; official themes ship it | Ghost bundle | [13] |
| Editor | Built-in editor; content stored as Lexical (Mobiledoc deprecated since 5.0) | Ghost core | [15][27] |
| Memberships | Passwordless JWT email-link logins; four access levels; server-level gating | Ghost core | [16][44] |
| Paid subscriptions | Direct Stripe integration via Stripe Connect; Ghost takes 0% of revenue | Site owner's Stripe account | [16][42] |
| Portal | Ghost-served membership UI, enabled and customized in Admin, usable with any theme | Ghost bundle (`@tryghost/portal`) | [36][33] |
| Newsletters | Built-in, scheduled, segmentable, single or multiple newsletters | Ghost core + bulk mail provider | [17][39] |
| Bulk email | Ghost(Pro): included and managed. Self-hosted: Mailgun API keys required; basic SMTP cannot send bulk | Ghost(Pro) or Mailgun | [17][33] |
| Transactional/auth email | Member magic links use standard mail configuration, not bulk sending | Ghost(Pro) or site mail config | [17] |
| Custom sending domain | Optional, Publisher plan or higher, custom domain required, DMARC required, ~6-week warm-up | Ghost(Pro) | [38] |
| Member management | Dashboard for search/notes/import/export/segments; member CSV export with defined fields | Ghost Admin | [55][47] |
| Staff roles | Contributor, Author, Editor, Administrator, Owner with a published permission matrix | Ghost Admin | [24][57] |
| Editorial workflow | Drafts, previews (public/free/paid), test email, scheduling with site timezone, publish-with-newsletter | Ghost Admin | [54] |
| Content API | Read-only, keyed by a public Content API key, cacheable | Ghost core | [19] |
| Admin API | Full create/update/publish/email/scheduling/members/tiers/offers/newsletters/images/themes/webhooks, key+secret → JWT | Ghost core | [20] |
| Build triggers | 30+ webhook events including `post.published`, `page.published`, `member.added`, `site.changed` | Ghost core | [25] |
| Update model | Weekly minor releases (docs also say "typically every 1-2 weeks"), major versions every 12–18 months with theme compatibility and backups, Node 22 required, `?limit=all` removed in 6.0 | Ghost core / Ghost-CLI | [27][28][83] |
| Availability | Ghost(Pro) managed; self-hosted is operator work | see `hosting-operations.md` §3 and §7; plan ladder at [81] | [81] |

---

## 3. The native-theme workflow (documented path, end to end)

This is the officially documented workflow, assembled from the sources; it is **not** something this task executed.

1. **Scaffold from the official starter.** GitHub's "Use this template" on `TryGhost/Starter` creates a copy "for everything you need to get started developing a custom Ghost theme" [59].
2. **Develop against a local Ghost install.** Symlink the theme folder into the install's `content/themes`, restart Ghost, select the theme, install dependencies, and run development mode with livereload; Handlebars, CSS and JS changes appear automatically, with compiled CSS/JS emitted to a `built` folder [59][2].
3. **Build, zip, validate.** `pnpm build` compiles production assets, `pnpm zip` creates the archive, and `pnpm test` runs `gscan`; the Starter also ships a stricter `gscan --fatal --verbose` CI script and pins `gscan` as a devDependency [59][60].
4. **Deploy.** Either upload the theme `.zip` in Ghost Admin (Settings → Design/Theme → Upload theme), or deploy automatically with Ghost's official GitHub Action, which "packages and deploys Ghost themes through the Ghost Admin API" [46][71].
5. **Let Ghost enforce the fatal-error gate.** On upload, Ghost automatically runs `gscan` and "any fatal errors will prevent the theme from being used" [10][1].
6. **Run a full validation report before shipping.** The hosted GScan site at `gscan.ghost.org` gives the complete report, and the `gscan` npm package can be run against a folder or a zip (`gscan /path/... `, `gscan -z theme.zip`) [10][11].
7. **Operate.** Configure routing/taxonomies in `routes.yaml`, redirects in `redirects.yaml`, navigation in Settings, theme options through the 20-setting `config.custom` surface, and per-post/per-page templates via `custom-{{template-name}}.hbs` or slug variants [9][8][2].
8. **Keep it current.** Weekly Ghost releases, `gscan` theme compatibility guidance, and a documented breaking-changes catalog: "New major versions typically involve some backwards incompatible changes. These mostly affect custom themes and the API. Our theme compatibility tool GScan will guide you through any theme updates." [28][27][10]

**FACT (Support boundary):** Ghost states plainly that it will not write code for clients — "While we aren't able to write code for you, there are other options available for customizing themes" — and points to theme developers and the Expert directory [56]. This is the commercial gap the Phase 1 business case targets.

---

## 4. Memberships, Portal, Stripe, newsletters, and email — who owns what

This section exists because the acceptance criteria require membership/newsletter/Portal/Stripe/email responsibilities to be explicit.

### 4.1 Memberships (Ghost core)

- **FACT:** Members are stored in Ghost with defined attributes (`email`, `name`, `note`, `subscribed_to_emails`, `stripe_customer_id`, `status` free/paid/complimentary, `labels`, `created_at`) [16].
- **FACT:** Ghost uses **passwordless JWT email-link** authentication for members; secure email authentication is used for both sign-up and sign-in. Members can additionally use a one-time code, which the Help Center confirms is available when signing in through Portal, or requires the appropriate form attribute in a custom sign-in form [16][41][14].
- **FACT:** Four access levels exist — Public, Members only, Paid-members only, Specific tier(s) — and "Content is securely protected at server level and there is no way to circumvent gated content without being a logged-in member" [16]. The Help Center frames the same choice as three business models (free, paid only, free + paid) [44].
- **FACT:** Member imports are supported from CSV, Zapier or the API, and a member CSV export uses a defined field list (`id`, `email`, `name`, `note`, `subscribed_to_emails`, `complimentary_plan`, `stripe_customer_id`, `created_at`, `deleted_at`, `labels`) that can be re-imported into another Ghost site [16][47][49].
- **FACT:** Ghost requires double opt-in, so a list of unconfirmed member emails is not exposed [55].

### 4.2 Portal (Ghost-served membership UI)

- **FACT:** Portal is Ghost's built-in membership UI — "Portal handles the full membership experience for your subscribers and can be added to any Ghost site, using any theme, without needing to write code or edit your theme templates." It is enabled and customized from Admin (Settings → Membership → Signup portal) [36][14].
- **FACT:** Portal screens are reachable by URL fragment or data attribute: `https://example.com/#/portal/signup`, `#/portal`, `#/portal/recommendations`, `data-portal="signup/TIER_ID/monthly"`, `data-portal="signup/TIER_ID/yearly"`; the Portal button can be hidden while the screens stay reachable [14][18][36].
- **FACT:** Portal settings cover signup tier/price selection, inviting display of a name field, a terms notice with an optional required-agreement checkbox, button style/icon/text, support email shown to members, and a member Account page where members manage their own account and subscriptions [36].
- **FACT:** Themes can also build entirely custom membership flows with data attributes instead of Portal: `data-members-form` (`signin`, `signup`, `subscribe`), `data-members-email`, `data-members-name`, `data-members-newsletter`, `data-members-label`, `data-members-error`, `data-members-signout`, `data-members-otc`, `data-members-manage-billing` (Stripe customer billing portal, with an optional return URL), and `data-members-cancel-subscription` / `data-members-continue-subscription` [14].
- **FACT:** Ghost also ships a **hosted embeddable signup form** generated in Admin (Settings → Growth → Signup forms) with a copyable embed code — "you can create custom embeddable signup forms ... embedded anywhere on the web" [37].
- **FACT:** Ghost's own Portal bundle is published on npm as `@tryghost/portal` from the Ghost monorepo (latest 2.71.189 published 2026-09-22), and Ghost loads it from jsDelivr by default; the URL can be relocated or disabled with `"url": false` in configuration [75][33].
- **FACT (official source, monorepo):** The Portal README in the Ghost monorepo states that Portal "can be enabled on pages outside Ghost" with `<script defer src="https://unpkg.com/@tryghost/portal@latest/umd/portal.min.js" data-ghost="https://mymemberssite.com"></script>`, and that `data-ghost` "expects the URL for your Ghost site, which is the only input Portal needs to work with your site's membership data via Ghost APIs". It also documents that Portal auto-resolves preview metadata from `{{ghost_head}}` DOM tags and falls back to the current URL and document title otherwise [69].
- **FACT:** Older Ghost 5.0 breaking-change notes give the external embed with `data-ghost`, `data-api` and `data-key` and instruct integrators to update the script tag if they embed Portal on an external site [27].

> **Conflict — see §10 C1.** The product Help Center says Portal "is not available to be used for subscription management with a headless setup", while the developer/monorepo sources document embedding Portal on pages outside Ghost. Both are first-party. Treat the external-Portal route as **UNKNOWN until tested**.

### 4.3 Paid subscriptions and Stripe

- **FACT:** Ghost has a direct Stripe integration completed through **Stripe Connect**, connecting a publication to the publisher's own billing account; billing information is stored inside the publisher's own Stripe account [16][42].
- **FACT:** "Ghost takes **0%** of your revenue ... Standard Stripe processing fees still apply." [16]
- **FACT:** Membership, customer and business data remain the publisher's; members are exportable any time and subscriptions/billing live in the publisher's Stripe account [16].
- **FACT:** Each tier supports exactly two plans — monthly and yearly — and Ghost documents the legacy-syntax changes (numeric `monthly_price`/`yearly_price`, `currency`, tier benefits as string lists) introduced in 5.0 for custom membership flows [14][27].
- **FACT:** Subscription data exposed to themes includes Stripe IDs, plan interval/currency/amount (in smallest denomination), `status` (active/trialing/unpaid/past_due/canceled), `default_payment_card_last4`, `cancel_at_period_end`, `current_period_end`, tier name/description, `next_payment`, and offer/offer-redemption details [14].
- **FACT:** Ghost supports tips/donations as one-off payments on an active Stripe connection, gift subscriptions, gift links, complimentary plans, free trials and discount/trial offers; Stripe remains the only natively supported payment provider, with Patreon/PayPal/API paths for creating members externally [16][55].
- **FACT:** Payment-failure access behavior is governed by Stripe retry settings: `@member.paid` returns true for `active`, `trialing`, `unpaid` and `past_due`, and Ghost's guidance is to configure Stripe to cancel subscriptions after all payment attempts fail in order to revoke access [14].

### 4.4 Newsletters, bulk email, and sending domains

- **FACT:** Ghost sites have a single newsletter by default; more can be created and customized, members can choose which they receive, and posts can be delivered to free members, paid members, or segments [17][39].
- **FACT:** Newsletters can be scheduled and delivered as part of publishing, and every post can be published on the web, sent as an email, or both [54][39].
- **FACT (responsibility split):** On **Ghost(Pro)** "email delivery is included and the configuration is handled for you automatically". On **self-hosted**, bulk email requires entering **Mailgun** API keys in the Email newsletter settings, and "Delivering bulk email newsletters can't be done with basic SMTP. A bulk mail provider is a requirement to reliably deliver bulk mail. At present, Mailgun is the only supported bulk email provider." [17]
- **FACT:** Auth emails (member magic links) are not bulk and use the standard mail configuration, which self-hosters must configure separately [17].
- **FACT:** Custom sending domains are optional and available **only on Publisher plan or higher** on Ghost(Pro); they require a custom domain first, require a DMARC policy record, and are warmed up gradually — until fully warmed (approximately 6 weeks) a fraction of recipients still receive mail from `ghost.io`, while transactional email uses the custom domain immediately [38].
- **FACT:** Ghost documents newsletter template/design settings, link editing after send, welcome emails, audience feedback, deliverability guidance, and member email troubleshooting as product surfaces owned by Ghost, not by the theme [39][40][55].
- **FACT:** The Admin API can send a post via email, create email-only posts, and create/update newsletters, and it validates sender email configuration [20].

### 4.5 Email/newsletter implications for headless work

- **FACT:** Ghost's own headless guide warns that newsletter **unsubscribe links always point at the Ghost origin** and break if that origin is redirected, and that "Preview URLs and other dynamically generated paths may also behave unexpectedly when blanket redirects are used" [26].
- **FACT:** The Help Center repeats the same two limitations in product terms: "View in Browser" links and unsubscribe links contained in newsletter templates "will always lead to the ghost.io site" [45].
- **RECOMMENDATION:** For any Ghost-led engagement where newsletters matter, treat the Ghost origin as a permanent, non-redirected part of the public URL surface. Blanket redirects from the Ghost origin to an external front end are documented as fragile and are the documented cause of broken unsubscribe and preview links [26].

---

## 5. API surface and secret-handling rules

- **FACT (Content API):** Base URL `https://{admin_domain}/ghost/api/content/`; authenticated with `?key={key}`; "These keys are safe for use in browsers and other insecure environments, as they only ever provide access to public data." The API is read-only, "designed to be fully cachable, meaning you can fetch data as often as you like without limitation", and exposes posts, pages, tags, authors, settings and tiers [19].
- **FACT (Admin API):** Base URL `https://{admin_domain}/ghost/api/admin/`; "The API Key is secret, and therefore this authentication method is only suitable for secure server side environments." Admin API keys are an `id:secret` pair used to generate short-lived single-use JWTs (HS-256, `kid` = key id) sent in the `Authorization: Ghost <token>` header, and "The admin API key must be kept private, therefore token authentication is not suitable for browsers or other insecure environments, unlike the Content API key." [20]
- **FACT:** The official Admin API JavaScript client is "designed for server-side usage only", while the Content API JavaScript client "can be used in any JavaScript project, client or server side" [21][22].
- **FACT:** Keys are created as a Custom Integration in Ghost Admin, and they can be regenerated at any time, which requires updating anything that uses them [19][20].
- **FACT (Admin API scope):** The Admin API can do everything Ghost Admin can do and more, including posts (create/update/publish/schedule/delete/send by email/email-only/card visibility), pages, tiers, newsletters, offers, members, labels, users and roles, images, theme upload, site and webhooks [20].
- **FACT (webhooks):** Webhooks are per-integration, POST JSON to a reachable URL, treat any non-2xx as failure, and cover events across posts, pages, tags and members, including `site.changed` — the documented example use case explicitly includes "a total redeployment of a site" [25].

### 5.1 Non-negotiable secret rules for any Phase 5/6+ deliverable

1. **Admin API keys never reach browser code.** Only server-side build steps, CI, or serverless functions may hold an Admin API key or its JWT [20][21]. This is the documented mechanism behind the `AGENTS.md` rule that privileged CMS credentials must not be exposed to browser code.
2. **Content API keys may be public.** They are documented as safe in browsers and expose public data only; sites in private mode should still consider where they share keys [19].
3. **Client-side membership code must not be given membership secrets.** Member auth is Ghost's email-link/one-time-code flow against Ghost's own endpoints; a custom front end that wants member sessions is rebuilding an authentication system, not consuming a documented API (§6) [16][41].
4. **Build-time fetches should respect pagination and pacing.** Ghost 6.0 removed `?limit=all` and caps API page size at 100, and Ghost's headless guide advises small delays to avoid host rate limits or fair-use policies [27][26][5].

---

## 6. Headless with Ghost — documented limitations and the rebuild obligation register

This is the load-bearing section for `DECISIONS.md` D-004. All statements are first-party.

### 6.1 What Ghost says explicitly

- **FACT (hard statement):** "Ghost's membership functionality is **not** compatible with headless setups. To use features like our Stripe integration for paid subscriptions, content gating, comments, analytics, offers, complimentary plans, trials, and more — Ghost must be used with its frontend layer." [26]
- **FACT (the long tail):** Ghost's default front end "is not just a theme layer, but also contains a large subset of functionality that is commonly required by most publishers", namely tag archives/routes/templates, author archives/routes/templates, generated `sitemap.xml`, intelligent SEO metadata output and fallbacks, automatic Open Graph structured data, automatic Twitter Cards, custom routes and automatic pagination, and front-end code injection from admin. "When using a statically generated front-end, all of this functionality must be re-implemented. Getting a list of posts from the API is usually the easy part, while taking care of the long tail of extra features is the bulk of the work needed to make this work well." [26]
- **FACT (Ghost(Pro)-specific headless limits):** Ghost(Pro) can be used as a headless CMS, but "Using Ghost(Pro) as a Headless CMS does come with some limitations, and would require a more technical background to rebuild features that come 'out of the box'": structured data, sitemaps, tag and author archives, AMP templates and custom routing must be rebuilt; **Portal is not available to be used for subscription management with a headless setup**; "View in Browser" and unsubscribe links always lead to the `ghost.io` site; "A headless setup requires a custom theme, to not expose content to search"; and "You will not benefit from Ghost(Pro)'s CDN, provided via Fastly." [45]
- **FACT (duplicate-content handling):** The documented way to avoid two public copies of the same content is **Private Site Mode**, which "will put a password on your Ghost install's front-end, disable all SEO features, and serve a `noindex` meta tag". Blanket DNS/local redirects from the Ghost origin to the new front end are documented as "a more fragile setup" that breaks unsubscribe links, preview URLs and "other dynamically generated paths" [26].
- **FACT (images):** API content HTML contains absolute image URLs pointing at the Ghost install's origin, intentionally, because Ghost is designed as the source of truth for serving optimised assets and may be installed in a subdirectory. A static front end must either treat the Ghost install as a CDN origin or download and rewrite images at build time [26].
- **FACT (API shape changes that hit headless builds):** `?limit=all` was removed in Ghost 6.0 and every endpoint now has a max page size of 100; Ghost's own guide tells static-site builders to paginate instead, and warns headless/custom-integration users to handle pagination before updating [26][27].

### 6.2 Rebuild obligation register

Each row is a documented native-front-end behavior that a headless front end must recreate, own, and keep working across Ghost releases. "Rebuild" is not theoretical work — it is permanent, per-site responsibility with no upstream support path.

| # | Native behavior (Ghost-served) | Headless obligation | Evidence |
|---|---|---|---|
| R1 | Stripe paid subscriptions, content gating, content gating by tier | Not compatible with headless; must be replaced or the site must keep Ghost's front end | [26][16] |
| R2 | Portal membership UI (signup, sign-in, account, billing portal, offers, trials, complimentary) | Documented as unavailable for subscription management in a headless setup; the external-embed route is documented separately and untested here (§10 C1) | [45][69][36] |
| R3 | Member auth/session — passwordless magic link + one-time code, JWT, server-side gated content | Must be rebuilt and secured independently; Ghost documents no supported member-auth API for third-party front ends | [16][41][26] |
| R4 | Newsletter sending, segmentation, scheduling, welcome emails | Not rebuilt — newsletters must still be produced and sent by Ghost; the external front end is not the delivery system | [17][39][26] |
| R5 | Newsletter "View in Browser" and unsubscribe links | Always resolve to the Ghost/`ghost.io` origin; cannot be repointed to the new front end | [45][26] |
| R6 | Previews (public/free/paid previews, shareable preview URLs, `/p/` preview paths) | Preview URLs are dynamically generated by Ghost and "may behave unexpectedly" behind blanket redirects; visual preview of the themed site is not available for the external front end | [54][26][32] |
| R7 | Native search (`#/search`, `data-ghost-search`, `{{search}}`, Sodo Search bundle) | Search UI and index are Ghost-side (`apps/sodo-search`, published as `@tryghost/sodo-search` from the Ghost monorepo); a headless front end needs its own search or an Algolia pipeline | [12][50][76][69] |
| R8 | Recommendations (Webmention-based, `/.well-known/recommendations.json`, `{{recommendations}}` helper, Portal recommendations modal) | Served by Ghost core at the Ghost origin; the external front end would have to re-implement the Webmention surface and the modal | [18] |
| R9 | Social web / ActivityPub (`@index@yourdomain.com` profile, reader, followers, interactions) | Ghost-side service with a custom-domain requirement that precludes a subdirectory install; it is an additional distribution channel tied to the Ghost origin and "separate to the rest of your site and memberships" | [51][33] |
| R10 | Comments (member-only native comments, replies, likes, moderation, reply notifications) | Ghost-side bundle (`apps/comments-ui`, published as `@tryghost/comments-ui`); requires a logged-in member session | [52][70][82] |
| R11 | Analytics (native web analytics, member sources, newsletter opens/clicks, outbound link tagging) | Ghost-side; documents itself as incompatible with the Ghost-CLI hosting path and unavailable in the headless front end | [26][70] |
| R12 | SEO plumbing — sitemap.xml, canonical tags, OG/Twitter/structured data, RSS per archive | Must be rebuilt (sitemap explicitly named by Ghost) | [26][53][45] |
| R13 | Tag archives, author archives, pagination, custom routes, code injection | Must be rebuilt; routing and archives are named by Ghost as rebuild items | [26][9] |
| R14 | Responsive image generation, resizing and CDN delivery of media | Must be re-implemented at build time or the Ghost origin kept as the asset origin | [26][7] |
| R15 | Theme-level access to `@member`, `access`, `visibility`, `@member.subscriptions` | These are member-context template variables; a static build cannot resolve them per visitor | [14] |
| R16 | Custom sending domain and deliverability warm-up | Ghost(Pro)-only feature; irrelevant to the front end but it is part of why the publication stays on Ghost | [38] |

**ESTIMATE (labelled, not a quote):** For a publication that relies on memberships, newsletters, comments or recommendations, the rebuild register above is not a bounded front-end project — it is a parallel product surface with its own auth, payments-adjacent, email, search and SEO maintenance burden. The risk is not that any single row is hard; it is that 16 rows must all keep working across weekly Ghost releases that "mostly affect custom themes and the API" [27].

### 6.3 What headless genuinely buys (stated without overstating)

- **FACT:** Ghost's architecture is deliberately decoupled — "At its core Ghost is a self-consuming, RESTful JSON API with decoupled admin client and front-end ... so if you want to use Ghost completely headless and write your own frontend or backend … you can!" — and Ghost publishes first-party setup guides for Next.js, Gatsby, Hexo, Nuxt, VuePress, Gridsome, Eleventy and custom front ends [35][26].
- **FACT:** A headless front end can be a fully static build driven by the Content API, with pagination handled explicitly [26].
- **ESTIMATE:** The defensible reasons to go headless are *design or component-model requirements that Ghost's theme layer cannot express within budget*, or a need to unify a Ghost editorial backend with an existing application. Neither is the same as "we want a custom-looking site": a native theme with custom settings, custom templates, partials and `routes.yaml` already covers a large amount of bespoke presentation, and D-004 requires the distinction to be made in writing [8][2][9].

### 6.4 Headless decision criteria (pass/fail, must be recorded per engagement)

A recommendation to use headless Ghost **requires all four** of the following to be true and written down; failing any one keeps the engagement native per D-004.

1. **Functional gap, named.** A specific, verifiable capability that the native theme layer cannot deliver within the accepted budget, stated as a requirement and not a preference. Membership, paid subscriptions, gating, Portal-driven account flows, newsletters, comments, recommendations, social web, native search, previews, analytics and sitemap/SEO plumbing are **excluded from being such a gap** — Ghost documents them as incompatible with headless, not as workarounds [26][45].
2. **Rebuild register accepted in writing.** The client accepts, in the scope document, that R1–R16 (§6.2) are either rebuilt, dropped, or permanently satisfied by keeping the Ghost origin in the public flow — including the consequences for unsubscribe links, preview URLs, and the loss of the Ghost(Pro) CDN [26][45].
3. **Ownership and origin plan.** A decision on whether Ghost's front end is password-protected with Private Site Mode or kept public, plus who owns the Ghost origin and its DNS; the documented failure mode is a blanket redirect that breaks minted email links [26].
4. **Maintenance and cost honesty.** The extra build pipeline, search/SEO/auth ownership and per-release compatibility review are priced into the engagement and the recurring plan, not absorbed silently; Ghost's own note that integrations, APIs, webhooks and headless mode users must review breaking changes carefully before updating, plus the 6.0 pagination change, are the evidence that this cost recurs [27][26].

Otherwise: **native theme, with custom settings, custom templates, partials and `routes.yaml`** — and note that custom themes are unavailable on the Ghost(Pro) Starter plan, so the plan choice is part of the proposal [81][26].

---

## 7. GScan and repository evidence

### 7.1 GScan (theme validation)

- **FACT:** GScan "will check your theme for errors, deprecations and compatibility issues", is available as the hosted site `gscan.ghost.org`, is run automatically on theme upload (fatal errors block use), and is available as a CLI package (`npm install -g gscan`; `gscan <folder>`; `gscan -z theme.zip`) [10][11].
- **FACT:** The hosted GScan page title at retrieval was "The official tool to test your Ghost theme" [11].
- **FACT:** `TryGhost/gscan` is an MIT-licensed monorepo ("Monorepo root for GScan: the gscan library/CLI and its web frontend") requiring Node `^22.17.0 || ^24.0.0`; the package `gscan` resolves to `packages/gscan` [63][64].
- **FACT:** npm `gscan` latest is **6.6.1**, published 2026-09-11, MIT, described as "Scans Ghost themes looking for errors, deprecations, features and compatibility" [74].
- **FACT:** The official Starter theme pins `gscan` 6.6.1 and exposes `test` (`gscan .`) and `test:ci` (`gscan --fatal --verbose .`) scripts [60].
- **FACT:** Ghost directs major-version theme compatibility questions to GScan and lists theme-breaking changes in its breaking-changes catalog that "mostly affect custom themes and the API" [27][28].

### 7.2 Official repositories, licences, and current state (read 2026-09-22)

| Repository | Purpose (official description) | Licence | Signals at retrieval |
|---|---|---|---|
| `TryGhost/Ghost` | "Independent technology for modern publishing, memberships, subscriptions and newsletters." | MIT | 55,381 stars, 11,977 forks, 201 open issues, not archived; `main` head `358367b0…` dated 2026-09-22T15:04:18Z; latest release **v6.65.0** published 2026-09-22T15:28:40Z [58][72][73] |
| `TryGhost/Starter` | "A development starter theme for Ghost" | MIT | 496 stars, 236 forks, active (pushed 2026-09-22); `engines.ghost >=5.0.0`; Rollup/PostCSS/pnpm toolchain; `gscan` 6.6.1 devDependency; GH Deploy Action workflow included; `config.custom` and `config.image_sizes` present [59][60][58] |
| `TryGhost/Source` | "The default theme for Ghost" | MIT | 129 stars, 258 forks, active (pushed 2026-09-22) [61][58] |
| `TryGhost/Casper` | "A classic theme for Ghost" | MIT | 2,578 stars, 2,723 forks, active (pushed 2026-09-22); used across the docs as the reference theme [62][2][7] |
| `TryGhost/gscan` | "Ghost theme scanner - checks for errors and feature support" | MIT | 84 stars; monorepo per §7.1 [63][64] |
| `TryGhost/Ghost-CLI` | "CLI Tool for installing & updating Ghost" | MIT | 497 stars, active (pushed 2026-09-22) [65] |
| `TryGhost/algolia` | "JavaScript CLI and Netlify Functions for indexing Ghost posts in Algolia" | MIT | 22 stars, active (pushed 2026-09-22); the documented path for search beyond the native 10,000-post scope [66][12] |
| `TryGhost/action-deploy-theme` | "GitHub Action that packages and deploys Ghost themes through the Ghost Admin API" | MIT | 391 stars, active (pushed 2026-09-22) [71] |
| `TryGhost/Portal` | "Drop-in script to add membership features in a Ghost theme" | MIT | **Archived**; last push 2022-10-05; superseded by the monorepo [67][70] |
| `TryGhost/sodo-search` | "Drop-in script for search in Ghost" | MIT | **Archived**; last push 2023-03-17; superseded by the monorepo [68][70] |

- **FACT (monorepo consolidation):** The Ghost monorepo `apps/` directory at retrieval contains `activitypub`, `admin-toolbar`, `admin-x-framework`, `admin`, `announcement-bar`, `comments-ui`, `ember-admin`, `portal`, `shade`, `signup-form` and `sodo-search` [70]. Published package metadata confirms provenance from `TryGhost/Ghost` for `@tryghost/portal` (2.71.189), `@tryghost/sodo-search` (1.8.553), `@tryghost/comments-ui` (1.6.286) [75][76][82].
- **FACT:** npm's metadata for `@tryghost/activitypub` (last version 3.1.52, 2026-06-24) is marked deprecated with the message **"No longer published separately — ActivityPub is now bundled into Ghost Admin."** [79]
- **FACT (client libraries):** `@tryghost/content-api` latest 1.12.12 and `@tryghost/admin-api` latest 1.14.13, both MIT, both published 2026-09-21, both sourced from the `TryGhost/SDK` monorepo [77][78].
- **FACT (Ghost core licence):** Ghost is released under the MIT licence [29].

### 7.3 Cross-artifact correction to `research/phase-3/hosting-operations.md`

- **FACT:** That artifact records an unexplained gap between Ghost's documented weekly release cadence and the release page it captured (newest listed release `v6.38.0` dated "13 May", roughly four months before retrieval), and it explicitly declined to conclude that releases had stopped.
- **FACT (correction):** The GitHub releases API for `TryGhost/Ghost` returned latest release **`v6.65.0`, published 2026-09-22T15:28:40Z**, with `main` head at 2026-09-22T15:04:18Z [72][73]. Ghost `v6.38.0` to `v6.65.0` is 27 minor releases; whatever the earlier capture displayed, **the release cadence is current and frequent**, and the "releases may have stopped" ambiguity should be considered resolved in the direction of normal cadence.
- **Note for synthesis:** the same artifact's "v6.x current, released 2025" lifecycle statement and the Ghost 5.x "End of Life January 2026" date remain standing; this correction only affects the release-page observation.

### 7.4 Marketplace and official themes

- **FACT:** "Official themes are built and maintained by the Ghost team. All are free to use and 100% open source" [80].
- **FACT:** Only official themes can be used with the Starter plan on Ghost(Pro); premium and custom themes are available above that [46][81].
- **Observation (not a conclusion):** The `https://ghost.org/themes/?category=official` capture returned 242 unique theme slugs across categories (Magazine 90, Blog 82, Portfolio 24, News 16, Newsletter 11, Podcast 7, Docs 7, Photography 4 as rendered category badges), and the page's free/paid and category filters are applied client-side. **UNKNOWN:** the number of themes in the *official* subset; the static capture does not expose it, and no count is claimed here [80].

---

## 8. Reusable native-theme boundary

`AGENTS.md` requires separating reusable engineering foundations from client-specific visual identity, and D-001 forbids building a product line without demonstrated demand. The documented surface supports a clean split.

### 8.1 What is legitimately reusable across client sites

| Layer | Why it transfers | Constraints that must be respected | Evidence |
|---|---|---|---|
| Starter-derived project scaffold (Rollup/PostCSS/pnpm, livereload, zip, gscan test scripts) | Official, MIT, designed as a template | Keep it a copy per client; do not run a shared multi-tenant build | [59][60] |
| CI gate shape (`gscan --fatal --verbose`, deploy action) | Official, MIT | Deploy action needs an Admin API key stored as a CI secret, never in the browser or the theme | [60][71][20] |
| `package.json` contracts (`config.posts_per_page`, `config.image_sizes` ≤10, `config.card_assets`) | Ghost-defined schema | Values are per-site design decisions | [2][7] |
| Custom-settings *vocabulary* (`select`/`boolean`/`color`/`image`/`text`, max 20) | Ghost-defined schema | The 20-setting cap is a hard limit that forces discipline; settings are part of each client's admin surface | [8] |
| Partial and template-variant patterns (`default.hbs`, `partials/`, `custom-{{template-name}}.hbs`, `page-:slug.hbs`) | Ghost-defined conventions | Slugs and templates are content-shaped, so only the pattern transfers, not the files | [2] |
| Required-helper and accessibility baseline (`ghost_head`/`ghost_foot`, `body_class`, semantic templates) | Ghost requirement plus project standard | Do not ship a theme without them; they are what makes SEO/API wiring work | [2][6] |
| Verification checklist | Evidence-producing QA is a project requirement | GScan plus manual keyboard/focus/semantics review; automation is not acceptance | [10][53] |
| Membership/Portal integration knowledge — which attributes and Portal screens exist, and which are product-side | Stable, documented product surface | Do not reimplement Portal/Members/email; that is the headless trap | [36][14][17] |

### 8.2 What must stay client-specific (and therefore must not be reused)

- **Visual identity:** templates, CSS, typography, brand color settings, images, screenshots. Visual direction is a Checkpoint 2 decision and per-client by definition (`PROJECT_STATUS.md` P6).
- **Routing and taxonomy:** `routes.yaml`, collection structure, taxonomy prefixes, custom routes and `redirects.yaml` are content-model decisions with collision hazards — routes and slugs can shadow each other, and collections must be filter-unique [9].
- **Navigation, content, and any copy:** Ghost-managed; never fabricated (`AGENTS.md`).
- **Custom settings values:** the per-site choices a non-developer is allowed to change [8].
- **Membership/business configuration:** tiers, prices, offers, trials, gating levels, Portal options, sending domain — all in the client's own accounts, per D-003 [16][38][36].

### 8.3 Boundary rules (RECOMMENDATION, not approved)

1. Ship a **theme per client publication**, derived from the official Starter, with a client-specific name, version and `docs` URL [2][59].
2. Treat the reusable asset as a **documented internal checklist and scaffold pattern**, not a shared runtime, shared theme, or theme product line. A theme product line is explicitly deferred in `docs/01-business.md` §8 and no demand evidence exists for it [60].
3. Keep every credential, Ghost instance, Stripe account, and sending-domain configuration inside the client's own accounts (D-003, `AGENTS.md`).
4. Every theme we ship passes `gscan` and the project's accessibility/visual gates before handover, and the client receives the theme zip and its source repository [10][47].

---

## 9. Migrations, ownership, licensing, and update compatibility

- **FACT (migrations in):** Ghost documents first-party migration guides from Substack, beehiiv, WordPress, Newspack, Medium, Squarespace, Kit, Mailchimp, Patreon, Buttondown, Memberful, Gumroad and Jekyll, plus Ghost-to-Ghost and a custom-JSON format for other platforms [31]. The Substack guide documents posts and free/paid subscribers moving, Stripe continuity, and redirect handling for Substack `/p/` URLs — which collide with Ghost's own `/p/` preview paths and therefore require a deliberately complex redirect expression [32].
- **FACT:** The in-product importer handles Substack, Medium, Mailchimp and others, supports a "Universal import" between Ghost installs, accepts JSON or zip (content and images together), and Ghost publishes splitting tools for large imports [48].
- **FACT:** Members can be imported from a CSV produced by another Ghost site, or a reformatted external list [49].
- **FACT (exports/ownership):** A site can export content (settings, staff users, posts, pages, tags) as JSON, members as CSV with a defined field list, **the theme as a zip**, and post analytics as CSV [47].
- **FACT:** Ownership of membership/customer/business data is explicitly the publisher's, members are exportable at any time, and subscriptions/billing live in the publisher's own Stripe account [16]; Ghost(Pro) ownership transfer is a documented staff operation [47].
- **FACT (licensing):** Ghost core, the official themes, GScan, Ghost-CLI, the client SDKs, the deploy action and the client bundles are all MIT at retrieval [29][74][75][76][77][78][63][65][71]. Premium marketplace themes are third-party products purchased outside Ghost's marketplace, with support provided by their developer, and their licences are not covered by Ghost's MIT licence [46][80].
- **FACT (update compatibility):** Ghost ships minor updates weekly (its developer docs also describe releases as "typically released every 1-2 weeks"); major versions arrive every 12–18 months, break backwards compatibility, and "require a more involved upgrade process, including backups and theme compatibility"; `gscan` is the documented theme-compatibility tool; the breaking-changes catalog should be reviewed before updating for custom themes, integrations, APIs, webhooks and headless setups; Ghost 6.0 removed `?limit=all` with a 100-item API page cap, requires Node 22, and supports only MySQL 8 [28][83][27][10]. Major-version life-cycle dates (Ghost 5.x EOL January 2026; Ghost 6.x current) and the Ghost(Pro) upgrade path were established in `research/phase-3/hosting-operations.md` and are not restated here.
- **FACT (hidden coupling):** Editing content programmatically requires preserving the Lexical `visibility` property on cards — "Stripping it resets cards to default visibility, which can unintentionally make members-only content public" [27]. Anyone scripting content migration or bulk edits owns that risk.

---

## 10. Conflicts and observations (recorded, not smoothed over)

| ID | Conflict / observation | Both sides | Status |
|---|---|---|---|
| C1 | **Portal in a headless setup.** The Help Center states: "Portal is not available to be used for subscription management with a headless setup". The Ghost monorepo's Portal README states Portal "can be enabled on pages outside Ghost" with a script tag whose `data-ghost` "is the only input Portal needs to work with your site's membership data via Ghost APIs"; Ghost 5.0 breaking-change notes likewise document an external embed and instruct integrations to update the script tag. | [45] vs [69][27] | **UNRESOLVED — treat as UNKNOWN.** The safe reading for planning is the Help Center's: subscription management is not a supported headless feature. An external Portal embed must be treated as unsupported-until-proved, and proving it requires a live site, a Stripe connection and a member flow (§1.2). |
| C2 | **Ghost(Pro) CDN.** The headless Help Center page says a headless setup will not benefit from Ghost(Pro)'s Fastly CDN, while the hosting comparison markets CDN as an included platform feature. | [45] vs `hosting-operations.md` §3 | Both are first-party and consistent once read as scope: CDN delivery of the **Ghost-served front end**. A headless front end is a different origin. Recorded so synthesis does not double-count CDN as a headless benefit. |
| C3 | **Release cadence.** The sibling artifact's release-page observation (newest listed `v6.38.0`, "roughly four months" before retrieval, cadence called into question) versus the GitHub releases API returning `v6.65.0` published on the retrieval date. | `hosting-operations.md` §2 vs [72][73] | **Resolved in favour of normal cadence** (§7.3). The earlier observation was a capture artifact, not a product change. |
| C4 | **Client bundle repositories archived.** `TryGhost/Portal` and `TryGhost/sodo-search` are archived (2022 and 2023), yet Portal and search are current, actively released features (npm publishes on the retrieval date). | [67][68] vs [70][75][76] | **Resolved:** the standalone repos are superseded by `apps/portal` and `apps/sodo-search` in the Ghost monorepo. Do not cite the archived repos as current source. |
| C5 | **Official-theme count.** The official-themes listing page contains client-side filters; the static capture exposed 242 theme slugs across categories without separating the official subset. | [80] | **UNKNOWN.** No official-theme count is claimed. |
| C6 | **Search scope.** Native search covers "the most recent 10,000 posts" and excludes excerpts for member-only posts; Ghost's guidance beyond that is Algolia via an official tool. | [12][66] | Recorded. Relevant to publications near or beyond that scale, and to any headless plan where search must be rebuilt (R7). |
| C7 | **"Unlimited" theme customization.** Ghost's Help Center redirects custom-theme requests to external developers while marketing a customization surface; the documented ceiling is 20 custom settings plus templates/partials/routes. | [56][8][9] | Not a contradiction but a positioning fact: the customization surface is bounded, which is exactly what makes bounded theme work quotable. |
| C8 | **`?limit=all` removal.** Ghost 6.0 removed bulk fetching and capped API pages at 100, while the architecture documentation still describes Ghost as "Just JSON" with no front-end requirement. | [27][26][35] | Not a contradiction: headless is supported, but static-build pagination logic is now mandatory. Ghost tells headless users to fix pagination before updating [27]. |

---

## 11. Acceptance self-check

| Acceptance criterion | Where satisfied |
|---|---|
| Native themes remain the default absent a specific reason | §6.4 decision criteria require all four conditions and name the excluded non-reasons; D-004 restated in the header; §3 documents the native workflow; §8.3 rule 2 refuses a theme product line |
| Membership / newsletter / Portal / Stripe / email responsibilities are explicit | §4.1–§4.5 with an owner per capability; §2.1 matrix rows for memberships, paid subscriptions, Portal, newsletters, bulk email, transactional email, custom sending domain; §6.2 R1–R4, R16 |
| Browser code never receives Admin secrets | §5.1 rules 1–4 with the exact first-party wording ("only suitable for secure server side environments"; "must be kept private … not suitable for browsers"; Admin client "server-side usage only") and the public-key exception for the Content API |
| Every external fact has an official source | Every claim carries an inline citation; §13 lists official Ghost docs, Ghost Help Center, Ghost/Ghost-Foundation repositories and the npm registry, one URL per entry, with the retrieval date |
| No theme, deployment, universal framework, or hosting platform built | §1.3 explicitly enumerates what was not executed; §8.3 rule 2 forbids the shared-runtime/product-line reading; D-001 restated in the header |
| Feature/architecture matrix | §2.1 (26 rows) |
| Native-theme workflow | §3 (8 documented steps) |
| Headless limitations and decision tree | §6.1 documented statements, §6.2 rebuild register R1–R16, §6.3 what headless buys, §6.4 four pass/fail criteria |
| Repository / GScan evidence | §7.1 (GScan mechanics, versions, licences), §7.2 (11 repositories with licence and live signals), §7.3 (cross-artifact correction), §7.4 (marketplace) |
| Reusable native-theme boundary | §8.1 reusable layer table, §8.2 must-stay-client-specific list, §8.3 four boundary rules |
| Exact official URLs and explicit untested items | §13 (83 numbered sources, one canonical URL each, retrieval date stated) and §1.2 / §1.3 plus §12.2 |
| Conflicts recorded, not smoothed | §10 (C1–C8) |
| Stopping point respected | Only this file was written; no other artifact, governance file, board state or Git history was touched |

---

## 12. Verification performed and explicit untested items

### 12.1 Verification performed

1. **Official URL re-open pass.** 48 load-bearing official URLs were fetched live at the end of the task with an expected marker string asserted per URL. 45 matched exactly; the three non-matches were confirmed to be marker case/markup differences, not content disagreements, and were re-checked by hand (`jamstack.md` bold text, `help/protected-content.md` wording, `faq.md` heading case). Results: 48/48 HTTP 200 [26][16][30].
2. **Repository metadata and source read live** for 11 official repositories, with stars/forks/issues/last-push/licence/archived state recorded (§7.2), plus the `apps/` directory listing and three in-repo `package.json` files [58][59][60][61][62][63][64][65][66][67][68][69][70][71][72][73].
3. **Registry metadata read live** for `gscan`, `@tryghost/portal`, `@tryghost/sodo-search`, `@tryghost/content-api`, `@tryghost/admin-api`, `@tryghost/comments-ui` and `@tryghost/activitypub`, including publish dates, licences, repositories and the ActivityPub deprecation message [74][75][76][77][78][79][82].
4. **Documentation-index discipline.** Pages were discovered through `docs.ghost.org/llms.txt` and `ghost.org/help/llms.txt` rather than guessed URLs, and the `.md` variants were used for exact wording [34][35].
5. **Cross-checks against the sibling artifact** produced one correction (§7.3 C3) and two scope clarifications (§10 C2, and the unchanged life-cycle statements).
6. **Final citation-consistency pass.** A local parser run over the finished artifact reported: **83 source entries, 83 distinct canonical URLs (no duplicates), 83 distinct ids cited in the body, 0 dangling citations, 0 orphan sources, 0 citation ranges.** The last source added (Ghost CLI, source 83) was re-opened live after being added — HTTP 200, with both quoted phrases present in the response.

### 12.2 Explicit untested items

- Not tested: that Portal's external embed actually supports signup, sign-in, paid checkout and account management for a headless front end (the §10 C1 conflict is unresolved by design — **UNKNOWN**).
- Not tested: whether Ghost's member auth endpoints can be used by a third-party front end at all, including CORS, cookies, session lifetime and cross-origin behavior.
- Not tested: `gscan` output on any theme, including any Starter-derived theme; no theme was created, built, zipped or uploaded.
- Not tested: theme upload, activation, rollback, or the fatal-error gate on a real Ghost instance.
- Not tested: `routes.yaml`/`redirects.yaml` behavior, route/slug collisions, or the removal of the legacy JSON redirect format.
- Not tested: Content API or Admin API requests against a live site; no key was created; nothing was measured about rate limits, latency or cache behavior.
- Not tested: webhook delivery, signature/authentication handling, or build-trigger latency.
- Not tested: responsive image generation, `image_sizes` behavior, or media storage growth.
- Not tested: member import/export round trip, tier creation, offers, trials, gifting, or Stripe Connect consent flow.
- Not tested: newsletter sending, segmentation, scheduling, welcome emails, "View in Browser"/unsubscribe link targets, or custom sending domain activation and warm-up.
- Not tested: Private Site Mode, `noindex` behavior, or redirect strategies for a headless origin.
- Not measured: the real effort, cost, or elapsed time of any rebuild row in §6.2. The "16 rows" framing is a structural count from documented behaviors, not a work estimate.
- Not established: the official-theme count (§10 C5), Ghost(Pro) plan prices and limits (owned by `research/phase-3/hosting-operations.md`), and the current EOL date for Ghost 6.x.
- Version-sensitive: Ghost 6.65.0, `gscan` 6.6.1, `@tryghost/portal` 2.71.189 and all repository signals are point-in-time observations on 2026-09-22 and must be re-retrieved before customer-facing use [72][74][75].
- Not verified: whether the 20-custom-setting cap, the 100-item API page cap and the 10,000-post native search scope changed in any release between retrieval and use.

---

## 13. Sources

All URLs retrieved 2026-09-22 (UTC). Ghost developer documentation pages were fetched as their `.md` variants for exact wording; Help Center pages were fetched as `help/<slug>.md` against the canonical `help/<slug>/` URL. One URL per entry.

1. Ghost developer docs — Ghost Handlebars Themes (Handlebars + express-hbs, separation of templates and logic, static HTML delivery, GScan, `gscan` CLI usage, Starter pointer). https://docs.ghost.org/themes
2. Ghost developer docs — Structure (required `index.hbs`/`post.hbs`/`package.json`; recommended file layout; template variants including `home.hbs`, `page.hbs`, `post-:slug.hbs`, `page-:slug.hbs`, `custom-{{template-name}}.hbs`, `tag.hbs`, `author.hbs`, `private.hbs`, `error.hbs` and status-specific error templates, theme `robots.txt`; required helpers list; development mode and `ghost restart`; `package.json` keys `config.posts_per_page`, `config.image_sizes`, `config.card_assets`, `config.custom`, `docs`, `license`, `screenshots`). https://docs.ghost.org/themes/structure
3. Ghost developer docs — Contexts (six contexts, `{{#is}}` detection, context-aware helper output). https://docs.ghost.org/themes/contexts
4. Ghost developer docs — Helpers (functional, data and utility helper groups; individual helper pages listed in the docs index). https://docs.ghost.org/themes/helpers
5. Ghost developer docs — get helper (server-side browse/read queries before render; resources `posts`, `tags`, `authors`, `tiers`, `newsletters`; `limit` allowed 1–100 and capped at 100; `page`, `order`, `filter`, `include`). https://docs.ghost.org/themes/helpers/functional/get
6. Ghost developer docs — ghost_head & ghost_foot (meta description, Schema.org JSON-LD structured data, Open Graph, Twitter Cards, RSS discovery links, "Scripts to enable the Ghost API", code injection). https://docs.ghost.org/themes/helpers/utility/ghost_head_foot
7. Ghost developer docs — Assets / responsive images (automatic compression and resizing of post images, `config.image_sizes` cache behavior, recommendation of no more than 10 sizes, `img_url` with `size` and `srcset` examples from Casper). https://docs.ghost.org/themes/assets
8. Ghost developer docs — Custom Settings (`config.custom`; five types select/boolean/color/image/text; `@custom` object; **themes are limited to a total of 20 custom settings**; groups and descriptions). https://docs.ghost.org/themes/custom-settings
9. Ghost developer docs — URLs & Dynamic Routing (`content/settings/routes.yaml`; default collection and taxonomies; custom routes to templates; collections, filters, custom homepage, channels; taxonomy prefix renaming and removal; RRS per archive; `content/data/redirects.yaml` with legacy JSON deprecation; trailing-slash requirement; slug collision and collection-uniqueness limits). https://docs.ghost.org/themes/routing
10. Ghost developer docs — GScan (hosted site, automatic check on upload with fatal errors preventing use, CLI install and folder/zip usage). https://docs.ghost.org/themes/gscan/
11. Ghost — GScan hosted validation service (page title at retrieval: "The official tool to test your Ghost theme"). https://gscan.ghost.org/
12. Ghost developer docs — Search (`#/search`, `data-ghost-search`, `{{search}}`, Cmd/Ctrl+K; taxonomies must exist for tag/author results; title and excerpt of the most recent 10,000 posts; Algolia path for larger sites with official CLI and Netlify Functions). https://docs.ghost.org/themes/search
13. Ghost developer docs — Share (native share modal triggered by `#/share`, no custom JS, all official themes include it). https://docs.ghost.org/themes/share
14. Ghost developer docs — Members in themes (Portal links and `data-portal` states; signup forms with `data-members-form`/`data-members-email`/`data-members-name`/`data-members-newsletter`/`data-members-label`/`data-members-error`; sign-in with magic link and `data-members-otc`; `data-members-signout`; content visibility, `access`, `@member`, `@member.paid` and its Stripe statuses; `visibility` with `#foreach` and `#has`; checkout buttons per tier and interval; member profile attributes; Stripe subscription attributes; offers; `data-members-manage-billing` with return URL; `{{price}}`; `{{cancel_link}}`). https://docs.ghost.org/themes/members
15. Ghost developer docs — Content (editor and cards). https://docs.ghost.org/themes/content
16. Ghost developer docs — Memberships (member attributes; passwordless JWT email-link authentication; four access levels; "Content is securely protected at server level and there is no way to circumvent gated content without being a logged-in member"; member imports via CSV/Zapier/API; Stripe Connect with the publisher's own billing account; "Ghost takes 0% of your revenue"; portability and export; Stripe as the only natively supported provider with Patreon/PayPal/API alternatives). https://docs.ghost.org/members
17. Ghost developer docs — Email Newsletters (single newsletter by default with more configurable; scheduled delivery and segmentation; Ghost(Pro) email delivery included and configured; self-hosted bulk email requires Mailgun API keys; "Delivering bulk email newsletters can't be done with basic SMTP"; Mailgun free to 600 emails/month; auth emails are not bulk and use standard mail configuration). https://docs.ghost.org/newsletters
18. Ghost developer docs — Recommendations (Webmention-based; `/.well-known/recommendations.json`; `#/portal/recommendations`; POST webhook shape; incoming recommendation link tag; `recommendations` and `readable_url` helpers). https://docs.ghost.org/recommendations
19. Ghost developer docs — Content API (read-only; `https://{admin_domain}/ghost/api/content/`; `?key=`; "safe for use in browsers and other insecure environments, as they only ever provide access to public data"; fully cacheable with no limitation on fetch frequency; Custom Integration key creation and regeneration; resources posts, pages, tags, authors, settings, tiers). https://docs.ghost.org/content-api
20. Ghost developer docs — Admin API (everything Ghost Admin can do and more; `https://{admin_domain}/ghost/api/admin/`; `Accept-Version`; token authentication with `id:secret` keys generating short-lived single-use HS-256 JWTs in `Authorization: Ghost …`; "The API Key is secret, and therefore this authentication method is only suitable for secure server side environments"; "The admin API key must be kept private, therefore token authentication is not suitable for browsers or other insecure environments, unlike the Content API key"; endpoint families for posts, pages, tiers, newsletters, offers, members, labels, users and roles, images, theme upload, site and webhooks). https://docs.ghost.org/admin-api
21. Ghost developer docs — Admin API JavaScript client ("Admin API keys should remain secret, and therefore this promise-based JavaScript library is designed for server-side usage only"). https://docs.ghost.org/admin-api/javascript
22. Ghost developer docs — Content API JavaScript client (usable "in any JavaScript project, client or server side"). https://docs.ghost.org/content-api/javascript
23. Ghost developer docs — Publishing (posts as the primary entry type; pages as a subset excluded from all feeds and reachable only via manual links; custom templates per page/post; tags including primary and internal tags; tag archives with API data; automatic addition to the XML sitemap with pagination and RSS). https://docs.ghost.org/publishing
24. Ghost developer docs — Staff Users (five roles: Contributor, Author, Editor, Administrator, Owner; author archives generated from published-post staff users; separate admin-domain advice for privilege-escalation vectors). https://docs.ghost.org/staff
25. Ghost developer docs — Webhooks (per-integration POST JSON to a reachable URL; 2xx considered success; event table covering posts, pages, tags and members, including `site.changed`; "as complex as a total redeployment of a site"). https://docs.ghost.org/webhooks
26. Ghost developer docs — Ghost on the JAMstack / headless guide (list of front-end functionality that must be re-implemented including archives, sitemap, SEO fallbacks, Open Graph, Twitter Cards, custom routes, pagination and code injection; "Ghost's membership functionality is **not** compatible with headless setups" naming Stripe paid subscriptions, content gating, comments, analytics, offers, complimentary plans and trials; image URL origin behavior; Private Site Mode versus fragile blanket redirects; unsubscribe links point at the Ghost origin; preview URLs may behave unexpectedly; `?limit=all` removed in 6.0 with a max page size of 100 and a pagination example; advice to pace fetches). https://docs.ghost.org/jamstack
27. Ghost developer docs — Breaking Changes (Ghost 6.0: max 100 API results with `?limit=all` removed, Node 22 only, MySQL 8 only; guidance to review the list before updating custom themes, integrations, APIs, webhooks or headless setups; Ghost 5.0: Lexical replaces Mobiledoc, external Portal embed script tag with `data-ghost`/`data-api`/`data-key`, custom membership flow syntax changes with numeric tier prices; the warning that stripping the `visibility` property from Lexical cards can make members-only content public). https://docs.ghost.org/changes
28. Ghost developer docs — How to update Ghost (update procedure and compatibility expectations). https://docs.ghost.org/update
29. Ghost developer docs — License (Ghost is free software released under the MIT License). https://docs.ghost.org/license/
30. Ghost developer docs — Ghost Security (security practices, staff trust model, separate admin domain guidance). https://docs.ghost.org/security
31. Ghost developer docs — Migrating to Ghost (official per-platform migration guides including Substack, beehiiv, WordPress, Newspack, Medium, Squarespace, Kit, Mailchimp, Patreon, Buttondown, Memberful, Gumroad, Jekyll and Ghost-to-Ghost, plus the custom JSON developer format). https://docs.ghost.org/migration
32. Ghost developer docs — Migrating from Substack (post and subscriber migration, Stripe continuity, redirect handling, and the `/p/` collision with Ghost preview URLs). https://docs.ghost.org/migration/substack
33. Ghost developer docs — Configuration (`mail` requirement for self-hosted production; Mailgun example; `portal.url` default jsDelivr URL and the ability to relocate or disable with `"url": false`; `sodoSearch.url`/`styles`; `comments.url`/`styles`; Pintura licence note). https://docs.ghost.org/config
34. Ghost developer docs — documentation index for LLM tooling and page discovery (`llms.txt`). https://docs.ghost.org/llms.txt
35. Ghost developer docs — Architecture ("At its core Ghost is a self-consuming, RESTful JSON API with decoupled admin client and front-end … if you want to use Ghost completely headless and write your own frontend or backend … you can!"). https://docs.ghost.org/architecture
36. Ghost Help Center — Customize Portal (Portal handles the full membership experience and works with any theme without code; signup options including tiers and prices, name field, notice and required agreement; look-and-feel including button style and icon; account page and support email; Portal links usable anywhere via URLs). https://ghost.org/help/customize-portal/
37. Ghost Help Center — Embeddable signup forms (custom branded or minimal forms created in Settings → Growth → Signup forms, with member labels at signup and a copyable embed code for use anywhere on the web). https://ghost.org/help/embeddable-signup-forms/
38. Ghost Help Center — Custom sending domains (Ghost(Pro) defaults to the `ghost.io` sending domain; custom sending domains only on Publisher plan or higher; a custom domain must be configured first; DMARC policy record required; DNS records and activation flow; approximately six-week warm-up with a fraction of recipients still on `ghost.io` while transactional email uses the custom domain immediately). https://ghost.org/help/custom-sending-domains/
39. Ghost Help Center — Setting up email newsletters (enabling newsletter sending, creating newsletters, per-newsletter settings). https://ghost.org/help/setup-email-newsletters/
40. Ghost Help Center — Delivering emails to your audience (kinds of emails Ghost can send and email design settings). https://ghost.org/help/delivering-emails/
41. Ghost Help Center — How do members sign in to my site? (passwordless; magic link sent by Portal; one-time login code available through Portal sign-in or with the appropriate custom form attribute). https://ghost.org/help/members-sign-in/
42. Ghost Help Center — Connecting Stripe (Stripe as exclusive payments partner; create or select an account; connect from Settings → Memberships → Tiers; paste the generated secure key). https://ghost.org/help/stripe/
43. Ghost Help Center — Create paid tiers (tier creation and price configuration). https://ghost.org/help/tiers/
44. Ghost Help Center — How to create protected content (three business models — free, paid only, free + paid; post access levels public, members only, paid-members only, specific tiers). https://ghost.org/help/protected-content/
45. Ghost Help Center — Can I run a headless site with Ghost(Pro)? (headless is supported but requires rebuilding structured data, sitemaps, tag and author archives, AMP templates and custom routing; "Portal is not available to be used for subscription management with a headless setup"; View in Browser and unsubscribe links always lead to the `ghost.io` site; a headless setup requires a custom theme to avoid exposing content to search; no Ghost(Pro) Fastly CDN benefit). https://ghost.org/help/can-i-run-a-headless-site-with-ghost-pro/
46. Ghost Help Center — Installing a theme (official themes free and switchable from Admin; premium marketplace themes purchased outside Ghost with developer support; manual `.zip` upload; installed-theme history, download and switch; code injection for small CSS changes; download-edit-rezip locally; GitHub Actions deployment; only official themes on the Starter plan). https://ghost.org/help/installing-a-theme/
47. Ghost Help Center — Exporting content and data (content JSON covering settings, staff users, posts, pages and tags; member CSV with its field list and re-importability; theme zip download; post analytics CSV). https://ghost.org/help/exports/
48. Ghost Help Center — Importing content (importer for Substack, Medium, MailChimp and others; Universal import between Ghost installs; JSON and zip with images; splitting tools for large imports; Ghost(Pro) support versus forum routing). https://ghost.org/help/imports/
49. Ghost Help Center — Import members (importing an existing audience or supporter list into Ghost). https://ghost.org/help/import-members/
50. Ghost Help Center — How to add search in Ghost (search on all Ghost sites; official themes support it with Cmd/Ctrl+K; `#/search` navigation entry; `data-ghost-search` attribute for custom themes). https://ghost.org/help/search/
51. Ghost Help Center — Social web (Beta) (ActivityPub-based public profile `@index@yourdomain.com`; automatic distribution of new posts; reader and notes inside admin; profile and followers are separate from memberships and the rest of the site; **custom domain required and a subdirectory is not supported**; dedicated social-web handle domain via redirect/proxy; beta gaps and cross-platform compatibility notes). https://ghost.org/help/social-web/
52. Ghost Help Center — Comments (native member comments, enable for all members or paid members, official themes support them by default, commenting limited to logged-in members, reply notification emails toggled from the member's Portal profile). https://ghost.org/help/commenting/
53. Ghost Help Center — SEO in Ghost (automatic and fallback metadata, Open Graph and Twitter Cards, automatically created and updated XML sitemap, canonical tags, automatic structured data, performance guidance, per-post and site-level metadata). https://ghost.org/help/seo/
54. Ghost Help Center — Publishing and scheduling (live previews for desktop/mobile/email/social, preview as public visitor/free member/paid member, test emails, shareable preview URLs, `/edit` shortcut, publish or deliver as newsletter, scheduling with the site timezone). https://ghost.org/help/publishing-content/
55. Ghost Help Center — Member management (member dashboard for search, notes, import and export, segments; complementary plans; double opt-in means unconfirmed addresses are not listed). https://ghost.org/help/member-management/
56. Ghost Help Center — Can Ghost help me write code and customize my theme? ("While we aren't able to write code for you, there are other options available for customizing themes"). https://ghost.org/help/help-me-customize-my-theme/
57. Ghost Help Center — What permissions do staff users have? (published permission matrix across Administrator, Editor, Author and Contributor, plus owner transfer rules). https://ghost.org/help/managing-staff-user-profiles/
58. GitHub — `TryGhost/Ghost` repository metadata (description "Independent technology for modern publishing, memberships, subscriptions and newsletters"; MIT; 55,381 stars; 11,977 forks; 201 open issues; not archived; `pushed_at` 2026-09-22T15:38:08Z; topics include blogging, cms, ghost, journalism, nodejs, publishing). https://github.com/TryGhost/Ghost
59. GitHub — `TryGhost/Starter` (README: "A development starter theme for Ghost"; "Use this template"; Handlebars; symlink into `content/themes`; `pnpm install`/`dev`/`build`/`zip`/`test`; Rollup, PostCSS, ESM, asset minification, livereload; Ghost VS Code extension; Ghost GH Deploy Action included; theme file map; copyright 2013-2026 Ghost Foundation, MIT). https://github.com/TryGhost/Starter
60. GitHub raw — `TryGhost/Starter` `package.json` (`engines.ghost >=5.0.0`; MIT; `dev`/`build`/`zip`/`test`/`test:ci` scripts; `gscan` 6.6.1 devDependency; `config.card_assets`, `config.posts_per_page` 15, six `config.image_sizes`; `gpm` theme metadata; `pnpm@12.5.1`). https://raw.githubusercontent.com/TryGhost/Starter/main/package.json
61. GitHub — `TryGhost/Source` repository metadata ("The default theme for Ghost"; MIT; 129 stars; 258 forks; active on 2026-09-22). https://github.com/TryGhost/Source
62. GitHub — `TryGhost/Casper` repository metadata ("A classic theme for Ghost"; MIT; 2,578 stars; 2,723 forks; active on 2026-09-22). https://github.com/TryGhost/Casper
63. GitHub — `TryGhost/gscan` repository metadata ("Ghost theme scanner - checks for errors and feature support"; MIT; 84 stars; homepage `https://gscan.ghost.org`; active on 2026-09-22). https://github.com/TryGhost/gscan
64. GitHub raw — `TryGhost/gscan` `package.json` (monorepo root "for GScan: the gscan library/CLI and its web frontend"; MIT; Node `^22.17.0 || ^24.0.0`; `pnpm --filter @tryghost/gscan-web` start/dev). https://raw.githubusercontent.com/TryGhost/gscan/main/package.json
65. GitHub — `TryGhost/Ghost-CLI` repository metadata ("CLI Tool for installing & updating Ghost"; MIT; 497 stars; active on 2026-09-22). https://github.com/TryGhost/Ghost-CLI
66. GitHub — `TryGhost/algolia` repository metadata ("JavaScript CLI and Netlify Functions for indexing Ghost posts in Algolia"; MIT; 22 stars; active on 2026-09-22). https://github.com/TryGhost/algolia
67. GitHub — `TryGhost/Portal` repository metadata ("Drop-in script to add membership features in a Ghost theme"; MIT; **archived**; last push 2022-10-05). https://github.com/TryGhost/Portal
68. GitHub — `TryGhost/sodo-search` repository metadata ("Drop-in script for search in Ghost"; MIT; **archived**; last push 2023-03-17). https://github.com/TryGhost/sodo-search
69. GitHub raw — Ghost monorepo `apps/portal/README.md` ("Ghost automatically injects the Portal script on all sites running Ghost 4 or higher. Alternatively, Portal can be enabled on pages outside Ghost"; `data-ghost` "is the only input Portal needs to work with your site's membership data via Ghost APIs"; `data-portal` triggers including `share`; metadata auto-resolution from `{{ghost_head}}` DOM tags with current-URL/document-title fallback; `gh-portal-open`/`gh-portal-close` classes; dev asset path `http://localhost:2368/ghost/assets/portal/portal.min.js`). https://raw.githubusercontent.com/TryGhost/Ghost/main/apps/portal/README.md
70. GitHub API — Ghost monorepo `apps/` directory listing at `main` (`activitypub`, `admin-toolbar`, `admin-x-framework`, `admin`, `announcement-bar`, `comments-ui`, `ember-admin`, `portal`, `shade`, `signup-form`, `sodo-search`). https://api.github.com/repos/TryGhost/Ghost/contents/apps
71. GitHub — `TryGhost/action-deploy-theme` repository metadata ("GitHub Action that packages and deploys Ghost themes through the Ghost Admin API"; MIT; 391 stars; active on 2026-09-22). https://github.com/TryGhost/action-deploy-theme
72. GitHub API — `TryGhost/Ghost` latest release (tag `v6.65.0`, published 2026-09-22T15:28:40Z, not a prerelease). https://api.github.com/repos/TryGhost/Ghost/releases/latest
73. GitHub API — `TryGhost/Ghost` `main` head commit (`sha` `358367b0521d7ef1458bd6b3075cb1760136db69`, committed 2026-09-22T15:04:18Z). https://api.github.com/repos/TryGhost/Ghost/commits/main
74. npm registry — `gscan` (latest 6.6.1 published 2026-09-11; MIT; "Scans Ghost themes looking for errors, deprecations, features and compatibility"; repository `TryGhost/gscan` `packages/gscan`). https://registry.npmjs.org/gscan
75. npm registry — `@tryghost/portal` (latest 2.71.189 published 2026-09-22T15:18:25Z; MIT; "Drop-in membership interface for Ghost sites"; repository `https://github.com/TryGhost/Ghost`). https://registry.npmjs.org/@tryghost%2Fportal
76. npm registry — `@tryghost/sodo-search` (latest 1.8.553 published 2026-09-22T15:20:32Z; MIT; "Search interface for Ghost sites"; repository `https://github.com/TryGhost/Ghost`). https://registry.npmjs.org/@tryghost%2Fsodo-search
77. npm registry — `@tryghost/content-api` (latest 1.12.12 published 2026-09-21; MIT; JavaScript client for the Content API; repository `TryGhost/SDK` `packages/content-api`). https://registry.npmjs.org/@tryghost%2Fcontent-api
78. npm registry — `@tryghost/admin-api` (latest 1.14.13 published 2026-09-21; MIT; JavaScript client for the Admin API; repository `TryGhost/SDK` `packages/admin-api`). https://registry.npmjs.org/@tryghost%2Fadmin-api
79. npm registry — `@tryghost/activitypub` (latest 3.1.52 published 2026-06-24; MIT; deprecated: "No longer published separately — ActivityPub is now bundled into Ghost Admin."; repository `TryGhost/Ghost` `apps/activitypub`). https://registry.npmjs.org/@tryghost%2Factivitypub
80. Ghost — theme marketplace listing, official filter ("Official themes are built and maintained by the Ghost team. All are free to use and 100% open source"; 242 unique theme slugs and client-side category/free/paid filters as captured). https://ghost.org/themes/?category=official
81. Ghost — Ghost(Pro) plans and pricing (plan ladder and the plan gates referenced for custom themes and sending domains; point-in-time, retrieval date 2026-09-22; detailed plan facts and cost modelling are owned by `research/phase-3/hosting-operations.md`). https://ghost.org/pricing/
82. npm registry — `@tryghost/comments-ui` (latest 1.6.286 published 2026-09-22T15:17:17Z; MIT; "Comments interface for Ghost posts"; repository `https://github.com/TryGhost/Ghost`). https://registry.npmjs.org/@tryghost%2Fcomments-ui
83. Ghost developer docs — Ghost CLI (releases "typically released every 1-2 weeks"; "Every 12-18 months we release a major version which breaks backwards compatibility and requires a more involved upgrade process, including backups and theme compatibility"; install/update commands and directory structure). https://docs.ghost.org/ghost-cli
