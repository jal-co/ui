import { CodeLine } from "@/registry/code-line/code-line"

export default async function Preview() {
  return <CodeLine code={`import { Button } from "@/components/ui/button"`} />
}
