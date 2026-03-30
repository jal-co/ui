import { CommitGraph } from "@/registry/commit-graph/commit-graph"

const commits = [
  { hash: "abc1234", message: "fix: resolve login redirect loop", author: { name: "Alex Rivera" }, date: new Date(Date.now() - 3 * 3600_000).toISOString(), parents: ["def5678"], refs: ["main"] },
  { hash: "def5678", message: "docs: update API reference", author: { name: "Taylor Kim" }, date: new Date(Date.now() - 12 * 3600_000).toISOString(), parents: ["ghi9012"] },
  { hash: "ghi9012", message: "feat: add dark mode toggle", author: { name: "Sarah Chen" }, date: new Date(Date.now() - 2 * 86400_000).toISOString(), parents: ["jkl3456"], tag: "v1.2.0" },
  { hash: "jkl3456", message: "Initial commit", author: { name: "Sarah Chen" }, date: new Date(Date.now() - 7 * 86400_000).toISOString(), parents: [] },
]

export default function CommitGraphLinear() {
  return <CommitGraph commits={commits} />
}
