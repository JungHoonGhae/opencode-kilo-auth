import { writeFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const KILO_OPENROUTER_BASE = "https://api.kilo.ai/api/openrouter"
const MODELS_FETCH_TIMEOUT_MS = 30000

interface OpenRouterModel {
  id: string
  name: string
  description?: string
  context_length: number
  max_completion_tokens?: number | null
  pricing?: {
    prompt?: string | null
    completion?: string | null
    input_cache_write?: string | null
    input_cache_read?: string | null
  }
  architecture?: {
    input_modalities?: string[] | null
    output_modalities?: string[] | null
    tokenizer?: string | null
  }
  top_provider?: { max_completion_tokens?: number | null }
  supported_parameters?: string[]
}

interface OpenRouterModelsResponse {
  data: OpenRouterModel[]
}

function parseApiPrice(price: string | null | undefined): number | undefined {
  if (!price) return undefined
  const parsed = parseFloat(price)
  return isNaN(parsed) ? undefined : parsed
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
  if (modelName.includes("deepseek")) return "deepseek"
  if (modelName.includes("qwen")) return "qwen"
  if (modelName.includes("glm")) return "glm"
  if (modelName.includes("minimax")) return "minimax"
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
  if (!result.includes("text")) result.unshift("text")
  return result
}

function transformToOpenCodeFormat(model: OpenRouterModel) {
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
    name: model.name,
    family: model.id === "kilo/auto" ? "kilo/auto" : extractFamily(model.id),
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
    ...(model.description && { description: model.description }),
  }
}

async function fetchModels() {
  console.log("Fetching models from Kilo Gateway...")

  const response = await fetch(`${KILO_OPENROUTER_BASE}/models`, {
    headers: {
      "User-Agent": "opencode-kilo-auth",
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(MODELS_FETCH_TIMEOUT_MS),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch models: ${response.status} ${response.statusText}`)
  }

  const json: OpenRouterModelsResponse = await response.json()

  const models: Record<string, ReturnType<typeof transformToOpenCodeFormat>> = {}
  const freeModels: string[] = []
  const premiumModels: string[] = []

  for (const model of json.data) {
    if (model.architecture?.output_modalities?.includes("image")) {
      continue
    }

    models[model.id] = transformToOpenCodeFormat(model)

    if (model.id.includes(":free")) {
      freeModels.push(model.id)
    } else {
      premiumModels.push(model.id)
    }
  }

  const result = {
    lastUpdated: new Date().toISOString(),
    totalModels: Object.keys(models).length,
    freeModelsCount: freeModels.length,
    premiumModelsCount: premiumModels.length,
    freeModels,
    premiumModels,
    models,
  }

  const __dirname = dirname(fileURLToPath(import.meta.url))
  const outputPath = join(__dirname, "..", "models.json")

  writeFileSync(outputPath, JSON.stringify(result, null, 2))

  console.log(`✅ Fetched ${result.totalModels} models`)
  console.log(`   Free models: ${result.freeModelsCount}`)
  console.log(`   Premium models: ${result.premiumModelsCount}`)
  console.log(`   Saved to: ${outputPath}`)
}

fetchModels().catch(console.error)
