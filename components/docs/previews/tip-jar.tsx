import {
  TipJarCard,
  TipJarCompact,
  TipJarInline,
  TipJarQR,
} from "@/registry/tip-jar/tip-jar"

const ETH = "0x585c3Ad932471B24c733A557ad8FA64A2BacF508"
const BTC = "3Js3LsTiEt15nYzsEGpgnbNKDcGndefEw9"

export default async function Preview() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      <TipJarCard
        provider="ethereum"
        address={ETH}
        title="Support"
        size="sm"
      />
      <div className="flex flex-col gap-4">
        <TipJarCompact provider="bitcoin" address={BTC} />
        <TipJarInline provider="ethereum" address={ETH} />
        <TipJarQR provider="bitcoin" address={BTC} size="sm" caption="Scan to donate" />
      </div>
    </div>
  )
}
