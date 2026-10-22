import type { streamText } from "ai"

import type { GameModelId } from "./model-catalog"
import { gameModels } from "./models"

/**
 * The per-model half of a turn's `streamText` call.
 *
 * Spread into `streamText` alongside the options that don't vary with the
 * model — the instructions, the tools, the step limit. Keeps the provider,
 * output budget and reasoning effort together.
 */
export function gameModelSettings(
  modelId: GameModelId
): Pick<
  Parameters<typeof streamText>[0],
  "model" | "maxOutputTokens" | "providerOptions"
> {
  // Restore alongside the Modal provider and catalog entry.
  // if (modelId === "zai-org/GLM-5.3-Flash") {
  //   return {
  //     model: gameModels[modelId],
  //     temperature: 0.3,
  //     topP: 0.9,
  //     providerOptions: { modal: { reasoning: { enabled: true } } },
  //   }
  // }

  return {
    model: gameModels[modelId],
    // Per model call, not per turn: leave room for game source without
    // reserving the provider's entire default completion budget.
    maxOutputTokens: 8192,
    // Fireworks accepts a hard reasoning budget via its thinking extension.
    // The compatible SDK overwrites snake_case reasoning_effort; use thinking
    // so the budget reaches the provider and leaves room for tools and text.
    providerOptions: {
      fireworks: { thinking: { type: "enabled", budget_tokens: 1024 } },
    },
  }
}
