import { CommitGraph } from "@/registry/commit-graph/commit-graph"

function avatar(initials: string, hue: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="hsl(${hue},45%,55%)" rx="40"/><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="system-ui,sans-serif" font-size="32" font-weight="600">${initials}</text></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const commits = [
  { hash: "a1b2c3d", message: "feat(auth): add OAuth2 support", author: { name: "Sarah Chen", avatarUrl: avatar("SC", 220) }, date: new Date(Date.now() - 2 * 3600_000).toISOString(), parents: ["m1e2r3g"], refs: ["main"], tag: "v2.1.0" },
  { hash: "m1e2r3g", message: "Merge branch 'feat/dashboard' into main", author: { name: "Sarah Chen", avatarUrl: avatar("SC", 220) }, date: new Date(Date.now() - 6 * 3600_000).toISOString(), parents: ["f6e5d4c", "d4a5s6h"], refs: ["main"] },
  { hash: "d4a5s6h", message: "feat: add analytics chart component", author: { name: "Jordan Lee", avatarUrl: avatar("JL", 30) }, date: new Date(Date.now() - 8 * 3600_000).toISOString(), parents: ["w1i2p3"], refs: ["feat/dashboard"] },
  { hash: "f6e5d4c", message: "fix(api): handle rate limit headers", author: { name: "Alex Rivera", avatarUrl: avatar("AR", 350) }, date: new Date(Date.now() - 18 * 3600_000).toISOString(), parents: ["4d5e6f1"] },
  { hash: "w1i2p3", message: "wip: dashboard layout skeleton", author: { name: "Jordan Lee", avatarUrl: avatar("JL", 30) }, date: new Date(Date.now() - 2 * 86400_000).toISOString(), parents: ["4d5e6f1"] },
  { hash: "4d5e6f1", message: "chore(deps): upgrade next to 15.5", author: { name: "Sarah Chen", avatarUrl: avatar("SC", 220) }, date: new Date(Date.now() - 5 * 86400_000).toISOString(), parents: ["0a1b2c3"], tag: "v2.0.0" },
  { hash: "0a1b2c3", message: "Initial commit", author: { name: "Sarah Chen", avatarUrl: avatar("SC", 220) }, date: new Date(Date.now() - 14 * 86400_000).toISOString(), parents: [] },
]

export default async function CommitGraphPreview() {
  return <CommitGraph commits={commits} />
}
