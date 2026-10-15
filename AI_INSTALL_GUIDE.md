# AI Installation Guide for opencode-kilo-auth

This guide helps AI assistants quickly configure Kilo Gateway models in a user's OpenCode configuration.

## Quick Setup Prompts

Copy and paste one of these prompts to your AI assistant:

### Option 1: Free Models Only (Recommended for beginners)

```
Install opencode-kilo-auth plugin and add all 9 free tier models from Kilo Gateway to my opencode.json. The models.json file is at: https://raw.githubusercontent.com/JungHoonGhae/opencode-kilo-auth/main/models.json

Filter for models ending with ":free" and add them to ~/.config/opencode/opencode.json under provider.kilo.models
```

### Option 2: Recommended Models Only

```
Install opencode-kilo-auth plugin and add these recommended models to my opencode.json:

1. kilo-auto/balanced - Auto-routing, balance of price and capability
2. anthropic/claude-opus-4.6 - Anthropic Opus 4.6, 1M context, frontier coding
3. openai/gpt-5.6-terra - OpenAI GPT-5.6 Terra, 1M context, everyday coding
4. z-ai/glm-5.2 - Z.ai GLM 5.2, 1M context, long-horizon agent workflows
5. moonshotai/kimi-k2.7-code - MoonshotAI Kimi K2.7 Code, 256K, coding-focused
6. minimax/minimax-m3 - MiniMax M3, 1M context, agentic coding
7. deepseek/deepseek-v4-pro - DeepSeek V4 Pro, 1M context, advanced reasoning

Get model details from: https://raw.githubusercontent.com/JungHoonGhae/opencode-kilo-auth/main/models.json
Add to ~/.config/opencode/opencode.json
```

### Option 3: Full Setup (All 330+ Models)

```
Install opencode-kilo-auth plugin and add ALL available models from Kilo Gateway to my opencode.json.

The models.json file is at: https://raw.githubusercontent.com/JungHoonGhae/opencode-kilo-auth/main/models.json

Add all models to ~/.config/opencode/opencode.json under provider.kilo.models
```

### Option 4: Custom Selection

```
Install opencode-kilo-auth plugin and add these specific Kilo Gateway models to my opencode.json:

[List your desired model IDs here, e.g., kilo-auto/balanced, poolside/laguna-m.1:free]

Get model details from: https://raw.githubusercontent.com/JungHoonGhae/opencode-kilo-auth/main/models.json
```

## Configuration Template

The AI should update `~/.config/opencode/opencode.json`:

```json
{
  "plugin": ["opencode-kilo-auth@latest"],
  "provider": {
    "kilo": {
      "name": "Kilo Gateway",
      "models": {
        // Models go here - copy from models.json
      }
    }
  }
}
```

## Model Schema

Each model in models.json follows this schema (already compatible with opencode.json):

```json
{
  "id": "provider/model-name",
  "name": "Display Name",
  "release_date": "2026-02-16",
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

## Free Models List (9 models)

For quick reference, these are the free tier models:

- `kilo-auto/free`
- `tencent/hy3:free` — 295B MoE, 256K context
- `stepfun/step-3.7-flash:free` — StepFun 3.7 Flash, 256K context, multimodal
- `poolside/laguna-m.1:free` — Poolside flagship coding agent, 256K
- `poolside/laguna-xs-2.1:free` — Poolside smaller coding agent, 256K
- `cohere/north-mini-code:free` — Cohere's first agentic coding model, 256K
- `nvidia/nemotron-3-ultra-550b-a55b:free` — 1M context, reasoning
- `nvidia/nemotron-3-super-120b-a12b:free` — 1M context, hybrid MoE
- `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free` — multimodal reasoning, 256K
- `nvidia/nemotron-3.5-content-safety:free` — guardrail model, 128K

## Post-Installation

After configuration, authenticate with Kilo Gateway:

```bash
opencode auth login
# Select "Other" → type "kilo"
# Choose authentication method
```
