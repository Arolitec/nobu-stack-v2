import { vitePlugin as remix } from "@remix-run/dev";
import remixConfig from 'remix.config';
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix(remixConfig),
    tsconfigPaths(),
  ],
});
