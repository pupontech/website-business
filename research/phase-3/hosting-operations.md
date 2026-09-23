# P3.1 — Ghost hosting and operations: Ghost(Pro) versus self-hosted

- **Task:** Kanban `t_968646c2` (Phase 3 research, board `website-business`).
- **Status:** Research artifact for synthesis into `docs/03-ghost.md` (P3.5). Not an approved decision; nothing here authorizes a purchase, account, deployment, or infrastructure change.
- **Author:** worker profile `dsflash3`, single-writer task.
- **Retrieval date for all external evidence:** 2026-09-22 (UTC) unless a different date is stated inline.
- **File scope:** this is the only file written by this task. `AGENTS.md`, `PROJECT_STATUS.md`, `DECISIONS.md`, `docs/`, `research/phase-1/*`, Kanban state, and Git history were not modified. No destructive Git command was run.
- **Constraint baseline read before research:** `AGENTS.md` (managed hosting preference, client ownership and portability, no proprietary/multi-tenant hosting platform, no production infrastructure before the applicable checkpoint), `PROJECT_STATUS.md` (P3.1 scoped to research; Checkpoint 3 gates paid services/hosting), `DECISIONS.md` (D-001 no internal platform, D-002 phase gates, D-003 isolated client boundaries), `docs/01-business.md` §§4, 7, 8 (three-package shape, ownership posture, deferred offers), `research/phase-1/business-model.md` §§4.1, 7, 12 (self-hosting treated as a scope of work, not a line item).

Evidence labels: **FACT** (read in the cited source during this task), **ESTIMATE** (arithmetic or judgement by this author, no external source), **RECOMMENDATION** (proposed action, not approved), **UNKNOWN** (not established).

---

## 1. Method, what was verified, and what was not executed

Work performed on 2026-09-22:

1. Opened the official Ghost(Pro) pricing page in a live browser session, toggled **Monthly billing** and **Yearly billing**, and moved the audience slider through its ten positions to observe price behaviour directly (not only from a cached text extraction) [1].
2. Read the official Ghost developer documentation covering hosting comparison [2], Ubuntu install [3], Docker install [4], Ghost-CLI [5], updates [6], major-version updates [7], reinstall [39], configuration/mail [12], security [10], Node version support [11], database support [14], breaking changes [15], backup [8], and the FAQ index [9].
3. Read the official Ghost Help Center articles covering subscription management [16], backups [17], exports [18], ownership transfer [19], SSH/FTP availability [20], third-party CDNs [21], custom sending domains [22], member/staff counting [23], multiple sites [24], security and data practices [25], GDPR [28], discounts [37], imports [38], and the Ghost(Pro) upgrade path [29], plus the Foundation Terms of Service [26], the Data Processing Agreement [27], the migration index [31], the Ghost→Ghost migration guide [32], and the migrations ("move to Ghost") service page [30].
4. Opened the official open-source release page for evidence of release cadence and current version [33], and the official status page [34].
5. Opened one third-party component vendor page (Mailgun) because self-hosted Ghost newsletters require a bulk-mail provider [35].
6. Recomputed the cost lines published in Ghost's own hosting comparison rather than restating an earlier arithmetic result (section 6.2).

**Verification boundary — what is documentation and what is executed proof:**

- Everything in this document is **documentation-backed or page-render-backed**. No Ghost instance was installed, no account was created, no payment was made, no backup was taken, no restore was executed, no theme was validated, and no monitoring or alerting was configured. Statements about recovery are statements about documented procedure, not about observed recovery.
- The pricing figures were obtained from the live rendered page by interaction; the same page also produced a different figure through an automated text extractor on the same day. Both observations are recorded in section 8 rather than reconciled silently.
- Where official documentation is silent (recovery point/recovery time objectives, monitoring/alerting, incident-response procedure for self-hosters, practical email-send ceilings), the gap is labelled **UNKNOWN** rather than filled with reasoning.

---

## 2. Platform and version baseline (affects both hosting options)

- **FACT:** The officially supported self-hosting stack is Ubuntu 22.04, 24.04 or 26.04 (LTS); Node.js 22 LTS; MySQL 8.0 or 8.4; NGINX; systemd; a server with at least 1 GB memory; and a non-root user for `ghost` commands [2][3].
- **FACT:** MySQL 8 is the only supported production database; SQLite3 is development-only; MariaDB is not officially supported [14]. Sites running SQLite3 in production are told to perform a full reinstall [12][14].
- **FACT:** Node.js support is narrow: **22.x (Jod LTS) is "Required"**; 20.x, 21.x and 23.x-and-above are listed as **Unsupported**; Ghost 6.0 removed Node 18 and Node 20 support [11][15].
- **FACT:** Ghost ships updates weekly: "Our team release updates to the open source software every week" [6]; the Ghost-CLI reference adds that releases are "typically released every 1-2 weeks" [5].
- **FACT:** Major versions arrive roughly every 12–18 months, break backwards compatibility, and require a more involved upgrade path (backups, theme compatibility) [5][7]. The published lifecycle table lists Ghost 5.x as released 2022 with **End of Life January 2026**, and Ghost 6.x as current, released 2025, end of life "TBC" [13].
- **FACT:** Ghost does **not** support load-balanced clustering, sharding, or any multi-server setup — "there should only be *one* Ghost instance per site" [9]. The hosting page states the correct way to scale is "adding a CDN and caching layer in front of your Ghost instance", and that Ghost easily scales to billions of requests per month with a solid cache [2].
- **FACT:** Ghost 6.0 added services that are split out of the core process (Social Web/ActivityPub and web analytics). Ghost-CLI installs support the Social Web features via Ghost's hosted ActivityPub service and are **not compatible with web analytics**; fully self-hosting either requires the Docker Compose method, which Ghost labels a **preview** [2][3][4].
- **FACT:** Self-hosters may use the hosted ActivityPub service for free, capped at 2,000 followers, 2,000 following, and a maximum of 100 interactions per day (create/reply/like/repost) [2][4].
- **FACT:** Releases page observation: the most recent release listed at retrieval was **v6.38.0**, dated **13 May** (the captured page text did not display a year); v6.37.1 (08 May), v6.36.0 (01 May), v6.35.0 (28 Apr), v6.34.0 (28 Apr), v6.33.0 (24 Apr), v6.32.0 (20 Apr), v6.30.0 (14 Apr), v6.28.0 (10 Apr) follow [33]. **ESTIMATE:** those dates are 2026. **Observation, not a conclusion:** the newest listed release predates the retrieval date by roughly four months, which sits oddly beside the documented weekly release cadence [6]. This document does not assert that releases stopped; it records that the two official pages are not obviously consistent and that the release page as captured carries no year.

---

## 3. Ghost(Pro): exact plan facts and limits

**FACT — plan cards, yearly billing, audience band "up to 1,000 members" (live render, toggled):** Starter **$15 USD/mo**, Publisher **$29 USD/mo**, Business **$199 USD/mo**, Custom "Custom" [1].

**FACT — identical position, monthly billing:** Starter **$18 USD/mo**, Publisher **$35 USD/mo**, Business **$239 USD/mo** [1].

**FACT — the price is audience-dependent.** The page states "Based on an audience up to **[N] members**" and exposes a slider with ten positions, labelled 1,000 / 2,500 / 5,000 / 7,500 / 10k / 25k / 50k / 75k / 100k / 100k+ [1]. Observed filled values on yearly billing:

| Audience band selected | Starter | Publisher | Business |
|---|---|---|---|
| 1,000 | $15 | $29 | $199 |
| 2,500 | $15 | $46 | $199 |
| 10,000 | $15 | $88 | $199 |
| 25,000 | $15 | $141 | $266 |
| 100,000 | $15 | $274 | $399 |

**FACT — monthly billing, filled values:** at 1,000 audience, $18 / $35 / $239; at 100,000 audience, **$18 / $329 / $479** [1]. **FACT:** at the final slider position (100k+), the Publisher and Business cards replace the price with "Over 100,000 members? Reach out to our team" [1].

**ESTIMATE:** Starter did not change across the entire observed ladder; Publisher and Business did. The page does not state the pricing rule or the member entitlement attached to each band, so the rule behind these numbers is **UNKNOWN** — only the observed values above are facts.

Feature and limit facts from the same page's comparison tables [1]:

| Dimension | Starter | Publisher | Business | Custom |
|---|---|---|---|---|
| Staff users | 1 | 3 | 15 | Unlimited |
| File uploads | 5 mb | 100 mb | 250 mb | 1 GB |
| Marketplace themes | **No** | Yes | Yes | Yes |
| Custom themes | **No** | Yes | Yes | Yes |
| Registered members (table value) | 1,000 | 1,000 | 10,000 | Unlimited |
| Paid subscriptions / tips / premium tiers / special offers | **No** | Yes, 3 tiers, 15 offers | Yes, 10 tiers, 50 offers | Yes, unlimited |
| Transaction fees | — | 0% | 0% | 0% |
| Newsletters | 1 | 3 | 10 | Unlimited |
| Email sends | Unlimited | Unlimited | Unlimited | Unlimited |
| Managed deliverability | Yes | Yes | Yes | Yes |
| Custom sending domain | **No** | Yes | Yes | Yes |
| Dedicated IP | No | No | No | Yes |
| Deliverability consultation | No | No | No | Yes |
| Advanced native analytics / third-party services | No / Basic | Yes | Yes | Yes |
| Content API | Yes | Yes | Yes | Yes |
| Admin API, Webhooks, Zapier, n8n, custom integrations | **No** | Yes | Yes | Yes |
| Automatic weekly updates, worldwide CDN, automated backups, free SSL, threat & uptime management | Yes | Yes | Yes | Yes |
| Custom SSL certificate / custom subdirectory install | No / No | No / No | **+ $50/mo each** | Yes |
| SSO | No | No | No | Yes |
| Support | Email | Email | Priority | Account manager |
| Uptime SLA row | **No** | **No** | **No** | **99.9%** |

Additional exact Ghost(Pro) facts:

- **FACT:** Ghost(Pro) subscriptions include hosting for **one** publication; multiple sites each require a separate account with its own subscription and its own unique email address or alias [24]. One custom domain per site; `.eth` domains and punycode/special characters are not supported [36].
- **FACT:** All new accounts start on a **14-day free trial**; after the trial a plan must be selected to continue [16]. There is no permanent free hosted tier.
- **FACT:** Member counting: a member is any visitor who signed up (free or paid); each account/email counts as one member. Staff counting: invited users count, pending invites count, but users with the **Contributor** role and **Suspended** users do not [23].
- **FACT:** Exceeding a plan's member limit **disables publishing**: a banner appears and publishing/sending is blocked until the plan is upgraded [16].
- **FACT:** Only the **owner** user can access billing, change plans, activate a custom domain, or cancel [16][36]. Ownership can be moved: the current owner promotes an existing **administrator**-role staff user to owner from Settings → Staff [19].
- **FACT:** Ghost(Pro) provides **no SSH or FTP access**; third-party code is delivered through theme files or code injection [20].
- **FACT:** Third-party CDNs on top of Ghost(Pro) are **not supported**; Ghost(Pro) uses Fastly, and support will ask for edge-stacked services to be removed before investigating issues [21]. A separate FAQ entry records known Cloudflare-related problems with self-hosted Ghost admin after updates [9].
- **FACT:** All Ghost(Pro) sites send bulk newsletters from `ghost.io` as the verified sending domain by default; a custom sending domain is available on **Publisher and above**, requires the custom domain to be set up first, requires a **DMARC** record on the domain, and is warmed up over **approximately 6 weeks** during which some recipients still receive mail from `ghost.io` (transactional mail uses the custom domain immediately) [22].
- **FACT:** Ghost(Pro) servers are located in **Amsterdam, The Netherlands**, and Ghost states all data is stored in the EU (with some support/maintenance processing outside the EU under EU-compliant protections) [25][28].
- **FACT:** Ghost publishes a Data Processing Agreement that customers accept automatically by accepting the Terms of Service, in which Ghost is the **processor** and the customer is the **controller**; the sub-processor list (Annex A) and security measures (Annex B) are "Available upon request" [27][28].
- **FACT:** Help Center claim: "We offer a 20% discount on all Ghost(Pro) plans if you subscribe annually", and as a non-profit Ghost cannot discount further [37].

---

## 4. Self-hosting: what the operator actually has to do

**FACT — install:** the supported path is Ghost-CLI on Ubuntu: create a non-root sudo user ("using the user name `ghost` causes conflicts"), install NGINX, install MySQL and give the MySQL `root` user a password (Ghost does not support socket authentication), install Node 22 system-wide from NodeSource, install `ghost-cli` globally, create and own the install directory, then run `ghost install` and answer the prompts (blog URL, MySQL host/user/password, database name, create a Ghost MySQL user, set up NGINX, set up SSL, set up systemd, start Ghost) [3].
- **FACT:** A DNS **A-record must already point at the server** before install, because SSL is configured during setup [3].
- **FACT:** The CLI installs to a fixed directory structure (`.config.[env].json`, `/content`, `/current`, `/system`, `/versions`) which "should not be changed" [5].

**FACT — hardening duties documented for self-hosters:** serve over HTTPS (admin *must* be HTTPS), consider a **separate admin domain** to reduce privilege-escalation vectors, run `mysql_secure_installation`, configure firewall rules (UFW for ssh, nginx, http, https — and use no other firewall if UFW is used), and disable SSH root login and password login in favour of keys [2][10].

**FACT — update duties:** `ghost update` upgrades within the current major version; `ghost check-update` reports availability; `ghost update --rollback` reverts to the previous stable version; `ghost update --force` retries; automatic rollback can be disabled; `ghost update` runs environment checks first and the most common failure cause is **running out of memory** [5][6][7]. Node upgrades are separate and must not be combined with a Ghost upgrade; after a Node change, dependencies must be reinstalled (`ghost update [version] --force`) or Ghost fails to start [11]. Major-version upgrades additionally require: update Node first, update Ghost-CLI (v1.28.2 or higher recommended for Ghost 6.0), update to the latest minor version (and be within 2 majors), take a full backup, verify MySQL 8, review breaking changes against themes/API/headless integrations, and (for the hosted ActivityPub service) add two NGINX `location` blocks and reload NGINX [7][10][15].

**FACT — backup duties:** the CLI provides `ghost backup`, described as a **manual** command to be run "when performing manual updates" — no scheduling, retention, verification, or off-server replication is documented [5][7][8]. The backup zip contains content as JSON, a member CSV export, installed themes, images/files/media, and copies of `routes.yaml` and `redirects.yaml`/`redirects.json` [5][8]. **Critically, the documentation states that JSON exports "don't include email analytics, member engagement data, or comments", and that "for disaster recovery or exact site replication, back up your database and content folder directly"** [8]. Manual backup therefore means a `mysqldump` (or Docker equivalent) of the MySQL database plus a `tar` of the `content/` folder (or a Docker volume), and download to another machine via `rsync`/`scp` [8].

**FACT — restore duties (documented procedure, not executed here):** stop Ghost; import the SQL dump; extract the content archive; `sudo chown -R ghost:ghost content`; start Ghost; then re-import content, routes/redirects, theme, reconnect Stripe **in live mode before importing members**, and import the members CSV [8][12]. For the Docker method: stop the Ghost container, restore the database inside the MySQL container, restore the content volume with a temporary container, start Ghost [8].

**FACT — mail duties:** production configuration requires a `mail` block; Ghost uses Nodemailer and recommends a bulk-mail provider for newsletters [12]. **Bulk newsletters cannot be sent over plain SMTP — a bulk-mail provider is required** [9], and Ghost documents Mailgun configuration specifically [12].

**FACT — other duties implied by the documentation:** keeping the OS, Node, MySQL, NGINX and Ghost current is described as critical ("If you don't keep everything up to date, you place your site and your server at risk of numerous potential exploits and hacks") [2]; TLS is issued/renewed via Let's Encrypt with `acme.sh` on a 60-day renewal cycle [5]; a separate CDN/cache must be added for scale [2]; image editing is a separate service line in Ghost's own comparison [2]; web analytics requires the Docker preview path plus a third-party (Tinybird) workspace [2][4]; search and comments scripts load from jsDelivr by default and can be relocated or disabled [12].

**UNKNOWN:** official documentation does not specify a self-hosted **monitoring/alerting** approach, a **recovery point objective**, a **recovery time objective**, a **restore-test cadence**, or a **self-hoster incident-response procedure**. Ghost product support for self-hosters is the **community forum** rather than product support [2].

**FACT — vendor's own recommendation:** Ghost states "For heavy users of Ghost, self-hosting generally works out to be more expensive vs Ghost(Pro)", while for lightweight blogs it can be cheaper; and "In most cases Ghost(Pro) ends up being lower cost than self-hosting once you add up the cost of the different service providers" [2].

---

## 5. Managed-versus-self-hosted responsibility matrix

Rows are duties; the "Ghost(Pro)" column records what the vendor documents as included; the "Self-hosted" column records what the operator must own. This matrix is the operational core of this document.

| # | Duty | Ghost(Pro) managed | Self-hosted (operator) |
|---|---|---|---|
| 1 | Server provisioning and OS patching | Not customer-visible; "fully managed service" [1][2] | Operator: Ubuntu LTS install, package updates, firewall, non-root user [2][3] |
| 2 | Application install and initial configuration | Instant provisioning ("setting up a new Ghost site takes around 20 seconds"), guided setup [2] | Operator: Ghost-CLI install, DNS pre-req, MySQL user, NGINX, SSL, systemd, mail [3] |
| 3 | Ghost/minor-version updates | Included, applied automatically weekly [1][2][29] | Operator: `ghost update` on a chosen cadence; memory headroom required; rollback available [5][6][7] |
| 4 | Major-version upgrades | Vendor runs minor updates; **major** upgrades are initiated by the site owner through an admin banner, with a compatibility check, a vendor-created full backup, and up to ~15 minutes offline [29] | Operator: multi-step Node/CLI/minor/backup/breaking-change/review path; can be a full reinstall on old versions or SQLite3 production sites [7][12][15][39] |
| 5 | Node.js runtime upgrades | Not customer-visible | Operator: 22.x required; 20.x and 23+ unsupported; Node and Ghost must be upgraded separately [11][15] |
| 6 | Database | Managed (MySQL) | Operator: MySQL 8.0/8.4 only, secure installation, MySQL-level upgrades, collation migrations from MySQL 5 [2][3][14] |
| 7 | TLS certificates | Free SSL included; custom SSL +$50/mo on Business, included on Custom [1] | Operator: Let's Encrypt via `acme.sh`, 60-day renewals; renewal failures are the operator's [5] |
| 8 | CDN and WAF | Included (Fastly); third-party CDNs unsupported [1][21] | Operator: sourced separately ("from $20/mo" is Ghost's own figure) plus cache configuration; Cloudflare has documented caveats [2][9] |
| 9 | Backups | Marketing/plan claim: "Automated backups" included [1]; Help Center: "you don't need to worry about data backups" [17]. **But** the Terms say "You are solely responsible for securing and backing up Your Content" [26], and full-site archives are explicitly "not provided for service continuity and are not provided as backups" [17] | Operator: `ghost backup` (manual only) **plus** a MySQL dump and content archive; off-server copies; nothing in the docs schedules, verifies, or retains them [5][8] |
| 10 | Restore | No self-service restore is documented. A full archive can be requested for closing, migrating, or staging, and **cannot be provided after cancellation** [17] | Operator: documented stop/import/extract/chown/start/reimport sequence, executed manually [8][12] |
| 11 | Email newsletter delivery | Included ("managed deliverability", unlimited sends) [1] | Operator: contract a bulk-mail provider (Mailgun documented); plain SMTP cannot send newsletters; deliverability, SPF/DKIM/DMARC are the operator's [2][9][12][35] |
| 12 | Custom sending domain | Publisher and above; DMARC required; ~6-week warm-up with mixed `ghost.io` sending [22] | Operator: configure provider + DNS records and own reputation directly |
| 13 | Analytics | Native and advanced analytics by plan [1] | Operator: Ghost-CLI installs are **not compatible with web analytics**; the Docker preview plus a third-party workspace is required [2][3][4] |
| 14 | Image editing service | Included by plan (file-upload size limits per plan) [1][2] | Operator: sourced separately (Ghost's own figure: "from $12/mo") or handled manually [2] |
| 15 | Threat/uptime management, DDoS, WAF, brute force, rate limiting | Included; Terms require third-party providers to supply 24/7 DDoS mitigation, WAF, brute-force protection and automatic rate limiting, with Ghost's liability for those providers capped at US$100 [1][26] | Operator: firewall rules, brute-force/login protections come from Ghost itself, but DDoS/WAF/rate limiting at the edge are the operator's to source [2][10] |
| 16 | Platform features that live outside the core process (Social Web/ActivityPub, web analytics) | Included in the managed platform [1][2] | Operator: hosted ActivityPub is free within caps (2,000 followers/following, 100 interactions/day); self-hosting it or analytics needs the Docker preview path [2][4] |
| 17 | Monitoring and alerting | Vendor-side ("threat & uptime management"); public status page [1][34] | **UNKNOWN** — not documented; only logs, `ghost doctor`, and forum support are documented [5][9] |
| 18 | Incident response | Documented service levels and response/resolution targets under the Terms (section 7 below) [26] | Operator: own on-call. Ghost's hosting page states 24/7 on-call and enterprise-grade security are **not available** to self-hosters [2] |
| 19 | Availability commitment we could pass downstream | 99.9% uptime SLA listed on **Custom only**; "No" SLA on Starter/Publisher/Business [1]; Terms give all paid plans a 98% minimum monthly uptime excluding scheduled maintenance, with credits [26] | None from any provider — the operator *is* the availability |
| 20 | Server-level access, core modification, edge routing | Not available (no SSH/FTP) [2][20]; third-party CDNs unsupported [21] | Available (direct SSH and DB access, modify core, custom edge routing policies) [2] |
| 21 | Support channel | Email (Starter/Publisher), priority (Business), account manager + invoice billing (Custom) [1] | Community forum only [2] |
| 22 | Client data-protection posture | Ghost acts as processor under a published DPA accepted via the ToS; sub-processors and security measures available on request; EU data storage [27][28] | Operator becomes the processor/host with its own DPA, sub-processor list, and breach obligations — a legal role, not a technical one |
| 23 | Credential and access management | Owner-only billing/domain/cancel; per-site accounts; device verification and email 2FA, 5 login attempts per hour per IP, bcrypt hashing, single-use expiring tokens [10][16][19] | Operator manages OS/db/mail credentials, SSH keys, and revocation themselves |
| 24 | Offboarding / portability | Content JSON, members CSV, theme zip, post-analytics CSV exportable at any time; full archive on request before cancellation; site and account **deleted at end of billing cycle** on cancellation [16][17][18] | Operator must produce exports/DB copies and keep them; nothing is deleted for them |

---

## 6. Point-in-time cost stack

**FACT:** all figures in this section are advertised, volatile, and retrieved 2026-09-22.

### 6.1 Ghost's own published comparison (managed versus the component lines)

**FACT (Ghost's own comparison table) [2]:**

| Line | Ghost(Pro) | Self-hosting |
|---|---|---|
| Base hosting | From **$15/mo** | From **$10/mo** |
| Global CDN & WAF | Included | From **$20/mo** |
| Email newsletter delivery | Included | From **$15/mo** |
| Analytics platform | Included | From **$10/mo** |
| Full site backups | Included | From **$5/mo** |
| Image editor | Included | From **$12/mo** |
| Payment processing fees | 0% | 0% |
| Install & setup / weekly updates / server maintenance / SSL | Included | Manual |
| 24/7 on-call team | Included | Not available |
| Enterprise-grade security | Included | Not available |
| Product support | Email | Forum |
| Direct SSH & DB access, core modification, custom edge routing | Not available | Available |

### 6.2 The self-hosted floor is the sum of components, not the VPS price

- **FACT:** Ghost's own self-hosted component lines total **$10 + $20 + $15 + $10 + $5 + $12 = $72/mo** before any labour, before a staging environment, and before the monitoring, restore-testing, incident-response and offboarding duties that no vendor line covers [2].
- **ESTIMATE (recomputation, flagged):** the delegated component lines excluding base hosting total **$62/mo**. `research/phase-1/business-model.md` §7.2 states "roughly $57+/mo of *delegated* services". That figure does not reproduce from the cited table (the delegated lines are 20 + 15 + 10 + 5 + 12 = 62). This document uses **$62 delegated / $72 total component floor**; the Phase 1 figure appears to be an arithmetic slip and is recorded here rather than copied forward. No file outside this one was edited.
- **FACT (independent corroboration of one line):** Mailgun's published pricing lists Basic at **$15/mo** including 10,000 emails/month with overage "from $1.80 per 1,000 emails", and Foundation at $35/mo for 50,000 emails [35]. This matches Ghost's "from $15/mo" email line, and shows that email cost rises with send volume — a line that stays bundled inside Ghost(Pro) at every observed price point [1][35].
- **ESTIMATE:** a small VPS at the "$10/mo" end of Ghost's own range is therefore roughly **14% of the published component floor** and none of the operational obligations in section 5. Presenting a VPS price as "the cost of hosting Ghost" would understate the stack by roughly an order of magnitude and would omit labour entirely. This is the arithmetic basis for treating self-hosting as a scope of work rather than a line item.
- **ESTIMATE (labour, explicitly not measured here):** no measured hours exist for this work. `docs/01-business.md` §8 item 8 already records capacity as **UNKNOWN** pending the P9 pilots. Any self-hosted quote must be built from measured pilot time (P9.5) plus a named on-call and restore-test obligation; that is P4.1's job, not this document's.

### 6.3 Ghost(Pro) as an audience-scaled cost

- **FACT:** at the smallest audience band (up to 1,000 members) the yearly-billed prices are **$15 / $29 / $199** and the monthly-billed prices are **$18 / $35 / $239** [1].
- **FACT:** the same plans rise with audience: Publisher $29 → $46 (2,500) → $88 (10,000) → $141 (25,000) → $274 (100,000) yearly; Business $199 → $266 (25,000) → $399 (100,000) yearly; monthly at 100,000 the same plans are **$329 and $479** [1].
- **FACT:** above 100,000 members the Publisher and Business cards no longer publish a price: "Over 100,000 members? Reach out to our team" [1].
- **ESTIMATE:** for a Segment A publisher with a real list, the plan fee is a **client-funded, audience-linked recurring cost that rises without our involvement**, and the tier floor for the work we actually do is Publisher (custom themes, paid subscriptions, custom sending domain, Admin API) rather than Starter [1].
- **Client-side cost visibility requirement:** `docs/01-business.md` §8 item 7 requires pass-through platform costs to be kept separate from our fees; the audience-scaled behaviour above means any quoted recurring figure must be re-retrieved at the time of use and stated as "plan cost at your current list size", not as a fixed fee.

---

## 7. Availability, service levels, and what may not be promised

- **FACT (Terms, clause 17.3):** for any active paid Ghost(Pro) subscription, "the Ghost Foundation hosted services and platform ... shall have a minimum of **98% uptime**, excluding any scheduled maintenance, calculated on a monthly basis"; scheduled maintenance requires one week's written notice; unscheduled maintenance is notified "as soon as practicable" [26].
- **FACT (Terms, clause 17.3):** major incidents — defined as complete loss of service to the production environment with no workaround — carry a response time of **1 hour** and a resolution time of **6 hours** from notification; minor incidents carry **12 hours** response and **2 weeks** resolution [26].
- **FACT (Terms, clause 17.3):** failure to meet the minimum uptime or the response/resolution times entitles the customer to a **service-level credit equal to one month of subscription**, applied automatically to the next bill [26].
- **FACT (pricing page):** the 99.9% uptime SLA appears **only** on the Custom plan; the SLA row reads "No" for Starter, Publisher and Business [1].
- **FACT (Terms, clause 12):** "The Services are provided 'as is'... Neither Ghost Foundation nor its suppliers and licensors, makes any warranty that the Services will be accurate, error free, or that access thereto will be continuous or uninterrupted." **Clause 13** limits liability to the fees paid in the twelve months before a claim, and excludes liability for interruption of use or loss or corruption of data [26].
- **FACT (Terms, clause 17.4):** enterprise-grade security is delivered through third-party integrations, and Ghost's liability for failures of those third-party providers is limited to **US$100** [26].

**RECOMMENDATION (binding on our own promises):** do not publish an availability or uptime promise for any Ghost deliverable. Ghost(Pro) gives a 98% platform-level guarantee with a credit remedy under its own Terms for paid plans, and a 99.9% "SLA" label on Custom only [1][26]; neither is something we can enforce or pass through on the plan tiers a small client will buy. Any care-style obligation we ever accept must be written as a **response window and scope**, never as an availability guarantee — consistent with `docs/01-business.md` §7 and `research/phase-1/business-model.md` §4.1.

**UNKNOWN:** Ghost does not publish a recovery point objective, recovery time objective, backup retention period, or restore guarantee for Ghost(Pro) in any page read here, and no restore was performed to measure one.

---

## 8. First-party conflicts and observations (recorded, not smoothed over)

| # | Conflict | Evidence, exact | Status |
|---|---|---|---|
| C1 | **Starter price $15 vs $18** | Live render of `ghost.org/pricing`: **$15/mo "Billed yearly"** and **$18/mo "Billed monthly"** at the 1,000-member band [1]. The automated text extraction of the same page on the same day reported "$18 USD / mo — Billed yearly". Ghost's hosting comparison independently says Ghost(Pro) base hosting is "From **$15**/mo" [2]. | **RESOLVED by live interaction:** $18 is the **monthly-billed** figure, $15 the **yearly-billed** figure. `docs/01-business.md` §3/§4 and `research/phase-1/business-model.md` §12 L7 record the discrepancy as $18-yearly vs $15 — the $15-vs-$18 question has a billing-frequency explanation. Reported here; upstream documents were **not** edited (out of scope). |
| C2 | **SLA: "No" vs 98% vs 99.9%** | Pricing page: SLA row "No" for Starter/Publisher/Business, **99.9% for Custom** [1]. Terms 17.3: **98% minimum monthly uptime** for *any active paid Ghost(Pro) subscription*, with response/resolution targets and one-month credits [26]. | **UNRESOLVED first-party conflict.** Both are first-party; do not present either as "the" SLA. Any client-facing statement must quote the source and the tier. |
| C3 | **Backups: managed vs customer's responsibility** | Plan/feature tables list "Automated backups" as included on every plan [1]; Help Center: "As Ghost(Pro) is a managed service, you don't need to worry about data backups" [17]. Terms 2.1: "**You are solely responsible for securing and backing up Your Content**" [26]. Help Center also: full-site archives are "**not** provided for service continuity and are **not** provided as backups" [17]. | **RESOLVED in the safe direction:** treat backups as the client's responsibility unless a written arrangement states otherwise. The vendor's own terms and the archive disclaimer outweigh the marketing line. |
| C4 | **Member limits vs the audience slider** | The card and table values are 1,000 / 1,000 / 10,000 / unlimited [1], while the page prices "Based on an audience up to N members" and the price moves with the slider band (section 6.3) [1]. | **PARTLY UNRESOLVED:** observed prices and labels are facts; the entitlement rule behind a band is not stated on the page — **UNKNOWN**. |
| C5 | **"20% discount for annual" vs observed annual saving** | Help Center: "We offer a 20% discount on all Ghost(Pro) plans if you subscribe annually" [37]. **ESTIMATE:** observed pairs at 1,000 members imply Starter 15/18 = **16.7%** less, Publisher 29/35 = **17.1%** less, Business 199/239 = **16.7%** less [1]. | **Recorded inconsistency** (ESTIMATE, since it is this author's arithmetic over FACT prices). No explanation is published. |
| C6 | **"Unlimited" email sends vs acceptable-use limits** | Every plan lists "Email Sends: Unlimited" [1], while the Terms prohibit using a Service "in a way that places excessive burdens on the network & systems or interferes with our ability to provide services to other customers" [26]. | **UNKNOWN** practical ceiling. No numeric send cap is published; treat "unlimited" as a marketing statement qualified by the acceptable-use clause. |
| C7 | **Phase 1 arithmetic ($57/mo)** | `research/phase-1/business-model.md` §7.2 states "roughly $57+/mo of delegated services"; the cited table sums to **$62/mo** delegated and **$72/mo** with base hosting [2]. | **Correction recorded here** (ESTIMATE). Upstream artefact untouched. |
| C8 | **Release cadence vs latest listed release** | Docs: releases "every week" [6]; CLI docs: "typically every 1-2 weeks" [5]. Releases page: newest listed entry **v6.38.0, 13 May** (no year displayed) [33]. | **Observation only.** Recorded, not concluded; a fresh look at the releases page is required at synthesis (P3.5). |

---

## 9. Ownership, portability, and offboarding analysis

**FACT — what a Ghost(Pro) customer can export self-service, at any time [18]:**

| Asset | Export | Contents / limits |
|---|---|---|
| Content | JSON from Settings → Advanced → Import/Export | All settings, staff users, posts, pages, tags |
| Members | CSV from the Members area | `id`, `email`, `name`, `note`, `subscribed_to_emails`, `complimentary_plan`, `stripe_customer_id`, `created_at`, `deleted_at`, `labels`; re-importable into any Ghost site |
| Theme | `.zip` from Design settings | Installed themes, including the active one |
| Post analytics | CSV | Post metrics |
| Full site archive (incl. images) | **On request from support** | Provided only for closing a site, migrating away, or creating a staging instance; **not** a backup service; **cannot be provided after cancellation** [17] |

**FACT — what exports do not include:** JSON exports omit email analytics, member engagement data, and comments; exact replication requires the MySQL database dump and the `content/` folder [8].

**FACT — portability in both directions is documented:**
- Self-hosted → Ghost(Pro): export content JSON, download routes/redirects, download the theme, zip the images directory (requires shell access), then upload into Ghost(Pro) via Universal Import, redirects/routes upload, theme upload, and images [32].
- Ghost(Pro) → anywhere: export content, members, theme and analytics; request a full archive including images before cancelling; re-import into another Ghost install; paid-member continuity requires connecting **the same Stripe account in live mode before importing members** [8][12][17][18].
- Vendor-assisted and self-service migration routes: Ghost's own migrations team handles large or custom migrations ("typically complete in 7–21 days", private staging with integrity checks, URL structure preserved with 301 redirects) at no stated charge, while the built-in importer is presented as the default path for most publishers and covers platforms including Substack, Medium, MailChimp, WordPress, Squarespace and another Ghost install [30][31][38]. **ESTIMATE:** this means a paid migration service competing with a free route from the platform vendor — a positioning fact for Package C, not a defect.
- Paid subscriptions are held in the client's own Stripe account, and Ghost charges **0% transaction fees** on paid plans, so subscription revenue is not held by Ghost [1][8].

**FACT — ownership transfer is a first-party, self-service action:** the owner promotes an existing administrator to owner [19]. **FACT:** billing, plan changes, custom-domain activation and cancellation are owner-only [16][36]; Ghost(Pro) has no SSH/FTP [20]; one publication per subscription [24].

**FACT — cancellation semantics:** auto-renew continues unless cancelled; cancellation is owner-initiated in the Billing area; **the site and account are deleted at the end of the billing cycle**; earlier takedown requires contacting support; **no refunds**; there is no pause [16][26].

**ESTIMATE (operational consequence):** portability is real but bounded by three things: (a) a **deadline** — the account is deleted at the end of the billing cycle, so exports and any archive request must happen before cancellation; (b) a **dependency** — images are not in the self-service exports (requested archive or shell access on the source side is required) and email analytics/engagement data/comments are not in the JSON export; (c) a **third-party** — paid-subscriber continuity depends on the client's own Stripe account, not on Ghost.

**RECOMMENDATION (ported into our handover, consistent with `docs/01-business.md` §7):** every Ghost engagement should end with a written, client-executed export checklist — content JSON, members CSV, theme zip, analytics CSV, image/archive request, Stripe connection state, DNS records, and the owner account — plus a one-line statement that the platform account is the client's and that we hold no residual access. This is how "client ownership and portability" stops being a slogan.

---

## 10. Service-boundary implications

These are consequences for how a Ghost offer must be written. They are **RECOMMENDATIONS** consistent with `docs/01-business.md` §§4 and 7, `DECISIONS.md` D-003, and `AGENTS.md`. **No hosting platform, reseller service, or multi-tenant product is proposed here** — see item 8.

1. **The platform account is the client's.** Domain, Ghost(Pro) subscription, Stripe account, sending domain and backups stay in the client's name (D-003). We work inside the client's account with **admin (not owner)** staff access, and the owner-only actions (billing, plan change, custom domain activation, cancellation, ownership transfer) are client actions we document rather than perform [16][19][36].
2. **Plan tier is a scope input, not an afterthought.** Custom themes, marketplace themes, paid subscriptions, custom sending domains, Admin API/webhooks/custom integrations and advanced analytics are all **unavailable on Starter** [1][22]. Any theme, membership or API work therefore requires **Publisher or above** at the client's audience band, and the plan price is audience-scaled [1]. This must be stated to the client **before** theme or membership work is agreed — and it is exactly the constraint already recorded in `docs/01-business.md` §4 Package 2.
3. **Staff seats are a deliverable constraint.** 1 / 3 / 15 seats by plan, with Contributors and suspended users not counting and pending invites counting [1][23]. A 5-person editorial client cannot run the work on Publisher without an upgrade to Business ($199 yearly / $239 monthly at the 1,000-member band, rising with audience) [1]. This is a costing and expectation-setting item, not a detail.
4. **We cannot promise availability, and neither can the plan the client will buy.** Only Custom carries a 99.9% SLA label; the Terms give all paid plans a 98% floor with credit remedies [1][26]. Therefore: no uptime language in proposals, no "always up" claims, and care-style obligations limited to response windows (section 7).
5. **Backups are the client's responsibility unless we contract otherwise.** The Terms place backup responsibility on the customer and the archive is explicitly not a backup [17][26]. Any proposal that mentions backups must say who runs them, where the copies live, how often, and whether a restore has ever been tested — and must not imply the vendor does it for them.
6. **Self-hosting is a separately scoped engineering engagement, not a cheap line.** If it is ever offered, the priced scope is: provisioning and hardening, TLS, the weekly/monthly update cycle across Ghost + Node + MySQL + NGINX + OS, database-plus-content backups with off-server copies, a **periodic restore test**, bulk-mail and DMARC/deliverability setup, CDN/cache, analytics (Docker-preview path if native analytics is wanted), monitoring, incident response with a named responder, access revocation, and offboarding [2][3][4][5][7][8][9][12][14][15]. Ghost's own position is that self-hosting is often **more** expensive than Ghost(Pro) once the component services are added [2]. Combined with `docs/01-business.md` §4 item 5 and `research/phase-1/business-model.md` §5, self-hosting provisionally stays **out of the launch offer surface**.
7. **Deliverables that are safe to promise today:** platform provisioning *in the client's name*, theme selection or bounded customisation (Publisher+), membership/newsletter/Stripe/sending-domain configuration, bounded import and redirect mapping, `gscan`-validated theme delivery, staff training, an export-and-ownership handover checklist, and a documented rollback/export procedure. Deliverables that are **not** safe to promise: uptime, email deliverability outcomes, DDoS/WAF responsibility on self-hosted, restore guarantees, and anything requiring SSH/core modification on Ghost(Pro) [2][20].
8. **No hosting platform.** This research supports serving clients **on** a managed platform or on infrastructure the client owns. It does not support, and this document does not propose, an agency-run Ghost hosting service, multi-tenant platform, or reseller margin line (`AGENTS.md`; `DECISIONS.md` D-001).
9. **Pilot implications (for P9.4, not performed here).** A realistic Ghost pilot needs a plan tier that supports the tested behaviour (custom theme upload and Stripe flow imply Publisher), which means a **paid account or trial** — that is a Checkpoint 3 matter. A full-site archive for staging purposes is available only to existing Ghost(Pro) customers [17]. Nothing in this task created an account, trial, or instance.

---

## 11. Acceptance self-check

| Acceptance criterion | Where satisfied |
|---|---|
| VPS price is **not** presented as total cost | §6.2 (component floor $62 delegated / $72 total; VPS ≈14% of the published floor; labour explicitly unmeasured) |
| Ghost(Pro) plan limitations are exact | §3 (per-plan table with staff, members, newsletters, uploads, themes, paid subscriptions, sending domains, API/webhooks, analytics, support, SLA; plus ownership, seats, CDN and SSH limits) |
| Self-hosted stack and manual duties are explicit | §2 (supported stack/versions, no clustering) and §4 (install, hardening, updates, Node churn, backup, restore, mail, TLS, CDN, analytics duties) with §5 matrix |
| Restore-testing gaps are labelled | §1 boundary, §4 (no documented RPO/RTO/restore cadence; nothing executed), §7 UNKNOWN, §9 ESTIMATE |
| No availability promise beyond documented SLA | §7 (98% Terms floor, Custom-only 99.9% label, warranty disclaimer, liability cap) and §10 item 4 |
| No hosting-platform proposal | §10 item 8; `AGENTS.md`/D-001 constraints restated |
| Managed-vs-self-hosted responsibility matrix | §5 (24 duties) |
| Point-in-time cost stack | §6 (all figures dated 2026-09-22, audience ladder included) |
| Ownership / portability analysis | §9 (exports and what they omit, archive limits, cancellation deletion, Stripe continuity, ownership transfer, both migration directions) |
| Backup / update / security evidence | §4 (duties and commands) and §5 rows 3–5, 7, 9–10, 15–16 with §8 conflicts |
| Pricing conflicts recorded, not smoothed | §8 (C1–C8) |
| Official URLs | §12 (35 entries, one URL each, retrieval date stated) |

---

## 12. Sources

All URLs retrieved 2026-09-22 (UTC). Volatile prices, plan limits and vendor claims carry their retrieval date inline and must be re-retrieved before customer-facing use.

1. Ghost — Ghost(Pro) plans & pricing. https://ghost.org/pricing/ — opened in a live browser session, Monthly/Yearly billing toggled, audience slider moved across all ten positions. Prices observed: yearly $15/$29/$199 and monthly $18/$35/$239 at the 1,000-member band; yearly $15/$46/$199 (2,500), $15/$88/$199 (10,000), $15/$141/$266 (25,000), $15/$274/$399 (100,000); monthly $18/$329/$479 at 100,000; "Over 100,000 members? Reach out to our team" at the last position. Feature tables: staff 1/3/15/unlimited; uploads 5 mb/100 mb/250 mb/1 GB; custom and marketplace themes from Publisher; paid subscriptions and tips from Publisher; members 1,000/1,000/10,000/unlimited; newsletters 1/3/10/unlimited; unlimited email sends; custom sending domain from Publisher; dedicated IP and deliverability consultation on Custom only; Admin API/webhooks/Zapier/n8n/custom integrations from Publisher; advanced native analytics from Publisher; custom SSL and subdirectory install +$50/mo on Business; SSO on Custom; support email/email/priority/account manager; uptime SLA row No/No/No/99.9%.
2. Ghost developer docs — Hosting Ghost (Ghost(Pro) versus self-hosting comparison, supported stack, server hardening, hosted ActivityPub limits, staying up to date, scaling via CDN, "Ghost product support: Forum" for self-hosters). https://docs.ghost.org/hosting
3. Ghost developer docs — How to install Ghost on Ubuntu (prerequisites including ≥1 GB memory, DNS A-record, NGINX ≥1.9.5, MySQL 8, Node from NodeSource, non-root user, install prompts, Ghost-CLI not compatible with web analytics). https://docs.ghost.org/install/ubuntu
4. Ghost developer docs — How to install Ghost with Docker (preview; Caddy, MySQL, optional ActivityPub and Tinybird analytics; migration assistant). https://docs.ghost.org/install/docker
5. Ghost developer docs — Ghost CLI (install/update commands, `ghost backup` contents, `ghost doctor`, update with `--rollback`/`--force`, SSL via acme.sh with 60-day renewal, systemd, directory structure, "should not be changed", releases "typically every 1-2 weeks", major versions every 12–18 months). https://docs.ghost.org/ghost-cli
6. Ghost developer docs — How to update Ghost (weekly releases, `ghost check-update`, `ghost update`, major-version paths, MariaDB→MySQL 8 recommendation). https://docs.ghost.org/update
7. Ghost developer docs — Update Ghost to the latest major version (Node first, Ghost-CLI v1.28.2+, latest minor and within 2 majors, full backup, MySQL 8 check, breaking-change review, ActivityPub NGINX blocks, memory as the most common failure, rollback). https://docs.ghost.org/update-major-version
8. Ghost developer docs — How can I backup my site data? (`ghost backup`; JSON exports omit email analytics, member engagement data and comments; database and content folder must be backed up for disaster recovery or exact replication; mysqldump/tar/rsync/scp; documented restore sequence including reconnect Stripe in live mode before importing members). https://docs.ghost.org/faq/manual-backup
9. Ghost developer docs — Ghost developer FAQs (no clustering/sharding/multi-server; supported providers; Mailgun required for newsletters, SMTP cannot be used; root-user permission fix; Cloudflare caveats; `ghost run` debugging; "What databases are supported in production?" — MySQL 8 only). https://docs.ghost.org/faq
10. Ghost developer docs — Ghost security (device verification, email 2FA, 5 login attempts/hour/IP, automatic SSL, bcrypt, single-use expiring tokens, no raw SQL, XSS/XSS-through-themes position, separate admin domain advice, dependency scanning, vulnerability reporting and handling times). https://docs.ghost.org/security
11. Ghost developer docs — Supported Node versions (22.x Required; 20.x, 21.x, 23+ Unsupported; Node upgrade must be followed by re-installing Ghost dependencies; Ghost 6 removed Node 18 and 20). https://docs.ghost.org/faq/node-versions
12. Ghost developer docs — Configuration (`mail` required in production; MySQL/sqlite3 configuration; Mailgun example; ufw/ssl notes; portal/search/comments scripts served from jsDelivr and relocatable or disableable; Pintura image editor licence). https://docs.ghost.org/config
13. Ghost developer docs — Major versions & long-term support (Ghost 5.x end of life January 2026; Ghost 6.x current, released 2025, EOL "TBC"; the current version gets features, the LTS version only critical fixes; an EOL version "should be considered insecure"). https://docs.ghost.org/faq/major-versions-lts
14. Ghost developer docs — What databases are supported in production? (MySQL 8 only; SQLite3 development-only; MariaDB unsupported; collation migration from MySQL 5). https://docs.ghost.org/faq/supported-databases
15. Ghost developer docs — Breaking changes (Ghost 6.0: `?limit=all` removed with a 100-item API page cap, Node 22 only, MySQL 8 only, AMP removed, theme file-serving changes; guidance to update shortly after the first minor release). https://docs.ghost.org/changes
16. Ghost Help Center — Manage your Ghost(Pro) subscription (owner-only billing; 14-day free trial; plan changes prorated; exceeding member limits disables publishing until upgrade; cancellation deletes site and account at end of the billing cycle; no refunds per the Terms; full data archive only on request before cancellation). https://ghost.org/help/manage-your-subscription/
17. Ghost Help Center — Does Ghost automatically back up my data? ("you don't need to worry about data backups"; on-demand exports; Admin/Content API for scripted pulls; full site archives only for closing, migrating or staging and "not provided for service continuity and are not provided as backups"; archives unavailable after cancellation). https://ghost.org/help/automatic-back-ups/
18. Ghost Help Center — Exporting content and data (content JSON includes all settings, staff users, posts, pages, tags; members CSV field list; theme zip; post analytics CSV). https://ghost.org/help/exports/
19. Ghost Help Center — Transfer site ownership to another user (owner promotes an administrator-role user to owner from Settings → Staff). https://ghost.org/help/transfer-publication-ownership/
20. Ghost Help Center — Does Ghost(Pro) provide SSH/FTP access? (No direct FTP/SSH; third-party code via theme files or code injection). https://ghost.org/help/ssh-ftp-access/
21. Ghost Help Center — Does Ghost(Pro) support other CDN providers? (No; Fastly integration; edge-stacked services must be removed before support investigates). https://ghost.org/help/cdn-provider-support/
22. Ghost Help Center — Custom sending domains (default `ghost.io` sending domain; custom sending domain on Publisher and above; custom domain required first; DMARC record required; ~6-week warm-up with mixed sending; transactional mail uses the custom domain immediately). https://ghost.org/help/custom-sending-domains/
23. Ghost Help Center — How are members and staff users calculated on Ghost(Pro) plans? (members include free and paid; one account/email = one member; Contributor role and suspended users do not count; pending invites do count). https://ghost.org/help/members-and-staff-users/
24. Ghost Help Center — Creating multiple Ghost(Pro) sites (one publication per subscription; separate accounts, subscriptions and unique email addresses). https://ghost.org/help/multiple-sites/
25. Ghost Help Center — Can you describe your security and data practices? (all Ghost(Pro) servers in Amsterdam, The Netherlands; public DPA; datacenter controls; vulnerability reporting contact). https://ghost.org/help/can-you-describe-your-security-and-data-practices/
26. Ghost Foundation — Terms of Service (clause 2.1 "You are solely responsible for securing and backing up Your Content"; clause 3 automatic renewal, no refunds; clause 11 termination; clause 12 "as is" and no warranty of continuous or uninterrupted access; clause 13 liability limited to 12 months of fees and excluding data loss; clause 17.1 migration assistance capped at three weeks with liability limited to US$100; clause 17.3 service levels — 98% minimum monthly uptime excluding scheduled maintenance, one week's notice for scheduled maintenance, major-incident response 1 hour / resolution 6 hours, minor-incident response 12 hours / resolution 2 weeks, service-level credit of one month; clause 17.4 third-party security providers with 24/7 DDoS mitigation, WAF, brute-force protection and automatic rate limiting, liability capped at US$100; English law and jurisdiction). https://ghost.org/terms/
27. Ghost Foundation — GDPR Data Processing Agreement (customer is controller, Ghost is processor; DPA accepted by accepting the Terms; sub-processor list Annex A and security measures Annex B "Available upon request"). https://ghost.org/dpa/
28. Ghost Help Center — How does Ghost comply with GDPR? (processor and controller roles; DPA acceptance; all data stored in the EU with some support/maintenance processing outside the EU; export and image archive route). https://ghost.org/help/ghost-gdpr-compliance/
29. Ghost Help Center — How to upgrade a Ghost(Pro) site (minor versions handled weekly by Ghost; major versions owner-initiated via an admin banner, with a compatibility check, a full backup created by Ghost, and up to 15 minutes offline; sites not upgraded continue to receive only critical fixes; automatic upgrades for those still on version 5 after 4 November 2025). https://ghost.org/help/how-to-upgrade-ghost/
30. Ghost — Move to Ghost migration service (concierge migrations; managed migrations "typically complete in 7–21 days"; native/self-service support for named platforms; URL structure preserved with 301 redirects; private staging with integrity checks; no third-party integration development service). https://ghost.org/move-to-ghost/
31. Ghost developer docs — Migration index (Ghost(Pro) customers may receive migration help from the Ghost team; platform list including self-hosted Ghost). https://docs.ghost.org/migration
32. Ghost developer docs — Migrating from Ghost to Ghost (self-hosted to Ghost(Pro): content JSON export, routes/redirects download, theme download, images zip requiring shell access, Universal Import upload order). https://docs.ghost.org/migration/ghost
33. GitHub — TryGhost/Ghost releases (newest listed release v6.38.0 dated 13 May, then v6.37.1, v6.36.0, v6.35.0, v6.34.0, v6.33.0, v6.32.0, v6.30.0, v6.28.0 with the same-tick pattern; the captured page text displays no year). https://github.com/TryGhost/Ghost/releases
34. Ghost status page (current state at retrieval: "We're fully operational — we're not aware of any issues affecting our systems"; active phishing-campaign warning about fake "Billing / Verification-Related Suspension" emails; directs customers to support@ghost.org). https://ghoststatus.org/
35. Mailgun — Pricing (Free $0 with 100 emails/day; Basic $15/mo with 10,000 emails/month included, overage from $1.80 per 1,000; Foundation $35/mo with 50,000 emails/month; dedicated IP $59/IP/month; guaranteed uptime SLA listed as a higher-tier capability). https://www.mailgun.com/pricing/ — used only as first-party corroboration of the email line in Ghost's self-hosting comparison.
36. Ghost Help Center — Adding a custom domain (CNAME plus A records; Ghost(Pro) issues SSL automatically; one custom domain per site; root-domain CNAME caveats; `.eth` and punycode/special-character domains unsupported; only the staff owner can activate). https://ghost.org/help/using-custom-domains/
37. Ghost Help Center — Student, open source developer, or non-profit discounts ("We offer a 20% discount on all Ghost(Pro) plans if you subscribe annually"; no further discount; self-hosting is free). https://ghost.org/help/ghostpro-discounts/
38. Ghost Help Center — Importing content (importer covers Substack, Medium, MailChimp and other platforms; universal import between Ghost installs; JSON and zip with images; splitting tools; Ghost(Pro) support vs forum routing). https://ghost.org/help/imports/
39. Ghost developer docs — Reinstalling Ghost (reinstall path for Ghost 0.x–2.x and SQLite3 production sites; full backup; disconnect Stripe, deleting members with Stripe customer IDs; restore steps; reconnect the same Stripe account before importing members). https://docs.ghost.org/reinstall
