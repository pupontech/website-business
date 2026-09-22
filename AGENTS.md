# AGENTS.md

## Mission

Establish a lean, commercially viable Astro + Ghost website business that can repeatedly deliver distinctive, professional, fast, accessible, secure, maintainable websites without building unnecessary internal infrastructure.

## Required reading order

Before any task, read:

1. `AGENTS.md`.
2. `PROJECT_STATUS.md`.
3. `DECISIONS.md`.
4. The phase document and research artifacts named by the task.
5. Any applicable OpenSpec change for significant implementation work.

Chat history is not a substitute for repository documentation.

## Architectural constraints

- Do not build a proprietary website builder, multi-tenant hosting platform, custom CRM, or generalized automation platform without an approved demonstrated requirement.
- Keep client repositories, credentials, CMS instances, deployments, data, and backups isolated by default.
- Prefer static Astro output and minimal client JavaScript when requirements allow it.
- Do not add React or another UI framework without a documented requirement.
- Default Ghost delivery to native themes. Headless Ghost requires written justification against membership, Portal, newsletter, and native-frontend limitations.
- Prefer managed hosting when its full cost is lower than the risk and labor of self-hosting; compare total responsibility, not VPS price alone.
- Preserve client ownership and portability. Do not create avoidable lock-in.
- Do not deploy production infrastructure, buy services/domains, alter DNS, or launch publicly without the applicable owner approval checkpoint.

## Development standards

- Use current stable Astro and maintained dependencies at implementation time.
- TypeScript is required for Astro implementation.
- Apply progressive enhancement, semantic HTML, responsive images, and minimal JavaScript.
- Meet WCAG 2.2 AA as the baseline target, with documented manual checks.
- Treat performance budgets and Core Web Vitals as design constraints, not end-stage optimization.
- Separate reusable engineering foundations from client-specific visual identity and content.
- Do not fabricate content, customers, testimonials, awards, metrics, or case-study results.
- Do not refactor unrelated code or change approved technologies without a decision record.

## Security requirements

- Never commit secrets or expose privileged CMS credentials, Ghost Admin API keys, tokens, or private environment variables to browser code.
- Separate development, staging, preview, and production credentials.
- Use least-privilege CMS accounts and webhook credentials; clients do not receive unnecessary repository or platform administration access.
- Authenticate and validate webhooks; protect previews; validate server-side form input; apply rate/spam controls.
- Define dependency-update, backup, restore-test, rollback, access-revocation, and incident-response procedures before production.
- Review third-party skills, actions, packages, and templates before installation; record license, maintenance, permissions, and security implications.

## Research and evidence standards

- Prefer official documentation, official pricing, maintained repositories, first-party service pages, and dated primary announcements.
- Use community reports only as attributed experience, not proof of product behavior.
- Put an inline numbered citation directly after externally sourced claims and maintain a source list with exact URLs.
- State the retrieval date for volatile prices and plan limits.
- Label statements as `FACT`, `ESTIMATE`, `RECOMMENDATION`, or `UNKNOWN` when provenance may otherwise be ambiguous.
- Do not infer private competitor processes or pricing.
- A proof of concept is complete only when the named operation was actually exercised. Missing credentials, paid features, or account permissions must be reported as limitations.

## Delegation rules

- Break work into small, independently verifiable tasks with one evidence domain or one implementation unit.
- Hermes chooses workers based on task requirements and available capability; task prose must not hardcode a model or provider.
- Assign one writer per file. Parallel tasks must use disjoint writable files.
- A reviewer writes a separate review artifact and does not silently rewrite the author’s output.
- Workers may not change approved decisions. Proposed changes go into a review artifact or decision proposal with justification.
- Never run destructive Git commands (`git clean`, `git reset --hard`, `git checkout .`, or stash) in shared workspaces.
- Workers do not commit, push, open PRs, install paid services, or deploy unless their task explicitly authorizes it.
- Parent/orchestrator verifies source credibility, exact scope, artifact existence, citations, and acceptance criteria before accepting work.

## Required subagent task format

Every delegated task must contain:

**Subagent task**

- **Objective:** one bounded outcome.
- **Relevant project context:** only context needed for this task.
- **Required files to read:** exact paths.
- **Exact work to perform:** explicit research or implementation steps.
- **Files allowed to change:** exact, non-overlapping paths.
- **Expected deliverables:** named artifacts and required sections.
- **Acceptance criteria:** measurable conditions.
- **Verification requirements:** commands/checks and evidence expectations.
- **Explicit stopping point:** what not to start or change.

## Testing expectations

Implementation work must use the smallest applicable set and then the full project gate:

- formatting/linting;
- type checking;
- production build;
- unit/integration tests where behavior warrants them;
- Playwright for critical browser paths;
- desktop/tablet/mobile screenshots and visual inspection;
- accessibility automation plus manual keyboard/focus/semantics review;
- broken-link, metadata, sitemap, structured-data, and SEO checks;
- Lighthouse/Core Web Vitals-oriented checks with recorded environment;
- CMS draft, preview, publish, permission, export, backup, and recovery tests;
- Ghost theme GScan and relevant functional tests;
- dependency and secret scanning.

Compiling is not visual acceptance. Automated accessibility is not manual accessibility acceptance. Local success is not hosted CI evidence.

## OpenSpec policy

Use OpenSpec for significant implementation changes: architecture, CMS integration, schemas, shared component contracts, integrations, deployment, data migration, and security-sensitive behavior. Small documentation corrections do not require a change proposal.

Each change must define proposal, scope, requirements, design, tasks, acceptance criteria, verification, and decision links before implementation begins.

## Documentation and status rules

- Update the phase deliverable with the work’s evidence and limitations.
- Record important accepted choices in `DECISIONS.md`; keep unapproved recommendations marked `Provisional`.
- Update `PROJECT_STATUS.md` after every accepted task.
- Update the corresponding Kanban card with artifact paths and verification evidence.
- Do not mark a requirement verified when it was only researched, simulated, or blocked.
