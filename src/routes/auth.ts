import { Hono } from 'hono';
import { auth } from '../lib/auth';

const app = new Hono();

// Mount better-auth at /auth (matches basePath in auth config)
app.all('/auth/*', (c) => auth.handler(c.req.raw));

export default app;
