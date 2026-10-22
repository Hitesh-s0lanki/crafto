import { createOpenAICompatible } from "@ai-sdk/openai-compatible"
// import { openrouter } from "@openrouter/ai-sdk-provider"
import type { LanguageModel } from "ai"

import type { GameModelId } from "./model-catalog"

/**
 * The provider instance behind each catalog entry.
 *
 * Server-side only — constructing these reaches for provider API keys, and the
 * provider SDKs have no business in a browser bundle. There is no
 * `server-only` marker enforcing that, though, for the same reason `@/lib/db`
 * keeps its marker in a separate entry: the chat agent imports this module and
 * runs in the Trigger.dev worker, where that marker throws. Reach for the
 * catalog instead of this file from anything a client component can touch.
 *
 * `satisfies` rather than an annotation, so the record has to cover every
 * `GameModelId` — a model added to the catalog and forgotten here is a type
 * error, not an undefined model discovered at the top of someone's turn.
 */
// Modal is disabled; the default GLM model is served by Fireworks.
// Validate on request so missing local credentials do not break builds or
// prevent other providers from being selected. This module also runs in Trigger.
// const modal = createOpenAICompatible({
//   name: "modal",
//   baseURL:
//     "https://hitesh-s0lanki-striq--ep-glm-5-3-flash-server.us-west.modal.direct/v1",
//   includeUsage: true,
//   supportsStructuredOutputs: true,
//   fetch: (url, options) => {
//     const tokenId = process.env.MODAL_PROXY_TOKEN_ID
//     const tokenSecret = process.env.MODAL_PROXY_TOKEN_SECRET
//     if (!tokenId || !tokenSecret) {
//       throw new Error(
//         "Configure MODAL_PROXY_TOKEN_ID and MODAL_PROXY_TOKEN_SECRET to use GLM on Modal."
//       )
//     }
//     const headers = new Headers(options?.headers)
//     headers.set("Authorization", `Bearer ${tokenId}.${tokenSecret}`)
//     return globalThis.fetch(url, { ...options, headers })
//   },
// })

const fireworks = createOpenAICompatible({
  name: "fireworks",
  baseURL: "https://api.fireworks.ai/inference/v1",
  includeUsage: true,
  supportsStructuredOutputs: true,
  fetch: (url, options) => {
    const apiKey = process.env.FIREWORKS_API_KEY
    if (!apiKey) {
      throw new Error("Configure FIREWORKS_API_KEY to use GLM on Fireworks.")
    }
    const headers = new Headers(options?.headers)
    headers.set("Authorization", `Bearer ${apiKey}`)
    return globalThis.fetch(url, { ...options, headers })
  },
})

export const gameModels = {
  "accounts/fireworks/models/glm-5p3-flash": fireworks(
    "accounts/fireworks/models/glm-5p3-flash"
  ),
  // "zai-org/GLM-5.3-Flash": modal("zai-org/GLM-5.3-Flash"),
  // Other providers are temporarily inactive.
  // "gpt-5.6-terra": openrouter("openai/gpt-5.6-terra"),
  // "gpt-5.6-luna": openrouter("openai/gpt-5.6-luna"),
  // "laguna-s-2.1-free": openrouter("poolside/laguna-s-2.1:free"),
  // "nemotron-3-ultra-free": openrouter("nvidia/nemotron-3-ultra-550b-a55b:free"),
  // "qwen3.8-27b-free": openrouter("qwen/qwen3.8-27b:free"),
} satisfies Record<GameModelId, LanguageModel>
