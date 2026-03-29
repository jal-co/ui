import { LogViewerMinimal } from "@/registry/log-viewer/log-viewer"

const entries = [
  { timestamp: "12:00:01", level: "info" as const, message: "Server started on :3000" },
  { timestamp: "12:00:02", level: "info" as const, message: "Connected to database" },
  { timestamp: "12:00:03", level: "warn" as const, message: "Rate limit approaching" },
  { timestamp: "12:00:04", level: "error" as const, message: "Failed to fetch /api/users" },
]

export default async function Preview() {
  return <LogViewerMinimal entries={entries} maxHeight={160} />
}
