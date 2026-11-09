/*
 * Server-rendering entry point. Built by scripts/prerender.mjs and never
 * shipped to the browser: it exists so every route can be written to disk as
 * real HTML during the build.
 *
 * This is also where the metadata functions are re-exported from, so the build
 * script and the app read the same catalogue and the same copy.
 */
import { renderToString } from "react-dom/server";
import App from "@/App";

export {
  buildHeadHtml,
  canonicalPath,
  getSeo,
  getStaticRoutes,
  normalizePath,
} from "@/lib/seo";
export { SITE_ORIGIN } from "@/lib/asset";

export function renderApp(path: string): string {
  return renderToString(<App ssrPath={path} />);
}
