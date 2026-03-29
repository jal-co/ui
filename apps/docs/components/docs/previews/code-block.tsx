import { CodeBlock } from "@/registry/code-block/code-block"

const code = `const schema = z.object({
  name: z.string(),
  email: z.string().email(),
})`

export default async function Preview() {
  return <CodeBlock code={code} language="ts" />
}
