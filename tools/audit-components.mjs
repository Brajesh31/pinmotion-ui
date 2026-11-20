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
  return [...match[1].matchAll(/(?:^|,)\s*([A-Za-z_$][\w$]*)\s*:/g)]
    .map((item) => item[1]).sort();
}

function sameNames(left, right) {
  return JSON.stringify([...left].sort()) === JSON.stringify([...right].sort());
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

  const declaredFormAssociated = /^\s*static\s+formAssociated\s*=\s*true\s*;?/m.test(source);
  const declaredFormValue = /^\s*formValue\s*\([^)]*\)\s*\{/m.test(source);
  const documentedFormAssociated = /\bform-associated\b/i.test(api.forms || '');
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
    if (/Plain\s+Event/i.test(payloadText)) {
      check(id + ': ' + eventName + ' is documented as a plain Event',
        plainEvents.includes(eventName));
      continue;
    }
    const expectedKeys = namesFromPayload(payloadText);
    const candidates = emitted.filter((event) => event.name === eventName);
    const matched = expectedKeys === null
      ? candidates.length > 0
      : candidates.some((event) => sameNames(event.keys, expectedKeys));
    check(id + ': ' + eventName + ' detail keys match the API contract',
      matched,
      'expected=' + (expectedKeys === null ? 'any object' : expectedKeys.join(',')) +
      '; source=' + candidates.map((event) => event.keys.join(',')).join(' | '));
  }

  const documentedProperties = (api.properties || [])
    .flatMap(([names]) => String(names).replaceAll(TICK, '').split(',').map((name) => name.trim()))
    .filter(Boolean);
  const missingProperties = documentedProperties.filter((name) => !source.includes(name));
  check(id + ': documented property names occur in source',
    missingProperties.length === 0,
    missingProperties.join(', ') || '');

  const documentedMethods = (api.methods || [])
    .map(([signature]) => String(signature).replaceAll(TICK, '').split('(')[0].trim())
    .filter(Boolean);
  const missingMethods = documentedMethods.filter((name) =>
    !source.includes(name + '(') && !source.includes(name + ' ('));
  check(id + ': documented method names occur in source',
    missingMethods.length === 0,
    missingMethods.join(', ') || '');

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

console.log('');
console.log('Component contract audit: ' + passed + ' passed, ' + failures + ' failed.');
if (failures > 0) process.exitCode = 1;
