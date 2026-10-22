import { auth } from "@clerk/nextjs/server"
import {
  ArrowRightIcon,
  BoxIcon,
  Code2Icon,
  Gamepad2Icon,
  SparklesIcon,
  WandSparklesIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { LandingComposer } from "@/components/landing-composer"
import { buttonVariants } from "@/components/ui/button"

const benefits = [
  { icon: WandSparklesIcon, label: "Build from plain English" },
  { icon: BoxIcon, label: "Explore in real-time 3D" },
  { icon: Gamepad2Icon, label: "Play and refine instantly" },
]

export default async function LandingPage() {
  const { userId } = await auth()
  const signedIn = Boolean(userId)

  return (
    <div className="relative min-h-svh overflow-hidden bg-brand-canvas text-white">
      <a
        href="#main-content"
        className="fixed start-4 top-4 z-50 -translate-y-24 rounded-lg bg-white px-4 py-2 text-sm font-medium text-brand-canvas transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-18rem] left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute right-[-12rem] bottom-[-16rem] size-[34rem] rounded-full bg-brand-support/12 blur-3xl" />
        <div className="landing-grid absolute inset-0 opacity-30" />
      </div>

      <header className="relative z-10 mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
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
            <Link href="/app" className={buttonVariants()}>
              Open Crafto <ArrowRightIcon aria-hidden="true" />
            </Link>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={buttonVariants({
                  variant: "ghost",
                  className:
                    "text-white/75 hover:bg-white/10 hover:text-white",
                })}
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className={buttonVariants({
                  className:
                    "rounded-full bg-white text-brand-canvas hover:bg-white/90",
                })}
              >
                Get started
              </Link>
            </>
          )}
        </nav>
      </header>

      <main
        id="main-content"
        className="relative z-10 mx-auto flex min-h-[calc(100svh-9rem)] w-full max-w-6xl flex-col items-center justify-center px-5 pt-10 pb-16 text-center sm:px-8 sm:pb-20"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/15 px-3 py-1.5 text-sm text-violet-100">
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
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/8 text-brand-support">
                <Icon aria-hidden="true" className="size-4" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </main>

      <footer className="relative z-10 mx-auto flex min-h-16 w-full max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 py-4 text-sm text-white/60 sm:justify-between sm:px-8">
        <a
          href="https://github.com/Hitesh-s0lanki/crafto"
          target="_blank"
          rel="noreferrer"
          className="flex min-h-11 items-center gap-2 rounded-lg hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <Code2Icon aria-hidden="true" className="size-4" />
          View Crafto on GitHub
        </a>
        <p>
          Made by{" "}
          <a
            href="https://hiteshsolanki.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-lg font-medium text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Hitesh Solanki
          </a>
        </p>
      </footer>
    </div>
  )
}
