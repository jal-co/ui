import posthog from "posthog-js"

export function track(event: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && posthog.__loaded) {
    posthog.capture(event, properties)
  }
}

/**
 * Parse referral source from URL params on first visit.
 * Supports: ?ref=, ?via=, ?utm_source=
 * Stores in sessionStorage so it persists across page navigations.
 * Registers as a PostHog super property so it's attached to all events.
 */
export function captureReferralSource() {
  if (typeof window === "undefined") return

  const stored = sessionStorage.getItem("jalco_ref")
  if (stored) {
    if (posthog.__loaded) {
      posthog.register({ referral_source: stored })
    }
    return
  }

  const params = new URLSearchParams(window.location.search)
  const source = params.get("ref") || params.get("via") || params.get("utm_source")

  if (source) {
    sessionStorage.setItem("jalco_ref", source)
    if (posthog.__loaded) {
      posthog.register({ referral_source: source })
      posthog.capture("referral_visit", {
        referral_source: source,
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        landing_page: window.location.pathname,
      })
    }
  }
}
