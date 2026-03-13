import { GitHubStarsButton } from "@/registry/github-stars-button/github-stars-button"

export default async function Preview() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <GitHubStarsButton owner="shadcn-ui" repo="ui" variant="default" />
        <GitHubStarsButton owner="shadcn-ui" repo="ui" variant="primary" />
        <GitHubStarsButton owner="shadcn-ui" repo="ui" variant="secondary" />
        <GitHubStarsButton owner="shadcn-ui" repo="ui" variant="outline" />
        <GitHubStarsButton owner="shadcn-ui" repo="ui" variant="ghost" />
        <GitHubStarsButton owner="shadcn-ui" repo="ui" variant="subtle" />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <GitHubStarsButton owner="shadcn-ui" repo="ui" variant="primary" size="sm" />
        <GitHubStarsButton owner="shadcn-ui" repo="ui" variant="primary" size="default" />
        <GitHubStarsButton owner="shadcn-ui" repo="ui" variant="primary" size="lg" />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <GitHubStarsButton owner="shadcn-ui" repo="ui" variant="outline" showRepo />
        <GitHubStarsButton owner="shadcn-ui" repo="ui" variant="primary" showRepo iconStyle="copilot" />
      </div>
    </div>
  )
}
