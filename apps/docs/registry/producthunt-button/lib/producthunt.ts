/**
 * jalco-ui
 * lib/producthunt
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Product Hunt API client for fetching post metadata (upvotes, name, tagline).
 */

export interface ProductHuntPost {
  /** Post display name. */
  name: string
  /** Short tagline describing the product. */
  tagline: string
  /** Number of upvotes. */
  upvotes: number
  /** Product Hunt URL for the post. */
  url: string
  /** URL slug (e.g. "my-awesome-product"). */
  slug: string
}

/**
 * Fetch public metadata for a Product Hunt post.
 *
 * - Uses the Product Hunt GraphQL API v2.
 * - Requires `process.env.PRODUCTHUNT_TOKEN` (developer token).
 * - Caches the result for 1 hour via Next.js ISR (`next.revalidate`).
 *
 * Get a token at https://www.producthunt.com/v2/oauth/applications
 *
 * Returns `null` if the request fails, the token is missing, or the post
 * doesn't exist.
 */
export async function fetchProductHuntPost(
  slug: string
): Promise<ProductHuntPost | null> {
  const token = process.env.PRODUCTHUNT_TOKEN
  if (!token) return null

  try {
    const response = await fetch("https://api.producthunt.com/v2/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query GetPost($slug: String!) {
            post(slug: $slug) {
              name
              tagline
              votesCount
              url
              slug
            }
          }
        `,
        variables: { slug },
      }),
      next: { revalidate: 3600 },
    })

    if (!response.ok) return null

    const json = await response.json()
    const post = json?.data?.post
    if (!post || typeof post.name !== "string") return null

    return {
      name: post.name,
      tagline: post.tagline ?? "",
      upvotes: post.votesCount ?? 0,
      url: post.url ?? `https://www.producthunt.com/posts/${slug}`,
      slug: post.slug ?? slug,
    }
  } catch {
    return null
  }
}

/**
 * Format a number for compact display.
 *
 * - `1500` → `"1.5k"`
 * - `236000` → `"236k"`
 * - `842` → `"842"`
 */
export function formatCount(count: number): string {
  if (count >= 1_000_000) {
    const value = count / 1_000_000
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}m`
  }
  if (count >= 1_000) {
    const value = count / 1_000
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}k`
  }
  return count.toLocaleString("en-US")
}
