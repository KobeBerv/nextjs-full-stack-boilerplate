import { ContextVariables } from '@/types';
import { Hono } from 'hono';
import { auth } from '@/server/middleware';

const secureHelloRouter = new Hono<{ Variables: ContextVariables }>().get(
  '/',
  auth(),
  async (c) => {
    return c.json({ message: `Hello, ${c.get('user')?.name}` });
  }
);

export default secureHelloRouter;
