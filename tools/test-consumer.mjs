#!/usr/bin/env node
// Build a dependency-free temporary consumer from registry.json, then verify each
// registry file alone and all bundles in several mixed load orders using Chromium.
import { createServer } from 'node:http';
import { createServer as createNetServer } from 'node:net';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SPEC } from './spec.mjs';
import { LEGACY_NAMES, EXTRA_NAMES } from './build.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.CHROME || 'chromium';
const registry = JSON.parse(readFileSync(join(ROOT, 'registry.json'), 'utf8'));
let passed = 0;
let failed = 0;
const check = (label, ok, detail = '') => {
  if (ok) { passed++; console.log('PASS ' + label); }
  else { failed++; console.error('FAIL ' + label + (detail ? ': ' + detail : '')); }
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getPort = () => new Promise((resolve, reject) => {
  const s = createNetServer();
  s.once('error', reject);
  s.listen(0, '127.0.0.1', () => {
    const port = s.address().port;
    s.close((error) => error ? reject(error) : resolve(port));
  });
});
const toElement = (tag) => '<' + tag + ' id="' + tag + '"></' + tag + '>';

const contractMemberPlans = (component) => {
  const tick = String.fromCharCode(96);
  const parseNames = (raw) => {
    const value = String(raw);
    const quoted = [...value.matchAll(new RegExp(tick + '([^' + tick + ']+)' + tick, 'g'))].map((match) => match[1]);
    return quoted.length ? quoted : value.split(',').map((name) => name.trim()).filter(Boolean);
  };
  const scope = (access, description) => String(access + ' ' + description).match(/<(pinball-[^>]+)>/)?.[1] || null;
  const properties = (component.api?.properties || []).flatMap(([names, type, access, description = '']) => {
    const mode = String(access || '').toLowerCase();
    if (!mode.includes('read/write') && !mode.includes('read-only getter') && mode !== 'read-only') return [];
    return parseNames(names).map((name) => ({ name, type, access: String(access), tag: scope(access, description) }));
  });
  const methods = (component.api?.methods || []).map(([signature, description = '']) => {
    const clean = String(signature).split(tick).join('');
    return { name: clean.split('(')[0].trim(), tag: scope(signature, description) };
  });
  const observedAttributes = (component.api?.attributes || []).flatMap(([names, type, defaultValue, observation]) => {
    const mode = String(observation || '').toLowerCase();
    if (!mode.includes('observed') || mode.includes('shared base')) return [];
    return parseNames(names).map((name) => ({ name, type: String(type || '') }));
  });
  return { properties, methods, observedAttributes };
};

const temp = mkdtempSync(join(tmpdir(), 'pinmotion-consumer-'));
const publicRoot = join(temp, 'public', 'pinball-ui');
mkdirSync(publicRoot, { recursive: true });
const allItems = [];
for (const component of SPEC) {
  const item = registry.items.find((entry) => entry.name === component.id);
  check(component.id + ': registry item exists exactly once',
    registry.items.filter((entry) => entry.name === component.id).length === 1);
  if (!item || !Array.isArray(item.files) || item.files.length !== 1) {
    check(component.id + ': one distributable registry file', false, 'expected one registry:file');
    continue;
  }
  const file = item.files[0];
  const expectedPath = component.id + '/' + component.id + '.js';
  const expectedTarget = '~/public/pinball-ui/' + component.id + '.js';
  const source = join(ROOT, file.path || '');
  const relativeTarget = resolve(temp, (file.target || '').replace(/^~\//, ''));
  check(component.id + ': registry source path is canonical', file.path === expectedPath, file.path);
  check(component.id + ': registry target is canonical', file.target === expectedTarget, file.target);
  check(component.id + ': source bundle exists', existsSync(source), source);
  if (existsSync(source) && file.target === expectedTarget) copyFileSync(source, relativeTarget);
  const tags = (component.api?.tags || ['<' + component.tag + '>']).map((tag) => tag.replace(/^<|>$/g, ''));
  allItems.push({ id: component.id, url: '/public/pinball-ui/' + component.id + '.js', tags, ...contractMemberPlans(component) });
}

check('registry has exactly the 29 canonical component entries',
  registry.items.length === 29 && allItems.length === 29,
  registry.items.length + ' registry items / ' + allItems.length + ' copied');

const htmlPage = (scripts, tags, mixed = false) => {
  const contractScript = !mixed && ((scripts[0]?.properties?.length || 0) + (scripts[0]?.methods?.length || 0) + (scripts[0]?.observedAttributes?.length || 0) > 0)
    ? '<script>window.__contractProperties=' + JSON.stringify(scripts[0].properties || []) + ';window.__contractMethods=' + JSON.stringify(scripts[0].methods || []) + ';window.__contractObservedAttributes=' + JSON.stringify((scripts[0].observedAttributes || []).map(attribute => ({tag:scripts[0].tags[0],...attribute}))) + ';</script>'
    : '';
  const callbackProbeScript = !mixed && (scripts[0]?.observedAttributes?.length || 0) > 0
    ? '<script>window.__attributeCallbackHits={};window.__observedCallbackTargets=' +
      JSON.stringify((scripts[0].observedAttributes || []).map(attribute => ({ tag: scripts[0].tags[0], name: attribute.name }))) +
      ';const nativeDefine=customElements.define.bind(customElements);' +
      'customElements.define=function(tag,Constructor,options){' +
      'if(window.__observedCallbackTargets.some(target=>target.tag===tag)&&typeof Constructor.prototype.attributeChangedCallback==="function"){' +
      'const original=Constructor.prototype.attributeChangedCallback;' +
      'Constructor.prototype.attributeChangedCallback=function(attribute,oldValue,newValue){' +
      'const key=tag+":"+attribute;window.__attributeCallbackHits[key]=(window.__attributeCallbackHits[key]||0)+1;' +
      'return original.call(this,attribute,oldValue,newValue);};}' +
      'return nativeDefine(tag,Constructor,options);};</script>'
    : '';
  const snapshots = mixed
    ? '<script>window.__loaded=[];window.__errors=[];window.__runtimeObjects=new WeakMap();window.__nextRuntimeId=0;window.__runtimeId=value=>{if(!value||(typeof value!=="object"&&typeof value!=="function"))return null;if(!window.__runtimeObjects.has(value))window.__runtimeObjects.set(value,++window.__nextRuntimeId);return window.__runtimeObjects.get(value)};addEventListener("error",e=>window.__errors.push(e.message||"script error"));addEventListener("unhandledrejection",e=>window.__errors.push(String(e.reason)));</script>'
    : '<script>window.__errors=[];addEventListener("error",e=>window.__errors.push(e.message||"script error"));addEventListener("unhandledrejection",e=>window.__errors.push(String(e.reason)));</script>';
  const scriptTags = scripts.map((item) =>
    '<script src="' + item.url + '"' +
    (mixed ? " onload='window.__loaded.push({id:" + JSON.stringify(item.id) + ",pinballId:window.__runtimeId(window.PinballKit),extrasId:window.__runtimeId(window.PinmotionExtras)})'" : '') +
    '></script>'
  ).join('\n');
  return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Pinmotion clean consumer</title></head><body>' +
    tags.map(toElement).join('\n') + snapshots + contractScript + callbackProbeScript + scriptTags + '</body></html>';
};

for (const item of allItems) {
  const dir = join(temp, 'cases', item.id);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), htmlPage([item], item.tags));
}
const allTags = [...new Set(allItems.flatMap((item) => item.tags))];
const interleave = (left, right) => {
  const result = [];
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    if (left[i]) result.push(left[i]);
    if (right[i]) result.push(right[i]);
  }
  return result;
};
const byId = new Map(allItems.map((item) => [item.id, item]));
const originals = LEGACY_NAMES.map((id) => byId.get(id)).filter(Boolean);
const utilities = EXTRA_NAMES.map((id) => byId.get(id)).filter(Boolean);
const orders = [
  ['originals-first', [...originals, ...utilities]],
  ['utilities-first', [...utilities, ...originals]],
  ['interleaved', interleave(originals, utilities)],
  ['reverse-all', [...allItems].reverse()]
];
for (const [name, items] of orders) {
  const dir = join(temp, 'mixed', name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), htmlPage(items, allTags, true));
}

const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8' };
const server = createServer((req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
    let file = resolve(temp, '.' + pathname);
    if (file !== temp && !file.startsWith(temp + sep)) { res.writeHead(403).end(); return; }
    if (existsSync(file) && !extname(file)) file = join(file, 'index.html');
    if (!existsSync(file)) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200, { 'content-type': mime[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(readFileSync(file));
  } catch (error) { res.writeHead(500).end(String(error)); }
});

const port = await new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(0, '127.0.0.1', () => resolve(server.address().port));
});
const debugPort = await getPort();
const profile = mkdtempSync(join(tmpdir(), 'pinmotion-consumer-chrome-'));
const chromeOutput = [];
const chrome = spawn(CHROME, [
  '--headless=new', '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
  '--enable-unsafe-swiftshader', '--remote-debugging-port=' + debugPort,
  '--remote-debugging-address=127.0.0.1', '--remote-allow-origins=*',
  '--user-data-dir=' + profile, '--no-first-run', '--disable-extensions',
  '--hide-scrollbars', 'about:blank'
], { stdio: ['ignore', 'ignore', 'pipe'] });
chrome.stderr.setEncoding('utf8');
chrome.stderr.on('data', (chunk) => {
  chromeOutput.push(...chunk.split(/\r?\n/).filter(Boolean));
  if (chromeOutput.length > 80) chromeOutput.splice(0, chromeOutput.length - 80);
});
let target;
for (let i = 0; i < 150; i++) {
  if (chrome.exitCode !== null) break;
  try {
    const response = await fetch('http://127.0.0.1:' + debugPort + '/json/list');
    if (response.ok) {
      const pages = await response.json();
      target = pages.find((page) => page.type === 'page');
      if (target?.webSocketDebuggerUrl) break;
    }
  } catch {}
  await sleep(400);
}
if (!target?.webSocketDebuggerUrl) {
  chrome.kill('SIGTERM'); server.close(); rmSync(profile, { recursive: true, force: true }); rmSync(temp, { recursive: true, force: true });
  throw new Error('Chrome did not expose a DevTools page target. ' + chromeOutput.slice(-20).join('\n'));
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  const timeout = setTimeout(() => reject(new Error('DevTools WebSocket timeout')), 15000);
  ws.addEventListener('open', () => { clearTimeout(timeout); resolve(); }, { once: true });
  ws.addEventListener('error', () => { clearTimeout(timeout); reject(new Error('DevTools WebSocket failed')); }, { once: true });
});
let command = 0;
const pending = new Map();
ws.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const resolve = pending.get(message.id);
    pending.delete(message.id);
    resolve(message);
  }
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++command;
  pending.set(id, (message) => message.error ? reject(new Error(method + ': ' + message.error.message)) : resolve(message.result));
  ws.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expression) => {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
};
const navigate = async (path, readyExpression) => {
  await send('Page.navigate', { url: 'http://127.0.0.1:' + port + path });
  for (let attempt = 0; attempt < 80; attempt++) {
    try { if (await evaluate(readyExpression)) return true; } catch {}
    await sleep(100);
  }
  return false;
};

try {
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Network.enable');
  for (const item of allItems) {
    const ok = await navigate('/cases/' + item.id + '/',
      'document.readyState === "complete" && ' + JSON.stringify(item.tags) +
      '.every(tag => !!customElements.get(tag) && !!document.querySelector(tag)?.shadowRoot)');
    check(item.id + ': clean consumer registers and initializes all documented tags', ok, item.url);
    const state = JSON.parse(await evaluate('JSON.stringify({pinball:!!window.PinballKit,extras:!!window.PinmotionExtras,errors:window.__errors||[]})'));
    const legacy = LEGACY_NAMES.includes(item.id);
    check(item.id + ': isolated runtime family is correct',
      legacy ? state.pinball && !state.extras : state.extras && !state.pinball, JSON.stringify(state));
    check(item.id + ': isolated consumer has no uncaught script errors', state.errors.length === 0, JSON.stringify(state.errors));

    const propertyExpression = 'JSON.stringify((window.__contractProperties||[]).map(plan => {' +
      'const host=document.querySelector(plan.tag||' + JSON.stringify(item.tags[0]) + ');' +
      'let cursor=host,descriptor=null;while(cursor&&!descriptor){descriptor=Object.getOwnPropertyDescriptor(cursor,plan.name);cursor=Object.getPrototypeOf(cursor);}' +
      'const access=plan.access.toLowerCase();' +
      'const ok=access.includes("read/write")?(!!descriptor?.get&&!!descriptor?.set):((!!descriptor?.get)&&!descriptor?.set);' +
      'const value=host?.[plan.name];const type=String(plan.type||"").toLowerCase().replace(/\\s/g,"");' +
      'let typeApplicable=true,typeOk=true;' +
      'if(type.endsWith("[]")){typeOk=Array.isArray(value);}' +
      'else if(type.includes("boolean")){typeOk=typeof value==="boolean";}' +
      'else if(type.includes("number")||type.includes("integer")){typeOk=typeof value==="number"||value===null&&type.includes("null");}' +
      'else if(type.includes("string")){typeOk=typeof value==="string"||value===null&&type.includes("null");}' +
      'else if(type.includes("file")){typeOk=Array.isArray(value)&&value.every(file=>file instanceof File);}' +
      'else{typeApplicable=false;}' +
      'return {name:plan.name,tag:plan.tag||host?.localName,access:plan.access,documentedType:plan.type,found:!!descriptor,hasGetter:!!descriptor?.get,hasSetter:!!descriptor?.set,ok,typeApplicable,typeOk};}))';
    const propertyResults = JSON.parse(await evaluate(propertyExpression));
    for (const property of propertyResults) {
      check(item.id + ': runtime property descriptor ' + property.name + ' (' + property.access + ')',
        property.ok, JSON.stringify(property));
      if (property.typeApplicable) {
        check(item.id + ': runtime property initial type ' + property.name + ' (' + property.documentedType + ')',
          property.typeOk, JSON.stringify(property));
      }
    }
    const methodExpression = 'JSON.stringify((window.__contractMethods||[]).map(plan => {' +
      'const host=document.querySelector(plan.tag||' + JSON.stringify(item.tags[0]) + ');' +
      'return {name:plan.name,tag:plan.tag||host?.localName,ok:!!host&&typeof host[plan.name]==="function"};}))';
    const methodResults = JSON.parse(await evaluate(methodExpression));
    for (const method of methodResults) {
      check(item.id + ': runtime public method ' + method.name, method.ok, JSON.stringify(method));
    }

    const observedResults = JSON.parse(await evaluate('JSON.stringify((window.__contractObservedAttributes||[]).map(plan => {const definition=customElements.get(plan.tag);const actual=definition?.observedAttributes||[];return {tag:plan.tag,name:plan.name,type:plan.type,registered:!!definition,observed:actual.includes(plan.name),actual};}))'));
    for (const observed of observedResults) {
      check(item.id + ': runtime observedAttributes includes ' + observed.name,
        observed.registered && observed.observed, JSON.stringify(observed));
    }
    const callbackExpression = 'JSON.stringify((window.__contractObservedAttributes||[]).map(plan => {' +
      'const host=document.querySelector(plan.tag);const key=plan.tag+":"+plan.name;' +
      'const before=window.__attributeCallbackHits?.[key]||0;' +
      'const type=plan.type.toLowerCase();const value=type.includes("boolean")?"":type.includes("number")||type.includes("integer")?"1":type.includes("array")||type.includes("json")?"[]":"phase1-audit";' +
      'try{host.setAttribute(plan.name,value);}catch(error){}' +
      'const hits=(window.__attributeCallbackHits?.[key]||0)-before;' +
      'return {tag:plan.tag,name:plan.name,hasInstrumentation:!!window.__attributeCallbackHits,hits,ok:hits>0};}))';
    const callbackResults = JSON.parse(await evaluate(callbackExpression));
    for (const callback of callbackResults) {
      check(item.id + ': browser delivers attributeChangedCallback for ' + callback.name,
        callback.ok, JSON.stringify(callback));
    }
    const callbackErrors = JSON.parse(await evaluate('JSON.stringify(window.__errors||[])'));
    check(item.id + ': observed-attribute mutations produce no uncaught errors', callbackErrors.length === 0, JSON.stringify(callbackErrors));
  }

  for (const [name] of orders) {
    const ok = await navigate('/mixed/' + name + '/',
      'document.readyState === "complete" && ' + JSON.stringify(allTags) +
      '.every(tag => !!customElements.get(tag) && !!document.querySelector(tag)?.shadowRoot) && window.__loaded?.length === 29');
    check('mixed load order ' + name + ': all 30 custom elements register and connect', ok);
    const state = JSON.parse(await evaluate('JSON.stringify({errors:window.__errors||[],loaded:(window.__loaded||[]).length,pinball:!!window.PinballKit,extras:!!window.PinmotionExtras,pinballIds:(window.__loaded||[]).map(x=>x.pinballId).filter(x=>x!==null),extrasIds:(window.__loaded||[]).map(x=>x.extrasId).filter(x=>x!==null)})'));
    const refsStable = (refs) => refs.length > 0 && refs.every((value) => value === refs[0]);
    check('mixed load order ' + name + ': no script/runtime errors', state.errors.length === 0, JSON.stringify(state.errors));
    check('mixed load order ' + name + ': both shared runtimes remain singletons',
      state.pinball && state.extras && refsStable(state.pinballIds) && refsStable(state.extrasIds),
      JSON.stringify({pinballIds:state.pinballIds,extrasIds:state.extrasIds}));
  }
} finally {
  try { ws.close(); } catch {}
  chrome.kill('SIGTERM');
  server.close();
  await sleep(300);
  rmSync(profile, { recursive: true, force: true });
  rmSync(temp, { recursive: true, force: true });
}
console.log('');
console.log('Clean registry consumer and mixed bundle audit: ' + passed + ' passed, ' + failed + ' failed.');
if (failed) process.exitCode = 1;
