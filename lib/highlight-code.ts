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
