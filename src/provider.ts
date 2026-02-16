import { createOpenRouter, type OpenRouterProvider } from "@openrouter/ai-sdk-provider"
import type { KiloProviderOptions } from "./types.js"
import { KILO_API_BASE, ANONYMOUS_API_KEY } from "./constants.js"

export function getKiloUrlFromToken(defaultUrl: string, token: string): string {
  if (!token) return defaultUrl

  try {
    const parts = token.split(":")
    if (parts.length > 1 && parts[0].startsWith("http")) {
      return parts[0]
    }
  } catch (e) {}

  return defaultUrl
}

export function isValidKiloToken(token: string): boolean {
  if (!token || typeof token !== "string") return false
  return token.length > 10
}

export function getApiKey(options: { kiloToken?: string; apiKey?: string }): string | undefined {
  return options.kiloToken ?? options.apiKey
}

export function createKilo(options: KiloProviderOptions = {}): OpenRouterProvider {
  const apiKey = getApiKey(options)

  const baseApiUrl = getKiloUrlFromToken(options.baseURL ?? KILO_API_BASE, apiKey ?? "")

  const openRouterUrl = baseApiUrl.includes("/openrouter")
    ? baseApiUrl
    : baseApiUrl.endsWith("/")
      ? `${baseApiUrl}openrouter/`
      : `${baseApiUrl}/openrouter/`

  const customHeaders = {
    "User-Agent": "opencode-kilo-gateway",
    "Content-Type": "application/json",
    "X-KILO-EDITORNAME": "OpenCode",
    ...(options.kiloOrganizationId ? { "X-KILO-ORGANIZATIONID": options.kiloOrganizationId } : {}),
    ...options.headers,
  }

  const originalFetch = options.fetch ?? fetch
  const wrappedFetch = async (input: string | URL | Request, init?: RequestInit) => {
    const headers = new Headers(init?.headers)

    Object.entries(customHeaders).forEach(([key, value]) => {
      headers.set(key, value)
    })

    if (apiKey) {
      headers.set("Authorization", `Bearer ${apiKey}`)
    }

    return originalFetch(input, {
      ...init,
      headers,
    })
  }

  return createOpenRouter({
    baseURL: openRouterUrl,
    apiKey: apiKey ?? ANONYMOUS_API_KEY,
    headers: customHeaders,
    fetch: wrappedFetch as typeof fetch,
  })
}
