import { LicenseBadge } from "@/registry/license-badge/license-badge"

export default async function Preview() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <LicenseBadge license="MIT" variant="default" />
        <LicenseBadge license="Apache-2.0" variant="outline" />
        <LicenseBadge license="GPL-3.0" variant="secondary" showCategory />
        <LicenseBadge license="Unlicense" variant="subtle" />
      </div>
      <LicenseBadge license="MIT" layout="row" variant="outline" />
      <LicenseBadge
        license="Apache-2.0"
        layout="card"
        className="w-full max-w-xs"
      />
    </div>
  )
}
