#!/usr/bin/env node
// Static source-to-contract audit. This checks declarations and payload shapes,
// not interaction timing, browser behavior, or assistive-technology conformance.
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SPEC } from './spec.mjs';
import { EXTRA_NAMES } from './build.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TICK = String.fromCharCode(96);
let failures = 0;
let passed = 0;

function check(label, condition, detail = '') {
  if (condition) {
    passed++;
    console.log('PASS  ' + label);
  } else {
    failures++;
    console.error('FAIL  ' + label + (detail ? ': ' + detail : ''));
  }
}

function read(path) {
  try {
    return readFileSync(join(ROOT, path), 'utf8');
  } catch (error) {
    check('read ' + path, false, error.message);
    return '';
  }
}

function namesFromPayload(text) {
  const match = String(text).match(/\{([^{}]*)\}/);
  if (!match) return null;
  return match[1].split(',').map((part) => {
    const key = part.trim().match(/^([A-Za-z_$][\w$]*)\s*(?::|$)/);
    return key ? key[1] : null;
  }).filter(Boolean).sort();
}

function sameNames(left, right) {
  return JSON.stringify([...left].sort()) === JSON.stringify([...right].sort());
}

function claimsFormAssociated(text) {
  const value = String(text || '');
  if (!/\bform-associated\b/i.test(value)) return false;
  return !/\b(?:not|neither|no)\b[^.!?]{0,80}\bform-associated\b/i.test(value);
}

const allTags = [];

for (const component of SPEC) {
  const id = component.id;
  const isUtility = EXTRA_NAMES.includes(id);
  const sourcePath = isUtility ? 'extras-src/' + id + '.js' : id + '/' + id + '.js';
  const bundlePath = id + '/' + id + '.js';
  const guidePath = id + '/README.md';
  const demoPath = id + '/index.html';
  const source = read(sourcePath);
  const api = component.api || {};

  check(id + ': standalone source exists', existsSync(join(ROOT, sourcePath)));
  check(id + ': distributable bundle exists', existsSync(join(ROOT, bundlePath)));
  check(id + ': component guide exists', existsSync(join(ROOT, guidePath)));
  check(id + ': demo page exists', existsSync(join(ROOT, demoPath)));

  const registrationPattern = isUtility
    ? /customElements\.define\(\s*['"]([^'"]+)['"]/g
    : /K\.define\(\s*['"]([^'"]+)['"]/g;
  const registeredTags = [...source.matchAll(registrationPattern)].map((match) => match[1]);
  const documentedTags = (api.tags || []).map((tag) => String(tag).replace(/^<|>$/g, ''));
  allTags.push(...registeredTags);

  check(id + ': source registrations match documented tags',
    JSON.stringify(registeredTags) === JSON.stringify(documentedTags),
    'source=' + registeredTags.join(', ') + '; docs=' + documentedTags.join(', '));
  check(id + ': tag registrations are unique',
    new Set(registeredTags).size === registeredTags.length);

  const observedMatch = [...source.matchAll(/static\s+observedAttributes\s*=\s*\[([\s\S]*?)\]/g)];
  const sourceObserved = [...new Set(observedMatch.flatMap((entry) =>
    [...entry[1].matchAll(/['"]([^'"]+)['"]/g)].map((match) => match[1])))];
  const documentedAttributes = api.attributes || [];
  const documentedAttributeNames = documentedAttributes.map((attribute) => attribute[0]);
  const missingObserved = documentedAttributes
    .filter((attribute) =>
      /Observed/i.test(attribute[3] || '') &&
      !sourceObserved.includes(attribute[0]))
    .map((attribute) => attribute[0]);
  const undocumentedObserved = sourceObserved.filter((attribute) => !documentedAttributeNames.includes(attribute));

  check(id + ': observed attribute claims match source declarations',
    missingObserved.length === 0 && undocumentedObserved.length === 0,
    'missing from source=' + missingObserved.join(', ') +
    '; missing from docs=' + undocumentedObserved.join(', '));

  const declaredFormAssociated = /static\s+formAssociated\s*=\s*true\s*;/.test(source);
  const declaredFormValue = /\bformValue\s*\([^)]*\)\s*\{/.test(source);
  const documentedFormAssociated = claimsFormAssociated(api.forms);
  check(id + ': form association matches the API guide',
    declaredFormAssociated === documentedFormAssociated,
    'source=' + declaredFormAssociated + '; docs=' + documentedFormAssociated);
  check(id + ': form-associated value implementation is present when declared',
    !declaredFormAssociated || declaredFormValue,
    'formAssociated=' + declaredFormAssociated + '; formValue=' + declaredFormValue);

  const emitted = [...source.matchAll(/this\.emit\(\s*['"]([^'"]+)['"]\s*,\s*(\{[\s\S]*?\})\s*\)/g)]
    .map((match) => ({name:match[1], keys:namesFromPayload(match[2]) || []}));
  const plainEvents = [...source.matchAll(/new\s+Event\(\s*['"]([^'"]+)['"]/g)]
    .map((match) => match[1]);
  const documentedEvents = api.events || [];

  for (const [nameText, payloadText] of documentedEvents) {
    const eventName = String(nameText).replaceAll(TICK, '');
    if (String(payloadText).replaceAll(TICK, '').includes('Plain Event')) {
      check(id + ': ' + eventName + ' is documented as a plain Event',
        plainEvents.includes(eventName));
      continue;
    }
    let expectedKeys = namesFromPayload(payloadText);
    if (/empty detail/i.test(payloadText)) expectedKeys = [];
    const candidates = emitted.filter((event) => event.name === eventName);
    const matched = expectedKeys === null
      ? candidates.length > 0
      : candidates.some((event) => sameNames(event.keys, expectedKeys));
    check(id + ': ' + eventName + ' detail keys match the API contract',
      matched,
      'expected=' + (expectedKeys === null ? 'any object' : expectedKeys.join(',')) +
      '; source=' + candidates.map((event) => event.keys.join(',')).join(' | '));
  }

  const documentedShapes = new Map();
  for (const [nameText, payloadText] of documentedEvents) {
    const eventName = String(nameText).replaceAll(TICK, '');
    if (/Plain\\s+Event/i.test(String(payloadText).replaceAll(TICK, ''))) continue;
    let keys = namesFromPayload(payloadText);
    if (/empty detail/i.test(payloadText)) keys = [];
    if (keys === null) continue;
    if (!documentedShapes.has(eventName)) documentedShapes.set(eventName, []);
    documentedShapes.get(eventName).push([...keys].sort().join(','));
  }
  const sourceShapes = new Map();
  for (const event of emitted) {
    if (!sourceShapes.has(event.name)) sourceShapes.set(event.name, []);
    sourceShapes.get(event.name).push([...event.keys].sort().join(','));
  }
  for (const [eventName, shapes] of sourceShapes) {
    const docs = documentedShapes.get(eventName) || [];
    const missing = [...new Set(shapes)].filter((shape) => !docs.includes(shape));
    check(id + ': all source payload variants for ' + eventName + ' are documented',
      missing.length === 0,
      'undocumented=' + missing.join(' | ') + '; documented=' + docs.join(' | '));
  }

  const documentedProperties = (api.properties || [])
    .flatMap(([names]) => String(names).replaceAll(TICK, '').split(',').map((name) => name.trim()))
    .filter(Boolean);
  const missingProperties = documentedProperties.filter((name) => !source.includes(name));
  check(id + ': documented property names occur in source',
    missingProperties.length === 0,
    missingProperties.join(', ') || '');

  for (const [names, type, access] of api.properties || []) {
    for (const name of String(names).replaceAll(TICK, '').split(',').map((item) => item.trim()).filter(Boolean)) {
      const getter = new RegExp('\\bget\\s+' + name + '\\s*\\(').test(source);
      const setter = new RegExp('\\bset\\s+' + name + '\\s*\\(').test(source);
      const mode = String(access || '').toLowerCase();
      if (mode.includes('read/write')) {
        check(id + ': ' + name + ' read/write property has getter and setter', getter && setter,
          'getter=' + getter + '; setter=' + setter);
      } else if (mode.includes('read-only getter') || mode === 'read-only') {
        check(id + ': ' + name + ' read-only property has getter only', getter && !setter,
          'getter=' + getter + '; setter=' + setter);
      } else {
        check(id + ': ' + name + ' documented state is present in source', source.includes(name));
      }
    }
  }

  const documentedMethods = (api.methods || [])
    .map(([signature]) => String(signature).replaceAll(TICK, '').split('(')[0].trim())
    .filter(Boolean);
  const missingMethods = documentedMethods.filter((name) =>
    !source.includes(name + '(') && !source.includes(name + ' ('));
  check(id + ': documented method names occur in source',
    missingMethods.length === 0,
    missingMethods.join(', ') || '');

  for (const [signature] of api.methods || []) {
    const clean = String(signature).replaceAll(TICK, '');
    const name = clean.split('(')[0].trim();
    const args = clean.includes('(') ? clean.slice(clean.indexOf('(') + 1, clean.lastIndexOf(')')).trim() : '';
    const expectedCount = args ? args.split(',').length : 0;
    const definition = new RegExp('(?:^|[;{}])\\s*(?:async\\s+)?' + name + '\\s*\\(([^)]*)\\)\\s*\\{').exec(source);
    const actualArgs = definition ? definition[1].trim() : null;
    const actualCount = actualArgs === null ? -1 : (actualArgs ? actualArgs.split(',').length : 0);
    check(id + ': ' + name + ' source method parameter count matches its signature',
      actualCount === expectedCount,
      'documented=' + expectedCount + '; source=' + (actualCount < 0 ? 'definition not found' : actualCount));
  }

  const guide = read(guidePath);
  check(id + ': generated guide contains API sections',
    guide.includes('## 🧩 API reference') &&
    guide.includes('### Attributes') &&
    guide.includes('### Properties') &&
    guide.includes('### Methods') &&
    guide.includes('### Events') &&
    guide.includes('## 📝 Form integration'));

  const demo = read(demoPath);
  check(id + ': demo loads its matching bundle',
    demo.includes('<script src="' + id + '.js"></script>'));
}

check('all source registrations are globally unique',
  new Set(allTags).size === allTags.length,
  'duplicate tags: ' + allTags.filter((tag, index) => allTags.indexOf(tag) !== index).join(', '));
check('the source registers exactly 30 custom-element tags', allTags.length === 30, 'found ' + allTags.length);

const registry = JSON.parse(read('registry.json'));
check('registry entries cover all component IDs',
  Array.isArray(registry.items) &&
  registry.items.length === SPEC.length &&
  SPEC.every((component) => registry.items.some((item) => item.name === component.id)));

const inventory = read('docs/component-inventory.md');
check('generated inventory exists and lists every bundle',
  SPEC.every((component) => inventory.includes(component.id)));
check('inventory separates original and utility families',
  inventory.includes('Original mechanical controls (7)') &&
  inventory.includes('Lightweight utility controls (22)'));

const coreBase = read('core.js');
const utilityBase = read('tools/extra-core.js');
check('PinballKit custom events bubble and cross the Shadow DOM boundary',
  coreBase.includes('bubbles: true') && coreBase.includes('composed: true'));
check('PinmotionExtras custom events bubble and cross the Shadow DOM boundary',
  utilityBase.includes('bubbles: true') && utilityBase.includes('composed: true'));

console.log('');
console.log('Component contract audit: ' + passed + ' passed, ' + failures + ' failed.');
if (failures > 0) process.exitCode = 1;
