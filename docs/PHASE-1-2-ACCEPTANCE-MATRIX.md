# 🧪 Phase 1–2 acceptance matrix

> **Purpose:** Evidence ledger for the contract audit (Phase 1) and functional regression coverage (Phase 2).
> **Baseline reviewed:** `main` at `6336bc0e7fa282d6caec6841c37b7437b843821c` (21 November 2026).
> **Rule:** A check is complete only when an executable test or dated manual evidence exists. Source presence and a successful build are not behavioral proof.

## Latest CI evidence

- **Validate:** [run 44850544954](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44850544954) passed on `6336bc0e7fa282d6caec6841c37b7437b843821c`.
- **Pages generation/deployment:** [run 44850544876](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44850544876) built and uploaded the Pages artifact, but deployment failed when GitHub Actions could not retrieve artifact metadata. The last successful Pages deployment is [run 44850243527](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44850243527) on the immediately preceding test-only revision; no component/application files changed between those revisions.
- Repository validation: **611 checks passed, 0 failed**.
- Expanded source-to-contract audit: **540 checks passed, 0 failed**.
- Integrity audit: **762 checks passed, 0 failed**, including 351 local Markdown links.
- Full Chromium interaction and standalone-route suite: **all passed**, including 29/29 standalone demos.
- Clean registry consumer test: **539 checks passed, 0 failed**. All 29 registry bundles passed in isolation and all four mixed load orders passed, with all 30 custom-element tags registered, no browser script errors, and stable singleton identities for `PinballKit` and `PinmotionExtras`.
- Runtime consumer checks verified documented property descriptors, initial primitive/array types, public method availability, **94** post-connection `attributeChangedCallback` invocations across documented observed attributes, and no uncaught errors from attribute mutations in all 29 component consumers.
- The consumer test uses the actual `registry.json` paths/targets in a clean temporary project. It does not claim npm package publication or cross-browser support.
- Exact defaults, attribute normalization/reflection effects, exhaustive event/input behavior and manual API guide review remain open.

## Evidence labels

- **Automated:** Asserted by `tools/test.mjs`, `tools/audit-components.mjs`, or repository validation in CI.
- **Static only:** Compared against implementation/specification but not exercised in a browser.
- **Known gap:** The source or evidence explicitly shows unsupported or unverified behavior.
- **Pending:** No adequate evidence is currently recorded.

## Phase 1 · Inventory and component contract audit

<badge color="success">Complete</badge> Verified on commit `ad7d8c4fb564d92c5cf3742181cf85e52a93ea2d`.

| Contract area | Verified evidence | Status |
| --- | --- | --- |
| Bundle, tag, demo, guide and registry inventory | Source-controlled inventory for 29 bundles, 30 tags, 29 demos, 29 guides and 29 registry entries | ✅ Complete |
| Tag registration uniqueness and metadata parity | `tools/audit-components.mjs` | ✅ Complete |
| `observedAttributes` declaration parity | Source-to-spec audit, browser constructor check and 94 delivered post-connection callbacks | ✅ Complete |
| Public property and method declarations | Source audit checks names, accessor modes and method parameter counts; Chromium verifies descriptors, initial types and method availability | ✅ Complete for the declared API surface |
| Attribute defaults and initial state | `DEFAULT_CONTRACT_PROBES` exercises documented defaults for all 29 components | ✅ Complete |
| Attribute lifecycle | All 94 declared observed-attribute changes reach `attributeChangedCallback` without uncaught errors; source review and targeted probes cover known update effects | ✅ Complete for Phase 1 contract audit |
| Property descriptors and initial values | Runtime read/write and read-only descriptors, primitive/array initial types and component default probes | ✅ Complete |
| Event contract | Source payload-shape audit plus browser assertions for values, CustomEvent type, bubbles, composed and representative ordering across interactive component families | ✅ Complete for documented payload contract |
| Form association declarations | Static `formAssociated` and `formValue()` checks | ✅ Complete |
| Form behavior | Existing Chromium suite checks submitted values/reset for all 14 form-associated controls, representative restore and disabled-fieldset behavior; exhaustive validity/browser matrix is carried into Phase 2/5 | ✅ Phase 1 declaration and baseline contract complete |
| Custom keyboard contracts | Isolated and browser checks cover documented non-native keyboard paths in utility controls and the original mechanical family | ✅ Phase 1 documented-key contract checked |
| Pointer/touch behavior | Existing Chromium suite covers representative component interactions; exhaustive gesture and device matrix is Phase 2/5 | ✅ Phase 1 source contract checked |
| Styling and implementation limits | Source/API review checks documented CSS hooks, WebGL/audio requirements and reduced-motion claims; screenshot and device rendering review is Phase 3/4/5 | ✅ Source/documentation review complete |
| Mixed-bundle order and runtime collisions | All 29 bundles loaded independently and in four mixed orders; all 30 tags register and shared runtimes retain singleton identity | ✅ Complete |
| Clean consumer registry installation | Every registry bundle is copied to its declared destination and run in an isolated consumer | ✅ Complete |
| API guide semantic review | All 29 guides compared against canonical metadata and source; two inaccuracies corrected and the full review scope recorded in the guide ledger | ✅ Complete, AI-assisted source review |

### Phase 1 verification

- Validate [run 44880185964](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44880185964), commit `ad7d8c4fb564d92c5cf3742181cf85e52a93ea2d`: **540 contract checks**, **611 repository checks**, **762 integrity checks**, Chromium interaction suite and all 29 standalone demos passed.
- Clean consumer audit in the same Validate run: **639 passed, 0 failed**.
- Generate and publish [run 44880186001](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44880186001): success on the same commit.

### Phase 1 exit criteria

- [x] One source-controlled inventory covers all bundles, tags, demos, guides and registry entries.
- [x] CI checks source registrations, observed attributes, form declarations, documented member names, accessor modes, method signatures and event payload shapes.
- [x] Runtime default probes cover all 29 components.
- [x] Browser evidence covers initial state, documented custom keyboard paths and representative event values/propagation.
- [x] Clean registry consumer verifies every bundle alone and across four mixed load orders.
- [x] All 29 API guides have a recorded source/API review result.
- [x] All identified source/API contract defects have been corrected and the canonical Validate and publish workflows pass.
- [x] Work outside the Phase 1 contract-audit scope is explicitly carried into Phase 2–6 rather than being silently treated as release-approved.

**Phase 1 status: COMPLETE.** Phase 2 remains in progress. Completion here means the inventory and source/API contract audit is finished. It does not claim exhaustive visual, assistive-technology, cross-browser or release certification.

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
