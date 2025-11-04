#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Get the binary path
const platform = process.platform;
const ext = platform === 'win32' ? '.exe' : '';
const binaryName = `llm-test-bench${ext}`;
const binaryPath = path.join(__dirname, binaryName);

// Forward all arguments to the binary
const args = process.argv.slice(2);

const child = spawn(binaryPath, args, {
  stdio: 'inherit',
  windowsHide: true,
});

child.on('exit', (code) => {
  process.exit(code || 0);
});

child.on('error', (err) => {
  console.error('Failed to start llm-test-bench:', err.message);
  console.error('\nMake sure the binary is installed correctly.');
  console.error('Try reinstalling: npm install -g @llm-test-bench/cli');
  process.exit(1);
});
