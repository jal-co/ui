import { RepoCard } from "@/registry/repo-card/repo-card"

export default async function Preview() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <RepoCard owner="shadcn-ui" repo="ui" className="w-full" />
      <RepoCard
        owner="vercel"
        repo="next.js"
        variant="outline"
        className="w-full"
      />
    </div>
  )
}
