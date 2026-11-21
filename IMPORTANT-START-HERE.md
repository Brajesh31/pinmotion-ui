# IMPORTANT: Continue Pinmotion UI Work From Here

> **READ THIS FILE FIRST AT THE START OF EVERY NEW CHATGPT CONVERSATION.**
>
> This file is the project handoff and operating instruction. ChatGPT conversation limits may require work to continue in a new chat. Do not restart the project, repeat completed work, or invent a new plan. Read this file, inspect the live repository, and continue from the latest verified state.

**Repository:** https://github.com/Brajesh31/pinmotion-ui  
**Canonical branch:** `main`  
**Project owner:** Brajesh Kumar  
**Current product:** Pinmotion UI, a pinball-inspired browser-native Web Components library  
**Release target:** Public npm package and stable GitHub release, only after every required phase passes  
**Release status:** NO-GO until the release checklist is satisfied

---

## 1. Mandatory GitHub editing instruction

**DO NOT CREATE A PULL REQUEST. DO NOT CREATE A NEW BRANCH. EDIT THE EXISTING FILES DIRECTLY ON `main`.**

This is an explicit project-owner instruction for all future work in this repository.

When implementing any phase:

1. Fetch the latest repository metadata and confirm the default branch is `main`.
2. Read the latest version of every file that will be changed.
3. Make the required changes directly on `main` using the GitHub file editing/commit capability.
4. For an existing file, use its latest blob SHA when updating it. For a new file, create it directly on `main`.
5. Never overwrite unseen changes. Re-fetch the file if its SHA changed.
6. Do not create a branch, fork, draft PR or regular PR.
7. Do not ask the owner to apply a patch manually when direct repository editing is available.
8. Do not merge or close unrelated PRs, delete branches, rewrite history, force-push or delete files unless the owner explicitly asks.
9. Commit focused changes directly to `main`. For a component batch, keep its source, tests, docs, skill and generated output changes traceable.
10. After every change, report the exact files, commit SHA, tests and remaining work.

If a GitHub permission or tool limitation prevents a direct edit to `main`, stop and explain the exact blocker. Do not silently fall back to a branch or PR.

---

## 2. Copy-paste command for a new ChatGPT chat

Paste this command at the beginning of every new conversation:

```text
Continue the existing Brajesh31/pinmotion-ui repository work. First read the root file IMPORTANT-START-HERE.md completely, then inspect the latest state of the main branch and the linked phase, component-audit, defect, visual-baseline and workflow documents. Do not restart completed work and do not assume that old progress claims are still current. Follow the phase order in docs/RELEASE-READINESS-PROGRAMME.md. Work on only the next incomplete phase and only its assigned component batch. Audit, fix and test each component individually, preserve the original Pinmotion pinball design and behavior, update its source, tests, standalone demo, gallery output, README/API documentation, skill resources and audit evidence, then run the relevant build and CI checks before moving to the next component. IMPORTANT GITHUB RULE: do not create a branch, fork or pull request. Edit and commit the actual repository files directly on the existing main branch. Read each file's latest contents and SHA before changing it. Never claim a component, phase, security scan or release gate is complete without verifiable evidence. Report exact changed files, commit SHA, test commands/results, screenshots, open defects and the next incomplete phase. Do not publish npm or create a stable release until every mandatory release gate passes.
```

---

## 3. Project goal

Bring Pinmotion UI to a complete, reliable and publicly distributable package, at an engineering and release standard comparable to the owner's VFX UI Anime project:

https://github.com/Brajesh31/vfx-ui-anime

The goal is not merely to add more components. The goal is to make the existing catalogue correct, visually consistent, well documented, securely maintained, independently usable and installable with npm.

Final target usage, after the package has actually been built and published:

```bash
npm install pinmotion-ui
```

```js
// Register all components in a browser entry point
import 'pinmotion-ui';

// Or load one component only
import 'pinmotion-ui/toggle';
```

These commands describe the intended package contract. They must not be advertised as working installation commands until the package exports, tarball and clean-consumer tests pass and the package is published.

## 4. Preserve the original design

Pinmotion's defining feature is its pinball-inspired physical interaction and visual identity.

- Preserve the original chrome-ball rendering, artwork, proportions, lamps, mechanical controls, colors, materials, animation identity and sound behavior.
- Do not replace the original controls with generic toggles, sliders or buttons just to make tests pass.
- The owner has reported that the original four components are not working as intended, that other components are also broken, and that multiple components/cards in the gallery do not render properly.
- The working hypothesis for the original four is Toggle, Slider, Plunger and Stepper. Confirm this against original commits, source history and visual references before treating it as final.
- Fix canonical source files first, then regenerate standalone bundles, demos, documentation, gallery and registry.
- Keep the two runtime families intentional: PinballKit for original mechanical/WebGL/audio controls and PinmotionExtras for lightweight utility controls. Do not merge or rewrite them without evidence that doing so improves reliability and preserves behavior.

## 5. Current known repository baseline

The last inspected repository state had:

- 29 standalone component bundles.
- 30 custom-element tags.
- 29 standalone demo routes.
- 29 component API guides.
- Seven original mechanical components and 22 utility components.
- Canonical specifications in `tools/spec.mjs` and `tools/extras-spec.mjs`.
- Shared source runtimes in `core.js` and `tools/extra-core.js`.
- Build and documentation generation in `tools/build.mjs` and `tools/docs.mjs`.
- Validation, integrity and browser tooling in `tools/validate.mjs`, `tools/integrity.mjs`, `tools/audit-components.mjs`, `tools/test.mjs` and `tools/test-consumer.mjs`.
- The root `package.json` was private at version `0.0.0-private`, not yet a public npm package.
- The project release status was NO-GO.

This is a handoff snapshot, not a substitute for checking the live repository. Always re-fetch current `main`, status files and latest workflow evidence before deciding what is next.

## 6. Authoritative project documents

Read and maintain these documents:

| File | Purpose |
|---|---|
| `docs/RELEASE-READINESS-PROGRAMME.md` | Controlling sequential phase plan from defect reproduction to stable npm publication |
| `docs/quality/COMPONENT-AUDIT-MATRIX.md` | Status of every one of the 29 component bundles and its independent acceptance gates |
| `docs/quality/COMPONENT-AUDIT-TEMPLATE.md` | Required report format for each individual component audit |
| `docs/quality/DEFECT-REGISTER.md` | Reproducible defect records, expected results, root causes and fixes |
| `docs/quality/VISUAL-BASELINE.md` | Reference screenshots and desktop/tablet/mobile visual approval |
| `docs/WORKFLOW-PLAN.md` | GitHub Actions, CI/CD, security, package, release and post-release workflow plan |
| `docs/RELEASE-PLAN.md` | Existing release policy, phase status, stop-ship rules and release evidence |
| `docs/RELEASE-CHECKLIST.md` | Final stable release go/no-go checklist |
| `docs/PHASE-1-2-ACCEPTANCE-MATRIX.md` | Historical and current functional/contract evidence; update it as new evidence is produced |
| `docs/ROADMAP.md` | High-level phase tracker |
| `docs/README.md` | Documentation index |
| `docs/component-inventory.md` | Generated inventory and API metadata for all components |
| `docs/architecture.md` | Runtime and system architecture |
| `docs/design-system.md` | Visual tokens and design language |
| `docs/accessibility.md` | Current accessibility behavior and known limitations |
| `llms.txt` | Machine-readable project orientation |

The release-readiness programme is the sequencing authority for the expanded component-by-component programme. The existing release plan and acceptance matrix remain important historical evidence and must be reconciled rather than discarded.

---

## 7. Required phase order

Do not audit all components at once. The following is the ordered programme. Complete a component batch and its gate before beginning the next batch.

| Phase | Scope |
|---|---|
| 0 | Reproduce defects, confirm original four, capture visual/behavior baseline and create evidence register |
| 1A | Original component: Toggle |
| 1B | Original component: Slider |
| 1C | Original component: Plunger |
| 1D | Original component: Stepper |
| 2A | Targets and Drain |
| 2B | Bumper, including both custom-element tags |
| 3 | Checkbox, Radio Group, Segmented |
| 4 | Progress, Meter, Rating |
| 5 | Tabs, Accordion, Disclosure |
| 6 | Tooltip, Dialog, Toast |
| 7 | Breadcrumbs, Pagination, Search |
| 8 | Text Field, Text Area, Select |
| 9 | Combobox, File Drop, Date Picker, Color Picker |
| 10 | PinballKit, PinmotionExtras, shared runtime, WebGL, audio, assets, scheduling and cleanup |
| 11 | All gallery cards, filters, demo routes, loading/error states and responsive behavior |
| 12 | Full README/API documentation, documentation site/index and skill system |
| 13 | TypeScript declarations and framework integration examples/support contract |
| 14 | npm package entry points, exports, tarball and clean consumer installation |
| 15 | Security and supply chain: CodeQL, dependency review, secret scanning, license/asset audit, Scorecard and hardened workflows |
| 16 | Accessibility: keyboard, focus, contrast, reduced motion, screen readers and applicable WCAG checks |
| 17 | Browser/device compatibility: Chromium, Edge, Firefox, Safari, Android and iOS |
| 18 | Performance, bundle budgets, memory, lifecycle stress and visual regression |
| 19 | Exact-SHA release candidate, npm publication, GitHub Release and post-release verification |

If Phase 0 proves the original four are not Toggle, Slider, Plunger and Stepper, correct the phase records before implementation.

### Per-component completion gate

Every component must pass all applicable checks before its batch is marked complete:

1. Correct rendering and original design fidelity.
2. Default, focus, hover, active, disabled, invalid, boundary and responsive states.
3. Attributes, defaults, properties, methods, events and exact payloads.
4. Pointer, touch, keyboard and programmatic interactions.
5. Forms, validation, FormData, reset and restoration where applicable.
6. Disconnect/reconnect and cleanup of timers, animation frames, observers and listeners.
7. Accessible name, role, state/value, focus and reduced-motion behavior.
8. Standalone demo and full-gallery behavior.
9. README/API guide, examples and skill resources.
10. Generated bundle, registry and documentation parity.
11. CI test evidence, screenshots and a completed component audit report.

A component is not complete just because its script parses or its card appears in the gallery.

---

## 8. Documentation and skill requirements

Every component batch must update its component README/API guide and related skill resources during that batch.

The final documentation system must include:

- Root README, CHANGELOG, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY and SUPPORT.
- Component index and 29 individual API guides.
- Architecture, runtime, generator and build documentation.
- Visual/animation design system and asset/sound provenance.
- API conventions, forms, events and integration examples.
- Testing and component audit instructions.
- Accessibility and browser compatibility.
- Performance and troubleshooting.
- npm package usage and release instructions.
- Quality status, phase evidence and release checklist.
- `llms.txt`.
- A main `skills/pinmotion-ui/SKILL.md`.
- Component authoring, component audit, debugging and release/security skills with resource files.

Skills must tell agents to edit canonical sources and regenerate generated files. Skills must not encourage manual edits to generated bundles.

---

## 9. Required GitHub Actions and workflows

The target workflow system must be implemented and verified in phases, not merely documented:

- Validate: build, docs parity, syntax, structure, integrity, browser and consumer tests.
- Component regression: focused tests for the component batch being changed.
- Visual regression: screenshots at desktop/tablet/mobile sizes with reviewed baselines.
- Deploy Pages: build, upload, deploy and verify the exact published artifact and all routes.
- CodeQL: application security analysis.
- CodeQL alert inventory: archive current open alerts after scans.
- Dependency review and npm audit.
- Secret scanning / supplemental Gitleaks.
- License and asset provenance audit.
- OpenSSF Scorecard.
- npm tarball/package smoke tests in a clean consumer.
- Release candidate workflow.
- Protected npm publish workflow using OIDC/trusted publishing when supported.
- Post-release workflow verifying npm install, version, provenance, tarball and live website.
- Controlled component/build generation workflow.

Inspect and improve existing workflows before adding duplicates. Use minimum required permissions, pinned action SHAs for hardened release workflows, protected environments and safe artifact handling. Do not store publishing tokens in source files or workflow YAML.

---

## 10. Security and release rules

- Add and maintain a clear SECURITY.md and private vulnerability reporting path.
- Audit browser-facing HTML, text, URLs, DOM construction, file handling and dynamic attributes.
- File Drop must never execute or automatically upload user files.
- Review WebGL resource cleanup and audio lifecycle.
- Audit artwork, fonts and recorded sound provenance and license compatibility.
- Use CodeQL, dependency review, npm audit, secret scanning, Scorecard and least-privilege workflow permissions.
- Fix actionable findings or record a justified risk acceptance. Never claim "zero vulnerabilities" without dated scan evidence.
- Do not publish npm while component phases, mandatory CI, security, accessibility, compatibility or performance gates remain open.
- Do not advertise `npm install pinmotion-ui` as available until public package publication is verified.
- The release must use a versioned changelog, exact Git tag/SHA, clean package tarball, checksum and post-publication verification.

---

## 11. How to work after every component batch

At the end of each batch, update the audit matrix and report:

- Exact phase and component IDs.
- Defects reproduced, root causes and fixes.
- Canonical source files changed.
- Generated bundles/demos/gallery/registry/docs changed.
- Component README/API and skill updates.
- Tests run, browser versions, pass/fail/skipped counts.
- Before/after screenshot links and viewport sizes.
- CI workflow run URLs and exact commit SHA.
- Remaining defects, limitations and security findings.
- Whether the exit criteria passed.
- The next incomplete phase.

If tests fail, fix the current batch before advancing. Do not claim success based on partial tests.

## 12. First action in a new chat

1. Read this entire file.
2. Fetch the latest `main` branch and current repository tree.
3. Read the authoritative programme, component audit matrix, defect register, visual baseline and workflow plan.
4. Read the latest release-plan and acceptance-matrix evidence.
5. Inspect the original component history and identify the original four with evidence.
6. Determine the next incomplete phase from the live documents and CI, not from a previous chat summary.
7. Continue the next phase directly on `main`, without a PR or new branch.

**Never restart from scratch. Never silently skip a component. Never claim an audit or release gate is complete without evidence.**
