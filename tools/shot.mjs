// node tools/shot.mjs URL OUTPREFIX W H SCALE [t1,t2,...]
// Film pages (?film=name) are stepped to each time and photographed; other pages wait and are captured once, full height.
// Env: CHROME (default chromium), JS (run in the page before the capture), WAIT (ms after JS, default 1500), MOBILE=1.
import { spawn } from 'node:child_process';
import { rmSync, mkdtempSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const [URL_, OUT, W = '1080', H = '1080', SCALE = '1', TIMES = ''] = process.argv.slice(2);
if (!URL_ || !OUT) throw new Error('Usage: node tools/shot.mjs URL OUTPREFIX [WIDTH HEIGHT SCALE [TIMES]]');
const PORT = await new Promise((resolve) => {
  const server = createServer();
  server.listen(0, '127.0.0.1', () => {
    const port = server.address().port;
    server.close(() => resolve(port));
  });
});
const PROFILE = mkdtempSync(join(tmpdir(), 'pinmotion-shot-'));
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
  '--force-color-profile=srgb',
  `--window-size=${W},${H}`,
  'about:blank',
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
await new Promise((resolve, reject) => {
  const timeout = setTimeout(() => reject(new Error('Chrome DevTools WebSocket did not open within 15 seconds.')), 15000);
  ws.addEventListener('open', () => { clearTimeout(timeout); resolve(); }, { once: true });
  ws.addEventListener('error', () => { clearTimeout(timeout); reject(new Error('Chrome DevTools WebSocket connection failed.')); }, { once: true });
  ws.addEventListener('close', () => { clearTimeout(timeout); reject(new Error('Chrome closed the DevTools WebSocket before it opened.')); }, { once: true });
});
let id = 0; const pending = new Map(); const logs = [];
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  if (m.method === 'Runtime.exceptionThrown') logs.push('EXC ' + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text));
  if (m.method === 'Runtime.consoleAPICalled') logs.push('LOG ' + m.params.args.map((a) => a.value ?? a.description).join(' '));
});
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, (m) => (m.error ? rej(new Error(`${method}: ${m.error.message}`)) : res(m.result))); ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) logs.push('EVAL ' + (r.exceptionDetails.exception?.description || r.exceptionDetails.text)); return r.result.value; };
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: +W, height: +H, deviceScaleFactor: +SCALE, mobile: !!process.env.MOBILE });
await send('Page.enable');
await send('Page.navigate', { url: URL_ });
await sleep(900);
const snap = async (name, full) => {
  let clip;
  if (full) { const h = await evaluate('document.documentElement.scrollHeight'); clip = { x: 0, y: 0, width: +W, height: h, scale: 1 }; }
  const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: !!full, ...(clip ? { clip } : {}) });
  writeFileSync(name, Buffer.from(data, 'base64'));
};
if (TIMES) {
  let t = 0;
  for (const target of TIMES.split(',').map(Number)) {
    while (t < target) t = await evaluate('window.__film.step(30)');
    await snap(`${OUT}-${String(target).replace('.', '_')}.png`);
  }
} else {
  if (process.env.JS) { await evaluate(process.env.JS); await sleep(+(process.env.WAIT || 1500)); }
  await snap(`${OUT}.png`, true);
}
if (logs.length) console.log(logs.join("\n")); if (process.env.PRINT) console.log(await evaluate(process.env.PRINT));
console.log('ok', await evaluate('document.documentElement.scrollWidth'), 'x', await evaluate('document.documentElement.scrollHeight'));
ws.close(); chrome.kill(); await new Promise((r) => setTimeout(r, 300)); try { rmSync(PROFILE, { recursive: true, force: true }); } catch {}
