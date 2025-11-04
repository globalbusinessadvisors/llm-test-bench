#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');
const { pipeline } = require('stream');
const { createWriteStream, createReadStream } = require('fs');
const { execSync } = require('child_process');

const streamPipeline = promisify(pipeline);

// Determine platform and architecture
const platform = process.platform;
const arch = process.arch;

// Map Node.js platform names to Rust target names
const PLATFORM_MAPPING = {
  darwin: 'apple-darwin',
  linux: 'unknown-linux-gnu',
  win32: 'pc-windows-msvc',
};

const ARCH_MAPPING = {
  x64: 'x86_64',
  arm64: 'aarch64',
};

// Get the binary name
function getBinaryName() {
  const ext = platform === 'win32' ? '.exe' : '';
  return `llm-test-bench${ext}`;
}

// Get the target triple
function getTarget() {
  const platformName = PLATFORM_MAPPING[platform];
  const archName = ARCH_MAPPING[arch];

  if (!platformName || !archName) {
    throw new Error(`Unsupported platform: ${platform}-${arch}`);
  }

  return `${archName}-${platformName}`;
}

// Get download URL
function getDownloadUrl(version) {
  const target = getTarget();
  const ext = platform === 'win32' ? '.exe' : '';

  // Using GitHub releases - binaries are named with target triple
  return `https://github.com/globalbusinessadvisors/llm-test-bench/releases/download/v${version}/llm-test-bench-${target}${ext}`;
}

// Download file
async function download(url, dest) {
  console.log(`Downloading from: ${url}`);
  console.log(`Saving to: ${dest}`);

  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Download failed with status ${response.statusCode}`));
        return;
      }

      const fileStream = createWriteStream(dest);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    }).on('error', reject);
  });
}

// Make file executable
function makeExecutable(filePath) {
  if (platform !== 'win32') {
    fs.chmodSync(filePath, 0o755);
  }
}

// Main installation
async function install() {
  try {
    const packageJson = require('../package.json');
    const version = packageJson.version;

    // Create bin directory
    const binDir = path.join(__dirname, '..', 'bin');
    if (!fs.existsSync(binDir)) {
      fs.mkdirSync(binDir, { recursive: true });
    }

    const binaryName = getBinaryName();
    const binaryPath = path.join(binDir, binaryName);

    // Check if binary already exists
    if (fs.existsSync(binaryPath)) {
      console.log('Binary already installed.');
      makeExecutable(binaryPath);
      return;
    }

    console.log(`Installing LLM Test Bench v${version} for ${platform}-${arch}...`);

    // Try to download from GitHub releases
    try {
      const downloadUrl = getDownloadUrl(version);
      await download(downloadUrl, binaryPath);
      makeExecutable(binaryPath);
      console.log('✓ Installation successful!');
      console.log(`\nRun 'llm-test-bench --help' to get started.`);
    } catch (error) {
      console.error('Failed to download pre-built binary:', error.message);
      console.log('\n⚠️  Pre-built binary not available for your platform.');
      console.log('Please install from source using Cargo:');
      console.log('  cargo install llm-test-bench');
      console.log('\nOr download manually from:');
      console.log('  https://github.com/globalbusinessadvisors/llm-test-bench/releases');
      process.exit(1);
    }
  } catch (error) {
    console.error('Installation failed:', error);
    process.exit(1);
  }
}

// Run installation
install();
