import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"

const props = [
  { name: "variant", type: '"default" | "outline"', description: "Visual style" },
  { name: "size", type: '"sm" | "md" | "lg"', description: "Component size" },
  { name: "disabled", type: "boolean", description: "Disable interaction" },
]

export default async function Preview() {
  return <ApiRefTable title="Component" props={props} />
}
