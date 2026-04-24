import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

import manifest from "./manifest.config";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isCrx = process.env.CRX_BUILD === "1";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      packageJSON: resolve(__dirname, "./package.json")
    }
  },
  define: {
    "import.meta.env.CRX_BUILD": JSON.stringify(isCrx ? "1" : "")
  },
  build: {
    outDir: isCrx ? "dist-crx" : "dist",
    emptyOutDir: true,
    target: "esnext"
  },
  plugins: [UnoCSS(), react(), ...(isCrx ? [crx({ manifest })] : [])]
});
