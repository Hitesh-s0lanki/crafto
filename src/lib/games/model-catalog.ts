/**
 * The models a game can be built with, in the order a picker should offer them.
 *
 * Client-safe on purpose: ids and copy, and nothing that talks to a model
 * provider. The provider instances live in `./models`, which pulls in the
 * provider SDKs and reads their API keys — so a component that only needs to
 * *name* a model never drags any of those into the browser bundle.
 *
 * The ids are the providers' own model ids rather than slugs of our own. They
 * are globally distinct, so a second name for each would only be a mapping to
 * keep in step.
 */
export const GAME_MODELS = [
  {
    id: "accounts/fireworks/models/glm-5p3-flash",
    name: "GLM-5.3-Flash",
    tagline: "Build and revise games with GLM on Fireworks.",
  },
  // Temporarily disabled: restore with the Modal provider in ./models.
  // {
  //   id: "zai-org/GLM-5.3-Flash",
  //   name: "GLM-5.3-Flash",
  //   tagline: "Build and revise games with GLM on Modal.",
  // },
  // Other models are temporarily inactive.
  // {
  //   id: "gpt-5.6-terra",
  //   name: "GPT-5.6 Terra",
  //   tagline: "Balances intelligence and cost for substantial builds.",
  // },
  // {
  //   id: "gpt-5.6-luna",
  //   name: "GPT-5.6 Luna",
  //   tagline: "The lowest-cost option for focused changes and quick iterations.",
  // },
  // {
  //   id: "laguna-s-2.1-free",
  //   name: "Laguna S 2.1 (Free)",
  //   tagline: "A coding specialist for implementing and debugging game systems.",
  // },
  // {
  //   id: "nemotron-3-ultra-free",
  //   name: "Nemotron 3 Ultra (Free)",
  //   tagline: "Strong reasoning for complex game architecture and planning.",
  // },
  // {
  //   id: "qwen3.8-27b-free",
  //   name: "Qwen3.8 27B (Free)",
  //   tagline: "A multimodal option for gameplay, UI, and visual iteration.",
  // },
] as const

/**
 * The id of a model this app offers.
 *
 * Derived from the catalog rather than written out again, so the union and the
 * list a player sees cannot drift: adding an entry above is the whole of adding
 * a model, and every exhaustive switch on this type reports what is missing.
 */
export type GameModelId = (typeof GAME_MODELS)[number]["id"]

/**
 * What a turn runs on when nothing picked otherwise.
 *
 * Every turn today, since nothing sends a choice yet — so this is the model the
 * app actually uses, not a fallback that rarely fires.
 */
export const DEFAULT_GAME_MODEL_ID: GameModelId =
  "accounts/fireworks/models/glm-5p3-flash"

/**
 * Whether a value names a model this app offers.
 *
 * A guard rather than a bare comparison, because the places that need it take
 * the id from somewhere the app doesn't control — a URL, a server action's
 * arguments — and want the narrowed type on the other side of the check.
 */
export function isGameModelId(value: unknown): value is GameModelId {
  return GAME_MODELS.some((model) => model.id === value)
}
