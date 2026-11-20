# ✅ Pinmotion UI stable release checklist

> **Release status: NO-GO until every mandatory item is checked and evidenced.**  
> Complete this checklist against one frozen release-candidate commit.

## A. Build and generated output

- [ ] Clean checkout succeeds.
- [ ] Node/npm versions match the project engine requirement.
- [ ] `npm ci` passes.
- [ ] `npm run build` passes.
- [ ] `npm run docs` passes.
- [ ] `npm run check` passes.
- [ ] Gallery inline runtime parses as JavaScript.
- [ ] All generated guides, demos, registry files and llms.txt match their sources.
- [ ] No uncommitted generated output remains.

## B. Component inventory and behavior

- [ ] All 29 standalone bundles are present.
- [ ] All 30 custom-element tags are unique and register.
- [ ] All 29 component cards appear on the first gallery load.
- [ ] All 29 gallery cards initialize successfully.
- [ ] All 29 standalone demo routes work.
- [ ] All 29 API guides match the implementation.
- [ ] All 29 registry entries work in a clean consumer project.
- [ ] Each documented property, method, event and state has test evidence.
- [ ] Forms, reset, keyboard, pointer, touch and disabled behavior pass.
- [ ] The original seven mechanical components have no regressions.

## C. Gallery and site reliability

- [ ] Gallery does not remain on “Loading component catalogue…”.
- [ ] Gallery reports a successful 29/29 ready state.
- [ ] A failing component script produces a visible diagnostic.
- [ ] A gallery bootstrap exception produces a visible diagnostic.
- [ ] Search and Original/Utility filters work.
- [ ] Hard refresh works on the gallery route.
- [ ] Every direct component URL and asset works.
- [ ] No broken links, missing assets or unexpected 404s remain.
- [ ] Browser console has no unexplained errors or warnings.

## D. Visual, responsive and browser QA

- [ ] Desktop gallery and every component family visually approved.
- [ ] Tablet layout approved.
- [ ] Small phone layout approved.
- [ ] Large text, zoom and narrow container cases pass.
- [ ] No horizontal overflow, overlap, clipping or layout shift defects.
- [ ] Chrome and Edge pass.
- [ ] Firefox passes.
- [ ] Safari desktop passes.
- [ ] iOS Safari passes on a real device.
- [ ] Android Chrome passes on a real device.
- [ ] WebGL and no-WebGL behavior are verified.
- [ ] Audio permission and mute behavior are verified.

## E. Accessibility

- [ ] WCAG 2.2 A and AA success criteria reviewed for complete pages.
- [ ] Keyboard-only navigation passes.
- [ ] Visible focus, focus order and target sizes pass.
- [ ] Accessible names, roles, state and relationships pass.
- [ ] Forms and error announcements pass.
- [ ] Dialog and dynamic status announcements pass.
- [ ] Reduced-motion behavior passes for every component.
- [ ] Screen-reader test with NVDA is complete.
- [ ] Screen-reader test with VoiceOver is complete.
- [ ] Screen-reader test with TalkBack is complete.
- [ ] Accessibility report contains findings, remediations and retest evidence.
- [ ] No accessibility conformance claim exceeds the evidence.

## F. Security, privacy and distribution

- [ ] Secret scan is clean.
- [ ] Dependency/security audit is clean.
- [ ] License audit is clean.
- [ ] Workflow permissions are least-privilege.
- [ ] No unapproved runtime dependency has been added.
- [ ] File selection/drop behavior does not upload without consumer code.
- [ ] Registry and install instructions are tested in a clean project.
- [ ] Package metadata and publication scope are approved.
- [ ] The MIT license and copyright notice are correct.

## G. Documentation and release materials

- [ ] README describes the actual release.
- [ ] Every component API guide has been verified.
- [ ] Installation and framework integration guides pass in clean examples.
- [ ] Support matrix is published.
- [ ] Known limitations are published.
- [ ] Changelog and release notes are complete.
- [ ] Versioning and deprecation policy are published.
- [ ] Troubleshooting and issue-reporting guides work.
- [ ] Screenshots and diagrams match the final release candidate.

## H. CI/CD and release operations

- [ ] Full automated validation passes on the frozen commit.
- [ ] Full browser test suite passes.
- [ ] Supported browser matrix has passing evidence.
- [ ] Visual regression review is approved.
- [ ] Accessibility audit is approved.
- [ ] Performance budgets pass.
- [ ] Security and license scans pass.
- [ ] Deployment artifact is reproducible.
- [ ] Rollback procedure has been rehearsed.
- [ ] A failed mandatory check blocks stable publication.
- [ ] Release candidate commit SHA is recorded.

## I. Formal decision

- [ ] No open P0, P1 or P2 defects in the release scope.
- [ ] Every confirmed release-scope bug is closed and retested.
- [ ] All mandatory phase exit gates have passed.
- [ ] All remaining platform limitations are documented and explicitly accepted.
- [ ] Maintainer final review is complete.
- [ ] Release version is approved.
- [ ] Stable Git tag and GitHub Release are created from the approved commit.
- [ ] Stable site and artifacts are verified after publication.

**Decision:** [ ] NO-GO  [ ] GO

**Release candidate commit:** 

**Release version:** 

**Validation run:** 

**Browser QA report:** 

**Accessibility report:** 

**Known limitation approvals:** 

**Maintainer approval and date:** 

Do not publish a stable release while any mandatory checkbox is incomplete.
