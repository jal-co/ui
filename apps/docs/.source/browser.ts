// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "components/commit-graph.mdx": () => import("../content/docs/components/commit-graph.mdx?collection=docs"), "components/logo-cloud.mdx": () => import("../content/docs/components/logo-cloud.mdx?collection=docs"), "components/status-indicator.mdx": () => import("../content/docs/components/status-indicator.mdx?collection=docs"), "components/testimonial.mdx": () => import("../content/docs/components/testimonial.mdx?collection=docs"), }),
};
export default browserCollections;