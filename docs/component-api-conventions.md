# 📐 Component API documentation conventions

This document defines how Pinmotion UI component contracts are documented. A polished API guide is useless when it describes behavior the implementation does not provide.

## 1. Source of truth

- Read the actual distributed bundle before describing an attribute, property, method, event, key binding, or form value.
- Keep structured API metadata beside the component entry in `tools/spec.mjs` under `api`.
- `tools/docs.mjs` generates each component README from that metadata.
- Keep [component-reference.md](component-reference.md) as a summary and navigation page, not a second full API specification.

## 2. Attribute contract

Every attribute row records exact spelling, value type, default or absence behavior, whether it is observed after connection, and its effect on state, accessibility, or forms. Do not imply an attribute updates live unless it appears in the component's observed-attribute list or the shared base explicitly handles it. Document attributes read only during connection as connection-time configuration.

## 3. Property and method contract

- Mark properties as read/write, read-only getters, or readable state fields.
- Use actual property names and value types from the implementation.
- Include method parameter defaults and explain whether programmatic calls emit events.
- Do not promote internal animation helpers or shader methods to stable consumer API unless the project intentionally supports them.

## 4. Event contract

Every event row documents its name and type, exact detail payload, trigger condition, and whether programmatic updates emit it. Include event ordering and reduced-motion caveats when they change integration behavior.

The shared base emits bubbling, composed custom events. Exceptions must be called out explicitly. Toggle's `input` is a plain `Event` without `detail`. Drop Targets' `bonus` is coupled to its impact animation and is not emitted when reduced motion bypasses that path. The bumper bundle defines two `hit` events with different payload shapes.

## 5. Interaction and semantics

Document pointer/touch gestures and keyboard keys separately. Name the actual internal semantic element and role. Avoid claims about screen-reader compatibility unless a screen-reader test is part of the repository's evidence.

## 6. Forms

Identify whether the component is form-associated, what exact value it contributes, and when an empty or unchecked value is omitted. Note that `ElementInternals` support is browser-dependent. Action controls without a form value must say so.

## 7. Styling and rendering

Document `--pb-size`, its default height, `--pb-page` as the hex page colour reflected by the ball, `--pb-focus`, fixed aspect-ratio behavior, and extra space required for moving parts. State the WebGL dependence and the visual degradation when WebGL is unavailable.

## 8. Accessibility and reduced motion

State the actual semantic role and keyboard behavior. Document the reduced-motion behavior of each component, including exceptions that affect event dispatch. The presence of ARIA roles is not evidence of a completed assistive-technology audit.

## 9. Release checklist for an API change

- [ ] Confirm behavior in the current component bundle.
- [ ] Update `tools/spec.mjs` API metadata.
- [ ] Regenerate component guides with `npm run docs`.
- [ ] Update the cross-component API reference and this page when conventions change.
- [ ] Run `npm run check`.
- [ ] Review generated Markdown and local links.
- [ ] Confirm application source and behavior were not changed accidentally.
