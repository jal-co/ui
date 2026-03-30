import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"

// Docs layout components
import { ComponentDocsPage } from "@/components/docs/component-docs-page"
import { VariantGrid } from "@/components/docs/variant-grid"
import { ComponentPlayground } from "@/components/docs/component-playground"
import { InstallCommand } from "@/components/docs/install-command"

// Registry components used directly in docs
import { CodeLine } from "@/registry/code-line/code-line"
import { CodeBlock } from "@/registry/code-block/code-block"
import { CodeBlockCommand } from "@/registry/code-block-command/code-block-command"
import { ApiRefTable } from "@/registry/api-ref-table/api-ref-table"
import { StatusIndicator } from "@/registry/status-indicator/status-indicator"
import { GitHubStarsButton } from "@/registry/github-stars-button/github-stars-button"
import { GitHubButtonGroup } from "@/registry/github-button-group/github-button-group"
import { NpmBadge } from "@/registry/npm-badge/npm-badge"
import { ProductHuntButton } from "@/registry/producthunt-button/producthunt-button"
import { ActivityGraph } from "@/registry/activity-graph/activity-graph"
import { ContributorGrid, ContributorList } from "@/registry/contributor-grid/contributor-grid"
import { CommitGraph } from "@/registry/commit-graph/commit-graph"
import { LicenseBadge } from "@/registry/license-badge/license-badge"
import { RepoCard } from "@/registry/repo-card/repo-card"
import { ColorPalette } from "@/registry/color-palette/color-palette"
import { LogoCloud, LogoCloudMarquee } from "@/registry/logo-cloud/logo-cloud"
import { TestimonialCard, TestimonialGrid, TestimonialMarquee } from "@/registry/testimonial/testimonial"
import { CronSchedule } from "@/registry/cron-schedule/cron-schedule"
import { EnvTable } from "@/registry/env-table/env-table"
import { JsonViewer } from "@/registry/json-viewer/json-viewer"
import { LogViewerTerminal, LogViewerMinimal, LogViewerFilterable } from "@/registry/log-viewer/log-viewer"
import { RequestViewer } from "@/registry/request-viewer/request-viewer"
import { FileTree } from "@/registry/file-tree/file-tree"
import { DiffViewer } from "@/registry/diff-viewer/diff-viewer"
import { Kbd, KbdCombo } from "@/registry/kbd/kbd"
import { Stepper, StepperItem } from "@/registry/stepper/stepper"
import { AiCopyButton } from "@/registry/ai-copy-button/ai-copy-button"
import { TipJarCard, TipJarTabs, TipJarList, TipJarCompact, TipJarInline } from "@/registry/tip-jar/tip-jar"

// MDX-specific preview wrapper
import { ComponentPreview } from "@/components/docs/mdx/component-preview"
import { InstallBlock } from "@/components/docs/mdx/install-block"

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,

    // Docs infrastructure
    ComponentDocsPage,
    VariantGrid,
    ComponentPlayground,
    InstallCommand,
    ComponentPreview,
    InstallBlock,

    // Code / docs primitives
    CodeLine,
    CodeBlock,
    CodeBlockCommand,
    ApiRefTable,

    // All registry components
    StatusIndicator,
    GitHubStarsButton,
    GitHubButtonGroup,
    NpmBadge,
    ProductHuntButton,
    ActivityGraph,
    ContributorGrid,
    ContributorList,
    CommitGraph,
    LicenseBadge,
    RepoCard,
    ColorPalette,
    LogoCloud,
    LogoCloudMarquee,
    TestimonialCard,
    TestimonialGrid,
    TestimonialMarquee,
    CronSchedule,
    EnvTable,
    JsonViewer,
    LogViewerTerminal,
    LogViewerMinimal,
    LogViewerFilterable,
    RequestViewer,
    FileTree,
    DiffViewer,
    Kbd,
    KbdCombo,
    Stepper,
    StepperItem,
    AiCopyButton,
    TipJarCard,
    TipJarTabs,
    TipJarList,
    TipJarCompact,
    TipJarInline,
  }
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return getMDXComponents(components)
}
