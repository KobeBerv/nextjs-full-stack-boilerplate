import { buttonVariants } from '@/components/ui/button';
import { site } from '@/config';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { auth } from '@/server/auth';
import { headers } from 'next/headers';
import db from '@/server/db';
import {
  APIResponse,
  CreateDemoUser,
  ServerActionForm,
  SignInForm,
  SignOut,
} from '@/components/demo-components';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const demoUser = await db.user.findUnique({
    where: { email: 'demo@example.com' },
  });

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[800px] flex-col items-center justify-center gap-20 p-8 text-center">
      <header className="flex flex-col items-center justify-center gap-6">
        <div className="mx-auto flex w-full items-end justify-center gap-4 text-2xl font-bold sm:text-3xl">
          <a
            className="transition-transform duration-200 hover:scale-110"
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
            />
          </a>
          <h1 className="leading-none">Full-stack Boilerplate</h1>
        </div>
        <p className="text-center text-lg">{site.description}</p>
      </header>
      <main className="flex w-full flex-col items-center justify-center gap-10 sm:items-start">
        <h2 className="w-full text-center text-xl font-bold">
          Demos{' '}
          {session ? (
            <span className="rounded-full bg-green-500 px-2 py-1 text-sm font-normal text-secondary">
              Authorized
            </span>
          ) : (
            <span className="rounded-full bg-red-500 px-2 py-1 text-sm font-normal text-secondary">
              Unauthorized
            </span>
          )}
        </h2>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2">
          <div className="w-full rounded-xl bg-accent p-4">
            <h3 className="text-lg font-semibold">Authorize</h3>
            <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
              {!demoUser && <CreateDemoUser />}
              {!session && demoUser && <SignInDialog />}
              {session && demoUser && <SignOut />}
            </div>
          </div>
          <div className="w-full rounded-xl bg-accent p-4">
            <h3 className="text-lg font-semibold">Form</h3>
            <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
              <ActionDialog />
            </div>
          </div>
          <div className="col-span-1 w-full rounded-xl bg-accent p-4 md:col-span-2">
            <h3 className="text-lg font-semibold">API</h3>
            <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
              <APIResponse />
            </div>
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-center gap-6">
        <a
          className={buttonVariants({ variant: 'link' })}
          href="https://github.com/KobeBerv/nextjs-full-stack-boilerplate"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="dark:invert"
            aria-hidden
            src="/github.svg"
            alt="Github icon"
            width={16}
            height={16}
          />
          Github repository
        </a>
      </footer>
    </div>
  );
}

const ActionDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: 'link' })}>
        Show form
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Demo form</DialogTitle>
          <DialogDescription>
            This form demonstrates the use of client-side and server-side
            validation with Zod, integration with React Hook Form for managing
            form state, and server actions for handling form submissions.
          </DialogDescription>
        </DialogHeader>
        <ServerActionForm />
      </DialogContent>
    </Dialog>
  );
};

const SignInDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: 'link' })}>
        Sign in
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Demo authorize</DialogTitle>
          <DialogDescription>
            This form demonstrates the use of Better-Auth for user
            authentication, allowing users to sign in and access secret content
            securely.
            <br />
            email: <strong>demo@example.com</strong>
            <br />
            password: <strong>Demo123!</strong>
          </DialogDescription>
        </DialogHeader>
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
};
