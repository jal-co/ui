"use client"

/**
 * jalco-ui
 * TipJar
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Donation component with QR code, address/handle display, and copy-to-clipboard.
 * Supports crypto chains (Ethereum, Bitcoin, Solana, etc.) and platforms
 * (PayPal, Ko-fi, Patreon) with five layout variants.
 *
 * Exports:
 * - TipJarCard — full donation card with QR code, address, copy, and optional amount presets
 * - TipJarTabs — tabbed multi-wallet card for accepting donations across chains/platforms
 * - TipJarCompact — minimal layout with QR and shortened address for sidebars
 * - TipJarInline — row-style address + copy button with optional QR popover
 * - TipJarQR — standalone QR code with optional caption
 *
 * Props (shared):
 * - provider: chain or platform identifier
 * - address: wallet address or platform handle
 * - token?: optional token symbol (crypto only)
 * - label?: support message or description
 * - amount?: fixed payment amount
 * - size?: QR code size (sm, md, lg)
 *
 * Dependencies: uqr, lucide-react
 */

import * as React from "react"
import { renderSVG } from "uqr"
import { Check, Copy, ExternalLink, Heart, QrCode, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  providers,
  isChain,
  formatAddress,
  type ProviderId,
} from "@/registry/tip-jar/lib/chains"
import { ProviderIcon } from "@/registry/tip-jar/icons/provider-icons"

type QRSize = "sm" | "md" | "lg"

const qrDimensions: Record<QRSize, number> = {
  sm: 128,
  md: 180,
  lg: 240,
}

interface TipJarBaseProps {
  /** Chain or platform identifier. */
  provider: ProviderId
  /** Wallet address (crypto) or username/handle (platform). */
  address: string
  /** Optional token symbol (e.g. "USDC"). Crypto only. Shown as a badge when provided. */
  token?: string
  /** Support message or description shown alongside the address. */
  label?: string
  /** Fixed payment amount encoded in the QR URI (crypto) or ignored (platform). */
  amount?: number
  /** QR code display size. */
  size?: QRSize
  className?: string
}

function usePaymentUri(
  provider: ProviderId,
  address: string,
  amount?: number,
  token?: string
): string {
  const config = providers[provider]
  return config.buildUri(address, amount, token)
}

function useCopy() {
  const [copied, setCopied] = React.useState(false)

  const copy = React.useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API unavailable in insecure contexts
    }
  }, [])

  return { copied, copy }
}

function QRCodeSVG({
  value,
  size = "md",
  className,
}: {
  value: string
  size?: QRSize
  className?: string
}) {
  const dim = qrDimensions[size]
  const svg = renderSVG(value, { border: 1 })

  return (
    <div
      className={cn("inline-flex items-center justify-center rounded-lg bg-white p-2", className)}
      style={{ width: dim, height: dim }}
      role="img"
      aria-label="QR code for payment"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

function ProviderBadge({ provider, token }: { provider: ProviderId; token?: string }) {
  const config = providers[provider]
  return (
    <div className="inline-flex items-center gap-1.5">
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
          config.badgeClass
        )}
      >
        <ProviderIcon provider={provider} className="size-3" />
        {config.name}
      </span>
      {token && isChain(provider) && (
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {token}
        </span>
      )}
    </div>
  )
}

function CopyButton({
  value,
  compact = false,
  className,
}: {
  value: string
  compact?: boolean
  className?: string
}) {
  const { copied, copy } = useCopy()

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md transition-colors outline-none",
        "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        compact
          ? "size-7 [&_svg]:size-3"
          : "h-7 gap-1.5 px-2 text-xs font-medium [&_svg]:size-3",
        className
      )}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? (
        <>
          <Check className="text-emerald-500" />
          {!compact && <span>Copied</span>}
        </>
      ) : (
        <>
          <Copy />
          {!compact && <span>Copy</span>}
        </>
      )}
    </button>
  )
}

function ExternalButton({ provider, address }: { provider: ProviderId; address: string }) {
  const config = providers[provider]
  const isPlatformProvider = !isChain(provider)
  const Icon = isPlatformProvider ? Heart : ExternalLink

  return (
    <a
      href={config.externalUrl(address)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md px-2 text-xs font-medium transition-colors outline-none",
        "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
      aria-label={`${config.externalLabel} on ${config.name}`}
    >
      <Icon className="size-3" />
      <span>{config.externalLabel}</span>
    </a>
  )
}

function AddressDisplay({
  address,
  truncate = true,
  mono = true,
  className,
}: {
  address: string
  truncate?: boolean
  mono?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        "select-all break-all text-sm",
        mono && "font-mono",
        truncate ? "truncate" : "break-all",
        className
      )}
      title={address}
    >
      {truncate ? formatAddress(address) : address}
    </span>
  )
}

function PlatformHandle({
  provider,
  address,
  className,
}: {
  provider: ProviderId
  address: string
  className?: string
}) {
  const config = providers[provider]
  return (
    <span
      className={cn("truncate text-sm text-muted-foreground", className)}
      title={`${config.name}: ${address}`}
    >
      @{address}
    </span>
  )
}

function AddressRow({
  provider,
  address,
  paymentUri,
}: {
  provider: ProviderId
  address: string
  paymentUri: string
}) {
  const isCrypto = isChain(provider)

  if (isCrypto) {
    return (
      <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
        <AddressDisplay address={address} truncate={false} className="min-w-0 flex-1 text-xs text-muted-foreground" />
        <CopyButton value={address} compact />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
      <PlatformHandle provider={provider} address={address} className="text-xs" />
      <CopyButton value={paymentUri} compact />
    </div>
  )
}

// TipJarCard

interface TipJarCardProps extends TipJarBaseProps {
  /** Title shown at the top of the card. Defaults to "Support". */
  title?: string
  /** Preset amounts shown as quick-select buttons (crypto only). */
  presets?: number[]
}

function TipJarCard({
  provider,
  address,
  token,
  label,
  amount,
  size = "md",
  title = "Support",
  presets,
  className,
}: TipJarCardProps) {
  const [selectedAmount, setSelectedAmount] = React.useState<number | undefined>(amount)
  const config = providers[provider]
  const isCrypto = isChain(provider)
  const paymentUri = usePaymentUri(provider, address, selectedAmount, token)

  return (
    <div
      data-slot="tip-jar-card"
      className={cn(
        "flex w-full max-w-sm flex-col gap-4 rounded-xl border border-border/60 bg-card p-5 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          {label && (
            <p className="text-sm text-muted-foreground">{label}</p>
          )}
        </div>
        <ProviderBadge provider={provider} token={token} />
      </div>

      <div className="flex justify-center">
        <QRCodeSVG value={paymentUri} size={size} />
      </div>

      {isCrypto && presets && presets.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setSelectedAmount(preset)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                selectedAmount === preset
                  ? "border-foreground/20 bg-foreground/5 text-foreground"
                  : "border-border/60 bg-transparent text-muted-foreground hover:border-border hover:text-foreground"
              )}
            >
              {preset} {token ?? config.symbol}
            </button>
          ))}
        </div>
      )}

      <AddressRow provider={provider} address={address} paymentUri={paymentUri} />

      <div className="flex items-center justify-center gap-1">
        <ExternalButton provider={provider} address={address} />
      </div>
    </div>
  )
}

// TipJarTabs

interface WalletEntry {
  /** Chain or platform identifier. */
  provider: ProviderId
  /** Wallet address or platform handle. */
  address: string
  /** Optional token symbol (crypto only). */
  token?: string
  /** Optional fixed amount. */
  amount?: number
}

interface TipJarTabsProps {
  /** List of wallet/platform entries to tab between. */
  wallets: WalletEntry[]
  /** Title shown at the top of the card. Defaults to "Support". */
  title?: string
  /** Description shown below the title. */
  label?: string
  /** QR code display size. */
  size?: QRSize
  className?: string
}

function TipJarTabs({
  wallets,
  title = "Support",
  label,
  size = "md",
  className,
}: TipJarTabsProps) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const active = wallets[activeIndex]
  if (!active) return null

  const config = providers[active.provider]
  const paymentUri = config.buildUri(active.address, active.amount, active.token)

  return (
    <div
      data-slot="tip-jar-tabs"
      className={cn(
        "flex w-full max-w-sm flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm",
        className
      )}
    >
      <div className="flex flex-col gap-1 p-5 pb-0">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        {label && (
          <p className="text-sm text-muted-foreground">{label}</p>
        )}
      </div>

      <div
        className="flex overflow-x-auto border-b border-border/60 px-2 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Payment methods"
      >
        {wallets.map((wallet, i) => {
          const wConfig = providers[wallet.provider]
          return (
            <button
              key={`${wallet.provider}-${wallet.address}-${i}`}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors",
                i === activeIndex
                  ? "border-b-2 border-foreground text-foreground"
                  : "border-b-2 border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <ProviderIcon provider={wallet.provider} className="size-4" />
              {wConfig.name}
              {wallet.token && isChain(wallet.provider) && (
                <span className="text-[10px] text-muted-foreground">
                  {wallet.token}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-4 p-5" role="tabpanel">
        <div className="flex justify-center">
          <QRCodeSVG value={paymentUri} size={size} />
        </div>

        <AddressRow provider={active.provider} address={active.address} paymentUri={paymentUri} />

        <div className="flex items-center justify-center gap-1">
          <ExternalButton provider={active.provider} address={active.address} />
        </div>
      </div>
    </div>
  )
}

// TipJarCompact

function TipJarCompact({
  provider,
  address,
  token,
  label,
  amount,
  size = "sm",
  className,
}: TipJarBaseProps) {
  const isCrypto = isChain(provider)
  const paymentUri = usePaymentUri(provider, address, amount, token)

  return (
    <div
      data-slot="tip-jar-compact"
      className={cn(
        "flex w-full max-w-[200px] flex-col items-center gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-sm",
        className
      )}
    >
      <QRCodeSVG value={paymentUri} size={size} />
      <ProviderBadge provider={provider} token={token} />
      {isCrypto ? (
        <div className="flex items-center gap-1">
          <AddressDisplay address={address} className="text-xs text-muted-foreground" />
          <CopyButton value={address} compact />
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <PlatformHandle provider={provider} address={address} className="text-xs" />
          <CopyButton value={paymentUri} compact />
        </div>
      )}
      {label && (
        <p className="text-center text-[11px] text-muted-foreground">{label}</p>
      )}
    </div>
  )
}

// QRPopoverButton (shared)

function QRPopoverButton({
  provider,
  address,
  token,
  paymentUri,
  revealOnHover = false,
}: {
  provider: ProviderId
  address: string
  token?: string
  paymentUri: string
  revealOnHover?: boolean
}) {
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isCrypto = isChain(provider)
  const config = providers[provider]

  React.useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex size-7 shrink-0 items-center justify-center rounded-md transition-colors outline-none",
          "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          revealOnHover && "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
          open && "opacity-100 bg-accent text-accent-foreground"
        )}
        aria-label={open ? "Hide QR code" : "Show QR code"}
        aria-expanded={open}
      >
        <QrCode className="size-3.5" />
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 top-full z-50 mt-2 flex flex-col items-center gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-lg",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
          )}
        >
          <div className="flex w-full items-center justify-between gap-2">
            <ProviderBadge provider={provider} token={token} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label="Close QR code"
            >
              <X className="size-3" />
            </button>
          </div>
          <QRCodeSVG value={paymentUri} size="sm" />
          {isCrypto ? (
            <span className="font-mono text-[11px] text-muted-foreground">
              {formatAddress(address, 6)}
            </span>
          ) : (
            <span className="text-[11px] text-muted-foreground">
              @{address}
            </span>
          )}
          <p className="text-[10px] text-muted-foreground">
            Scan to {isCrypto ? "pay via" : "visit"} {config.name}
          </p>
        </div>
      )}
    </div>
  )
}

// TipJarInline

function TipJarInline({
  provider,
  address,
  token,
  amount,
  qr = false,
  className,
}: Omit<TipJarBaseProps, "size"> & {
  /** Show a QR code popover button. */
  qr?: boolean
}) {
  const isCrypto = isChain(provider)
  const paymentUri = usePaymentUri(provider, address, amount, token)

  return (
    <div
      data-slot="tip-jar-inline"
      className={cn(
        "relative inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card px-3 py-2 shadow-sm",
        className
      )}
    >
      <ProviderBadge provider={provider} token={token} />
      {isCrypto ? (
        <AddressDisplay address={address} className="text-xs text-muted-foreground" />
      ) : (
        <PlatformHandle provider={provider} address={address} className="text-xs" />
      )}
      <span className="h-4 w-px shrink-0 bg-border/60" aria-hidden="true" />
      <CopyButton value={isCrypto ? address : paymentUri} compact />
      {qr && (
        <QRPopoverButton
          provider={provider}
          address={address}
          token={token}
          paymentUri={paymentUri}
        />
      )}
    </div>
  )
}

// TipJarList

interface TipJarListProps {
  /** List of wallet/platform entries to display as rows. */
  wallets: WalletEntry[]
  /** Title shown at the top of the card. */
  title?: string
  /** Description shown below the title. */
  label?: string
  className?: string
}

function TipJarList({
  wallets,
  title,
  label,
  className,
}: TipJarListProps) {
  return (
    <div
      data-slot="tip-jar-list"
      className={cn(
        "flex w-full max-w-md flex-col rounded-xl border border-border/60 bg-card shadow-sm",
        className
      )}
    >
      {(title || label) && (
        <div className="flex flex-col gap-1 px-4 pt-4 pb-2">
          {title && (
            <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
          )}
          {label && (
            <p className="text-xs text-muted-foreground">{label}</p>
          )}
        </div>
      )}
      <div className="flex flex-col divide-y divide-border/40">
        {wallets.map((wallet, i) => (
          <TipJarListRow key={`${wallet.provider}-${wallet.address}-${i}`} wallet={wallet} />
        ))}
      </div>
    </div>
  )
}

function TipJarListRow({ wallet }: { wallet: WalletEntry }) {
  const config = providers[wallet.provider]
  const isCrypto = isChain(wallet.provider)
  const paymentUri = config.buildUri(wallet.address, wallet.amount, wallet.token)

  return (
    <div className="group relative flex items-center gap-2.5 px-4 py-3">
      <ProviderIcon provider={wallet.provider} className="size-5 shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-xs font-medium text-foreground">
          {config.name}
          {wallet.token && isCrypto && (
            <span className="ml-1 text-muted-foreground">{wallet.token}</span>
          )}
        </span>
        {isCrypto ? (
          <span className="truncate font-mono text-[11px] text-muted-foreground" title={wallet.address}>
            {formatAddress(wallet.address, 8)}
          </span>
        ) : (
          <span className="truncate text-[11px] text-muted-foreground" title={wallet.address}>
            @{wallet.address}
          </span>
        )}
      </div>
      <CopyButton value={isCrypto ? wallet.address : paymentUri} compact />
      <QRPopoverButton
        provider={wallet.provider}
        address={wallet.address}
        token={wallet.token}
        paymentUri={paymentUri}
        revealOnHover
      />
      <a
        href={config.externalUrl(wallet.address)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        aria-label={`${config.externalLabel} on ${config.name}`}
      >
        {isCrypto ? <ExternalLink className="size-3" /> : <Heart className="size-3" />}
      </a>
    </div>
  )
}

// TipJarQR

interface TipJarQRProps extends TipJarBaseProps {
  /** Caption text shown below the QR code. */
  caption?: string
  /** Show the provider badge above the QR. */
  showBadge?: boolean
}

function TipJarQR({
  provider,
  address,
  token,
  amount,
  size = "lg",
  caption,
  showBadge = false,
  className,
}: TipJarQRProps) {
  const paymentUri = usePaymentUri(provider, address, amount, token)

  return (
    <div
      data-slot="tip-jar-qr"
      className={cn(
        "inline-flex flex-col items-center gap-3",
        className
      )}
    >
      {showBadge && <ProviderBadge provider={provider} token={token} />}
      <QRCodeSVG value={paymentUri} size={size} />
      {caption && (
        <p className="max-w-[240px] text-center text-sm text-muted-foreground">
          {caption}
        </p>
      )}
    </div>
  )
}

export {
  TipJarCard,
  TipJarTabs,
  TipJarList,
  TipJarCompact,
  TipJarInline,
  TipJarQR,
  QRCodeSVG,
  ProviderBadge,
  ProviderIcon,
  type TipJarCardProps,
  type TipJarTabsProps,
  type TipJarListProps,
  type TipJarBaseProps,
  type TipJarQRProps,
  type WalletEntry,
  type ProviderId,
  type QRSize,
}
