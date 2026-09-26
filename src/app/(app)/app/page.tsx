import Image from "next/image"

import { NewGameComposer } from "@/components/new-game-composer"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty"

export default function Page() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-4">
      <Empty className="flex-none">
        <EmptyHeader>
          <EmptyMedia>
            <Image
              src="/brand/crafto-icon-clean.png"
              alt=""
              width={72}
              height={72}
              priority
              className="size-16 object-contain"
            />
          </EmptyMedia>
          <h1 className="text-2xl font-medium tracking-tight text-balance">
            What should we build today?
          </h1>
          <EmptyDescription>
            Build racers, shooters, puzzles, and whole worlds using your own
            words. If you can describe it, you can play it.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="max-w-2xl gap-6">
          <NewGameComposer />
        </EmptyContent>
      </Empty>
    </main>
  )
}
