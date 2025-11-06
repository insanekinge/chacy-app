#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

function run(name, script) {
  const child = spawn(process.execPath, [path.join(__dirname, script)], {
    stdio: 'inherit',
    env: { ...process.env },
  });
  child.on('close', (code) => {
    console.log(`[${name}] exited with code ${code}`);
    process.exitCode = process.exitCode || code;
  });
  child.on('error', (err) => {
    console.error(`[${name}] failed to start:`, err);
    process.exitCode = 1;
  });
  return child;
}

// Ensure dev-friendly defaults
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (typeof process.env.DISABLE_DB === 'undefined') process.env.DISABLE_DB = 'true';
if (!process.env.NODE_OPTIONS || !process.env.NODE_OPTIONS.includes('--openssl-legacy-provider')) {
  process.env.NODE_OPTIONS = `${process.env.NODE_OPTIONS ? process.env.NODE_OPTIONS + ' ' : ''}--openssl-legacy-provider`;
}

const srv = run('server', 'start-server-dev.js');
const cli = run('client', 'start-client-dev.js');

function shutdown() {
  srv.kill();
  cli.kill();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);


