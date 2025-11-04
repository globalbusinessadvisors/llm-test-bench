# Step-by-Step Publishing Guide

Complete guide to publish LLM Test Bench to crates.io and npm.

---

## 📦 Part 1: Publishing to crates.io (Rust)

### Prerequisites

#### 1. Install Rust (if not already installed)
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

Verify installation:
```bash
cargo --version
rustc --version
```

#### 2. Create crates.io Account
1. Go to https://crates.io/
2. Click "Log in with GitHub" in top right
3. Authorize the application

#### 3. Get API Token
1. Go to https://crates.io/settings/tokens
2. Click "New Token"
3. Give it a name (e.g., "Publishing Token")
4. Copy the token (you'll only see it once!)

#### 4. Login to crates.io
```bash
cargo login YOUR_TOKEN_HERE
```

This saves your token to `~/.cargo/credentials`

### Publishing Steps

**IMPORTANT:** You must publish in this order because of dependencies!

#### Step 1: Publish datasets package
```bash
cd /workspaces/llm-test-bench/datasets

# Test first (dry run)
cargo publish --dry-run

# If that succeeds, publish for real
cargo publish
```

Wait for it to say "Uploading llm-test-bench-datasets v0.1.0"

#### Step 2: Wait for indexing (2-3 minutes)
crates.io needs time to index the package. Check status:
```bash
cargo search llm-test-bench-datasets
```

When you see your package listed, proceed to next step.

#### Step 3: Publish core package
```bash
cd /workspaces/llm-test-bench/core

# Test first
cargo publish --dry-run

# Publish
cargo publish
```

#### Step 4: Wait for indexing again (2-3 minutes)
```bash
cargo search llm-test-bench-core
```

#### Step 5: Publish CLI package
```bash
cd /workspaces/llm-test-bench/cli

# Test first
cargo publish --dry-run

# Publish
cargo publish
```

### Verification

Test that everything worked:
```bash
# Search for your packages
cargo search llm-test-bench

# Install the CLI
cargo install llm-test-bench

# Test it works
llm-test-bench --version
```

🎉 **crates.io publishing complete!**

View your packages at:
- https://crates.io/crates/llm-test-bench
- https://crates.io/crates/llm-test-bench-core
- https://crates.io/crates/llm-test-bench-datasets

---

## 📦 Part 2: Publishing to npm (Node.js)

### Prerequisites

#### 1. Install Node.js (if not already installed)
```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

Verify:
```bash
node --version
npm --version
```

#### 2. Create npm Account
1. Go to https://www.npmjs.com/signup
2. Create an account
3. Verify your email

#### 3. Get npm Token
1. Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Click "Generate New Token"
3. Select "Automation" (for CI/CD use)
4. Copy the token

#### 4. Add npm Token to GitHub Secrets
1. Go to your GitHub repository: https://github.com/globalbusinessadvisors/llm-test-bench
2. Click "Settings" tab
3. Click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Name: `NPM_TOKEN`
6. Value: Paste your npm token
7. Click "Add secret"

### Publishing Steps

You have two options for npm publishing:

---

### Option A: Automatic Publishing (Recommended)

This uses GitHub Actions to build binaries and publish automatically.

#### Step 1: Create a Git Tag
```bash
cd /workspaces/llm-test-bench

# Create a tag for version 0.1.0
git tag -a v0.1.0 -m "Release v0.1.0"

# Push the tag to GitHub
git push origin v0.1.0
```

#### Step 2: Create GitHub Release
1. Go to https://github.com/globalbusinessadvisors/llm-test-bench/releases
2. Click "Create a new release"
3. Select tag: `v0.1.0`
4. Release title: `v0.1.0`
5. Description: Copy from CHANGELOG.md
6. Click "Publish release"

#### Step 3: Watch the Workflow
1. Go to https://github.com/globalbusinessadvisors/llm-test-bench/actions
2. You'll see "Publish to npm" workflow running
3. It will:
   - Build binaries for all platforms (macOS, Linux, Windows)
   - Publish to npm
   - Attach binaries to the release
4. Wait for it to complete (about 10-15 minutes)

---

### Option B: Manual Publishing (Advanced)

If you want to publish manually without building all binaries:

#### Step 1: Login to npm
```bash
npm login
# Enter your username, password, and email
```

#### Step 2: Test the package
```bash
cd /workspaces/llm-test-bench/npm

# Check what will be published
npm pack --dry-run

# This creates a .tgz file you can inspect
npm pack
tar -tzf llm-test-bench-cli-0.1.0.tgz
```

#### Step 3: Publish to npm
```bash
cd /workspaces/llm-test-bench/npm

# Publish (public access required for scoped packages)
npm publish --access public
```

**Note:** With manual publishing, users will need to build from source since binaries won't be available. Use Option A for production releases.

---

### Verification

Test that npm package works:

```bash
# Install globally
npm install -g @llm-test-bench/cli

# Test the commands
llm-test-bench --version
ltb --version
ltb-bench --help
ltb-compare --help
```

🎉 **npm publishing complete!**

View your package at:
- https://www.npmjs.com/package/@llm-test-bench/cli

---

## 📋 Complete Checklist

### Before Publishing

- [ ] All tests pass: `cargo test --all`
- [ ] No warnings: `cargo clippy --all -- -D warnings`
- [ ] Documentation builds: `cargo doc --no-deps`
- [ ] Version is correct in `Cargo.toml` (workspace.package.version)
- [ ] CHANGELOG.md is updated
- [ ] README.md is up to date
- [ ] All changes committed and pushed to main

### crates.io Publishing

- [ ] Rust installed
- [ ] crates.io account created
- [ ] API token obtained and logged in
- [ ] Published datasets: `cargo publish` in `datasets/`
- [ ] Wait 2-3 minutes for indexing
- [ ] Published core: `cargo publish` in `core/`
- [ ] Wait 2-3 minutes for indexing
- [ ] Published CLI: `cargo publish` in `cli/`
- [ ] Verified installation: `cargo install llm-test-bench`

### npm Publishing

- [ ] Node.js installed
- [ ] npm account created
- [ ] npm token obtained
- [ ] NPM_TOKEN added to GitHub secrets
- [ ] Git tag created and pushed: `git tag v0.1.0 && git push origin v0.1.0`
- [ ] GitHub release created
- [ ] GitHub Actions workflow completed successfully
- [ ] Verified installation: `npm install -g @llm-test-bench/cli`

---

## 🔧 Troubleshooting

### crates.io Issues

**"crate already uploaded"**
- You cannot republish the same version
- Increment version in `Cargo.toml` workspace section
- Follow semver: 0.1.0 → 0.1.1 (patch), 0.2.0 (minor), 1.0.0 (major)

**"dependency not found"**
- Make sure you published in the correct order
- Wait 2-3 minutes between publishes for indexing
- Check https://crates.io/crates/PACKAGE_NAME to see if it's there

**"authentication required"**
- Run `cargo login` again with your token
- Check `~/.cargo/credentials` exists

### npm Issues

**"You must be logged in to publish packages"**
- Run `npm login` and enter credentials
- Or use `NPM_TOKEN` in GitHub Actions

**"403 Forbidden"**
- Scoped packages (@llm-test-bench/cli) require `--access public`
- Run: `npm publish --access public`

**"Binary download failed" (users report this)**
- Make sure GitHub release has the binaries attached
- Check the release URL matches in `npm/scripts/install.js`
- Users can fallback to: `cargo install llm-test-bench`

### GitHub Actions Issues

**"NPM_TOKEN not found"**
- Add secret in GitHub repo settings
- Go to Settings → Secrets and variables → Actions
- Name must be exactly `NPM_TOKEN`

**Build fails on specific platform**
- Check the workflow logs in GitHub Actions
- May need to adjust build scripts for that platform

---

## 🎯 Quick Reference

### Publish Everything (from scratch)

```bash
# 1. Install tools
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20

# 2. Login to registries
cargo login YOUR_CRATES_IO_TOKEN
npm login

# 3. Publish to crates.io
cd datasets && cargo publish && cd ..
sleep 180  # Wait 3 minutes
cd core && cargo publish && cd ..
sleep 180  # Wait 3 minutes
cd cli && cargo publish && cd ..

# 4. Publish to npm (automatic)
git tag -a v0.1.0 -m "Release v0.1.0"
git push origin v0.1.0
# Then create GitHub release

# 5. Verify
cargo install llm-test-bench
npm install -g @llm-test-bench/cli
llm-test-bench --version
```

---

## 📞 Need Help?

- crates.io docs: https://doc.rust-lang.org/cargo/reference/publishing.html
- npm docs: https://docs.npmjs.com/cli/v10/commands/npm-publish
- GitHub Issues: https://github.com/globalbusinessadvisors/llm-test-bench/issues

---

**That's it! Good luck with your first publish! 🚀**
