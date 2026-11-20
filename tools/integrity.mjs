#!/usr/bin/env node
// Cross-file integrity checks for component sources, generated output, registry, docs and repo governance.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SPEC, REPO, SITE } from './spec.mjs';
import { NAMES, LEGACY_NAMES, EXTRA_NAMES } from './build.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let passed = 0;
let failed = 0;
const failures = [];
const check = (name, ok, detail = '') => {
  if (ok) {
    passed++;
    console.log(`PASS  ${name}`);
  } else {
    failed++;
    const message = `${name}${detail ? ': ' + detail : ''}`;
    failures.push(message);
    console.error(`FAIL  ${message}`);
  }
};
const read = (path) => {
  try { return readFileSync(resolve(ROOT, path), 'utf8'); }
  catch (error) { check(`read ${path}`, false, error.message); return ''; }
};
const unique = (items) => new Set(items).size === items.length;

check('component catalogue has 29 entries', SPEC.length === 29, `found ${SPEC.length}`);
check('build list matches catalogue order', JSON.stringify(NAMES) === JSON.stringify(SPEC.map(c => c.id)));
check('mechanical family has seven entries', LEGACY_NAMES.length === 7);
check('utility family has 22 entries', EXTRA_NAMES.length === 22);
check('utility family follows mechanical family', JSON.stringify(SPEC.slice(7).map(c => c.id)) === JSON.stringify(EXTRA_NAMES));
check('component IDs are unique', unique(SPEC.map(c => c.id)));
const tags = SPEC.flatMap(c => c.api?.tags || [`<${c.tag}>`]);
check('30 custom-element tags are unique', tags.length === 30 && unique(tags), `found ${tags.length}`);
const extrasCore = read('tools/extra-core.js');
check('all 22 utility elements have a component-specific backglass emblem', EXTRA_NAMES.every(id => extrasCore.includes("'pinball-" + id + "'")));
check('utility renderer reuses the original chrome-ball shader when available', extrasCore.includes('kit.glsl.head') && extrasCore.includes('kit.glsl.ball') && extrasCore.includes('kit.paint'));
check('utility bundles retain a CSS chrome-ball fallback', extrasCore.includes('.pinball-deck:after') && extrasCore.includes('.pinball-deck.has-live-ball:after'));

const gallery = read('gallery/index.html');
const registry = JSON.parse(read('registry.json'));
const registryItems = Array.isArray(registry.items) ? registry.items : [];
check('registry has exactly one entry per bundle', registryItems.length === SPEC.length);
check('registry homepage matches project site', registry.homepage === SITE);
const registryNames = registryItems.map(item => item.name);
check('registry item IDs are unique', unique(registryNames));
check('registry IDs match component catalogue', JSON.stringify([...registryNames].sort()) === JSON.stringify([...NAMES].sort()));

for (const component of SPEC) {
  const { id, api } = component;
  const bundle = read(`${id}/${id}.js`);
  const demo = read(`${id}/index.html`);
  const guide = read(`${id}/README.md`);
  const tagsForComponent = api?.tags || [`<${component.tag}>`];

  check(`${id}: bundle exists and is non-empty`, bundle.length > 0);
  check(`${id}: demo route exists`, existsSync(resolve(ROOT, id, 'index.html')));
  check(`${id}: API guide exists`, existsSync(resolve(ROOT, id, 'README.md')));
  check(`${id}: demo imports its local script`, demo.includes(`<script src="${id}.js"></script>`));
  check(`${id}: gallery imports its script`, gallery.includes(`../${id}/${id}.js`));
  check(`${id}: API guide names each custom element`, tagsForComponent.every(tag => guide.includes(tag)));
  check(`${id}: registry source and install target match`, registryItems.some(item =>
    item.name === id &&
    item.type === 'registry:file' &&
    item.files?.some(file => file.path === `${id}/${id}.js` && file.target === `~/public/pinball-ui/${id}.js`)
  ));

  if (LEGACY_NAMES.includes(id)) {
    check(`${id}: mechanical runtime is present`, bundle.includes('window.PinballKit'));
    check(`${id}: no lightweight runtime is mixed in`, !bundle.includes('window.PinmotionExtras'));
    for (const tag of tagsForComponent) {
      const tagName = tag.slice(1,-1);
      check(`${id}: PinballKit registers ${tagName}`, bundle.includes(`K.define('${tagName}'`));
    }
  } else {
    check(`${id}: lightweight runtime is present`, bundle.includes('window.PinmotionExtras'));
    // Utility bundles may call PinballKit.sfx when the original runtime is already present,
    // but must not initialize or embed the WebGL/audio runtime themselves.
    check(`${id}: no embedded PinballKit runtime`,
      !bundle.includes('if (window.PinballKit) return;') &&
      !bundle.includes('window.PinballKit =') &&
      !bundle.includes('const SOUNDS =') &&
      !bundle.includes('function getGL()'));
    check(`${id}: component-specific backglass is bundled`, bundle.includes('class="backglass"') && bundle.includes('class="chrome-ball"'));
    check(`${id}: optional chrome renderer uses shared runtime, not an embedded copy`, bundle.includes('kit.glsl.ball') && bundle.includes('kit.paint') && !bundle.includes('window.PinballKit ='));
    check(`${id}: matching lightweight source exists`, existsSync(resolve(ROOT, 'extras-src', `${id}.js`)));
    const source = read(`extras-src/${id}.js`);
    check(`${id}: bundle contains its source implementation`, bundle.includes(source.trim()));
    for (const tag of tagsForComponent) {
      const tagName = tag.slice(1,-1);
      check(`${id}: customElements registers ${tagName}`, bundle.includes(`customElements.define('${tagName}'`));
    }
  }
}

const pkg = JSON.parse(read('package.json'));
const lock = JSON.parse(read('package-lock.json'));
check('package remains private before release', pkg.private === true);
check('package stays on npm without third-party dependencies', !pkg.dependencies && !pkg.devDependencies);
check('package license metadata is MIT', pkg.license === 'MIT' && lock.packages?.['']?.license === 'MIT');
check('license copyright owner is Brajesh Kumar', read('LICENSE').includes('Copyright (c) 2026 Brajesh Kumar'));
check('integrity script is part of npm check', pkg.scripts?.integrity === 'node tools/integrity.mjs' && pkg.scripts?.check?.includes('npm run integrity'));

const docsHub = read('docs/README.md');
const design = read('docs/design-system.md');
const familySvg = read('docs/visuals/component-families.svg');
const tokenSvg = read('docs/visuals/visual-language.svg');
const familyMermaid = read('docs/diagrams/component-families.mmd');
check('design system is linked from the documentation hub', docsHub.includes('design-system.md'));
check('component family diagram is linked', docsHub.includes('component-families.svg'));
check('design system includes both runtime families', design.includes('Original mechanical') && design.includes('Lightweight utility'));
for (const [name, svg] of [['component families', familySvg], ['visual language', tokenSvg]]) {
  check(`${name} SVG has an accessible title and description`, svg.includes('<svg') && svg.includes('<title') && svg.includes('<desc') && svg.includes('role="img"'));
}
check('component family Mermaid source exists', familyMermaid.includes('flowchart TB'));

const generatorWorkflow = read('.github/workflows/generate-components.yml');
check('generation workflow builds bundles', generatorWorkflow.includes('npm run build'));
check('generation workflow generates docs', generatorWorkflow.includes('npm run docs'));
check('generation workflow runs full checks', generatorWorkflow.includes('npm run check'));
check('generation workflow smoke-tests all routes', generatorWorkflow.includes('29 component routes'));
check('generation workflow deploys Pages', generatorWorkflow.includes('actions/deploy-pages@v5'));
check('Pages workflow derives routes from SPEC', read('.github/workflows/deploy-pages.yml').includes('SPEC.map'));

function markdownFiles(directory) {
  const out = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === '_scratch') continue;
    const full = resolve(directory, entry.name);
    if (entry.isDirectory()) out.push(...markdownFiles(full));
    else if (['.md','.mdx'].includes(extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

const markdown = markdownFiles(ROOT);
let linkCount = 0;
for (const file of markdown) {
  const content = readFileSync(file, 'utf8');
  const re = /!?\[[^\]]*\]\(([^)]+)\)/g;
  let match;
  while ((match = re.exec(content))) {
    let href = match[1].trim().replace(/^<|>$/g, '');
    if (!href || href.startsWith('#') || href.startsWith('//') || /^[a-z][a-z0-9+.-]*:/i.test(href)) continue;
    href = href.split('#')[0].split('?')[0];
    if (!href) continue;
    let target;
    try { target = resolve(dirname(file), decodeURIComponent(href)); }
    catch { check(`Markdown link in ${relative(ROOT,file)}`, false, href); continue; }
    const inside = target === ROOT || target.startsWith(ROOT + sep);
    const exists = inside && existsSync(target);
    linkCount++;
    check(`Markdown link: ${relative(ROOT,file)} → ${href}`, exists, inside ? 'target not found' : 'link escapes repository');
  }
}
check('Markdown link scanner found links', linkCount > 0);

console.log('');
console.log(`Integrity summary: ${passed} passed, ${failed} failed; ${linkCount} local Markdown links inspected.`);
if (failed > 0) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
}
