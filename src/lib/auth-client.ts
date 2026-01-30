import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
	basePath: '/auth',
	baseURL: import.meta.env.DEV ? window.location.origin : undefined,
});
