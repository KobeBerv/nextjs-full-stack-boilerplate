import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseURL() {
  const url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? process?.env?.NEXT_PUBLIC_VERCEL_URL;
  if (!url) {
    const isDevSecure = process?.env?.HTTPS === 'true';
    return isDevSecure
      ? `https://localhost:${process.env.PORT ?? 3000}`
      : `http://localhost:${process.env.PORT ?? 3000}`;
  }
  return url.startsWith('http') || url.startsWith('https')
    ? url
    : `https://${url}`;
}
