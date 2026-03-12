import type { Metadata } from "next"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"

export const metadata: Metadata = {
  title: "API Reference Table",
  description:
    "Expandable prop reference table with color-coded types for component documentation.",
}

const sourceFiles = ["registry/api-ref-table/api-ref-table.tsx"]

const exampleProps = [
  {
    name: "owner",
    type: "string",
    required: true,
    description: "GitHub username or organization.",
  },
  {
    name: "repo",
    type: "string",
    required: true,
    description: "GitHub repository name.",
  },
  {
    name: "variant",
    type: '"default" | "outline" | "ghost"',
    description: "Visual style variant.",
    fullType: '"default" | "outline" | "ghost" | "subtle"',
  },
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    description: "Button size.",
  },
  {
    name: "stars",
    type: "number",
    description: "Pre-fetched star count. Skips the API call when provided.",
  },
  {
    name: "showRepo",
    type: "boolean",
    description: "Show the owner/repo label alongside the count.",
  },
  {
    name: "onStarClick",
    type: "function",
    description: "Callback fired when the star count is clicked.",
    fullType: "(count: number) => void",
  },
  {
    name: "children",
    type: "ReactNode",
    description: "Optional slot for custom content after the count.",
  },
]

export default async function ApiRefTablePage() {
  return (
    <ComponentDocsPage
      title="API Reference Table"
      description="Expandable prop reference table with color-coded types, optional descriptions, and full-type details. Designed for component documentation pages."
      registryName="api-ref-table"
      sourceFiles={sourceFiles}
      preview={<ApiRefTable title="GitHubStarsButton" props={exampleProps} />}
      usage={
        <>
          <CodeLine
            code={`import { ApiRefTable } from "@/components/api-ref-table"`}
          />
          <CodeLine
            code={`<ApiRefTable title="MyComponent" props={[{ name: "size", type: '"sm" | "lg"' }]} />`}
          />
        </>
      }
    >
      {/* Examples */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Prop types</h3>
          <VariantGrid
            registryName="api-ref-table"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Required Props",
                code: `<ApiRefTable title="Props" props={[{ name: "id", type: "string", required: true }]} />`,
                preview: (
                  <ApiRefTable
                    title="Props"
                    props={[
                      {
                        name: "id",
                        type: "string",
                        required: true,
                        description: "Unique identifier.",
                      },
                      { name: "label", type: "string", required: true },
                    ]}
                  />
                ),
              },
              {
                label: "Mixed Types",
                code: `<ApiRefTable title="Props" props={[{ name: "count", type: "number" }, { name: "visible", type: "boolean" }]} />`,
                preview: (
                  <ApiRefTable
                    title="Props"
                    props={[
                      {
                        name: "count",
                        type: "number",
                        description: "Item count.",
                      },
                      { name: "visible", type: "boolean" },
                      { name: "children", type: "ReactNode" },
                      {
                        name: "onClick",
                        type: "function",
                        fullType: "() => void",
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Union types</h3>
          <VariantGrid
            registryName="api-ref-table"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "String Union",
                code: `<ApiRefTable title="Props" props={[{ name: "variant", type: '"sm" | "md" | "lg"' }]} />`,
                preview: (
                  <ApiRefTable
                    title="Props"
                    props={[
                      {
                        name: "variant",
                        type: '"primary" | "secondary" | "danger"',
                        description: "Button variant.",
                      },
                    ]}
                  />
                ),
              },
              {
                label: "Full Type Expansion",
                code: `<ApiRefTable title="Props" props={[{ name: "size", type: "string", fullType: '"xs" | "sm" | "md" | "lg" | "xl"' }]} />`,
                preview: (
                  <ApiRefTable
                    title="Props"
                    props={[
                      {
                        name: "size",
                        type: "string",
                        fullType: '"xs" | "sm" | "md" | "lg" | "xl"',
                        description: "Expand to see the full type.",
                      },
                    ]}
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
          title="ApiRefTable"
          props={[
            {
              name: "title",
              type: "string",
              required: true,
              description: "Heading displayed at the top of the table.",
            },
            {
              name: "props",
              type: "ApiProp[]",
              required: true,
              description: "Array of prop definitions to display.",
              fullType:
                "{ name: string; type: string; required?: boolean; description?: string; fullType?: string }[]",
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
            <strong className="text-foreground">Client component.</strong> Uses{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              &quot;use client&quot;
            </code>{" "}
            for the expandable row interaction.
          </li>
          <li>
            <strong className="text-foreground">Color-coded types.</strong>{" "}
            Types are automatically colored — string (sky), number (amber),
            boolean (purple), function (rose), ReactNode (teal), and custom
            types (emerald).
          </li>
          <li>
            <strong className="text-foreground">Expandable rows.</strong> Rows
            with a{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              description
            </code>{" "}
            or{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              fullType
            </code>{" "}
            expand on click to reveal details.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
