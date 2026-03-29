import { ContributorGrid, ContributorList } from "@/registry/contributor-grid/contributor-grid"
import type { GitHubContributor } from "@/registry/contributor-grid/lib/github"

const sampleContributors: GitHubContributor[] = [
  { login: "shadcn", avatarUrl: "/avatars/shadcn.png", profileUrl: "https://github.com/shadcn", contributions: 1243 },
  { login: "haydenbleasel", avatarUrl: "/avatars/haydenbleasel.png", profileUrl: "https://github.com/haydenbleasel", contributions: 847 },
  { login: "leerob", avatarUrl: "/avatars/leerob.png", profileUrl: "https://github.com/leerob", contributions: 512 },
  { login: "shuding", avatarUrl: "/avatars/shuding.png", profileUrl: "https://github.com/shuding", contributions: 398 },
  { login: "timneutkens", avatarUrl: "/avatars/timneutkens.png", profileUrl: "https://github.com/timneutkens", contributions: 276 },
  { login: "rauchg", avatarUrl: "/avatars/rauchg.png", profileUrl: "https://github.com/rauchg", contributions: 189 },
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
