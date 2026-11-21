# Pinmotion UI release-readiness programme

> **Status: planning baseline only. No stable-release approval is implied by this document.**
> Baseline branch: `main` · Planning branch: `release-readiness/roadmap` · Date: 21 November 2026
> Maintainer: Brajesh Kumar

This programme brings Pinmotion UI to the engineering, documentation, security, distribution and release standard established in VFX UI Anime, while preserving Pinmotion's own product identity and WebGL/audio architecture.

## Product goals

1. Restore the original four reference components to their intended visual design and fully working behavior. Preserve their appearance and interactions as the acceptance baseline; do not replace them with generic controls.
2. Audit and repair every existing component, demo, gallery card, source file, generated bundle, guide and registry entry.
3. Preserve the two runtime families where justified: PinballKit for the original mechanical/WebGL/audio components and PinmotionExtras for lightweight native controls. Improve their lifecycle, loading, error isolation and distribution contracts.
4. Deliver a real public npm package with aggregate and per-component imports, package tarball verification, safe prepublish gates and versioned releases.
5. Establish documented security, accessibility, browser, visual, performance and release processes.
6. Make all claims evidence-based. A folder, successful build or HTTP 200 is not behavioral proof.

## Non-negotiable engineering rules

- Preserve the original visual identity and intended mechanics of the original four components. Capture baseline screenshots and behavior before modifying them.
- Fix the source of truth, then regenerate bundles, demos, guides, gallery and registry. Never patch generated bundles manually unless the file is explicitly the source.
- No new component expansion until the current catalogue passes the relevant quality gates.
- No stable npm publication or production-ready claim while any mandatory release gate is open.
- No secrets or credentials in source, workflows, examples, issue comments or artifacts.
- Use npm only for package commands and lockfiles. Do not introduce Bun or Yarn.
- All component documentation must distinguish tested facts, browser-dependent behavior, known limits and unverified claims.
- All phase completion must be backed by CI artifacts, reproducible test output or dated manual QA evidence.
- Security fixes must be prioritized by severity and verified after remediation. Never promise that all vulnerabilities can be eliminated; record residual risk.

## Current baseline

- 29 standalone bundles, 30 custom-element tags, 29 demos, 29 generated component guides.
- Seven original mechanical bundles and 22 lightweight utility bundles.
- Phase 0 and Phase 1 are recorded as complete.
- Phase 2 is incomplete. Phase 3 and Phase 5 are not started. Phase 4 remains in progress.
- Package manifest is private (`0.0.0-private`), with no supported public npm installation command yet.
- Existing validation, contract-audit, integrity, Chromium interaction and clean-registry-consumer tooling is a foundation, not release certification.
- The original four components reported as not working and multiple visual rendering issues are priority defects to reproduce and resolve. Their exact failures must be captured in the Phase 0/1 baseline rather than guessed.

## Phase programme

| Phase | Name | Scope | Exit gate |
|---|---|---|---|
| 0 | Reproduction, freeze and visual baseline | Identify original four, reproduce all reported defects, capture screenshots, record browser/console/network errors, create component inventory and risk register | Every known defect has a reproducible test case, expected reference behavior and owner/priority |
| 1 | Original four restoration | Repair original four from canonical source, preserve visual assets, proportions, mechanics, animation, audio and responsive behavior | Four components pass individual demo and gallery tests, desktop/mobile visual review, keyboard/pointer/touch and regression snapshots |
| 2 | Remaining original mechanical controls | Audit Toggle, Slider, Plunger, Stepper, Targets, Drain and Bumper (including both bumper tags), PinballKit and shared assets | All original family controls work independently and together, all states/events/forms/lifecycle covered |
| 3 | Utility components, batch A | Checkbox, Radio Group, Segmented, Progress, Meter, Rating, Tabs, Accordion | Every component passes visual/API/interaction/form/accessibility contract |
| 4 | Utility components, batch B | Disclosure, Tooltip, Dialog, Toast, Breadcrumbs, Pagination, Search | Every component passes visual/API/interaction/focus/timer/lifecycle contract |
| 5 | Utility components, batch C | Text Field, Text Area, Select, Combobox, File Drop, Date Picker, Color Picker | Every component passes validation, form, keyboard, file safety, visual and lifecycle contract |
| 6 | Runtime and asset engineering | PinballKit, PinmotionExtras, WebGL fallback, shader/context loss, audio permission/mute, scheduling, cleanup, optional shared-runtime design, asset optimization | Runtime contracts stable; no leaked listeners/timers/observers/frames; measurable size/performance budgets pass |
| 7 | Design-system and gallery audit | All 29 cards, category filters, search, responsive grid, detail views, individual demo pages, original pinball visual identity, error/empty/loading states | 29/29 cards correct, every demo visually approved at defined viewports, gallery failure isolation proven |
| 8 | Complete component documentation and skill system | 29 component README/API guides; root README; architecture; runtime; design system; asset pipeline; API contracts; examples; troubleshooting; llms.txt; skills/SKILL.md and skill resources | Docs generated from source where appropriate, every public contract matches tested source, examples executed in clean consumers |
| 9 | TypeScript and framework integration | Type declarations, plain HTML examples, React integration guidance/wrapper decision, Vue and other framework examples, SSR/client-only guidance | Type checks and clean example apps pass; supported integration scope is explicit |
| 10 | npm package and distribution | package manifest, root index, per-component exports, subpath exports, files allowlist, versioning, npm pack inspection, offline/clean consumer install, CDN paths | npm tarball includes all required component scripts/docs and excludes dev tooling; root and every subpath import pass in browser |
| 11 | Security and supply-chain hardening | threat model, CodeQL, dependency audit, secret scanning, token permissions, workflow pinning, artifact integrity, license audit, provenance, OpenSSF Scorecard, vulnerability response | No untriaged critical/high findings; all actionable findings fixed or formally risk-accepted; least-privilege workflows pass |
| 12 | Accessibility and compatibility | WCAG 2.2 AA review, keyboard, focus, names/roles/values, screen readers, reduced motion, zoom/contrast, Firefox, Safari, Edge, Android and iOS | Automated and manual evidence per supported environment; no unsupported conformance claims |
| 13 | Performance, reliability and regression | Bundle budgets, startup/card timing, WebGL/audio budgets, asset transfer, memory/lifecycle stress, visual snapshots, fault isolation | Defined budgets pass under reproducible test environment; no known P0/P1 defects |
| 14 | Release operations and publication | Changelog, migration/version policy, contributor/security/support docs, CI release gates, npm Trusted Publishing, provenance, GitHub release/tarball/checksum, rollback and post-release smoke | Exact release SHA passes all gates, package installs publicly, release artifacts and live demos verified |

## Phase 0: defect reproduction and reference baseline

Create `docs/quality/DEFECT-REGISTER.md` and `docs/quality/VISUAL-BASELINE.md`.

For each issue capture:
- Component ID and custom-element tag.
- Exact page/URL and clean load conditions.
- Browser, version, OS, viewport, device scale and reduced-motion setting.
- Reproduction steps and actual result.
- Expected behavior/design reference.
- Console errors, failed network requests, registration status and relevant event trace.
- Screenshot/video before fix and after fix.
- Severity: P0 (data/security/crash), P1 (core interaction/render broken), P2 (significant visual/API/accessibility defect), P3 (minor polish).
- Source-of-truth file and test that will prevent recurrence.

Priority order: the user-reported original four; other broken original controls; component cards that render incorrectly; utility components; gallery-wide defects.

## Per-component quality contract

Every component must have a complete record covering:

1. Identity: public element tags, bundle/source file, demo route, guide, registry ID and category.
2. Visual design: approved states and screenshots at phone/tablet/desktop widths; no clipping, overflow, overlap, missing assets or generic fallback replacing intended artwork.
3. API: observed attributes, defaults, types, coercion, property getters/setters, methods, events and exact event detail shapes.
4. Interaction: pointer, touch, keyboard, programmatic API, disabled, focus, boundary, invalid and empty states.
5. Forms: name/value, FormData, required/min/max/type/step validity, disabled fieldsets, reset and restore where applicable.
6. Lifecycle: connect, disconnect during active animation/timer, reconnect, duplicate script inclusion, listener/timer/observer/frame cleanup.
7. Accessibility: accessible name, role, value/state, focus order, visible focus, keyboard, live announcements and reduced motion.
8. Runtime: WebGL available/unavailable/context lost, audio permitted/blocked/muted and fallback rendering where applicable.
9. Documentation: standalone installation, npm import, usage examples, attributes, properties, methods, events, CSS custom properties, accessibility, limitations and troubleshooting.
10. Evidence: component-specific automated tests, CI job/run, screenshot evidence and outstanding manual QA.

No component may be marked complete solely because its source exists, its demo returns HTTP 200 or its card appears.

## Documentation deliverables

### Root-level
- README.md with actual install, import, feature list, compatibility and honest release status.
- CHANGELOG.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, SUPPORT.md.
- LICENSE (MIT, Copyright (c) Brajesh Kumar), package metadata and citation metadata where appropriate.
- llms.txt and an up-to-date documentation index.

### docs/
- PROJECT-REFERENCE.md and architecture diagrams.
- COMPONENTS.md and generated full component inventory.
- PACKAGE.md, API-CONVENTIONS.md, TESTING.md, ACCESSIBILITY.md, SECURITY.md.
- VISUAL-DESIGN-SYSTEM.md, ANIMATION-DESIGN-SYSTEM.md, RUNTIME.md, ASSET-PIPELINE.md.
- BROWSER-COMPATIBILITY.md, PERFORMANCE.md, TROUBLESHOOTING.md.
- QUALITY-AND-RELEASE.md, PHASE-ACCEPTANCE-MATRIX.md, RELEASE-CHECKLIST.md.
- VISUAL-BASELINE.md, DEFECT-REGISTER.md and reproducible evidence index.

### Per-component
Every component folder must have an accurate README and working demo. Document all API members individually. Keep the generated/source distinction explicit.

### Skills
- `skills/pinmotion-ui/SKILL.md`: installation, component selection, API discovery, source editing, build, tests, design rules and release policy.
- A component-authoring skill with a checklist and template.
- A debugging skill for gallery, WebGL, audio, custom elements, forms and lifecycle.
- A release/security skill for package validation and release evidence.
- Resource files: canonical API conventions, visual tokens, component inventory, tested examples and test instructions.
- The skill must never tell an agent to edit generated bundles directly.

## npm package contract (target)

Target usage after release:

```bash
npm install pinmotion-ui
```

Register all elements in a browser-only entry point:

```js
import 'pinmotion-ui';
```

Register a selected component only:

```js
import 'pinmotion-ui/toggle';
```

Do not promise framework wrappers unless they are implemented and tested. The package must document SSR restrictions, side effects, browser requirements and WebGL/audio fallbacks. Root import and every component subpath must be tested from the packed tarball in a clean consumer, not just from the repository.

The final package must include package.json, root entry, component entry points, per-component READMEs, root README, license and package guide. It must exclude tooling, CI internals, gallery media not required by runtime, scratch files and secrets unless explicitly part of the distribution.

## Security programme

- Add SECURITY.md with supported versions, private reporting route and response expectations.
- Enable CodeQL JavaScript analysis and inspect all code-scanning findings.
- Add npm audit and dependency review (current project has no runtime third-party dependencies; do not add dependencies without review).
- Add secret scanning / push protection guidance and scan repository history when an incident warrants it.
- Run OpenSSF Scorecard and track actionable findings.
- Pin third-party GitHub Actions to full commit SHAs for hardened release workflows; enable minimal workflow permissions.
- Use OIDC Trusted Publishing for npm when account configuration supports it. Do not store long-lived publish tokens in repository secrets.
- Generate npm provenance where supported and verify provenance/attestations.
- Audit license and asset provenance, including embedded images and sound files.
- Validate user-controlled strings and HTML. File Drop reports File objects only; it must not upload or execute them.
- Add security test cases for unsafe HTML, URL handling, file types/limits, event injection, prototype/DOM clobbering and CSP compatibility where relevant.
- Do not claim "zero vulnerabilities" without a dated scan and evidence. Record accepted residual risks.

## CI quality gates

Pull requests and main pushes should run:
1. npm ci and source syntax checks.
2. Build and generated-output parity checks.
3. Documentation and registry parity.
4. Static repository/integrity checks.
5. Component contract audit.
6. Chromium interaction suite at desktop and mobile viewports.
7. Clean bundle consumer and npm tarball smoke tests.
8. Accessibility automation.
9. Dependency, secret, CodeQL and license checks.
10. Visual screenshot artifact generation and regression review.
11. Performance/bundle budget checks.
12. Firefox/WebKit tests in the compatibility phase.

A failing mandatory gate must block release. A manual QA task cannot be marked passed by an automated job.

## Release gates

- Package version, npm version and Git tag must match.
- Release commit must be reachable from main.
- Release validation must run against the exact tagged SHA.
- Build and generated files must be clean.
- All component acceptance rows must be closed or explicitly accepted as non-blocking.
- No open P0/P1 issue; no untriaged critical/high security finding.
- Package tarball and checksums must be archived.
- npm publication must use protected OIDC/trusted publishing when configured.
- GitHub Release must link changelog, installation commands, supported browsers and known limitations.
- Post-publication npm view/install and live-gallery smoke tests must pass.
- Rollback/yank/deprecation procedures must be documented.

## Progress reporting format

After each implementation batch, report:
- Phase and sub-phase.
- Exact components/files changed.
- Defects fixed and root causes.
- Tests run with pass/fail counts and exact commit/run references.
- Visual evidence.
- Documentation/skill files updated.
- Remaining defects and next batch.
- Phase status: Not started / In progress / Blocked / Complete.

Never report phase completion without the exit gate evidence above.
