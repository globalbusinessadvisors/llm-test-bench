#!/usr/bin/env node

const { spawnSync } = require('child_process');

console.log('Testing llm-test-bench installation...\n');

const result = spawnSync('node', [require.resolve('../bin/llm-test-bench.js'), '--version'], {
  encoding: 'utf8',
  stdio: 'inherit'
});

if (result.status === 0) {
  console.log('\n✓ llm-test-bench is working correctly!');
  process.exit(0);
} else {
  console.error('\n✗ llm-test-bench test failed');
  process.exit(1);
}
