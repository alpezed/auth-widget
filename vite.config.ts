import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { resolve } from 'path';
import devServer, { defaultOptions } from '@hono/vite-dev-server';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const isWidgetBuild = mode === 'widget';

	return {
		plugins: [
			react({
				babel: {
					plugins: [['babel-plugin-react-compiler']],
				},
			}),
			// Inject CSS into JS for the widget build (single file distribution)
			...(isWidgetBuild ? [cssInjectedByJsPlugin()] : []),
			devServer({
				entry: './src/routes/auth.ts',
				// Only handle /auth/* in Hono; let Vite serve SPA (/, /about, etc.)
				exclude: [/^(?!\/auth)/, ...defaultOptions.exclude],
			}),
		],
		// Define process.env.NODE_ENV for browser compatibility
		define: isWidgetBuild
			? {
					'process.env.NODE_ENV': JSON.stringify('production'),
					'process.env.FRONTEND_URL': JSON.stringify(
						'https://auth-widget.pages.dev/'
					),
					'process.env.BETTER_AUTH_URL': JSON.stringify(
						'https://auth-widget-0ni.pages.dev/'
					),
					'process.env.VITE_API_BASE_URL': JSON.stringify(
						'https://auth-widget-0ni.pages.dev/'
					),
				}
			: undefined,
		build: isWidgetBuild
			? {
					lib: {
						entry: resolve(__dirname, 'src/widget.tsx'),
						name: 'AuthModalWidget',
						fileName: () => 'auth-widget.js',
						formats: ['umd'],
					},
					outDir: 'lib',
					// Bundle everything including React
					rollupOptions: {
						output: {
							inlineDynamicImports: true,
						},
					},
					cssCodeSplit: false,
					minify: 'esbuild',
				}
			: undefined,
	};
});
