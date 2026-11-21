// node tools/test.mjs [URL]   uses every control in the gallery with real touch and key events at phone width, checks the
// events they fire, their form values and sideways scroll, and exits 1 on a failure. Needs Chrome or Chromium (CHROME=... if it is
// somewhere unusual) and the repo being served: python3 -m http.server 8000, then the default URL works.
import { SPEC } from './spec.mjs';
import { spawn } from 'node:child_process';
import { rmSync, mkdtempSync } from 'node:fs';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const URL_ = process.argv[2] || 'http://localhost:8000/gallery/';
const BASE_PATH = new URL(URL_).pathname.replace(/\/gallery\/?$/, '/');
const PORT = await new Promise((res) => { const s = createServer(); s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => res(p)); }); });
const PROFILE = mkdtempSync(join(tmpdir(), 'pb-'));
const chromeOutput = [];
const chrome = spawn(process.env.CHROME || 'chromium', [
  '--headless=new',
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
  '--enable-unsafe-swiftshader',
  `--remote-debugging-port=${PORT}`,
  '--remote-debugging-address=127.0.0.1',
  '--remote-allow-origins=*',
  `--user-data-dir=${PROFILE}`,
  '--no-first-run',
  '--disable-extensions',
  '--hide-scrollbars',
  'about:blank'
], { stdio: ['ignore', 'ignore', 'pipe'] });
chrome.stderr.setEncoding('utf8');
chrome.stderr.on('data', (chunk) => {
  chromeOutput.push(...chunk.split(/\\r?\\n/).filter(Boolean));
  if (chromeOutput.length > 80) chromeOutput.splice(0, chromeOutput.length - 80);
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let pageTarget;
for (let i = 0; i < 150; i++) {
  if (chrome.exitCode !== null) break;
  try {
    const response = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    if (response.ok) {
      const targets = await response.json();
      pageTarget = Array.isArray(targets) ? targets.find((target) => target.type === 'page') : undefined;
      if (pageTarget?.webSocketDebuggerUrl) break;
    }
  } catch {}
  await sleep(400);
}
if (!pageTarget?.webSocketDebuggerUrl) {
  chrome.kill('SIGTERM');
  rmSync(PROFILE, { recursive: true, force: true });
  throw new Error([
    'Chrome did not expose a DevTools page target within 60 seconds.',
    `Executable: ${process.env.CHROME || 'chromium'}`,
    `Exit code: ${chrome.exitCode ?? 'still running'}`,
    'Recent Chrome output:',
    ...chromeOutput.slice(-25)
  ].join('\\n'));
}
const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
try {
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Chrome DevTools WebSocket did not open within 15 seconds.')), 15000);
    ws.addEventListener('open', () => { clearTimeout(timeout); resolve(); }, { once: true });
    ws.addEventListener('error', () => { clearTimeout(timeout); reject(new Error('Chrome DevTools WebSocket connection failed.')); }, { once: true });
    ws.addEventListener('close', () => { clearTimeout(timeout); reject(new Error('Chrome closed the DevTools WebSocket before it opened.')); }, { once: true });
  });
} catch (error) {
  chrome.kill('SIGTERM');
  rmSync(PROFILE, { recursive: true, force: true });
  throw new Error(`${error.message}\\nRecent Chrome output:\\n${chromeOutput.slice(-25).join('\\n')}`);
}
let id = 0; const pending = new Map(); const logs = [];
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } if (m.method === 'Runtime.exceptionThrown') logs.push('EXC ' + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text));
  if (m.method === 'Network.responseReceived' && m.params.response.status >= 400 && !/favicon\.ico(?:$|[?#])/i.test(m.params.response.url)) logs.push(`HTTP ${m.params.response.status} ${m.params.response.url}`); });
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, (m) => (m.error ? rej(new Error(`${method}: ${m.error.message}`)) : res(m.result))); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true }); if (r.exceptionDetails) logs.push('EVAL ' + (r.exceptionDetails.exception?.description || r.exceptionDetails.text) + ' in ' + expr.slice(0, 80)); return r.result.value; };
await send('Runtime.enable');
await send('Log.enable');
await send('Network.enable');
await send('Network.setCacheDisabled', { cacheDisabled: true });
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 900, deviceScaleFactor: 2, mobile: true });
await send('Emulation.setTouchEmulationEnabled', { enabled: true });
await send('Page.enable'); await send('Page.navigate', { url: URL_ }); await sleep(4000);
// Simulate a hard refresh with the browser cache disabled before recording first-load evidence.
await send('Page.reload', { ignoreCache: true }); await sleep(4000);
const expectedTags = SPEC.flatMap((component) => component.api?.tags || [`<${component.tag}>`]).map((tag) => tag.slice(1, -1));
const galleryBootReport = JSON.parse(await ev(`(() => {
  const grid = document.getElementById('grid');
  const status = document.getElementById('gallery-status');
  const cards = [...(grid?.querySelectorAll('.item') || [])];
  return JSON.stringify({
    cardCount: cards.length,
    busy: grid?.getAttribute('aria-busy'),
    status: status?.textContent || '',
    allCardsReady: cards.length === 29 && cards.every((card) => card.dataset.loadState === 'ready'),
    registeredTags: ${JSON.stringify(expectedTags)}.filter((tag) => customElements.get(tag)).length
  });
})()`));
// E(tag) is the element; S(tag, sel) is something inside its shadow root
const E = (tag) => `document.querySelector('pinball-${tag}')`, S = (tag, sel) => `${E(tag)}.shadowRoot.querySelector(${JSON.stringify(sel)})`;
const at = async (expr, fx = 0.5, fy = 0.5) => JSON.parse(await ev(`(() => { const e = ${expr}; e.scrollIntoView({ block: 'center' }); const b = e.getBoundingClientRect(); return JSON.stringify([b.left + b.width * ${fx}, b.top + b.height * ${fy}]); })()`));
const touch = (type, x, y) => send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y }] });
const tap = async (tag, sel, fx, fy) => { const [x, y] = await at(S(tag, sel), fx, fy); await sleep(200); await touch('touchStart', x, y); await sleep(40); await touch('touchEnd', x, y); await sleep(150); };
const drag = async (x0, y0, x1, y1, n = 12, hold = 0) => { await touch('touchStart', x0, y0); for (let i = 1; i <= n; i++) { await touch('touchMove', x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n); await sleep(25); } await sleep(hold); await touch('touchEnd'); };
const key = async (k, code, up = true) => { const text = k === 'Enter' ? { text: '\r' } : k === ' ' ? { text: ' ' } : {}; await send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code: k === ' ' ? 'Space' : k, windowsVirtualKeyCode: code, ...text }); if (up) await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code: k === ' ' ? 'Space' : k, windowsVirtualKeyCode: code }); await sleep(60); };
const keyUp = (k, code) => send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code: k === ' ' ? 'Space' : k, windowsVirtualKeyCode: code });
const focus = (tag, sel) => ev(`${S(tag, sel)}.focus()`);
const prop = (tag, p) => ev(`${E(tag)}.${p}`);
// count the events each element fires, so a check can ask whether change really reached the page
await ev(`window.__n = {}; for (const t of ['input', 'change', 'send', 'bonus', 'delete', 'undo', 'commit', 'reset', 'hit', 'show', 'dismiss', 'search', 'open', 'close', 'cancel', 'toggle']) document.addEventListener(t, (e) => { if (!e.target.localName.startsWith('pinball-')) return; const k = e.target.localName.slice(8) + ' ' + t; __n[k] = (__n[k] || 0) + 1; })`);
const fired = (k) => ev(`__n[${JSON.stringify(k)}] || 0`);
// put the gallery's grid inside a form, once, to read what a form would send (the controls are form-associated)
await ev(`(() => { const f = document.createElement('form'); f.id = 'f'; const g = document.getElementById('grid'); g.before(f); f.appendChild(g); for (const t of ['toggle', 'slider', 'stepper', 'targets']) document.querySelector('pinball-' + t).setAttribute('name', t); })()`); await sleep(600);
const formValue = (n) => ev(`new FormData(document.getElementById('f')).get(${JSON.stringify(n)})`);
await ev(`window.__formDefaults = {
  toggle: document.querySelector('pinball-toggle').checked,
  slider: document.querySelector('pinball-slider').value,
  stepper: document.querySelector('pinball-stepper').value,
  targets: document.querySelector('pinball-targets').checked,
  checkbox: document.querySelector('pinball-checkbox').checked,
  radio: document.querySelector('pinball-radio-group').value,
  segmented: document.querySelector('pinball-segmented').value,
  textField: document.querySelector('pinball-text-field').value
}`);
const formDefaults = JSON.parse(await ev('JSON.stringify(window.__formDefaults)'));
let fails = 0;
const check = (name, ok, got) => { if (!ok) fails++; console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${got !== undefined ? `  ->  ${got}` : ''}`); };
check('gallery: all 29 component cards render on first load', galleryBootReport.cardCount === 29, galleryBootReport.cardCount);
check('gallery: boot state clears instead of remaining on Loading', galleryBootReport.busy === 'false' && !galleryBootReport.status.includes('Loading'), galleryBootReport.status);
check('gallery: all component cards initialize successfully', galleryBootReport.allCardsReady, galleryBootReport.status);
check('gallery: all 30 custom element tags register', galleryBootReport.registeredTags === 30, galleryBootReport.registeredTags);

if (process.env.PINMOTION_LIVE_SMOKE === '1') {
  await sleep(1200);
  const liveWidth = await ev('document.documentElement.scrollWidth');
  check('published gallery: no horizontal overflow at 390px', liveWidth <= 390, liveWidth);
  if (logs.length) { console.log(logs.join('\\n')); fails += logs.length; }
  ws.close(); chrome.kill(); await sleep(300);
  try { rmSync(PROFILE, { recursive: true, force: true }); } catch {}
  console.log(fails ? `${fails} failed` : 'Phase 0 published-gallery smoke passed');
  process.exit(fails ? 1 : 0);
}

check('all seven files built their elements', (await ev(`['toggle', 'slider', 'plunger', 'stepper', 'targets', 'drain', 'bumpers', 'bumper'].every((t) => { const e = document.querySelector('pinball-' + t); return e && e.shadowRoot && e.shadowRoot.querySelector('canvas'); })`)) === true);
check('WebGL is drawing (the toggle canvas has pixels)', (await ev(`(() => { const c = ${S('toggle', 'canvas')}; const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) n += d[i] > 0; return n; })()`)) > 1000);

// toggle: a tap, then Space
await tap('toggle', 'button');
check('toggle: a tap turns it on, with change', (await prop('toggle', 'checked')) === true && (await fired('toggle change')) === 1, await prop('toggle', 'checked'));
check('toggle: its form value is on', (await formValue('toggle')) === 'on', await formValue('toggle'));
await focus('toggle', 'button'); await key(' ', 32); await sleep(200);
check('toggle: Space turns it off and it leaves the form', (await prop('toggle', 'checked')) === false && (await formValue('toggle')) === null, `${await prop('toggle', 'checked')} / form ${await formValue('toggle')}`);
{ const [x, y] = await at(S('toggle', 'button'), 0.2, 0.5); const [x1] = await at(S('toggle', 'button'), 0.9, 0.5); await drag(x, y, x1, y, 10); await sleep(600);
  check('toggle: dragging the ball across turns it on', (await prop('toggle', 'checked')) === true, await prop('toggle', 'checked')); }

// slider: drag, then keys
{ const [x0, y] = await at(S('slider', '.track'), 0.42, 0.5); const [x1] = await at(S('slider', '.track'), 0.8, 0.5); await drag(x0, y, x1, y, 12); await sleep(300);
  check('slider: a drag moves it up, with input and change', (await prop('slider', 'value')) > 60 && (await fired('slider input')) > 2 && (await fired('slider change')) === 1, `${await prop('slider', 'value')} / ${await fired('slider input')} input`); }
await focus('slider', '.track'); await key('Home', 36); await key('ArrowRight', 39); await sleep(100);
check('slider: Home then arrow right reads 1', (await prop('slider', 'value')) === 1 && (await formValue('slider')) === '1', `${await prop('slider', 'value')} / form ${await formValue('slider')}`);
await key('End', 35); check('slider: End goes to 100', (await prop('slider', 'value')) === 100, await prop('slider', 'value'));

// stepper
await tap('stepper', '.plus'); await sleep(150);
check('stepper: plus adds one', (await prop('stepper', 'value')) === 5 && (await fired('stepper change')) >= 1 && (await formValue('stepper')) === '5', `${await prop('stepper', 'value')} / form ${await formValue('stepper')}`);
await tap('stepper', '.minus'); await tap('stepper', '.minus'); await sleep(150);
check('stepper: minus twice takes two', (await prop('stepper', 'value')) === 3, await prop('stepper', 'value'));
await focus('stepper', '.ctrl'); await key('End', 35); await sleep(150); check('stepper: End goes to 99', (await prop('stepper', 'value')) === 99, await prop('stepper', 'value'));
await key('PageDown', 34); await sleep(150); check('stepper: Page Down takes ten', (await prop('stepper', 'value')) === 89, await prop('stepper', 'value'));

// drop targets (the gallery starts with 0 and 2 ticked)
await tap('targets', '.slot[data-i="1"]'); await sleep(700);
check('targets: a tap ticks PUSH', JSON.stringify(await prop('targets', 'selected')) === '["EMAIL","PUSH","TEXT"]' && (await fired('targets change')) === 1 && (await formValue('targets')) === 'EMAIL,PUSH,TEXT', `${await prop('targets', 'selected')} / form ${await formValue('targets')}`);
await focus('targets', '.slot[data-i="3"]'); await key(' ', 32); await sleep(1200);
check('targets: Space on the last one ticks it and fires bonus', (await prop('targets', 'selected')).length === 4 && (await fired('targets bonus')) === 1, `${await prop('targets', 'selected')} / ${await fired('targets bonus')} bonus`);
await tap('targets', '.slot[data-i="0"]'); await sleep(300);
check('targets: a tap unticks EMAIL', (await prop('targets', 'checked'))[0] === false, JSON.stringify(await prop('targets', 'checked')));

// drain: delete, undo, then delete and let it run out
await tap('drain', '.chute'); await sleep(900);
check('drain: a tap starts deletion and emits delete during the draining state', ['draining', 'undoable'].includes(await prop('drain', 'state')) && (await fired('drain delete')) === 1, await prop('drain', 'state'));
await tap('drain', '.shoot'); await sleep(900);
check('drain: SHOOT AGAIN undoes it, with undo', (await prop('drain', 'state')) === 'ready' && (await fired('drain undo')) === 1, await prop('drain', 'state'));
await ev(`${E('drain')}.setAttribute('window', '500')`);
await focus('drain', '.chute'); await key('Delete', 46); await sleep(2000);
check('drain: Delete key, then the window runs out, with commit', (await fired('drain commit')) === 1, `${await prop('drain', 'state')} / ${await fired('drain commit')} commit`);
await sleep(1500); check('drain: the gallery serves a new ball after commit', (await prop('drain', 'state')) === 'ready', await prop('drain', 'state'));

// bumpers
await tap('bumper', 'button'); await tap('bumper', 'button'); await sleep(100);
check('bumper: two taps, two hits, a combo', (await fired('bumper hit')) === 2 && (await prop('bumper', 'combo')) === 2 && (await prop('bumper', 'score')) === 2, `${await fired('bumper hit')} hits, combo ${await prop('bumper', 'combo')}`);
await tap('bumpers', '.cluster'); await sleep(3500);
check('bumpers: a tap drops a ball that scores several hits', (await fired('bumpers hit')) >= 3 && (await prop('bumpers', 'score')) > 300, `${await fired('bumpers hit')} hits, score ${await prop('bumpers', 'score')}`);

// plunger: a short pull sends nothing; a full pull, wait for the ball, let go
{ const [x, y] = await at(S('plunger', 'button'), 0.75, 0.5);
  await drag(x, y, x + 15, y, 4); await sleep(500);
  check('plunger: a short pull sends nothing', (await fired('plunger send')) === 0);
  await drag(x, y, x + 260, y, 14, 900); await sleep(800);
  check('plunger: a full pull and release sends once', (await fired('plunger send')) === 1, await fired('plunger send')); }
await focus('plunger', 'button'); await key(' ', 32, false); await sleep(1300); await keyUp(' ', 32); await sleep(800);
check('plunger: holding Space and letting go sends', (await fired('plunger send')) === 2, await fired('plunger send'));
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await ev("document.querySelector('pinball-plunger').fire()"); await sleep(500);
check('plunger: reduced-motion programmatic full pull still sends without ball travel', (await fired('plunger send')) === 3 && (await prop('plunger', 'ball')) === 'none' && (await prop('plunger', 'px')) === 0, `${await fired('plunger send')} sends / ball ${await prop('plunger', 'ball')}`);
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });


check('all 22 lightweight elements connect and attach Shadow DOM', await ev("['checkbox','radio-group','segmented','progress','meter','rating','tabs','accordion','disclosure','tooltip','dialog','toast','breadcrumbs','pagination','search','text-field','text-area','select','combobox','file-drop','date-picker','color-picker'].every(id => { const e=document.querySelector('pinball-'+id); return !!(e && e.shadowRoot); })") === true);
check('all 22 utility components show their own backglass emblem', await ev("['checkbox','radio-group','segmented','progress','meter','rating','tabs','accordion','disclosure','tooltip','dialog','toast','breadcrumbs','pagination','search','text-field','text-area','select','combobox','file-drop','date-picker','color-picker'].every(id => { const e=document.querySelector('pinball-'+id); const b=e?.shadowRoot?.querySelector('.backglass'); return !!(b && b.dataset.model==='pinball-'+id && b.querySelector('svg')); })") === true);
check('utility chrome-ball markers reuse the shared WebGL shader in the full gallery', await ev("(() => { const e=document.querySelector('pinball-checkbox'); const d=e?.shadowRoot?.querySelector('.pinball-deck'); const c=e?.shadowRoot?.querySelector('.chrome-ball'); return !!(window.PinballKit && d?.classList.contains('has-live-ball') && c?.width===64 && c?.height===64); })()") === true);

// Checkbox, radio group and segmented selector.
await ev("document.querySelector('pinball-checkbox').setAttribute('name','extra-checkbox')");
await tap('checkbox','.check');
check('checkbox: pointer toggles and emits change', await prop('checkbox','checked') === true && await fired('checkbox change') === 1, await prop('checkbox','checked'));
check('checkbox: configured value participates in form', await formValue('extra-checkbox') === 'email', await formValue('extra-checkbox'));

await ev("document.querySelector('pinball-radio-group').setAttribute('name','extra-radio')");
await tap('radio-group','button[data-value="team"]');
check('radio group: selecting an option updates value', await prop('radio-group','value') === 'team' && await fired('radio-group change') === 1, await prop('radio-group','value'));
check('radio group: selected value participates in form', await formValue('extra-radio') === 'team', await formValue('extra-radio'));

await ev("document.querySelector('pinball-segmented').setAttribute('name','extra-range')");
await tap('segmented','button[data-value="month"]');
check('segmented: clicking a segment updates selection', await prop('segmented','value') === 'month' && await fired('segmented change') === 1, await prop('segmented','value'));
check('segmented: selected value participates in form', await formValue('extra-range') === 'month', await formValue('extra-range'));

// Informational displays.
await ev("document.querySelector('pinball-progress').value = 65");
check('progress: value updates its progressbar aria state', await ev("document.querySelector('pinball-progress').shadowRoot.querySelector('.track').getAttribute('aria-valuenow')") === '65');
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await ev("document.querySelector('pinball-progress').setAttribute('indeterminate','')");
check('progress: indeterminate animation is disabled for reduced motion', await ev("getComputedStyle(document.querySelector('pinball-progress').shadowRoot.querySelector('.fill')).animationName") === 'none');
await ev("document.querySelector('pinball-progress').removeAttribute('indeterminate')");
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
await ev("document.querySelector('pinball-meter').value = 72");
check('meter: value updates its meter aria state', await ev("document.querySelector('pinball-meter').shadowRoot.querySelector('.track').getAttribute('aria-valuenow')") === '72');

// Rating, tabs and accordion.
await ev("document.querySelector('pinball-rating').setAttribute('name','extra-rating')");
await tap('rating','button[data-value="5"]');
check('rating: selecting a star updates value and emits change', await prop('rating','value') === 5 && await fired('rating change') === 1, await prop('rating','value'));
check('rating: rating participates in form submission', await formValue('extra-rating') === '5', await formValue('extra-rating'));

await tap('tabs','button[data-index="1"]');
check('tabs: selecting the second tab updates activeIndex', await prop('tabs','activeIndex') === 1 && await fired('tabs change') === 1, await prop('tabs','activeIndex'));

await tap('accordion','button[data-index="1"]');
check('accordion: opening a section updates expanded state', (await prop('accordion','expanded')).includes(1) && await fired('accordion change') === 1, JSON.stringify(await prop('accordion','expanded')));

// Disclosure, tooltip, native dialog and toast feedback.
await tap('disclosure','summary');
check('disclosure: summary toggles the native disclosure', await prop('disclosure','open') === true && await fired('disclosure toggle') === 1, await prop('disclosure','open'));

await focus('tooltip','.tip');
check('tooltip: keyboard focus displays the description', await ev("document.querySelector('pinball-tooltip').shadowRoot.querySelector('.bubble').getAttribute('data-open')") === 'true');

await ev("document.querySelector('pinball-dialog').showModal()");
check('dialog: showModal opens the native dialog', await prop('dialog','open') === true && await fired('dialog open') === 1);
await ev("document.querySelector('pinball-dialog').close()");
await sleep(100);
check('dialog: close closes the native dialog', await prop('dialog','open') === false && await fired('dialog close') === 1);

await ev("document.querySelector('pinball-toast').show('Browser test toast', 0)");
check('toast: show reveals the status message', await ev("document.querySelector('pinball-toast').shadowRoot.querySelector('.shell').hidden") === false && await fired('toast show') === 1);
await ev("document.querySelector('pinball-toast').dismiss()");
check('toast: dismiss hides the status message', await ev("document.querySelector('pinball-toast').shadowRoot.querySelector('.shell').hidden") === true && await fired('toast dismiss') === 1);

await ev("document.querySelector('pinball-toast').show('Timed toast', 60)"); await sleep(140);
check('toast: duration automatically dismisses the message',
  await ev("document.querySelector('pinball-toast').shadowRoot.querySelector('.shell').hidden") === true && await fired('toast dismiss') === 2);
await ev("document.querySelector('pinball-toast').show('Replace this timer', 100)"); await sleep(30);
await ev("document.querySelector('pinball-toast').show('Persistent message', 0)"); await sleep(140);
check('toast: showing again clears the previous auto-dismiss timer',
  await ev("document.querySelector('pinball-toast').shadowRoot.querySelector('.shell').hidden") === false && await fired('toast dismiss') === 2);
await ev("document.querySelector('pinball-toast').dismiss()");
check('toast: persistent message remains until manually dismissed', await fired('toast dismiss') === 3);
await ev(`(() => {
  const toast = document.querySelector('pinball-toast');
  window.__detachedToast = toast; window.__toastParent = toast.parentNode; window.__toastNext = toast.nextSibling;
  toast.show('Disconnect cleanup', 80); toast.remove();
})()`); await sleep(150);
check('toast: disconnect clears the pending auto-dismiss timer', await fired('toast dismiss') === 3, await fired('toast dismiss'));
await ev(`__toastParent.insertBefore(__detachedToast, __toastNext)`); await sleep(100);
await ev("__detachedToast.show('Reconnected toast', 0)");
check('toast: component works after reconnect', await ev("__detachedToast.shadowRoot.querySelector('.shell').hidden") === false);
await ev("__detachedToast.dismiss()");

// Navigation and search.
check('breadcrumbs: final item is marked as the current page', await ev("document.querySelector('pinball-breadcrumbs').shadowRoot.querySelector('[aria-current=page]').textContent") === 'Breadcrumbs');

await tap('pagination','button[data-page="5"]');
check('pagination: selecting a page updates the page property', await prop('pagination','page') === 5 && await fired('pagination change') === 1, await prop('pagination','page'));

await ev("(() => { const e=document.querySelector('pinball-search'); const i=e.shadowRoot.querySelector('input'); i.value='pinball'; i.dispatchEvent(new Event('input',{bubbles:true})); e.shadowRoot.querySelector('form').requestSubmit(); })()");
check('search: submit emits the search event', await fired('search search') === 1);

// Text, selection, file and native input controls.
await ev("(() => { const e=document.querySelector('pinball-text-field'); e.setAttribute('name','extra-text'); const i=e.shadowRoot.querySelector('input'); i.value='Ada'; i.dispatchEvent(new Event('input',{bubbles:true})); })()");
check('text field: input updates the value and form data', await prop('text-field','value') === 'Ada' && await formValue('extra-text') === 'Ada', await prop('text-field','value'));

await ev("(() => { const e=document.querySelector('pinball-text-area'); const i=e.shadowRoot.querySelector('textarea'); i.value='A longer note'; i.dispatchEvent(new Event('input',{bubbles:true})); })()");
check('text area: multiline input updates value', await prop('text-area','value') === 'A longer note', await prop('text-area','value'));

await ev("(() => { const e=document.querySelector('pinball-select'); const s=e.shadowRoot.querySelector('select'); s.value='hard'; s.dispatchEvent(new Event('change',{bubbles:true})); })()");
check('select: native selection updates custom value', await prop('select','value') === 'hard' && await fired('select change') === 1, await prop('select','value'));

await ev("(() => { const e=document.querySelector('pinball-combobox'); const i=e.shadowRoot.querySelector('input'); i.value='amber'; i.dispatchEvent(new Event('input',{bubbles:true})); e.shadowRoot.querySelector('.option')?.click(); })()");
check('combobox: filtered option selection commits a value', await prop('combobox','value') === 'amber' && await fired('combobox change') === 1, await prop('combobox','value'));

await ev("(() => { const e=document.querySelector('pinball-file-drop'); const f=new File(['x'],'tiny.txt',{type:'text/plain'}); e.setFiles([f]); })()");
check('file drop: selected files are exposed to the host', await ev("document.querySelector('pinball-file-drop').files[0].name") === 'tiny.txt' && await fired('file-drop change') === 1);

await ev("document.querySelector('pinball-date-picker').value='2026-11-20'");
check('date picker: ISO date value is reflected', await prop('date-picker','value') === '2026-11-20', await prop('date-picker','value'));

await ev("document.querySelector('pinball-color-picker').value='#ff0000'");
check('color picker: hex value and readout stay synchronized', await prop('color-picker','value') === '#ff0000' && await ev("document.querySelector('pinball-color-picker').shadowRoot.querySelector('.hex').textContent") === '#FF0000', await prop('color-picker','value'));


 // Phase 2 contract smoke checks: state normalization, event contract and propagation.
 const eventContract = await ev(`(() => {
   const e = document.querySelector('pinball-checkbox');
   const before = e.checked;
   let got = null;
   const listener = (event) => { got = { detail: event.detail, bubbles: event.bubbles, composed: event.composed, ctor: event.constructor.name }; };
   e.addEventListener('change', listener, { once: true });
   e.checked = !before;
   const programmaticEvents = got;
   e.checked = before;
   e.dispatchEvent(new CustomEvent('phase2-probe', { bubbles: true, composed: true }));
   return JSON.stringify({ programmaticEvents, hostConnected: e.isConnected, shadow: !!e.shadowRoot });
 })()`);
 const contractData = JSON.parse(eventContract);
 check('phase 2: programmatic checkbox property updates do not emit user change events',
   contractData.programmaticEvents === null, JSON.stringify(contractData.programmaticEvents));
 check('phase 2: utility custom elements remain connected with an open shadow root',
   contractData.hostConnected && contractData.shadow);

 const propagation = await ev(`(() => {
   const e = document.querySelector('pinball-checkbox');
   e.checked = false;
   let observed = null;
   const listener = (event) => { observed = { bubbles: event.bubbles, composed: event.composed, detail: event.detail }; };
   e.addEventListener('change', listener, { once: true });
   e.shadowRoot.querySelector('.check').click();
   return JSON.stringify(observed);
 })()`);
 const propagated = JSON.parse(propagation);
 check('phase 2: checkbox change bubbles and crosses the shadow boundary',
   propagated?.bubbles === true && propagated?.composed === true &&
   propagated?.detail?.checked === true && propagated?.detail?.value === 'email',
   JSON.stringify(propagated));

 const utilityState = await ev(`(() => {
   const checks = {};
   const q = (tag) => document.querySelector('pinball-' + tag);
   const rating = q('rating'); rating.value = 999;
   checks.ratingMaximumClamped = rating.value === Number(rating.getAttribute('max') || 5);
   const progress = q('progress'); progress.value = 999;
   checks.progressBounded = progress.shadowRoot.querySelector('.track').getAttribute('aria-valuenow') === String(progress.max);
   const date = q('date-picker'); date.setAttribute('min', '2026-11-21'); date.setAttribute('max', '2026-11-21');
   date.value = '2026-11-21'; checks.dateISOValue = date.value === '2026-11-21';
   const tabs = q('tabs'); tabs.activeIndex = 999;
   checks.tabsIndexClamped = tabs.activeIndex === 2;
   const radio = q('radio-group'); const oldRadio = radio.value; radio.value = '__missing__';
   checks.radioRejectsUnknownValue = radio.value === oldRadio;
   const segmented = q('segmented'); const oldSegmented = segmented.value; segmented.value = '__missing__';
   checks.segmentedRejectsUnknownValue = segmented.value === oldSegmented;
   return JSON.stringify(checks);
 })()`);
 const states = JSON.parse(utilityState);
 for (const [name, passed] of Object.entries(states)) {
   check('phase 2 state boundary: ' + name, passed, JSON.stringify(states));
 }
 
 const nativeValidity = await ev(`(() => {
   const e = document.querySelector('pinball-text-field');
   e.setAttribute('required', '');
   const input = e.shadowRoot.querySelector('input');
   input.value = '';
   return JSON.stringify({ valueMissing: input.validity.valueMissing, invalid: !input.checkValidity() });
 })()`);
 const validity = JSON.parse(nativeValidity);
 check('phase 2 forms: required text field exposes native valueMissing validity',
   validity.valueMissing && validity.invalid, JSON.stringify(validity));
 const hostValidity = JSON.parse(await ev(`(() => {
   const e = document.querySelector('pinball-text-field');
   e.value = '';
   return JSON.stringify({
     hostValueMissing: e.internals.validity.valueMissing,
     hostInvalid: !e.internals.validity.valid,
     formInvalid: !document.getElementById('f').checkValidity()
   });
 })()`));
 check('phase 2 forms: required text field validity participates in outer form validation',
   hostValidity.hostValueMissing && hostValidity.hostInvalid && hostValidity.formInvalid, JSON.stringify(hostValidity));

 await ev(`(() => {
   const form = document.createElement('form'); form.id = '__pinmotion_validity_form';
   window.__invalidTargets = [];
   form.addEventListener('invalid', event => window.__invalidTargets.push(event.target.localName), true);
   const email = document.createElement('pinball-text-field');
   email.setAttribute('name', 'email'); email.setAttribute('type', 'email'); email.setAttribute('required', '');
   const note = document.createElement('pinball-text-area');
   note.setAttribute('name', 'note'); note.setAttribute('required', '');
   const date = document.createElement('pinball-date-picker');
   date.setAttribute('name', 'date'); date.setAttribute('min', '2026-11-21'); date.setAttribute('max', '2026-12-21'); date.setAttribute('value', '2026-11-20');
   form.append(email, note, date); document.body.append(form);
   window.__validityControls = { form, email, note, date };
 })()`); await sleep(120);
 const invalidControls = JSON.parse(await ev(`JSON.stringify({
   emailMissing: __validityControls.email.internals.validity.valueMissing,
   noteMissing: __validityControls.note.internals.validity.valueMissing,
   dateUnderflow: __validityControls.date.internals.validity.rangeUnderflow,
   formInvalid: !__validityControls.form.checkValidity()
 })`));
 check('phase 2 forms: text field, text area and date picker expose native constraint failures',
   invalidControls.emailMissing && invalidControls.noteMissing && invalidControls.dateUnderflow && invalidControls.formInvalid,
   JSON.stringify(invalidControls));
 const invalidTargets = JSON.parse(await ev('JSON.stringify(__invalidTargets)'));
 check('phase 2 forms: invalid events identify all three invalid custom controls',
   ['pinball-text-field','pinball-text-area','pinball-date-picker'].every(tag => invalidTargets.includes(tag)),
   JSON.stringify(invalidTargets));
 await ev(`__validityControls.email.value = 'not-an-email'`);
 check('phase 2 forms: email typeMismatch is reflected to ElementInternals',
   await ev('__validityControls.email.internals.validity.typeMismatch') === true);
 await ev(`__validityControls.email.value = 'valid@example.com'; __validityControls.note.value = 'Ready'; __validityControls.date.value = '2026-11-22'`);
 check('phase 2 forms: corrected values clear ElementInternals validity and pass form validation',
   await ev('__validityControls.form.checkValidity()') === true &&
   await ev('__validityControls.email.internals.validity.valid') === true &&
   await ev('__validityControls.note.internals.validity.valid') === true &&
   await ev('__validityControls.date.internals.validity.valid') === true);

 await ev("document.getElementById('f').reset()"); await sleep(120);
 const resetState = JSON.parse(await ev(`JSON.stringify({
   toggle: document.querySelector('pinball-toggle').checked,
   slider: document.querySelector('pinball-slider').value,
   stepper: document.querySelector('pinball-stepper').value,
   targets: document.querySelector('pinball-targets').checked,
   checkbox: document.querySelector('pinball-checkbox').checked,
   radio: document.querySelector('pinball-radio-group').value,
   segmented: document.querySelector('pinball-segmented').value,
   textField: document.querySelector('pinball-text-field').value
 })`));
 check('phase 2 forms: reset restores original PinballKit control defaults',
   resetState.toggle === formDefaults.toggle && resetState.slider === formDefaults.slider &&
   resetState.stepper === formDefaults.stepper && JSON.stringify(resetState.targets) === JSON.stringify(formDefaults.targets),
   JSON.stringify(resetState));
 check('phase 2 forms: reset restores utility control defaults',
   resetState.checkbox === formDefaults.checkbox && resetState.radio === formDefaults.radio &&
   resetState.segmented === formDefaults.segmented && resetState.textField === formDefaults.textField,
   JSON.stringify(resetState));

 await ev(`(() => {
   const specs = [
     ['rating', 'pinball-rating', { value: '4', max: '5' }],
     ['notes', 'pinball-text-area', { value: 'initial notes' }],
     ['plan', 'pinball-select', { options: 'basic:Basic;pro:Professional;team:Team', value: 'pro' }],
     ['__pinmotion_test_combobox', 'pinball-combobox', { options: 'amber:Amber;chrome:Chrome;ivory:Ivory', value: 'amber' }],
     ['launch', 'pinball-date-picker', { value: '2026-11-21' }],
     ['__pinmotion_test_color', 'pinball-color-picker', { value: '#123456' }]
   ];
   window.__resetControls = {};
   for (const [name, tag, attrs] of specs) {
     const el = document.createElement(tag);
     el.setAttribute('name', name);
     for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
     document.getElementById('f').append(el);
     window.__resetControls[name] = el;
   }
 })()`); await sleep(180);
 await ev(`(() => {
   const c = window.__resetControls;
   c.rating.value = 1; c.notes.value = 'changed notes'; c.plan.value = 'team';
   c.__pinmotion_test_combobox.value = 'chrome'; c.launch.value = '2026-12-01'; c.__pinmotion_test_color.value = '#abcdef';
   document.getElementById('f').reset();
 })()`); await sleep(150);
 const extendedReset = JSON.parse(await ev(`JSON.stringify(Object.fromEntries(Object.entries(window.__resetControls).map(([name, el]) => [name, { value: el.value, formValue: new FormData(document.getElementById('f')).get(name) } ])))`));
 check('phase 2 forms: rating reset restores its default and submitted value',
   extendedReset.rating.value === 4 && extendedReset.rating.formValue === '4', JSON.stringify(extendedReset.rating));
 check('phase 2 forms: text area reset restores its default and submitted value',
   extendedReset.notes.value === 'initial notes' && extendedReset.notes.formValue === 'initial notes', JSON.stringify(extendedReset.notes));
 check('phase 2 forms: select reset restores its default and submitted value',
   extendedReset.plan.value === 'pro' && extendedReset.plan.formValue === 'pro', JSON.stringify(extendedReset.plan));
 check('phase 2 forms: combobox reset restores its default and submitted value',
   extendedReset.__pinmotion_test_combobox.value === 'amber' && extendedReset.__pinmotion_test_combobox.formValue === 'amber', JSON.stringify(extendedReset.__pinmotion_test_combobox));
 check('phase 2 forms: date picker reset restores its default and submitted value',
   extendedReset.launch.value === '2026-11-21' && extendedReset.launch.formValue === '2026-11-21', JSON.stringify(extendedReset.launch));
 check('phase 2 forms: color picker reset restores its default and submitted value',
   extendedReset.__pinmotion_test_color.value === '#123456' && extendedReset.__pinmotion_test_color.formValue === '#123456', JSON.stringify(extendedReset.__pinmotion_test_color));

 await ev(`document.querySelector('pinball-toggle').formStateRestoreCallback(JSON.stringify({checked:true}), 'restore')`);
 check('phase 2 forms: state restoration restores checked state',
   await prop('toggle','checked') === true && await formValue('toggle') === 'on', await prop('toggle','checked'));
 await ev(`document.querySelector('pinball-slider').formStateRestoreCallback(JSON.stringify({value:37}), 'restore')`);
 check('phase 2 forms: state restoration restores scalar values',
   await prop('slider','value') === 37 && await formValue('slider') === '37', await prop('slider','value'));
 await ev(`document.querySelector('pinball-checkbox').formStateRestoreCallback(JSON.stringify({checked:true}), 'restore')`);
 check('phase 2 forms: utility state restoration restores checked state',
   await prop('checkbox','checked') === true, await prop('checkbox','checked'));
 await ev(`document.querySelector('pinball-text-field').formStateRestoreCallback(JSON.stringify({value:'restored text'}), 'restore')`)
 check('phase 2 forms: utility state restoration restores scalar value',
   await prop('text-field','value') === 'restored text', await prop('text-field','value'));

 await ev(`(() => {
   const fieldset=document.createElement('fieldset'); fieldset.disabled=true;
   const control=document.createElement('pinball-toggle'); control.setAttribute('checked',''); control.setAttribute('name','fieldset-toggle');
   fieldset.append(control); document.getElementById('f').append(fieldset); window.__fieldsetControl=control; window.__fieldset=fieldset;
 })()`); await sleep(100);
 check('phase 2 forms: disabled fieldset disables original custom controls',
   await ev('__fieldsetControl.inert') === true && await formValue('fieldset-toggle') === null,
   `${await ev('__fieldsetControl.inert')} / ${await formValue('fieldset-toggle')}`);
 await ev('__fieldset.disabled=false'); await sleep(100);
 check('phase 2 forms: enabling fieldset restores control participation',
   await ev('__fieldsetControl.inert') === false && await formValue('fieldset-toggle') === 'on',
   `${await ev('__fieldsetControl.inert')} / ${await formValue('fieldset-toggle')}`);

 await ev(`(() => {
   const fieldset=document.createElement('fieldset'); fieldset.disabled=true;
   const control=document.createElement('pinball-checkbox'); control.setAttribute('checked',''); control.setAttribute('name','fieldset-checkbox');
   fieldset.append(control); document.getElementById('f').append(fieldset); window.__fieldsetCheckbox=control; window.__fieldsetCheckboxGroup=fieldset;
 })()`); await sleep(100);
 check('phase 2 forms: disabled fieldset disables utility custom controls',
   await ev('__fieldsetCheckbox.inert') === true && await formValue('fieldset-checkbox') === null,
   `${await ev('__fieldsetCheckbox.inert')} / ${await formValue('fieldset-checkbox')}`);
 await ev('__fieldsetCheckboxGroup.disabled=false'); await sleep(100);
 check('phase 2 forms: enabling utility fieldset restores form participation',
   await ev('__fieldsetCheckbox.inert') === false && await formValue('fieldset-checkbox') === 'on',
   `${await ev('__fieldsetCheckbox.inert')} / ${await formValue('fieldset-checkbox')}`);


// disabled
await ev(`${E('toggle')}.setAttribute('disabled', '')`); await sleep(50);
check('disabled: the toggle is inert', (await ev(`${E('toggle')}.inert`)) === true);
await ev(`${E('toggle')}.removeAttribute('disabled')`);

await sleep(1500);
check('no sideways scroll at 390', (await ev('document.documentElement.scrollWidth')) <= 390, await ev('document.documentElement.scrollWidth'));
// Load every demo in a fresh page context to verify its standalone bundle.
for (const component of SPEC) {
  const url = `${new URL(URL_).origin}${BASE_PATH}${component.id}/`;
  const expectedPath = `${BASE_PATH}${component.id}/`;
  const expectedTags = (component.api?.tags || ['<' + component.tag + '>']).map((tag) => tag.slice(1, -1));
  await send('Page.navigate', { url });
  let standaloneReady = false;
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      standaloneReady = await ev('document.readyState === "complete" && window.location.pathname === ' +
        JSON.stringify(expectedPath) + ' && ' +
        JSON.stringify(expectedTags) + '.every((tag) => !!customElements.get(tag)) && !!document.querySelector(' + JSON.stringify(component.tag) + ')');
    } catch {}
    if (standaloneReady) break;
    await sleep(100);
  }
  check(component.id + ': standalone demo registers its component tags', standaloneReady, url);
}

if (logs.length) { console.log(logs.join('\n')); fails++; }
ws.close(); chrome.kill(); await sleep(300); try { rmSync(PROFILE, { recursive: true, force: true }); } catch {}
console.log(fails ? `${fails} failed` : 'all passed'); process.exit(fails ? 1 : 0);
