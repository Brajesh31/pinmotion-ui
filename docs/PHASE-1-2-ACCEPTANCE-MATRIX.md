# 🧪 Phase 1–2 acceptance matrix

> **Purpose:** Evidence ledger for the contract audit (Phase 1) and functional regression coverage (Phase 2).
> **Baseline reviewed:** `main` at `4dc11f0f0f886860b5b9f2331bef4d922044ee9d` (21 November 2026).
> **Rule:** A check is complete only when an executable test or dated manual evidence exists. Source presence and a successful build are not behavioral proof.

## Latest CI evidence

- **Validate:** [run 44848315411](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44848315411) passed on `4dc11f0f0f886860b5b9f2331bef4d922044ee9d`.
- **GitHub Pages generation/deployment:** [run 44848315301](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44848315301) passed on the same commit.
- Repository validation: **611 checks passed, 0 failed**.
- Expanded source-to-contract audit: **540 checks passed, 0 failed**.
- Full Chromium interaction and standalone-route suite: **all passed**, including 29/29 standalone demos.
- Clean registry consumer test: **216 checks passed, 0 failed**. All 29 registry bundles passed in isolation and all four mixed load orders passed, with all 30 custom-element tags registered, no browser script errors, and stable singleton identities for `PinballKit` and `PinmotionExtras`.
- The successful consumer test uses the actual `registry.json` paths/targets in a clean temporary project. It does not claim npm package publication or cross-browser support.
- This evidence closes the clean-consumer and mixed-load-order rows only. It does not close the broader runtime semantics, complete keyboard/pointer, manual API guide review, or real-device criteria.

## Evidence labels

- **Automated:** Asserted by `tools/test.mjs`, `tools/audit-components.mjs`, or repository validation in CI.
- **Static only:** Compared against implementation/specification but not exercised in a browser.
- **Known gap:** The source or evidence explicitly shows unsupported or unverified behavior.
- **Pending:** No adequate evidence is currently recorded.

## Phase 1 · Inventory and component contract audit

| Contract area | Current evidence | Status |
| --- | --- | --- |
| Bundle, tag, demo, guide and registry inventory | Generated inventory plus source audit for 29 bundles, 30 tags, 29 demos, 29 guides and 29 registry items | ✅ Automated/static |
| Tag registration uniqueness and metadata parity | `tools/audit-components.mjs` | ✅ Automated/static |
| `observedAttributes` declaration parity | Source-to-spec audit | ✅ Automated/static |
| Public property/method names | Source audit verifies documented names, read/write and read-only accessors, and method parameter counts; default-value semantics and return values remain open | 🟡 Partial |
| Custom-event detail keys | Static audit compares every literal source payload shape with the documented event variants; runtime values, order and trigger conditions remain sampled, not exhaustive | 🟡 Partial |
| Attribute defaults and normalization | No exhaustive value-by-value audit | ⏳ Pending |
| Attribute reflection and update timing | Not exhaustively tested | ⏳ Pending |
| Property descriptors, getters/setters, return values | Read/write and read-only accessor presence is checked against source; runtime values, side effects and return-value semantics are not exhaustive | 🟡 Partial |
| Event order, payload values, propagation and dispatch conditions | Browser suite has selected bubbling/event checks; no exhaustive matrix | 🟡 Partial |
| Form association declarations | Static `formAssociated` and `formValue()` checks | ✅ Automated/static |
| Form lifecycle, reset, restore, validation | Both bases implement reset/restore/disabled callbacks; Chromium verifies native reset and submitted values for all 14 form-associated controls, plus representative state restore and disabled-fieldset behavior; Text Field/Text Area/Date Picker constraint validity passes; exhaustive remaining controls and cross-browser restore remain open | 🟡 Partial |
| Keyboard behavior | Selected controls tested; not every documented key path for every control | 🟡 Partial |
| Pointer/touch behavior | Selected interactions tested in Chromium | 🟡 Partial |
| Styling hooks, responsive limits, WebGL/audio/reduced motion claims | Documented; not comprehensively exercised for every component | 🟡 Partial |
| Mixed-bundle order and runtime collisions | Clean consumer test loads all 29 bundles in four orders and checks all 30 tags, browser errors, and stable singleton identities for both shared runtimes | ✅ Automated |
| Clean consumer registry installation | All 29 registry files are copied to their declared targets in a clean temporary project and loaded independently | ✅ Automated |
| Manual guide review | No per-guide sign-off ledger | ⏳ Pending |

### Phase 1 exit criteria

- [x] One source-controlled inventory covers all distributed bundles, tags, demos, guides and registry entries.
- [x] CI statically checks source registrations, observed attributes, form declarations, documented member names, read/write/read-only accessor modes, method parameter counts, and every literal event-payload shape.
- [x] The two shared base runtimes are checked for bubbling and composed custom-event dispatch.
- [x] All 29 standalone demo routes are checked in headless Chromium for their URL, expected registration and demo element.
- [ ] Defaults, normalization, reflection and update timing are verified per component.
- [ ] Property runtime semantics, method default values/returns and programmatic side effects are verified per component.
- [ ] Event payload values, order, dispatch conditions and event counts are verified exhaustively.
- [ ] Every documented keyboard and pointer/touch interaction is covered.
- [x] Shared bases implement default-state capture, `formResetCallback`, `formStateRestoreCallback`, and disabled-fieldset callbacks.
- [x] Chromium verifies native reset and submitted values for all 14 form-associated controls: [Validate run 44843352695](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44843352695).
- [x] Disabled-fieldset exclusion and re-enablement are verified for both original and utility component bases.
- [x] Representative serialized state restoration is verified for checked and scalar-value controls.
- [ ] Complete per-control validity/constraint validation and browser-driven state-restore matrix.
- [ ] Styling hooks and implementation limitations are checked against actual source and observed rendering.
- [x] All 29 registry bundles install at their declared paths and initialize in a clean consumer project: [Validate run 44848315411](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44848315411).
- [x] Four mixed bundle load orders preserve all 30 tags and singleton shared runtimes: [Validate run 44848315411](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44848315411).
- [ ] All 29 API guides receive a recorded manual review.

**Phase 1 status: IN PROGRESS.** CI now verifies more of the source-level API contract and tests all 29 registry entries in isolation and in four load orders. Exact defaults, runtime behavior, complete input-modality coverage, exhaustive form/validity checks, visual claims and manual guide sign-off remain open.

## Phase 2 · Functional correctness and regression coverage

### Existing automated coverage observed in `tools/test.mjs`

| Component(s) | Existing assertions |
| --- | --- |
| Gallery | 29 cards on first load, ready state, all 30 tags |
| Toggle | Touch activation, Space, drag, form value, disabled |
| Slider | Drag/input/change, Home/ArrowRight, End, form value |
| Stepper | Plus/minus, End/PageDown, form value |
| Drop Targets | Touch, Space, selected values, change/bonus and form value |
| Drain | Delete, undo, commit timer, return to ready state |
| Pop Bumper(s) | Single hit/combo and cluster score/hits |
| Plunger | Short pull, full pull and Space-hold/release |
| Utility family | All 22 attach shadow DOM and render their individual emblem |
| Checkbox | Pointer, change and form value |
| Radio Group | Pointer selection, change and form value |
| Segmented | Pointer selection, change and form value |
| Progress / Meter | Programmatic value updates reflected in ARIA value |
| Rating | Pointer selection, change and form value |
| Tabs / Accordion | Pointer selection/expansion and change |
| Disclosure | Native summary toggle and event |
| Tooltip | Focus reveals description |
| Dialog | Programmatic open/close and events |
| Toast | Programmatic show/dismiss, timed auto-dismiss, timer replacement, disconnect cleanup and reconnect |
| Breadcrumbs | Current-page marker |
| Pagination | Pointer selection and change |
| Search | Programmatic input and submit event |
| Text Field / Text Area | Programmatic native input updates values |
| Select / Combobox | Programmatic selection and change |
| File Drop | Programmatic File object selection |
| Date Picker / Color Picker | Programmatic value synchronization |
| All standalone demos | 29 routes checked in fresh navigation contexts |

### Phase 2 coverage gaps to close

| Test class | Required coverage | Status |
| --- | --- | --- |
| Defaults and initial values | Assert documented initial state and initial ARIA/form state for every component | ⏳ Pending |
| Changed states | Assert each public interaction changes state once and emits the documented payload | 🟡 Partial |
| Disabled | Attempt pointer, keyboard and programmatic interactions; confirm values/events/form data remain correct | 🟡 Partial |
| Invalid | Chromium verifies required, email type mismatch and date range-underflow propagation into `ElementInternals` for Text Field, Text Area and Date Picker; exhaustive remaining controls and remaining invalid-event coverage remains | 🟡 Partial |
| Boundaries | Min/max, first/last choice, empty option list, zero, maximum and out-of-range normalization | ⏳ Pending |
| Reset | Native reset restores defaults and submitted values for all 14 form-associated controls | ✅ Chromium covered |
| Programmatic APIs | Property setters, methods, attribute changes, event suppression/dispatch and form-value synchronization | 🟡 Partial |
| Input modalities | Pointer/touch and keyboard paths for every documented component | 🟡 Partial |
| Event contract | Exact payload, count, order, bubbles, composed and default prevention where relevant | 🟡 Partial |
| Forms | All 14 controls reset correctly; representative state restore and both-base fieldset behavior pass; per-control validity and cross-browser restore remain | 🟡 Partial |
| Async/timers | Toast auto-dismiss, replacement, disconnect cleanup and reconnect pass; Drain undo/commit and other component cleanup remain | 🟡 Partial |
| Full gallery isolation | A component exception must produce diagnostics without preventing unaffected cards from becoming ready | ⏳ Pending |
| Standalone vs gallery parity | Core interactions in each solo bundle and full-gallery load | 🟡 Partial |
| Leak/cleanup | Disconnect during animation/timer, re-connect and confirm no duplicate listeners or stale timers | ⏳ Pending |

### Phase 2 exit criteria

- [ ] Every component has a default/changed/disabled/invalid/boundary/reset test where applicable.
- [ ] Each documented pointer/touch interaction is independently tested.
- [ ] Each documented keyboard interaction is independently tested.
- [ ] Each public property and method has programmatic behavior tests.
- [ ] Exact event names, payload values, event counts/order and bubbling/composed flags are asserted.
- [x] Native reset and submitted values are verified for all 14 form-associated controls in Chromium.
- [x] Disabled-fieldset exclusion and re-enablement are verified for both component bases.
- [x] Representative serialized state restoration is verified for checked and scalar-value controls.
- [ ] Complete per-control constraint validation and cross-browser state-restore coverage.
- [ ] Async transitions, timers, undo/commit and disconnect cleanup are tested.
- [ ] All 29 bundles pass core behavior tests alone and together.
- [ ] Fault isolation proves a broken component cannot stop unrelated gallery cards.
- [x] CI runs the suite and the latest successful run is linked here: [Validate run 44842827810](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44842827810).
- [ ] No known functional regression remains, or every accepted limitation is documented and approved.

**Phase 2 status: IN PROGRESS.** Existing tests are retained; this phase is not considered complete until the gaps above are closed and CI evidence is attached.

## Known implementation constraints and verified motion behavior

1. **Form reset and state restore:** Both bases now snapshot writable form state after setup, restore defaults on native form reset, and accept serialized state through `formStateRestoreCallback`. New Chromium tests cover representative controls from both component families. The full component-by-component matrix and cross-browser behavior remain open.
3. **Plunger reduced motion (verified):** The shared runtime skips spring/drop/bounce/ball-travel animation under `prefers-reduced-motion: reduce`, while preserving the full-pull `send` action. The Chromium suite verifies a programmatic full pull sends without ball travel.
4. **Progress reduced motion (verified):** `extras-src/progress.js` disables the indeterminate fill animation and transform in its `prefers-reduced-motion` media query. The Chromium suite verifies this behavior.
5. **Drop Targets reduced motion:** The `bonus` event is tied to the normal-motion impact callback. Consumers needing reliable completion should use `change.detail.allChecked`.

These are recorded as facts from the inspected source/documentation, not silently treated as passing tests. Application component source is not modified by this audit ledger.
