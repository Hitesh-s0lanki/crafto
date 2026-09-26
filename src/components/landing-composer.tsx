"use client"

import { ArrowUpIcon, CheckIcon, SparklesIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group"

const PENDING_PROMPT_KEY = "crafto:pending-game-prompt"

export function LandingComposer({ signedIn }: { signedIn: boolean }) {
  const router = useRouter()
  const [prompt, setPrompt] = useState("")
  const trimmedPrompt = prompt.trim()

  function continueToApp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!trimmedPrompt) return

    window.sessionStorage.setItem(PENDING_PROMPT_KEY, trimmedPrompt)
    router.push(signedIn ? "/app" : "/sign-up?redirect_url=%2Fapp")
  }

  return (
    <form
      onSubmit={continueToApp}
      className="w-full"
      aria-label="Start building a game"
    >
      <InputGroup className="min-h-40 rounded-2xl border-white/12 bg-white/[0.07] shadow-2xl shadow-black/30 backdrop-blur-xl">
        <label htmlFor="game-idea" className="sr-only">
          Describe your game idea
        </label>
        <InputGroupTextarea
          id="game-idea"
          name="game-idea"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="A cozy island adventure where every plant has a personality…"
          rows={3}
          className="min-h-24 resize-none px-5 pt-5 text-base leading-relaxed text-white placeholder:text-white/45 md:text-lg"
        />
        <InputGroupAddon
          align="block-end"
          className="flex-wrap px-4 pb-4 sm:flex-nowrap"
        >
          <div className="hidden items-center gap-2 text-sm text-white/55 sm:flex">
            <SparklesIcon
              aria-hidden="true"
              className="size-4 text-orange-300"
            />
            Describe it. Crafto builds it.
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={!trimmedPrompt}
            className="w-full rounded-full bg-orange-500 px-5 text-white shadow-lg shadow-orange-950/30 hover:bg-orange-400 active:scale-96 sm:ms-auto sm:w-auto"
          >
            {signedIn ? "Build this game" : "Start building"}
            <ArrowUpIcon aria-hidden="true" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <p className="mt-3 flex items-center justify-center gap-2 text-xs text-white/45 sm:text-sm">
        <CheckIcon aria-hidden="true" className="size-3.5" />
        No code required. Your idea stays ready after sign-up.
      </p>
    </form>
  )
}

export { PENDING_PROMPT_KEY }
