import type { Metadata } from "next"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { CodeLine } from "@/registry/code-line/code-line"
import {
  TipJarCard,
  TipJarTabs,
  TipJarList,
  TipJarCompact,
  TipJarInline,
  TipJarQR,
  ProviderIcon,
} from "@/registry/tip-jar/tip-jar"
import type { ProviderId } from "@/registry/tip-jar/lib/chains"

export const metadata: Metadata = {
  title: "Crypto + Tip Jar",
  description:
    "Donation and tipping component with QR code, wallet address display, and copy-to-clipboard.",
}

const sourceFiles = [
  "registry/tip-jar/tip-jar.tsx",
  "registry/tip-jar/lib/chains.ts",
]

const ETH_ADDRESS = "0x585c3Ad932471B24c733A557ad8FA64A2BacF508"
const BTC_ADDRESS = "3Js3LsTiEt15nYzsEGpgnbNKDcGndefEw9"
const SOL_ADDRESS = "HiGZkNDuhMrGi2YAmJFNrqaq9C1dPP1Eoqs8nRq4k2Kc"

export default async function TipJarPage() {
  return (
    <ComponentDocsPage
      title="Crypto + Tip Jar"
      description="Donation and tipping component with QR code, wallet address or handle display, and copy-to-clipboard. Supports crypto chains (Ethereum, Bitcoin, Solana, and more) and platforms (PayPal, Ko-fi, Patreon). Six layout variants for different contexts."
      registryName="tip-jar"
      sourceFiles={sourceFiles}
      preview={
        <TipJarTabs
          title="Support this project"
          label="Choose your preferred network"
          wallets={[
            { provider: "ethereum", address: ETH_ADDRESS },
            { provider: "bitcoin", address: BTC_ADDRESS },
            { provider: "solana", address: SOL_ADDRESS },
            { provider: "paypal", address: "jalco" },
          ]}
        />
      }
      usage={
        <>
          <CodeLine
            code={`import { TipJarCard, TipJarTabs, TipJarList, TipJarCompact, TipJarInline, TipJarQR } from "@/components/tip-jar"`}
          />
          <CodeLine
            code={`<TipJarCard provider="ethereum" address="0x1a2B..." title="Support" />`}
          />
          <p className="text-sm text-muted-foreground">
            Six layout variants are exported from the same file. Use{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              TipJarTabs
            </code>{" "}
            for multi-wallet donation cards with QR,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              TipJarList
            </code>{" "}
            for stacked wallet rows,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              TipJarCard
            </code>{" "}
            for single-provider cards,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              TipJarCompact
            </code>{" "}
            for sidebars,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              TipJarInline
            </code>{" "}
            for inline rows, and{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              TipJarQR
            </code>{" "}
            for standalone QR codes.
          </p>
        </>
      }
    >
      {/* Examples */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Wallet list</h3>
          <VariantGrid
            registryName="tip-jar"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Multi-chain list",
                code: `<TipJarList title="Donate" label="Pick any network" wallets={[...]} />`,
                preview: (
                  <TipJarList
                    title="Donate"
                    label="Pick any network"
                    wallets={[
                      { provider: "ethereum", address: ETH_ADDRESS },
                      { provider: "bitcoin", address: BTC_ADDRESS },
                      { provider: "solana", address: SOL_ADDRESS },
                      { provider: "base", address: ETH_ADDRESS },
                    ]}
                  />
                ),
              },
              {
                label: "Mixed crypto + platforms",
                code: `<TipJarList title="Support my work" wallets={[...]} />`,
                preview: (
                  <TipJarList
                    title="Support my work"
                    wallets={[
                      { provider: "ethereum", address: ETH_ADDRESS },
                      { provider: "bitcoin", address: BTC_ADDRESS },
                      { provider: "paypal", address: "jalco" },
                      { provider: "kofi", address: "jalco" },
                      { provider: "patreon", address: "jalco" },
                    ]}
                  />
                ),
              },
              {
                label: "No title",
                code: `<TipJarList wallets={[{ provider: "ethereum", address: "0x...", token: "USDC" }, ...]} />`,
                preview: (
                  <TipJarList
                    wallets={[
                      {
                        provider: "ethereum",
                        address: ETH_ADDRESS,
                        token: "USDC",
                      },
                      { provider: "solana", address: SOL_ADDRESS },
                    ]}
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Single-provider variants</h3>
          <VariantGrid
            registryName="tip-jar"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Card",
                code: `<TipJarCard provider="ethereum" address="0x1a2B..." title="Buy me a coffee" presets={[0.01, 0.05, 0.1]} />`,
                preview: (
                  <TipJarCard
                    provider="ethereum"
                    address={ETH_ADDRESS}
                    title="Buy me a coffee"
                    label="Send ETH to support this project"
                    presets={[0.01, 0.05, 0.1]}
                  />
                ),
              },
              {
                label: "Compact",
                code: `<TipJarCompact provider="bitcoin" address="bc1qar0..." label="BTC tips welcome" />`,
                preview: (
                  <TipJarCompact
                    provider="bitcoin"
                    address={BTC_ADDRESS}
                    label="BTC tips welcome"
                  />
                ),
              },
              {
                label: "Inline",
                code: `<TipJarInline provider="solana" address="7EcDhS..." />`,
                preview: (
                  <TipJarInline provider="solana" address={SOL_ADDRESS} />
                ),
              },
              {
                label: "Inline + QR",
                code: `<TipJarInline provider="solana" address="7EcDhS..." qr />`,
                preview: (
                  <TipJarInline provider="solana" address={SOL_ADDRESS} qr />
                ),
              },
              {
                label: "QR Only",
                code: `<TipJarQR provider="ethereum" address="0x1a2B..." caption="Scan to donate" showBadge />`,
                preview: (
                  <TipJarQR
                    provider="ethereum"
                    address={ETH_ADDRESS}
                    caption="Scan to donate"
                    showBadge
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Crypto chains</h3>
          <VariantGrid
            registryName="tip-jar"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Ethereum",
                code: `<TipJarInline provider="ethereum" address="0x1a2B..." />`,
                preview: (
                  <TipJarInline provider="ethereum" address={ETH_ADDRESS} />
                ),
              },
              {
                label: "Bitcoin",
                code: `<TipJarInline provider="bitcoin" address="bc1qar0..." />`,
                preview: (
                  <TipJarInline provider="bitcoin" address={BTC_ADDRESS} />
                ),
              },
              {
                label: "Solana",
                code: `<TipJarInline provider="solana" address="7EcDhS..." />`,
                preview: (
                  <TipJarInline provider="solana" address={SOL_ADDRESS} />
                ),
              },
              {
                label: "Base",
                code: `<TipJarInline provider="base" address="0x1a2B..." />`,
                preview: (
                  <TipJarInline provider="base" address={ETH_ADDRESS} />
                ),
              },
              {
                label: "Ethereum + USDC token",
                code: `<TipJarInline provider="ethereum" address="0x1a2B..." token="USDC" />`,
                preview: (
                  <TipJarInline
                    provider="ethereum"
                    address={ETH_ADDRESS}
                    token="USDC"
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Platforms</h3>
          <VariantGrid
            registryName="tip-jar"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "PayPal — Card",
                code: `<TipJarCard provider="paypal" address="jalco" title="Support my work" />`,
                preview: (
                  <TipJarCard
                    provider="paypal"
                    address="jalco"
                    title="Support my work"
                    label="Send a tip via PayPal"
                  />
                ),
              },
              {
                label: "Ko-fi — Compact",
                code: `<TipJarCompact provider="kofi" address="jalco" label="Buy me a coffee" />`,
                preview: (
                  <TipJarCompact
                    provider="kofi"
                    address="jalco"
                    label="Buy me a coffee"
                  />
                ),
              },
              {
                label: "Patreon — Inline",
                code: `<TipJarInline provider="patreon" address="jalco" />`,
                preview: (
                  <TipJarInline provider="patreon" address="jalco" />
                ),
              },
              {
                label: "PayPal — Inline",
                code: `<TipJarInline provider="paypal" address="jalco" />`,
                preview: (
                  <TipJarInline provider="paypal" address="jalco" />
                ),
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Provider icons</h3>
          <VariantGrid
            registryName="tip-jar"
            files={sourceFiles}
            columns={1}
            fullWidth
            items={[
              {
                label: "Brand colors (default)",
                code: `<ProviderIcon provider="ethereum" />\n<ProviderIcon provider="bitcoin" />`,
                preview: (
                  <div className="flex flex-wrap items-center gap-3">
                    {(
                      [
                        "ethereum",
                        "bitcoin",
                        "solana",
                        "polygon",
                        "base",
                        "arbitrum",
                        "optimism",
                        "avalanche",
                        "bnb",
                        "litecoin",
                        "paypal",
                        "kofi",
                        "patreon",
                      ] as ProviderId[]
                    ).map((p) => (
                      <div
                        key={p}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <ProviderIcon provider={p} className="size-6" />
                        <span className="text-[10px] text-muted-foreground">
                          {p}
                        </span>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                label: "Muted (inherits text color)",
                code: `<ProviderIcon provider="ethereum" muted />\n<ProviderIcon provider="bitcoin" muted />`,
                preview: (
                  <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                    {(
                      [
                        "ethereum",
                        "bitcoin",
                        "solana",
                        "polygon",
                        "base",
                        "arbitrum",
                        "optimism",
                        "avalanche",
                        "bnb",
                        "litecoin",
                        "paypal",
                        "kofi",
                        "patreon",
                      ] as ProviderId[]
                    ).map((p) => (
                      <div
                        key={p}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <ProviderIcon provider={p} muted className="size-6" />
                        <span className="text-[10px]">{p}</span>
                      </div>
                    ))}
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* When to use */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">When to use</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">TipJarTabs</strong> — accept
            donations across multiple chains or platforms in a single card with
            QR codes. Best for landing pages and sponsorship sections.
          </li>
          <li>
            <strong className="text-foreground">TipJarList</strong> — stacked
            list of wallet rows. No QR codes — just icon, address, copy, and
            explorer link per row. Good for footers and profile pages.
          </li>
          <li>
            <strong className="text-foreground">TipJarCard</strong> — full
            single-provider donation widget with QR, address, copy, and optional
            amount presets.
          </li>
          <li>
            <strong className="text-foreground">TipJarCompact</strong> — sidebar
            widget or footer placement where space is limited.
          </li>
          <li>
            <strong className="text-foreground">TipJarInline</strong> — inline
            address row with copy button. Good for dashboards and settings.
          </li>
          <li>
            <strong className="text-foreground">TipJarQR</strong> — standalone
            QR code for print materials, slides, or payment screens.
          </li>
        </ul>
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">API Reference</h2>

        <ApiRefTable
          title="Shared props"
          props={[
            {
              name: "provider",
              type: "ProviderId",
              required: true,
              description:
                'Chain or platform identifier. Crypto: "ethereum", "bitcoin", "solana", "polygon", "base", "arbitrum", "optimism", "avalanche", "bnb", "litecoin". Platforms: "paypal", "kofi", "patreon".',
              fullType:
                '"ethereum" | "bitcoin" | "solana" | "polygon" | "base" | "arbitrum" | "optimism" | "avalanche" | "bnb" | "litecoin" | "paypal" | "kofi" | "patreon"',
            },
            {
              name: "address",
              type: "string",
              required: true,
              description:
                "Wallet address (crypto) or username/handle (platform).",
            },
            {
              name: "token",
              type: "string",
              description:
                'Optional token symbol shown as a badge. Crypto only (e.g. "USDC").',
            },
            {
              name: "label",
              type: "string",
              description: "Support message or description.",
            },
            {
              name: "amount",
              type: "number",
              description:
                "Fixed payment amount encoded in the QR URI. Crypto only.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              description:
                "QR code display size. Defaults vary by variant.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes on the root element.",
            },
          ]}
        />

        <ApiRefTable
          title="TipJarTabs"
          props={[
            {
              name: "wallets",
              type: "WalletEntry[]",
              required: true,
              description: "Array of wallet/platform entries to tab between.",
              fullType:
                "{ provider: ProviderId; address: string; token?: string; amount?: number }[]",
            },
            {
              name: "title",
              type: "string",
              description: 'Title shown at the top. Defaults to "Support".',
            },
            {
              name: "label",
              type: "string",
              description: "Description shown below the title.",
            },
          ]}
        />

        <ApiRefTable
          title="TipJarList"
          props={[
            {
              name: "wallets",
              type: "WalletEntry[]",
              required: true,
              description: "Array of wallet/platform entries to display as rows.",
              fullType:
                "{ provider: ProviderId; address: string; token?: string; amount?: number }[]",
            },
            {
              name: "title",
              type: "string",
              description: "Title shown at the top of the card.",
            },
            {
              name: "label",
              type: "string",
              description: "Description shown below the title.",
            },
          ]}
        />

        <ApiRefTable
          title="TipJarCard"
          props={[
            {
              name: "title",
              type: "string",
              description: 'Title shown at the top. Defaults to "Support".',
            },
            {
              name: "presets",
              type: "number[]",
              description:
                "Quick-select amount buttons. Crypto only. Each preset updates the QR code URI.",
            },
          ]}
        />

        <ApiRefTable
          title="TipJarQR"
          props={[
            {
              name: "caption",
              type: "string",
              description: "Caption text shown below the QR code.",
            },
            {
              name: "showBadge",
              type: "boolean",
              description:
                "Show the provider badge above the QR code. Defaults to false.",
            },
          ]}
        />
      </section>

      {/* Notes */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Notes</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Client component.</strong> Uses
            the Clipboard API and interactive state (tab switching, preset
            selection).
          </li>
          <li>
            <strong className="text-foreground">QR generation.</strong> Powered
            by{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">uqr</code>{" "}
            — a zero-dependency, tree-shakable SVG QR code library.
          </li>
          <li>
            <strong className="text-foreground">
              Crypto vs. platform behavior.
            </strong>{" "}
            For crypto providers, the QR encodes a payment URI and the copy
            button copies the wallet address. For platforms, the QR encodes the
            donation URL and the copy button copies the URL.
          </li>
          <li>
            <strong className="text-foreground">Extensible providers.</strong>{" "}
            Add new chains or platforms by extending the{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              providers
            </code>{" "}
            map in{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              lib/chains.ts
            </code>
            .
          </li>
          <li>
            <strong className="text-foreground">Live addresses.</strong>{" "}
            The addresses and handles in the demos above are real — they belong
            to the maintainer. No one should ever feel any obligation to send
            anything. They&apos;re here so the QR codes and explorer links work
            end-to-end.
          </li>
        </ul>
      </section>
    </ComponentDocsPage>
  )
}
