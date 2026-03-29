// @ts-nocheck
import * as __fd_glob_6 from "../content/docs/components/testimonial.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/components/status-indicator.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/components/logo-cloud.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/components/commit-graph.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/index.mdx?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/components/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "components/meta.json": __fd_glob_1, }, {"index.mdx": __fd_glob_2, "components/commit-graph.mdx": __fd_glob_3, "components/logo-cloud.mdx": __fd_glob_4, "components/status-indicator.mdx": __fd_glob_5, "components/testimonial.mdx": __fd_glob_6, });