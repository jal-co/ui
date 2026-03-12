import type { Metadata } from "next"
import { CodeLine } from "@/registry/code-line/code-line"
import { CopyPromptButton } from "@/components/docs/copy-prompt-button"
import { generateInstallationPrompt } from "@/lib/prompts"

export const metadata: Metadata = {
  title: "Installation — Jalco UI",
  description: "How to install Jalco UI components in your project.",
}

export default async function InstallationPage() {
  const aiPrompt = generateInstallationPrompt()

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Installation</h1>
          <CopyPromptButton value={aiPrompt} />
        </div>
        <p className="text-base text-muted-foreground">
          Jalco UI components are distributed as a{" "}
          <a
            href="https://ui.shadcn.com/docs/registry"
            className="underline hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            shadcn-compatible registry
          </a>
          . You install them directly into your project — no package to add, no
          version to track.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Prerequisites</h2>
        <p className="text-sm text-muted-foreground">
          Make sure you have a project set up with:
        </p>
        <ul className="list-disc space-y-1.5 pl-6 text-sm text-muted-foreground">
          <li>
            <a
              href="https://nextjs.org"
              className="underline hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js
            </a>{" "}
            (App Router recommended)
          </li>
          <li>
            <a
              href="https://tailwindcss.com"
              className="underline hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tailwind CSS v4
            </a>
          </li>
          <li>
            <a
              href="https://ui.shadcn.com/docs/installation"
              className="underline hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              shadcn/ui initialized
            </a>
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Install a component
        </h2>
        <p className="text-sm text-muted-foreground">
          Use the{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">shadcn</code>{" "}
          CLI to add any component from the registry:
        </p>
        <CodeLine
          code="npx shadcn@latest add https://ui.justinlevine.me/r/github-stars-button.json"
          language="bash"
        />
        <p className="text-sm text-muted-foreground">This will:</p>
        <ol className="list-decimal space-y-1.5 pl-6 text-sm text-muted-foreground">
          <li>Download the component source into your project</li>
          <li>Install any required npm dependencies</li>
          <li>
            Add any shadcn registry dependencies (like{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">button</code>
            ,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">card</code>
            , etc.)
          </li>
        </ol>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Manual installation
        </h2>
        <p className="text-sm text-muted-foreground">
          If you prefer not to use the CLI, you can copy the component source
          directly from the docs pages. Each component page includes the full
          source code.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Registry URL</h2>
        <p className="text-sm text-muted-foreground">
          The base registry URL is:
        </p>
        <CodeLine code="https://ui.justinlevine.me/r/" language="bash" />
        <p className="text-sm text-muted-foreground">
          Individual component payloads are available at:
        </p>
        <CodeLine
          code="https://ui.justinlevine.me/r/{component-name}.json"
          language="bash"
        />
      </section>
    </div>
  )
}
