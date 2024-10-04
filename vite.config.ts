import { vitePlugin as remix } from "@remix-run/dev";
import remixConfig from 'remix.config';
import { defineConfig } from "vite";
import { envOnlyMacros } from 'vite-env-only';
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix(remixConfig),
    tsconfigPaths(),
    envOnlyMacros()
  ],
  server: {
    host: process.env.NODE_ENV === 'production' ? undefined : true // Allow access on local network
  },
  build: {
    target: 'esnext'
  }
});
