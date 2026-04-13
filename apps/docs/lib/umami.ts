/**
 * Umami server-side tracking for registry downloads.
 *
 * Sends events to Umami without blocking the response.
 * Requires UMAMI_HOST_URL and UMAMI_WEBSITE_ID env vars.
 */

interface TrackEventOptions {
  name: string
  url?: string
  data?: Record<string, string | number | boolean>
}

const UMAMI_HOST_URL = process.env.UMAMI_HOST_URL
const UMAMI_WEBSITE_ID = process.env.UMAMI_WEBSITE_ID

export async function trackEvent({ name, url, data }: TrackEventOptions): Promise<void> {
  if (!UMAMI_HOST_URL || !UMAMI_WEBSITE_ID) {
    return
  }

  try {
    await fetch(`${UMAMI_HOST_URL}/api/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "jalco-ui/registry",
      },
      body: JSON.stringify({
        type: "event",
        payload: {
          website: UMAMI_WEBSITE_ID,
          hostname: "ui.justinlevine.me",
          url: url ?? "/",
          name,
          data,
        },
      }),
    })
  } catch {
    // Silently fail — don't block registry responses for analytics
  }
}
