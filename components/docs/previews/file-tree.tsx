import { FileTree } from "@/registry/file-tree/file-tree"

export default async function Preview() {
  return (
    <FileTree
      tree={[
        {
          name: "src",
          children: [
            {
              name: "app",
              children: [
                { name: "layout.tsx" },
                { name: "page.tsx" },
              ],
            },
            {
              name: "components",
              children: [
                { name: "header.tsx" },
                { name: "footer.tsx" },
              ],
            },
            { name: "lib", children: [{ name: "utils.ts" }] },
          ],
        },
        { name: "package.json" },
        { name: "tsconfig.json" },
      ]}
      iconStyle="colored"
      highlight={["src/app/page.tsx"]}
    />
  )
}
