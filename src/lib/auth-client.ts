import { createAuthClient } from 'better-auth/react';

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5173/';

if (!API_BASE_URL) {
	throw new Error('API_BASE_URL is not set');
}

export const authClient = createAuthClient({
	baseURL: 'https://auth-widget-0ni.pages.dev/',
	basePath: '/auth',
	// fetchOptions: {
	// 	credentials: 'include',
	// 	mode: 'cors',
	// },
});
