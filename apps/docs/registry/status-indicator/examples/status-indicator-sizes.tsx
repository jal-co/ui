import { StatusIndicator } from "@/registry/status-indicator/status-indicator"

export default function StatusIndicatorSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <StatusIndicator status="operational" size="sm" />
      <StatusIndicator status="operational" size="md" />
      <StatusIndicator status="operational" size="lg" />
    </div>
  )
}
