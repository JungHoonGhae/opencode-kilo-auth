import type { PollOptions, PollResult } from "./types.js"

export async function poll<T>(options: PollOptions<T>): Promise<T> {
  const { interval, maxAttempts, pollFn } = options

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const result = await pollFn()

    if (!result.continue) {
      if (result.error) {
        throw result.error
      }
      return result.data as T
    }

    await new Promise((resolve) => setTimeout(resolve, interval))
  }

  throw new Error("Polling timed out")
}

export function formatTimeRemaining(startTime: number, expiresInSeconds: number): string {
  const elapsed = (Date.now() - startTime) / 1000
  const remaining = Math.max(0, expiresInSeconds - elapsed)
  const minutes = Math.floor(remaining / 60)
  const seconds = Math.floor(remaining % 60)
  return `${minutes}:${String(seconds).padStart(2, "0")}`
}
