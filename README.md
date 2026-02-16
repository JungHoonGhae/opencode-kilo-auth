# Kilo Auth Plugin for OpenCode

[![npm version](https://img.shields.io/npm/v/opencode-kilo-auth.svg)](https://www.npmjs.com/package/opencode-kilo-auth)
[![npm downloads](https://img.shields.io/npm/dw/opencode-kilo-auth.svg)](https://www.npmjs.com/package/opencode-kilo-auth)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/JungHoonGhae/opencode-kilo-auth/blob/main/LICENSE)

| [<img alt="GitHub Follow" src="https://img.shields.io/github/followers/JungHoonGhae?style=flat-square&logo=github&labelColor=black&color=24292f" width="156px" />](https://github.com/JungHoonGhae) | Follow [@JungHoonGhae](https://github.com/JungHoonGhae) on GitHub for more projects. |
| :-----| :----- |
| [<img alt="X link" src="https://img.shields.io/badge/Follow-%40lucas_ghae-000000?style=flat-square&logo=x&labelColor=black" width="156px" />](https://x.com/lucas_ghae) | Follow [@lucas_ghae](https://x.com/lucas_ghae) on X for updates. |

**Use Kilo Gateway with your existing OpenCode installation - no need to install Kilo CLI fork.**

> **Disclaimer**: This is an independent community plugin. It is not affiliated with, endorsed by, or sponsored by Kilo.ai or OpenCode. Kilo™ and OpenCode™ are trademarks of their respective owners.

## Support

If this plugin helps you, consider supporting its maintenance:

<a href="https://www.buymeacoffee.com/lucas.ghae">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50">
</a>

## The Problem

Kilo Gateway offers great free tier models, but to use them from CLI you had only one option:

**Install Kilo CLI** - A fork of OpenCode, requiring a separate installation

**Neither is ideal.** You shouldn't need to install a separate fork just to access Kilo Gateway models.

## The Solution

This plugin lets you use **Kilo Gateway directly in your existing OpenCode installation**:

- ✅ Keep using OpenCode (no Kilo CLI needed)
- ✅ Access all Kilo Gateway models (342+ models)
- ✅ Get free tier models not available on OpenRouter (e.g., `z-ai/glm-5:free`)
- ✅ Simple plugin installation - just add to config

### Free Models

Kilo Gateway offers 29 free tier models, including:

- **Step 3.5 Flash (Free)** - StepFun's 196B MoE model with 256K context
- **GLM 5 (Free)** - Z.ai's flagship model with 202K context
- **MiniMax M2.5 (Free)** - 204K context with strong coding abilities
- And 26 more free models...

## Installation

### Step 1: Add Plugin to Config

Open your `~/.config/opencode/opencode.json` and add the plugin:

```json
{
  "plugin": ["opencode-kilo-auth@latest"]
}
```

That's it! OpenCode will automatically install the plugin from npm on next startup.

### Step 2: Add Models

Add the models you want to use:

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

### Quick Setup with AI Assistant

See [AI_INSTALL_GUIDE.md](./AI_INSTALL_GUIDE.md) for prompts you can copy to your AI assistant for quick setup:

- **Free models only** - 29 free tier models
- **Recommended models** - Best models to get started
- **All models** - Full 342 model setup
- **Custom selection** - Pick specific models

### How to Add More Models

1. Open [models.json](./models.json)
2. Find the model you want (e.g., `z-ai/glm-5:free`)
3. Copy the entire model object
4. Paste into your `opencode.json` under `provider.kilo.models`

**That's it!** models.json is already in the correct format - just copy and paste.

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
- `qwen/qwen3-coder:free`, `qwen/qwen3-4b:free`
- And more...

### Premium Models (313 models)

Premium models from all major providers:
- **Anthropic**: Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku
- **OpenAI**: GPT-4o, GPT-4 Turbo, GPT-3.5 Turbo
- **Google**: Gemini 1.5 Pro, Gemini 1.5 Flash
- **Meta**: Llama 3.1, Llama 3.2
- **Mistral**: Mistral Large, Mixtral

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
