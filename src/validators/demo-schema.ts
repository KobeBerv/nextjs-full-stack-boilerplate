import { z } from 'zod';

export const demoSchema = z.object({
  name: z.string().nonempty('Required'),
  email: z.string().email('Invalid email address').nonempty('Required'),
  message: z.string().nonempty('Required').max(500, 'Message is too long'),
  isSecureAction: z.boolean().default(false),
});

export type DemoValues = z.infer<typeof demoSchema>;
