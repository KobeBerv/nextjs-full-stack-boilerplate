'use client';

import authClient from '@/lib/auth-client';
import { useState, FormEvent } from 'react';
import { LoadingButton } from './ui/loading-button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { demoSchema, DemoValues } from '@/validators/demo-schema';
import { demoAction, demoSecureAction } from '@/server/actions/demo-action';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/hono-client';
import { getBaseURL } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import { Label } from './ui/label';

export const ServerActionForm = () => {
  const form = useForm<DemoValues>({
    resolver: zodResolver(demoSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      email: '',
      message: '',
      isSecureAction: false,
    },
  });

  async function onSubmit(values: DemoValues) {
    const result = values.isSecureAction
      ? await demoSecureAction(values)
      : await demoAction(values);
    if (result.success) {
      toast.success(result.data);
    } else {
      toast.error(result.error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="message"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isSecureAction"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <FormLabel>Use secure action</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <LoadingButton
          disabled={!form.formState.isValid}
          type="submit"
          loading={form.formState.isSubmitting}
          className="!w-full"
        >
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
};

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    await authClient.signIn.email({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setIsLoading(false);
        },
        onSuccess: async () => {
          toast.success('Authorized');
          queryClient.refetchQueries();
          router.refresh();
        },
      },
    });
    setIsLoading(false);
  }
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        defaultValue="demo@example.com"
      />
      <Label htmlFor="email">Password</Label>
      <Input
        id="password"
        name="password"
        type="password"
        defaultValue="Demo123!"
      />
      <LoadingButton type="submit" loading={isLoading}>
        Authorize
      </LoadingButton>
    </form>
  );
};

export const SignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  async function signOut() {
    setIsLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onError: (ctx) => {
          setIsLoading(false);
          console.error(ctx.error);
        },
        onSuccess: async () => {
          setIsLoading(false);
          await queryClient.refetchQueries();
          router.refresh();
        },
      },
    });
  }
  return (
    <LoadingButton loading={isLoading} variant="link" onClick={signOut}>
      Sign out
    </LoadingButton>
  );
};

export const CreateDemoUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  async function createDemoUser() {
    setIsLoading(true);
    await authClient.signUp.email({
      email: 'demo@example.com',
      password: 'Demo123!',
      name: 'Demo User',
      fetchOptions: {
        onError: (ctx) => {
          setIsLoading(false);
          toast.error(ctx.error.message);
        },
        onSuccess: async () => {
          setIsLoading(false);
          toast.success('Demo user created');
          await queryClient.refetchQueries();
          router.refresh();
        },
      },
    });
  }
  return (
    <LoadingButton loading={isLoading} onClick={createDemoUser} variant="link">
      Create demo user
    </LoadingButton>
  );
};

export const APIResponse = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['hello'],
        queryFn: async () => {
          const response = await apiClient.api.demo.hello.$get();
          if (!response.ok || response.status === 401) {
            return 'Unauthorized';
          }
          return response.json();
        },
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ['secureHello'],
        queryFn: async () => {
          const response = await apiClient.api.demo.secure.hello.$get();
          if (!response.ok || response.status === 401) {
            return 'Unauthorized';
          }
          return response.json();
        },
        refetchOnWindowFocus: false,
      },
    ],
  });

  return (
    <div className="space-y-4">
      <a
        href={`${getBaseURL()}/api/demo/hello`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ variant: 'link' })}
      >
        /api/demo/hello
      </a>
      {results[0].isLoading ? (
        <p>Fetching...</p>
      ) : results[0].isRefetching ? (
        <p>Refetching...</p>
      ) : (
        <code className="block rounded-lg bg-foreground/5 p-4">
          {results[0].data
            ? JSON.stringify(results[0].data)
            : results[1].error?.message}
        </code>
      )}
      <a
        href={`${getBaseURL()}/api/demo/secure/hello`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ variant: 'link' })}
      >
        /api/demo/secure/hello
      </a>
      {results[1].isLoading ? (
        <p>Fetching...</p>
      ) : results[1].isRefetching ? (
        <p>Refetching...</p>
      ) : (
        <code className="block rounded-lg bg-foreground/5 p-4">
          {results[1].data
            ? JSON.stringify(results[1].data)
            : results[1].error?.message}
        </code>
      )}
    </div>
  );
};
