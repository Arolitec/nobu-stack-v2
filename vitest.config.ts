import { loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import {
	coverageConfigDefaults,
	defaultExclude,
	defineConfig,
} from 'vitest/config'

export default defineConfig({
	plugins: [tsconfigPaths()],
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
