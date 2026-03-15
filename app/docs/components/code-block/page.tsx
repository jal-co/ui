import type { Metadata } from "next"
import { CodeBlock } from "@/registry/code-block/code-block"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"

export const metadata: Metadata = {
  title: "Code Block",
  description:
    "Syntax-highlighted code block with language icon, copy button, and optional scrollable or collapsible overflow.",
}

export const revalidate = 86400

const sourceFiles = [
  "registry/code-block/code-block.tsx",
  "registry/code-block/code-block-client.tsx",
  "registry/code-block/lib/highlight-code.ts",
]

const tsExample = `import { z } from "zod"

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().int().positive(),
})

type User = z.infer<typeof userSchema>`

const cssExample = `@import "tailwindcss";

@theme {
  --color-primary: oklch(0.7 0.15 200);
  --color-secondary: oklch(0.6 0.12 280);
  --radius-lg: 0.75rem;
}`

const longExample = `import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "sm" | "default" | "lg" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium",
          "ring-offset-background transition-colors",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
export type { ButtonProps }`

export default async function CodeBlockPage() {
  return (
    <ComponentDocsPage
      title="Code Block"
      description="Syntax-highlighted code block with language icon, copy button, and optional scrollable or collapsible overflow. Async server component powered by shiki."
      registryName="code-block"
      sourceFiles={sourceFiles}
      preview={<CodeBlock code={tsExample} language="ts" />}
      usage={
        <>
          <CodeLine code={`import { CodeBlock } from "@/components/code-block"`} />
          <CodeLine code={`<CodeBlock code={myCode} language="ts" />`} />
          <p className="text-sm text-muted-foreground">
            Since this is an <strong>async server component</strong>, it must be
            rendered in a server context. Syntax highlighting happens at build
            time — no client-side JavaScript for highlighting.
          </p>
        </>
      }
    >
      {/* Examples */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Languages</h3>
          <VariantGrid
            registryName="code-block"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "TypeScript",
                code: `<CodeBlock code={code} language="ts" />`,
                preview: <CodeBlock code={tsExample} language="ts" />,
              },
              {
                label: "CSS",
                code: `<CodeBlock code={code} language="css" />`,
                preview: <CodeBlock code={cssExample} language="css" />,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">With title</h3>
          <VariantGrid
            registryName="code-block"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "File Title",
                code: `<CodeBlock code={code} language="ts" title="schema.ts" />`,
                preview: (
                  <CodeBlock code={tsExample} language="ts" title="schema.ts" />
                ),
              },
              {
                label: "Custom Title",
                code: `<CodeBlock code={code} language="css" title="Theme tokens" />`,
                preview: (
                  <CodeBlock
                    code={cssExample}
                    language="css"
                    title="Theme tokens"
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Overflow modes</h3>
          <VariantGrid
            registryName="code-block"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Scrollable",
                code: `<CodeBlock code={code} language="tsx" overflow="scrollable" maxHeight={200} />`,
                preview: (
                  <CodeBlock
                    code={longExample}
                    language="tsx"
                    overflow="scrollable"
                    maxHeight={200}
                  />
                ),
              },
              {
                label: "Collapsible",
                code: `<CodeBlock code={code} language="tsx" overflow="collapsible" maxHeight={200} />`,
                preview: (
                  <CodeBlock
                    code={longExample}
                    language="tsx"
                    overflow="collapsible"
                    maxHeight={200}
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Muted style</h3>
          <VariantGrid
            registryName="code-block"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Muted",
                code: `<CodeBlock code={code} language="ts" muted />`,
                preview: <CodeBlock code={tsExample} language="ts" muted />,
              },
              {
                label: "Muted + Collapsible",
                code: `<CodeBlock code={code} language="tsx" muted overflow="collapsible" maxHeight={200} />`,
                preview: (
                  <CodeBlock
                    code={longExample}
                    language="tsx"
                    muted
                    overflow="collapsible"
                    maxHeight={200}
                  />
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* Color themes */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight">Color themes</h2>
        <p className="text-sm text-muted-foreground">
          Pass a{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            theme
          </code>{" "}
          prop with any shiki theme name to override the default dual
          light/dark rendering. The code area renders with that theme&apos;s
          exact colors. All 65 bundled shiki themes are supported — see the{" "}
          <a
            href="/docs/themes"
            className="underline hover:text-foreground"
          >
            full theme list
          </a>
          .
        </p>
        <VariantGrid
          registryName="code-block"
          files={sourceFiles}
          columns={1}
          fullWidth
          items={[
            {
              label: "Dracula",
              code: `<CodeBlock code={code} language="ts" theme="dracula" />`,
              preview: (
                <CodeBlock
                  code={tsExample}
                  language="ts"
                  title="schema.ts"
                  theme="dracula"
                />
              ),
            },
            {
              label: "Nord",
              code: `<CodeBlock code={code} language="ts" theme="nord" />`,
              preview: (
                <CodeBlock
                  code={tsExample}
                  language="ts"
                  title="schema.ts"
                  theme="nord"
                />
              ),
            },
            {
              label: "Tokyo Night",
              code: `<CodeBlock code={code} language="css" theme="tokyo-night" />`,
              preview: (
                <CodeBlock
                  code={cssExample}
                  language="css"
                  title="theme.css"
                  theme="tokyo-night"
                />
              ),
            },
            {
              label: "Catppuccin Mocha",
              code: `<CodeBlock code={code} language="ts" theme="catppuccin-mocha" />`,
              preview: (
                <CodeBlock
                  code={tsExample}
                  language="ts"
                  title="schema.ts"
                  theme="catppuccin-mocha"
                />
              ),
            },
          ]}
        />
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">API Reference</h2>
        <ApiRefTable
          title="CodeBlock"
          props={[
            {
              name: "code",
              type: "string",
              required: true,
              description: "The code string to highlight and display.",
            },
            {
              name: "language",
              type: "string",
              description:
                'Language for syntax highlighting. Supports all shiki languages. Defaults to "tsx".',
            },
            {
              name: "title",
              type: "string",
              description:
                "Optional title shown in the header. Replaces the language badge.",
            },
            {
              name: "overflow",
              type: '"default" | "scrollable" | "collapsible"',
              description:
                'How to handle long code. Scrollable adds a scroll container, collapsible adds a show more/less toggle. Defaults to "default".',
            },
            {
              name: "maxHeight",
              type: "number",
              description:
                "Max height in pixels for scrollable and collapsible overflow. Defaults to 280.",
            },
            {
              name: "muted",
              type: "boolean",
              description:
                "Render with muted styling — softer borders, backgrounds, and reduced code opacity. Defaults to false.",
            },
            {
              name: "theme",
              type: "string",
              description:
                'Shiki theme name for single-theme rendering (e.g. "dracula", "nord", "catppuccin-mocha"). When omitted, uses dual github-light/github-dark for automatic light/dark mode.',
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes on the root element.",
            },
          ]}
        />
      </section>

      {/* Notes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Bundled language icons.</strong>{" "}
            Language icons are bundled directly in the component — no API calls
            or setup required. Pass a custom{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">icon</code>{" "}
            prop to override the default icon for any language.
          </li>
          <li>
            <strong className="text-foreground">Dual theme.</strong> By default,
            uses{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              github-light
            </code>{" "}
            /{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              github-dark
            </code>{" "}
            for automatic light/dark mode. Pass the{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              theme
            </code>{" "}
            prop to render with any of shiki&apos;s 65 bundled themes instead.
          </li>
          <li>
            <strong className="text-foreground">Icon library.</strong>{" "}
            Uses{" "}
            <a
              href="https://lucide.dev"
              className="underline hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lucide
            </a>{" "}
            icons by default. Since this is copy-paste code, you can swap the
            imports if your project uses a different icon library.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
