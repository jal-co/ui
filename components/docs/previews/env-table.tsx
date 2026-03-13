import { EnvTable, type EnvVariable } from "@/registry/env-table/env-table"

const variables: EnvVariable[] = [
  { key: "DATABASE_URL", value: "postgresql://admin:s3cret@db.example.com:5432/app", environment: "production" },
  { key: "NEXT_PUBLIC_API_URL", value: "https://api.example.com", environment: "production" },
  { key: "SECRET_KEY", value: "sk_live_abc123def456", environment: "production" },
]

export default async function Preview() {
  return <EnvTable variables={variables} />
}
