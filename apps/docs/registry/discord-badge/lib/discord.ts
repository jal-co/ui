/**
 * jalco-ui
 * lib/discord
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Discord widget API client for fetching server metadata (online count, name).
 *
 * The public widget API only exposes online/presence count, not total member
 * count. Total members requires a bot token. Pass `memberCount` manually via
 * the `data` prop if you have it from another source.
 */

export interface DiscordServerData {
  /** Server/guild ID. */
  id: string
  /** Server name. */
  name: string
  /** Instant invite URL (if widget is enabled). */
  instantInvite: string | null
  /** Number of members currently online (from widget API). */
  onlineCount: number
  /** Total member count. Only available if provided manually — the widget API does not expose this. */
  memberCount?: number
}

/**
 * Fetch public metadata for a Discord server using the widget API.
 *
 * - Requires the server to have the widget enabled in Server Settings → Widget.
 * - No API key or bot token required.
 * - Caches the result for 1 hour via Next.js ISR (`next.revalidate`).
 *
 * Returns `null` if the request fails or the widget is disabled.
 */
export async function fetchDiscordServer(
  serverId: string
): Promise<DiscordServerData | null> {
  try {
    const response = await fetch(
      `https://discord.com/api/guilds/${serverId}/widget.json`,
      { next: { revalidate: 3600 } }
    )
    if (!response.ok) return null
    const data = await response.json()

    if (typeof data.name !== "string") return null

    return {
      id: data.id,
      name: data.name,
      instantInvite: data.instant_invite ?? null,
      onlineCount: data.presence_count ?? 0,
    }
  } catch {
    return null
  }
}

/**
 * Format a member count for compact display.
 *
 * - `236000` → `"236K"`
 * - `1500` → `"1.5K"`
 * - `842` → `"842"`
 */
export function formatMemberCount(count: number): string {
  if (count >= 1_000_000) {
    const value = count / 1_000_000
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}M`
  }
  if (count >= 1_000) {
    const value = count / 1_000
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}K`
  }
  return count.toLocaleString("en-US")
}
