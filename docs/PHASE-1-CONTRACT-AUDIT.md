# 🔎 Phase 1 contract audit evidence

> **Status:** Phase 1 complete, source/API contract audit closed  
> **Verified code/test commit:** `ad7d8c4fb564d92c5cf3742181cf85e52a93ea2d`  
> **Date:** 21 November 2026  
> **Branch:** `main`

## 1. Automated verification results

The latest completed Validate run on the verified commit passed:

- **540 source-to-contract audit checks, 0 failures.**
- **611 repository validation checks, 0 failures.**
- **762 integrity checks, 0 failures**, including 351 local Markdown links.
- Full Chromium interaction suite completed with `all passed`.
- All 29 standalone demo routes passed in fresh browser navigations.
- The clean registry consumer and mixed-bundle audit reported **639 passed, 0 failed**.
- Generate and publish [run 44880186001](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44880186001) succeeded on the same commit.

Evidence: [Validate run 44880185964](https://github.com/Brajesh31/pinmotion-ui/actions/runs/44880185964).

## 2. Completed source/API inventory and static contract checks

For all 29 component bundles, the audit verifies:
- Implementation source, generated bundle, standalone demo, API guide and registry entry exist.
- Source custom-element registration names match metadata tags, with no duplicate global registrations.
- Source `observedAttributes` declarations cover the attributes documented as observed.
- Form-association claims match `static formAssociated` and `formValue()` declarations.
- Documented property names and accessor modes match source getter/setter declarations.
- Documented method names and parameter counts match source methods.
- Literal source event payload shapes are represented in documentation.
- Shared event base implementations dispatch bubbling and composed custom events.
- Generated guides and demos contain the expected API structure and bundle linkage.

## 3. Runtime clean-consumer verification

The mandatory Validate step runs `npm run test:consumer` using the actual paths and targets in `registry.json`. It:
- Copies all 29 bundles into a clean temporary consumer.
- Loads every bundle alone, then tests four mixed load orders.
- Checks all 30 custom-element tags, browser errors and shared-runtime singleton identity.
- Checks runtime getter/setter descriptors, documented public method availability, property initial types and constructor observed-attribute lists.
- Exercises default-contract probes for all 29 components, including initial values, choices, form values and accessible naming.
- Instruments `attributeChangedCallback` before registration and verifies 94 guide-declared post-connection mutations reach the callback without uncaught errors across the isolated consumers.

Result: **639 passed, 0 failed**.

## 4. Browser event and keyboard contract evidence

The Chromium suite captures event name, detail, event constructor, `bubbles`, `composed` and observed order. It asserts representative payload values across the original and utility component families, including input, change, send, delete/undo/commit, hit, show/dismiss, search, file metadata and date/color values.

The suite also checks the documented custom keyboard paths for the original controls and utility controls, including slider/stepper range keys, target focus movement, plunger hold/release, bumper activation, radio and segmented navigation, rating, tabs, accordion, tooltip Escape, combobox navigation, file-drop activation, dialog Escape and search submission.

This is component-contract evidence in Chromium. It is not a claim that every possible pointer/touch gesture, disabled/boundary permutation, assistive technology or browser engine has been certified.

## 5. Source/API defects corrected

- Text Field and Text Area now synchronize form values after a live `value` attribute change; Text Area also updates its character counter.
- Tabs now assign its default accessible name to the tablist.
- Radio Group now references its visible label and has a roving keyboard tab stop; Home/End select and focus the first/last option.
- Segmented and Rating now expose one roving keyboard tab stop.
- Progress, Meter and Rating expose programmatic accessible names from their visible labels.
- File Drop uses a labelled group rather than a nested button role, and its decorative icon is hidden from assistive technology.
- Search and Color Picker labels are associated with their native inputs.
- Dialog links its title slot to the native dialog's accessible name.
- Accordion's `expanded` property and `open` attribute stay synchronized, including the all-sections-closed state.
- Meter documentation no longer promises dynamic low/high/optimum colour zones that the current renderer does not implement.
- Accordion's example now passes `user=true` where it expects the change event to fire.

Source files and generated bundles are synchronized by the canonical build and checked in CI.

## 6. API guide review

All 29 generated guides received an AI-assisted source/API review against the matching implementation and metadata. The review ledger is [PHASE-1-API-GUIDE-REVIEW.md](PHASE-1-API-GUIDE-REVIEW.md).

The review does not represent independent human maintainer approval, screen-reader testing, responsive screenshot review or cross-browser certification. Those remain explicit later-phase gates.

## 7. Scope carried into later phases

Phase 1 closes the inventory, source/API contract, initial default probes, documented event contract, source/API guide review and clean registry distribution audit.

The following are deliberately not represented as Phase 1 sign-off:
- Exhaustive state-transition permutations, every pointer/touch gesture, disabled/boundary matrices, full validation coverage, timer/leak stress and broader functional regression: **Phase 2**.
- Screenshot review, responsive layouts, visual states, WebGL/audio fallbacks and visual polish: **Phase 3**.
- Full WCAG 2.2 AA and assistive-technology sign-off: **Phase 4**.
- Firefox, Safari and physical iOS/Android validation: **Phase 5**.
- Maintainer approval, versioning, package release and rollback readiness: **Phase 6**.

**Phase 1 is complete.** The repository remains a development preview and stable release remains NO-GO until every later release gate passes.
