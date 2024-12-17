import { Session, User } from 'better-auth';
import db from '@/server/db';

export type ContextVariables = {
  db: typeof db;
  user: User | null;
  session: Session | null;
};
