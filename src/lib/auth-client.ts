import { createAuthClient } from 'better-auth/react';
import { getBaseURL } from '@/lib/utils';
import { nextCookies } from 'better-auth/next-js';

const authClient = createAuthClient({
  baseURL: getBaseURL(),
  plugins: [nextCookies()],
});

export default authClient;

export type Session = typeof authClient.$Infer.Session.session;
export type User = typeof authClient.$Infer.Session.user;
