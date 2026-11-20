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
| Phase 1, inventory and contract audit | In progress |
| Phase 2, functional correctness and regression | In progress |
| Phases fully complete by evidence | 0 / 7 |
| Phases in progress | 4 / 7 |
| Phases not started | 3 / 7 |

**Phase completion is a delivery estimate, not a count of components.** The component families and documentation foundation exist, but the current pre-release sequence treats inventory contracts and functional correctness as separate, evidence-gated phases. Phases 0–2 and Phase 4 are active hardening work. Phases 3, 5 and 6 have not started. The detailed scope and evidence gates are tracked in [RELEASE-PLAN.md](RELEASE-PLAN.md).

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

## 🚧 Active hardening phases

### Phase 1. Complete inventory and component contract audit
**Status: In progress**
- [x] Inventory 29 bundles, 30 tags, 29 demos, 29 guides and 29 registry items.
- [x] Source-to-spec checks for registrations, observed attributes, form-association declarations, public member names and event detail-key shapes.
- [x] Browser verification of all 29 standalone demo routes.
- [ ] Runtime attribute/property semantics and defaults verified for every component.
- [ ] Event values, ordering and propagation verified against browser behavior.
- [ ] Full keyboard/pointer/touch contract coverage.
- [ ] Full form lifecycle and validity contract reviewed.
- [ ] Clean consumer validation of all registry entries.
- [ ] Manual sign-off of all 29 API guides.

### Phase 2. Functional correctness and regression coverage
**Status: In progress**
- [x] Existing Chromium suite exercises selected core interactions across both component families.
- [x] Existing suite checks selected form values and Drain's delete/undo/commit lifecycle.
- [x] Existing suite checks all 29 standalone demo routes.
- [ ] Add default, changed, disabled, invalid, boundary and reset assertions.
- [ ] Exercise every documented pointer/touch, keyboard and programmatic path independently.
- [ ] Assert exact event payloads, order, bubbling/composed behavior and event suppression.
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

### Phase 3. Visual quality and interaction polish
**Status: Not started.** Requires screenshot-based review of all 29 demos and the gallery at supported viewport sizes.

### Phase 4. Accessibility audit and remediation
**Status: In progress.** Reduced-motion handling for Plunger and indeterminate Progress is implemented and covered by passing Chromium assertions. Full keyboard audit, WCAG review, form lifecycle fixes and screen-reader verification remain open.

### Phase 5. Browser and device compatibility
**Status: Not started.** Firefox, Safari, physical iOS/Android and assistive-technology combinations remain unverified.

### Phase 6. Distribution and stable release
**Status: Not started.** Clean-consumer registry installation, release governance and formal release approval remain open.

## 🎯 Definition of done

A phase is only marked complete when its acceptance criteria are implemented, documented, checked, and the relevant live or release workflow has passed. A green syntax check alone is not enough to call a visual/browser phase complete.

Every component release should satisfy:
1. Functional interaction and state behavior.
2. Accessible name, role, keyboard behavior and focus handling.
3. Form behavior documented and tested where applicable.
4. Responsive rendering and reduced-motion behavior.
5. A live standalone demo and generated API guide.
6. Registry and machine-readable catalogue parity.
7. Build, docs, validator and integrity checks pass.
8. No regressions to the seven original mechanical controls.
9. Deployment is confirmed on the published site.

## 🔎 Source of truth and update rules

- Component catalogue: `tools/spec.mjs` and `tools/extras-spec.mjs`.
- Bundle generation: `tools/build.mjs`.
- Generated guides, demos, gallery, registry and `llms.txt`: `tools/docs.mjs`.
- Structural and syntax checks: `tools/validate.mjs`.
- Cross-file and asset checks: `tools/integrity.mjs`.
- Runtime checks: `tools/test.mjs`.
- Deployment: `.github/workflows/generate-components.yml`.

Update this tracker only after inspecting the source and evidence. Do not inflate completed phase counts because candidate work has been planned.
