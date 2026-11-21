# 🧭 Pinmotion UI roadmap and phase tracker

> **Status snapshot:** 21 November 2026  
> **Branch:** `main`  
> **Baseline inventory:** 7 original mechanical controls, 22 lightweight utility controls, 29 standalone bundles, 30 custom element tags.

This is the high-level project development tracker. For the stricter, complete pre-release sequence and formal stop-ship policy, follow [RELEASE-PLAN.md](RELEASE-PLAN.md). Stable release is currently NO-GO. The release can proceed only after every mandatory phase and item in [RELEASE-CHECKLIST.md](RELEASE-CHECKLIST.md) has evidence. The status labels below distinguish what is present in the repository from what has been tested in a real browser or released. A component existing in the catalogue does not, by itself, mean its UX, accessibility, browser support, or production readiness is complete.

## 📊 Current progress

| Measure | Current status |
| --- | ---: |
| Original mechanical component family | 7 / 7 implemented |
| Lightweight utility component family | 22 / 22 implemented |
| Standalone bundles | 29 |
| Custom element tags | 30 |
| Component demo routes | 29 |
| API guides | 29 |
| Registry entries | 29 |
| Phase 0, gallery stabilization | Complete |
| Phase 1, inventory and contract audit | Complete |
| Phase 2, functional correctness and regression | In progress |
| Phases fully complete by evidence | 2 / 7 |
| Phases in progress | 2 / 7 |
| Phases not started | 3 / 7 |

**Phase completion is a delivery estimate, not a count of components.** Phase 0, gallery stabilization, is complete with local and published-site browser evidence. Phase 1 is complete. Phases 2 and 4 remain active hardening work. Phases 3, 5 and 6 have not started. The detailed scope and evidence gates are tracked in [RELEASE-PLAN.md](RELEASE-PLAN.md), with Phase 0 proof in [PHASE-0-VERIFICATION.md](PHASE-0-VERIFICATION.md).

## ✅ Completed foundations

### Product concept and visual foundation
**Status: Complete**
- Pinball-inspired design direction and consistent mechanical visual language.
- Cream, ink, brass/amber, steel and red palette.
- Original mechanical direction established around real-world pinball mechanisms.
- Shared sizing and page-reflection conventions documented.

### Original mechanical component family
**Status: Complete for the current seven-component implementation scope**
- Toggle, Slider, Plunger, Stepper, Drop Targets, Drain and Pop Bumpers.
- Seven original bundles use the PinballKit runtime, WebGL rendering, artwork and recorded audio.
- Component implementation completion does not certify cross-browser behavior or release readiness.

### Lightweight utility component family
**Status: Complete for the current 22-component implementation scope**
- Checkbox, Radio Group, Segmented Control, Progress, Meter, Rating.
- Tabs, Accordion, Disclosure, Tooltip, Dialog, Toast.
- Breadcrumbs, Pagination, Search, Text Field, Text Area.
- Select, Combobox, File Drop, Date Picker and Color Picker.
- Utility controls use PinmotionExtras and native/CSS semantics. Implementation completion is not browser certification.

### Documentation and distribution foundation
**Status: Complete for the current catalogue**
- 29 standalone bundles, 30 custom-element tags, 29 demos, 29 guides and 29 registry entries.
- Canonical component metadata and documentation generator.
- `llms.txt`, integration skill, technical documentation and architecture diagrams.
- MIT license naming Brajesh Kumar.

### Phase 0. Gallery stabilization
**Status: Complete** · The generated gallery runtime, visible startup diagnostics and deployed-site checks are now covered by CI. The 29-card/30-tag gallery passed hard-refresh Chromium verification, all 29 demo routes and bundles were checked on GitHub Pages, and responsive screenshots were archived. See [Phase 0 verification evidence](PHASE-0-VERIFICATION.md).

## 🚧 Active hardening phases

### Phase 1. Complete inventory and component contract audit
**Status: Complete** · Source/API inventory, default-contract probes, event assertions, documented custom keyboard paths, guide review, clean-consumer installs and all 29 standalone demos passed on `ad7d8c4`.
- [x] Inventory 29 bundles, 30 tags, 29 demos, 29 guides and 29 registry items.
- [x] Source-to-spec checks for registrations, observed attributes, form-association declarations, public member names, accessor modes, method signatures and event payload shapes.
- [x] Runtime default-contract probes for all 29 components.
- [x] Browser evidence for documented custom keyboard paths and representative event payload values/propagation.
- [x] Clean-consumer validation of all registry entries, independently and in four mixed load orders.
- [x] AI-assisted source/API review recorded for all 29 guides; discrepancies found in Meter and Accordion documentation were corrected.
- [x] Validate run `44880185964` and publish run `44880186001` both passed on `ad7d8c4`.
- [x] Carry-forward scope is recorded for broad regression, visual QA, assistive technology, browser compatibility and stable release.

### Phase 2. Functional correctness and regression coverage
**Status: In progress**
- [x] Existing Chromium suite exercises selected core interactions across both component families.
- [x] Existing suite checks selected form values and Drain's delete/undo/commit lifecycle.
- [x] Existing suite checks all 29 standalone demo routes.
- [ ] Expand changed, disabled, invalid, boundary and reset assertions beyond Phase 1 contract probes.
- [ ] Expand pointer/touch and programmatic state-transition permutations; Phase 1 verified the documented custom keyboard paths and representative actions.
- [ ] Expand event payload, ordering, bubbling/composed and event-suppression coverage to exhaustive per-control transition matrices; Phase 1 added cross-family runtime assertions.
- [ ] Test validation, disabled-fieldset, reset and state restoration for form-associated controls.
- [ ] Cover Toast timer, disconnect/reconnect cleanup and asynchronous lifecycle.
- [ ] Cover solo bundles, mixed runtime load order, full gallery and component failure isolation.
- [ ] Record the final passing CI run and close all functional regressions.

**Evidence ledger:** [Phase 1–2 acceptance matrix](PHASE-1-2-ACCEPTANCE-MATRIX.md) · [Phase 2 test plan](PHASE-2-TEST-PLAN.md).

### Phase 3. Visual quality and interaction polish
**Status: Not started.** Requires screenshot-based review of all 29 demos and the gallery at supported viewport sizes.

### Phase 4. Accessibility audit and remediation
**Status: In progress.** Reduced-motion handling for Plunger and indeterminate Progress is implemented and covered by passing Chromium assertions. Full keyboard audit, WCAG review, per-control form lifecycle verification and screen-reader testing remain open.

### Phase 5. Browser and device compatibility
**Status: Not started.** Firefox, Safari, physical iOS/Android and assistive-technology combinations remain unverified.

### Phase 6. Distribution and stable release
**Status: Not started.** Clean-consumer registry installation, release governance and formal release approval remain open.


## Expanded release-readiness programme

The detailed delivery scope for restoring the original reference components, auditing every bundle and gallery card, documenting every API and skill, adding npm packaging, security and supply-chain gates, compatibility testing and final publication is now maintained in [RELEASE-READINESS-PROGRAMME.md](RELEASE-READINESS-PROGRAMME.md).

The visual/behavioral defect ledger is [quality/DEFECT-REGISTER.md](quality/DEFECT-REGISTER.md), and the screenshot approval ledger is [quality/VISUAL-BASELINE.md](quality/VISUAL-BASELINE.md).

The 15-phase programme is a target plan, not a statement that phases are complete. Preserve the reported original four components, identify them from history and approved references, and restore them before broad utility expansion. The public npm package remains a target until the tarball and clean-consumer gates pass.


## Component-by-component release programme

Follow the [release-readiness programme](RELEASE-READINESS-PROGRAMME.md), not a one-shot 29-component rewrite. The original four are handled individually in Phases 1A–1D; each subsequent component family is audited in a small batch with its own source fixes, tests, screenshots, README/API update, skill update and CI evidence.

Track each component in [the component audit matrix](quality/COMPONENT-AUDIT-MATRIX.md). Implement CI/security/package/release automation according to the staged [workflow plan](WORKFLOW-PLAN.md). No batch or phase can be called complete without its exit evidence.
