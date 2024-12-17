import { buttonVariants } from '@/components/ui/button';
import { site } from '@/config';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[50rem] flex-col items-center justify-center gap-16 p-16 text-center">
      <main className="row-start-2 flex flex-col items-center justify-center gap-8 sm:items-start">
        <div className="mx-auto flex w-full items-end justify-center gap-2 text-2xl font-bold sm:text-3xl">
          <a
            className="transition-transform duration-200 hover:scale-105"
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
          <div className="leading-none">Full-stack Boilerplate</div>
        </div>
        <p className="text-center">{site.description}</p>
        <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            className={buttonVariants({ variant: 'default' })}
            href="/api/hello"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={15} />
            Hello API endpoint
          </a>
          <a
            className={buttonVariants({
              variant: 'secondary',
              className: 'rounded-full',
            })}
            href="/api/secure/hello"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={15} />
            Hello Secure API endpoint
          </a>
        </div>
      </main>
      <footer className="row-start-3 items-center justify-center gap-6">
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
