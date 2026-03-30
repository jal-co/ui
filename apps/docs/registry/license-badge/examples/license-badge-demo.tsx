import { LicenseBadge } from "@/registry/license-badge/license-badge"

export default function LicenseBadgeDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <LicenseBadge license="MIT" />
      <LicenseBadge license="Apache-2.0" layout="row" />
      <LicenseBadge license="GPL-3.0" layout="card" className="w-full max-w-sm" />
    </div>
  )
}
