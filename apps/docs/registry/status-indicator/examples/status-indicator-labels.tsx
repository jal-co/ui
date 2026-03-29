import { StatusIndicator } from "@/registry/status-indicator/status-indicator"

export default function StatusIndicatorLabels() {
  return (
    <div className="flex flex-wrap gap-2">
      <StatusIndicator status="operational" label="API" />
      <StatusIndicator status="degraded" label="Database" />
      <StatusIndicator status="maintenance" label="CDN" />
    </div>
  )
}
