# AI Installation Guide for opencode-kilo-auth

This guide helps AI assistants quickly configure Kilo Gateway models in a user's OpenCode configuration.

## Quick Setup Prompts

Copy and paste one of these prompts to your AI assistant:

### Option 1: Free Models Only (Recommended for beginners)

```
Install opencode-kilo-auth plugin and add all 29 free tier models from Kilo Gateway to my opencode.json. The models.json file is at: https://raw.githubusercontent.com/JungHoonGhae/opencode-kilo-auth/main/models.json

Filter for models ending with ":free" and add them to ~/.config/opencode/opencode.json under provider.kilo.models
```

### Option 2: Recommended Models Only

```
Install opencode-kilo-auth plugin and add these recommended models to my opencode.json:

1. kilo/auto - Auto-routing to best model
2. stepfun/step-3.5-flash:free - StepFun 196B MoE, 256K context
3. z-ai/glm-5:free - GLM 5, 202K context, reasoning
4. minimax/minimax-m2.5:free - MiniMax M2.5, 204K context

Get model details from: https://raw.githubusercontent.com/JungHoonGhae/opencode-kilo-auth/main/models.json
Add to ~/.config/opencode/opencode.json
```

### Option 3: Full Setup (All 342 Models)

```
Install opencode-kilo-auth plugin and add ALL available models from Kilo Gateway to my opencode.json.

The models.json file is at: https://raw.githubusercontent.com/JungHoonGhae/opencode-kilo-auth/main/models.json

Add all models to ~/.config/opencode/opencode.json under provider.kilo.models
```

### Option 4: Custom Selection

```
Install opencode-kilo-auth plugin and add these specific Kilo Gateway models to my opencode.json:

[List your desired model IDs here, e.g., kilo/auto, z-ai/glm-5:free]

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

## Free Models List (29 models)

For quick reference, these are the free tier models:

- `kilo/auto`
- `z-ai/glm-5:free`
- `z-ai/glm-4.5-air:free`
- `minimax/minimax-m2.5:free`
- `stepfun/step-3.5-flash:free`
- `arcee-ai/trinity-large-preview:free`
- `arcee-ai/trinity-mini:free`
- `upstage/solar-pro-3:free`
- `liquid/lfm-2.5-1.2b-thinking:free`
- `liquid/lfm-2.5-1.2b-instruct:free`
- `nvidia/nemotron-3-nano-30b-a3b:free`
- `nvidia/nemotron-nano-12b-v2-vl:free`
- `nvidia/nemotron-nano-9b-v2:free`
- `qwen/qwen3-next-80b-a3b-instruct:free`
- `qwen/qwen3-coder:free`
- `qwen/qwen3-4b:free`
- `openai/gpt-oss-120b:free`
- `openai/gpt-oss-20b:free`
- `cognitivecomputations/dolphin-mistral-24b-venice-edition:free`
- `google/gemma-3n-e2b-it:free`
- `google/gemma-3n-e4b-it:free`
- `google/gemma-3-4b-it:free`
- `google/gemma-3-12b-it:free`
- `google/gemma-3-27b-it:free`
- `deepseek/deepseek-r1-0528:free`
- `mistralai/mistral-small-3.1-24b-instruct:free`
- `meta-llama/llama-3.3-70b-instruct:free`
- `meta-llama/llama-3.2-3b-instruct:free`
- `nousresearch/hermes-3-llama-3.1-405b:free`
- `corethink:free`

## Post-Installation

After configuration, authenticate with Kilo Gateway:

```bash
opencode auth login
# Select "Other" → type "kilo"
# Choose authentication method
```
