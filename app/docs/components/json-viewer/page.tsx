import type { Metadata } from "next"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"
import { JsonViewer } from "@/registry/json-viewer/json-viewer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "JSON Viewer",
  description:
    "Collapsible, syntax-colored JSON tree with path copying, search, and expand/collapse controls.",
}

const sourceFiles = ["registry/json-viewer/json-viewer.tsx"]

const apiResponse = {
  id: "usr_7k2m9p",
  email: "jamie@example.com",
  name: "Jamie Chen",
  role: "admin",
  verified: true,
  created_at: "2026-03-10T23:42:00Z",
  metadata: {
    login_count: 142,
    last_ip: "203.0.113.42",
    preferences: {
      theme: "dark",
      notifications: true,
      locale: "en-US",
    },
  },
  teams: [
    { id: "team_01", name: "Engineering", role: "lead" },
    { id: "team_02", name: "Platform", role: "member" },
  ],
}

const packageJson = {
  name: "@acme/dashboard",
  version: "2.4.1",
  private: true,
  scripts: {
    dev: "next dev",
    build: "next build",
    start: "next start",
    lint: "next lint",
    test: "vitest",
  },
  dependencies: {
    next: "15.5.9",
    react: "19.1.0",
    "react-dom": "19.1.0",
    "tailwind-merge": "^3.3.1",
    "lucide-react": "^0.487.0",
  },
  devDependencies: {
    typescript: "^5.9.2",
    tailwindcss: "^4.1.11",
    vitest: "^3.1.0",
  },
}

const nestedArray = {
  status: "ok",
  total: 3,
  results: [
    {
      id: 1,
      title: "Introduction to Cron",
      tags: ["scheduling", "unix", "automation"],
      author: { name: "Alex", avatar: "https://i.pravatar.cc/40?u=alex" },
      published: true,
    },
    {
      id: 2,
      title: "Environment Variables Best Practices",
      tags: ["security", "devops", "config"],
      author: { name: "Sam", avatar: "https://i.pravatar.cc/40?u=sam" },
      published: false,
    },
    {
      id: 3,
      title: "JSON Parsing in TypeScript",
      tags: ["typescript", "parsing"],
      author: { name: "Jordan", avatar: "https://i.pravatar.cc/40?u=jordan" },
      published: true,
    },
  ],
}

const primitiveTypes = {
  string_value: "hello world",
  number_int: 42,
  number_float: 3.14159,
  boolean_true: true,
  boolean_false: false,
  null_value: null,
  empty_string: "",
  zero: 0,
  negative: -17,
  long_string:
    "The quick brown fox jumps over the lazy dog near the riverbank at sunset.",
}

export default function JsonViewerPage() {
  return (
    <ComponentDocsPage
      title="JSON Viewer"
      description="Collapsible, syntax-colored JSON tree with path copying, search, and expand/collapse controls. Designed for dev dashboards, API documentation, and debugging tools."
      registryName="json-viewer"
      sourceFiles={sourceFiles}
      preview={
        <JsonViewer
          data={apiResponse}
          title="API Response"
          rootName="response"
          defaultExpanded={2}
        />
      }
      usage={
        <>
          <CodeLine
            code={`import { JsonViewer } from "@/components/json-viewer"`}
          />
          <CodeLine code={`<JsonViewer data={myObject} title="Response" />`} />
          <p className="text-sm text-muted-foreground">
            Pass any JSON-serializable value. Click the chevron to
            expand/collapse nodes. Hover a row and click the path icon to copy
            the access path (e.g.{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              response.metadata.preferences.theme
            </code>
            ).
          </p>
        </>
      }
    >
      {/* Examples */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Expand depth</h3>
          <p className="text-sm text-muted-foreground">
            Control how deep the tree is expanded on initial render. Set{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              defaultExpanded
            </code>{" "}
            to a number for depth, or{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">true</code>{" "}
            for fully expanded.
          </p>
          <VariantGrid
            registryName="json-viewer"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Depth 1 (default)",
                code: `<JsonViewer data={data} title="Depth 1" defaultExpanded={1} />`,
                preview: (
                  <JsonViewer
                    data={apiResponse}
                    title="Depth 1"
                    rootName="response"
                    defaultExpanded={1}
                  />
                ),
              },
              {
                label: "Fully expanded",
                code: `<JsonViewer data={data} title="Fully Expanded" defaultExpanded />`,
                preview: (
                  <JsonViewer
                    data={apiResponse}
                    title="Fully Expanded"
                    rootName="response"
                    defaultExpanded
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Real-world data</h3>
          <VariantGrid
            registryName="json-viewer"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "package.json",
                code: `<JsonViewer data={packageJson} title="package.json" rootName="pkg" />`,
                preview: (
                  <JsonViewer
                    data={packageJson}
                    title="package.json"
                    rootName="pkg"
                    defaultExpanded={2}
                  />
                ),
              },
              {
                label: "API list response",
                code: `<JsonViewer data={listResponse} title="Search Results" rootName="data" defaultExpanded={2} />`,
                preview: (
                  <JsonViewer
                    data={nestedArray}
                    title="Search Results"
                    rootName="data"
                    defaultExpanded={2}
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Type coloring</h3>
          <p className="text-sm text-muted-foreground">
            Each JSON type gets a distinct color: strings (green), numbers
            (blue), booleans (amber), null (muted italic), and keys (violet).
          </p>
          <VariantGrid
            registryName="json-viewer"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "All primitive types",
                code: `<JsonViewer data={primitives} title="Type Colors" defaultExpanded />`,
                preview: (
                  <JsonViewer
                    data={primitiveTypes}
                    title="Type Colors"
                    rootName="values"
                    defaultExpanded
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Primitive root values</h3>
          <p className="text-sm text-muted-foreground">
            Works with non-object root values too — strings, numbers, booleans,
            and null render inline.
          </p>
          <VariantGrid
            registryName="json-viewer"
            files={sourceFiles}
            columns={2}
            items={[
              {
                label: "String",
                code: `<JsonViewer data="hello world" rootName="message" />`,
                preview: (
                  <JsonViewer data={"hello world"} rootName="message" />
                ),
              },
              {
                label: "Number",
                code: `<JsonViewer data={42} rootName="count" />`,
                preview: <JsonViewer data={42} rootName="count" />,
              },
              {
                label: "Boolean",
                code: `<JsonViewer data={true} rootName="active" />`,
                preview: <JsonViewer data={true} rootName="active" />,
              },
              {
                label: "Null",
                code: `<JsonViewer data={null} rootName="result" />`,
                preview: <JsonViewer data={null} rootName="result" />,
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
            colorTheme
          </code>{" "}
          prop with any shiki theme name to apply editor-style coloring. All{" "}
          <Link
            href="/docs/themes"
            className="underline hover:text-foreground"
          >
            65 bundled shiki themes
          </Link>{" "}
          are supported. When omitted, the viewer uses your site&apos;s
          Tailwind theme colors.
        </p>

        <VariantGrid
          registryName="json-viewer"
          files={[...sourceFiles, "registry/json-viewer/lib/themes.ts"]}
          columns={1}
          fullWidth
          items={[
            {
              label: "Dracula",
              code: `<JsonViewer data={data} colorTheme="dracula" />`,
              preview: (
                <JsonViewer
                  data={apiResponse}
                  title="Dracula"
                  rootName="response"
                  colorTheme="dracula"
                  defaultExpanded={2}
                />
              ),
            },
            {
              label: "Nord",
              code: `<JsonViewer data={data} colorTheme="nord" />`,
              preview: (
                <JsonViewer
                  data={apiResponse}
                  title="Nord"
                  rootName="response"
                  colorTheme="nord"
                  defaultExpanded={2}
                />
              ),
            },
            {
              label: "Tokyo Night",
              code: `<JsonViewer data={data} colorTheme="tokyo-night" />`,
              preview: (
                <JsonViewer
                  data={apiResponse}
                  title="Tokyo Night"
                  rootName="response"
                  colorTheme="tokyo-night"
                  defaultExpanded={2}
                />
              ),
            },
            {
              label: "Catppuccin Mocha",
              code: `<JsonViewer data={data} colorTheme="catppuccin-mocha" />`,
              preview: (
                <JsonViewer
                  data={apiResponse}
                  title="Catppuccin Mocha"
                  rootName="response"
                  colorTheme="catppuccin-mocha"
                  defaultExpanded={2}
                />
              ),
            },
            {
              label: "One Dark Pro",
              code: `<JsonViewer data={data} colorTheme="one-dark-pro" />`,
              preview: (
                <JsonViewer
                  data={apiResponse}
                  title="One Dark Pro"
                  rootName="response"
                  colorTheme="one-dark-pro"
                  defaultExpanded={2}
                />
              ),
            },
            {
              label: "GitHub Light",
              code: `<JsonViewer data={data} colorTheme="github-light" />`,
              preview: (
                <JsonViewer
                  data={apiResponse}
                  title="GitHub Light"
                  rootName="response"
                  colorTheme="github-light"
                  defaultExpanded={2}
                />
              ),
            },
          ]}
        />
      </section>

      {/* Features */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Features</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Path copying.</strong> Hover any
            row and click the path icon to copy the JavaScript access path (e.g.{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              response.teams[0].name
            </code>
            ). Handles bracket notation for non-identifier keys.
          </li>
          <li>
            <strong className="text-foreground">Search.</strong> Toggle the
            search bar to filter keys and values. Matching text is highlighted
            inline and non-matching branches are hidden.
          </li>
          <li>
            <strong className="text-foreground">Expand / collapse all.</strong>{" "}
            Toolbar buttons to expand or collapse the entire tree at once.
          </li>
          <li>
            <strong className="text-foreground">Copy JSON.</strong> One-click
            copy of the full JSON with pretty-print formatting.
          </li>
        </ul>
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">API Reference</h2>

        <ApiRefTable
          title="JsonViewer"
          props={[
            {
              name: "data",
              type: "JsonValue",
              required: true,
              description: "Any JSON-serializable value to display.",
              fullType:
                "string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }",
            },
            {
              name: "title",
              type: "string",
              description: "Heading label shown in the toolbar.",
            },
            {
              name: "rootName",
              type: "string",
              description:
                'Label for the root node. Defaults to "root".',
            },
            {
              name: "defaultExpanded",
              type: "number | true",
              description:
                "Depth to expand by default, or true to expand all. Defaults to 1.",
            },
            {
              name: "colorTheme",
              type: "ShikiThemeName | JsonColorTheme",
              description:
                'Editor color theme. Pass a shiki theme name (e.g. "dracula") or a custom palette object. When omitted, uses Tailwind theme colors.',
              fullType:
                'string (any of 65 shiki theme names) | { bg: string; fg: string; key: string; string: string; number: string; boolean: string; null: string; punctuation: string }',
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
            <strong className="text-foreground">Client component.</strong> Uses{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              &quot;use client&quot;
            </code>{" "}
            for expand/collapse state, search, and clipboard access.
          </li>
          <li>
            <strong className="text-foreground">No virtualization.</strong>{" "}
            Renders all nodes directly. Suitable for typical API payloads (up to
            a few hundred nodes). For very large datasets, consider truncating
            the data before passing it in.
          </li>
          <li>
            <strong className="text-foreground">Search behavior.</strong> When a
            search query is active, the tree auto-expands all nodes and hides
            branches with no matches. Clear the search to restore the previous
            collapse state.
          </li>
          <li>
            <strong className="text-foreground">Path format.</strong> Copied
            paths use JavaScript dot notation for valid identifiers and bracket
            notation for numeric indices or special characters (e.g.{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              root[&quot;special-key&quot;]
            </code>
            ).
          </li>
          <li>
            <strong className="text-foreground">No dependencies.</strong> Only
            requires React, Tailwind, lucide-react, and the{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">cn</code>{" "}
            utility.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
