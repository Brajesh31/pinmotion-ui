# 🚦 Pinmotion UI release plan

> **Plan owner:** Brajesh Kumar  
> **Planning baseline:** 21 November 2026  
> **Repository:** `Brajesh31/pinmotion-ui`  
> **Current branch:** `main`  
> **Release status:** **NO-GO · NOT RELEASED**  
> **Release version:** Not assigned. The private `0.0.0-private` package version must remain private until the release gates are passed.

This is the controlling plan from the current development state through the first stable release and post-release maintenance. The order is intentional. New component work, marketing and release packaging must not jump ahead of reliability, correctness, accessibility and compatibility work.

The 29 existing component bundles are the product baseline, not a release-readiness score. The target inventory is 7 original mechanical bundles, 22 utility bundles, and 30 custom-element tags.

## 1. Release policy

**No stable release, public version tag, npm publication, or “production-ready” claim is allowed until every mandatory pre-release phase and every release gate in this document has passed.**

The hosted GitHub Pages site is a development preview while this plan is open. A successful Pages deployment only proves that the static artifact was deployed. It does not equal product approval or a stable release.

A phase can be marked complete only when:
- The work is implemented in the canonical source files.
- Generated output is committed and is in parity with its generator.
- Automated tests pass.
- The relevant real-browser or manual tests pass.
- Documentation and known limitations are updated.
- Evidence is linked from the phase tracker.

Do not mark work complete because a source file exists, a workflow ran, or a page returned HTTP 200.

## 2. Current critical incident

### INC-001 · Gallery never leaves “Loading component catalogue…”

**Severity:** Release blocker  
**Status:** Fix committed, automated verification in progress

**Root cause:** The gallery generator emitted JavaScript object properties using raw component IDs. Several IDs contain hyphens, including `radio-group`, `text-field`, `text-area`, `date-picker`, `color-picker`, and `file-drop`. Those unquoted keys make the entire inline gallery runtime invalid JavaScript. The browser stops before the code that creates the cards can execute.

**Changes now committed for verification:**
- The generator now serializes each wire-map key as a quoted JavaScript string.
- The gallery has an early startup monitor. Script load errors, runtime errors, rejected promises and a stalled bootstrap update the status instead of leaving an infinite loading message.
- The validator parses the generated inline gallery runtime with Node's JavaScript parser.
- The browser interaction suite checks first-load card count, successful component initialization and registration of all 30 custom-element tags.

**Acceptance evidence still required:**
- [ ] Current `npm run check` passes on the latest commit.
- [ ] Current static-server smoke test passes.
- [ ] The real Chromium test confirms 29 cards appear on first load.
- [ ] Every card has `data-load-state="ready"`.
- [ ] The gallery reports all 29 components loaded.
- [ ] All 30 custom-element tags are registered.
- [ ] Browser console has no uncaught startup errors.
- [ ] The published GitHub Pages gallery is checked after deployment, with a hard refresh and a direct URL load.

Do not close INC-001 until all boxes above have evidence.

## 3. Phase roadmap

### Phase 0 · Stop the gallery boot failure and stabilize the preview
**Status: In progress · implementation committed, end-to-end proof pending**

Implemented in the current source:
- [x] Quote component IDs when generating the gallery wire-map properties.
- [x] Add a visible startup failure monitor for script load errors, runtime errors, rejected promises and a stalled bootstrap.
- [x] Add a Node parser check for the generated gallery runtime.
- [x] Add first-load browser assertions for all 29 cards, every card's ready state and all 30 registered tags.
- [x] Make the Chrome browser suite a mandatory Validate workflow step.
- [x] Keep the source generator and checked-in gallery output aligned.

Still required:
- [ ] Latest Validate workflow passes, including the real-browser suite.
- [ ] Latest Pages generation/deployment workflow passes.
- [ ] Verify the published gallery on a real browser with a hard refresh and direct URL entry.
- [ ] Verify no original component regressed when all 29 bundles load together.
- [ ] Close both INC-001 and INC-002 with linked test/deployment evidence.

Exit gate:
- All 29 gallery cards render and initialize on first load.
- The status reaches “All 29 live components loaded successfully.”
- All 30 custom-element tags are registered.
- No startup console errors or missing component scripts remain.
- No original component is removed or visually regressed.
- Latest CI and Pages workflows pass.

### Phase 1 · Complete inventory and component contract audit
**Status: In progress · complete inventory and static source-to-contract audit verified; detailed behavior and compatibility review outstanding**

Completed in this phase:
- [x] Inventory all 29 component bundles, 30 custom-element tags, 29 dedicated demos, 29 component guides, and 29 registry entries.
- [x] Generate a detailed component inventory from `tools/spec.mjs` and `tools/extras-spec.mjs`.
- [x] Preserve the original seven mechanical controls as a separate runtime and visual family.
- [x] Document the 22 lightweight utility controls and their separate PinmotionExtras runtime.
- [x] Verify all source custom-element registration names and uniqueness against the API metadata.
- [x] Compare every source `observedAttributes` declaration with the attributes documented as observed.
- [x] Verify documented property names and public method names are present in each implementation.
- [x] Compare documented custom-event detail key sets with source payload objects, including shorthand properties, duplicate `hit` events, empty details, and Toggle's plain `input` event.
- [x] Compare API form-association claims with executable `static formAssociated = true` declarations and the presence of component form-value methods.
- [x] Check each component source, generated bundle, demo, guide, and registry entry for presence and linkage.
- [x] Integrate the source-to-contract audit into the mandatory repository validation workflow.

Static audit evidence:
- Component contract audit: **424 checks passed, 0 failed** on commit `dea5484f5beae9d34a34515b614acd0255938278`.
- Full validation: **608 checks passed, 0 failed** on the same commit.
- Headless Chromium suite: `all passed`, including the 29-card first-load check and all 30 custom-element registrations.

Still required:
- [ ] Verify exact attribute defaults, reflection, connection-time configuration, and update timing against implementation.
- [ ] Verify property accessors, method parameter defaults, return values, and programmatic event behavior.
- [ ] Verify event ordering, bubbling/composed behavior, and dispatch conditions through implementation review and interaction evidence.
- [ ] Verify keyboard navigation and pointer/touch behavior for every component.
- [ ] Verify form values, constraint validation, reset, state restore, and disabled behavior for every applicable component in supported browsers.
- [ ] Review styling hooks, responsive limits, WebGL fallback, audio behavior, and reduced-motion statements against implementation.
- [ ] Confirm all 29 component demos initialize their own bundle independently, including the two bumper tags.
- [ ] Check mixed bundle order, shared-runtime reuse, and collision behavior in standalone demos and the full gallery.
- [ ] Test every registry entry from a clean consumer project.
- [ ] Complete manual review of all 29 component guides and record evidence for each contract.

Exit gate:
- One generated, source-controlled inventory covers all bundles, tags, demos, guides, and registry entries.
- CI checks every source registration, observed-attribute declaration, form-association declaration, documented member name, and event detail key against the specification.
- Every behavioral contract is verified against implementation and interaction evidence.
- No duplicate or missing tags, scripts, guides, demos, or registry entries remain.
- All unresolved contract discrepancies are fixed or explicitly documented and approved.
### Phase 2 · Functional correctness and regression coverage
**Status: Not started**

Scope:
- Test every control's default, changed, disabled, invalid, boundary and reset states where applicable.
- Test pointer, touch, keyboard and programmatic interaction separately.
- Verify event names, payload shapes, event timing and bubbling/composed behavior.
- Test form association, successful form submission, reset and validation behavior.
- Test timers, undo/commit paths, asynchronous transitions and cleanup.
- Test interactions when all 29 bundles are loaded together and when each bundle is used alone.
- Verify that an exception in one component does not prevent other cards from rendering.

Exit gate:
- Every documented interaction has an automated or explicitly recorded manual test.
- No known functional regression remains in the release scope.
- All original seven and all 22 utility components pass their behavior contracts.

### Phase 3 · Visual quality, interaction polish and design consistency
**Status: Not started**

Scope:
- Review all 29 demos and the complete gallery at desktop, tablet and phone widths.
- Check sizing, spacing, typography, contrast, iconography, focus rings and control states.
- Check the shared mechanical housing and original pinball artwork for consistent quality.
- Check loading, empty, disabled, error, success and focus states.
- Check long labels, translated text, narrow containers and content overflow.
- Check animation timing, layering, clipping, stacking contexts and reduced-motion behavior.
- Preserve the original seven's distinctive appearance. Do not flatten them into generic utility controls.

Exit gate:
- All cards and demo pages pass the same visual review checklist.
- No clipping, overlap, horizontal overflow or broken control state remains at supported widths.
- Approved screenshots exist for every component family and the complete gallery.

### Phase 4 · Accessibility audit and remediation
**Status: Not started**

**Target:** WCAG 2.2 Level AA for the complete project site and its documented interactive examples. This is a target, not a conformance claim. WCAG conformance applies to complete pages and responsive variants, not isolated controls. See the [W3C WCAG 2.2 Recommendation](https://www.w3.org/TR/WCAG22/).

Scope:
- Audit semantic HTML, accessible names, roles, states and relationships.
- Verify complete keyboard operation, logical focus order, visible focus and no keyboard traps.
- Verify screen-reader announcements for status, errors, dialogs, tabs, menus and dynamic changes.
- Verify color contrast, text resizing, zoom, reflow and target sizes.
- Verify reduced-motion behavior for every animated component, including the known Plunger exception.
- Verify form labels, instructions, errors and required states.
- Test representative combinations of NVDA with Firefox/Chrome, VoiceOver with Safari and TalkBack with Android Chrome.
- Provide equivalent usable behavior when WebGL or audio is unavailable.

Exit gate:
- All applicable A and AA criteria have been evaluated on complete pages and responsive layouts.
- Every defect is fixed and retested.
- An accessibility test report and honest conformance statement are published.
- No WCAG logo or conformance claim is used without evidence.

### Phase 5 · Responsive and browser compatibility
**Status: Not started**

Scope:
- Verify current stable Chrome, Edge, Firefox and Safari on desktop.
- Verify iOS Safari and Android Chrome on real devices.
- Cover touch, mouse, keyboard, pointer cancellation, orientation changes and high-DPI screens.
- Verify WebGL availability/failure paths and audio permission behavior.
- Check form-associated custom elements and ElementInternals support per target browser.
- Test direct routes, refreshes, relative asset paths and browser history.
- Publish a tested support matrix and explicitly identify unsupported browser behavior.

Exit gate:
- Every browser/device in the declared support matrix passes the agreed suite.
- Unsupported cases have a deliberate fallback or are clearly documented.
- No release-blocking browser-specific defect remains.

### Phase 6 · Performance, loading and runtime resilience
**Status: Not started**

Scope:
- Measure first render, time until all 29 cards are interactive, layout shifts and interaction latency.
- Measure each component bundle, shared runtime, artwork, shader and audio payload.
- Profile CPU/GPU usage, animation frame stability and memory after repeated interactions.
- Check long-session leaks, detached nodes, event listeners and timers.
- Check slow networks, offline state, cached responses and component script failures.
- Retain the requirement that the gallery loads the full component collection on initial visit, while measuring and optimizing that experience.
- Add budgets only after recording a repeatable baseline; enforce the approved budgets in CI.

Exit gate:
- Performance baselines and budgets are documented.
- No memory leak, runaway animation or unacceptable startup delay remains.
- Failure and fallback behavior has been tested under throttled and offline conditions.

### Phase 7 · Security, privacy and dependency governance
**Status: Not started**

Scope:
- Confirm no secrets, private data, tokens or local paths are committed.
- Run dependency and license checks; review every added development dependency.
- Keep the browser runtime dependency-free unless a documented decision approves otherwise.
- Validate all generated URLs, external links and HTML insertion boundaries.
- Review file upload examples to ensure no file is uploaded without an application's explicit request.
- Check GitHub permissions, Pages artifact paths, workflow concurrency and supply-chain pinning policy.
- Document supported security reporting and response process.

Exit gate:
- No unresolved high/critical security issue.
- Dependency, license and secret scans are clean.
- Workflow permissions follow least privilege.
- Privacy and data handling statements match actual behavior.

### Phase 8 · Documentation and learning experience
**Status: Not started**

Scope:
- Verify every API guide against real implementation and tests.
- Provide clear installation, setup, usage, events, styling, theming and troubleshooting examples.
- Document every page, route, demo, feature, interaction, supported state and limitation.
- Add examples for plain HTML, React, Vue and other supported consuming environments only when tested.
- Add migration guidance, FAQ, troubleshooting and common integration failures.
- Add diagrams and screenshots that represent the current implementation, not placeholders.
- Keep README, llms.txt, registry metadata and website copy aligned.

Exit gate:
- A new developer can discover, install, use, customize and troubleshoot the components using only the published documentation.
- All instructions and links are verified in a clean test project.

### Phase 9 · Developer experience and distribution readiness
**Status: Not started**

Scope:
- Test every registry install in a clean consumer project.
- Verify CDN and version-pinned script examples.
- Define semantic versioning and the compatibility/deprecation policy.
- Decide whether an npm package should be published. The current package is private and must stay private until that decision and package validation are complete.
- Verify package contents, file paths, license, metadata, release assets and checksums.
- Test integration recipes with supported frameworks.
- Define how consumers can report issues and request components.

Exit gate:
- At least one clean consumer install is tested end-to-end for each advertised distribution method.
- No install command or registry entry is published without a passing consumer test.
- Package metadata and license are final.

### Phase 10 · Automated quality gates and release engineering
**Status: Not started**

Scope:
- Make unit/contract, generated-file, JavaScript syntax, registry, integration and browser checks mandatory.
- Run the supported browser matrix in CI or attach reproducible manual test evidence where CI cannot run a device test.
- Add visual regression checks and review baselines for meaningful UI changes.
- Add accessibility and performance gates.
- Add dependency, license, secret and workflow validation.
- Ensure a failed check blocks deployment to the release environment.
- Test rollback from a known good release artifact.
- Generate release notes and a reproducible release artifact from a protected commit.

Exit gate:
- One documented CI pipeline provides a complete go/no-go decision.
- A deliberately broken gallery runtime, missing bundle or failing component test is shown to fail CI.
- No manual bypass can create a stable release without documented approval.

### Phase 11 · Private alpha and full product QA
**Status: Not started**

Scope:
- Test the full library as a maintainer and as a clean external consumer.
- Complete component-by-component manual QA.
- Verify all supported browser/device combinations.
- Review usability with developers unfamiliar with the codebase.
- Resolve every confirmed defect found in alpha.
- Re-run the entire suite after each fix.

Exit gate:
- No open P0, P1 or P2 defects.
- All known release-scope bugs are closed.
- Alpha sign-off is recorded with evidence.

### Phase 12 · Public beta and release-candidate hardening
**Status: Not started**

Scope:
- Publish a clearly labeled beta only after alpha exit criteria pass.
- Collect reproducible feedback and bug reports.
- Validate installation, compatibility, documentation and upgrade behavior.
- Fix all confirmed beta defects.
- Freeze feature additions while release blockers are being resolved.
- Produce a release-candidate build and test it from a clean environment.

Exit gate:
- No open release-scope defects.
- No unexplained console errors, 404s, broken demos or failing checks.
- Release candidate is reproducible from a specific commit.
- Maintainer approval is recorded.

### Phase 13 · Final release audit and go/no-go decision
**Status: Not started**

Run the complete release checklist in `docs/RELEASE-CHECKLIST.md`.

Mandatory release conditions:
- All previous phases have passed their exit gates.
- All 29 component bundles, 30 custom-element tags, 29 demos, 29 API guides and 29 registry entries are present and verified.
- The gallery first-load test proves all 29 cards render and initialize.
- Every supported browser/device test has a passing result.
- Accessibility, responsive, performance and security reports are reviewed.
- No open P0, P1 or P2 issues exist. No unresolved release-scope defect is knowingly shipped.
- Remaining platform limitations are documented, tested where possible and explicitly approved.
- Documentation, README, registry, llms.txt, package metadata and release notes agree.
- Rollback artifact and procedure are tested.
- A final release-candidate commit is frozen and approved.

**Any failed mandatory gate means NO-GO. Do not publish a stable version.**

### Phase 14 · Stable release and publication
**Status: Locked until Phase 13 passes**

Only after formal GO:
- Assign the stable version.
- Remove the private package flag only if npm publication has been approved and validated.
- Create the version tag and GitHub Release from the approved commit.
- Publish only the approved package/artifacts.
- Deploy the stable site and verify its routes, assets, gallery and registry.
- Publish release notes, installation instructions, compatibility matrix and known limitations.
- Announce the release only after the published build is verified.

### Phase 15 · Post-release maintenance
**Status: Locked until stable release**

- Monitor bug reports, install failures and compatibility reports.
- Triage issues by severity and publish fixes through the same gates.
- Maintain supported browser versions and dependency/security updates.
- Add new component requests to a prioritized backlog.
- Publish patch releases for defects and minor/major releases only under the versioning policy.
- Run a post-release review and update the roadmap based on evidence.

## 4. Known issue and risk register

| ID | Priority | Issue / gap | Required resolution | Current status |
|---|---|---|---|---|
| INC-001 | P0 | Gallery runtime did not parse because hyphenated wire keys were unquoted | Fix generator, add parse and real-browser first-load tests | Fixed; source parser, 29/29 first-load cards and 30/30 tag registration verified |
| INC-002 | P1 | Failed gallery bootstrap could leave an indefinite loading message | Add visible global error/stall diagnostics | Fix committed, awaiting full verification |
| QA-001 | P1 | Browser interaction suite was not a mandatory CI gate | Make browser tests a release gate | CI gate committed; final rerun pending |
| QA-002 | P1 | Full first-load gallery behavior was not asserted by browser tests | Test all 29 cards and 30 tags | First-load assertions passed; full suite rerun pending |
| QA-003 | P1 | Full cross-browser and real-device evidence is missing | Complete Phase 5 matrix | Open |
| A11Y-001 | P1 | WCAG 2.2 AA conformance has not been demonstrated | Complete Phase 4 audit and remediation | Open |
| A11Y-002 | P1 | Plunger reduced-motion behavior is a documented exception | Implement and retest a reduced-motion alternative | Open |
| A11Y-003 | P2 | Drop Targets bonus event differs under reduced motion | Align behavior or clearly define and test the event contract | Open |
| PERF-001 | P2 | Full-catalogue startup and asset budgets are not measured | Baseline and enforce approved budgets | Open |
| WEBGL-001 | P2 | Full non-WebGL visual fallback is not established | Implement accessible fallback or document tested support boundary | Open |
| DIST-001 | P1 | Consumer install and public package distribution are not release-tested | Complete Phase 9 | Open |
| DOC-001 | P2 | Some docs describe intended behavior without full browser/AT evidence | Match all claims to tests and publish support boundaries | Open |
| REL-001 | P1 | Final release governance and tested rollback are not complete | Complete Phases 10–13 | Open |

Priorities: P0 = immediate stop-ship; P1 = release blocker; P2 = must resolve before stable release; P3 = low-priority improvement. The stable release gate requires no open P0/P1/P2 defects in the release scope.

## 5. Release checklist ownership

The [release checklist](RELEASE-CHECKLIST.md) is the final sign-off document. It must be completed against one frozen release-candidate commit. Checklist entries must link to test logs, screenshots, reports or manual QA evidence.

## 6. Progress update rules

- Update phase status only when evidence exists.
- Record the commit SHA, workflow run, test report and screenshots where relevant.
- Keep failed runs visible and explain the failure instead of overwriting the history.
- Do not use “complete”, “production-ready”, “certified”, “fully accessible” or “released” without the corresponding evidence.
- Do not change the release version or publish a stable tag during open pre-release phases.
- Reassess this plan when a real defect or new platform constraint is discovered.

## 7. Official accessibility reference

- [W3C Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/)

The project uses WCAG 2.2 AA as a release target. It must not claim conformance until the complete site and every required responsive variation have been assessed.
