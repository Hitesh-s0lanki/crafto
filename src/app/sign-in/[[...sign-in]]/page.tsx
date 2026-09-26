import { SignIn } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

export default function SignInPage() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#14120f] px-4 py-12">
      <div
        aria-hidden="true"
        className="absolute top-[-18rem] left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl"
      />
      <div className="relative flex w-full max-w-md flex-col items-center gap-8">
        <Link
          href="/"
          aria-label="Crafto home"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
        >
          <Image
            src="/brand/crafto-icon-clean.png"
            alt=""
            width={40}
            height={40}
            className="size-10"
          />
          <Image
            src="/brand/crafto-wordmark-clean.png"
            alt="Crafto"
            width={900}
            height={350}
            className="h-7 w-auto brightness-0 invert"
          />
        </Link>
        <SignIn fallbackRedirectUrl="/app" signUpFallbackRedirectUrl="/app" />
      </div>
    </main>
  )
}
