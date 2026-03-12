import type { Metadata } from "next"
import { CodeLine } from "@/registry/code-line/code-line"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"

export const metadata: Metadata = {
  title: "Code Line",
  description:
    "Compact single-line code snippet with syntax highlighting and an inline copy button.",
}

const sourceFiles = [
  "registry/code-line/code-line.tsx",
  "registry/code-line/code-line-copy-button.tsx",
]

export default async function CodeLinePage() {
  return (
    <ComponentDocsPage
      title="Code Line"
      description="Compact single-line code snippet with syntax highlighting and an inline copy button. Ideal for imports, CLI commands, env vars, and config values."
      registryName="code-line"
      sourceFiles={sourceFiles}
      preview={
        <CodeLine code={`import { Button } from "@/components/ui/button"`} />
      }
      usage={
        <>
          <CodeLine code={`import { CodeLine } from "@/components/code-line"`} />
          <CodeLine code={`<CodeLine code={\`import { Button } from "@/components/ui/button"\`} />`} />
          <p className="text-sm text-muted-foreground">
            <strong>Server component.</strong> Uses shiki for syntax
            highlighting at build time — no client-side JavaScript for
            highlighting. The copy button is a separate{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              &quot;use client&quot;
            </code>{" "}
            component.
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
            registryName="code-line"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "TypeScript",
                code: `<CodeLine code="const schema = z.object({ email: z.string().email() })" language="ts" />`,
                preview: (
                  <CodeLine
                    code={`const schema = z.object({ email: z.string().email() })`}
                    language="ts"
                  />
                ),
              },
              {
                label: "Shell",
                code: `<CodeLine code="npx shadcn@latest add button" language="bash" />`,
                preview: (
                  <CodeLine code={`npx shadcn@latest add button`} language="bash" />
                ),
              },
              {
                label: "CSS",
                code: `<CodeLine code='@import "tailwindcss";' language="css" />`,
                preview: (
                  <CodeLine code={`@import "tailwindcss";`} language="css" />
                ),
              },
              {
                label: "JSON",
                code: `<CodeLine code='{ "compilerOptions": { "strict": true } }' language="json" />`,
                preview: (
                  <CodeLine
                    code={`{ "compilerOptions": { "strict": true } }`}
                    language="json"
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">With label</h3>
          <VariantGrid
            registryName="code-line"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Import Label",
                code: `<CodeLine code='import { useForm } from "react-hook-form"' label="Import" />`,
                preview: (
                  <CodeLine
                    code={`import { useForm } from "react-hook-form"`}
                    label="Import"
                  />
                ),
              },
              {
                label: "Env Label",
                code: `<CodeLine code="NEXT_PUBLIC_API_URL=https://api.example.com" language="bash" label="Env" />`,
                preview: (
                  <CodeLine
                    code={`NEXT_PUBLIC_API_URL=https://api.example.com`}
                    language="bash"
                    label="Env"
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Without copy button</h3>
          <VariantGrid
            registryName="code-line"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Hidden Copy",
                code: `<CodeLine code='export type Theme = "light" | "dark" | "system"' language="ts" hideCopy />`,
                preview: (
                  <CodeLine
                    code={`export type Theme = "light" | "dark" | "system"`}
                    language="ts"
                    hideCopy
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
          prop with any shiki theme name. The snippet renders with that
          theme&apos;s exact colors and background. See the{" "}
          <a
            href="/docs/themes"
            className="underline hover:text-foreground"
          >
            full list of 65 available themes
          </a>
          .
        </p>
        <VariantGrid
          registryName="code-line"
          files={sourceFiles}
          columns={1}
          fullWidth
          items={[
            {
              label: "Dracula",
              code: `<CodeLine code={code} theme="dracula" />`,
              preview: (
                <CodeLine
                  code={`import { Button } from "@/components/ui/button"`}
                  theme="dracula"
                />
              ),
            },
            {
              label: "Nord",
              code: `<CodeLine code={code} theme="nord" />`,
              preview: (
                <CodeLine
                  code={`npx shadcn@latest add button`}
                  language="bash"
                  theme="nord"
                />
              ),
            },
            {
              label: "Tokyo Night",
              code: `<CodeLine code={code} theme="tokyo-night" />`,
              preview: (
                <CodeLine
                  code={`const schema = z.object({ email: z.string().email() })`}
                  language="ts"
                  theme="tokyo-night"
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
          title="CodeLine"
          props={[
            {
              name: "code",
              type: "string",
              required: true,
              description: "The code string to display. Should be a single line.",
            },
            {
              name: "language",
              type: "string",
              description:
                'Language for syntax highlighting. Supports all shiki languages. Defaults to "tsx".',
            },
            {
              name: "label",
              type: "string",
              description:
                "Optional leading label displayed before the code.",
            },
            {
              name: "hideCopy",
              type: "boolean",
              description:
                "Hide the copy-to-clipboard button. Defaults to false.",
            },
            {
              name: "theme",
              type: "string",
              description:
                'Shiki theme name for single-theme rendering (e.g. "dracula", "nord"). When omitted, uses dual github-light/github-dark.',
            },
            {
              name: "className",
              type: "string",
              description:
                "Additional CSS classes applied to the root element.",
            },
          ]}
        />
      </section>

      {/* Notes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Requires a highlight utility.</strong>{" "}
            Expects a{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              highlightCode
            </code>{" "}
            function at{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              @/lib/highlight-code
            </code>
            . If you don&apos;t have one, create it with shiki&apos;s{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              codeToHtml
            </code>
            .
          </li>
          <li>
            <strong className="text-foreground">Designed for single lines.</strong>{" "}
            For multi-line code, use a full code block component instead.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
