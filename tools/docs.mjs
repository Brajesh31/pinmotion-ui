// Write every folder's README.md and index.html, the gallery, registry.json and llms.txt from tools/spec.mjs.
//   node tools/docs.mjs          (run it after editing tools/spec.mjs, and after tools/build.mjs, since file sizes are quoted)
//   node tools/docs.mjs --check  (exits 1 if anything is out of date, and changes nothing)
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SPEC, REPO, SITE, AUTHOR, COMMON_LIMITS } from './spec.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..'), check = process.argv.includes('--check');
let stale = 0;
const put = (rel, next) => {
  let was = ''; try { was = readFileSync(join(root, rel), 'utf8'); } catch {}
  if (next !== was) { stale++; if (!check) writeFileSync(join(root, rel), next); console.log(`${check ? 'stale' : 'wrote'} ${rel}`); }
};
const bytes = (id) => statSync(join(root, id, id + '.js')).size;
const size = (id) => `${Math.round(bytes(id) / 1024)} KB`;
const table = (head, rows) => `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n` + rows.map((r) => `| ${r.join(' | ')} |`).join('\n');
const COUNT = String(SPEC.length);
const Count = COUNT;
const tags = (c) => (c.extra ? `<pinball-bumper> and <${c.tag}>` : `<${c.tag}>`);

function componentReadme(c,size,table,Count,COMMON_LIMITS){
  const a=c.api, lightweight=a.runtime==='lightweight', sharedLimits=a.commonLimits??COMMON_LIMITS;
  const attrTable=table(["Attribute","Type","Default","Applies to / update behavior"],a.attributes);
  const propTable=a.properties.length?table(["Property","Type","Access","Details"],a.properties):"No additional public properties are documented.";
  const methodTable=a.methods.length?table(["Method","Details"],a.methods):"No additional public methods are documented.";
  const eventTable=a.events.length?table(["Event","Payload and trigger"],a.events.map(([name,detail,trigger])=>[name,`${detail} ${trigger}`])):"No public events are documented.";
  return `# ${c.name}

${a.overview}

## 📦 Bundle and elements

- **Bundle:** \`${c.id}/${c.id}.js\`, approximately ${size}.
- **Custom elements:** ${a.tags.map(tag=>`\`${tag}\``).join(", ")}.
- **Dependencies:** no external runtime packages. ${lightweight?'The bundle embeds the lightweight helper and component implementation; it does not include WebGL or audio.':'The selected bundle embeds its shared runtime, artwork, and sound data.'}

## 🚀 Quick start

Load the standalone script and add the element to your HTML:

\`\`\`html
${a.quickStart}
\`\`\`

Listen to the documented events and read the current properties:

\`\`\`js
${a.example}
\`\`\`

${lightweight?'The component bundle is a plain script, not an ES module. It embeds the lightweight helper and this control; it has no external runtime dependencies.':'The component bundle is a plain script, not an ES module. Do not split it or remove its embedded artwork/runtime data. See [the repository README](../README.md) for the shadcn registry route and local development commands.'}

## 🧩 API reference

### Attributes

${attrTable}

${a.attributeUpdates}

### Properties

${propTable}

### Methods

${methodTable}

### Events

${eventTable}

The shared event helper dispatches custom events with \`bubbles: true\` and \`composed: true\`, so listeners can be attached to the custom element or an ancestor outside its Shadow DOM. Event names and payloads above describe this component's actual implementation.

## 🎮 Input and keyboard

**Pointer and touch:** ${a.input}

**Keyboard:** ${a.keyboard}

## 📝 Form integration

${a.forms}

## 🎨 Styling, rendering, and sound

${a.styling}

${lightweight?a.runtimeNotes:"The shared chrome ball and lamps use WebGL. Set the instance's `silent` attribute to mute that element, or set `PinballKit.sound = false` to mute the shared page audio. Audio initializes after the first pointer or keyboard interaction, as browsers require."}

## ♿ Motion and accessibility

${a.motion}

The interactive control lives in an open Shadow DOM and uses the semantic role and focus behavior described above. Set a useful \`label\`, or provide \`aria-label\` / \`aria-labelledby\` before connection. The repository's optional automated interaction script uses headless Chromium; it is not a substitute for a screen-reader audit.

## 🎯 Mechanical behavior

${table(["Action","Result"],a.happens)}

## ⚠️ Implementation notes and limits

${[...a.notes,...a.limits,...sharedLimits].map(note=>`- ${note}`).join("\n")}
`;
}
// the page the set was photographed for: warm cream, dark ink, the lamps' amber and the bumpers' red
const PAGE = `:root { --bg: #f3efe5; --ink: #2b2620; --dim: #7a7064; --line: #d9d1c1; --amber: #c9700f; --red: #b3322b; }
  * { box-sizing: border-box; }
  html { overflow-x: clip; background: var(--bg); }
  body { margin: 0; color: var(--ink); font: 15px/1.5 Georgia, "Iowan Old Style", "Times New Roman", serif; overflow-x: clip; }
  a { color: var(--red); } :focus-visible { outline: 2.5px solid var(--amber); outline-offset: 3px; }
  .label { font: 600 11px/1.3 "Futura", "Century Gothic", "Avenir Next", "Trebuchet MS", sans-serif; letter-spacing: .16em; text-transform: uppercase; }
  .pill { min-height: 34px; padding: 5px 14px; border: 1.5px solid var(--ink); border-radius: 999px; background: transparent; color: var(--ink); font: 600 11.5px/1.2 "Futura", "Century Gothic", "Avenir Next", "Trebuchet MS", sans-serif; letter-spacing: .12em; text-transform: uppercase; text-decoration: none; cursor: pointer; display: inline-flex; align-items: center; }
  .pill:hover { background: var(--ink); color: var(--bg); } .pill:active { translate: 0 1px; } .pill[aria-pressed="false"] { opacity: .55; }`;
const SOUND_PILL = '<button class="pill" type="button" id="sound" aria-pressed="true">Sound on</button>';
const SOUND_JS = "const snd = document.getElementById('sound'); snd.onclick = () => { PinballKit.sound = !PinballKit.sound; snd.setAttribute('aria-pressed', String(PinballKit.sound)); snd.textContent = PinballKit.sound ? 'Sound on' : 'Sound off'; };";

for (const c of SPEC) {
  // ---- the folder's README: structured API metadata is the source of truth.
  put(`${c.id}/README.md`, componentReadme(c, size(c.id), table, Count, COMMON_LIMITS));

  // ---- the folder's demo page
  put(`${c.id}/index.html`, `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pinball UI / ${c.name}</title>
<style>
  ${PAGE}
  body { min-height: 100vh; display: grid; place-items: center; }
  main { width: min(720px, 100vw - 32px); padding: 26px 0 46px; }
  .cap { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin: 0 2px 12px; color: var(--dim); }
  .cap h1 { margin: 0; color: var(--ink); font-size: 13px; white-space: nowrap; } .cap span { text-align: right; }
  .stage { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 28px; padding: 12% 0 10%; --pb-size: ${c.size.page}; }
  .said { margin: 6px 0 0; min-height: 24px; color: var(--amber); text-align: center; }
  .hint { margin: 10px 0 0; color: var(--dim); font-size: 14px; text-align: center; }
  .tools { display: flex; justify-content: center; gap: 8px; margin-top: 14px; }
  .embed body { place-items: start center; min-height: 0; } .embed .cap, .embed .hint, .embed .tools { display: none; } .embed main { padding: 0 0 8px; } .embed .stage { padding: 7% 0 5%; }
</style>
</head>
<body>
<main>
  <div class="cap label"><h1>${c.name}</h1><span>${c.kind} / &lt;${c.tag}&gt;</span></div>
  <div class="stage">
    ${c.demo.html}${c.extra ? '\n    ' + c.extra.page : ''}
  </div>
  <p class="said label" aria-hidden="true"></p>
  <p class="hint">${c.demo.hint}</p>
  ${c.api?.runtime==='lightweight'?'':'<p class="tools">'+SOUND_PILL+'</p>'}
  <p class="hint back"><a href="../gallery/">All ${COUNT}</a> · <a href="https://github.com/${REPO}/blob/main/${c.id}/README.md">Docs</a></p>
</main>
<script src="${c.id}.js"></script>
<script>
// This page's own wiring. The control is all in ${c.id}.js.
// ?embed=1 hides the heading and the hints.
const Q = new URLSearchParams(location.search), el = document.getElementById('el'), said = document.querySelector('.said');
if (Q.get('embed') === '1') { document.documentElement.classList.add('embed'); document.querySelector('.back').hidden = true; }
const say = (t) => { said.textContent = t; };
${c.wire}${c.extra ? "\ndocument.getElementById('one').addEventListener('hit', (e) => say('Clap ' + e.detail.count));" : ''}
${c.api?.runtime==='lightweight'?'':SOUND_JS}
</script>
</body>
</html>
`);
}

// ---- the gallery: every control live, with its install line and a prompt for a coding agent
const items = SPEC.map((c) => ({ id: c.id, name: c.name, tag: c.tag, tags: tags(c), kind: c.kind, runtime: c.api?.runtime || 'pinball', size: c.size.gallery, html: c.demo.html.replace(' id="el"', '') + (c.extra ? c.extra.gallery : ''), wire: c.wire, docs: c.docs, desc: c.desc }));
put('gallery/index.html', `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Pinball UI</title>
<meta name="description" content="${Count} pinball-inspired controls and lightweight Web Components, each distributed as a standalone JavaScript bundle.">
<meta property="og:title" content="Pinball UI">
<meta property="og:description" content="${Count} pinball-inspired controls and lightweight Web Components.">
<meta property="og:image" content="title.jpg">
<style>
  ${PAGE}
  .wrap { max-width: 1400px; margin: 0 auto; padding: 26px 16px 70px; }
  header { max-width: 800px; margin: 0 auto; text-align: center; }
  header img { display: block; width: 100%; height: auto; aspect-ratio: 1600 / 700; }
  h1 { margin: 10px 0 0; font-size: 17px; letter-spacing: .28em; }
  .lede { margin: 10px auto 0; max-width: 600px; color: var(--dim); font-size: 16px; }
  .links { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin: 18px 0 0; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr)); gap: 30px 26px; margin-top: 46px; align-items: stretch; }
  .item { min-width: 0; display: flex; flex-direction: column; border-top: 1.5px solid var(--ink); padding-top: 12px; }
  .cap { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin: 0 2px; color: var(--dim); }
  .cap h2 { margin: 0; color: var(--ink); font-size: 12.5px; white-space: nowrap; } .cap span { text-align: right; }
  .stage { flex: 1; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 22px; min-height: 260px; padding: 34px 0 26px; }
  .said { margin: 0; min-height: 20px; color: var(--amber); text-align: center; }
  .acts { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin-top: 10px; }
  .note { margin: 56px auto 0; max-width: 640px; text-align: center; color: var(--dim); font-size: 14px; }
  .gallery-tools { max-width: 760px; margin: 34px auto 0; display: grid; gap: 10px; text-align: center; }
  .search-label { font: 600 11px/1.3 "Futura", "Century Gothic", "Avenir Next", "Trebuchet MS", sans-serif; letter-spacing: .14em; text-transform: uppercase; color: var(--dim); }
  #component-search { width: min(100%, 560px); margin: 0 auto; min-height: 44px; padding: 10px 14px; border: 1.5px solid var(--line); border-radius: 8px; background: #fffdf7; color: var(--ink); font: 15px Georgia, serif; }
  .filters { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
  .filter.is-active { background: var(--ink); color: var(--bg); }
  .gallery-status { min-height: 22px; margin: 0; color: var(--dim); font-size: 13px; }
  .gallery-status[data-state="error"] { color: var(--red); }
  .item[hidden] { display: none !important; }
  .item .cap span { overflow-wrap: anywhere; }
  .item .acts { margin-top: auto; }
  .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
</style>
</head>
<body>
<div class="wrap">
  <header>
    <img src="title.jpg" width="1600" height="700" alt="Pinball UI hero artwork showing the original mechanical pinball control collection.">
    <h1 class="label">Pinball UI</h1>
    <p class="lede">${Count} standalone interface components. The original pinball controls use photographed mechanisms, a live chrome ball and recorded sounds; the expanded utility controls use lightweight CSS and native browser semantics. No runtime package dependencies.</p>
    <p class="links">
      <a class="pill" href="https://github.com/${REPO}" target="_blank" rel="noopener">The repo on GitHub</a>
      <a class="pill" href="https://github.com/Brajesh31" target="_blank" rel="noopener">@crtvTeknologist on X</a>
      ${SOUND_PILL}
    </p>
  </header>
  <section class="gallery-tools" aria-label="Gallery controls">
    <label class="search-label" for="component-search">Find a component</label>
    <input id="component-search" type="search" placeholder="Search components, tags, or patterns…" autocomplete="off">
    <div class="filters" role="group" aria-label="Filter components">
      <button class="pill filter is-active" type="button" data-filter="all" aria-pressed="true">All ${COUNT}</button>
      <button class="pill filter" type="button" data-filter="pinball" aria-pressed="false">Original 7</button>
      <button class="pill filter" type="button" data-filter="lightweight" aria-pressed="false">Utility 22</button>
    </div>
    <p class="gallery-status" id="gallery-status" role="status" aria-live="polite">Loading component catalogue…</p>
  </section>
  <main class="grid" id="grid" aria-busy="true"></main>
  <noscript><p class="note">JavaScript is required to render the interactive component gallery.</p></noscript>
  <p class="note">Explore the live controls. The original mechanical set initializes sound after the first interaction. Utility components use native inputs and CSS-based presentation. Test reduced-motion and browser behavior in your target environment.</p>
  <p class="sr" aria-live="polite" id="copied"></p>
</div>
<script>
(() => {
  const status = document.getElementById('gallery-status');
  const grid = document.getElementById('grid');
  const fail = (message) => {
    if (status) {
      status.textContent = 'Gallery startup failed: ' + message + '. Refresh the page or check the browser console for details.';
      status.dataset.state = 'error';
    }
    if (grid) grid.setAttribute('aria-busy', 'false');
    console.error('[Pinmotion UI] Gallery startup failed:', message);
  };
  window.addEventListener('error', (event) => {
    if (event.target instanceof HTMLScriptElement) {
      fail('a component script could not load (' + event.target.src + ')');
    } else if (event instanceof ErrorEvent) {
      fail(event.message || 'a JavaScript error prevented the gallery from starting');
    }
  }, true);
  window.addEventListener('unhandledrejection', (event) => {
    fail(event.reason?.message || String(event.reason || 'an unhandled asynchronous error occurred'));
  });
  window.addEventListener('DOMContentLoaded', () => {
    window.setTimeout(() => {
      if (grid?.getAttribute('aria-busy') === 'true') {
        fail('the gallery bootstrap did not finish');
      }
    }, 8000);
  }, { once: true });
})();
</script>
${SPEC.map((c) => `<script src="../${c.id}/${c.id}.js"></script>`).join('\n')}
<script>
// The gallery: every control live on one page, with its install line and a prompt that hands a coding agent the real file.
const REPO = '${REPO}', SITE = '${SITE}';
const ITEMS = ${JSON.stringify(items.map(({ wire, ...rest }) => rest), null, 2)};
const WIRE = {
${items.map((c) => `  ${JSON.stringify(c.id)}: (el, say) => { ${c.wire} },`).join('\n')}
};
const grid = document.getElementById('grid'), copied = document.getElementById('copied');
const status = document.getElementById('gallery-status'), search = document.getElementById('component-search');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const setStatus = (message, state = 'info') => { status.textContent = message; status.dataset.state = state; };
const copy = async (btn, text) => { try { await navigator.clipboard.writeText(text); } catch { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); } const was = btn.textContent; btn.textContent = 'Copied'; copied.textContent = 'Copied to the clipboard'; setTimeout(() => { btn.textContent = was; copied.textContent = ''; }, 1400); };
const cards = [];
for (const c of ITEMS) {
  const s = document.createElement('section'); s.className = 'item'; s.id = c.id;
  s.innerHTML = '<div class="cap label"><h2></h2><span></span></div><div class="stage"></div><p class="said label" aria-hidden="true"></p><div class="acts"><button class="pill" type="button" data-a="install">Copy install</button><button class="pill" type="button" data-a="prompt">Copy a prompt</button><a class="pill" href="../' + c.id + '/">Open</a></div>';
  s.querySelector('h2').textContent = c.name;
  s.querySelector('.cap span').textContent = c.kind + ' · ' + c.tags;
  const stage = s.querySelector('.stage'); stage.style.setProperty('--pb-size', c.size); stage.innerHTML = c.html;
  grid.appendChild(s);
  const said = s.querySelector('.said'), el = stage.querySelector(c.tag);
  cards.push({card:s, component:c, element:el, said});
  s.querySelector('[data-a=install]').addEventListener('click', (e) => copy(e.currentTarget, 'npx shadcn@latest add ' + REPO + '/' + c.id));
  const prompt = 'Add the Pinball UI "' + c.name + '" control to this project. Load ' + SITE + '/' + c.id + '/' + c.id + '.js with a plain script tag, not as a module. Keep the standalone bundle unchanged. Element: ' + c.tags + '. ' + c.desc + '\\n\\nAPI guide: https://github.com/' + REPO + '/blob/main/' + c.id + '/README.md';
  s.querySelector('[data-a=prompt]').addEventListener('click', (e) => copy(e.currentTarget, prompt));
}
const unavailable = [];
for (const entry of cards) {
  if (!entry.element) { unavailable.push(entry.component.name + ' (example element missing)'); entry.card.dataset.loadState = 'error'; continue; }
  try {
    if (!customElements.get(entry.component.tag)) throw new Error('Custom element was not registered');
    WIRE[entry.component.id](entry.element, (message) => { entry.said.textContent = message; });
    entry.card.dataset.loadState = 'ready';
  } catch (error) {
    unavailable.push(entry.component.name + ' (initialization failed)');
    entry.card.dataset.loadState = 'error';
    console.error('Pinmotion UI gallery component failed:', entry.component.id, error);
  }
}
const applyFilters = () => {
  const term = search.value.trim().toLowerCase();
  const active = document.querySelector('[data-filter].is-active')?.dataset.filter || 'all';
  let visible = 0;
  for (const {card, component} of cards) {
    const familyMatch = active === 'all' || component.runtime === active;
    const text = [component.name, component.id, component.tag, component.tags, component.kind, component.desc].join(' ').toLowerCase();
    const show = familyMatch && (!term || text.includes(term));
    card.hidden = !show;
    if (show) visible++;
  }
  setStatus(visible + ' of ' + ITEMS.length + ' components shown' + (unavailable.length ? ' · ' + unavailable.length + ' failed to initialize' : ''));
};
search.addEventListener('input', applyFilters);
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => { const selected = item === button; item.classList.toggle('is-active', selected); item.setAttribute('aria-pressed', String(selected)); });
  applyFilters();
}));
grid.setAttribute('aria-busy', 'false');
if (unavailable.length) {
  setStatus('Loaded ' + (ITEMS.length - unavailable.length) + ' of ' + ITEMS.length + '. Missing: ' + unavailable.join(', '), 'error');
  console.error('Pinmotion UI gallery load failures:', unavailable);
} else setStatus('All ' + ITEMS.length + ' live components loaded successfully.');
applyFilters();
${SOUND_JS}
</script>
</body>
</html>
`);

// ---- complete component inventory and API contract index
const describe = (items, format) => items.length ? items.map(format).join("\n") : "- None documented.";
const inventoryEntry = (component, index) => {
  const api = component.api;
  const source = api.runtime === 'lightweight' ? `extras-src/${component.id}.js` : `${component.id}/${component.id}.js`;
  const bundle = `${component.id}/${component.id}.js`;
  const tags = api.tags.map((tag) => `\`${tag}\``).join(', ');
  return `### ${index}. ${component.name} (\`${component.id}\`)

- **Implementation source:** [\`${source}\`](../${source})
- **Standalone bundle:** [\`${bundle}\`](../${bundle})
- **Custom element tag(s):** ${tags}
- **Runtime family:** ${api.runtime === 'lightweight' ? 'Lightweight utility (PinmotionExtras, CSS/native control)' : 'Original mechanical (PinballKit, WebGL scene, artwork and recorded audio)'}
- **Attributes:**
${describe(api.attributes, ([name, type, defaultValue, updates, details]) => `  - \`${name}\`: ${type}; default ${defaultValue}; ${updates}. ${details}`)}
- **Properties:**
${describe(api.properties, ([name, type, access, details]) => `  - ${name} (${type}, ${access}): ${details}`)}
- **Methods:**
${describe(api.methods, ([signature, details]) => `  - ${signature}: ${details}`)}
- **Events:**
${describe(api.events, ([name, payload, trigger]) => `  - ${name}: ${payload}. ${trigger}`)}
- **Pointer and touch:** ${api.input}
- **Keyboard:** ${api.keyboard}
- **Forms:** ${api.forms}
- **Styling:** ${api.styling}
- **Reduced motion:** ${api.motion}
- **References:** [API guide](../${component.id}/README.md) · [Live demo](../${component.id}/)
${[...api.notes, ...api.limits].length ? `\n**Implementation notes and limits:**\n${[...api.notes, ...api.limits].map((note) => `- ${note}`).join("\n")}\n` : ''}
`;
};
const originalComponents = SPEC.filter((component) => component.api?.runtime !== 'lightweight');
const utilityComponents = SPEC.filter((component) => component.api?.runtime === 'lightweight');
const inventory = `# 🧩 Pinmotion UI component inventory and API contract index

> **Generated document.** Do not edit this file directly. Update the structured component contracts in \`tools/spec.mjs\` or \`tools/extras-spec.mjs\`, then run \`npm run docs\`.

## 📊 Inventory summary

| Inventory item | Verified count |
| --- | ---: |
| Standalone component bundles | ${SPEC.length} |
| Original mechanical bundles | ${originalComponents.length} |
| Lightweight utility bundles | ${utilityComponents.length} |
| Registered custom-element tags | ${SPEC.reduce((count, component) => count + component.api.tags.length, 0)} |
| Dedicated component demo pages | ${SPEC.length} |
| Component API guides | ${SPEC.length} |
| Component registry entries | ${SPEC.length} |

The original seven are preserved as a separate visual and runtime family. The utility controls extend the collection without replacing or flattening the original components.

## 🧭 Source of truth and audit method

- \`tools/build.mjs\` defines the ordered build inventory and separates the seven original bundles from the 22 utility bundles.
- \`tools/spec.mjs\` defines the original component specifications and imports the additional specifications from \`tools/extras-spec.mjs\`.
- The 22 utility implementation sources live in \`extras-src/\`. \`tools/build.mjs\` combines each one with \`tools/extra-core.js\` to create its standalone bundle.
- The original seven implementation bundles include the standalone PinballKit runtime, component artwork and recorded audio.
- \`tools/docs.mjs\` generates this inventory, every component README, every component demo, the gallery catalogue, \`registry.json\` and \`llms.txt\`.
- \`tools/validate.mjs\` checks source registration tags, observed attributes, documented public member names, component artifacts and registry coverage. \`npm run docs -- --check\` and \`npm run build -- --check\` detect generated-file drift.

## 🎱 Original mechanical controls (${originalComponents.length})

These are the original Pinball UI controls. Their distinctive photographed mechanisms, WebGL chrome ball, shared PinballKit runtime and recorded sound are retained.

${originalComponents.map((component, index) => inventoryEntry(component, index + 1)).join("\n")}

## 🧰 Lightweight utility controls (${utilityComponents.length})

These controls use the separate PinmotionExtras base and native/CSS implementations. When loaded alone, they do not require the original PinballKit runtime, WebGL shader or recorded audio. When PinballKit is already present, supported utility backglass details can reuse its shared chrome-ball renderer and sound effects.

${utilityComponents.map((component, index) => inventoryEntry(component, originalComponents.length + index + 1)).join("\n")}

## ⚠️ Cross-component contract caveats

- **Toggle:** its \`change\` event carries the checked state; its \`input\` event is a plain Event without a \`detail\` payload.
- **Pop bumpers:** the single bumper and the three-bumper cluster both emit \`hit\`, but the two variants have different payload shapes.
- **Drop targets:** the \`bonus\` event is tied to the normal-motion impact callback. Use \`change.detail.allChecked\` for application logic that must also work with reduced motion.
- **Plunger:** its pull-and-release animation currently continues when reduced motion is requested.
- **Progress:** the indeterminate mode uses a CSS animation and does not currently provide a separate reduced-motion override.
- **Forms:** a form-associated custom element needs browser support for \`ElementInternals\`. The per-component guide describes the value actually submitted or explains why the control does not submit a form value.
- **File Drop:** selection exposes File objects to the consuming application. The component does not upload files automatically.

## ✅ What this inventory does and does not verify

The source-level checks establish that documented custom-element registrations, observed-attribute declarations, public property/method names and event names are represented in the component specifications. Generated guides, demos, bundles and registry entries are also checked for presence and parity.

This static audit does **not** prove event timing or payload semantics, actual keyboard behavior, form validation/reset behavior, browser compatibility, screen-reader support, or visual quality. Those require the interaction, accessibility, compatibility and release phases in the [release plan](RELEASE-PLAN.md).

## 🔧 Updating the inventory

1. Inspect the actual implementation before changing an API contract.
2. Update the matching structured specification.
3. Run \`npm run build\` when bundle inputs change.
4. Run \`npm run docs\` to regenerate guides, demos and this inventory.
5. Run \`npm run check\` and the required browser suite.
6. Review the generated diff and preserve all original component behavior.
`;
put('docs/component-inventory.md', inventory);

// ---- registry.json, for `npx shadcn add Brajesh31/pinmotion-ui/NAME`
put('registry.json', JSON.stringify({
  $schema: 'https://ui.shadcn.com/schema/registry.json', name: 'pinball-ui', homepage: SITE,
  items: SPEC.map((c) => ({
    name: c.id, type: 'registry:file', title: `Pinball UI ${c.name}`,
    description: `${c.desc} One standalone file of about ${size(c.id)} with no external runtime dependencies; ${c.api?.runtime === 'lightweight' ? 'includes the lightweight helper.' : 'includes PinballKit, artwork and recorded sound.'} Defines ${tags(c)}.`,
    author: AUTHOR, categories: c.categories,
    files: [{ path: `${c.id}/${c.id}.js`, type: 'registry:file', target: `~/public/pinball-ui/${c.id}.js` }],
    docs: `Pinball UI ${c.name} is a plain script that registers a custom element. Load /pinball-ui/${c.id}.js with a script tag (not a module), ${c.docs} Size it with --pb-size. More: ${SITE}`,
  })),
}, null, 2) + '\n');

// ---- llms.txt
put('llms.txt', `# Pinball UI

> ${Count} ordinary UI controls as real pinball parts: photographed bodies (a lane, a shooter rod, flippers and a score reel, a drop-target bank, an outhole, pop bumpers), a chrome ball drawn live in WebGL that mirrors what is under it, and recorded sounds (solenoids, relays, chimes, a rolling ball). Each is one plain script that registers a custom element, with its photographs and sounds inside it: no dependencies, no build step, no other files to fetch. Licensed under the MIT License, Copyright (c) 2026 Brajesh Kumar. No real machine's names, art or logos are used.

Live gallery: ${SITE}
Source: https://github.com/${REPO}

## Drop-in controls

Each is one plain script that registers a custom element. Load it with a script tag, not as a module. The original seven bundles include PinballKit, WebGL artwork and recorded sounds; the 22 utility bundles use a separate lightweight CSS/native helper and do not require WebGL or audio.

${SPEC.map((c) => `- [${c.name}](${SITE}/${c.id}/${c.id}.js) (${c.kind}, about ${size(c.id)}): ${c.desc} \`${tags(c)}\`: ${c.docs.replace(/^then use /, 'Use ')} [Docs](https://github.com/${REPO}/blob/main/${c.id}/README.md)`).join('\n')}

Install any one with the shadcn CLI: \`npx shadcn add ${REPO}/NAME\`, where NAME is ${SPEC.map((c) => c.id).join(', ')}. The file lands in \`public/pinball-ui/\`.

Follow each component README for its supported attributes, properties, events, styling and form behavior. The original mechanical controls use --pb-size and --pb-page, and their sound can be muted with silent or PinballKit.sound = false. Form-associated utility controls use ElementInternals where browser support permits.

## The skill

- [pinball-ui skill](${SITE}/skills/pinball-ui/SKILL.md): the workflow and rules these were made by. Install with \`npx skills add ${REPO}\`.
- [core.js](${SITE}/skills/pinball-ui/core.js): the shared core (the clock, the custom-element base, one WebGL context, the chrome ball's shader, the sounds).
- [starter.html](${SITE}/skills/pinball-ui/starter.html): the smallest whole example, a ball in a lane drawn without photographs.
- [look.mjs](${SITE}/skills/pinball-ui/look.mjs): photographs a page at chosen moments after an action and saves the frames side by side.

## How it was made

- [making-of/README.md](${SITE}/making-of/README.md): the directions that were dropped, how the plates were made and lined up, how the ball is drawn, and where the sounds came from.
- [making-of/prompts.md](${SITE}/making-of/prompts.md): every image and sound prompt and setting.
`);
if (check && stale) process.exit(1);
