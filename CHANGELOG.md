# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-04

### Added

#### Core Features
- **Multi-Provider Support**: Integrated 14+ LLM providers with 65 total models
- **OpenAI Integration** (27 models): GPT-5, GPT-4.5, GPT-4.1, o3-mini, GPT-4o series, o1 reasoning models, GPT-4 Turbo, GPT-4, GPT-3.5
- **Anthropic Integration** (15 models): Claude Opus 4, Claude Sonnet 4.5, Claude Sonnet 4, Claude 3.5 Sonnet/Haiku, Claude 3 series
- **Google Gemini Integration** (16 models): Gemini 2.5 Pro, Gemini 2.5 Computer Use, Gemini 2.0, Gemini 1.5 Pro/Flash, Gemini 1.0
- **Mistral AI Integration** (7 models): Mistral Code, Magistral Family (Large/Medium/Small), Voxtral audio models
- Additional providers: Azure OpenAI, AWS Bedrock, Cohere, Groq, Together AI, Hugging Face, Ollama, Replicate, Perplexity AI

#### Evaluation Metrics
- **Perplexity Analysis**: Statistical language model quality evaluation
- **Coherence Scoring**: Semantic consistency and logical flow assessment
- **Relevance Evaluation**: Context-aware response quality measurement
- **Faithfulness Testing**: Source attribution and hallucination detection
- **LLM-as-Judge**: Use LLMs to evaluate other LLMs
- **Text Analysis**: Readability, sentiment, toxicity, and PII detection

#### Benchmarking & Testing
- Systematic test execution with parallel processing
- Comparative analysis across multiple models
- Performance profiling (latency, throughput, cost tracking)
- A/B testing with statistical significance
- Automatic parameter tuning and model optimization

#### Visualization & Reporting
- Interactive dashboard with real-time metrics
- Chart.js-based visualizations (performance graphs, cost analysis, trends)
- Multiple export formats (HTML, JSON, Markdown)
- Cost analysis and tracking across providers
- Historical trend analysis

#### API & Integration
- REST API with authentication
- GraphQL query interface
- WebSocket support for real-time streaming
- Prometheus metrics export
- Health check endpoints

#### Advanced Features
- **Orchestration**: Intelligent model routing, ranking, and comparison
- **Analytics**: Statistical testing, cost optimization, quality analysis
- **Distributed Computing**: Scale benchmarks across multiple nodes
- **Monitoring**: Real-time metrics, dashboards, and alerts
- **Plugin System**: WASM-based sandboxed plugin support
- **Multimodal Support**: Image, audio, and video evaluation capabilities
- **Database Backend**: PostgreSQL with repository pattern

#### CLI Commands
- `bench`: Run benchmarks against LLM providers
- `compare`: Side-by-side model comparison
- `analyze`: Analyze benchmark results
- `dashboard`: Launch interactive visualization dashboard
- `optimize`: Optimize model selection based on criteria

#### Configuration
- YAML/TOML configuration support
- Environment variable interpolation
- Hierarchical config merging
- Provider-specific settings
- Evaluation metrics configuration

#### Development Tools
- Comprehensive test suites
- Integration tests for all major features
- Docker and Docker Compose support
- CI/CD pipeline with GitHub Actions
- Development documentation

### Documentation
- Comprehensive README with all 65 model IDs
- Provider documentation (docs/PROVIDERS.md)
- Architecture documentation
- API reference documentation
- Quick start guides
- CLI reference
- Docker deployment guide

### Technical Details
- Built with Rust 1.75+
- Async runtime with Tokio
- HTTP client with Reqwest
- Web framework with Axum
- Database with SQLx + PostgreSQL
- GraphQL with Async-GraphQL
- WebSocket with Tokio-Tungstenite
- WASM runtime with Wasmtime
- Prometheus metrics
- Distributed architecture with custom protocol

[0.1.0]: https://github.com/globalbusinessadvisors/llm-test-bench/releases/tag/v0.1.0
