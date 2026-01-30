import { betterAuth } from 'better-auth';
import { db } from '../db';

const FRONTEND_URL = process.env.FRONTEND_URL;

if (!FRONTEND_URL) {
	throw new Error('FRONTEND_URL is not set');
}

export const auth = betterAuth({
	baseURL: FRONTEND_URL,
	basePath: '/api/auth',
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
