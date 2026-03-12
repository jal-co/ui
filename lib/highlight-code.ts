import { codeToHtml } from "shiki"

const lightTheme = "github-light"
const darkTheme = "github-dark"

/**
 * Highlight code with shiki.
 *
 * When `theme` is omitted, renders dual light/dark output using CSS variables.
 * When `theme` is provided, renders single-theme output with inline styles.
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
