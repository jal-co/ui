import { GitHubButtonGroup } from "@/registry/github-button-group/github-button-group"

export default async function Preview() {
  return (
    <div className="flex flex-col items-center gap-5">
      <GitHubButtonGroup owner="shadcn-ui" repo="ui" variant="default" />
      <GitHubButtonGroup owner="shadcn-ui" repo="ui" variant="secondary" />
      <GitHubButtonGroup owner="shadcn-ui" repo="ui" variant="outline" />
      <GitHubButtonGroup owner="shadcn-ui" repo="ui" variant="ghost" />
      <GitHubButtonGroup owner="shadcn-ui" repo="ui" variant="subtle" />
    </div>
  )
}
