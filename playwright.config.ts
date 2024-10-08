import { defineConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || '3000'
const baseURL = `http://localhost:${port}`

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './tests/e2e',
	fullyParallel: false,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? 'blo$b' : 'html',
	expect: {
		timeout: 10 * 1000 /* 10s */,
	},
	use: {
		baseURL,
		trace: 'on-first-retry',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'setup-test',
			testMatch: /setup-test\.ts/,
		},
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
			dependencies: ['setup-test'],
			testIgnore: /mobile\.spec\.ts/,
		},
		{
			name: 'mobile-chrome',
			use: { ...devices['Pixel 5'] },
		},

		// You can add more browsers

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: 'pnpm dev',
		url: baseURL,
		reuseExistingServer: !process.env.CI,
		stderr: 'pipe',
		stdout: 'pipe',
	},
})
