import { ActivityGraph } from "@/registry/activity-graph/activity-graph"
import { fetchGitHubContributions } from "@/registry/activity-graph/lib/github"

export default async function ActivityGraphDemo() {
  const contributions = await fetchGitHubContributions("jlevine22")

  return (
    <ActivityGraph data={contributions?.entries ?? []} />
  )
}
