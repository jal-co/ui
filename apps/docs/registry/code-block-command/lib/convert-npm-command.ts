/**
 * jalco-ui
 * lib/convert-npm-command
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Converts a standard npm/npx command into equivalent commands for all package managers.
 *
 * Inspired by @ncdai's CodeBlockCommand component.
 * @see https://chanhdai.com/components/code-block-command
 */

interface PackageManagerCommands {
  pnpm: string
  yarn: string
  npm: string
  bun: string
  shadcn?: string
}

export function convertNpmCommand(npmCommand: string): PackageManagerCommands {
  const trimmed = npmCommand.trim()

  // npx shadcn[@version] <subcommand> [args...] → shadcn <subcommand> [args...]
  const shadcnMatch = trimmed.match(
    /^npx\s+shadcn(?:@[^\s]+)?\s+(.+)$/
  )
  if (shadcnMatch) {
    const subcommand = shadcnMatch[1]
    const npxArgs = trimmed.replace(/^npx\s+/, "")
    return {
      npm: trimmed,
      pnpm: `pnpm dlx ${npxArgs}`,
      yarn: `yarn dlx ${npxArgs}`,
      bun: `bunx --bun ${npxArgs}`,
      shadcn: `shadcn ${subcommand}`,
    }
  }

  // npx create-<name> → pnpm create <name> / yarn create <name> / bunx --bun create-<name>
  const createMatch = trimmed.match(/^npx\s+create-(.+)$/)
  if (createMatch) {
    const rest = createMatch[1]
    return {
      npm: trimmed,
      pnpm: `pnpm create ${rest}`,
      yarn: `yarn create ${rest}`,
      bun: `bunx --bun create-${rest}`,
    }
  }

  // npm create → pnpm create / yarn create / bun create
  if (trimmed.startsWith("npm create ")) {
    const rest = trimmed.replace(/^npm create\s+/, "")
    return {
      npm: trimmed,
      pnpm: `pnpm create ${rest}`,
      yarn: `yarn create ${rest}`,
      bun: `bun create ${rest}`,
    }
  }

  // npx → pnpm dlx / yarn / bunx --bun
  if (trimmed.startsWith("npx ")) {
    const rest = trimmed.replace(/^npx\s+/, "")
    return {
      npm: trimmed,
      pnpm: `pnpm dlx ${rest}`,
      yarn: `yarn ${rest}`,
      bun: `bunx --bun ${rest}`,
    }
  }

  // npm run → pnpm / yarn / bun
  if (trimmed.startsWith("npm run ")) {
    const rest = trimmed.replace(/^npm run\s+/, "")
    return {
      npm: trimmed,
      pnpm: `pnpm ${rest}`,
      yarn: `yarn ${rest}`,
      bun: `bun ${rest}`,
    }
  }

  // npm install → pnpm add / yarn add / bun add
  if (trimmed.startsWith("npm install ") || trimmed.startsWith("npm i ")) {
    const rest = trimmed.replace(/^npm (?:install|i)\s+/, "")
    return {
      npm: trimmed,
      pnpm: `pnpm add ${rest}`,
      yarn: `yarn add ${rest}`,
      bun: `bun add ${rest}`,
    }
  }

  // Fallback
  return {
    npm: trimmed,
    pnpm: trimmed.replace(/^npm\s+/, "pnpm "),
    yarn: trimmed.replace(/^npm\s+/, "yarn "),
    bun: trimmed.replace(/^npm\s+/, "bun "),
  }
}
