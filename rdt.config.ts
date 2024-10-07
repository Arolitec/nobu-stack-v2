import { defineRdtConfig } from 'remix-development-tools'

const isProduction = process.env.NODE_ENV === 'production'

// For configuration docs see: https://remix-development-tools.fly.dev/docs/main/server

export default defineRdtConfig({
	server: {
		silent: isProduction,
		logs: {
			actions: !isProduction,
			loaders: !isProduction,
			cache: !isProduction,
			cookies: !isProduction,
			defer: !isProduction,
			siteClear: !isProduction,
		},
	},
})
