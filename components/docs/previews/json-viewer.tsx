import { JsonViewer } from "@/registry/json-viewer/json-viewer"

const data = {
  status: 200,
  data: {
    user: { name: "Justin", plan: "pro" },
    features: ["registry", "themes"],
  },
}

export default async function Preview() {
  return <JsonViewer data={data} rootName="response" defaultExpanded={1} />
}
