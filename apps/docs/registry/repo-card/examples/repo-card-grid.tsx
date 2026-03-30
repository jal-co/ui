import { RepoCard } from "@/registry/repo-card/repo-card"

export default async function RepoCardGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <RepoCard owner="vercel" repo="next.js" className="w-full" />
      <RepoCard owner="facebook" repo="react" className="w-full" />
      <RepoCard owner="tailwindlabs" repo="tailwindcss" className="w-full" />
      <RepoCard owner="shadcn-ui" repo="ui" className="w-full" />
    </div>
  )
}
