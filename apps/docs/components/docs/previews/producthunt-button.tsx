import { ProductHuntButton } from "@/registry/producthunt-button/producthunt-button"

export default async function Preview() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <ProductHuntButton slug="notion" upvotes={12843} name="Notion" variant="default" />
        <ProductHuntButton slug="notion" upvotes={12843} name="Notion" variant="producthunt" />
        <ProductHuntButton slug="notion" upvotes={12843} name="Notion" variant="primary" />
        <ProductHuntButton slug="notion" upvotes={12843} name="Notion" variant="outline" />
        <ProductHuntButton slug="notion" upvotes={12843} name="Notion" variant="ghost" />
        <ProductHuntButton slug="notion" upvotes={12843} name="Notion" variant="subtle" />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <ProductHuntButton slug="notion" upvotes={12843} name="Notion" variant="producthunt" showName iconStyle="brand" />
        <ProductHuntButton slug="notion" upvotes={12843} name="Notion" variant="outline" showName />
      </div>
      <ProductHuntButton
        slug="notion"
        upvotes={12843}
        name="Notion"
        tagline="The all-in-one workspace for notes, tasks, and wikis"
        layout="card"
        className="w-full max-w-xs"
      />
    </div>
  )
}
