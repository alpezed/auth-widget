import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { resolve } from 'path';

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
		],
		// Define process.env.NODE_ENV for browser compatibility
		define: isWidgetBuild
			? {
					'process.env.NODE_ENV': JSON.stringify('production'),
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
