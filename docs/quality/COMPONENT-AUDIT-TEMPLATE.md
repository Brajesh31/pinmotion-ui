# Component audit: <component-id>

> Status: Pending · Phase: <phase-id> · Reviewed on: <YYYY-MM-DD>
> Source branch/commit: <branch and SHA> · Auditor: <name/tool>

## 1. Component identity

| Field | Value |
|---|---|
| Component ID | <id> |
| Custom element tag(s) | <tag(s)> |
| Canonical source file(s) | <path> |
| Generated bundle | <path> |
| Demo URL/path | <path> |
| Component README | <path> |
| Registry entry | <registry ID> |
| Runtime family | PinballKit / PinmotionExtras |
| Related issues | <IDs or none> |

## 2. Original design reference

- Approved reference source: <commit/screenshot/video/asset>
- Reference desktop screenshot: <link>
- Reference mobile screenshot: <link>
- Original behavior description: <verified description>
- Design changes explicitly approved: <none or list>

Do not approve a generic fallback as equivalent to the original artwork or mechanism.

## 3. Reproduction and defect findings

| ID | Reproduction steps | Actual result | Expected result | Severity | Root cause | Fix |
|---|---|---|---|---|---|---|
| <issue> | <steps> | <actual> | <expected> | P0/P1/P2/P3 | <cause> | <change> |

## 4. Visual audit

| Viewport/state | Screenshot | Result | Notes |
|---|---|---|---|
| 1440 CSS px, desktop | <link> | Pending | |
| 768 CSS px, tablet | <link> | Pending | |
| 390 CSS px, mobile | <link> | Pending | |
| Default | <link> | Pending | |
| Focus/hover/active | <link> | Pending | |
| Disabled/invalid/boundary | <link> | Pending | |
| Settled/reduced motion | <link> | Pending | |
| WebGL unavailable/context lost, if applicable | <link> | Pending | |

Check clipping, spacing, typography, contrast, hit targets, asset loading, overflow, animation identity and isolated-demo/gallery parity.

## 5. Public API contract

List actual observed attributes, defaults, coercion, public properties, methods, slots, CSS custom properties, event types and exact event detail shapes. Link implementation lines or tests.

| API member | Contract | Verified test | Result |
|---|---|---|---|
| Attribute | <name/type/default/observed> | <test> | Pending |
| Property | <name/type/get/set> | <test> | Pending |
| Method | <name/arguments/return> | <test> | Pending |
| Event | <name/detail/order/propagation> | <test> | Pending |
| CSS/slot | <name/behavior> | <test or visual> | Pending |

## 6. Interaction and state testing

| Scenario | Test | Result |
|---|---|---|
| Initial/default state | <test> | Pending |
| Pointer | <test> | Pending |
| Touch | <test> | Pending |
| Keyboard | <test> | Pending |
| Programmatic property/method | <test> | Pending |
| Attribute update/removal | <test> | Pending |
| Disabled/read-only | <test> | Pending |
| Empty/invalid/min/max/out-of-range | <test> | Pending |
| Repeated/rapid input | <test> | Pending |
| Reduced motion | <test> | Pending |

## 7. Forms and validation

State N/A only with a reason. Otherwise record FormData, disabled fieldset, required/constraints, checkValidity, invalid event, reset and state restoration.

## 8. Lifecycle and resilience

Test disconnect during active animations/timers/observers/audio, reconnect, duplicate script loading, mixed runtime load order, WebGL loss/recovery and fault isolation where applicable.

## 9. Accessibility

Record accessible name, role, value/state, description, focus order, visible focus, keyboard-only use, contrast, target size, dynamic announcements, reduced-motion behavior and manual assistive-technology results.

## 10. Documentation and skill changes

- README/API guide reviewed and updated: <link>
- Standalone demo fixed and manually tested: <link>
- Skill/resource changes: <link>
- llms.txt/component index/registry updates: <link>
- Example snippets executed in a clean consumer: <evidence>

## 11. CI and security evidence

| Check | Run/result |
|---|---|
| Build/docs parity | Pending |
| Source/API contract | Pending |
| Unit/contract tests | Pending |
| Chromium isolated demo | Pending |
| Chromium gallery | Pending |
| Clean consumer | Pending |
| Visual screenshots | Pending |
| Accessibility | Pending |
| Security/dependency/asset checks | Pending |

Record exact workflow run URLs, browser versions, commit SHA and pass/fail/skip counts.

## 12. Exit decision

- [ ] No open P0/P1 defects.
- [ ] Visual references approved.
- [ ] Every applicable API/interaction/form/lifecycle test passed.
- [ ] Accessibility findings fixed or documented and approved.
- [ ] README, demo, skill and generated files are accurate.
- [ ] CI evidence is green on the same commit.
- [ ] Known limitations and residual risks are documented.

**Decision:** Pending / Pass / Fail / Blocked

**Remaining issues:** <list>

**Next action:** <single concrete action>
