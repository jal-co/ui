import type { Metadata } from "next"
import { CodeBlock } from "@/components/docs/code-block"
import { CodeLine } from "@/registry/code-line/code-line"
import { Stepper, StepperItem } from "@/registry/stepper/stepper"
import { CopyPromptButton } from "@/components/docs/copy-prompt-button"
import { generateInstallationPrompt } from "@/lib/prompts"

export const metadata: Metadata = {
  title: "Installation — jal-co/ui",
  description: "How to install jalco ui components in your project.",
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
          jalco ui components are distributed as a{" "}
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
        <h2 className="text-xl font-semibold tracking-tight">
          With shadcn CLI
        </h2>
        <p className="text-sm text-muted-foreground">
          The fastest way to get started. The CLI handles source files,
          npm dependencies, and registry dependencies in one command.
        </p>
        <Stepper>
          <StepperItem
            title="Prerequisites"
            description="Make sure your project includes these."
            status="completed"
          >
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
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
          </StepperItem>

          <StepperItem
            title="Add the registry"
            description="Register the @jalco namespace in your project."
            status="completed"
          >
            <div className="flex flex-col gap-3">
              <CodeLine
                code="npx shadcn@latest registry add @jalco"
                language="bash"
              />
              <p className="text-sm text-muted-foreground">
                This adds the jalco registry to your{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">
                  components.json
                </code>
                :
              </p>
              <CodeBlock
                code={`{
  "registries": {
    "@jalco": "https://ui.justinlevine.me/r/{name}.json"
  }
}`}
                language="json"
                compact
              />
            </div>
          </StepperItem>

          <StepperItem
            title="Install a component"
            description="Pick any component and add it to your project."
            status="active"
          >
            <div className="flex flex-col gap-3">
              <CodeLine
                code="npx shadcn@latest add @jalco/github-stars-button"
                language="bash"
              />
              <p className="text-sm text-muted-foreground">This will:</p>
              <ol className="list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
                <li>Download the component source into your project</li>
                <li>Install any required npm dependencies</li>
                <li>
                  Add any shadcn registry dependencies (like{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-xs">
                    button
                  </code>
                  ,{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-xs">
                    card
                  </code>
                  , etc.)
                </li>
              </ol>
            </div>
          </StepperItem>

          <StepperItem
            title="Use the component"
            description="Import and render it in your app."
          >
            <CodeLine
              code={`import { GitHubStarsButton } from "@/components/github-stars-button"`}
            />
          </StepperItem>
        </Stepper>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Manual setup
        </h2>
        <p className="text-sm text-muted-foreground">
          If you prefer to skip the{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            registry add
          </code>{" "}
          command, add the registry entry to your{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            components.json
          </code>{" "}
          directly:
        </p>
        <CodeBlock
          code={`{
  "registries": {
    "@jalco": {
      "url": "https://ui.justinlevine.me/r"
    }
  }
}`}
          language="json"
          compact
        />
        <p className="text-sm text-muted-foreground">
          Then install components with the CLI as usual:
        </p>
        <CodeLine
          code="npx shadcn@latest add @jalco/github-stars-button"
          language="bash"
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Without shadcn
        </h2>
        <p className="text-sm text-muted-foreground">
          Don&apos;t use shadcn? No problem. Every component page includes the
          full source code — copy it directly into your project and install any
          listed dependencies manually. The components are plain React +
          Tailwind CSS with no framework lock-in.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">
          MCP integration
        </h2>
        <p className="text-sm text-muted-foreground">
          Initialize the shadcn MCP server to give your AI editor full context
          of the jalco ui library:
        </p>
        <CodeLine
          code="npx shadcn@latest mcp init"
          language="bash"
        />
      </section>
    </div>
  )
}
