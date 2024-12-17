import { type AppType } from '@/server';
import { hc as honoClient } from 'hono/client';
import { getBaseURL } from '@/lib/utils';

export const apiClient = honoClient<AppType>(getBaseURL());
