"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card"
import { Input } from "@/registry/ui/input"
import { Button } from "@/registry/ui/button"
import { cn } from "@/lib/utils"

export function WaitlistCard() {
  const [email, setEmail] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <Card className="w-full max-w-xl overflow-hidden border-border/60 bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <CardHeader className="gap-4 pb-4">
        <div className="inline-flex w-fit items-center rounded-full border border-border/60 bg-muted px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
          Early access
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl leading-tight sm:text-3xl">
            Join the waitlist for Jalco UI updates.
          </CardTitle>
          <CardDescription className="max-w-lg text-sm leading-6 sm:text-base">
            Get notified when new registry blocks, polished UI patterns, and docs
            updates land. No spam. Just thoughtful releases.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <label htmlFor="waitlist-email" className="sr-only">
            Email address
          </label>
          <Input
            id="waitlist-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 flex-1"
            required
          />
          <Button type="submit" size="lg" className="h-11 sm:px-6">
            Join waitlist
          </Button>
        </form>
        <div
          className={cn(
            "rounded-lg border px-4 py-3 text-sm transition-colors",
            submitted
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              : "border-border/60 bg-muted/40 text-muted-foreground"
          )}
          aria-live="polite"
        >
          {submitted
            ? `Thanks${email ? `, ${email}` : ""}. You&apos;re on the list.`
            : "Be the first to see new components, blocks, and design-system updates."}
        </div>
      </CardContent>
    </Card>
  )
}
