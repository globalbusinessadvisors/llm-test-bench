# Publishing llm-test-bench to npm

## Prerequisites

1. **npm account**: Create one at https://www.npmjs.com/signup
2. **npm authentication**: Login via CLI

## Publishing Steps

### 1. Login to npm

```bash
cd /workspaces/llm-test-bench/npm
npm login
```

You'll be prompted for:
- Username
- Password
- Email
- One-time password (if 2FA is enabled)

### 2. Verify package before publishing

```bash
# Check what will be published
npm pack --dry-run

# Verify package metadata
npm publish --dry-run
```

### 3. Publish to npm

```bash
npm publish
```

If you want to publish with public access (for scoped packages):

```bash
npm publish --access public
```

### 4. Verify publication

```bash
# Check the published package
npm view llm-test-bench

# Test installation
npm install -g llm-test-bench

# Test the CLI
llm-test-bench --version
```

## For Future Updates

### Publishing a new version

1. Update version in `package.json`:
   ```bash
   npm version patch  # for 0.1.0 -> 0.1.1
   npm version minor  # for 0.1.0 -> 0.2.0
   npm version major  # for 0.1.0 -> 1.0.0
   ```

2. Publish the new version:
   ```bash
   npm publish
   ```

3. Push the git tag:
   ```bash
   git push --follow-tags
   ```

## Troubleshooting

### "Package name too similar to existing package"
- Choose a different name or request transfer of the existing package

### "You do not have permission to publish"
- Ensure you're logged in: `npm whoami`
- Check package ownership: `npm owner ls llm-test-bench`

### "Version already published"
- Bump the version number in package.json
- Never republish the same version

## Maintenance

### Add collaborators
```bash
npm owner add <username> llm-test-bench
```

### Remove collaborators
```bash
npm owner rm <username> llm-test-bench
```

### Deprecate a version
```bash
npm deprecate llm-test-bench@0.1.0 "Please upgrade to 0.2.0"
```

### Unpublish (use with caution - only within 72 hours)
```bash
npm unpublish llm-test-bench@0.1.0
```

## Best Practices

1. ✅ Always test locally before publishing
2. ✅ Use semantic versioning
3. ✅ Update CHANGELOG.md for each release
4. ✅ Tag releases in git
5. ✅ Keep README.md up to date
6. ✅ Test installation in a clean environment

## Links

- npm package: https://www.npmjs.com/package/llm-test-bench
- npm documentation: https://docs.npmjs.com/
- Semantic versioning: https://semver.org/
