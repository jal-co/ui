import {
  StatusIndicator,
  type Status,
} from "@/registry/status-indicator/status-indicator"

const allStatuses: Status[] = [
  "operational",
  "degraded",
  "partial-outage",
  "major-outage",
  "maintenance",
  "incident",
  "unknown",
]

export default function StatusIndicatorAll() {
  return (
    <div className="flex flex-wrap gap-2">
      {allStatuses.map((s) => (
        <StatusIndicator key={s} status={s} />
      ))}
    </div>
  )
}
