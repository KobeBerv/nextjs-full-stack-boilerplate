import { ContextVariables } from '@/types';
import { auth as betterAuth } from '@/server/auth';
import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';

export function auth() {
  return createMiddleware<{ Variables: ContextVariables }>(async (c, next) => {
    const session = await betterAuth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!session) {
      throw new HTTPException(401, { message: 'Unauthorized' });
    }

    c.set('user', session.user);
    c.set('session', session.session);
    return next();
  });
}
