/**
 * jalco-ui
 * lib/highlight-code
 * by Justin Levine
 * ui.justinlevine.me
 *
 * Syntax highlighting helper using Shiki with dual light/dark themes.
 *
 * Dependencies: shiki
 */

import { codeToHtml } from "shiki"

const lightTheme = "github-light"
const darkTheme = "github-dark"

export async function highlightCode(
  code: string,
  language: string = "tsx"
) {
  return codeToHtml(code, {
    lang: language,
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    defaultColor: false,
  })
}
