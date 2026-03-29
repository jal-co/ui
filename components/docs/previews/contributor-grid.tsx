import { ContributorGrid, ContributorList } from "@/registry/contributor-grid/contributor-grid"
import type { GitHubContributor } from "@/registry/contributor-grid/lib/github"
import { avatar } from "./lib/avatar"

const sampleContributors: GitHubContributor[] = [
  { login: "shadcn", avatarUrl: avatar("SC", 220), profileUrl: "https://github.com/shadcn", contributions: 1243 },
  { login: "haydenbleasel", avatarUrl: avatar("HB", 160), profileUrl: "https://github.com/haydenbleasel", contributions: 847 },
  { login: "leerob", avatarUrl: avatar("LR", 30), profileUrl: "https://github.com/leerob", contributions: 512 },
  { login: "shuding", avatarUrl: avatar("SD", 280), profileUrl: "https://github.com/shuding", contributions: 398 },
  { login: "timneutkens", avatarUrl: avatar("TN", 100), profileUrl: "https://github.com/timneutkens", contributions: 276 },
  { login: "rauchg", avatarUrl: avatar("GR", 350), profileUrl: "https://github.com/rauchg", contributions: 189 },
]

export default async function ContributorGridPreview() {
  return (
    <div className="flex flex-col gap-4">
      <ContributorGrid
        owner="vercel"
        repo="next.js"
        contributors={sampleContributors}
        max={6}
      />
      <ContributorList
        owner="vercel"
        repo="next.js"
        contributors={sampleContributors.slice(0, 4)}
        max={4}
        title="Top Contributors"
      />
    </div>
  )
}
