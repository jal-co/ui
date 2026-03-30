import { ActivityGraph } from "@/registry/activity-graph/activity-graph"

export default async function ActivityGraphDemo() {
  const contributions = [
    { date: "2026-01-01", count: 2 },
    { date: "2026-01-02", count: 5 },
    { date: "2026-01-03", count: 12 },
    { date: "2026-01-04", count: 0 },
    { date: "2026-01-05", count: 8 },
    { date: "2026-01-06", count: 4 },
  ]
  
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-muted-foreground italic text-center">
          Note: This example uses static data. Use the fetch helper for real GitHub data.
        </p>
        <ActivityGraph data={contributions} />
      </div>
    </div>
  )
}
