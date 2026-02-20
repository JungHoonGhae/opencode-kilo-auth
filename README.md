# Kilo Auth Plugin for OpenCode

[![skills.sh](https://skills-badge.vercel.app/badge/JungHoonGhae/opencode-kilo-auth?style=flat-square&label=installs)](https://skills.sh/JungHoonGhae/opencode-kilo-auth)
[![npm version](https://img.shields.io/npm/v/opencode-kilo-auth.svg)](https://www.npmjs.com/package/opencode-kilo-auth)
[![npm downloads](https://img.shields.io/npm/dw/opencode-kilo-auth.svg)](https://www.npmjs.com/package/opencode-kilo-auth)
[![GitHub stars](https://img.shields.io/github/stars/JungHoonGhae/opencode-kilo-auth)](https://github.com/JungHoonGhae/opencode-kilo-auth/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/JungHoonGhae/opencode-kilo-auth/blob/main/LICENSE)

| [<img alt="GitHub Follow" src="https://img.shields.io/github/followers/JungHoonGhae?style=flat-square&logo=github&labelColor=black&color=24292f" width="156px" />](https://github.com/JungHoonGhae) | Follow [@JungHoonGhae](https://github.com/JungHoonGhae) on GitHub for more projects. |
| :-----| :----- |
| [<img alt="X link" src="https://img.shields.io/badge/Follow-%40lucas_ghae-000000?style=flat-square&logo=x&labelColor=black" width="156px" />](https://x.com/lucas_ghae) | Follow [@lucas_ghae](https://x.com/lucas_ghae) on X for updates. |

**Use Kilo Gateway with your existing OpenCode installation - no need to install Kilo CLI fork.**

> **Disclaimer**: This is an independent community plugin. It is not affiliated with, endorsed by, or sponsored by Kilo.ai or OpenCode. Kilo™ and OpenCode™ are trademarks of their respective owners.

## About

Kilo Gateway offers 342+ AI models including 29 free tier models. But using it from CLI required installing a separate Kilo CLI fork. This plugin lets you use Kilo Gateway directly in your existing OpenCode installation.

**What it does:**
- Adds Kilo Gateway as an OpenCode provider
- Access 342+ models including free tier options
- Simple npm plugin installation
- No separate CLI needed

## Support

If this plugin helps you, consider supporting its maintenance:

<a href="https://www.buymeacoffee.com/lucas.ghae">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50">
</a>

## Features

- 🆓 **Free models** — 29 free tier models available
- 🔌 **Easy install** — Just add to OpenCode config
- 📦 **342+ models** — Full Kilo Gateway access
- ⚡ **No fork needed** — Keep using OpenCode

## Requirements

| Requirement | Version |
|-------------|---------|
| OpenCode | Any recent version |
| Node.js | >= 16 |

## Installation

Add to your `~/.config/opencode/opencode.json`:

```json
{
  "plugin": ["opencode-kilo-auth@latest"]
}
```

OpenCode will automatically install the plugin from npm on next startup.

## Documentation

| Resource | Link |
|----------|------|
| npm Package | [npmjs.com/package/opencode-kilo-auth](https://www.npmjs.com/package/opencode-kilo-auth) |
| GitHub | [github.com/JungHoonGhae/opencode-kilo-auth](https://github.com/JungHoonGhae/opencode-kilo-auth) |
| Kilo Gateway | [kilo.ai](https://kilo.ai) |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT - See [LICENSE](https://github.com/JungHoonGhae/opencode-kilo-auth/blob/main/LICENSE) for details.
