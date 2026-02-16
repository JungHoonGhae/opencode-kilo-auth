# Kilo Gateway Plugin for OpenCode

[![npm version](https://img.shields.io/npm/v/opencode-kilo-gateway.svg)](https://www.npmjs.com/package/opencode-kilo-gateway)
[![npm downloads](https://img.shields.io/npm/dw/opencode-kilo-gateway.svg)](https://www.npmjs.com/package/opencode-kilo-gateway)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Access **free AI models** through Kilo Gateway in OpenCode. No API key required for free tier models like `z-ai/glm-5:free` and `minimax/minimax-m2.5:free`.

## Features

- **Free Models** - Access free models without any API key
- **341+ Models** - Full access to OpenRouter models when authenticated
- **Device Authorization** - OAuth-like flow for Kilo Gateway authentication
- **API Key Support** - Direct API key authentication
- **Easy Setup** - Simple plugin configuration

## Installation

### Option A: Quick Setup

Add to your `~/.config/opencode/opencode.json`:

```json
{
  "plugin": ["opencode-kilo-gateway@latest"]
}
```

### Option B: Manual Configuration

Add the plugin and provider configuration:

```json
{
  "plugin": ["opencode-kilo-gateway@latest"],
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

### Free Models (No Auth Required)

Free models work immediately without authentication. Just configure and use.

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

### Free Tier (No Authentication)

| Model | Description |
|-------|-------------|
| `z-ai/glm-5:free` | GLM-5 free model |
| `minimax/minimax-m2.5:free` | MiniMax M2.5 free model |

### Authenticated (Full Access)

With Kilo Gateway authentication, you get access to 341+ models including:

- **Anthropic**: Claude 3.5 Sonnet, Claude 3 Opus, etc.
- **OpenAI**: GPT-4o, GPT-4 Turbo, etc.
- **Google**: Gemini 1.5 Pro, Gemini 1.5 Flash, etc.
- **Meta**: Llama 3.1, Llama 3.2, etc.
- **And many more** via OpenRouter

## Usage

### Command Line

```bash
opencode run "Hello, how are you?" --model=kilo/z-ai/glm-5:free
```

### In OpenCode TUI

1. Start OpenCode: `opencode`
2. Select "Connect provider" → "kilo"
3. Choose your authentication method
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
{ "plugin": ["opencode-kilo-gateway@latest"] }
```

### "No models available"

Add model definitions to your `opencode.json` (see Configuration above).

### "Authentication failed"

1. Try the API Key method instead of Device Authorization
2. Check your network connection
3. Verify your Kilo Gateway account is active

## Development

```bash
# Install dependencies
bun install

# Type check
bun run typecheck

# Build
bun run build
```

## Links

- [Kilo Gateway](https://kilo.ai)
- [OpenCode](https://github.com/anomalyco/opencode)
- [OpenRouter](https://openrouter.ai)

## License

MIT - See [LICENSE](LICENSE) for details.
