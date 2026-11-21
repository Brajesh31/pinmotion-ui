# 📚 Phase 1 API guide review ledger

> **Purpose:** Track semantic review of every generated API guide.  
> **Date opened:** 21 November 2026  
> **Phase status:** In progress

## Review standard

Every guide must be reviewed against its actual implementation source and the corresponding metadata in `tools/spec.mjs` or `tools/extras-spec.mjs`. Generated-file parity and automated source checks are useful evidence, but they do not replace semantic review.

A guide can be marked **Reviewed** only after all applicable sections below have been compared with the implementation and any discrepancy has been fixed or recorded:

- [ ] Attributes, types, defaults, coercion and update timing.
- [ ] Public properties, read/write behavior, return types and side effects.
- [ ] Public methods, parameter defaults, return values and effects.
- [ ] Events, payload values, event order, propagation and dispatch conditions.
- [ ] Input modalities, keyboard instructions, disabled and boundary behavior.
- [ ] Form association, reset, restore and validity behavior where applicable.
- [ ] Styling hooks, responsive limits, rendering fallbacks and reduced-motion claims.
- [ ] Examples, quick-start snippets and stated limitations.

## Per-guide status

| Component | API guide | Generated parity / structure | Source contract audit | Manual semantic review |
| --- | --- | --- | --- | --- |
| toggle | [toggle/README.md](../toggle/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| slider | [slider/README.md](../slider/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| plunger | [plunger/README.md](../plunger/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| stepper | [stepper/README.md](../stepper/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| targets | [targets/README.md](../targets/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| drain | [drain/README.md](../drain/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| bumper | [bumper/README.md](../bumper/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| checkbox | [checkbox/README.md](../checkbox/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| radio-group | [radio-group/README.md](../radio-group/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| segmented | [segmented/README.md](../segmented/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| progress | [progress/README.md](../progress/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| meter | [meter/README.md](../meter/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| rating | [rating/README.md](../rating/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| tabs | [tabs/README.md](../tabs/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| accordion | [accordion/README.md](../accordion/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| disclosure | [disclosure/README.md](../disclosure/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| tooltip | [tooltip/README.md](../tooltip/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| dialog | [dialog/README.md](../dialog/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| toast | [toast/README.md](../toast/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| breadcrumbs | [breadcrumbs/README.md](../breadcrumbs/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| pagination | [pagination/README.md](../pagination/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| search | [search/README.md](../search/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| text-field | [text-field/README.md](../text-field/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| text-area | [text-area/README.md](../text-area/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| select | [select/README.md](../select/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| combobox | [combobox/README.md](../combobox/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| file-drop | [file-drop/README.md](../file-drop/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| date-picker | [date-picker/README.md](../date-picker/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |
| color-picker | [color-picker/README.md](../color-picker/README.md) | <badge color="success">Generated parity</badge> | <badge color="success">Automated source audit</badge> | <badge color="warning">Manual review pending</badge> |

## Current evidence

- Generated guide parity and required section checks run through `npm run docs:check` and repository validation.
- Automated source-to-contract checks run through `tools/audit-components.mjs`.
- Runtime prototype descriptor and public method availability checks run through `npm run test:consumer`.
- The current passing evidence is linked in [PHASE-1-CONTRACT-AUDIT.md](PHASE-1-CONTRACT-AUDIT.md).

## Review log

| Date | Component(s) | Scope reviewed | Outcome / discrepancy | Reviewer |
| --- | --- | --- | --- | --- |
| 2026-11-21 | Plunger, Progress | Reduced-motion source behavior and guide metadata | Corrected inaccurate reduced-motion descriptions in spec, guides and inventory; full guide review remains open | ChatGPT-assisted repository audit |
| 2026-11-21 | Drop Targets, Bumper | Event payload variants and event documentation | Confirmed distinct source payload variants are represented in event metadata; full guide review remains open | ChatGPT-assisted repository audit |

**Important:** This ledger intentionally leaves every guide's manual semantic review pending. Passing CI does not equal human sign-off.
