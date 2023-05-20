import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";

import path from "path";

export default defineConfig({
  plugins: [react(), EnvironmentPlugin("all")],
  envDir: "../",
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@socketTypes": path.resolve(__dirname, "../app/src/socket"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
    },
  },
});
