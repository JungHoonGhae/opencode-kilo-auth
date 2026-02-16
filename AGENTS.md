# AGENTS.md

Guidance for AI agents working with this repository.

## Overview

OpenCode plugin for Kilo Gateway authentication. Provides device authorization flow and API key authentication for accessing Kilo Gateway's free and paid AI models through OpenCode.

## Build & Test Commands

```bash
bun install                          # Install dependencies
bun run typecheck                    # Type-check only (tsc --noEmit)
bun run build                        # Compile TypeScript
```

## TypeScript Configuration

- `strict: true` enabled
- `target: ESNext`, `module: ESNext`, `moduleResolution: bundler`
- No path aliases — all imports are relative

## Code Style

### Imports
- Use `import type { ... }` for type-only imports
- Named imports preferred
- Relative paths without extensions

### Exports
- Named exports only — no default exports
- Entry point: `src/index.ts`

### Naming
- `camelCase` for functions, variables, parameters
- `PascalCase` for types, interfaces, classes
- `UPPER_SNAKE_CASE` for constants
- `kebab-case` for file names

### Types
- No `I` prefix on interfaces
- Extract to `types.ts` when shared

### Functions
- `export async function` for public APIs
- Arrow functions for callbacks
- Async functions with try/catch for API calls

### Error Handling
- Defensive try/catch with graceful degradation
- Catch `unknown`, log, and convert to domain errors
- Never empty catch blocks

## Module Structure

```
src/
├── index.ts        # Main entry, plugin registration
├── auth.ts         # Device authorization flow
├── provider.ts     # OpenRouter-based Kilo provider
├── models.ts       # Fetch models from Kilo API
├── constants.ts    # API URLs and constants
├── types.ts        # TypeScript interfaces
└── polling.ts      # Polling utility for device flow
```

## Key Design Patterns

### 1. Auth Hook Pattern
Plugin exports auth hook for `kilo` provider. The `loader` function returns provider instance with proper headers and auth.

### 2. Device Authorization Flow
OAuth-like device flow:
1. Request device code from Kilo API
2. Display verification URL to user
3. Poll for token until user authorizes
4. Return auth credentials to OpenCode

### 3. OpenRouter SDK Integration
Uses `@openrouter/ai-sdk-provider` with custom base URL pointing to Kilo Gateway.

## Dependencies

- `@opencode-ai/plugin` — OpenCode plugin interface
- `@openrouter/ai-sdk-provider` — OpenRouter SDK for AI models
- `ai` — Vercel AI SDK
- `open` — Open URLs in browser
- `zod` — Schema validation

## API Endpoints

- Base URL: `https://api.kilo.ai`
- OpenRouter proxy: `https://api.kilo.ai/api/openrouter`
- Device auth: `https://api.kilo.ai/v1/oauth/device/code`
- Token endpoint: `https://api.kilo.ai/v1/oauth/device/token`

## Testing Authentication

```bash
# In OpenCode TUI
# Select "Connect provider" → "kilo"

# Via CLI (workaround)
# Select "Other" → type "kilo"
```

## Documentation

- [README.md](README.md) — Installation & usage
- [CHANGELOG.md](CHANGELOG.md) — Version history