import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig, loadEnv } from 'vite'
import { envOnlyMacros } from 'vite-env-only'
import tsconfigPaths from 'vite-tsconfig-paths'
import { coverageConfigDefaults, defaultExclude } from 'vitest/config'
import remixConfig from './remix.config'

export default defineConfig({
	plugins: [remix(remixConfig), tsconfigPaths(), envOnlyMacros()],
	server: {
		host: process.env.NODE_ENV === 'production' ? undefined : true, // Allow access on local network
	},
	build: {
		target: 'esnext',
	},
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: ['./test/setup.ts'],
		globalSetup: ['./test/global-setup.ts'],
		include: ['app/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
		exclude: [...defaultExclude, 'tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
		poolMatchGlobs: [
			['app/**/(loader|action).{test,spec}.?(c|m)[jt]s?(x)', 'forks'],
		],
		env: loadEnv('', process.cwd(), ''),
		coverage: {
			provider: 'v8',
			include: ['app/**'],
			clean: true,
			exclude: [
				...coverageConfigDefaults.exclude,
				'app/entry.*.tsx',
				'app/root.tsx',
			],
		},
	},
})
