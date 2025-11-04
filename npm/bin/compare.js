#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

const platform = process.platform;
const ext = platform === 'win32' ? '.exe' : '';
const binaryPath = path.join(__dirname, `llm-test-bench${ext}`);

const child = spawn(binaryPath, ['compare', ...process.argv.slice(2)], { stdio: 'inherit' });
child.on('exit', (code) => process.exit(code || 0));
