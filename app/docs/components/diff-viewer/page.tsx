import type { Metadata } from "next"
import { DiffViewer } from "@/registry/diff-viewer/diff-viewer"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"

export const metadata: Metadata = {
  title: "Diff Viewer",
  description:
    "Code diff viewer with line numbers and add/remove coloring. Supports unified and split layouts.",
}

const sourceFiles = [
  "registry/diff-viewer/diff-viewer.tsx",
  "registry/diff-viewer/diff-viewer-client.tsx",
]

const oldCode = `import { useState } from "react"

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}`

const newCode = `import { useState, useCallback } from "react"

function Counter({ initial = 0 }) {
  const [count, setCount] = useState(initial)

  const increment = useCallback(() => {
    setCount((prev) => prev + 1)
  }, [])

  return (
    <button onClick={increment}>
      Count: {count}
    </button>
  )
}`

const configOld = `{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true
  }
}`

const configNew = `{
  "compilerOptions": {
    "target": "es2022",
    "module": "esnext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true
  }
}`

export default function DiffViewerPage() {
  return (
    <ComponentDocsPage
      title="Diff Viewer"
      description="Code diff viewer with line numbers and add/remove coloring. Supports unified and split layouts."
      registryName="diff-viewer"
      sourceFiles={sourceFiles}
      preview={
        <div className="w-full">
          <DiffViewer
            oldCode={oldCode}
            newCode={newCode}
            oldTitle="counter.tsx"
            newTitle="counter.tsx"
          />
        </div>
      }
      usage={
        <>
          <CodeLine
            code={`import { DiffViewer } from "@/components/diff-viewer"`}
          />
          <CodeLine
            code={`<DiffViewer oldCode={before} newCode={after} />`}
          />
        </>
      }
    >
      {/* Layouts */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Layouts</h2>
        <VariantGrid
          items={[
            {
              label: "Unified",
              preview: (
                <DiffViewer
                  oldCode={configOld}
                  newCode={configNew}
                  layout="unified"
                  oldTitle="tsconfig.json"
                  newTitle="tsconfig.json"
                />
              ),
              code: `<DiffViewer oldCode={before} newCode={after} layout="unified" />`,
            },
            {
              label: "Split",
              preview: (
                <DiffViewer
                  oldCode={configOld}
                  newCode={configNew}
                  layout="split"
                  oldTitle="tsconfig.json"
                  newTitle="tsconfig.json"
                />
              ),
              code: `<DiffViewer oldCode={before} newCode={after} layout="split" />`,
            },
          ]}
          files={sourceFiles}
          columns={1}
          fullWidth
          registryName="diff-viewer"
        />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>
        <VariantGrid
          items={[
            {
              label: "With file headers",
              preview: (
                <DiffViewer
                  oldCode={oldCode}
                  newCode={newCode}
                  oldTitle="counter.tsx"
                  newTitle="counter.tsx"
                />
              ),
              code: `<DiffViewer oldCode={before} newCode={after} oldTitle="counter.tsx" newTitle="counter.tsx" />`,
            },
            {
              label: "No header",
              preview: (
                <DiffViewer
                  oldCode={configOld}
                  newCode={configNew}
                />
              ),
              code: `<DiffViewer oldCode={before} newCode={after} />`,
            },
          ]}
          files={sourceFiles}
          columns={1}
          fullWidth
          registryName="diff-viewer"
        />
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">API Reference</h2>
        <ApiRefTable
          title="DiffViewer"
          props={[
            {
              name: "oldCode",
              type: "string",
              description:
                "Original code string. Used with newCode to compute the diff.",
            },
            {
              name: "newCode",
              type: "string",
              description:
                "Updated code string. Used with oldCode to compute the diff.",
            },
            {
              name: "patch",
              type: "string",
              description:
                "Pre-computed unified diff string. Alternative to oldCode/newCode.",
            },
            {
              name: "layout",
              type: '"unified" | "split"',
              description:
                "Diff display layout. Unified shows a single column, split shows side-by-side.",
            },
            {
              name: "language",
              type: "string",
              description:
                "Shiki language key for syntax highlighting. Plain text when omitted.",
            },
            {
              name: "oldTitle",
              type: "string",
              description: "Label for the old file in the header.",
            },
            {
              name: "newTitle",
              type: "string",
              description: "Label for the new file in the header.",
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
            <strong className="text-foreground">Two input modes.</strong>{" "}
            Pass{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              oldCode
            </code>{" "}
            +{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              newCode
            </code>{" "}
            to compute the diff, or pass a{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              patch
            </code>{" "}
            string if you already have one.
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
