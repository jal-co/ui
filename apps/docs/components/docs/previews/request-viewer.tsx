import { RequestViewer } from "@/registry/request-viewer/request-viewer"

const request = {
  method: "GET" as const,
  url: "https://api.example.com/users",
  status: 200,
  duration: 142,
  headers: { "content-type": "application/json", authorization: "Bearer ****" },
  response: { users: [{ id: 1, name: "Justin" }] },
}

export default async function Preview() {
  return <RequestViewer request={request} />
}
