# Pinmotion UI phased audit, engineering and release programme

> **Programme status: PLANNED. No implementation phase in this programme is marked complete by creating this document.**
> Baseline: `main` · Programme branch: `release-readiness/roadmap` · 21 November 2026
> Maintainer: Brajesh Kumar

This is the controlling phased delivery plan for taking Pinmotion UI from its current development state to a properly audited, documented, secure, installable and releasable browser component package.

The engineering quality target is the level of operational completeness demonstrated by [VFX UI Anime](https://github.com/Brajesh31/vfx-ui-anime): public npm distribution, package exports, clean tarball smoke tests, per-component documentation, quality evidence, contribution/support/security policies, CI workflows, CodeQL, OpenSSF Scorecard, release automation and post-publication verification.

**Do not copy VFX UI Anime implementation files blindly.** Pinmotion has its own pinball artwork, chrome-ball WebGL rendering, recorded sound, mechanical interactions, two runtime families and generated standalone scripts. Every adopted process must be tested against those requirements.

## 1. Final product outcome

The finished project must provide:

- All 29 existing component bundles and 30 custom-element tags working correctly.
- The original four reference controls restored to their actual original design and intended behavior. The working identification hypothesis is Toggle, Slider, Plunger and Stepper, but Phase 0 must verify this from repository history and original references before making that list authoritative.
- Every other component audited in small batches. Each batch is finished and evidenced before work moves to the next batch.
- Every component demo, gallery card, standalone bundle, registry entry, public API and README/API guide checked against the same source of truth.
- The PinballKit and PinmotionExtras shared runtimes documented, tested and hardened without flattening the original design.
- A clear design system, asset and sound provenance, WebGL/audio fallback behavior, responsive rules and motion standards.
- A complete documentation and skill system for humans and coding agents.
- A working public npm package with `npm install pinmotion-ui`, an aggregate browser entry point and individual component subpath imports.
- Tested package contents using `npm pack`, clean consumer installation and real-browser import smoke tests.
- CI/CD, security scanning, accessibility, browser compatibility, performance and release workflows.
- A versioned release process with changelog, GitHub Release, tarball/checksum, provenance where supported and post-release installation/live-site checks.

## 2. Non-negotiable rules

1. **One small component batch at a time.** Do not audit or rewrite all 29 components in one large change. Complete its source fixes, visual QA, tests, documentation, generated output and evidence before the next batch.
2. **Original design preservation.** The original four are the reference baseline. Do not replace their artwork, proportions, materials, mechanisms, colors, animation or sound with generic controls to make tests easier.
3. **Source of truth first.** Edit canonical source/specification/runtime files and regenerate generated bundles, guides, demos, gallery and registry. Do not hand-edit generated output.
4. **No component-count race.** Do not add new components while existing component defects or release gates remain open.
5. **No false completion.** A folder, API guide, build, screenshot, HTTP 200 or workflow success alone does not prove a component works.
6. **Evidence per component.** Every component has its own audit row, issue references, test results, visual evidence, documentation review and status.
7. **npm only.** Use npm and npm lockfiles. Do not introduce Bun or Yarn.
8. **Secure by default.** Do not commit tokens, credentials, private keys, user files or untrusted generated payloads. Use least-privilege workflow permissions and OIDC publishing where supported.
9. **Honest security status.** Do not promise that every vulnerability can be eliminated. The release gate is no untriaged critical/high findings, all actionable findings fixed or formally accepted, and documented residual risks.
10. **Release is last.** No stable npm publication or production-ready claim until all mandatory gates pass on the exact release candidate SHA.

## 3. Current repository baseline

- 29 standalone bundles, 30 custom-element tags, 29 dedicated demos, 29 component API guides.
- Seven components described in the repository as the original mechanical family, plus 22 utility components.
- Existing canonical metadata, build and docs generators, validators, integrity checks, Chromium interaction tests and clean registry consumer tests are valuable foundations.
- The prior roadmap records Phase 0 gallery stabilization and Phase 1 source/API contract audit as complete; Phase 2 functional regression is in progress; visual, accessibility, browser and release work remains open.
- Current root package manifest is private at `0.0.0-private`. The repository does not yet provide the VFX-style public npm package.
- The current release checklist is still unchecked. It must remain NO-GO until the complete programme passes.
- Reported defects: original four not working, additional components not behaving correctly and multiple gallery/component cards not rendering correctly. Exact root causes have not been independently reproduced in this planning change.

Historical Phase 0/Phase 1 completion does not automatically satisfy the new per-component acceptance gates below. The new programme adds stricter, separately evidenced component batches.

## 4. Sequential implementation phases

The phases below are ordered. Work may not skip ahead to package publication while component batches are failing. Each component batch closes its own gate before the next starts.

| Phase | Scope | Components / deliverables | Must be true before moving on |
|---|---|---|---|
| 0 | Reproduce, freeze and baseline | Identify original four from history; capture current/reference visuals; create defect ledger; inventory all 29 bundles, 30 tags, demos, guides and registry entries; capture failing browser traces | Each known report has reproducible steps, expected result, severity, source path and regression-test plan |
| 1A | Original component audit 1 | Toggle | Original design and behavior restored; isolated + gallery tests, visual review, API guide, skill resources and evidence complete |
| 1B | Original component audit 2 | Slider | Same full per-component gate; Phase 1A remains green |
| 1C | Original component audit 3 | Plunger | Same full per-component gate; reduced-motion and send lifecycle verified |
| 1D | Original component audit 4 | Stepper | Same full per-component gate; original mechanical behavior preserved |
| 2A | Remaining mechanical batch | Targets and Drain | Both components pass independently and together; forms, selection, undo/commit timing and lifecycle covered |
| 2B | Remaining mechanical batch | Bumper bundle: pinball-bumper and pinball-bumpers | Both tags, hit feedback, score/combo behavior, keyboard, events and standalone use pass |
| 3 | Selection utility batch | Checkbox, Radio Group, Segmented | Native selection semantics, keyboard navigation, form values, focus, disabled and boundary states pass |
| 4 | Indicator utility batch | Progress, Meter, Rating | Value semantics, ARIA, read-only/input distinctions and animation behavior pass |
| 5 | Navigation utility batch | Tabs, Accordion, Disclosure | Focus models, selected/open states, slots/content, events and keyboard behavior pass |
| 6 | Feedback utility batch | Tooltip, Dialog, Toast | Focus/dismissal, modal behavior, Escape, live announcements, timers and disconnect/reconnect pass |
| 7 | Navigation/data batch | Breadcrumbs, Pagination, Search | Navigation semantics, current state, search input/submission and boundary behavior pass |
| 8 | Form controls batch | Text Field, Text Area, Select | Labeling, form association, value synchronization, constraints, reset, validity and keyboard behavior pass |
| 9 | Advanced input batch | Combobox, File Drop, Date Picker, Color Picker | Editable selection, file safety, native date/color behavior, forms, keyboard and invalid states pass |
| 10 | Shared runtime audit | `core.js`, PinballKit, `tools/extra-core.js`, PinmotionExtras, source generators, sounds and art | Scheduling, cleanup, singletons, WebGL context loss/fallback, audio permissions, reduced motion, errors and bundle duplication are tested and documented |
| 11 | Gallery and demo audit | All 29 gallery cards, filters, search, 29 demo routes, responsive layouts, loading/error states | Every card renders the correct component and state; isolated demo/gallery parity and broken-component fault isolation pass |
| 12 | Documentation and skills completion | Root README, 29 component guides, docs hub, architecture, design system, API conventions, runtime/asset docs, llms.txt and skills | Every public claim matches source and passing tests; examples run; every component has complete documentation |
| 13 | TypeScript and framework integration | Type declarations, browser-only entry docs, React/Vue examples or wrappers only if implemented, SSR guidance | Type checks and consumer examples pass; unsupported frameworks are clearly labelled |
| 14 | npm package implementation | `package.json`, lockfile, root entry, per-component entry points/exports, package allowlist, CDN/subpath contract | `npm pack` and clean offline/online consumer tests pass; root and every subpath registers expected tags |
| 15 | Security and supply-chain hardening | Security policy, threat model, CodeQL, dependency review/audit, secret scanning, Gitleaks, Scorecard, license/asset audit, workflow hardening | No untriaged critical/high issue; actionable issues fixed or accepted; least-privilege and supply-chain checks pass |
| 16 | Accessibility completion | WCAG 2.2 AA review, names/roles/values, keyboard, focus, contrast, zoom, reduced motion and screen reader tests | Automated and manual evidence is recorded; limitations are explicit; no unsupported compliance claim |
| 17 | Cross-browser/device compatibility | Chromium, Edge, Firefox, Safari, Android Chrome, iOS Safari, WebGL/audio variations | Supported browser/device matrix has reproducible pass evidence and known limits |
| 18 | Performance and reliability | Bundle budgets, WebGL/audio assets, initial render, gallery readiness, memory, lifecycle stress, long-running tests, regression screenshots | Budgets defined and met; no known release-blocking defects; regression artifacts archived |
| 19 | Release candidate and publication | Changelog, semver, release notes, exact SHA validation, npm OIDC/trusted publishing, provenance, GitHub Release, tarball/checksum, rollback and post-publish smoke | Exact candidate passes all gates; public install works; release and live gallery verified |

### Phase discipline

- Phase 0 is the only discovery/baseline phase.
- Phases 1A–9 are the component repair programme. They run in the listed order, not as one mega-audit.
- A component batch that fails is reopened and fixed before the next batch starts.
- Runtime and gallery phases may reveal regressions. Those regressions return to the affected component phase and must be retested there.
- Documentation and the component skill are updated during every component batch, not postponed until the end. Phase 12 consolidates and verifies the complete system.
- Security and CI basics should be introduced early enough to protect ongoing work. Phase 15 completes and audits the full supply-chain/security programme.
- Phase 19 is the only phase allowed to publish a stable package.

## 5. Mandatory per-component audit checklist

Every component in Phases 1A–9 must have a completed, dated row for every applicable item below.

### A. Visual identity and rendering
- Compare against approved original artwork/reference, not a generic replacement.
- Verify default, hover, focus, pressed/active, selected/on, disabled, invalid, boundary, loading and settled/animated states as applicable.
- Inspect desktop 1440 CSS px, tablet 768 CSS px and phone 390 CSS px.
- Check dimensions, alignment, type, contrast, shadows, material, lamps, chrome ball, labels, icons, spacing and responsive behavior.
- Check no clipping, overlap, blank canvas, missing image, broken audio asset, layout shift or horizontal overflow.
- For WebGL controls, test renderer-on, renderer-unavailable and context-lost behavior.

### B. Functional/API contract
- List exact tag names and prevent duplicate custom-element registration.
- Record observed attributes, defaults, types, coercion, reflection and attribute-removal behavior.
- Verify each public property getter/setter, method, argument and return value.
- Verify exact event names, detail payloads, event count/order, bubbling/composed flags and event suppression rules.
- Test valid, invalid, empty, min/max, out-of-range, rapid and repeated interactions.
- Test pointer, touch, keyboard and programmatic interaction independently.
- Test disabled/read-only, focus entry/exit, reconnect and duplicate bundle loading.

### C. Forms and browser semantics
- Test name/value in FormData and required/disabled semantics.
- Verify native validity, checkValidity/reportValidity, custom validity and invalid events where applicable.
- Verify disabled fieldsets, form reset, state restoration and submission values.
- Do not promise native form association where a browser does not support the required ElementInternals capability; document and test the fallback.

### D. Lifecycle and reliability
- Disconnect during an active animation, timer, observer, drag, audio playback or pending callback.
- Reconnect and verify behavior is restored exactly once.
- Ensure no stale timeout, animation frame, observer, event listener or audio node continues unnecessarily.
- Ensure one failing component does not prevent independent gallery cards/components from initializing.
- Test isolated script inclusion and mixed runtime load order.

### E. Accessibility
- Accessible name, role, value, description, checked/selected/expanded/disabled state.
- Visible focus, logical focus order, target sizing and keyboard-only operation.
- Focus management/restoration for overlays.
- Status/live-region announcements for dynamic outcomes.
- Reduced-motion before load and after preference changes.
- Manual screen reader testing where applicable.

### F. Documentation and skills
- Update the component README from the real API, not assumptions.
- Include installation by standalone script and (when available) npm subpath.
- Include exact attributes/defaults, properties, methods, events/payloads, CSS properties, slots, forms, keyboard behavior, accessibility, browser limitations and troubleshooting.
- Provide at least one working minimal example and one realistic use case.
- Update component inventory, llms.txt, skill resources and relevant examples.
- Run documentation parity checks after generation.

### G. Evidence
- Link defect IDs, source files, test file, CI run and commit SHA.
- Attach before/after screenshots for visual changes.
- Record browser/device/version and viewport.
- Show pass/fail counts. Never turn a pending or skipped test into a pass.

## 6. Documentation and skill deliverables

### Root files
- `README.md`: what the package is, component catalogue, install/use examples, browser requirements, design/runtime overview, test commands, accessibility limits, current release status.
- `CHANGELOG.md`: dated semver changes.
- `CONTRIBUTING.md`: local setup, component workflow, tests, screenshots and PR evidence.
- `CODE_OF_CONDUCT.md`.
- `SECURITY.md`: private reporting, supported versions and response expectations.
- `SUPPORT.md`: usage help and reproducible bug reports.
- `LICENSE`: MIT, Copyright (c) Brajesh Kumar.
- `CITATION.cff`: citation metadata if appropriate.
- `llms.txt`: current machine-readable package and component index.

### docs/
- `README.md` documentation hub.
- `PROJECT-REFERENCE.md` architecture and canonical source map.
- `COMPONENTS.md` generated index of all 29 elements.
- `API-CONVENTIONS.md` public API and event rules.
- `ARCHITECTURE.md`, runtime diagrams, generator and build flow.
- `RUNTIME.md`, `ASSET-PIPELINE.md`, sound/art provenance.
- `VISUAL-DESIGN-SYSTEM.md`, `ANIMATION-DESIGN-SYSTEM.md`.
- `TESTING.md`, `ACCESSIBILITY.md`, `BROWSER-COMPATIBILITY.md`.
- `PACKAGE.md`, `PERFORMANCE.md`, `SECURITY.md`, `TROUBLESHOOTING.md`.
- `QUALITY-AND-RELEASE.md`, `PHASE-ACCEPTANCE-MATRIX.md`, `RELEASE-CHECKLIST.md`.
- `quality/DEFECT-REGISTER.md`, `quality/VISUAL-BASELINE.md`, `quality/COMPONENT-AUDIT-MATRIX.md` and CI evidence index.

### Per-component folders
Every one of the 29 folders must include:
- A README with the complete actual API and examples.
- A standalone demo page that loads the correct local bundle.
- Working cross-links to source and main gallery.
- The documented browser limitations and accessibility contract.
- Where code is generated, a visible source-of-truth/generation note.

### Skills
- `skills/pinmotion-ui/SKILL.md`: project orientation, installation, component selection, API rules, design system, build/test workflow and release status.
- `skills/component-authoring/SKILL.md`: authoring checklist and component template.
- `skills/component-audit/SKILL.md`: reproducible visual/API/form/accessibility/lifecycle audit.
- `skills/pinmotion-debugging/SKILL.md`: WebGL, audio, custom elements, gallery, forms, runtime and lifecycle diagnosis.
- `skills/release-security/SKILL.md`: package verification, vulnerability workflow and release evidence.
- Shared skill resources: API conventions, visual tokens, runtime design, component audit matrix, test commands and examples.

All component skills and their documentation are reviewed as part of the relevant component phase. The skill must instruct agents to edit canonical source files and regenerate generated output.

## 7. GitHub Actions and repository workflow programme

Pinmotion must have a workflow suite comparable in purpose to VFX UI Anime. Existing workflows must be reviewed and upgraded; duplicate workflows should be consolidated where they perform the same job.

| Workflow / file | Trigger | Responsibility and mandatory gates |
|---|---|---|
| `.github/workflows/validate.yml` | Pull requests, main pushes, manual | npm ci; Node/npm version; source syntax; build/docs parity; validator/integrity; focused component tests; full Chromium tests; clean consumer; fail on console/runtime/network errors |
| `.github/workflows/component-regression.yml` | Component source/spec/demo/docs changes | Detect changed component IDs; run relevant isolated tests and shared-runtime regression tests; report exact component matrix |
| `.github/workflows/visual-regression.yml` | Pull requests and manual | Capture 1440/768/390 screenshots; upload artifacts; compare only against approved baselines; never auto-approve changed baselines |
| `.github/workflows/deploy-pages.yml` | Main push or controlled manual release | Separate build/artifact and deploy jobs; verify artifact identity; deploy; check homepage/gallery/all demos/all bundles/registry; live Chromium hard reload; retain screenshots |
| `.github/workflows/codeql.yml` | Push, PR, schedule | JavaScript/TypeScript CodeQL static analysis; least-privilege security-events permissions |
| `.github/workflows/codeql-alert-inventory.yml` | After successful CodeQL, scheduled/manual | Export and archive open code scanning alert inventory; do not call zero findings unless the artifact proves it |
| `.github/workflows/dependency-review.yml` | Pull requests | Review introduced dependency licenses and known vulnerabilities; currently no third-party runtime dependencies is not a reason to skip future checks |
| `.github/workflows/security-audit.yml` | PR, main, schedule | npm audit, lockfile checks, secret scanning/Gitleaks supplemental scan, license and asset-provenance checks |
| `.github/workflows/scorecard.yml` | Default-branch push, schedule | OpenSSF Scorecard report and SARIF/artifact; track branch protection, permissions, pinned dependencies and token scope |
| `.github/workflows/package-smoke.yml` | PR, main, release candidate | npm pack dry run; inspect allowlisted tarball; install tarball into clean consumer; test root import and each of the 29 component subpaths in Chromium |
| `.github/workflows/release.yml` | Release-candidate branch/tag and manual approval | Verify exact candidate SHA, complete gates, build source-only GitHub pre-release or RC; never publish npm from an unapproved candidate |
| `.github/workflows/publish.yml` | Protected stable version tag | Verify semver/tag/main ancestry; npm trusted publishing/OIDC and provenance where supported; npm staged approval if configured |
| `.github/workflows/publish-github-package.yml` | Stable version tag, optional | Only add if a separate GitHub Packages distribution is deliberately required. It must not silently repoint the npmjs package or create a second confusing source of truth |
| `.github/workflows/post-release.yml` | Successful publication | npm view/install from public registry; verify version, dist-tag, provenance and tarball; run live gallery and component URL smoke tests; attach evidence |
| `.github/workflows/scorecard.yml` | Default branch, schedule | Preserve report artifact and actionable findings |
| `.github/workflows/generate-components.yml` | Explicit/manual or controlled source changes | Generate source bundles, docs, demos, gallery and registry; run parity; create a clear generated-change PR or a safe commit strategy. Avoid races with deploy and validate jobs |

### Workflow engineering requirements

- Pin third-party GitHub Actions to full commit SHAs for hardened release/security workflows, with update automation and readable version comments.
- Use explicit minimal permissions at workflow and job level.
- Use `persist-credentials: false` when checkout does not require authenticated git pushes.
- Separate build, artifact upload, deployment and live verification.
- Do not let a successful static file upload imply live functionality.
- Avoid workflow loops where generation commits re-trigger themselves endlessly.
- Make all release-critical jobs required branch-protection checks once the maintainers configure branch protection.
- Retain test/screenshot/security artifacts with sensible retention.
- Never echo secrets or expose environment values in logs.
- Use environment approval for publication and protected release environments.
- Test failure paths, not just green paths.
- Use OIDC for npm trusted publishing where the npm account supports it; do not hardcode npm tokens into workflow YAML.
- Keep GitHub Packages optional unless there is a concrete distribution requirement.

### Repository governance assets
- `.github/pull_request_template.md`.
- `.github/ISSUE_TEMPLATE/bug_report.yml`.
- `.github/ISSUE_TEMPLATE/feature_request.yml`.
- `.github/ISSUE_TEMPLATE/config.yml`.
- `.github/CODEOWNERS` if code ownership is useful for this single-maintainer project.
- Branch protection/ruleset configuration requiring Validate, security and package checks before merge.
- Private vulnerability reporting enabled in repository settings where GitHub supports it.

## 8. npm package and public usage contract

Target install:

```bash
npm install pinmotion-ui
```

Register all browser custom elements:

```js
import 'pinmotion-ui';
```

Register one component:

```js
import 'pinmotion-ui/toggle';
```

Implementation requirements:
- Root aggregate browser entry exports frozen version, component names and tag metadata if useful.
- Each component has a stable subpath and registers only its own tag(s).
- `package.json` has correct `exports`, `files`, `sideEffects`, `type`, browser/ESM fields, repository/homepage/bugs/license/engines and `publishConfig`.
- No unsupported CommonJS, SSR, React or Vue support claims.
- Document browser-only registration, custom-element side effects, duplicate registration strategy and loading timing.
- Include component README/API docs in the package tarball.
- Exclude tools, tests, CI, unpublished source data and large demo media unless required at runtime.
- `npm pack --dry-run --json` output must be inspected by an automated test.
- Install the packed .tgz in an empty consumer and test all exports and actual component registration in Chromium.
- Include CDN version-pinned module usage where supported.
- Release semver and changelog must match the Git tag and npm version.

## 9. Security and supply-chain requirements

- Create a realistic threat model for browser-executed custom elements and their build/release pipeline.
- Keep user-provided text as text. Sanitize HTML only where rich HTML is an explicit feature.
- File Drop may expose File objects to consumer code but must not upload, execute or automatically open files.
- Validate URLs, attribute content, SVG/media sources, dynamic selectors, CSS injection paths and DOM construction.
- Review shader and WebGL error handling; do not leak unbounded GPU resources.
- Audit recorded sounds, photographs, generated images and fonts for provenance and licensing.
- Use CodeQL, dependency review, npm audit, secret scanning, supplemental Gitleaks, license audit and OpenSSF Scorecard.
- Review GitHub Actions pinning, workflow permissions, branch protections, tag protections, release environment approvals and artifact integrity.
- Scan source and release tarball; scan git history if credentials/assets were ever committed.
- Establish responsible disclosure instructions and supported-version policy.
- Generate provenance/attestation where supported; verify it after publication.
- No untriaged critical/high vulnerability may remain at release. Medium/low issues require a documented disposition.

## 10. Release checklist

A stable release is NO-GO until all items pass on one frozen release-candidate SHA:

- [ ] All 29 components have per-component audit evidence.
- [ ] Original four are restored and visually approved against their baseline.
- [ ] All 30 custom-element tags register without collisions.
- [ ] All 29 component demos and gallery cards are correct.
- [ ] All per-component README/API docs and skill references match the implementation.
- [ ] All generated bundles, docs, demos, registry and llms.txt are in parity.
- [ ] Root and all subpath imports work from the actual npm tarball in a clean consumer.
- [ ] Automated Chromium tests pass; supported Firefox/WebKit/browser/device matrix evidence is recorded.
- [ ] Manual accessibility and real assistive-technology evidence is recorded.
- [ ] Performance and bundle budgets pass.
- [ ] Security checks pass and residual risks are documented.
- [ ] License and asset provenance checks pass.
- [ ] Branch protection and required workflows are configured.
- [ ] Changelog, semver, migration notes, support policy and known limitations are ready.
- [ ] npm publishing uses protected OIDC/trusted publishing where supported.
- [ ] GitHub Release includes source SHA, package archive and checksums.
- [ ] Post-release npm install, metadata/provenance and live gallery smoke checks pass.
- [ ] Rollback, deprecation and security response procedures are documented.

## 11. Progress reporting after every phase

Every progress update must use this structure:

| Field | Required report |
|---|---|
| Phase | Exact phase and batch ID |
| Scope | Components and subcomponents in this batch only |
| Defects | Issue IDs, reproduction, root cause and fix |
| Source changes | Exact canonical source/runtime/spec files |
| Generated changes | Bundles, demos, gallery, registry and docs regenerated |
| Tests | Commands, browser versions, pass/fail counts and skipped tests |
| Visual evidence | Screenshot links and viewport details |
| Documentation | Component README/API, root docs and skills changed |
| Security | Findings and remediation/accepted residual risks |
| Git | Branch, commit SHA and PR URL |
| Exit decision | Pass / Fail / Blocked, with exact unmet criteria |
| Next phase | The next batch only |

Do not say "complete" without evidence. Do not skip ahead because a phase is taking longer than expected. A failing batch is fixed first.
