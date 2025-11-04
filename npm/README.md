# llm-test-bench

A production-grade CLI for testing and benchmarking LLM applications with support for GPT-5, Claude Opus 4, Gemini 2.5, and 65+ models.

## Installation

### Prerequisites

This package requires [Rust](https://rustup.rs/) to be installed on your system, as it compiles the binary from source during installation.

### Install via npm

```bash
npm install -g llm-test-bench
```

### Install via npx (no installation required)

```bash
npx llm-test-bench --help
```

## Quick Start

```bash
# Run a test
llm-test-bench test --provider openai --model gpt-4 --prompt "Hello, world!"

# Run benchmarks
llm-test-bench bench --config bench.toml

# Compare models
llm-test-bench compare --models gpt-4,claude-3-5-sonnet --prompt "Explain quantum computing"

# Generate dashboard
llm-test-bench dashboard --results results/

# Analyze results
llm-test-bench analyze --baseline results/baseline.json --comparison results/new.json
```

## Features

- **65+ Model Support**: Test GPT-4, GPT-5, Claude Opus 4, Gemini 2.5, and many more
- **Comprehensive Metrics**: Latency, cost, quality scores, and custom evaluators
- **Dataset Testing**: Built-in datasets (MMLU, TruthfulQA) and custom dataset support
- **Interactive Dashboards**: Generate beautiful HTML dashboards with charts
- **Statistical Analysis**: Compare model performance with statistical significance tests
- **Cost Optimization**: Get recommendations for cheaper alternatives
- **Configuration Management**: Save and reuse test configurations

## Available Commands

- `test` - Run a single test against an LLM provider
- `bench` - Run benchmark tests across multiple providers
- `eval` - Evaluate test results with metrics
- `compare` - Compare multiple models on the same prompt or dataset
- `dashboard` - Generate interactive HTML dashboards from results
- `analyze` - Perform statistical analysis
- `optimize` - Recommend cost-optimized model alternatives
- `config` - Configuration management
- `completions` - Generate shell completions

## Documentation

For full documentation, visit: https://github.com/globalbusinessadvisors/llm-test-bench

## License

Licensed under either of:

- Apache License, Version 2.0 ([LICENSE-APACHE](LICENSE-APACHE))
- MIT License ([LICENSE-MIT](LICENSE-MIT))

at your option.

## Contributing

Contributions are welcome! Please see our [Contributing Guide](https://github.com/globalbusinessadvisors/llm-test-bench/blob/main/CONTRIBUTING.md).

## Support

- GitHub Issues: https://github.com/globalbusinessadvisors/llm-test-bench/issues
- Documentation: https://github.com/globalbusinessadvisors/llm-test-bench
- Crates.io: https://crates.io/crates/llm-test-bench
- npm: https://www.npmjs.com/package/llm-test-bench
