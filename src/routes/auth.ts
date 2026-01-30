import { Hono } from 'hono';
import { cors } from 'hono/cors';
import 'dotenv/config';

import { auth } from '../lib/auth';

const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:3000/';

if (!FRONTEND_URL) {
	throw new Error('FRONTEND_URL is not set');
}

const app = new Hono();

app.use(
	'/auth/*', // or replace with "*" to enable cors for all routes
	cors({
		origin: FRONTEND_URL,
		allowHeaders: ['Content-Type', 'Authorization'],
		allowMethods: ['POST', 'GET', 'OPTIONS'],
		exposeHeaders: ['Content-Length'],
		maxAge: 600,
		credentials: true,
	})
);

// Mount better-auth at /auth (matches basePath in auth config)
app.all('/auth/*', c => auth.handler(c.req.raw));

export default app;
