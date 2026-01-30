import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { auth } from '../lib/auth';

const app = new Hono();

const allowedOrigins = [
	process.env.FRONTEND_URL,
	'https://auth-widget.pages.dev',
	'http://localhost:3000',
]
	.filter(Boolean)
	.map((o) => (o!.endsWith('/') ? o!.slice(0, -1) : o!));

app.use(
	'/api/auth/*',
	cors({
		origin: (origin) => {
			if (!origin) return allowedOrigins[0] ?? null;
			const normalized = origin.endsWith('/') ? origin.slice(0, -1) : origin;
			return allowedOrigins.includes(normalized) ? origin : null;
		},
		allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
		allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
		exposeHeaders: ['Content-Length', 'Set-Cookie'],
		maxAge: 86400,
		credentials: true,
	})
);

app.all('/api/auth/*', (c) => auth.handler(c.req.raw));

export default app;
