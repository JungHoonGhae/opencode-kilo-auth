# Kilo Auth Plugin for OpenCode

[![npm version](https://img.shields.io/npm/v/opencode-kilo-auth.svg)](https://www.npmjs.com/package/opencode-kilo-auth)
[![npm downloads](https://img.shields.io/npm/dw/opencode-kilo-auth.svg)](https://www.npmjs.com/package/opencode-kilo-auth)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/JungHoonGhae/opencode-kilo-auth/blob/main/LICENSE)

Access AI models through **Kilo Gateway** in OpenCode, including free tier models like `z-ai/glm-5:free` and `minimax/minimax-m2.5:free`.

> **Disclaimer**: This is an independent community plugin. It is not affiliated with, endorsed by, or sponsored by Kilo.ai or OpenCode. Kilo™ and OpenCode™ are trademarks of their respective owners.

## What is Kilo Gateway?

**Kilo Gateway** is a unified API gateway that provides access to 340+ AI models from multiple providers through a single interface:

- **Anthropic**: Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku
- **OpenAI**: GPT-4o, GPT-4 Turbo, GPT-3.5 Turbo
- **Google**: Gemini 1.5 Pro, Gemini 1.5 Flash
- **Meta**: Llama 3.1, Llama 3.2
- **Mistral**: Mistral Large, Mixtral
- **Free Tier Models**: 29 free models available
- **And many more...**

### Why Kilo Gateway?

Kilo Gateway offers **free tier models that OpenRouter does not provide for free**, including:

- **Step 3.5 Flash (Free)** - StepFun's powerful 196B MoE model with 256K context, not available for free on OpenRouter
- **GLM 5 (Free)** - Z.ai's flagship model with 202K context and reasoning
- **MiniMax M2.5 (Free)** - 204K context with strong coding and reasoning

This makes Kilo Gateway an excellent choice for developers who want to experiment with powerful models without upfront costs.

### Kilo Auto Routing

`kilo/auto` **automatically routes your request to the best model for the task**. This is the recommended model for general use - no need to choose between different models.

Features:
- Automatically selects optimal model based on your request
- Supports vision (image attachments)
- Supports reasoning and tool calls
- 200K context window

### Authentication

Kilo Gateway supports two authentication methods:
- **Device Authorization** - OAuth-like flow, no API key management needed
- **API Key** - Direct API key from your Kilo account

## Installation

Add the following to your `~/.config/opencode/opencode.json`:

```json
{
  "plugin": ["opencode-kilo-auth@latest"],
  "provider": {
    "kilo": {
      "name": "Kilo Gateway",
      "models": {
        "kilo/auto": {
          "id": "kilo/auto",
          "name": "Kilo Auto",
          "release_date": "2025-01-01",
          "attachment": true,
          "reasoning": true,
          "temperature": true,
          "tool_call": true,
          "limit": { "context": 200000, "output": 64000 }
        }
      }
    }
  }
}
```

## How to Add More Models

1. Open [models.json](./models.json)
2. Find the model you want (e.g., `z-ai/glm-5:free`)
3. Copy the entire model object
4. Paste into your `opencode.json` under `provider.kilo.models`

**That's it!** models.json is already in the correct format - just copy and paste.

Example:
```json
// From models.json, just copy:
"z-ai/glm-5:free": {
  "id": "z-ai/glm-5:free",
  "name": "Z.ai: GLM 5 (free)",
  "release_date": "2026-02-16",
  "attachment": false,
  "reasoning": true,
  "temperature": true,
  "tool_call": true,
  "limit": { "context": 202800, "output": 131072 }
}

// Paste directly into opencode.json - no changes needed!
```

## Model Configuration Schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Model ID (same as key) |
| `name` | string | Display name |
| `release_date` | string | Release date (YYYY-MM-DD) |
| `attachment` | boolean | Supports image attachments |
| `reasoning` | boolean | Supports reasoning/thinking |
| `temperature` | boolean | Supports temperature parameter |
| `tool_call` | boolean | Supports tool/function calls |
| `limit.context` | number | Max context tokens |
| `limit.output` | number | Max output tokens |

## Available Models

See [models.json](./models.json) for the complete list of 342 models.

### Recommended Models

| Model | Description | Context | Features |
|-------|-------------|---------|----------|
| `kilo/auto` | **Auto-routes to best model** | 200K | Vision, Reasoning, Tools |
| `stepfun/step-3.5-flash:free` | **StepFun 196B MoE - not free on OpenRouter** | 256K | Reasoning, Tools |
| `z-ai/glm-5:free` | GLM 5 free tier | 202K | Reasoning, Tools |
| `minimax/minimax-m2.5:free` | MiniMax M2.5 free tier | 204K | Reasoning, Tools |

### Free Tier Models (29 models)

All free tier models end with `:free` suffix:
- `z-ai/glm-5:free`, `z-ai/glm-4.5-air:free`
- `minimax/minimax-m2.5:free`
- `stepfun/step-3.5-flash:free`
- `google/gemma-3-27b-it:free`, `google/gemma-3-12b-it:free`, `google/gemma-3-4b-it:free`
- `qwen/qwen3-coder:free`, `qwen/qwen3-4b:free`, `qwen/qwen3-next-80b-a3b-instruct:free`
- And more...

### Premium Models (313 models)

Premium models from all major providers:
- **Anthropic**: Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku
- **OpenAI**: GPT-4o, GPT-4 Turbo, GPT-3.5 Turbo
- **Google**: Gemini 1.5 Pro, Gemini 1.5 Flash
- **Meta**: Llama 3.1, Llama 3.2
- **Mistral**: Mistral Large, Mixtral

## Authentication

Authentication with Kilo Gateway is required to use any models.

### Device Authorization Flow

1. Run `opencode auth login`
2. Select "Other" → type "kilo"
3. Choose "Kilo Gateway (Device Authorization)"
4. Open the URL in your browser
5. Authorize the application
6. Return to OpenCode

### API Key Authentication

1. Run `opencode auth login`
2. Select "Other" → type "kilo"
3. Choose "Kilo Gateway (API Key)"
4. Enter your Kilo API key

## Usage

### Command Line

```bash
opencode run "Hello" --model=kilo/kilo/auto
opencode run "Write a function" --model=kilo/z-ai/glm-5:free
```

### In OpenCode TUI

1. Start OpenCode: `opencode`
2. Select "Connect provider" → "kilo"
3. Authenticate with Device OAuth or API Key
4. Select a model and start chatting

## Troubleshooting

### "kilo provider not found"

Make sure the plugin is installed:
```json
{ "plugin": ["opencode-kilo-auth@latest"] }
```

### "No models available"

Add model definitions to your `opencode.json` (see Installation above).

### "Authentication failed"

1. Try the API Key method instead of Device Authorization
2. Check your network connection
3. Verify your Kilo Gateway account is active at [kilo.ai](https://kilo.ai)

## Development

```bash
bun install
bun run typecheck
bun run build
bun run fetch-models  # Update models.json from Kilo API
```

## Links

- **Kilo Gateway**: [kilo.ai](https://kilo.ai) - Get your Kilo account and API keys
- **OpenCode**: [github.com/anomalyco/opencode](https://github.com/anomalyco/opencode) - The AI coding assistant
- **npm Package**: [npmjs.com/package/opencode-kilo-auth](https://www.npmjs.com/package/opencode-kilo-auth)

## License

MIT - See [LICENSE](https://github.com/JungHoonGhae/opencode-kilo-auth/blob/main/LICENSE) for details.

## Contributing

Contributions are welcome! Feel free to submit a Pull Request at [github.com/JungHoonGhae/opencode-kilo-auth](https://github.com/JungHoonGhae/opencode-kilo-auth).

## Legal Notice

This project is provided "as is" without warranty of any kind. The use of Kilo Gateway API is subject to Kilo.ai's terms of service. Users are responsible for complying with all applicable terms and conditions when using this plugin.
