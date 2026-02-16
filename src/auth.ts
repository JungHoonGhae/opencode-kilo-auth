import open from "open"
import type { DeviceAuthInitiateResponse, DeviceAuthPollResponse } from "./types.js"
import { poll } from "./polling.js"
import { KILO_API_BASE, POLL_INTERVAL_MS } from "./constants.js"
import type { AuthOuathResult } from "@opencode-ai/plugin"

async function initiateDeviceAuth(): Promise<DeviceAuthInitiateResponse> {
  const response = await fetch(`${KILO_API_BASE}/api/device-auth/codes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Too many pending authorization requests. Please try again later.")
    }
    throw new Error(`Failed to initiate device authorization: ${response.status}`)
  }

  const data = await response.json()
  return data as DeviceAuthInitiateResponse
}

async function pollDeviceAuth(code: string): Promise<DeviceAuthPollResponse> {
  const response = await fetch(`${KILO_API_BASE}/api/device-auth/codes/${code}`)

  if (response.status === 202) {
    return { status: "pending" }
  }

  if (response.status === 403) {
    return { status: "denied" }
  }

  if (response.status === 410) {
    return { status: "expired" }
  }

  if (!response.ok) {
    throw new Error(`Failed to poll device authorization: ${response.status}`)
  }

  const data = await response.json()
  return data as DeviceAuthPollResponse
}

export async function authenticateWithDeviceAuthTUI(inputs?: Record<string, string>): Promise<AuthOuathResult> {
  const authData = await initiateDeviceAuth()
  const { code, verificationUrl, expiresIn } = authData

  await open(verificationUrl).catch(() => {})

  return {
    url: verificationUrl,
    instructions: `Open ${verificationUrl} and enter code: ${code}`,
    method: "auto",
    async callback() {
      const maxAttempts = Math.ceil((expiresIn * 1000) / POLL_INTERVAL_MS)

      const result = await poll<DeviceAuthPollResponse>({
        interval: POLL_INTERVAL_MS,
        maxAttempts,
        pollFn: async () => {
          const pollResult = await pollDeviceAuth(code)

          if (pollResult.status === "approved") {
            return {
              continue: false,
              data: pollResult,
            }
          }

          if (pollResult.status === "denied") {
            return {
              continue: false,
              error: new Error("Authorization denied by user"),
            }
          }

          if (pollResult.status === "expired") {
            return {
              continue: false,
              error: new Error("Authorization code expired"),
            }
          }

          return {
            continue: true,
          }
        },
      })

      if (!result.token) {
        return { type: "failed" }
      }

      return {
        type: "success",
        provider: "kilo",
        refresh: result.token,
        access: result.token,
        expires: Date.now() + 365 * 24 * 60 * 60 * 1000,
      }
    },
  }
}
