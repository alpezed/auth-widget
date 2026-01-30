import { betterAuth } from 'better-auth';
import { db } from '../db';

export const auth = betterAuth({
	baseURL: 'http://localhost:3000',
	basePath: '/auth',
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
