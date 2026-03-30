import { generateOGImage } from "fumadocs-ui/og"
import { source } from "@/lib/source"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return source.generateParams().map((params) => ({
    slug: params.slug,
  }))
}

export async function GET(
  request: Request,
  props: { params: Promise<{ slug: string[] }> }
) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return generateOGImage({
    primaryColor: "hsl(210 40% 98%)",
    primaryTextColor: "rgb(255, 255, 255)",
    title: page.data.title,
    description: page.data.description,
    site: "jalco-ui",
  })
}
