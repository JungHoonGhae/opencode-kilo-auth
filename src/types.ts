import type { LanguageModelV2, OpenRouterProvider } from "@openrouter/ai-sdk-provider"

export interface DeviceAuthInitiateResponse {
  code: string
  verificationUrl: string
  expiresIn: number
}

export interface DeviceAuthPollResponse {
  status: "pending" | "approved" | "denied" | "expired"
  token?: string
  userEmail?: string
}

export interface Organization {
  id: string
  name: string
  role: string
}

export interface KiloProfile {
  email: string
  name?: string
  organizations?: Organization[]
}

export interface KiloBalance {
  balance: number
}

export interface PollOptions<T> {
  interval: number
  maxAttempts: number
  pollFn: () => Promise<PollResult<T>>
}

export interface PollResult<T> {
  continue: boolean
  data?: T
  error?: Error
}

export interface KiloProviderOptions {
  kiloToken?: string
  kiloOrganizationId?: string
  kiloModel?: string
  openRouterSpecificProvider?: string
  baseURL?: string
  headers?: Record<string, string>
  apiKey?: string
  name?: string
  fetch?: typeof fetch
  timeout?: number | false
}

export interface KiloMetadata {
  taskId?: string
  projectId?: string
  mode?: string
}

export interface CustomLoaderResult {
  autoload: boolean
  getModel?: (sdk: OpenRouterProvider, modelID: string, options?: Record<string, any>) => Promise<LanguageModelV2>
  options?: Record<string, any>
}

export interface ProviderInfo {
  id: string
  name: string
  source: "env" | "config" | "custom" | "api"
  env: string[]
  key?: string
  options: Record<string, any>
  models: Record<string, any>
}

export type { LanguageModelV2 }
