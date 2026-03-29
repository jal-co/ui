import { StatusIndicator, type Status } from "@/registry/status-indicator/status-indicator"

const statuses: Status[] = [
  "operational",
  "degraded",
  "partial-outage",
  "major-outage",
  "maintenance",
  "incident",
  "unknown",
]

export default async function StatusIndicatorPreview() {
  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <StatusIndicator key={status} status={status} />
      ))}
    </div>
  )
}
