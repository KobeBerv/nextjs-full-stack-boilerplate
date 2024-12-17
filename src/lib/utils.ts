import { env } from '@/env';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseURL() {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  } else {
    return env.NEXT_PUBLIC_SITE_URL;
  }
}
