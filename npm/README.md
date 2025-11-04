# @llm-test-bench/cli

> Production-grade CLI for testing and benchmarking LLM applications

[![npm version](https://img.shields.io/npm/v/@llm-test-bench/cli.svg)](https://www.npmjs.com/package/@llm-test-bench/cli)
[![License](https://img.shields.io/badge/License-MIT%20OR%20Apache--2.0-blue.svg)](https://github.com/globalbusinessadvisors/llm-test-bench)

Comprehensive testing framework for Large Language Models with support for **65 models** across **14+ providers** including GPT-5, Claude Opus 4, Gemini 2.5, and more.

## Quick Start

### Installation

```bash
# Global installation
npm install -g @llm-test-bench/cli

# Or using npx (no installation required)
npx @llm-test-bench/cli --help
```

### Basic Usage

```bash
# Run a benchmark with GPT-5
llm-test-bench bench --provider openai --model gpt-5 --prompt "Explain quantum computing"

# Compare multiple models
llm-test-bench compare \
  --models "openai:gpt-5,anthropic:claude-opus-4,google:gemini-2.5-pro" \
  --prompt "Write a Python function"

# Launch interactive dashboard
llm-test-bench dashboard --port 8080
```

## CLI Commands

The package provides multiple commands for different use cases:

### Main Command

- **`llm-test-bench`** or **`ltb`** - Main CLI entry point with all subcommands

### Subcommands

All subcommands can be used with the `ltb-` prefix for convenience:

#### Testing & Benchmarking
- **`ltb-test`** - Run a single test against an LLM provider
  ```bash
  ltb-test openai --prompt "Hello, world!" --model gpt-5
  ```

- **`ltb-bench`** - Run comprehensive benchmarks across multiple providers
  ```bash
  ltb-bench --dataset prompts.json --providers openai,anthropic
  ```

#### Evaluation & Analysis
- **`ltb-eval`** - Evaluate test results with quality metrics
  ```bash
  ltb-eval --results results.json --metrics perplexity,coherence,relevance
  ```

- **`ltb-compare`** - Compare multiple models side-by-side
  ```bash
  ltb-compare --models gpt-5,claude-opus-4 --prompt "Code review"
  ```

- **`ltb-analyze`** - Perform statistical analysis on results
  ```bash
  ltb-analyze --baseline baseline.json --new new-results.json
  ```

#### Visualization
- **`ltb-dashboard`** - Generate interactive HTML dashboards
  ```bash
  ltb-dashboard --results results.json --port 8080
  ```

#### Optimization
- **`ltb-optimize`** - Recommend cost-optimized model alternatives
  ```bash
  ltb-optimize --metric latency --max-cost 0.01 --dataset prompts.json
  ```

#### Configuration
- **`ltb-config`** - Manage configuration
  ```bash
  ltb-config init  # Initialize configuration
  ltb-config show  # Show current configuration
  ```

## Supported Models

### OpenAI (27 models)
- `gpt-5`, `gpt-4.5`, `gpt-4.1`, `o3-mini`
- `gpt-4o`, `gpt-4o-mini`, `o1`, `o1-preview`, `o1-mini`
- `gpt-4-turbo`, `gpt-4`, `gpt-3.5-turbo`

### Anthropic (15 models)
- `claude-opus-4`, `claude-sonnet-4.5`, `claude-sonnet-4`
- `claude-3-5-sonnet-latest`, `claude-3-5-haiku-latest`
- `claude-3-opus-latest`, `claude-3-sonnet-20240229`, `claude-3-haiku-20240307`

### Google Gemini (16 models)
- `gemini-2.5-pro`, `gemini-2.5-computer-use`
- `gemini-2.0-flash-exp`, `gemini-1.5-pro`, `gemini-1.5-flash`
- `gemini-pro`, `gemini-pro-vision`

### Mistral AI (7 models)
- `mistral-code`, `magistral-large`, `magistral-medium`, `magistral-small`
- `voxtral-small`

### Additional Providers
- Azure OpenAI, AWS Bedrock, Cohere, Groq, Together AI, Hugging Face, Ollama, Replicate, Perplexity AI

## Configuration

Set up your API keys as environment variables:

```bash
export OPENAI_API_KEY="sk-..."
export ANTHROPIC_API_KEY="sk-ant-..."
export GOOGLE_API_KEY="..."
```

Or create a configuration file:

```bash
llm-test-bench config init
```

## Features

- ✅ **65 Models**: Support for the latest LLMs from all major providers
- 📊 **Advanced Metrics**: Perplexity, coherence, relevance, faithfulness evaluation
- ⚡ **High Performance**: Built with Rust for speed and reliability
- 🎨 **Rich Visualization**: Interactive dashboards with real-time metrics
- 🔧 **Flexible Configuration**: YAML/TOML config with environment variables
- 🐳 **Docker Support**: Containerized deployment with Docker Compose
- 🌐 **API Server**: REST, GraphQL, and WebSocket endpoints
- 🔌 **Extensible**: Plugin system for custom evaluators
- 📈 **Cost Optimization**: Track and optimize LLM costs
- 🖥️ **Distributed**: Scale benchmarks across multiple nodes

## Platform Support

This package downloads pre-compiled binaries for:
- **macOS**: x64, arm64 (Apple Silicon)
- **Linux**: x64, arm64
- **Windows**: x64

If a pre-built binary is not available for your platform, you can install from source using Cargo:

```bash
cargo install llm-test-bench
```

## Examples

### Compare GPT-5 vs Claude Opus 4

```bash
llm-test-bench compare \
  --models "openai:gpt-5,anthropic:claude-opus-4" \
  --prompt "Explain the theory of relativity" \
  --output results.json
```

### Benchmark with Custom Dataset

```bash
llm-test-bench bench \
  --dataset my-prompts.json \
  --providers openai,anthropic,google \
  --output-format html
```

### Cost Optimization

```bash
llm-test-bench optimize \
  --metric quality \
  --max-cost 0.005 \
  --dataset evaluation-set.json
```

## Documentation

- [Main Repository](https://github.com/globalbusinessadvisors/llm-test-bench)
- [Provider Documentation](https://github.com/globalbusinessadvisors/llm-test-bench/blob/main/docs/PROVIDERS.md)
- [CLI Reference](https://github.com/globalbusinessadvisors/llm-test-bench/blob/main/docs/CLI_REFERENCE.md)
- [API Documentation](https://docs.rs/llm-test-bench)

## License

This project is dual-licensed under MIT OR Apache-2.0. See [LICENSE](LICENSE) for details.

## Support

- 🐛 [Report Issues](https://github.com/globalbusinessadvisors/llm-test-bench/issues)
- 💬 [Discussions](https://github.com/globalbusinessadvisors/llm-test-bench/discussions)
- 📖 [Documentation](https://github.com/globalbusinessadvisors/llm-test-bench/tree/main/docs)

---

Made with ❤️ by the LLM Test Bench Team
