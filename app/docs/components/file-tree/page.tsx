import type { Metadata } from "next"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"
import { FileTree, type FileTreeNode } from "@/registry/file-tree/file-tree"

export const metadata: Metadata = {
  title: "File Tree",
  description:
    "Collapsible file and folder tree with file-type icons, highlights, and configurable expand state.",
}

const sourceFiles = ["registry/file-tree/file-tree.tsx"]

const nextjsTree: FileTreeNode[] = [
  {
    name: "src",
    children: [
      {
        name: "app",
        children: [
          { name: "layout.tsx" },
          { name: "page.tsx" },
          {
            name: "api",
            children: [{ name: "route.ts" }],
          },
        ],
      },
      {
        name: "components",
        children: [
          { name: "header.tsx" },
          { name: "footer.tsx" },
        ],
      },
      {
        name: "lib",
        children: [{ name: "utils.ts" }],
      },
    ],
  },
  { name: "package.json" },
  { name: "tsconfig.json" },
  { name: "next.config.ts" },
  { name: ".env.local" },
]

const monorepoTree: FileTreeNode[] = [
  {
    name: "apps",
    children: [
      {
        name: "web",
        children: [
          {
            name: "src",
            children: [
              { name: "index.tsx" },
              { name: "App.tsx" },
            ],
          },
          { name: "package.json" },
        ],
      },
      {
        name: "docs",
        children: [
          { name: "index.mdx" },
          { name: "getting-started.mdx" },
          { name: "package.json" },
        ],
      },
    ],
  },
  {
    name: "packages",
    children: [
      {
        name: "ui",
        children: [
          { name: "button.tsx" },
          { name: "input.tsx" },
          { name: "index.ts" },
          { name: "package.json" },
        ],
      },
      {
        name: "config",
        children: [
          { name: "eslint.js" },
          { name: "tsconfig.json" },
        ],
      },
    ],
  },
  { name: "pnpm-workspace.yaml" },
  { name: "package.json" },
  { name: "turbo.json" },
]

const smallTree: FileTreeNode[] = [
  {
    name: "src",
    children: [
      { name: "index.ts" },
      { name: "config.ts" },
      {
        name: "utils",
        children: [
          { name: "helpers.ts" },
          { name: "format.ts" },
        ],
      },
    ],
  },
  { name: "package.json" },
  { name: "README.md" },
]

export default function FileTreePage() {
  return (
    <ComponentDocsPage
      title="File Tree"
      description="Collapsible file and folder tree with file-type icons, highlights, and configurable expand state. Designed for project structure docs, README displays, and dev-tool file explorers."
      registryName="file-tree"
      sourceFiles={sourceFiles}
      preview={
        <div className="max-w-sm">
          <FileTree
            tree={nextjsTree}
            iconStyle="colored"
            highlight={["src/app/page.tsx"]}
          />
        </div>
      }
      usage={
        <>
          <CodeLine
            code={`import { FileTree, type FileTreeNode } from "@/components/file-tree"`}
          />
          <CodeLine
            code={`const tree: FileTreeNode[] = [
  {
    name: "src",
    children: [
      { name: "index.ts" },
      { name: "utils.ts" },
    ],
  },
  { name: "package.json" },
]

<FileTree tree={tree} />`}
          />
          <p className="text-sm text-muted-foreground">
            Pass a nested array of{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              FileTreeNode
            </code>{" "}
            objects. Folders have a{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              children
            </code>{" "}
            array. Client component — expand/collapse requires local state.
          </p>
        </>
      }
    >
      {/* Examples */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Icon styles</h3>
          <p className="text-sm text-muted-foreground">
            Use{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              iconStyle
            </code>{" "}
            to switch between generic icons and file-type-colored icons.
          </p>
          <VariantGrid
            registryName="file-tree"
            files={sourceFiles}
            columns={2}
            items={[
              {
                label: "Minimal (default)",
                code: `<FileTree tree={tree} iconStyle="minimal" />`,
                preview: (
                  <FileTree tree={smallTree} iconStyle="minimal" />
                ),
              },
              {
                label: "Colored",
                code: `<FileTree tree={tree} iconStyle="colored" />`,
                preview: (
                  <FileTree tree={smallTree} iconStyle="colored" />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Highlighted files</h3>
          <p className="text-sm text-muted-foreground">
            Pass an array of full paths to{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              highlight
            </code>{" "}
            to draw attention to specific files.
          </p>
          <VariantGrid
            registryName="file-tree"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Single file highlighted",
                code: `<FileTree
  tree={tree}
  iconStyle="colored"
  highlight={["src/app/page.tsx"]}
/>`,
                preview: (
                  <div className="max-w-sm">
                    <FileTree
                      tree={nextjsTree}
                      iconStyle="colored"
                      highlight={["src/app/page.tsx"]}
                    />
                  </div>
                ),
              },
              {
                label: "Multiple files highlighted",
                code: `<FileTree
  tree={tree}
  iconStyle="colored"
  highlight={["src/components/header.tsx", "src/lib/utils.ts", ".env.local"]}
/>`,
                preview: (
                  <div className="max-w-sm">
                    <FileTree
                      tree={nextjsTree}
                      iconStyle="colored"
                      highlight={[
                        "src/components/header.tsx",
                        "src/lib/utils.ts",
                        ".env.local",
                      ]}
                    />
                  </div>
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Expand state</h3>
          <p className="text-sm text-muted-foreground">
            Control which folders are expanded on mount with{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              defaultExpanded
            </code>
            .
          </p>
          <VariantGrid
            registryName="file-tree"
            files={sourceFiles}
            columns={2}
            items={[
              {
                label: "All expanded (default)",
                code: `<FileTree tree={tree} defaultExpanded={true} />`,
                preview: (
                  <FileTree tree={smallTree} defaultExpanded={true} />
                ),
              },
              {
                label: "All collapsed",
                code: `<FileTree tree={tree} defaultExpanded={false} />`,
                preview: (
                  <FileTree tree={smallTree} defaultExpanded={false} />
                ),
              },
              {
                label: "Specific paths expanded",
                code: `<FileTree
  tree={tree}
  defaultExpanded={["src", "src/utils"]}
/>`,
                preview: (
                  <FileTree
                    tree={smallTree}
                    defaultExpanded={["src", "src/utils"]}
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Monorepo structure</h3>
          <p className="text-sm text-muted-foreground">
            Larger trees with deeply nested folders work naturally with the
            expand/collapse interaction.
          </p>
          <VariantGrid
            registryName="file-tree"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Turborepo monorepo",
                code: `<FileTree tree={monorepoTree} iconStyle="colored" />`,
                preview: (
                  <div className="max-w-md">
                    <FileTree tree={monorepoTree} iconStyle="colored" />
                  </div>
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
          title="FileTree"
          props={[
            {
              name: "tree",
              type: "FileTreeNode[]",
              required: true,
              description:
                "Array of file/folder entries. Folders have a children array.",
            },
            {
              name: "defaultExpanded",
              type: 'boolean | string[]',
              description:
                'Expand all (true), none (false), or specific paths. Defaults to true.',
            },
            {
              name: "iconStyle",
              type: '"minimal" | "colored"',
              description:
                'Generic file/folder icons or language-specific colored icons. Defaults to "minimal".',
            },
            {
              name: "highlight",
              type: "string[]",
              description:
                'Array of full paths to highlight (e.g. ["src/index.ts"]).',
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes on the root element.",
            },
          ]}
        />

        <ApiRefTable
          title="FileTreeNode"
          props={[
            {
              name: "name",
              type: "string",
              required: true,
              description: "File or folder name.",
            },
            {
              name: "children",
              type: "FileTreeNode[]",
              description:
                "Nested entries. Presence of children makes the node a folder.",
            },
          ]}
        />
      </section>

      {/* Notes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Client component.</strong>{" "}
            Uses{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              &quot;use client&quot;
            </code>{" "}
            for expand/collapse state. No external dependencies beyond React
            and Tailwind.
          </li>
          <li>
            <strong className="text-foreground">Highlight paths.</strong>{" "}
            Paths are built by joining node names with{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">/</code>{" "}
            from the root (e.g.{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              src/app/page.tsx
            </code>
            ). They do not include a leading slash.
          </li>
          <li>
            <strong className="text-foreground">Colored icons.</strong>{" "}
            The colored icon style includes built-in coverage for common file
            types (TypeScript, JavaScript, JSON, CSS, Markdown, Python, Rust,
            Go, and more). Unrecognized extensions fall back to the generic
            file icon.
          </li>
          <li>
            <strong className="text-foreground">Accessibility.</strong>{" "}
            Uses{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              role=&quot;tree&quot;
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              role=&quot;treeitem&quot;
            </code>
            , and{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              aria-expanded
            </code>{" "}
            for screen reader compatibility.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
