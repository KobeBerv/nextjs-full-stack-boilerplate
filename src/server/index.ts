import { ContextVariables } from '@/types';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';
import db from '@/server/db';
import demoRouter from '@/server/router/demo-router';

const app = new Hono<{ Variables: ContextVariables }>().basePath('/api');

app.use(cors());

app.use(async (c, next) => {
  c.set('db', db);
  return next();
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const appRouter = app.route('/demo', demoRouter);

export const httpHandler = handle(app);

export type AppType = typeof appRouter;
