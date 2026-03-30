import {
  StatusIndicator,
  type Status,
} from "@/registry/status-indicator/status-indicator"

const services: { name: string; status: Status }[] = [
  { name: "API", status: "operational" },
  { name: "Database", status: "operational" },
  { name: "CDN", status: "degraded" },
  { name: "Search", status: "maintenance" },
]

export default function StatusIndicatorComposed() {
  return (
    <div className="flex flex-col divide-y divide-border/40 rounded-xl border border-border/60 bg-card shadow-sm">
      {services.map(({ name, status }) => (
        <div
          key={name}
          className="flex items-center justify-between px-4 py-3"
        >
          <span className="text-sm font-medium text-foreground">{name}</span>
          <StatusIndicator status={status} size="sm" />
        </div>
      ))}
    </div>
  )
}
