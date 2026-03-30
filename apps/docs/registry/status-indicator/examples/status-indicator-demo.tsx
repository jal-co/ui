import { StatusIndicator } from "@/registry/status-indicator/status-indicator"

export default function StatusIndicatorDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <StatusIndicator status="operational" />
      <StatusIndicator status="degraded" />
      <StatusIndicator status="major-outage" />
      <StatusIndicator status="maintenance" />
    </div>
  )
}
