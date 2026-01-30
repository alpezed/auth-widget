import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { auth } from '../lib/auth';

const app = new Hono();

app.use(
	'/api/auth/*', // or replace with "*" to enable cors for all routes
	cors({
		origin: process.env.FRONTEND_URL as string, // replace with your origin
		allowHeaders: ['Content-Type', 'Authorization'],
		allowMethods: ['POST', 'GET', 'OPTIONS'],
		exposeHeaders: ['Content-Length'],
		maxAge: 600,
		credentials: true,
	})
);

// Mount better-auth at /auth (matches basePath in auth config)
app.all('/api/auth/*', c => auth.handler(c.req.raw));

export default app;
