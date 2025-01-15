# NextJS Full-stack Boilerplate

A comprehensive Next.js 15 full-stack boilerplate featuring authentication, database ORM, type-safe API, email handling, environment management, theming, and form handling. Perfect for building robust and scalable web applications

This is a [Next.js](https://nextjs.org) 15 project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- ⚛️ Built with the latest [`Next.js 15`](https://nextjs.org) framework and [`React 19`](https://react.dev)
- 🔒 Authentication with [`better-auth`](https://github.com/better-auth/better-auth)
- 🗄️ Database ORM with [`prisma`](https://github.com/prisma/prisma)
- 🔗 Type-safe API with [`hono`](https://github.com/honojs/hono)
- 🖌️ Styled with [`Tailwind CSS`](https://tailwindcss.com) and UI components from [`shadcn/ui`](https://github.com/shadcn-ui/ui)
- ✉️ Email components from [`react-email`](https://github.com/zenorocha/react-email)
- 📧 Email sending with [`nodemailer`](https://github.com/nodemailer/nodemailer)
- 🌐 Environment variable management with [`t3-oss/env-nextjs`](https://github.com/t3-oss/env-nextjs)
- 🎨 Theming with [`next-themes`](https://github.com/pacocoursey/next-themes)
- 📋 Form handling with [`react-hook-form`](https://github.com/react-hook-form/react-hook-form)
- ✅ Schema validation with [`zod`](https://github.com/colinhacks/zod)

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/KobeBerv/nextjs-full-stack-boilerplate.git
cd nextjs-full-stack-boilerplate
```

Then, install the dependencies:

```bash
pnpm install
```

Change the `.env.example` file to `.env`:

```.env
DATABASE_URL=your_database_url
BETTER_AUTH_SECRET=secret_string
NEXT_PUBLIC_SITE_URL=site_url
SMTP_HOST=smtp_host
SMTP_USERNAME=smtp_username
SMTP_PASSWORD=smtp_password
```

Generate Prisma client:

```bash
pnpm prisma generate
```

Set up your database:

```bash
pnpm prisma db push
```

This command will create the necessary tables in your database based on your Prisma schema.

Next, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing!

## Contributing

This is just my idea of the right structure for a full-stack application. Suggestions and contributions are welcome!

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
