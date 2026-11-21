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
**Status: Complete · source/API inventory, contract audit, runtime defaults, documented event contracts, targeted keyboard behavior, semantic guide review and clean-consumer verification passed on `ad7d8c4fb564d92c5cf3742181cf85e52a93ea2d`**

Completed and evidenced:
- [x] Inventory all 29 component bundles, 30 custom-element tags, 29 dedicated demos, 29 component guides, and 29 registry entries.
- [x] Generate the detailed component inventory from `tools/spec.mjs` and `tools/extras-spec.mjs`.
- [x] Preserve the original seven mechanical controls as a separate runtime and visual family.
- [x] Document the 22 lightweight utility controls and their separate PinmotionExtras runtime.
- [x] Verify source registration names and uniqueness against the API metadata.
- [x] Compare declared `observedAttributes` with attributes documented as observed.
- [x] Check documented property and public method names, read/write accessors, read-only getters and method parameter counts against component source.
- [x] Compare documented event detail keys and every literal source payload shape with the documented event variants.
- [x] Verify both shared base runtimes dispatch custom events with bubbling and composed enabled.
- [x] Copy all 29 registry bundles into a clean temporary consumer using the exact declared source paths and install targets.
- [x] Load each bundle independently and test four mixed load orders, all 30 tag registrations, browser errors, and shared-runtime singleton identity.
- [x] Verify actual runtime getter/setter descriptor shapes, initial public-property types, documented public method availability and guide-declared observed-attribute registration in Chromium.
- [x] Instrument `attributeChangedCallback` before `customElements.define()` and verify all 94 declared post-connection attribute mutations reach their callbacks across the 29 isolated consumers without uncaught errors.
- [x] Add runtime default-contract probes for all 29 components, including initial property values, form-value defaults, default choices, accessibility naming and selected state.
- [x] Add utility keyboard probes for documented custom keyboard paths, including radio-group, segmented, rating, tabs, accordion, tooltip, combobox and file-drop.
- [x] Extend the real-browser interaction suite for the original mechanical controls, including slider and stepper key handling, target focus movement, drain undo, plunger hold/release, bumper activation, tooltip Escape, dialog Escape and search submission.
- [x] Assert runtime CustomEvent detail values, event class, bubbling, composed propagation and representative event order across the interactive component families.
- [x] Fix verified source-contract defects: Text Field and Text Area now sync form values after live `value` attribute updates; Tabs, Radio Group, Progress, Meter, Rating, File Drop, Search, Color Picker and Dialog have corrected accessible naming; Radio Group, Segmented and Rating use roving keyboard tab stops; Accordion state and `open` attribute stay synchronized, including the all-closed state.
- [x] Correct API metadata where documentation overstated behavior: Meter's `low`, `high` and `optimum` are documented as descriptive-only in the current renderer; the Accordion example now passes `user=true` when it expects a user-change event.
- [x] Review all 29 generated API guides against their source implementation and canonical API metadata. Findings and scope limitations are recorded in [PHASE-1-API-GUIDE-REVIEW.md](PHASE-1-API-GUIDE-REVIEW.md).
- [x] Check source, generated bundle, demo, guide and registry entry presence/linkage.
- [x] Run source-to-contract, repository, integrity, Chromium interaction, standalone-demo and clean-consumer checks in mandatory Validate CI.

Latest verification on `ad7d8c4fb564d92c5cf3742181cf85e52a93ea2d`:
- Validate [run 44880185964](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44880185964): **540 contract-audit checks**, **611 repository validation checks**, **762 integrity checks** (351 local Markdown links), full Chromium interaction suite and all 29 standalone demo routes passed.
- The clean registry consumer and mixed-bundle audit reports **639 passed, 0 failed**, including 29 isolated bundles, four mixed load orders, runtime descriptors/types, method availability, default-contract probes and observed-attribute callback delivery.
- Generate and publish [run 44880186001](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44880186001) succeeded on the same commit.
- The passing validation run contains no failing assertions; the prior failed experimental runs were superseded by the corrected passing run on this commit.

Phase boundary and carry-forward:
- Phase 1 closes the inventory, source/API contract, initial defaults, documented event contract, generated-guide review and clean-distribution audit.
- Exhaustive state-transition permutations, every pointer/touch gesture, disabled/boundary matrices, all native constraint-validation combinations, form-state restoration across browser engines and leak/timer stress remain in **Phase 2**.
- Full visual screenshot review, responsive treatment, WebGL/audio fallback inspection and animation polish remain in **Phase 3**.
- Complete WCAG 2.2 AA and assistive-technology sign-off remain in **Phase 4**.
- Firefox, Safari and physical iOS/Android checks remain in **Phase 5**.
- Maintainer approval and stable-release packaging remain in **Phase 6**. Phase 1 completion does not authorize a stable release.

Exit gate:
- [x] Inventory covers every distributed bundle, tag, demo, guide and registry entry.
- [x] Source metadata, generated documentation and implementation agree on the documented API surface, or discrepancies are explicitly documented.
- [x] Runtime defaults, initial property types, observed-attribute callback delivery and clean-consumer behavior have passing evidence.
- [x] Representative event payloads and documented custom keyboard paths have real-browser evidence.
- [x] Every guide has a recorded source/API review outcome.
- [x] All identified Phase 1 defects have been fixed and the canonical build, validation and deployment workflows pass.

**Phase 1 is complete.** The product remains in hardening, not stable-release status. Continue with Phase 2 without reopening Phase 1 unless new evidence identifies an API-contract defect.

See [Phase 1–2 acceptance matrix](PHASE-1-2-ACCEPTANCE-MATRIX.md) and [Phase 1 contract audit](PHASE-1-CONTRACT-AUDIT.md) for evidence.

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
