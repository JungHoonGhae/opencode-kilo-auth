# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-16

### Added

- **Initial Release** - Kilo Auth plugin for OpenCode
- **Device Authorization Flow** - OAuth-like device flow for Kilo Gateway authentication
- **API Key Authentication** - Direct API key authentication method
- **Free Models Support** - Access to free models like `z-ai/glm-5:free`, `minimax/minimax-m2.5:free`
- **Model Fetching** - Automatically fetch available models from Kilo Gateway API (341+ models)
- **OpenRouter SDK Integration** - Uses `@openrouter/ai-sdk-provider` for API communication
- **Provider Registration** - Registers `kilo` provider with OpenCode plugin system

### Technical Details

- Plugin exports auth hook for `kilo` provider
- Supports both anonymous (free models) and authenticated access
- Compatible with OpenCode's plugin system via `@opencode-ai/plugin`
- TypeScript support with full type definitions

### Models Available

Free models (no authentication required):
- `z-ai/glm-5:free`
- `minimax/minimax-m2.5:free`
- And more free tier models

Authenticated models (requires Kilo Gateway account):
- Full access to 341+ models via OpenRouter
- Claude, GPT, Gemini, Llama, and more

### Legal

- Independent community plugin, not affiliated with Kilo.ai or OpenCode
- Users must comply with Kilo.ai's terms of service