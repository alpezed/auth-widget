import { betterAuth } from 'better-auth';
import { db } from '../db';

const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL ?? 'http://localhost:5173/';

if (!BETTER_AUTH_URL) {
	throw new Error('BETTER_AUTH_URL is not set');
}

export const auth = betterAuth({
	database: db,
	baseURL: 'https://auth-widget-0ni.pages.dev/',
	basePath: '/auth',
	// trustedOrigins: ['http://localhost:3000', 'http://localhost:5176'],
	emailAndPassword: {
		enabled: true,
	},
	// socialProviders: {
	// 	google: {
	// 		clientId: process.env.GOOGLE_CLIENT_ID as string,
	// 		clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
	// 	},
	// },
});
