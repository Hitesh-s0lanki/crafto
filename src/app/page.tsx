import { auth } from "@clerk/nextjs/server"
import {
  ArrowRightIcon,
  BoxIcon,
  Gamepad2Icon,
  SparklesIcon,
  WandSparklesIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { LandingComposer } from "@/components/landing-composer"
import { Button } from "@/components/ui/button"

const benefits = [
  { icon: WandSparklesIcon, label: "Build from plain English" },
  { icon: BoxIcon, label: "Explore in real-time 3D" },
  { icon: Gamepad2Icon, label: "Play and refine instantly" },
]

export default async function LandingPage() {
  const { userId } = await auth()
  const signedIn = Boolean(userId)

  return (
    <div className="relative min-h-svh overflow-hidden bg-[#14120f] text-white">
      <a
        href="#main-content"
        className="fixed start-4 top-4 z-50 -translate-y-24 rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#211d18] transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-18rem] left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute right-[-12rem] bottom-[-16rem] size-[34rem] rounded-full bg-amber-300/10 blur-3xl" />
        <div className="landing-grid absolute inset-0 opacity-30" />
      </div>

      <header className="relative z-10 mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
          aria-label="Crafto home"
        >
          <Image
            src="/brand/crafto-icon-clean.png"
            alt=""
            width={36}
            height={36}
            priority
            className="size-9"
          />
          <Image
            src="/brand/crafto-wordmark-clean.png"
            alt="Crafto"
            width={900}
            height={350}
            priority
            className="hidden h-6 w-auto brightness-0 invert min-[380px]:block"
          />
        </Link>
        <nav aria-label="Account" className="flex items-center gap-2">
          {signedIn ? (
            <Button render={<Link href="/app" />}>
              Open Crafto <ArrowRightIcon aria-hidden="true" />
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                className="text-white/75 hover:bg-white/10 hover:text-white"
                render={<Link href="/sign-in" />}
              >
                Sign in
              </Button>
              <Button
                className="rounded-full bg-white text-[#211d18] hover:bg-white/90"
                render={<Link href="/sign-up" />}
              >
                Get started
              </Button>
            </>
          )}
        </nav>
      </header>

      <main
        id="main-content"
        className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-6xl flex-col items-center justify-center px-5 pt-10 pb-16 text-center sm:px-8 sm:pb-24"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-300/10 px-3 py-1.5 text-sm text-orange-100">
          <SparklesIcon aria-hidden="true" className="size-4" />
          AI-powered 3D game studio
        </div>
        <h1 className="max-w-4xl text-5xl leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl">
          Turn an idea into a world you can play.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-white/60 sm:text-lg">
          Describe the game in your head. Crafto plans the scene, writes the
          code, and brings your playable 3D world to life.
        </p>

        <div className="mt-10 w-full max-w-3xl">
          <LandingComposer signedIn={signedIn} />
        </div>

        <ul
          className="mt-12 grid w-full max-w-3xl gap-3 text-start sm:grid-cols-3"
          aria-label="What Crafto can do"
        >
          {benefits.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.035] px-4 py-3 text-sm text-white/65"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/8 text-orange-300">
                <Icon aria-hidden="true" className="size-4" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
