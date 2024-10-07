import { vitePlugin as remix } from '@remix-run/dev'
import { remixDevTools } from 'remix-development-tools'
import { defineConfig } from 'vite'
import { envOnlyMacros } from 'vite-env-only'
import tsconfigPaths from 'vite-tsconfig-paths'
import rdtConfig from './rdt.config'
import remixConfig from './remix.config'

export default defineConfig({
	plugins: [
		remixDevTools(rdtConfig),
		remix(remixConfig),
		tsconfigPaths(),
		envOnlyMacros(),
	],
	server: {
		host: process.env.NODE_ENV === 'production' ? undefined : true, // Allow access on local network
	},
	build: {
		target: 'esnext',
	},
})
