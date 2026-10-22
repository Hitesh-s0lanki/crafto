import type { LanguageModelUsage } from "ai"

import { DOLLAR } from "@/lib/billing/format"
import type { GameModelId } from "@/lib/games/model-catalog"

/**
 * A provider's rate in dollars per million tokens, represented as billionths
 * of a dollar per million tokens.
 *
 * Written as a decimal and rounded through cents so the table below reads like
 * the price list it came from. Every published rate is a whole number of cents,
 * so nothing is lost in the conversion.
 */
function perMillionTokens(dollars: number): bigint {
  return BigInt(Math.round(dollars * 100)) * (DOLLAR / 100n)
}

const TOKENS_PER_MILLION = 1_000_000n

type ModelRates = {
  /** Input tokens that were neither read from nor written to the cache. */
  input: bigint
  /** Input tokens served from the cache — a tenth of the fresh input rate. */
  cacheRead: bigint
  /** Input tokens written to the cache, at the 5-minute TTL the app uses. */
  cacheWrite: bigint
  output: bigint
}

/**
 * What each model in the catalog costs, per million tokens.
 *
 * Sources: OpenAI published pricing and OpenRouter's model catalog, checked
 * 2026-09-26. Cache reads are currently 0.1x the base input rate and cache
 * writes 1.25x for the paid OpenAI models. OpenRouter's free variants have no
 * token charge, so every rate for those models is zero.
 *
 * `satisfies` rather than an annotation, so a model added to the catalog and
 * forgotten here is a type error rather than an undefined rate that prices a
 * turn at zero.
 */
export const MODEL_RATES = {
  // https://fireworks.ai/models/fireworks/glm-5p3-flash (2026-10-21)
  "accounts/fireworks/models/glm-5p3-flash": {
    input: perMillionTokens(0.15),
    cacheRead: perMillionTokens(0.03),
    cacheWrite: 0n,
    output: perMillionTokens(0.5),
  },
  // Modal rates are disabled alongside its catalog entry.
  // Self-hosted Modal compute has no supplied per-token price. Do not charge
  // invented token rates; configure these when a billing rate is established.
  // "zai-org/GLM-5.3-Flash": {
  //   input: 0n,
  //   cacheRead: 0n,
  //   cacheWrite: 0n,
  //   output: 0n,
  // },
  // Other model rates are temporarily inactive.
  // "gpt-5.6-terra": {
  //   input: perMillionTokens(2),
  //   cacheRead: perMillionTokens(0.2),
  //   cacheWrite: perMillionTokens(2.5),
  //   output: perMillionTokens(12),
  // },
  // "gpt-5.6-luna": {
  //   input: perMillionTokens(0.2),
  //   cacheRead: perMillionTokens(0.02),
  //   cacheWrite: perMillionTokens(0.25),
  //   output: perMillionTokens(1.2),
  // },
  // "laguna-s-2.1-free": {
  //   input: 0n,
  //   cacheRead: 0n,
  //   cacheWrite: 0n,
  //   output: 0n,
  // },
  // "nemotron-3-ultra-free": {
  //   input: 0n,
  //   cacheRead: 0n,
  //   cacheWrite: 0n,
  //   output: 0n,
  // },
  // "qwen3.8-27b-free": {
  //   input: 0n,
  //   cacheRead: 0n,
  //   cacheWrite: 0n,
  //   output: 0n,
  // },
} satisfies Record<GameModelId, ModelRates>

function costOf(tokens: number | undefined, rate: bigint): bigint {
  if (!tokens || tokens < 0) {
    return 0n
  }

  // Truncates the fraction below a billionth of a dollar, which at these rates
  // is a fraction of a single token's cost.
  return (BigInt(tokens) * rate) / TOKENS_PER_MILLION
}

/**
 * What one step of a turn cost, in billionths of a dollar.
 *
 * The four token classes are priced separately because they differ by more
 * than an order of magnitude: a cached input token costs a tenth of a
 * fresh one and a cache write costs a quarter more, so a long build — which is
 * mostly the same context read back over and over — is billed nothing like its
 * raw token count suggests.
 *
 * `inputTokens` is deliberately not used: it is the *total*, cached tokens
 * included, so pricing it at the fresh rate would charge full price for reads
 * that cost a tenth of it.
 */
export function priceStep({
  modelId,
  usage,
}: {
  modelId: GameModelId
  usage: LanguageModelUsage
}): bigint {
  const rates = MODEL_RATES[modelId]
  const { noCacheTokens, cacheReadTokens, cacheWriteTokens } =
    usage.inputTokenDetails

  // A provider that reports no breakdown at all has done no caching to report,
  // so the whole input is fresh. This keeps a provider that doesn't report a
  // breakdown from being billed as if input were free.
  const fresh =
    noCacheTokens === undefined &&
    cacheReadTokens === undefined &&
    cacheWriteTokens === undefined
      ? usage.inputTokens
      : noCacheTokens

  return (
    costOf(fresh, rates.input) +
    costOf(cacheReadTokens, rates.cacheRead) +
    costOf(cacheWriteTokens, rates.cacheWrite) +
    costOf(usage.outputTokens, rates.output)
  )
}
