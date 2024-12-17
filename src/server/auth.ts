import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import db from '@/server/db';
import { site } from '@/config';
import { nextCookies } from 'better-auth/next-js';
import { getBaseURL } from '@/lib/utils';

export const auth = betterAuth({
  appName: site.title,
  baseURL: getBaseURL(),
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  plugins: [nextCookies()],
});

export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session.session;
