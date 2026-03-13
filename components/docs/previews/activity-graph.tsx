import { ActivityGraph, type ActivityEntry } from "@/registry/activity-graph/activity-graph"

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return s / 2147483647
  }
}

function generateActivityData(): ActivityEntry[] {
  const rand = seededRandom(42)
  const entries: ActivityEntry[] = []
  const today = new Date("2026-03-11")
  for (let i = 90; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    if (rand() < 0.5) {
      entries.push({
        date: d.toISOString().slice(0, 10),
        count: Math.floor(rand() * 8) + 1,
      })
    }
  }
  return entries
}

const data = generateActivityData()

export default async function Preview() {
  return <ActivityGraph data={data} />
}
