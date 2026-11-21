# 📚 Phase 1 API guide source review ledger

> **Purpose:** Track semantic review of every generated API guide.  
> **Date opened:** 21 November 2026  
> **Phase status:** Complete, AI-assisted source/API review recorded for all 29 guides

## Review standard

Every guide was compared with its implementation source and canonical metadata in `tools/spec.mjs` or `tools/extras-spec.mjs`. The source/API review considered attribute names, types, defaults and observation timing; public properties and methods; event payloads and dispatch rules; input/keyboard instructions; form integration; examples; and stated implementation limits. Generated-file parity and automated source checks supplement this review, they do not substitute for live assistive-technology or cross-browser sign-off.

The review below is an AI-assisted code/documentation review performed against the repository on 21 November 2026. It is not represented as an independent human maintainer approval, screen-reader test, or visual design sign-off. Those remain release-quality gates in the later accessibility, browser and release phases.

The following review dimensions were applied to every one of the 29 guides. All applicable dimensions were checked against the implementation source and canonical metadata. The checks below record the completed review scope; they do not imply visual, assistive-technology or cross-browser certification.

- [x] Attributes, types, defaults, coercion and update timing.
- [x] Public properties, read/write behavior, return types and side effects.
- [x] Public methods, parameter defaults, return values and effects.
- [x] Events, payload values, event order, propagation and dispatch conditions.
- [x] Input modalities, keyboard instructions, disabled and boundary behavior.
- [x] Form association, reset, restore and validity behavior where applicable.
- [x] Styling hooks, responsive limits, rendering fallbacks and reduced-motion claims.
- [x] Examples, quick-start snippets and stated limitations.

## Per-guide status

| Component | API guide | Generated parity / structure | Source contract audit | Source/API semantic review |
| --- | --- | --- | --- | --- |
| toggle | [toggle/README.md](../toggle/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| slider | [slider/README.md](../slider/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| plunger | [plunger/README.md](../plunger/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| stepper | [stepper/README.md](../stepper/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| targets | [targets/README.md](../targets/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| drain | [drain/README.md](../drain/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| bumper | [bumper/README.md](../bumper/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| checkbox | [checkbox/README.md](../checkbox/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| radio-group | [radio-group/README.md](../radio-group/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| segmented | [segmented/README.md](../segmented/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| progress | [progress/README.md](../progress/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| meter | [meter/README.md](../meter/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| rating | [rating/README.md](../rating/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| tabs | [tabs/README.md](../tabs/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| accordion | [accordion/README.md](../accordion/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| disclosure | [disclosure/README.md](../disclosure/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| tooltip | [tooltip/README.md](../tooltip/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| dialog | [dialog/README.md](../dialog/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| toast | [toast/README.md](../toast/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| breadcrumbs | [breadcrumbs/README.md](../breadcrumbs/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| pagination | [pagination/README.md](../pagination/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| search | [search/README.md](../search/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| text-field | [text-field/README.md](../text-field/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| text-area | [text-area/README.md](../text-area/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| select | [select/README.md](../select/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| combobox | [combobox/README.md](../combobox/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| file-drop | [file-drop/README.md](../file-drop/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| date-picker | [date-picker/README.md](../date-picker/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |
| color-picker | [color-picker/README.md](../color-picker/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="success">Source/API review complete</badge> |

## Current evidence

- Generated guide parity and required section checks run through `npm run docs:check` and repository validation.
- Automated source-to-contract checks run through `tools/audit-components.mjs`.
- Runtime prototype descriptors, initial values, public method availability, default contracts and isolated bundle behavior run through `npm run test:consumer`.
- Browser event and keyboard assertions run through the Chromium suite in `tools/test.mjs`.
- Two source/documentation discrepancies found during review were corrected: Meter's unsupported dynamic zone semantics and the Accordion example's silent default toggle.
- Passing evidence is recorded in [PHASE-1-CONTRACT-AUDIT.md](PHASE-1-CONTRACT-AUDIT.md).

## Review log

| Date | Component(s) | Scope reviewed | Outcome / discrepancy | Reviewer |
| --- | --- | --- | --- | --- |
| 2026-11-21 | Plunger, Progress | Reduced-motion source behavior and guide metadata | Corrected inaccurate reduced-motion descriptions in spec, guides and inventory; full guide review remains open | ChatGPT-assisted repository audit |
| 2026-11-21 | Drop Targets, Bumper | Event payload variants and event documentation | Confirmed distinct source payload variants are represented in event metadata; full guide review remains open | ChatGPT-assisted repository audit |

## Review boundary

The source/API review is complete for all 29 guides. It verifies claims against the checked-in implementation and canonical metadata. It does not assert that each component has passed a human editorial approval, WCAG audit, screen-reader test, physical-device test, or screenshot comparison. Those are explicitly assigned to Phases 3, 4, 5 and 6; a green CI run is not release approval.

| 2026-11-21 | All 29 guides | Attributes, properties, methods, events, form integration, examples, keyboard notes and implementation limitations compared with source and canonical metadata | Source/API review recorded for all guides. Meter and Accordion documentation discrepancies corrected; visual, AT and cross-browser approval explicitly deferred | ChatGPT-assisted repository review |
