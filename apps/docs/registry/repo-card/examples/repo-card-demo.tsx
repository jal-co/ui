import { RepoCard } from "@/registry/repo-card/repo-card"

export default async function RepoCardDemo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <RepoCard owner="shadcn-ui" repo="ui" />
      <RepoCard owner="vercel" repo="next.js" variant="outline" />
    </div>
  )
}
