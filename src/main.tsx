import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

/*
 * The HTML on disk was prerendered by scripts/prerender.mjs. Its reveal
 * animations are pinned visible (see #prerender-visible in index.html) and
 * non-English visitors have the English markup hidden, because they are about
 * to get their own language. Both of those are temporary build-time aids, so
 * they are removed before React takes over and renders from scratch.
 */
document.documentElement.removeAttribute("data-prerender-language");
document.getElementById("prerender-visible")?.remove();

createRoot(document.getElementById("root")!).render(<App />);
