<div align="center">

# LLM Test Bench

**A production-grade CLI for testing and benchmarking Large Language Models**

[![npm](https://img.shields.io/npm/v/llm-test-bench?logo=npm)](https://www.npmjs.com/package/llm-test-bench)
[![Crates.io](https://img.shields.io/crates/v/llm-test-bench?logo=rust)](https://crates.io/crates/llm-test-bench)
[![CI](https://img.shields.io/github/actions/workflow/status/globalbusinessadvisors/llm-test-bench/llm-benchmark.yml?branch=main&label=CI&logo=github)](https://github.com/globalbusinessadvisors/llm-test-bench/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Rust Version](https://img.shields.io/badge/rust-1.75%2B-blue.svg)](https://www.rust-lang.org)

[Quick Start](#quick-start) • [Features](#features) • [Documentation](#documentation) • [Support](#support)

</div>

---

## Overview

LLM Test Bench is a powerful, enterprise-grade framework built in Rust for comprehensive testing, benchmarking, and evaluation of Large Language Models. It provides a unified interface to test multiple LLM providers, evaluate responses with sophisticated metrics, and visualize results through an intuitive dashboard.

### Why LLM Test Bench?

- **Multi-Provider Support**: Test 14+ LLM providers with 65+ models through a single, unified interface
- **Latest Models**: Full support for GPT-5, Claude Opus 4, Gemini 2.5, and all 2025 releases
- **Comprehensive Metrics**: Evaluate models with perplexity, coherence, relevance, and custom evaluators
- **High Performance**: Built in Rust for speed, safety, and scalability
- **Rich Visualization**: Interactive dashboards with real-time metrics and beautiful charts
- **Production Ready**: Docker support, monitoring, REST/GraphQL APIs, and WebSocket streaming

---

## Quick Start

### Installation

#### Prerequisites

This package requires **[Rust](https://rustup.rs/)** to be installed on your system, as it compiles the binary from source during installation.

#### Install via npm

```bash
# Install globally
npm install -g llm-test-bench

# Verify installation
llm-test-bench --version
```

#### Install via npx (no installation required)

```bash
# Run without installing
npx llm-test-bench --help
```

### Configuration

Set up your API keys as environment variables:

```bash
# OpenAI
export OPENAI_API_KEY="sk-..."

# Anthropic
export ANTHROPIC_API_KEY="sk-ant-..."

# Google
export GOOGLE_API_KEY="..."

# AWS Bedrock
export AWS_ACCESS_KEY_ID="..."
export AWS_SECRET_ACCESS_KEY="..."
export AWS_REGION="us-east-1"
```

### Basic Usage

```bash
# Run a simple benchmark with GPT-5
llm-test-bench bench --provider openai --model gpt-5 --prompt "Explain quantum computing"

# Test with Claude Opus 4
llm-test-bench bench --provider anthropic --model claude-opus-4 --prompt "Code review this function"

# Use Gemini 2.5 Computer Use
llm-test-bench bench --provider google --model gemini-2.5-computer-use --prompt "Automate this task"

# Compare multiple models across providers
llm-test-bench compare \
  --models "openai:gpt-5,anthropic:claude-opus-4,google:gemini-2.5-pro" \
  --prompt "Write a Python function to sort a list"

# Launch interactive dashboard
llm-test-bench dashboard --port 8080

# Optimize model selection
llm-test-bench optimize \
  --metric latency \
  --max-cost 0.01 \
  --dataset prompts.json
```

---

## Features

### Multi-Provider LLM Support

**OpenAI (27 models)** • GPT-5, GPT-4.5, GPT-4.1, GPT-4o, o1, o1-mini, o3-mini, and more

**Anthropic (15 models)** • Claude Opus 4, Claude Sonnet 4.5, Claude 3.5 Sonnet, Claude 3.5 Haiku

**Google Gemini (16 models)** • Gemini 2.5 Pro, Gemini 2.5 Computer Use, Gemini 2.0 Flash, Gemini 1.5 Pro/Flash

**Mistral AI (7 models)** • Mistral Code, Magistral Large/Medium/Small, Voxtral

**Additional Providers** • Azure OpenAI, AWS Bedrock, Cohere, Ollama, Hugging Face, Together AI, Replicate, Groq, Perplexity AI

### Advanced Evaluation Metrics

- **Perplexity Analysis**: Statistical language model evaluation
- **Coherence Scoring**: Semantic consistency and logical flow
- **Relevance Evaluation**: Context-aware response quality
- **Faithfulness Testing**: Source attribution and hallucination detection
- **LLM-as-Judge**: Use LLMs to evaluate other LLMs
- **Text Analysis**: Readability, sentiment, toxicity, PII detection
- **Custom Evaluators**: Build your own evaluation metrics

### Benchmarking & Testing

- **Systematic Testing**: Automated test suites with rich assertions
- **Comparative Analysis**: Side-by-side model comparison
- **Performance Profiling**: Latency, throughput, and cost tracking
- **A/B Testing**: Statistical significance testing for model selection
- **Optimization Tools**: Automatic parameter tuning and model recommendation

### Visualization & Reporting

- **Interactive Dashboard**: Real-time metrics with Chart.js
- **Rich Charts**: Performance graphs, cost analysis, trend visualization
- **Multiple Formats**: HTML reports, JSON exports, custom templates
- **Cost Analysis**: Track spending across providers and models
- **Historical Trends**: Long-term performance tracking

### API & Integration

- **REST API**: Complete HTTP API with authentication
- **GraphQL**: Flexible query interface for complex data needs
- **WebSocket**: Real-time streaming and live updates
- **Monitoring**: Prometheus metrics and health checks
- **Distributed Computing**: Scale benchmarks across multiple nodes

---

## Available Commands

| Command | Description |
|---------|-------------|
| `bench` | Run benchmark tests across multiple providers |
| `compare` | Compare multiple models on the same prompt or dataset |
| `analyze` | Perform statistical analysis on results |
| `dashboard` | Generate interactive HTML dashboards from results |
| `optimize` | Recommend cost-optimized model alternatives |
| `eval` | Evaluate test results with metrics |
| `test` | Run a single test against an LLM provider |
| `config` | Configuration management |
| `completions` | Generate shell completions |

---

## Use Cases

### Model Selection
Compare multiple LLM providers to choose the best model for your use case based on quality, cost, and latency.

### Quality Assurance
Systematic testing of LLM applications with rich assertions and automated evaluation metrics.

### Performance Benchmarking
Measure and track latency, throughput, and cost across different models and configurations.

### Regression Testing
Ensure model updates don't degrade quality with historical comparison and automated alerts.

### Cost Optimization
Identify the most cost-effective model that meets your quality requirements.

### Research & Experimentation
Rapid prototyping and comparison of different prompts, models, and parameters.

---

## Architecture

LLM Test Bench follows a clean, modular architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                        CLI Layer                            │
│  bench │ compare │ analyze │ dashboard │ optimize          │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                     Core Library (core/)                    │
├─────────────────────────────────────────────────────────────┤
│  • Providers      • Evaluators     • Orchestration          │
│  • Analytics      • Visualization  • Monitoring             │
│  • Distributed    • Plugins        • Multimodal             │
│  • API Server     • Database       • Configuration          │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                    External Services                        │
│  LLM APIs │ PostgreSQL │ Redis │ Prometheus │ S3            │
└─────────────────────────────────────────────────────────────┘
```

**Built with Rust** for speed, safety, and reliability.

---

## Documentation

- [Quick Start Guide](https://github.com/globalbusinessadvisors/llm-test-bench/blob/main/docs/QUICKSTART_PHASE4.md) - Get up and running in 5 minutes
- [CLI Reference](https://github.com/globalbusinessadvisors/llm-test-bench/blob/main/docs/CLI_REFERENCE.md) - Complete command-line documentation
- [Configuration Guide](https://github.com/globalbusinessadvisors/llm-test-bench/blob/main/docs/CONFIGURATION.md) - Advanced configuration options
- [Architecture Overview](https://github.com/globalbusinessadvisors/llm-test-bench/blob/main/docs/ARCHITECTURE_REPORT.md) - System design and components
- [Provider Support](https://github.com/globalbusinessadvisors/llm-test-bench/blob/main/docs/PROVIDERS.md) - All supported LLM providers
- [API Documentation](https://github.com/globalbusinessadvisors/llm-test-bench/blob/main/docs/API.md) - REST & GraphQL API reference
- [Docker Deployment](https://github.com/globalbusinessadvisors/llm-test-bench/blob/main/docs/DOCKER_DEPLOYMENT.md) - Containerized deployment guide
- [Contributing Guide](https://github.com/globalbusinessadvisors/llm-test-bench/blob/main/CONTRIBUTING.md) - How to contribute

For full documentation, visit: **https://github.com/globalbusinessadvisors/llm-test-bench**

---

## Contributing

We welcome contributions! Here's how you can help:

- New LLM provider integrations
- Additional evaluation metrics
- Visualization improvements
- Documentation enhancements
- Bug fixes and performance improvements
- New features and capabilities

Please see our [Contributing Guide](https://github.com/globalbusinessadvisors/llm-test-bench/blob/main/CONTRIBUTING.md) for details.

---

## License

Licensed under either of:

- **MIT License** ([LICENSE-MIT](https://github.com/globalbusinessadvisors/llm-test-bench/blob/main/LICENSE-MIT))
- **Apache License, Version 2.0** ([LICENSE-APACHE](https://github.com/globalbusinessadvisors/llm-test-bench/blob/main/LICENSE-APACHE))

at your option.

---

## Support

- **Issues**: [GitHub Issues](https://github.com/globalbusinessadvisors/llm-test-bench/issues)
- **Discussions**: [GitHub Discussions](https://github.com/globalbusinessadvisors/llm-test-bench/discussions)
- **Documentation**: [docs/](https://github.com/globalbusinessadvisors/llm-test-bench/tree/main/docs)
- **Crates.io**: https://crates.io/crates/llm-test-bench
- **npm**: https://www.npmjs.com/package/llm-test-bench

---

<div align="center">

**Star us on GitHub — it motivates us a lot!**

[Report Bug](https://github.com/globalbusinessadvisors/llm-test-bench/issues) • [Request Feature](https://github.com/globalbusinessadvisors/llm-test-bench/issues) • [Documentation](https://github.com/globalbusinessadvisors/llm-test-bench)

Made with ❤️ by the LLM Test Bench Team

</div>
