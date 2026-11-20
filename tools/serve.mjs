#!/usr/bin/env node
// Small dependency-free static server for local gallery and component testing.
import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const PORT_FLAG = process.argv.indexOf('--port');
const PORT = Number(process.env.PORT || (PORT_FLAG >= 0 ? process.argv[PORT_FLAG + 1] : 8000));
const HOST = process.env.HOST || '127.0.0.1';

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ico': 'image/x-icon',
  '.cff': 'text/plain; charset=utf-8'
};

function send(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

const server = createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return send(res, 405, 'Method not allowed');
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname);
  } catch {
    return send(res, 400, 'Invalid URL');
  }

  const segments = pathname.split('/').filter(Boolean);
  // Never expose repository metadata or hidden configuration through the dev server.
  if (segments.some((segment) => segment.startsWith('.'))) {
    return send(res, 404, 'Not found');
  }

  const file = resolve(ROOT, ...segments);
  if (file !== ROOT && !file.startsWith(ROOT + sep)) {
    return send(res, 403, 'Forbidden');
  }

  let info;
  try {
    info = statSync(file);
  } catch {
    return send(res, 404, 'Not found');
  }

  if (info.isDirectory()) {
    if (!pathname.endsWith('/')) {
      res.writeHead(301, { Location: pathname + '/' });
      return res.end();
    }
    return serveFile(resolve(file, 'index.html'), req, res);
  }

  return serveFile(file, req, res);
});

function serveFile(file, req, res) {
  let info;
  try {
    info = statSync(file);
  } catch {
    return send(res, 404, 'Not found');
  }

  if (!info.isFile()) return send(res, 404, 'Not found');

  res.writeHead(200, {
    'Content-Type': MIME[extname(file).toLowerCase()] || 'application/octet-stream',
    'Content-Length': info.size,
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-store'
  });

  if (req.method === 'HEAD') return res.end();

  const stream = createReadStream(file);
  stream.on('error', () => {
    if (!res.headersSent) send(res, 500, 'Unable to read file');
    else res.destroy();
  });
  stream.pipe(res);
}

server.listen(PORT, HOST, () => {
  console.log(`Pinmotion UI local server: http://${HOST}:${PORT}/`);
  console.log('Gallery: http://' + HOST + ':' + PORT + '/gallery/');
  console.log('Stop with Ctrl+C.');
});

server.on('error', (error) => {
  console.error('Local server failed:', error.message);
  process.exitCode = 1;
});
