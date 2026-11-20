# 🧪 Phase 1–2 acceptance matrix

> **Purpose:** Evidence ledger for the contract audit (Phase 1) and functional regression coverage (Phase 2).
> **Baseline reviewed:** `main` at `f54d1e4f9ce1e989691ddf707179c8764c67c3f9` (21 November 2026).
> **Rule:** A check is complete only when an executable test or dated manual evidence exists. Source presence and a successful build are not behavioral proof.

## Latest CI evidence

- **Validate:** [run 44833625705](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44833625705) passed on `f54d1e4f9ce1e989691ddf707179c8764c67c3f9`, including the browser suite.
- **GitHub Pages generation/deployment:** [run 44833625348](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44833625348) passed on the same commit.
- Added browser assertions cover programmatic checkbox event suppression, checkbox event bubbling/composed payload, selected utility boundary normalization, and native required-field validity.
- This evidence confirms the current suite passes. It does not close the broader Phase 1/2 exit criteria or manual real-device checks.

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
| Public property/method names | Name-presence checks only; not descriptor/accessor semantics | 🟡 Partial |
| Custom-event detail keys | Source object-key matching; does not prove emitted runtime payloads | 🟡 Static only |
| Attribute defaults and normalization | No exhaustive value-by-value audit | ⏳ Pending |
| Attribute reflection and update timing | Not exhaustively tested | ⏳ Pending |
| Property descriptors, getters/setters, return values | Not exhaustively tested | ⏳ Pending |
| Event order, payload values, propagation and dispatch conditions | Browser suite has selected bubbling/event checks; no exhaustive matrix | 🟡 Partial |
| Form association declarations | Static `formAssociated` and `formValue()` checks | ✅ Automated/static |
| Form lifecycle, reset, restore, validation | Reset and state-restore callbacks are absent; native constraint behavior is not exhaustive | ⚠️ Known gap |
| Keyboard behavior | Selected controls tested; not every documented key path for every control | 🟡 Partial |
| Pointer/touch behavior | Selected interactions tested in Chromium | 🟡 Partial |
| Styling hooks, responsive limits, WebGL/audio/reduced motion claims | Documented; not comprehensively exercised for every component | 🟡 Partial |
| Mixed-bundle order and runtime collisions | Full gallery exercises all bundles together; isolated demos verify loading, not all collision sequences | 🟡 Partial |
| Clean consumer registry installation | Not tested against all 29 entries | ⏳ Pending |
| Manual guide review | No per-guide sign-off ledger | ⏳ Pending |

### Phase 1 exit criteria

- [x] One source-controlled inventory covers all distributed bundles, tags, demos, guides and registry entries.
- [x] CI statically checks source registrations, observed attributes, form declarations, documented member names and event detail keys.
- [x] All 29 standalone demo routes are checked in headless Chromium for their URL, expected registration and demo element.
- [ ] Defaults, normalization, reflection and update timing are verified per component.
- [ ] Property semantics and public method parameters/returns are verified per component.
- [ ] Event payload values, order, bubbling/composed behavior and trigger conditions are verified.
- [ ] Every documented keyboard and pointer/touch interaction is covered.
- [ ] Form lifecycle, validation, disabled-fieldset, reset and state-restore behavior is either implemented and tested or explicitly accepted as unsupported with a tracked defect.
- [ ] Styling hooks and implementation limitations are checked against actual source and observed rendering.
- [ ] Mixed bundle load order/collision behavior and clean-consumer registry installs are tested.
- [ ] All 29 API guides receive a recorded review.

**Phase 1 status: IN PROGRESS.** The earlier 424-check static audit and 29/29 standalone demo result are retained as evidence, but do not satisfy the outstanding behavioral contract review.

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
| Toast | Programmatic show/dismiss and events |
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
| Invalid | Native constraint validity and invalid events for required/type/min/max/step/maxlength controls | ⏳ Pending |
| Boundaries | Min/max, first/last choice, empty option list, zero, maximum and out-of-range normalization | ⏳ Pending |
| Reset | Assert form reset behavior; add callbacks only after behavior contract is agreed | ⚠️ Known gap |
| Programmatic APIs | Property setters, methods, attribute changes, event suppression/dispatch and form-value synchronization | 🟡 Partial |
| Input modalities | Pointer/touch and keyboard paths for every documented component | 🟡 Partial |
| Event contract | Exact payload, count, order, bubbles, composed and default prevention where relevant | 🟡 Partial |
| Forms | Successful controls, disabled controls, required validity, fieldset disabled, reset, state restore | 🟡 Partial |
| Async/timers | Drain undo/commit and Toast auto-dismiss including disconnect/cleanup | 🟡 Partial |
| Full gallery isolation | A component exception must produce diagnostics without preventing unaffected cards from becoming ready | ⏳ Pending |
| Standalone vs gallery parity | Core interactions in each solo bundle and full-gallery load | 🟡 Partial |
| Leak/cleanup | Disconnect during animation/timer, re-connect and confirm no duplicate listeners or stale timers | ⏳ Pending |

### Phase 2 exit criteria

- [ ] Every component has a default/changed/disabled/invalid/boundary/reset test where applicable.
- [ ] Each documented pointer/touch interaction is independently tested.
- [ ] Each documented keyboard interaction is independently tested.
- [ ] Each public property and method has programmatic behavior tests.
- [ ] Exact event names, payload values, event counts/order and bubbling/composed flags are asserted.
- [ ] Form submission, validation, disabled-fieldset, reset and applicable state-restore behavior are tested.
- [ ] Async transitions, timers, undo/commit and disconnect cleanup are tested.
- [ ] All 29 bundles pass core behavior tests alone and together.
- [ ] Fault isolation proves a broken component cannot stop unrelated gallery cards.
- [ ] CI runs the suite and the latest successful run is linked here.
- [ ] No known functional regression remains, or every accepted limitation is documented and approved.

**Phase 2 status: IN PROGRESS.** Existing tests are retained; this phase is not considered complete until the gaps above are closed and CI evidence is attached.

## Known implementation defects to track

1. **Form reset:** Both component base classes currently lack `formResetCallback`. Resetting a form does not restore the custom element to its initial state.
2. **Form state restore:** Neither base currently implements `formStateRestoreCallback`.
3. **Plunger reduced motion:** Pull and shot animations continue under `prefers-reduced-motion: reduce`.
4. **Progress reduced motion:** Indeterminate progress animation has no dedicated reduced-motion override.
5. **Drop Targets reduced motion:** The `bonus` event is tied to the normal-motion impact callback. Consumers needing reliable completion should use `change.detail.allChecked`.

These are recorded as facts from the inspected source/documentation, not silently treated as passing tests. Application component source is not modified by this audit ledger.
