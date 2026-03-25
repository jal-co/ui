import { DiffViewer } from "@/registry/diff-viewer/diff-viewer"

const oldCode = `function greet(name) {
  return "Hello, " + name
}`

const newCode = `function greet(name: string) {
  return \`Hello, \${name}!\`
}`

export default async function DiffViewerPreview() {
  return (
    <div className="flex flex-col gap-4">
      <DiffViewer
        oldCode={oldCode}
        newCode={newCode}
        oldTitle="greet.ts"
        newTitle="greet.ts"
      />
    </div>
  )
}
