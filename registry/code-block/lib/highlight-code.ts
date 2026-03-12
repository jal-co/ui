/**
 * jalco-ui
 * lib/highlight-code
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Syntax highlighting helper using Shiki with dual light/dark themes.
 * Supports a single-theme override for editor color themes.
 *
 * Dependencies: shiki
 */

import { codeToHtml } from "shiki"

const lightTheme = "github-light"
const darkTheme = "github-dark"

/**
 * Highlight code with shiki.
 *
 * When `theme` is omitted, renders dual light/dark output using CSS variables
 * (adapts to the site's color mode automatically).
 *
 * When `theme` is provided, renders single-theme output with inline styles
 * matching the specified shiki theme (e.g. "dracula", "nord", "monokai").
 */
export async function highlightCode(
  code: string,
  language: string = "tsx",
  theme?: string
) {
  if (theme) {
    return codeToHtml(code, {
      lang: language,
      theme,
    })
  }

  return codeToHtml(code, {
    lang: language,
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    defaultColor: false,
  })
}
