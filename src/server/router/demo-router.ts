import { ContextVariables } from '@/types';
import { Hono } from 'hono';
import { auth } from '@/server/middleware';

const demoRouter = new Hono<{ Variables: ContextVariables }>()
  .get('/hello', async (c) => {
    return c.json({ message: 'Hello, world!' });
  })
  .get('/secure/hello', auth(), async (c) => {
    return c.json({
      message: `Hello, ${c.get('user')?.name}. You are authorized.`,
    });
  });

export default demoRouter;
