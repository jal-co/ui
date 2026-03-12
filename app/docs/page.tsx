import type { Metadata } from "next"
import { CodeLine } from "@/registry/code-line/code-line"

export const metadata: Metadata = {
  title: "Introduction — Jalco UI",
  description: "A curated shadcn-style component registry by Justin Levine.",
}

export default async function IntroductionPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Introduction</h1>
        <p className="text-base text-muted-foreground">
          Jalco UI is a collection of polished, composable components built for
          modern React and Next.js projects. Every component is designed to be
          installed with a single command, copied into your project, and adapted
          to your design system.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">What you get</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Copy-paste components</strong>{" "}
            — Install with{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              shadcn add
            </code>{" "}
            or copy the source directly.
          </li>
          <li>
            <strong className="text-foreground">Composable APIs</strong> —
            Small, focused components with clear props. No boolean-prop sprawl.
          </li>
          <li>
            <strong className="text-foreground">Design-system friendly</strong>{" "}
            — Components use Tailwind tokens and adapt to your theme
            automatically.
          </li>
          <li>
            <strong className="text-foreground">Server-first</strong> — Async
            server components where it makes sense. No unnecessary client
            bundles.
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Quick start</h2>
        <CodeLine
          code="npx shadcn@latest add https://ui.justinlevine.me/r/github-stars-button.json"
          language="bash"
        />
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold tracking-tight">
          Browse components
        </h2>
        <p className="text-sm text-muted-foreground">
          Check the sidebar to explore available components and their
          documentation.
        </p>
      </section>
    </div>
  )
}
