'use server';

import { demoSchema, DemoValues } from '@/validators/demo-schema';
import { headers } from 'next/headers';
import { auth } from '../auth';
import { revalidatePath } from 'next/cache';

type Result<T> = { success: true; data: T } | { success: false; error: string };

export async function demoAction(values: DemoValues): Promise<Result<string>> {
  try {
    const { name, email, message } = demoSchema.parse(values);

    return {
      success: true,
      data: `Hello, ${name}! Your email is ${email} and your message is ${message}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'An error occurred' };
  }
}

export async function demoSecureAction(
  values: DemoValues
): Promise<Result<string>> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      revalidatePath('');
      throw new Error('Unauthorized');
    }

    const { name, email, message } = demoSchema.parse(values);

    return {
      success: true,
      data: `Hello, ${name}! Your email is ${email} and your message is ${message}. You are authorized.`,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'An error occurred' };
  }
}
