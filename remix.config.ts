import type { VitePluginConfig } from '@remix-run/dev'
import { flatRoutes } from 'remix-flat-routes'

export default {
	future: {
		v3_fetcherPersist: true,
		v3_relativeSplatPath: true,
		v3_throwAbortReason: true,
	},
	ignoredRouteFiles: ['**/*'],
	routes: async defineRoutes => flatRoutes('routes', defineRoutes),
} satisfies VitePluginConfig
