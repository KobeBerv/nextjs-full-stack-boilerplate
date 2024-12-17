import { ContextVariables } from '@/types';
import { Hono } from 'hono';

const helloRouter = new Hono<{ Variables: ContextVariables }>().get(
  '/',
  async (c) => {
    return c.json({ message: 'Hello, world!' });
  }
);

export default helloRouter;
