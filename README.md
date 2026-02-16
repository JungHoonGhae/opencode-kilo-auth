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

### Kilo Auto Routing

`kilo/auto` automatically routes your request to the best model for the task. This is the recommended model for general use.

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
        },
        "z-ai/glm-5:free": {
          "id": "z-ai/glm-5:free",
          "name": "GLM 5 (Free)",
          "release_date": "2025-01-01",
          "attachment": false,
          "reasoning": true,
          "temperature": true,
          "tool_call": true,
          "limit": { "context": 202800, "output": 131072 }
        }
      }
    }
  }
}
```

## Model Configuration Schema

Each model in `provider.kilo.models` follows this schema:

```json
{
  "id": "provider/model-name",
  "name": "Display Name",
  "release_date": "2025-01-01",
  "attachment": false,
  "reasoning": true,
  "temperature": true,
  "tool_call": true,
  "limit": {
    "context": 128000,
    "output": 4096
  }
}
```

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
| `kilo/auto` | Auto-routes to best model | 200K | Vision, Reasoning, Tools |
| `z-ai/glm-5:free` | GLM 5 free tier | 202K | Reasoning, Tools |
| `minimax/minimax-m2.5:free` | MiniMax M2.5 free tier | 204K | Reasoning, Tools |
| `deepseek/deepseek-r1-0528:free` | DeepSeek R1 free tier | 163K | Reasoning |
| `meta-llama/llama-3.3-70b-instruct:free` | Llama 3.3 70B free | 128K | Tools |

### Free Tier Models (29 models)

All free tier models end with `:free` suffix. Example free models:
- `z-ai/glm-5:free` - GLM 5 (128K context, reasoning)
- `minimax/minimax-m2.5:free` - MiniMax M2.5 (204K context, reasoning)
- `deepseek/deepseek-r1-0528:free` - DeepSeek R1 (163K context, reasoning)
- `meta-llama/llama-3.3-70b-instruct:free` - Llama 3.3 70B (128K context)
- `google/gemma-3-27b-it:free` - Gemma 3 27B (131K context, vision)

### Premium Models (313 models)

Premium models from all major providers:
- **Anthropic**: Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku
- **OpenAI**: GPT-4o, GPT-4 Turbo, GPT-3.5 Turbo
- **Google**: Gemini 1.5 Pro, Gemini 1.5 Flash
- **Meta**: Llama 3.1, Llama 3.2
- **Mistral**: Mistral Large, Mixtral

## How to Find Model Info

1. Check [models.json](./models.json) for all available models
2. Find the model you want (e.g., `z-ai/glm-5:free`)
3. Copy the model info from `models` object
4. Add to your `opencode.json` under `provider.kilo.models`

Example - copying from models.json:

```json
// In models.json
"z-ai/glm-5:free": {
  "name": "Z.ai: GLM 5 (free)",
  "family": "glm",
  "attachment": false,
  "reasoning": true,
  "temperature": true,
  "tool_call": true,
  "limit": { "context": 202800, "output": 131072 }
}

// Transform to opencode.json format (add id, name, release_date)
"z-ai/glm-5:free": {
  "id": "z-ai/glm-5:free",
  "name": "GLM 5 (Free)",
  "release_date": "2025-01-01",
  "attachment": false,
  "reasoning": true,
  "temperature": true,
  "tool_call": true,
  "limit": { "context": 202800, "output": 131072 }
}
```

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
opencode run "Hello, how are you?" --model=kilo/kilo/auto
opencode run "Hello" --model=kilo/z-ai/glm-5:free
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
bun run fetch-models  # Update models.json
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
