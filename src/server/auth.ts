import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { site } from '@/config';
import { nextCookies } from 'better-auth/next-js';
import { getBaseURL } from '@/lib/utils';
import db from '@/server/db';

export const auth = betterAuth({
  appName: site.title,
  baseURL: getBaseURL(),
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});

export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session.session;
