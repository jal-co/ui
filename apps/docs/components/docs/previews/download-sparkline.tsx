import { DownloadSparkline } from "@/registry/download-sparkline/download-sparkline"
import type { NpmDownloadPoint } from "@/registry/download-sparkline/lib/npm"

function generateSampleData(days: number, base: number, trend: number): NpmDownloadPoint[] {
  const points: NpmDownloadPoint[] = []
  const now = Date.now()
  for (let i = 0; i < days; i++) {
    const date = new Date(now - (days - 1 - i) * 86_400_000)
    const noise = Math.sin(i * 0.8) * base * 0.15 + (Math.random() - 0.5) * base * 0.1
    points.push({
      day: date.toISOString().slice(0, 10),
      downloads: Math.max(0, Math.round(base + i * trend + noise)),
    })
  }
  return points
}

const trendingUp = generateSampleData(30, 45_000, 600)
const steady = generateSampleData(30, 120_000, 0)
const weekly = generateSampleData(7, 8_000, 200)

export default async function Preview() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-8">
        <DownloadSparkline package="react" data={trendingUp} showLabel showTrend color="var(--color-foreground)" />
        <DownloadSparkline package="next" data={steady} variant="area" showLabel showTrend showBaseline color="var(--color-foreground)" />
        <DownloadSparkline package="zod" data={weekly} variant="bar" showLabel showDateRange color="var(--color-foreground)" />
      </div>
    </div>
  )
}
