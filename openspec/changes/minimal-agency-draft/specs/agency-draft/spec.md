# Specification: private static agency-site draft

**Status:** D-016 authorizes local-only development against a verified local foundation baseline. Independent OpenSpec review precedes source edits. Hosted P8.1/draft acceptance, push, preview and deployment remain blocked.

## Requirements

### REQ-01 — Foundation and authorization gate

Local-only implementation MAY begin after independent review of this revised OpenSpec and parent verification of the local foundation baseline, under D-016’s explicit exception and owner-approved choices. Formal foundation and draft acceptance still REQUIRE green hosted CI on exact commits. D-016 permits local-only agency source edits before P8.1 hosted acceptance; neither foundation nor draft may be marked accepted until hosted CI passes. D-013 and D-015 alone MUST NOT be treated as implementation authorization for this change.

#### Scenario: a prerequisite remains blocked

- GIVEN independent review, local foundation baseline, or an owner choice is incomplete
- WHEN an implementation task is considered
- THEN the implementation MUST remain stopped and the missing gate MUST be recorded as BLOCKED/NOT RUN
- AND no agency route or draft content may be accepted or deployed; D-016 only permits local development.

### REQ-02 — Exact three-route static boundary

Under the D-016 approved route contract, the application MUST generate exactly the Home `/`, Services `/services/`, and Contact `/contact/` routes, using the confirmed trailing-slash behavior. Each MUST use the shared draft shell. No About, Work, Insights, service-detail route, alias, redirect, API, server route, or additional page family may be introduced. The app MUST remain TypeScript-based Astro with explicit static output and run/build only from `site/`.

#### Scenario: an unapproved route or runtime is introduced

- GIVEN source or output contains a route, alias, server handler, or artifact outside the confirmed three-page contract
- WHEN source/output scope verification runs
- THEN verification MUST fail closed; no exception may be inferred from the “one-page feel” wording.

### REQ-03 — Persistent private-draft and truthful-content boundary

Every route MUST visibly render the same owner-approved private-draft notice and an unmistakably generic placeholder identity treatment, unless identity is explicitly omitted by the owner. Placeholder treatment MUST NOT resemble a real agency/person/team identity. Content MUST contain only owner-approved facts or visibly marked content-needed placeholders. It MUST NOT fabricate or imply identity, service capability/scope, clients, proof, testimonials, credentials, prices, metrics, outcomes, guarantees, local presence, or established public status. Work/proof content MUST be omitted.

#### Scenario: a placeholder is mistaken for a public claim

- GIVEN a page contains a generic identity, service label, or content slot
- WHEN it is rendered at any supported viewport
- THEN the private-draft/placeholder state MUST remain plainly visible and the text MUST not imply a verified public identity, offer, capability, or result.

### REQ-04 — Contact is non-functional and collects no data

The Contact route MUST display the owner-approved “Contact — coming soon” state and explain that this draft has no form or message channel. It MUST contain no form, submit control, `mailto:`, `tel:`, social/contact destination, guessed recipient, server action, API, webhook, email delivery, cookie/session, or other mechanism that collects, routes, stores, or transmits an inquiry. No button or link may imply a working contact path.

#### Scenario: visitor encounters Contact

- GIVEN a visitor opens `/contact/`
- WHEN the page is rendered or keyboard-operated
- THEN the coming-soon state and no-channel explanation MUST be visible
- AND there MUST be no mechanism or apparent action to submit or route a message.

### REQ-05 — No CMS, external runtime, or browser script

The implementation MUST NOT add Ghost or any other CMS/editor, Markdown/MDX, content collection/schema, Astro adapter/server output, UI framework, client island/script, analytics, form package, remote font/image/script/style, external content fetch, or other third-party runtime dependency. Use only local styles/system fonts and ordinary internal anchors. Any necessary dependency or external resource requires a revised owner-approved OpenSpec change.

#### Scenario: a runtime or external dependency is added

- GIVEN source, manifest, lockfile, build output, or browser network log includes a prohibited feature or unknown external resource
- WHEN the scope verifier or review runs
- THEN acceptance MUST fail until removed or a separately approved scope change supersedes this requirement.

### REQ-06 — Accessible shared shell and responsive behavior

Each route MUST use semantic header, navigation, main, and footer landmarks; exactly one page-level `h1`; a first-focusable skip link to main; visible and unobscured focus; logical source/keyboard order; descriptive internal navigation links; and responsive reflow without horizontal page scrolling or clipped content. Navigation MUST work without JavaScript. The pages MUST honor reduced-motion preferences and target WCAG 2.2 AA without claiming conformance from automated testing alone.

#### Scenario: a route fails keyboard, reflow, or accessibility review

- GIVEN automated or manual review finds a broken skip link, inaccessible nav, missing landmark/heading, focus defect, reflow/overflow issue, contrast failure, or reduced-motion defect
- WHEN acceptance is reviewed
- THEN the draft MUST remain unaccepted until the defect is fixed and the affected evidence is repeated.

### REQ-07 — Noindex metadata is not access control

Each route MUST have `lang="en"`, a truthful route-specific document title, and `noindex,nofollow` metadata. It MUST NOT emit a canonical URL, sitemap, social metadata, structured data, unsupported description, or business-identity metadata. The application and evidence MUST state that noindex is not privacy/access control. No public or password-protected preview configuration is in scope.

#### Scenario: draft is treated as private because of robots metadata

- GIVEN someone proposes publishing the draft with only noindex or an obscure URL as protection
- WHEN release or preview is considered
- THEN this change MUST NOT authorize publication; separate owner approval and tested access controls are required.

### REQ-08 — Fail-closed source/output scope and CI

The existing verifier MUST be extended to allow only the files required for the shared shell and three routes, and the exact expected static output (three HTML route files and approved local CSS), while rejecting unknown source/output, hidden/generated claim text, form/contact destinations, external resources, scripts, additional routes, and prohibited dependencies. Tests MUST exercise each route. Hosted CI MUST preserve the existing sparse-checkout allowlist, full working-tree inventory guard before install/scan, non-persisted checkout credentials, read-only permissions, dependency audit, redacted Gitleaks scan, and no-deploy/no-preview/no-upload behavior. A failed or unavailable check MUST fail or be recorded BLOCKED/NOT RUN, never silently skipped.

#### Scenario: verifier cannot establish the allowlist

- GIVEN required input is absent/unreadable, output inventory differs, hosted checkout isolation cannot be verified, or a scan/test cannot complete
- WHEN local or hosted verification runs
- THEN the corresponding check MUST fail closed or be explicitly recorded BLOCKED/NOT RUN; no full-checkout fallback or skipped check is allowed.

### REQ-09 — Evidence-based implementation handoff

Before the implementation is accepted after hosted CI, an evidence note MUST map every requirement to actual local/hosted results or explicitly mark it BLOCKED/NOT RUN. It MUST include route/output inventory, content and no-form checks, dependency/secret scan summaries without secret values, responsive/accessibility observations, actual 200% browser zoom evidence, screenshots and per-image visual findings, and build/performance evidence. `PROJECT_STATUS.md` and the relevant Kanban card may be updated only after the actual work is accepted; they MUST NOT call an unrun or simulated result verified.

#### Scenario: required evidence is missing

- GIVEN a check, screenshot, or visual review is simulated, blocked, or not run
- WHEN the handoff is prepared
- THEN it MUST be labeled accurately and MUST NOT be marked PASS or verified.

## Acceptance criteria

This change allows local-only development after independent OpenSpec review, D-016 decisions, and local baseline verification; hosted acceptance remains blocked. The later implemented draft is accepted only when all REQ-01 through REQ-09 are evidenced; a green build alone is insufficient. Detailed commands and evidence expectations are in the sibling `verification.md`.