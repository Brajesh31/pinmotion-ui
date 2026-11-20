# 🎨 Renderer parity and mechanical visual fidelity

## Phase 8 implementation checkpoint

The utility components now share more than the original palette. Their common base renders a component-specific backglass emblem, a numbered machine label, three pilot lamps, a brushed-metal deck, recessed fasteners, and a CSS chrome-ball fallback.

The 22 utility bundles remain standalone. They do not embed or initialize PinballKit, WebGL shader source, or recorded sound data.

## Conditional reuse of the original chrome-ball renderer

When an original mechanical component has already initialized `window.PinballKit`, the utility base checks for the existing `glsl`, `program()`, `paint()`, and `getGL()` helpers. If those functions are available and WebGL is working, the small backglass marker reuses the original shared chrome-ball shader and WebGL context.

The renderer program is cached once for the utility base. Component interactions update its roll angle and briefly pulse the backglass lamps. The marker observes `prefers-reduced-motion` and draws a static updated frame instead of animating when reduced motion is requested.

When the utility bundle is loaded alone, or PinballKit/WebGL is unavailable, the existing CSS sphere remains visible. The component's native input behavior does not depend on the shader or sound.

## Individual utility emblems

Each of the 22 utility custom elements has a distinct small SVG mechanism mark in the backglass. The symbols are decorative and hidden from assistive technology. They do not replace labels, accessible names, state attributes, or native control semantics.

## What this does not claim

This is a visual fidelity improvement, not full renderer parity:

- The original seven still use individually photographed WebP plates and their own mechanical scene shaders.
- The 22 utility component bodies still render with CSS and native HTML controls.
- The small shared-shader chrome ball is a backglass detail, not a WebGL rendering of each utility control's full body.
- The vector emblems are original decorative artwork, not photographic plates.
- This change does not establish cross-browser WebGL support or a screen-reader certification.

Full parity would require original component-specific artwork plates and dedicated live mechanical scenes for the utility controls. That work should be evaluated control by control rather than applying one generic shader to every utility pattern.

## Verification

The repository validation and integrity checks verify that every utility element has its own backglass model, that the shared shader reuse path exists, and that no PinballKit runtime or audio payload is embedded in utility bundles.

The Chromium gallery interaction suite additionally checks all 22 emblems and confirms that the marker uses the already-loaded PinballKit shader in the full gallery.

Run:

```sh
npm run check
npm run test:browser
```

The automated renderer check requires the full gallery, where an original mechanical bundle loads PinballKit before the utility components. Standalone utility demos intentionally exercise the CSS fallback path.
