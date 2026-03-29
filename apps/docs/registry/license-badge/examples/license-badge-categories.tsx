import { LicenseBadge } from "@/registry/license-badge/license-badge"

export default function LicenseBadgeCategories() {
  return (
    <div className="flex flex-wrap gap-3">
      <LicenseBadge license="MIT" showCategory />
      <LicenseBadge license="GPL-3.0" showCategory />
      <LicenseBadge license="MPL-2.0" showCategory />
      <LicenseBadge license="Unlicense" showCategory />
      <LicenseBadge license="BUSL-1.1" showCategory />
      <LicenseBadge license="AGPL-3.0" showCategory />
    </div>
  )
}
