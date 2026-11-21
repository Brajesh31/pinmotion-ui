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
**Status:** Resolved and verified on `main` at `e94464445ec91cb4722f8e4e1328ffcff1467366` (21 November 2026)

**Root cause:** The gallery generator emitted JavaScript object properties using raw component IDs. Several IDs contain hyphens, including `radio-group`, `text-field`, `text-area`, `date-picker`, `color-picker`, and `file-drop`. Those unquoted keys make the entire inline gallery runtime invalid JavaScript. The browser stops before the code that creates the cards can execute.

**Changes now committed for verification:**
- The generator now serializes each wire-map key as a quoted JavaScript string.
- The gallery has an early startup monitor. Script load errors, runtime errors, rejected promises and a stalled bootstrap update the status instead of leaving an infinite loading message.
- The validator parses the generated inline gallery runtime with Node's JavaScript parser.
- The browser interaction suite checks first-load card count, successful component initialization and registration of all 30 custom-element tags.

**Acceptance evidence:**
- [x] Full repository validation and local Chromium browser suite passed: [Validate run 44846228512](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44846228512).
- [x] The generated gallery runtime parses and the complete build/docs/registry parity checks pass.
- [x] The published GitHub Pages workflow passed after deployment: [Pages run 44846228487](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44846228487).
- [x] A cache-disabled hard reload of the published gallery produced 29 cards, all 29 reached `data-load-state="ready"`, the status reported `29 of 29 components shown`, and all 30 custom-element tags registered.
- [x] The hosted browser check recorded no failed non-favicon network responses and no uncaught runtime exceptions.
- [x] The homepage, gallery, 29 standalone component URLs, 29 component JavaScript bundles, and 29-item registry were checked after deployment.

**Disposition:** INC-001 is closed. Detailed evidence is recorded in [PHASE-0-VERIFICATION.md](PHASE-0-VERIFICATION.md).

## 3. Phase roadmap

### Phase 0 · Stop the gallery boot failure and stabilize the preview
**Status: Complete · build, local Chromium, published Pages, hard-refresh, direct-route, mobile-width and screenshot evidence passed on `e94464445ec91cb4722f8e4e1328ffcff1467366`**

Implemented in the current source:
- [x] Quote component IDs when generating the gallery wire-map properties.
- [x] Add a visible startup failure monitor for script load errors, runtime errors, rejected promises and a stalled bootstrap.
- [x] Add a Node parser check for the generated gallery runtime.
- [x] Add first-load browser assertions for all 29 cards, every card's ready state and all 30 registered tags.
- [x] Make the Chrome browser suite a mandatory Validate workflow step.
- [x] Keep the source generator and checked-in gallery output aligned.

Verification evidence:
- [x] Latest full local Validate workflow passed: [run 44846228512](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44846228512), commit `e94464445ec91cb4722f8e4e1328ffcff1467366`.
- [x] Latest Pages build, generated-file checks and deployment passed: [run 44846228487](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44846228487), same commit.
- [x] The published gallery passed a cache-disabled hard reload in headless Chromium. All 29 cards reached ready state and all 30 custom-element tags registered.
- [x] The published homepage, gallery, all 29 demo routes, all 29 bundle URLs and the 29-entry registry passed direct HTTP checks.
- [x] The hosted gallery passed the 390 CSS px no-horizontal-overflow check.
- [x] Full-page desktop and mobile screenshots were generated and archived as [Phase 0 visual evidence](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44846228487/artifacts/14682354540). The desktop screenshot is 1440px wide; the mobile capture uses a 390 CSS px viewport at device scale factor 2.
- [x] The captured layouts were visually inspected. The original component family and utility-card layout remain present without obvious clipping or overlap. The repository did not contain an approved historical screenshot baseline, so a pixel-diff against a prior approved image is not claimed. No component rendering/source changes were made as part of this Phase 0 completion pass.

Exit gate:
- [x] All 29 gallery cards render and initialize on first load.
- [x] The gallery leaves its loading state and reports all 29 components available.
- [x] All 30 custom-element tags are registered.
- [x] No failed non-favicon network responses or uncaught startup exceptions were observed in the hosted browser check.
- [x] All 29 standalone demo routes and bundles are reachable on the deployed site.
- [x] No horizontal overflow was observed at the 390 CSS px mobile viewport; desktop and mobile screenshots were archived and visually reviewed.
- [x] The latest Validate and Pages deployment workflows pass on the same commit.

**Phase 0 is complete.** This closes the gallery stabilization work only. It does not approve a stable release or close Phases 1–6.

### Phase 1 · Complete inventory and component contract audit
**Status: In progress · inventory, static contract checks and route existence/browser checks are complete; runtime contract semantics and per-component review remain open**

Completed and evidenced:
- [x] Inventory all 29 component bundles, 30 custom-element tags, 29 dedicated demos, 29 component guides, and 29 registry entries.
- [x] Generate the detailed component inventory from `tools/spec.mjs` and `tools/extras-spec.mjs`.
- [x] Preserve the original seven mechanical controls as a separate runtime and visual family.
- [x] Document the 22 lightweight utility controls and their separate PinmotionExtras runtime.
- [x] Verify source registration names and uniqueness against the API metadata.
- [x] Compare declared `observedAttributes` with attributes documented as observed.
- [x] Check documented property and public method names against component source.
- [x] Compare documented event detail keys with source event payload object keys.
- [x] Compare form-association claims with `static formAssociated = true` and `formValue()` declarations.
- [x] Check source, generated bundle, demo, guide, and registry entry presence/linkage.
- [x] Run the source-to-contract audit as part of repository validation.
- [x] Verify all 29 standalone demo routes in headless Chromium for correct URL, expected tag registration and demo element.

Historical evidence (these runs are not a substitute for rerunning after changes):
- Static component contract audit: **424 checks passed, 0 failed** on `dea5484f5beae9d34a34515b614acd0255938278`.
- Full static validation: **608 checks passed, 0 failed** on the same commit.
- Browser interaction suite plus standalone demo checks: **29/29 standalone routes passed**, with `all passed` on `d6a9dc27114420e78d2bceefda0c2e32c5311a38`.
- Current pre-edit CI evidence on `61420811c12b199a8de3d2bf2c894daf03a30d0d`: [Validate run 44831138645](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44831138645) and [Pages workflow 44831138686](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44831138686) both succeeded.

Still required:
- [ ] Verify exact attribute defaults, coercion, normalization, reflection, connection-time configuration and update timing for every component.
- [ ] Verify property descriptors/accessors, method parameter defaults and return values, and programmatic event behavior.
- [ ] Verify event payload values, event ordering, bubbling/composed behavior and dispatch conditions through implementation and browser evidence.
- [ ] Verify every documented keyboard path and pointer/touch interaction, not only one happy path.
- [ ] Verify form values, native constraint validation, disabled fieldset, reset and state-restore behavior for every applicable component in supported browsers.
- [ ] Review styling hooks, responsive limits, WebGL fallback, audio behavior and reduced-motion statements against source and observed rendering.
- [ ] Check mixed bundle order, shared-runtime reuse, and collision behavior beyond simple all-bundle loading.
- [ ] Test all 29 registry entries in a clean consumer project.
- [ ] Complete and record a manual review of all 29 component API guides.

Exit gate:
- The inventory covers all bundles, tags, demos, guides and registry entries.
- CI validates source registrations, observed-attribute declarations, form declarations, documented member names and event-detail key shapes.
- Runtime semantics are tested or explicitly recorded as known limitations.
- No duplicate/missing tag, script, guide, demo or registry entry remains.
- Every unresolved discrepancy is fixed or documented with maintainer acceptance.

See [Phase 1–2 acceptance matrix](PHASE-1-2-ACCEPTANCE-MATRIX.md) for the per-area evidence ledger.

### Phase 2 · Functional correctness and regression coverage
**Status: In progress · existing browser suite exercises selected core interactions; full state/input/event/form/cleanup coverage is outstanding**

Existing test baseline in `tools/test.mjs`:
- [x] Gallery first-load card count, ready-state and 30-tag checks.
- [x] Selected touch/pointer and keyboard paths for the seven original mechanical controls.
- [x] Selected utility happy paths for all 22 utility components.
- [x] Selected form values for Toggle, Slider, Stepper, Drop Targets and selected utility controls.
- [x] Drain delete, undo, commit and replacement-ball lifecycle.
- [x] Selected utility dialog/disclosure interactions, Toast auto-dismiss/timer cleanup, and all 29 standalone demo route checks.
- [x] Mobile-width horizontal overflow assertion in headless Chromium.

Phase 2 coverage to add:
- [ ] Default, changed, disabled, invalid, min/max and empty states for every applicable component.
- [ ] Pointer, touch, keyboard and programmatic behavior tested independently against the documented API.
- [ ] Exact event payload values, order, bubbling/composed flags and programmatic dispatch/suppression.
- [x] Shared form bases implement default-state capture, native reset restoration, serialized state restoration and disabled-fieldset callbacks.
- [x] Chromium regression coverage added for original and utility controls, including form data participation, native reset, serialized state restoration, and disabled-fieldset exclusion/restoration.
- [x] Passing evidence: [Validate run 44843352695](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44843352695), commit `f34a32e0f7fe9414c20d14e33eedb3e39b4593ed`.
- [x] Passing Pages evidence: [Deployment run 44843352939](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44843352939), same commit.
- [x] Native reset and submitted form values verified for all 14 form-associated controls in Chromium.
- [x] Disabled-fieldset exclusion/restoration verified for both component bases.
- [x] Representative serialized state restoration verified for checked and scalar-value controls.
- [x] Chromium verifies Text Field, Text Area and Date Picker required/type/range validity propagation into `ElementInternals`, plus recovery after correction and host-targeted invalid events. Utility state restoration is also covered.
- [ ] Full per-control validity/constraint validation and cross-browser state-restore matrix.
- [x] Toast auto-dismiss, timer replacement, disconnect cleanup and reconnect behavior pass in Chromium.
- [ ] Drain undo/commit timing, other component timers/animations, repeated operations and disconnect/reconnect cleanup.
- [ ] Solo bundle behavior plus mixed bundle order and full-gallery regression tests.
- [ ] Fault isolation: one component initialization exception must not prevent unrelated cards rendering and reporting ready.
- [ ] A coverage ledger showing every documented interaction has a test or explicit manual evidence.
- [x] Latest Phase 2 CI evidence attached: [Validate run 44843352695](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44843352695), commit `f34a32e0f7fe9414c20d14e33eedb3e39b4593ed`.
- [ ] Expand the new smoke assertions into the complete per-component state/input/event/form matrix.

Known implementation gaps are not passes:
- Both component bases now implement `formResetCallback`, `formStateRestoreCallback`, and disabled-fieldset callbacks. Chromium now verifies reset and submitted values for all 14 form-associated controls, representative serialized state restoration, and disabled-fieldset participation in both component families. Constraint validity is verified for Text Field, Text Area and Date Picker; exhaustive per-control validity and cross-browser verification remain open.
- Drop Targets' `bonus` event is tied to a normal-motion impact callback; consumers should use `change.detail.allChecked` for state logic.

Exit gate:
- Every applicable component passes its default/changed/disabled/invalid/boundary/reset tests.
- Every documented input modality and public programmatic API has behavioral coverage.
- Event names, values, counts, ordering and propagation are asserted.
- Forms and asynchronous lifecycle behavior pass, or limitations are explicitly accepted and tracked.
- All 29 bundles pass core interactions individually and together.
- Failure isolation and cleanup tests pass.
- No known functional regression remains in the agreed release scope.

See [Phase 1–2 acceptance matrix](PHASE-1-2-ACCEPTANCE-MATRIX.md) and [Phase 2 test plan](PHASE-2-TEST-PLAN.md).

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
- No clipping, overlap, horizontal overflow or layout shift defects remain at supported widths.
- Approved screenshots exist for every component family and the complete gallery.

### Phase 4 · Accessibility audit and remediation
**Status: In progress · Plunger and indeterminate Progress now honor reduced-motion preferences with passing Chromium regression coverage; full WCAG review and assistive-technology evidence remain open**

**Target:** WCAG 2.2 Level AA for the complete project site and its documented interactive examples. This is a target, not a conformance claim. WCAG conformance applies to complete pages and responsive variants, not isolated controls. See the [W3C WCAG 2.2 Recommendation](https://www.w3.org/TR/WCAG22/).

Scope:
- Audit semantic HTML, accessible names, roles, states and relationships.
- Verify keyboard interaction, focus order, visible focus, dialogs and live announcements.
- Test form error messages and validation announcements.
- [x] Add reduced-motion handling for Plunger spring/ball travel and indeterminate Progress animation.
- [x] Add Chromium assertions for reduced-motion Progress and Plunger behavior. Evidence: [Validate run 44843352695](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44843352695), commit `f34a32e0f7fe9414c20d14e33eedb3e39b4593ed`.
- [ ] Review reduced-motion behavior for every remaining animated component and verify dynamic preference changes.
- Test with representative screen readers and browser combinations.
- Record findings, remediation, retest evidence and known limitations.

Exit gate:
- Findings are recorded, remediated or explicitly accepted.
- Keyboard and assistive-technology testing has evidence.
- No accessibility conformance claim exceeds the test evidence.

### Phase 5 · Browser and device compatibility
**Status: Not started**

Scope:
- Test Chrome, Edge, Firefox and Safari.
- Test physical iOS and Android devices.
- Verify WebGL availability/failure, audio permissions and mute behavior.
- Verify date/color native UI differences and form-associated custom element support.
- Publish a tested support matrix with browser/device versions.

Exit gate:
- Every supported browser/device has a passing test record.
- Unsupported platforms and fallbacks are clearly documented.

### Phase 6 · Distribution, release governance and stable publication
**Status: Not started**

Scope:
- Test every registry entry in a clean consumer application.
- Define package scope, versioning, changelog, deprecation, support and rollback policies.
- Add release notes and security/license/dependency checks.
- Freeze a release candidate and pass every mandatory checklist gate.

Exit gate:
- Release checklist is complete, evidence is linked, and maintainer formally approves release.

## 4. Known issues and stop-ship policy

- Exhaustive per-control validity/constraint validation and cross-browser state-restoration coverage remain open; native reset is covered for all 14 form-associated controls and host validity is verified for Text Field, Text Area and Date Picker.
- Drop Targets' `bonus` event is not emitted in reduced-motion mode; rely on its change-state payload for application logic.
- Full WCAG 2.2 AA review and NVDA, VoiceOver and TalkBack testing remain outstanding.
- Firefox, Safari, physical phones/tablets and screen readers are not represented by current automated browser evidence.

These issues must be resolved or explicitly accepted before stable publication. Never infer support from the presence of a custom element, ARIA attribute, or demo route.

## 5. CI and release evidence

Required links for a release candidate:
- Validate workflow run:
- Pages deployment run:
- Phase 1–2 acceptance matrix:
- Browser QA report:
- Accessibility report:
- Browser/device support matrix:
- Release candidate commit SHA:

## 6. Release decision

**Current decision: NO-GO.** This remains the decision until every mandatory release checklist item and phase exit gate has verifiable evidence.
