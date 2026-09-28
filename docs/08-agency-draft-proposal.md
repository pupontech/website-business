# Agency draft website — owner-review proposal

**Status:** Proposal only. This document neither approves implementation nor claims the foundation is accepted. No source, infrastructure, preview, CMS, or form work is authorized by this proposal.

**Basis:** D-013 authorizes only the route-neutral Astro/TypeScript foundation. D-014 reserves `astrodev.aygross.xyz` for a future password-protected preview after a site is built and verified. D-015 supplies the later draft defaults: generic placeholder identity is acceptable, Contact says “coming soon” with no working form, and the site should feel like one minimal/corporate site split across Home, Services, and Contact. These do not select a CMS, approve public copy, or authorize preview publication.

**Dependency warning:** The current foundation evidence still says BLOCKED / NOT FULLY VERIFIED. A CSS fix and 195 CSS-pixel regression test were implemented after the original overflow finding, but the dependent evidence revalidation has not been accepted. Actual 200% browser zoom was not run, and hosted GitHub Actions CI is NOT RUN. This proposal is conditional on revalidating the fix and the foundation, completing the actual zoom check, obtaining a successful hosted CI run, and having the foundation accepted by the responsible owner/orchestrator. None of those conditions is represented as completed here.

## 1. Proposed outcome and boundary

Prepare a small, static-first, English-language private draft for the agency's intended English-speaking audience in Israel. It would have three short, closely related pages—Home, Services, and Contact—with shared visual language, navigation, and footer so they read as one compact site. The paths below are proposals, not approved routes:

| Page | Candidate path | Proposed role |
|---|---|---|
| Home | `/` | Introduce the draft's purpose and point to Services and Contact, using only owner-confirmed facts. |
| Services | `/services/` | Present service categories only after scope and capability are substantiated; until then, visibly mark them as draft planning labels. |
| Contact | `/contact/` | Display “Contact — coming soon” and make clear that this draft has no contact channel and collects no messages. |

The proposed path convention is trailing slashes for the two named pages. Astro's route/redirect behavior and this exact convention need to be confirmed in the implementation OpenSpec before routes are created. Do not add About, Work, Insights, client pages, aliases, or extra routes without a new owner decision and an applicable scope review.

This is not an implementation of the existing route-neutral fixture, not a CMS selection, and not a public business site. Content may be authored as static source only if separately approved; doing so must not silently establish Markdown/MDX, a CMS, or an editor workflow. No design token, typeface, palette, image, or public copy is selected by this document.

## 2. Copy truth gates and placeholder treatment

Use placeholders for missing facts, not invented facts that merely sound plausible. A placeholder must be unmistakably identified as such in the rendered private draft, visually distinct from final copy, and removed or replaced only with owner-confirmed material before any public use. Do not use sample client names, false credentials, mock testimonials, fabricated prices, portfolio cards, outcomes, statistics, guarantees, or claims of established local presence.

A provisional identity treatment for owner review is a generic working label such as “Example Studio,” paired on every page with a persistent, legible banner: “PRIVATE DRAFT — placeholder identity; not for publication.” The label is not a proposed real business name and should not be used without the banner. The owner may instead choose a bracketed token such as “[Agency name — placeholder]”; no real name or person/team identity may be inferred. If the persistent notice cannot be guaranteed in all routes and responsive states, prefer the bracketed token and omit identity-dependent copy.

| Page/content | Draft proposal | Truth gate before any public use |
|---|---|---|
| Global identity | A plainly generic placeholder plus the persistent private-draft notice above. No person, team, address, logo, or local-presence signal. | Owner supplies and approves the actual public identity and rights-cleared assets; remove the placeholder notice only as part of an explicit publication review. |
| Home | A concise page-purpose heading and short introduction slot. Keep identity- or capability-dependent wording as labeled placeholders; do not fill space with generic promises. Link to the proposed Services and Contact pages. | Owner confirms identity, intended positioning, actual audience wording, and every factual claim. “English speakers in Israel” is a planning audience, not proof of office, residency, jurisdiction, or local expertise. |
| Services | Astro static and Astro CMS may appear as draft category labels because D-011 named these categories for planning. Until validated, label them “service areas under consideration — scope and capability not yet confirmed,” or omit them from visitor-facing draft copy. Do not imply a CMS vendor or promise project outcomes. | For each eventual service, owner confirms deliverables, exclusions, workflow, capability, client responsibilities, and claims. No public offer or performance/result claim without its own factual basis and approval. |
| Contact | Exact functional state: “Contact — coming soon.” Optional supporting line: “This private draft has no contact form or message channel.” No button that looks submit-capable, email address, `mailto:`, phone number, social/contact link, guessed recipient, or collection mechanism. | Any future contact path requires a separate owner decision. A form, provider, recipient, privacy/data-flow review, retention, abuse controls, and delivery testing are outside this proposal and must not be added by implication. |
| Footer and metadata | Minimal navigation and the same draft notice; no address, legal identity, copyright year claim, social accounts, canonical URL, or structured business facts. | Add only verified, owner-approved information. A public-domain/canonical URL is not assumed by the private-preview hostname. |

No publishable agency proof is supplied by the project context. Omit proof entirely; do not use placeholders that resemble testimonials, client logos, project screenshots, metrics, case studies, or credentials. Do not infer client proof status from the agency's proof status. Avoid legal, tax, privacy, or other jurisdiction-dependent claims.

## 3. Proposed responsive and accessibility contracts

Keep the design corporate-minimal and image-independent: clear hierarchy, generous but controlled whitespace, readable line lengths, restrained separators, and ordinary links. This is a content/layout direction only—not approval of a final visual identity or exact tokens. Use one source order and semantic landmarks across viewport sizes; stack content naturally rather than visually reordering it. Navigation should be simple; if it collapses, use an accessible disclosure with its state exposed. Avoid sticky/floating contact controls, carousels, autoplay, modal-only navigation, and motion-dependent content.

Proposed acceptance contract for a future rendered draft:

- Meet the project WCAG 2.2 AA target, without claiming conformance from automation alone. Use semantic `header`, `nav` when present, `main`, and `footer`; one page-level `h1`; ordered headings; descriptive links; a first-focusable skip link; visible, unobscured keyboard focus; and no keyboard trap.
- Check color contrast in text, links, focus indicators, and relevant controls/states against the documented WCAG 2.2 AA thresholds. Do not rely on color alone. Test keyboard operation and manual semantics/accessible names; record the browser and assistive-technology combination if used.
- Test at 320, 390, 768, 1024, and 1440 CSS-pixel widths, plus actual 200% browser zoom. Require no horizontal page scrolling, clipped text, overlap, hidden content, or lost action. Also test the 195 CSS-pixel reflow proxy that exposed the current foundation defect; a proxy result must not be reported as an actual browser-zoom test.
- Test reduced-motion settings. The default experience should need no animation; all content and navigation remain usable with reduced motion enabled.
- Make the layout work with no imagery. Include only owner-approved, rights-cleared assets, with useful alternative text for informative images and empty alternative text for decorative images.

The existing foundation's 195-pixel proxy finding remains an acceptance blocker until post-fix evidence is reconciled; the CSS fix and regression test are not a draft-site exception. A future site test suite must preserve and extend that regression coverage rather than weaken the existing foundation checks.

## 4. Static delivery, performance, and SEO proposals

- Keep the draft static-first and minimal: no CMS/editor, server adapter, API, client-side framework, form endpoint, analytics, marketing tags, external font, remote asset, or network-dependent content. Prefer system fonts and local, approved assets. Any additional runtime or dependency is a scope change requiring its own rationale, review, and approval.
- Proposed performance checks: report reproducible production-build output size and JavaScript/network-request inventory; the expected design is no application JavaScript and no third-party requests. Inspect the pages with a documented Lighthouse/lab run after the build. Numerical byte or score budgets are not set here; agree any such budget in the implementation OpenSpec before coding rather than retrofitting a pass threshold afterward. Lab measurements are not field/Core Web Vitals evidence.
- Use truthful, unique page titles only after the owner approves page wording. Keep `lang="en"`, semantic heading structure, and ordinary internal links. Do not add invented descriptions, social preview cards, structured data, sitemap entries, or canonical URLs. Each draft route should carry a `noindex,nofollow` directive as a precaution, but this is not privacy or access control.
- Do not expose an unauthenticated preview to search engines or people. For any later preview, password protection is the primary access control; verify noindex behavior on every route and relevant response, omit public sitemap/discovery links, and check direct access to pages and assets. Do not treat a robots exclusion or obscure URL as a substitute for authentication. No preview configuration or publication is included now.

## 5. File-disjoint implementation slices (future work only)

Only after the gates in section 7 pass, an approved implementation OpenSpec should assign one writer per file and preserve these non-overlapping ownership slices. The exact paths are proposals; reconcile them with the accepted foundation and its allowlists before implementation. Avoid adding dependencies unless approved and necessary.

| Slice | Proposed sole file ownership | Work boundary and dependencies |
|---|---|---|
| A — shared shell | `site/src/layouts/AgencyDraftLayout.astro`; `site/src/components/DraftBanner.astro`; `site/src/components/PrimaryNav.astro`; `site/src/components/SiteFooter.astro`; `site/src/styles/agency-draft.css`; `site/tests/agency-shell.spec.ts` | Build the shared draft label, semantic shell, responsive navigation and base styling. Owns no page body or page-specific copy. Depends on an accepted route/content contract. |
| B — Home | `site/src/pages/index.astro`; `site/src/content/draft/home.ts`; `site/tests/agency-home.spec.ts` | Home-only content and route behavior, using Slice A components. No shared shell edits. |
| C — Services | `site/src/pages/services.astro`; `site/src/content/draft/services.ts`; `site/tests/agency-services.spec.ts` | Services-only category placeholders and truth-label rendering. Does not turn planning labels into capability claims or select a CMS. |
| D — Contact | `site/src/pages/contact.astro`; `site/src/content/draft/contact.ts`; `site/tests/agency-contact.spec.ts` | Contact-coming-soon content and route. Must contain no form, destination, contact collection, or functional contact action. |
| E — integration and policy checks | `site/scripts/verify-scope.mjs`; `site/package.json`; `site/playwright.config.ts`; `site/tests/agency-quality.spec.ts`; `.github/workflows/route-neutral-astro-foundation.yml` | Sole owner of changes to the existing fail-closed source/output allowlists, test commands, route/output policy, and hosted CI integration. Preserve existing isolation, scanning, read-only permission, and no-deploy/no-upload constraints. Coordinate after A–D contracts are fixed; no broad checkout or weakened guard. |

Slices A–D have disjoint path ownership and may be implemented independently only after their common content/route contract is accepted. Slice E integrates and tests the complete tree after those slices; it must not edit A–D-owned files. If integration reveals a need to modify a file owned by another slice, stop and reassign explicitly before editing. No task in this proposal authorizes work in a CMS, preview host, infrastructure, DNS, or deployment configuration. This proposal does not change `PROJECT_STATUS.md`, `DECISIONS.md`, or the existing foundation OpenSpec.

## 6. Proposed acceptance tests and evidence

All tests below are future criteria, not results. A test failure blocks draft acceptance; missing evidence is NOT RUN, not PASS.

| Area | Proposed acceptance evidence |
|---|---|
| Scope and routes | Static production build generates exactly the approved Home/Services/Contact routes and their required local assets. No unexpected route, API, server output, CMS/editor dependency, form, analytics, external URL/resource, client script, or contact destination. Fail-closed source/output checks include the new route/content files. |
| Truth and placeholder content | Automated source/output allowlists plus rendered-page review confirm the persistent draft notice on every route, generic placeholder is never presented as a real identity, service categories remain clearly qualified until substantiated, and no fabricated proof/claims/prices appear. Owner reviews every eventual factual claim and asset before publication. |
| Contact | Rendered Contact page visibly says “coming soon”; automated DOM/source checks confirm no form controls, submission path, `mailto:`, `tel:`, guessed recipient, or other message-collection route. Confirm the page does not imply working contact. |
| Responsive/visual | Browser checks at 320/390/768/1024/1440 CSS px and the 195 CSS-pixel proxy show no overflow/clipping/reordering defect; actual browser UI at 200% zoom is separately inspected and recorded. Retain and inspect agreed local screenshots; screenshots are not uploaded as workflow artifacts. |
| Accessibility | Automated axe checks on every route at the agreed widths; manual keyboard/skip-link/focus review, landmarks/headings/accessible-name review, reduced-motion check, and measured contrast. Record findings and fixes; no automated-only conformance claim. |
| Security and preview readiness | Before any separate preview request, confirm owner-only/password access, HTTPS, noindex on each route, denial of anonymous direct page/asset access, no secrets or real inquiries, credential handling outside source/chat, and a tested rollback/recovery procedure. These are a separate approval gate; no preview is used as an acceptance shortcut. |
| Performance | Record production build output and JavaScript/third-party request inventory; verify no application JS or remote dependency is emitted. Record a repeatable lab measurement and environment. Agree any numeric budgets in the implementation OpenSpec before coding; do not call lab results field data. |
| SEO/content metadata | Verify `lang="en"`, one meaningful H1 per page, accurate unique titles if approved, no unsupported descriptions/structured data/canonical URL/sitemap, and `noindex,nofollow` on all draft routes. Verify noindex is not represented as access control. |
| Hosted checks | After foundation acceptance, run the approved hosted CI checks on the actual repository commit and record the run URL/commit. Confirm scope allowlists, dependency/secret checks, tests and build; no deployment, preview publication, or artifact upload. Hosted CI does not replace manual/browser, security-preview, or owner content review. |

## 7. Open owner choices and explicit stop gates

D-015 is treated as the current planning default—not a blanket implementation or publication authorization. Preserve its three page names, generic-placeholder allowance, no-form Contact state, minimal/corporate feel, and private-preview intent unless the owner changes them. Resolve the following in an owner review before implementation:

1. Confirm the proposed three route paths and trailing-slash convention, and whether the “one-page feel” means three conventional routes with shared navigation (recommended here) or another arrangement.
2. Choose the literal generic placeholder treatment and exact persistent draft notice, or defer identity entirely. Confirm whether draft category labels for Astro static/Astro CMS should be visible at all before capability and scope are verified.
3. Approve the short Home/Services/Contact content outline and any actual claims only after identity, scope, capability, and factual substantiation are supplied. No proof is presumed available.
4. Review rendered visual tokens/assets and responsive behavior during implementation; no colors, fonts, logo, images, or final brand have been selected here.
5. Agree numerical performance budgets in the implementation OpenSpec if desired. This document proposes measurement and static/no-third-party constraints but does not invent an approved score or byte budget.
6. Reconfirm that CMS/editor work, real contact collection, analytics, public indexing, public launch, and client-specific work remain out of scope. None is required to make this draft.

Order and stops:

1. **Foundation acceptance first.** Revalidate the narrow-width fix, complete dependent responsive evidence including actual 200% browser zoom, obtain the real hosted CI run, and have the foundation accepted. Current evidence is BLOCKED / NOT FULLY VERIFIED, so no website draft implementation starts.
2. **Owner/orchestrator review second.** Review this proposal, resolve the route/content choices, and approve a separately scoped implementation OpenSpec. A proposal or D-015 planning default is not that approval.
3. **Build and verify locally/hosted third.** Implement only the approved static Home/Services/Contact draft, run the acceptance matrix, and keep unverified items explicitly blocked. No approval is implied for CMS, form, accounts, paid services, deployment, or public release.
4. **Private preview is a separate gate.** Only after an actual draft is built and verified may a separately authorized preview task assess `astrodev.aygross.xyz`. Before any provisioning/publication, require owner-only password access, HTTPS, noindex/non-public safeguards, correct artifact, secret isolation, access-denial checks, and rollback evidence. Do not include password material in Git or chat. This proposal includes no preview commands or setup.
5. **Stop before implementation authorization, preview publication, production, DNS changes, or G3.** Public/production launch and paid services remain subject to their own explicit owner approval. The task that produced this document stops here.

## Sources and verification boundary

This proposal is based on repository planning and decisions only: `AGENTS.md`, `PROJECT_STATUS.md`, `DECISIONS.md` D-013–D-015, `DESIGN.md`, `docs/07-owner-review-proposal.md`, `docs/08-route-neutral-foundation.md`, the route-neutral foundation OpenSpec (`proposal.md`, `design.md`, `tasks.md`, `verification.md`), and read-only inspection of the current `site/src/pages/index.astro` and `site/src/styles/global.css`. No external product claims are needed for this proposal.

The current source inspected is still a single synthetic `/` fixture and local stylesheet; it does not contain agency routes or content. The current foundation evidence records the pre-fix failed 195 CSS-pixel proxy (292 px document scroll width), while a subsequent CSS fix and regression test await accepted revalidation. Actual 200% UI zoom and hosted CI are NOT RUN. These are inherited acceptance gaps, not tests run or fixes made by writing this proposal. No browser, build, CMS, form, preview, deployment, or production test was run for this document.