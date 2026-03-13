import { NpmBadge } from "@/registry/npm-badge/npm-badge"

export default async function Preview() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <NpmBadge package="react" variant="default" />
        <NpmBadge package="react" variant="primary" />
        <NpmBadge package="react" variant="secondary" />
        <NpmBadge package="react" variant="outline" />
        <NpmBadge package="next" variant="subtle" iconStyle="npm" />
      </div>
      <NpmBadge package="next" layout="row" variant="outline" iconStyle="npm" />
      <NpmBadge
        package="react"
        layout="card"
        className="w-full max-w-xs"
      />
    </div>
  )
}
