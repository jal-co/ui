import type { Metadata } from "next"
import { CodeBlockCommand } from "@/registry/code-block-command/code-block-command"
import { convertNpmCommand } from "@/registry/code-block-command/lib/convert-npm-command"
import { fetchPackageManagerIcons } from "@/registry/code-block-command/lib/package-manager-icons"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"

export const metadata: Metadata = {
  title: "Code Block Command",
  description:
    "Tabbed CLI command block with package manager switching, SVG icons, copy button, and localStorage persistence.",
}

export const revalidate = 86400

const sourceFiles = [
  "registry/code-block-command/code-block-command.tsx",
  "registry/code-block-command/icons/package-manager-icons.tsx",
  "registry/code-block-command/lib/convert-npm-command.ts",
  "registry/code-block-command/lib/package-manager-icons.ts",
]

export default async function CodeBlockCommandPage() {
  const pmIcons = await fetchPackageManagerIcons()

  return (
    <ComponentDocsPage
      title="Code Block Command"
      description="Tabbed CLI command block with package manager switching (pnpm, yarn, npm, bun, shadcn), SVG icons, copy button, and localStorage persistence. Remembers the user's preferred package manager across visits."
      registryName="code-block-command"
      sourceFiles={sourceFiles}
      preview={
        <CodeBlockCommand
          {...convertNpmCommand("npx shadcn@latest add button")}
          icons={pmIcons}
          show={["shadcn", "pnpm", "npm", "yarn", "bun"]}
        />
      }
      usage={
        <>
          <CodeLine
            code={`import { CodeBlockCommand } from "@/components/code-block-command"`}
          />
          <CodeLine
            code={`import { convertNpmCommand } from "@/lib/convert-npm-command"`}
          />
          <CodeLine
            code={`<CodeBlockCommand {...convertNpmCommand("npm install zod")} />`}
          />
          <p className="text-sm text-muted-foreground">
            <strong>Client component.</strong> Uses{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              localStorage
            </code>{" "}
            to persist the selected package manager across visits. Use the{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              convertNpmCommand
            </code>{" "}
            helper to generate equivalent commands for all managers from a
            single npm command.
          </p>
        </>
      }
    >
      {/* Examples */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Command types</h3>
          <VariantGrid
            registryName="code-block-command"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "shadcn add",
                code: `<CodeBlockCommand {...convertNpmCommand("npx shadcn@latest add button")} icons={pmIcons} />`,
                preview: (
                  <CodeBlockCommand
                    {...convertNpmCommand("npx shadcn@latest add button")}
                    icons={pmIcons}
                    show={["shadcn", "pnpm", "npm", "yarn", "bun"]}
                  />
                ),
              },
              {
                label: "npm install",
                code: `<CodeBlockCommand {...convertNpmCommand("npm install zod")} icons={pmIcons} />`,
                preview: (
                  <CodeBlockCommand
                    {...convertNpmCommand("npm install zod")}
                    icons={pmIcons}
                  />
                ),
              },
              {
                label: "npx create",
                code: `<CodeBlockCommand {...convertNpmCommand("npx create-next-app@latest")} icons={pmIcons} />`,
                preview: (
                  <CodeBlockCommand
                    {...convertNpmCommand("npx create-next-app@latest")}
                    icons={pmIcons}
                  />
                ),
              },
              {
                label: "npm run",
                code: `<CodeBlockCommand {...convertNpmCommand("npm run dev")} icons={pmIcons} />`,
                preview: (
                  <CodeBlockCommand
                    {...convertNpmCommand("npm run dev")}
                    icons={pmIcons}
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Icon styles</h3>
          <VariantGrid
            registryName="code-block-command"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Colored (default)",
                code: `<CodeBlockCommand {...commands} icons={pmIcons} iconStyle="colored" />`,
                preview: (
                  <CodeBlockCommand
                    {...convertNpmCommand("npm install zod")}
                    icons={pmIcons}
                    iconStyle="colored"
                  />
                ),
              },
              {
                label: "Muted",
                code: `<CodeBlockCommand {...commands} icons={pmIcons} iconStyle="muted" />`,
                preview: (
                  <CodeBlockCommand
                    {...convertNpmCommand("npm install zod")}
                    icons={pmIcons}
                    iconStyle="muted"
                  />
                ),
              },
              {
                label: "No Icons",
                code: `<CodeBlockCommand {...commands} iconStyle="none" />`,
                preview: (
                  <CodeBlockCommand
                    {...convertNpmCommand("npm install zod")}
                    iconStyle="none"
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Filtered tabs</h3>
          <VariantGrid
            registryName="code-block-command"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "pnpm + npm only",
                code: `<CodeBlockCommand {...commands} icons={pmIcons} show={["pnpm", "npm"]} />`,
                preview: (
                  <CodeBlockCommand
                    {...convertNpmCommand("npm install zod")}
                    icons={pmIcons}
                    show={["pnpm", "npm"]}
                  />
                ),
              },
              {
                label: "shadcn + bun only",
                code: `<CodeBlockCommand {...commands} icons={pmIcons} show={["shadcn", "bun"]} />`,
                preview: (
                  <CodeBlockCommand
                    {...convertNpmCommand("npx shadcn@latest add button")}
                    icons={pmIcons}
                    show={["shadcn", "bun"]}
                  />
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">API Reference</h2>
        <ApiRefTable
          title="CodeBlockCommand"
          props={[
            {
              name: "pnpm",
              type: "string",
              description: "pnpm command string.",
            },
            {
              name: "yarn",
              type: "string",
              description: "yarn command string.",
            },
            {
              name: "npm",
              type: "string",
              description: "npm command string.",
            },
            {
              name: "bun",
              type: "string",
              description: "bun command string.",
            },
            {
              name: "shadcn",
              type: "string",
              description: "shadcn CLI command string.",
            },
            {
              name: "icons",
              type: "Record<string, string>",
              description:
                "Pre-fetched SVG markup keyed by package manager name. Use fetchPackageManagerIcons() to generate. Defaults to {}.",
              fullType: "Partial<Record<PackageManager, string>>",
            },
            {
              name: "iconStyle",
              type: '"none" | "colored" | "muted"',
              description: 'Icon display style. Defaults to "colored".',
            },
            {
              name: "show",
              type: "PackageManager[]",
              description:
                "Which tabs to display, in order. Only managers listed here that also have a command will render. Defaults to all with a command.",
              fullType: '("pnpm" | "yarn" | "npm" | "bun" | "shadcn")[]',
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
            <strong className="text-foreground">
              convertNpmCommand helper.
            </strong>{" "}
            Pass a single npm/npx command and get all 5 package manager
            equivalents automatically. Handles shadcn, create, install, run, and
            generic npx commands.
          </li>
          <li>
            <strong className="text-foreground">Icons via SVGL.</strong>{" "}
            Package manager icons are fetched from the{" "}
            <a
              href="https://svgl.app"
              className="underline hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              SVGL API
            </a>{" "}
            at build time. Use{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              fetchPackageManagerIcons()
            </code>{" "}
            in a server component and pass the result as the{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">icons</code>{" "}
            prop.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
