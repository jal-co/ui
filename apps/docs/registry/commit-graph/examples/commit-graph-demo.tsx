import { CommitGraph } from "@/registry/commit-graph/commit-graph"

const commits = [
  { hash: "a1b2c3d", message: "feat(auth): add OAuth2 support", author: { name: "Sarah Chen" }, date: new Date(Date.now() - 2 * 3600_000).toISOString(), parents: ["m1e2r3g"], refs: ["main", "HEAD"], tag: "v2.1.0" },
  { hash: "m1e2r3g", message: "Merge branch 'feat/dashboard' into main", author: { name: "Sarah Chen" }, date: new Date(Date.now() - 6 * 3600_000).toISOString(), parents: ["f6e5d4c", "d4a5s6h"] },
  { hash: "d4a5s6h", message: "feat: add analytics chart component", author: { name: "Jordan Lee" }, date: new Date(Date.now() - 8 * 3600_000).toISOString(), parents: ["w1i2p3"], refs: ["feat/dashboard"] },
  { hash: "f6e5d4c", message: "fix(api): handle rate limit headers", author: { name: "Alex Rivera" }, date: new Date(Date.now() - 18 * 3600_000).toISOString(), parents: ["4d5e6f1"] },
  { hash: "w1i2p3", message: "wip: dashboard layout skeleton", author: { name: "Jordan Lee" }, date: new Date(Date.now() - 2 * 86400_000).toISOString(), parents: ["4d5e6f1"] },
  { hash: "4d5e6f1", message: "chore(deps): upgrade next to 15.5", author: { name: "Sarah Chen" }, date: new Date(Date.now() - 5 * 86400_000).toISOString(), parents: ["0a1b2c3"], tag: "v2.0.0" },
  { hash: "0a1b2c3", message: "Initial commit", author: { name: "Sarah Chen" }, date: new Date(Date.now() - 14 * 86400_000).toISOString(), parents: [] },
]

export default function CommitGraphDemo() {
  return <CommitGraph commits={commits} />
}
