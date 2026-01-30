import { betterAuth } from 'better-auth';
import { db } from '../db';

const FRONTEND_URL = process.env.FRONTEND_URL ?? 'https://auth-widget.pages.dev';
const BACKEND_URL = process.env.BACKEND_URL ?? 'https://auth-widget-0ni.pages.dev';

export const auth = betterAuth({
	baseURL: BACKEND_URL,
	basePath: '/api/auth',
	trustedOrigins: [
		FRONTEND_URL,
		'https://auth-widget.pages.dev',
		'http://localhost:3000',
	],
	database: db,
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
