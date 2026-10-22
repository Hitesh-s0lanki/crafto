"use client"

import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { splitReasoningSections } from "@/lib/games/reasoning-sections"
import { cn } from "@/lib/utils"

export function ChatReasoning({
  text,
  streaming,
}: {
  text: string
  streaming: boolean
}) {
  const [expanded, setExpanded] = useState(true)
  const sections = splitReasoningSections(text)

  return (
    <Collapsible
      open={expanded}
      onOpenChange={setExpanded}
      className="w-full min-w-0"
    >
      <CollapsibleTrigger className="group/reasoning inline-flex min-h-10 items-center gap-2 rounded-md text-left text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">
        <span>{streaming ? "Thinking…" : "Thought process"}</span>
        <ChevronDownIcon
          aria-hidden="true"
          className="size-4 transition-transform group-aria-expanded/reasoning:rotate-180"
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div role="region" aria-label="Model reasoning" aria-busy={streaming}>
          <ol className="mt-2 ml-1.5 border-l border-border">
            {sections.map((section, index) => (
              <ReasoningSection
                key={index}
                title={section.title}
                body={section.body}
                streaming={streaming && index === sections.length - 1}
              />
            ))}
            {sections.length === 0 && (
              <li className="pb-4 pl-5 text-sm text-muted-foreground">
                Preparing…
              </li>
            )}
          </ol>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function ReasoningSection({
  title,
  body,
  streaming,
}: {
  title: string
  body: string
  streaming: boolean
}) {
  return (
    <li className="relative pb-6 pl-5 last:pb-1">
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-3 -left-[4.5px] size-2 rounded-full bg-muted-foreground/60",
          streaming && "bg-primary motion-safe:animate-pulse"
        )}
      />
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="group/section flex min-h-8 w-full items-start gap-3 rounded-md py-1 text-left text-sm font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <span className="min-w-0 flex-1 wrap-anywhere">{title}</span>
          <ChevronDownIcon
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-aria-expanded/section:rotate-180"
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          {body && (
            <p className="pt-1 text-sm leading-relaxed wrap-anywhere whitespace-pre-wrap text-muted-foreground">
              {body}
            </p>
          )}
        </CollapsibleContent>
      </Collapsible>
    </li>
  )
}
