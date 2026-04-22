import { ReleaseBadge } from "@/registry/release-badge/release-badge"
import type { GitHubReleaseData } from "@/registry/release-badge/lib/github"

const sampleRelease: GitHubReleaseData = {
  tag: "v15.3.1",
  name: "Next.js 15.3.1",
  preRelease: false,
  draft: false,
  publishedAt: new Date(Date.now() - 3 * 86_400_000).toISOString(),
  url: "https://github.com/vercel/next.js/releases/latest",
  body: null,
  assetCount: 0,
}

const preRelease: GitHubReleaseData = {
  ...sampleRelease,
  tag: "v16.0.0-canary.1",
  name: "Next.js 16 Canary",
  preRelease: true,
}

export default async function Preview() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <ReleaseBadge owner="vercel" repo="next.js" data={sampleRelease} variant="default" />
        <ReleaseBadge owner="vercel" repo="next.js" data={sampleRelease} variant="primary" />
        <ReleaseBadge owner="vercel" repo="next.js" data={sampleRelease} variant="outline" />
        <ReleaseBadge owner="vercel" repo="next.js" data={preRelease} variant="subtle" />
      </div>
      <ReleaseBadge owner="vercel" repo="next.js" data={sampleRelease} layout="row" variant="outline" />
      <ReleaseBadge
        owner="vercel"
        repo="next.js"
        data={sampleRelease}
        layout="card"
        className="w-full max-w-xs"
      />
    </div>
  )
}
