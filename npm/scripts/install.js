#!/usr/bin/env node

const { spawnSync } = require('child_process');
const { existsSync } = require('fs');
const { join } = require('path');
const os = require('os');

function checkCargo() {
  const result = spawnSync('cargo', ['--version'], { encoding: 'utf8' });
  return result.status === 0;
}

function installFromCrates() {
  console.log('Installing llm-test-bench from crates.io...');
  console.log('This may take a few minutes on first install.\n');
  
  const result = spawnSync('cargo', ['install', 'llm-test-bench', '--version', '0.1.0'], {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
  
  if (result.status !== 0) {
    console.error('\nFailed to install llm-test-bench from crates.io');
    console.error('Error code:', result.status);
    return false;
  }
  
  console.log('\nSuccessfully installed llm-test-bench!');
  return true;
}

function checkExistingInstall() {
  const cargoHome = process.env.CARGO_HOME || join(os.homedir(), '.cargo');
  const binaryName = process.platform === 'win32' ? 'llm-test-bench.exe' : 'llm-test-bench';
  const binaryPath = join(cargoHome, 'bin', binaryName);
  
  if (existsSync(binaryPath)) {
    console.log('llm-test-bench is already installed at:', binaryPath);
    console.log('Skipping installation. Run "npm rebuild" to reinstall.');
    return true;
  }
  
  return false;
}

function main() {
  // Check if already installed
  if (checkExistingInstall()) {
    return;
  }
  
  // Check if cargo is available
  if (!checkCargo()) {
    console.error('Error: Cargo (Rust toolchain) is not installed.');
    console.error('');
    console.error('To use llm-test-bench, you need to install Rust:');
    console.error('  https://rustup.rs/');
    console.error('');
    console.error('After installing Rust, run:');
    console.error('  npm rebuild llm-test-bench');
    console.error('');
    process.exit(1);
  }
  
  // Install from crates.io
  const success = installFromCrates();
  if (!success) {
    process.exit(1);
  }
}

// Only run if not in CI environment (allows for optional dependencies)
if (!process.env.CI && process.env.npm_config_optional !== 'false') {
  main();
} else {
  console.log('Skipping llm-test-bench installation in CI environment.');
}
