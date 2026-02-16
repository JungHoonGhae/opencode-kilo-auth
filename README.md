# Kilo Auth Plugin for OpenCode

[![npm version](https://img.shields.io/npm/v/opencode-kilo-auth.svg)](https://www.npmjs.com/package/opencode-kilo-auth)
[![npm downloads](https://img.shields.io/npm/dw/opencode-kilo-auth.svg)](https://www.npmjs.com/package/opencode-kilo-auth)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/JungHoonGhae/opencode-kilo-auth/blob/main/LICENSE)

Access AI models through **Kilo Gateway** in OpenCode, including free models like `z-ai/glm-5:free` and `minimax/minimax-m2.5:free`.

> **Disclaimer**: This is an independent community plugin. It is not affiliated with, endorsed by, or sponsored by Kilo.ai or OpenCode. Kilo™ and OpenCode™ are trademarks of their respective owners.

## What is Kilo Gateway?

**Kilo Gateway** is a unified API gateway that provides access to multiple AI model providers through a single interface. It uses an OpenRouter-compatible API, making it easy to switch between different AI models.

### Kilo Gateway vs OpenRouter

| Feature | Kilo Gateway | OpenRouter |
|---------|--------------|------------|
| **Free Models** | ✅ Free tier models available (requires auth) | ❌ Most models require payment |
| **Authentication** | Device OAuth + API Key | API Key only |
| **API Endpoint** | `api.kilo.ai` | `openrouter.ai` |
| **Pricing** | Free tier + paid models | Pay-per-use |

**Key Difference**: Kilo Gateway offers **free tier models** that you can use at no cost after authentication, while OpenRouter requires payment for most models.

### Why Use This Plugin?

- **Free Tier Models** - Use `z-ai/glm-5:free`, `minimax/minimax-m2.5:free` at no cost after authenticating
- **Simple Auth** - Device OAuth flow or API key authentication
- **341+ Models** - Access to Claude, GPT, Gemini, Llama, and more through Kilo Gateway

## Installation

Add the following to your `~/.config/opencode/opencode.json`:

```json
{
  "plugin": ["opencode-kilo-auth@latest"],
  "provider": {
    "kilo": {
      "name": "Kilo Gateway",
      "models": {
        "z-ai/glm-5:free": {
          "name": "GLM-5 Free",
          "limit": { "context": 128000, "output": 4096 },
          "modalities": { "input": ["text"], "output": ["text"] }
        },
        "minimax/minimax-m2.5:free": {
          "name": "MiniMax M2.5 Free",
          "limit": { "context": 128000, "output": 4096 },
          "modalities": { "input": ["text"], "output": ["text"] }
        }
      }
    }
  }
}
```

## Authentication

Authentication with Kilo Gateway is required to use any models, including free tier models.

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

## Available Models

### Free Tier (No Cost After Auth)

| Model | Description | Context |
|-------|-------------|---------|
| `z-ai/glm-5:free` | GLM-5 free tier model | 128K |
| `minimax/minimax-m2.5:free` | MiniMax M2.5 free tier model | 128K |

### Paid Models (341+ Available)

With Kilo Gateway authentication, you also get access to:

- **Anthropic**: Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku
- **OpenAI**: GPT-4o, GPT-4 Turbo, GPT-3.5 Turbo
- **Google**: Gemini 1.5 Pro, Gemini 1.5 Flash
- **Meta**: Llama 3.1, Llama 3.2
- **Mistral**: Mistral Large, Mixtral
- **And many more...**

## Usage

### Command Line

```bash
opencode run "Hello, how are you?" --model=kilo/z-ai/glm-5:free
```

### In OpenCode TUI

1. Start OpenCode: `opencode`
2. Select "Connect provider" → "kilo"
3. Authenticate with Device OAuth or API Key
4. Select a model and start chatting

## Configuration

### Environment Variables

| Variable | Description |
|----------|-------------|
| `KILO_API_URL` | Override default API URL (default: `https://api.kilo.ai`) |
| `KILO_API_KEY` | Pre-set API key for authentication |

### Provider Configuration

Add models to your `opencode.json`:

```json
{
  "provider": {
    "kilo": {
      "name": "Kilo Gateway",
      "models": {
        "z-ai/glm-5:free": {
          "name": "GLM-5 Free",
          "limit": { "context": 128000, "output": 4096 }
        }
      }
    }
  }
}
```

## How It Works

1. **Plugin Registration** - Registers `kilo` provider with OpenCode
2. **Auth Hook** - Intercepts authentication requests for `kilo` provider
3. **Device Flow** - OAuth-like device authorization for Kilo Gateway
4. **API Proxy** - Routes requests through Kilo Gateway's OpenRouter-compatible API

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
```

## Links

- **Kilo Gateway**: [kilo.ai](https://kilo.ai) - Get your Kilo account and API keys
- **OpenCode**: [github.com/anomalyco/opencode](https://github.com/anomalyco/opencode) - The AI coding assistant
- **OpenRouter**: [openrouter.ai](https://openrouter.ai) - Model provider (Kilo uses OpenRouter-compatible API)
- **npm Package**: [npmjs.com/package/opencode-kilo-auth](https://www.npmjs.com/package/opencode-kilo-auth)

## License

MIT - See [LICENSE](https://github.com/JungHoonGhae/opencode-kilo-auth/blob/main/LICENSE) for details.

## Contributing

Contributions are welcome! Feel free to submit a Pull Request at [github.com/JungHoonGhae/opencode-kilo-auth](https://github.com/JungHoonGhae/opencode-kilo-auth).

## Legal Notice

This project is provided "as is" without warranty of any kind. The use of Kilo Gateway API is subject to Kilo.ai's terms of service. Users are responsible for complying with all applicable terms and conditions when using this plugin.
