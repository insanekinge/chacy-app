#!/usr/bin/env node
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

process.env.NODE_ENV = 'production';
// Ensure relative asset paths suitable for extension packaging
process.env.PUBLIC_URL = './';

// Reuse existing build script
const build = spawnSync(process.execPath, [path.join(__dirname, 'build.js')], {
  stdio: 'inherit',
  env: process.env,
});

if (build.status !== 0) {
  process.exit(build.status || 1);
}

// Copy Chrome extension manifest into the build output
const src = path.join(__dirname, '..', 'src-client', 'public', 'manifest.chrome.json');
const dest = path.join(__dirname, '..', 'build', 'manifest.json');
fs.copyFileSync(src, dest);
console.log('Extension manifest copied to build/manifest.json');


