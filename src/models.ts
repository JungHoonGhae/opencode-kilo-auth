import { z } from "zod"
import { getKiloUrlFromToken } from "./provider.js"
import { KILO_API_BASE, KILO_OPENROUTER_BASE, MODELS_FETCH_TIMEOUT_MS } from "./constants.js"

const openRouterArchitectureSchema = z.object({
  input_modalities: z.array(z.string()).nullish(),
  output_modalities: z.array(z.string()).nullish(),
  tokenizer: z.string().nullish(),
})

const openRouterPricingSchema = z.object({
  prompt: z.string().nullish(),
  completion: z.string().nullish(),
  input_cache_write: z.string().nullish(),
  input_cache_read: z.string().nullish(),
})

const openRouterModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  context_length: z.number(),
  max_completion_tokens: z.number().nullish(),
  pricing: openRouterPricingSchema.optional(),
  architecture: openRouterArchitectureSchema.optional(),
  top_provider: z.object({ max_completion_tokens: z.number().nullish() }).optional(),
  supported_parameters: z.array(z.string()).optional(),
})

const openRouterModelsResponseSchema = z.object({
  data: z.array(openRouterModelSchema),
})

type OpenRouterModel = z.infer<typeof openRouterModelSchema>

function parseApiPrice(price: string | null | undefined): number | undefined {
  if (!price) return undefined
  const parsed = parseFloat(price)
  return isNaN(parsed) ? undefined : parsed
}

export async function fetchKiloModels(options?: {
  kiloToken?: string
  kiloOrganizationId?: string
  baseURL?: string
}): Promise<Record<string, any>> {
  const token = options?.kiloToken
  const organizationId = options?.kiloOrganizationId

  const defaultBaseURL = organizationId ? `${KILO_API_BASE}/api/organizations/${organizationId}` : KILO_OPENROUTER_BASE
  const baseURL = options?.baseURL ?? defaultBaseURL
  const finalBaseURL = token ? getKiloUrlFromToken(baseURL, token) : baseURL
  const modelsURL = `${finalBaseURL}/models`

  try {
    const response = await fetch(modelsURL, {
      headers: {
        "User-Agent": "opencode-kilo-gateway",
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      signal: AbortSignal.timeout(MODELS_FETCH_TIMEOUT_MS),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.status} ${response.statusText}`)
    }

    const json = await response.json()
    const result = openRouterModelsResponseSchema.safeParse(json)

    if (!result.success) {
      console.error("Kilo models response validation failed:", result.error.format())
      return {}
    }

    const models: Record<string, any> = {}

    for (const model of result.data.data) {
      if (model.architecture?.output_modalities?.includes("image")) {
        continue
      }

      const transformedModel = transformToModelDevFormat(model)
      models[model.id] = transformedModel
    }

    return models
  } catch (error) {
    console.error("Error fetching Kilo models:", error)
    return {}
  }
}

function transformToModelDevFormat(model: OpenRouterModel): any {
  const inputModalities = model.architecture?.input_modalities || []
  const outputModalities = model.architecture?.output_modalities || []
  const supportedParameters = model.supported_parameters || []

  const inputPrice = parseApiPrice(model.pricing?.prompt)
  const outputPrice = parseApiPrice(model.pricing?.completion)
  const cacheWritePrice = parseApiPrice(model.pricing?.input_cache_write)
  const cacheReadPrice = parseApiPrice(model.pricing?.input_cache_read)

  const supportsImages = inputModalities.includes("image")
  const supportsTools = supportedParameters.includes("tools")
  const supportsReasoning = supportedParameters.includes("reasoning")
  const supportsTemperature = supportedParameters.includes("temperature")

  const maxOutputTokens =
    model.top_provider?.max_completion_tokens || model.max_completion_tokens || Math.ceil(model.context_length * 0.2)

  return {
    id: model.id,
    name: model.name,
    family: model.id === "kilo/auto" ? "kilo/auto" : extractFamily(model.id),
    release_date: new Date().toISOString().split("T")[0],
    attachment: supportsImages,
    reasoning: supportsReasoning,
    temperature: supportsTemperature,
    tool_call: supportsTools,
    ...(inputPrice !== undefined &&
      outputPrice !== undefined && {
        cost: {
          input: inputPrice,
          output: outputPrice,
          ...(cacheReadPrice !== undefined && { cache_read: cacheReadPrice }),
          ...(cacheWritePrice !== undefined && { cache_write: cacheWritePrice }),
        },
      }),
    limit: {
      context: model.context_length,
      output: maxOutputTokens,
    },
    ...((inputModalities.length > 0 || outputModalities.length > 0) && {
      modalities: {
        input: mapModalities(inputModalities),
        output: mapModalities(outputModalities),
      },
    }),
    options: {
      ...(model.description && { description: model.description }),
    },
  }
}

function extractFamily(modelId: string): string | undefined {
  const parts = modelId.split("/")
  if (parts.length < 2) return undefined

  const modelName = parts[1]

  if (modelName.includes("claude")) return "claude"
  if (modelName.includes("gpt")) return "gpt"
  if (modelName.includes("gemini")) return "gemini"
  if (modelName.includes("llama")) return "llama"
  if (modelName.includes("mistral")) return "mistral"

  return undefined
}

function mapModalities(modalities: string[]): Array<"text" | "audio" | "image" | "video" | "pdf"> {
  const result: Array<"text" | "audio" | "image" | "video" | "pdf"> = []

  for (const modality of modalities) {
    if (modality === "text") result.push("text")
    if (modality === "image") result.push("image")
    if (modality === "audio") result.push("audio")
    if (modality === "video") result.push("video")
    if (modality === "pdf") result.push("pdf")
  }

  if (!result.includes("text")) {
    result.unshift("text")
  }

  return result
}
