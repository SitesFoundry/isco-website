import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const PROJECT_ROOT = import.meta.dirname;

/*
 * The site is served from the root of www.iscogmbh.com once the custom domain
 * is live, but from /isco-website/ while it is previewed as a GitHub Pages
 * project site. The deploy workflow sets SITE_BASE for the target, so the same
 * source builds correctly for both. See src/App.tsx for the matching router
 * base.
 */
const base = process.env.SITE_BASE ?? "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(PROJECT_ROOT, "src"),
    },
  },
  build: {
    outDir: path.resolve(PROJECT_ROOT, "dist"),
    emptyOutDir: true,
  },
  server: {
    host: true,
    port: 5173,
  },
});
