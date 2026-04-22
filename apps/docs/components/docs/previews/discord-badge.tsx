import { DiscordBadge } from "@/registry/discord-badge/discord-badge"
import type { DiscordServerData } from "@/registry/discord-badge/lib/discord"

const sampleServer: DiscordServerData = {
  id: "123456789",
  name: "Tailwind CSS",
  instantInvite: "https://discord.gg/tailwindcss",
  memberCount: 12_450,
  onlineCount: 3_200,
}

export default async function Preview() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <DiscordBadge serverId="0" data={sampleServer} variant="default" />
        <DiscordBadge serverId="0" data={sampleServer} variant="discord" />
        <DiscordBadge serverId="0" data={sampleServer} variant="outline" />
        <DiscordBadge serverId="0" data={sampleServer} variant="subtle" showOnline />
      </div>
      <DiscordBadge
        serverId="0"
        data={sampleServer}
        layout="card"
        className="w-full max-w-xs"
      />
    </div>
  )
}
