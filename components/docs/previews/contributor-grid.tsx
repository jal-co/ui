import { ContributorGrid, ContributorList } from "@/registry/contributor-grid/contributor-grid"
import type { GitHubContributor } from "@/registry/contributor-grid/lib/github"

const sampleContributors: GitHubContributor[] = [
  { login: "shadcn", avatarUrl: "https://github.com/shadcn.png?", profileUrl: "https://github.com/shadcn", contributions: 1243 },
  { login: "haydenbleasel", avatarUrl: "https://github.com/haydenbleasel.png?", profileUrl: "https://github.com/haydenbleasel", contributions: 847 },
  { login: "leerob", avatarUrl: "https://github.com/leerob.png?", profileUrl: "https://github.com/leerob", contributions: 512 },
  { login: "shuding", avatarUrl: "https://github.com/shuding.png?", profileUrl: "https://github.com/shuding", contributions: 398 },
  { login: "timneutkens", avatarUrl: "https://github.com/timneutkens.png?", profileUrl: "https://github.com/timneutkens", contributions: 276 },
  { login: "rauchg", avatarUrl: "https://github.com/rauchg.png?", profileUrl: "https://github.com/rauchg", contributions: 189 },
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
