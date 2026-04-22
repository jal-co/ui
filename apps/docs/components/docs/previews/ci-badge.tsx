import { CIBadge } from "@/registry/ci-badge/ci-badge"
import type { CIStatusData } from "@/registry/ci-badge/lib/github"

const passing: CIStatusData = {
  workflowName: "CI",
  status: "success",
  url: "https://github.com/vercel/next.js/actions",
  branch: "main",
  startedAt: new Date(Date.now() - 1_800_000).toISOString(),
  durationSeconds: 142,
}

const failing: CIStatusData = {
  ...passing,
  workflowName: "Deploy",
  status: "failure",
  durationSeconds: 38,
}

const pending: CIStatusData = {
  ...passing,
  workflowName: "Tests",
  status: "pending",
  durationSeconds: null,
}

export default async function Preview() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <CIBadge owner="vercel" repo="next.js" data={passing} showWorkflow />
        <CIBadge owner="vercel" repo="next.js" data={failing} showWorkflow />
        <CIBadge owner="vercel" repo="next.js" data={pending} showWorkflow />
      </div>
      <CIBadge
        owner="vercel"
        repo="next.js"
        data={passing}
        layout="card"
        className="w-full max-w-xs"
      />
    </div>
  )
}
