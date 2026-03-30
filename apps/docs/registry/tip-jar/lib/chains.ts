export type ChainId =
  | "ethereum"
  | "bitcoin"
  | "solana"
  | "polygon"
  | "base"
  | "arbitrum"
  | "optimism"
  | "avalanche"
  | "bnb"
  | "litecoin"

export type PlatformId =
  | "paypal"
  | "kofi"
  | "patreon"

export type ProviderId = ChainId | PlatformId

export type ProviderKind = "chain" | "platform"

export interface ProviderConfig {
  /** Display name shown in the UI. */
  name: string
  /** Whether this is a crypto chain or a web platform. */
  kind: ProviderKind
  /** Short symbol for badge display (e.g. "ETH", "PayPal"). */
  symbol: string
  /** Tailwind color classes for the provider badge. */
  badgeClass: string
  /** Build a QR-encodable URI or URL from address/handle, optional amount, and optional token. */
  buildUri: (address: string, amount?: number, token?: string) => string
  /** Build an external link URL. Explorer for chains, profile/donate page for platforms. */
  externalUrl: (address: string) => string
  /** Label for the external link button. */
  externalLabel: string
}

export const providers: Record<ProviderId, ProviderConfig> = {
  ethereum: {
    name: "Ethereum",
    kind: "chain",
    symbol: "ETH",
    badgeClass: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
    buildUri: (address, amount, token) => {
      const base = token ? `ethereum:${address}@1` : `ethereum:${address}`
      const params = new URLSearchParams()
      if (amount) params.set("value", String(amount))
      const qs = params.toString()
      return qs ? `${base}?${qs}` : base
    },
    externalUrl: (address) => `https://etherscan.io/address/${address}`,
    externalLabel: "Explorer",
  },
  bitcoin: {
    name: "Bitcoin",
    kind: "chain",
    symbol: "BTC",
    badgeClass: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
    buildUri: (address, amount) => {
      const params = new URLSearchParams()
      if (amount) params.set("amount", String(amount))
      const qs = params.toString()
      return qs ? `bitcoin:${address}?${qs}` : `bitcoin:${address}`
    },
    externalUrl: (address) => `https://mempool.space/address/${address}`,
    externalLabel: "Explorer",
  },
  solana: {
    name: "Solana",
    kind: "chain",
    symbol: "SOL",
    badgeClass: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
    buildUri: (address, amount) => {
      const params = new URLSearchParams()
      if (amount) params.set("amount", String(amount))
      const qs = params.toString()
      return qs ? `solana:${address}?${qs}` : `solana:${address}`
    },
    externalUrl: (address) => `https://explorer.solana.com/address/${address}`,
    externalLabel: "Explorer",
  },
  polygon: {
    name: "Polygon",
    kind: "chain",
    symbol: "MATIC",
    badgeClass: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
    buildUri: (address, amount) => {
      const base = `ethereum:${address}@137`
      const params = new URLSearchParams()
      if (amount) params.set("value", String(amount))
      const qs = params.toString()
      return qs ? `${base}?${qs}` : base
    },
    externalUrl: (address) => `https://polygonscan.com/address/${address}`,
    externalLabel: "Explorer",
  },
  base: {
    name: "Base",
    kind: "chain",
    symbol: "ETH",
    badgeClass: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
    buildUri: (address, amount) => {
      const base = `ethereum:${address}@8453`
      const params = new URLSearchParams()
      if (amount) params.set("value", String(amount))
      const qs = params.toString()
      return qs ? `${base}?${qs}` : base
    },
    externalUrl: (address) => `https://basescan.org/address/${address}`,
    externalLabel: "Explorer",
  },
  arbitrum: {
    name: "Arbitrum",
    kind: "chain",
    symbol: "ETH",
    badgeClass: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
    buildUri: (address, amount) => {
      const base = `ethereum:${address}@42161`
      const params = new URLSearchParams()
      if (amount) params.set("value", String(amount))
      const qs = params.toString()
      return qs ? `${base}?${qs}` : base
    },
    externalUrl: (address) => `https://arbiscan.io/address/${address}`,
    externalLabel: "Explorer",
  },
  optimism: {
    name: "Optimism",
    kind: "chain",
    symbol: "ETH",
    badgeClass: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
    buildUri: (address, amount) => {
      const base = `ethereum:${address}@10`
      const params = new URLSearchParams()
      if (amount) params.set("value", String(amount))
      const qs = params.toString()
      return qs ? `${base}?${qs}` : base
    },
    externalUrl: (address) => `https://optimistic.etherscan.io/address/${address}`,
    externalLabel: "Explorer",
  },
  avalanche: {
    name: "Avalanche",
    kind: "chain",
    symbol: "AVAX",
    badgeClass: "bg-red-500/15 text-red-600 dark:text-red-400",
    buildUri: (address, amount) => {
      const base = `ethereum:${address}@43114`
      const params = new URLSearchParams()
      if (amount) params.set("value", String(amount))
      const qs = params.toString()
      return qs ? `${base}?${qs}` : base
    },
    externalUrl: (address) => `https://snowtrace.io/address/${address}`,
    externalLabel: "Explorer",
  },
  bnb: {
    name: "BNB Chain",
    kind: "chain",
    symbol: "BNB",
    badgeClass: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    buildUri: (address, amount) => {
      const base = `ethereum:${address}@56`
      const params = new URLSearchParams()
      if (amount) params.set("value", String(amount))
      const qs = params.toString()
      return qs ? `${base}?${qs}` : base
    },
    externalUrl: (address) => `https://bscscan.com/address/${address}`,
    externalLabel: "Explorer",
  },
  litecoin: {
    name: "Litecoin",
    kind: "chain",
    symbol: "LTC",
    badgeClass: "bg-slate-500/15 text-slate-600 dark:text-slate-400",
    buildUri: (address, amount) => {
      const params = new URLSearchParams()
      if (amount) params.set("amount", String(amount))
      const qs = params.toString()
      return qs ? `litecoin:${address}?${qs}` : `litecoin:${address}`
    },
    externalUrl: (address) => `https://blockchair.com/litecoin/address/${address}`,
    externalLabel: "Explorer",
  },

  paypal: {
    name: "PayPal",
    kind: "platform",
    symbol: "PayPal",
    badgeClass: "bg-[#0070BA]/15 text-[#003087] dark:text-[#69B3F7]",
    buildUri: (handle) => `https://paypal.me/${handle}`,
    externalUrl: (handle) => `https://paypal.me/${handle}`,
    externalLabel: "Donate",
  },
  kofi: {
    name: "Ko-fi",
    kind: "platform",
    symbol: "Ko-fi",
    badgeClass: "bg-[#FF5E5B]/15 text-[#FF5E5B] dark:text-[#FF8583]",
    buildUri: (handle) => `https://ko-fi.com/${handle}`,
    externalUrl: (handle) => `https://ko-fi.com/${handle}`,
    externalLabel: "Support",
  },
  patreon: {
    name: "Patreon",
    kind: "platform",
    symbol: "Patreon",
    badgeClass: "bg-[#FF424D]/15 text-[#FF424D] dark:text-[#FF7A82]",
    buildUri: (handle) => `https://patreon.com/${handle}`,
    externalUrl: (handle) => `https://patreon.com/${handle}`,
    externalLabel: "Support",
  },
}

export function isChain(provider: ProviderId): provider is ChainId {
  return providers[provider].kind === "chain"
}

export function isPlatform(provider: ProviderId): provider is PlatformId {
  return providers[provider].kind === "platform"
}

export function formatAddress(address: string, chars = 6): string {
  if (address.length <= chars * 2 + 3) return address
  return `${address.slice(0, chars)}…${address.slice(-chars)}`
}
