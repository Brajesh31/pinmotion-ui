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
| Defined delivery phases | 10 |
| Phases fully complete by evidence | 4 / 10 |
| Phases in progress | 2 / 10 |
| Phases not started | 4 / 10 |

**Phase completion is a delivery estimate, not a count of components.** Phases 1–4 describe the existing product foundation that is present in the repository. Phases 5–6 are active hardening work. Phases 7–10 remain open. The gallery and deployment fixes in this commit belong to Phase 5.

## ✅ Completed phases

### Phase 1. Product concept and visual foundation
**Status: Complete**

- Pinball-inspired design direction and consistent mechanical visual language.
- Cream, ink, brass/amber, steel and red palette.
- Original mechanical direction established around real-world pinball mechanisms.
- Shared sizing and page-reflection conventions documented.

### Phase 2. Original mechanical component family
**Status: Complete for the current seven-component scope**

- Toggle
- Slider
- Plunger
- Stepper
- Drop Targets
- Drain
- Pop Bumpers

The seven original bundles use the PinballKit runtime, WebGL rendering, artwork and recorded audio. Their visual and browser limitations remain documented.

### Phase 3. Lightweight utility component family
**Status: Complete for the current 22-component scope**

- Checkbox, Radio Group, Segmented Control
- Progress, Meter, Rating
- Tabs, Accordion, Disclosure, Tooltip
- Dialog, Toast, Breadcrumbs, Pagination
- Search, Text Field, Text Area
- Select, Combobox, File Drop
- Date Picker, Color Picker

The utility family uses the PinmotionExtras helper and native/CSS semantics. This is implementation completion, not a claim that every browser has been certified.

### Phase 4. Documentation and component distribution foundation
**Status: Complete for the current catalogue**

- 29 standalone bundles and 30 custom element tags.
- 29 generated demo routes and component guides.
- Canonical component metadata and documentation generator.
- Shadcn registry with 29 entries.
- `llms.txt`, integration skill, technical documentation and architecture diagrams.
- MIT license naming Brajesh Kumar.

## 🚧 Active phases

### Phase 5. Gallery and release reliability
**Status: In progress**

- [x] Inspect generated gallery and canonical catalogue.
- [x] Add live search across names, tags, categories and descriptions.
- [x] Add All / Original / Utility filters.
- [x] Add visible loaded/failed component status instead of silently showing an empty gallery.
- [x] Verify custom element registration and report card initialization failures.
- [x] Identify deployment failure from actual GitHub Actions logs.
- [x] Remove workflow-side generated commit/push before Pages deployment.
- [x] Run validation on pushes to `main`.
- [ ] Run a fresh successful Pages deployment after the workflow corrections.
- [ ] Verify the hosted gallery and every component route after deployment.
- [ ] Run the optional real-browser interaction suite and capture a complete gallery screenshot.
- [ ] Verify cache behavior and direct refresh/deep links on GitHub Pages.

### Phase 6. Quality, accessibility and browser compatibility
**Status: In progress**

- [x] Structural, generated-file, metadata and integrity checks exist.
- [x] Optional Chromium test harness exists.
- [ ] Make the browser interaction suite part of a reliable CI gate.
- [ ] Audit keyboard navigation and focus order across all 30 custom element tags.
- [ ] Audit accessible names, roles, live announcements and form association.
- [ ] Validate reduced-motion behavior, including the documented Plunger and Progress exceptions.
- [ ] Test Chrome, Firefox and Safari.
- [ ] Test representative physical mobile devices and touch behavior.
- [ ] Add repeatable visual regression snapshots with baseline review.
- [ ] Publish a truthful browser/accessibility support matrix.

## 🗓️ Remaining phases

### Phase 7. Component library expansion
**Status: Not started**

Add new patterns only when they can meet the same visual quality, functional completeness and documentation depth as the existing components.

Candidate components:
- Multi Select
- Time Picker
- Date Range Picker
- Password Field
- Number Input
- Switch Group
- Transfer List
- Split Pane
- Lightbox Gallery
- Color Swatch Palette

Acceptance criteria: each addition has a real interaction model, keyboard and accessibility behavior, documented attributes/properties/events, responsive demo, tests, generated registry item and no regression to the original seven.

### Phase 8. Developer experience and distribution
**Status: Not started**

- Define the supported shadcn registry install contract and test it in a clean consumer project.
- Add copyable CDN/version-pinned usage examples.
- Add a predictable release/versioning policy.
- Decide whether an npm package is warranted. Do not publish while the package manifest remains private.
- Add migration and compatibility guidance.
- Add a component starter/template for future contributions.

### Phase 9. Production readiness and release governance
**Status: Not started**

- Define release gates and required CI checks.
- Add release notes and changelog discipline.
- Add dependency/security/license review automation as dependencies are introduced.
- Document support policy and deprecation policy.
- Add reproducible release validation and rollback instructions.
- Verify registry, demos, docs, bundles and site are version-aligned.

### Phase 10. Community and ecosystem
**Status: Not started**

- Contribution guide and issue/PR templates.
- Component request and bug-report workflow.
- Showcase examples and integration recipes.
- Contribution review checklist.
- Project landing page polish and discoverability.
- Usage feedback loop based on actual developer issues and requests.

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
