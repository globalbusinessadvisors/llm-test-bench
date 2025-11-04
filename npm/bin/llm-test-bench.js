#!/usr/bin/env node

const { spawn } = require('child_process');
const { join } = require('path');
const { existsSync } = require('fs');
const os = require('os');

// Try to find the binary in common locations
function findBinary() {
  const binaryName = process.platform === 'win32' ? 'llm-test-bench.exe' : 'llm-test-bench';
  
  // Check in local node_modules bin
  const localBin = join(__dirname, '..', 'bin', binaryName);
  if (existsSync(localBin)) {
    return localBin;
  }
  
  // Check in cargo install location
  const cargoHome = process.env.CARGO_HOME || join(os.homedir(), '.cargo');
  const cargoBin = join(cargoHome, 'bin', binaryName);
  if (existsSync(cargoBin)) {
    return cargoBin;
  }
  
  // Fall back to system PATH
  return binaryName;
}

// Spawn the binary
const binary = findBinary();
const args = process.argv.slice(2);

const child = spawn(binary, args, {
  stdio: 'inherit',
  shell: false
});

child.on('error', (err) => {
  if (err.code === 'ENOENT') {
    console.error('Error: llm-test-bench binary not found.');
    console.error('Please ensure Rust and Cargo are installed: https://rustup.rs/');
    console.error('Then run: npm rebuild llm-test-bench');
    process.exit(1);
  } else {
    console.error('Error running llm-test-bench:', err.message);
    process.exit(1);
  }
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code || 0);
  }
});
